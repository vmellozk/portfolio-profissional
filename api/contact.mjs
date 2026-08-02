const MAX_BODY_BYTES = 8 * 1024;
const MIN_FORM_FILL_TIME_MS = 2_500;
const DOWNSTREAM_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_CLIENTS = 1_000;

const DEFAULT_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/contato.devictormello@gmail.com";

const ALLOWED_FIELDS = new Set([
  "name",
  "email",
  "subject",
  "message",
  "website",
  "startedAt",
]);

const rateLimitStore = globalThis.__portfolioContactRateLimitStore ?? new Map();
globalThis.__portfolioContactRateLimitStore = rateLimitStore;

class HttpError extends Error {
  constructor(status, message, headers = {}) {
    super(message);
    this.status = status;
    this.headers = headers;
  }
}

function jsonResponse(status, payload, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function getAllowedOrigins() {
  return (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function requestComesFromSite(request) {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;

  try {
    const sourceOrigin = new URL(source).origin;
    const requestOrigin = new URL(request.url).origin;
    return sourceOrigin === requestOrigin || getAllowedOrigins().includes(sourceOrigin);
  } catch {
    return false;
  }
}

function getClientIdentifier(request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "local"
  )
    .split(",", 1)[0]
    .trim()
    .slice(0, 64);
}

function enforceInstanceRateLimit(request) {
  const now = Date.now();

  for (const [client, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(client);
  }

  const client = getClientIdentifier(request);
  const current = rateLimitStore.get(client);

  if (!current) {
    if (rateLimitStore.size >= RATE_LIMIT_MAX_CLIENTS) {
      throw new HttpError(429, "Muitas tentativas. Tente novamente mais tarde.", {
        "Retry-After": "600",
      });
    }

    rateLimitStore.set(client, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new HttpError(429, "Muitas tentativas. Tente novamente mais tarde.", {
      "Retry-After": String(Math.max(1, Math.ceil((current.resetAt - now) / 1_000))),
    });
  }

  current.count += 1;
}

async function readBodyWithLimit(request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new HttpError(413, "Mensagem muito grande.");
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks = [];
  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    receivedBytes += value.byteLength;
    if (receivedBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new HttpError(413, "Mensagem muito grande.");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(receivedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    throw new HttpError(400, "Codificação inválida.");
  }
}

function parseBody(rawBody, contentType) {
  if (contentType === "application/json") {
    try {
      return JSON.parse(rawBody);
    } catch {
      throw new HttpError(400, "JSON inválido.");
    }
  }

  if (contentType === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  throw new HttpError(415, "Formato de envio não permitido.");
}

function cleanText(value) {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

function readTextField(data, field, minLength, maxLength) {
  const value = data[field];
  if (typeof value !== "string") {
    throw new HttpError(422, "Preencha todos os campos corretamente.");
  }

  const normalized = cleanText(value);
  if (normalized.length < minLength || normalized.length > maxLength) {
    throw new HttpError(422, "Preencha todos os campos corretamente.");
  }
  return normalized;
}

function validateSubmission(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new HttpError(400, "Requisição inválida.");
  }

  const keys = Object.keys(data);
  if (keys.some((key) => !ALLOWED_FIELDS.has(key))) {
    throw new HttpError(400, "Requisição inválida.");
  }

  if (typeof data.website === "string" && data.website.trim() !== "") {
    return { isBot: true };
  }

  const startedAt = Number(data.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_TIME_MS) {
    throw new HttpError(422, "Aguarde um instante antes de enviar.");
  }

  const name = readTextField(data, "name", 2, 80);
  const email = readTextField(data, "email", 5, 254).toLowerCase();
  const subject = readTextField(data, "subject", 3, 120).replace(/[\r\n]+/g, " ");
  const message = readTextField(data, "message", 10, 3_000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) {
    throw new HttpError(422, "Informe um e-mail válido.");
  }

  const links = message.match(/https?:\/\//giu)?.length ?? 0;
  if (links > 5) {
    throw new HttpError(422, "A mensagem contém links demais.");
  }

  return { isBot: false, name, email, subject, message };
}

async function forwardSubmission(submission) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT?.trim() || DEFAULT_FORM_ENDPOINT;
  const endpointUrl = new URL(endpoint);

  if (endpointUrl.protocol !== "https:" || endpointUrl.hostname !== "formsubmit.co") {
    throw new Error("CONTACT_FORM_ENDPOINT inválido");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        message: submission.message,
        _subject: `[Portfólio] ${submission.subject}`,
        _template: "table",
        _captcha: "false",
      }),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success === false) {
      throw new Error(`Falha no serviço de e-mail: ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function handleContact(request) {
  if (request.method !== "POST") {
    return jsonResponse(405, { ok: false, message: "Método não permitido." }, { Allow: "POST" });
  }

  if (!requestComesFromSite(request)) {
    return jsonResponse(403, { ok: false, message: "Origem não permitida." });
  }

  try {
    enforceInstanceRateLimit(request);

    const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
    const rawBody = await readBodyWithLimit(request);
    const submission = validateSubmission(parseBody(rawBody, contentType));

    if (submission.isBot) {
      return jsonResponse(200, { ok: true, message: "Mensagem enviada." });
    }

    await forwardSubmission(submission);
    return jsonResponse(200, { ok: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonResponse(error.status, { ok: false, message: error.message }, error.headers);
    }

    console.error("Falha ao processar formulário de contato", error);
    return jsonResponse(502, {
      ok: false,
      message: "Não foi possível enviar agora. Tente novamente em alguns minutos.",
    });
  }
}

export default {
  fetch: handleContact,
};
