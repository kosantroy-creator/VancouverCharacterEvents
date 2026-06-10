import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { eventTypes } from "@/lib/site-data";
import { CTAButton } from "./CTAButton";

/**
 * Public-site character options use BRAND-SAFE CATEGORY LANGUAGE only.
 * Specific/copyrighted character names must never appear on the public site —
 * keep any internal name-level booking options in private tooling only.
 */
const characterCategories = [
  "Princesses",
  "Heroes",
  "Dinosaurs",
  "Mermaids",
  "Mascots",
  "Holiday Characters",
  "Specialty Characters",
  "Corporate / City Entertainment",
];

/**
 * Where booking requests are sent.
 *
 * Set VITE_BOOKING_ENDPOINT (e.g. a Formspree / Web3Forms / custom URL) to POST
 * inquiries as JSON. If it is not set, the form falls back to opening a
 * pre-filled email draft so requests genuinely reach the inbox instead of being
 * silently discarded. See the booking-form notes in the project summary.
 */
const BOOKING_ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined;
const BOOKING_EMAIL = "hello@vancouvercharacterevents.ca";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-[var(--radius-md)] border border-border-strong bg-cream-50 px-4 py-2.5 text-base text-fg placeholder:text-fg-3/70 transition-colors focus:border-gold-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold-500";
const labelClass = "mb-1.5 block text-sm font-semibold text-fg";

function buildMailto(p: Record<string, string>) {
  const subject = `Booking request — ${p.eventType || "Event"}${p.name ? ` · ${p.name}` : ""}`;
  const body = [
    `Name: ${p.name || ""}`,
    `Email: ${p.email || ""}`,
    `Phone: ${p.phone || ""}`,
    "",
    `Event type: ${p.eventType || ""}`,
    `Date: ${p.date || ""}   Time: ${p.time || ""}`,
    `Address: ${p.address || ""}`,
    `Event name: ${p.eventName || ""}`,
    `Child's name: ${p.childName || ""}`,
    `Character interest: ${p.interest || ""}`,
    `Package: ${p.package || ""}`,
    `Guest count: ${p.guests || ""}`,
    "",
    "Details:",
    p.message || "",
  ].join("\n");
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function BookingForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<"endpoint" | "mailto">("endpoint");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields; real visitors leave it empty.
    if (data.get("company")) return;

    const payload = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "company"),
    ) as Record<string, string>;

    setStatus("submitting");
    try {
      if (BOOKING_ENDPOINT) {
        const res = await fetch(BOOKING_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setMode("endpoint");
      } else {
        // No backend configured yet — open an email draft so the inquiry
        // actually reaches the business rather than disappearing.
        setMode("mailto");
        window.location.href = buildMailto(payload);
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-xl)] border border-gold-500/40 bg-cream-100 p-10 text-center shadow-[var(--shadow-md)]">
        <CheckCircle2 className="h-12 w-12 text-[var(--success)]" />
        <h3 className="mt-4 font-display text-3xl text-fg">
          {mode === "mailto" ? "Your email draft is ready" : "Your request is on its way"}
        </h3>
        <p className="mt-3 max-w-md text-fg-2">
          {mode === "mailto" ? (
            <>
              We&apos;ve opened a pre-filled email to our team — just press send and we&apos;ll take
              it from there. If nothing opened, email us directly at{" "}
              <a
                href={`mailto:${BOOKING_EMAIL}`}
                className="font-semibold text-fg-gold underline-offset-4 hover:underline"
              >
                {BOOKING_EMAIL}
              </a>
              .
            </>
          ) : (
            "Thank you — we've received your booking request. Our team will be in touch shortly to help match your event with the perfect chapter. Keep an eye on your inbox."
          )}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-fg-gold underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-xl)] border border-gold-500/30 bg-cream-100 p-6 shadow-[var(--shadow-md)] sm:p-8"
      noValidate
    >
      {/* Honeypot field — visually hidden, off-screen, never shown to users */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(604) 000-0000"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="eventType">
            Event type
          </label>
          <select id="eventType" name="eventType" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select event type
            </option>
            {eventTypes.map((e) => (
              <option key={e.title} value={e.title}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="date">
            Event date
          </label>
          <input id="date" name="date" type="date" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="time">
            Event time
          </label>
          <input id="time" name="time" type="time" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="address">
            Event address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            className={fieldClass}
            placeholder="Venue or street address, city"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="eventName">
            Event name <span className="font-normal text-fg-3">(if applicable)</span>
          </label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            className={fieldClass}
            placeholder="e.g. Summer Festival"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="childName">
            Child&apos;s name <span className="font-normal text-fg-3">(if a birthday)</span>
          </label>
          <input
            id="childName"
            name="childName"
            type="text"
            className={fieldClass}
            placeholder="Optional"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="interest">
            Character experience
          </label>
          <select
            id="interest"
            name="interest"
            className={fieldClass}
            defaultValue={defaultInterest ?? ""}
          >
            <option value="" disabled>
              Select a character experience
            </option>
            {characterCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="Multiple characters">Multiple characters</option>
            <option value="Not sure yet">Not sure yet — help me choose</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="package">
            Package
          </label>
          <select id="package" name="package" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a package
            </option>
            <option value="60-minute">Single Character — 1 hour</option>
            <option value="90-minute">Premium — 1.5 hours</option>
            <option value="custom">Custom — 3+ characters</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="guests">
            Guest count
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            className={fieldClass}
            placeholder="e.g. 20"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          Message / details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Tell us about your event, venue, timing, and anything special you have in mind."
        />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--error)]/40 bg-[var(--error)]/10 px-4 py-3 text-sm text-fg"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--error)]" />
          <span>
            Something went wrong sending your request. Please try again, or email us directly at{" "}
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="font-semibold text-fg-gold underline-offset-4 hover:underline"
            >
              {BOOKING_EMAIL}
            </a>
            .
          </span>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <CTAButton type="submit" size="lg" className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            "Start My Booking Request"
          )}
        </CTAButton>
        <p className="text-xs text-fg-3">We typically reply within one business day.</p>
      </div>
    </form>
  );
}
