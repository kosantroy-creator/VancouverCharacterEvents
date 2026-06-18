import { createServerFn } from "@tanstack/react-start";

/**
 * Booking-inquiry email pipeline (TEMPORARY wiring).
 *
 * Every booking/interest form on the site calls `submitInquiry(source, fields)`,
 * which runs the `sendInquiry` server function. On the server it sends TWO emails
 * via Resend (https://resend.com):
 *   1. the business inquiry  → INQUIRY_TO (info@vancouvercharacterevents.com)
 *   2. a confirmation        → the client's own email address
 *
 * Required env (set in Vercel, server-side only — never VITE_ prefixed):
 *   RESEND_API_KEY   — Resend API key
 *   INQUIRY_TO       — business inbox (optional; defaults to info@…)
 *   INQUIRY_FROM     — verified sender (optional; defaults to noreply@…)
 *
 * The FROM domain (vancouvercharacterevents.com) must be verified in Resend.
 * Failures return { ok:false, error } so the form can show a graceful fallback.
 */
export type InquiryInput = {
  source: string;
  fields: Record<string, string>;
};

export type InquiryResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Field keys never forwarded into the email (honeypots / control fields). */
const SKIP = new Set(["company", "hp", "_hp", "source"]);

function titleize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: InquiryInput) => data)
  .handler(async ({ data }): Promise<InquiryResult> => {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_TO || "info@vancouvercharacterevents.com";
    const from =
      process.env.INQUIRY_FROM ||
      "Vancouver Character Events <noreply@vancouvercharacterevents.com>";

    const source = (data?.source || "Website").toString().slice(0, 80);

    // Sanitize: trim, cap length, drop honeypots / empties.
    const fields: Record<string, string> = {};
    for (const [k, v] of Object.entries(data?.fields ?? {})) {
      if (SKIP.has(k)) continue;
      const val = (v ?? "").toString().trim();
      if (val) fields[k] = val.slice(0, 2000);
    }

    const name = fields.name || fields.clientName || "";
    const email = fields.email || "";
    if (!EMAIL_RE.test(email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (!apiKey) {
      console.error("[inquiry] RESEND_API_KEY is not set");
      return { ok: false, error: "Email service is not configured yet." };
    }
    const firstName = name ? name.split(/\s+/)[0] : "there";

    // ---- business inquiry email ----
    const rows = Object.entries(fields)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:7px 12px;background:#f7efdd;font-weight:600;color:#2a1c05;vertical-align:top;white-space:nowrap">${escapeHtml(
            titleize(k),
          )}</td><td style="padding:7px 12px;color:#1f2937;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join("");
    const bizHtml = `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#234A93;margin:0 0 4px">New booking inquiry</h2>
      <p style="margin:0 0 16px;color:#6b7280">Source: <strong>${escapeHtml(source)}</strong></p>
      <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">${rows}</table>
      <p style="margin:16px 0 0;color:#6b7280;font-size:13px">Reply to this email to respond directly to ${escapeHtml(
        name || "the client",
      )}.</p>
    </div>`;
    const bizText =
      `New booking inquiry (${source})\n\n` +
      Object.entries(fields)
        .map(([k, v]) => `${titleize(k)}: ${v}`)
        .join("\n");

    // ---- client confirmation email ----
    const recap = [
      fields.eventType && `Event: ${fields.eventType}`,
      (fields.date || fields.eventDate) && `Date: ${fields.date || fields.eventDate}`,
      (fields.time || fields.eventTime) && `Time: ${fields.time || fields.eventTime}`,
    ].filter(Boolean) as string[];
    const recapHtml = recap.length
      ? `<p style="margin:0 0 8px;color:#374151">Here's what we received:</p><ul style="margin:0 0 16px;color:#374151;padding-left:18px">${recap
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join("")}</ul>`
      : "";
    const clientHtml = `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#234A93;margin:0 0 12px">Thanks, ${escapeHtml(firstName)} — we've got your inquiry!</h2>
      <p style="margin:0 0 16px;color:#374151">Thank you for reaching out to <strong>Vancouver Character Events</strong>. We've received your request and our team will be in touch within one business day to help bring your event to life.</p>
      ${recapHtml}
      <p style="margin:0 0 16px;color:#374151">Questions in the meantime? Just reply to this email or call us at <strong>(778) 800-6940</strong>.</p>
      <p style="margin:0;color:#6b7280;font-size:13px">— The Vancouver Character Events team<br>info@vancouvercharacterevents.com</p>
    </div>`;
    const clientText =
      `Thanks, ${firstName} — we've received your inquiry and will be in touch within one business day.\n\n` +
      (recap.length ? recap.join("\n") + "\n\n" : "") +
      `Questions? Reply to this email or call (778) 800-6940.\n— Vancouver Character Events`;

    const messages = [
      {
        from,
        to: [to],
        reply_to: email,
        subject: `New inquiry — ${source}${name ? ` · ${name}` : ""}`,
        html: bizHtml,
        text: bizText,
      },
      {
        from,
        to: [email],
        reply_to: to,
        subject: "We've received your inquiry — Vancouver Character Events",
        html: clientHtml,
        text: clientText,
      },
    ];

    try {
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        console.error("[inquiry] Resend batch failed", res.status, detail);
        return { ok: false, error: "We couldn't send your inquiry just now." };
      }
      return { ok: true };
    } catch (err) {
      console.error("[inquiry] Resend request error", err);
      return { ok: false, error: "We couldn't send your inquiry just now." };
    }
  });

/**
 * Client-side helper every form calls. Normalizes network/unexpected errors into
 * the same { ok, error } shape so forms only handle one result type.
 */
export async function submitInquiry(
  source: string,
  fields: Record<string, string>,
): Promise<InquiryResult> {
  try {
    return await sendInquiry({ data: { source, fields } });
  } catch (err) {
    console.error("[inquiry] submit failed", err);
    return { ok: false, error: "Network error — please try again, or email us directly." };
  }
}
