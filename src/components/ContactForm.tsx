import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

/**
 * Contact form with client-side validation and elegant states.
 * Wired to simulate a send (no fake backend) so the UX is complete.
 * To connect a real backend, replace the body of `submitToBackend`.
 */

async function submitToBackend(payload: {
  name: string;
  email: string;
  message: string;
}) {
  // TODO: connect your backend here, e.g.
  // return fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
  void payload;
  await new Promise((r) => setTimeout(r, 1400));
  return { ok: true };
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    else if (name.trim().length < 2)
      next.name = "Name must be at least 2 characters.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!emailOk) next.email = "That email doesn't look valid.";

    if (!message.trim()) next.message = "Please write a short message.";
    else if (message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await submitToBackend({ name, email, message });
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lime/50 ${
      hasError ? "border-red-500/60" : "border-black/10 hover:border-black/20"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-ink/70"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder="Your name"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-ink/70"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-ink/70"
        >
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message)
              setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder="Tell me about your project, timeline, and goals…"
          rows={5}
          className={`${inputClass(!!errors.message)} resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <ErrorMsg>{errors.message}</ErrorMsg>}
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              Thanks! Your message has been sent — I'll get back to you soon.
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              Something went wrong sending your message. Please try again.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[4px] border-2 border-black bg-ink px-7 py-4 text-sm font-black text-paper transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Message
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <Send className="h-3 w-3" />
            </span>
          </>
        )}
      </button>
    </form>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}
