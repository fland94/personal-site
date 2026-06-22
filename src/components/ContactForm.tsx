"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: ""
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const email = form.email.trim();

  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "This email does not look right.";
  if (!form.subject.trim()) errors.subject = "Add a short subject.";
  if (form.message.trim().length < 20) errors.message = "Add a little more detail, at least 20 characters.";
  if (form.message.length > 2000) errors.message = "Please keep the message under 2000 characters.";

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAt = useRef(Date.now());

  const isLoading = status === "loading";
  const characterCount = useMemo(() => form.message.length, [form.message]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          elapsedMs: Date.now() - startedAt.current
        })
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setStatus("success");
      setStatusMessage(data.message || "Message sent. Thank you.");
      setForm(initialForm);
      startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Message could not be sent.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
        />
      </div>

      <label>
        Name
        <input
          type="text"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your full name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </label>

      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="hello@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </label>

      <label>
        Subject
        <input
          type="text"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="What should we talk about?"
          aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject ? <span className="field-error">{errors.subject}</span> : null}
      </label>

      <label>
        Message
        <textarea
          rows={6}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me about the problem, context or collaboration."
          aria-invalid={Boolean(errors.message)}
        />
        <span className="field-meta">{characterCount}/2000</span>
        {errors.message ? <span className="field-error">{errors.message}</span> : null}
      </label>

      <button className="btn btn-primary form-submit" type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send message"}
      </button>
      {statusMessage ? <p className={`form-status ${status}`}>{statusMessage}</p> : null}
    </form>
  );
}
