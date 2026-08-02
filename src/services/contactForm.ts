export const CONTACT_FORM_ACTION =
  "https://formsubmit.co/contato.devictormello@gmail.com";

const CONTACT_API_ENDPOINT = "/api/contact";
const FORM_SUBMIT_AJAX_ENDPOINT =
  "https://formsubmit.co/ajax/contato.devictormello@gmail.com";

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
  startedAt: number;
  pageUrl: string;
}

interface ContactApiResult {
  ok?: boolean;
  message?: string;
}

interface FormSubmitResult {
  success?: boolean | string;
  message?: string;
}

async function parseJson<T>(response: Response): Promise<T | null> {
  return (await response.json().catch(() => null)) as T | null;
}

async function sendThroughFormSubmit(
  submission: ContactSubmission,
  signal: AbortSignal
): Promise<string> {
  const response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
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
      _replyto: submission.email,
      _subject: `[Portfólio] ${submission.subject}`,
      _template: "table",
      _captcha: "false",
      _honey: submission.honeypot,
      _url: submission.pageUrl,
    }),
    signal,
  });
  const result = await parseJson<FormSubmitResult>(response);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message || "Não foi possível enviar a mensagem pelo FormSubmit."
    );
  }

  return "Mensagem enviada com sucesso!";
}

export async function sendContactMessage(
  submission: ContactSubmission,
  signal: AbortSignal
): Promise<string> {
  const response = await fetch(CONTACT_API_ENDPOINT, {
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
      website: submission.honeypot,
      startedAt: submission.startedAt,
    }),
    credentials: "same-origin",
    signal,
  });
  const result = await parseJson<ContactApiResult>(response);

  if (response.ok && result?.ok === true) {
    return result.message || "Mensagem enviada com sucesso!";
  }

  // A validação e o rate limit já ocorreram. O fallback só é usado quando
  // a Vercel não consegue concluir o repasse ao FormSubmit.
  if (response.status === 502) {
    return sendThroughFormSubmit(submission, signal);
  }

  throw new Error(
    response.status === 429
      ? "Muitas tentativas. Aguarde alguns minutos e tente novamente."
      : result?.message || "Não foi possível enviar a mensagem."
  );
}
