import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRef, useState, type FormEvent } from "react";

type ContactFormStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_FORM_COOLDOWN_MS = 30_000;
const CONTACT_FORM_LAST_SENT_KEY = "portfolio-contact-last-sent";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<ContactFormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const formStartedAt = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const lastSentAt = Number(sessionStorage.getItem(CONTACT_FORM_LAST_SENT_KEY));
      if (Number.isFinite(lastSentAt) && Date.now() - lastSentAt < CONTACT_FORM_COOLDOWN_MS) {
        setFormStatus("error");
        setFormMessage("Aguarde alguns segundos antes de enviar outra mensagem.");
        return;
      }
    } catch {
      // O bloqueio real acontece no servidor; o armazenamento local é apenas uma proteção adicional.
    }

    setFormStatus("submitting");
    setFormMessage("Enviando mensagem...");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt: formStartedAt.current,
        }),
        credentials: "same-origin",
        signal: controller.signal,
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || result?.ok !== true) {
        throw new Error(
          response.status === 429
            ? "Muitas tentativas. Aguarde alguns minutos e tente novamente."
            : result?.message || "Não foi possível enviar a mensagem."
        );
      }

      form.reset();
      formStartedAt.current = Date.now();
      try {
        sessionStorage.setItem(CONTACT_FORM_LAST_SENT_KEY, String(Date.now()));
      } catch {
        // O envio continua funcionando quando o navegador bloqueia o armazenamento local.
      }
      setFormStatus("success");
      setFormMessage(result?.message || "Mensagem enviada com sucesso!");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error instanceof Error && error.name !== "AbortError"
          ? error.message
          : "O envio demorou demais. Tente novamente."
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <section id="contact" className="w-full">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="page-contrast-text uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">
          Contato
        </h4>
        <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">
          Vamos conversar
        </h2>
      </div>

      <div className="contact-glass-panel container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-6 md:px-8 py-10 md:py-12 rounded-3xl shadow-2xl items-center">
        <div className="flex flex-col items-center text-center md:text-left">
          <img
            src="images/perfil.png"
            alt="Victor"
            className="rounded-2xl w-56 h-64 sm:w-72 sm:h-80 object-cover mb-6"
          />
          <div className="text-lg font-bold mb-3">Entre em contato</div>
          <div className="mx-auto max-w-sm px-2 text-center text-sm leading-relaxed text-[#dbd6d3]">
            Para orçamentos, projetos ou oportunidades de trabalho, me mande uma mensagem!
          </div>
          <div className="mt-8 flex justify-center md:justify-start gap-6 text-[#1387f1]">
            <a href="mailto:contato.devictormello@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://github.com/vmellozk" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/vxctormello/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://www.instagram.com/vmellozk" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://wa.me/5521993885944" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        <form
          action="/api/contact"
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto md:mx-0 min-w-[18rem]"
        >
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Não preencha este campo</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            aria-label="Nome"
            className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            minLength={5}
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            aria-label="Email"
            className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
          />
          <input
            type="text"
            placeholder="Assunto"
            name="subject"
            required
            minLength={3}
            maxLength={120}
            autoComplete="off"
            aria-label="Assunto"
            className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
          />
          <textarea
            placeholder="Mensagem"
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={3000}
            aria-label="Mensagem"
            className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] resize-none transition"
          />
          <button
            type="submit"
            disabled={formStatus === "submitting"}
            className="site-action-button site-action-button--wide mt-2"
          >
            {formStatus === "submitting" ? "Enviando..." : "Enviar"}
          </button>
          <output
            className={`block min-h-5 text-center text-sm ${
              formStatus === "error" ? "text-[#ffd2d2]" : "text-[#d9f5ff]"
            }`}
            aria-live="polite"
          >
            {formMessage}
          </output>
        </form>
      </div>
    </section>
  );
}
