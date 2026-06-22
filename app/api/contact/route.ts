import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  elapsedMs?: number;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (clean(payload.company, 100)) {
    return NextResponse.json({ message: "Message sent. Thank you." });
  }

  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < 2500) {
    return NextResponse.json({ message: "Please try again in a moment." }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const subject = clean(payload.subject, 160);
  const message = clean(payload.message, 2200);

  if (!name || !email || !subject || message.length < 20) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (message.length > 2000) {
    return NextResponse.json({ message: "Please keep the message under 2000 characters." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "federicolandozzi94@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { message: "Email service is not configured yet. Please email me directly for now." },
      { status: 503 }
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1b1a17;">
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr>
      <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio contact: ${subject}`,
      text,
      html
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Message could not be sent right now. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Message sent. Thank you, I will get back to you soon." });
}
