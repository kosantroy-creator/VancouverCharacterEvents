import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Compass, Footprints, Leaf, Loader2, Send } from "lucide-react";
import { eventTypes } from "@/lib/site-data";
import { submitInquiry } from "@/lib/inquiry";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";

/**
 * ExpeditionBookingForm — "Begin Your Expedition". The dinosaur page's closing
 * conversion section, dressed as a field permit / expedition request: parchment
 * ground, footprint tracks, corner foliage, an EXPEDITION REQUEST permit card with
 * green/amber field inputs. Front-end → Resend via submitInquiry("Dinosaur Events").
 * The Package select pre-fills from `requestedPackage` (set by the "Choose Your
 * Expedition" CTAs). Reveal is IntersectionObserver-driven and VISIBLE BY DEFAULT.
 * Carries the #book anchor the package CTAs scroll to. See the "EXPEDITION BOOKING"
 * block in styles.css.
 */
const BOOKING_EMAIL = "info@vancouvercharacterevents.com";

const PACKAGES = [
  "Dino Discovery",
  "Birthday Expedition",
  "Jurassic Takeover",
  "Not sure yet — help me choose",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const fieldCls =
  "w-full rounded-[12px] border border-[#cdbf9b] bg-[#FCF8EE] px-4 py-2.5 text-base text-[#2A4222] placeholder:text-[#2E4A38]/40 transition-colors focus:border-[#6E9A5E] focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#D4A017]";
const labelCls = "mb-1.5 block text-sm font-semibold text-[#2E4A38]";

export function ExpeditionBookingForm({ requestedPackage }: { requestedPackage?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // Controlled so the "Choose Your Expedition" CTAs can pre-fill it (cold-load and
  // same-page clicks both update via the effect below).
  const [pkg, setPkg] = useState(requestedPackage ?? "");

  useEffect(() => {
    if (requestedPackage) setPkg(requestedPackage);
  }, [requestedPackage]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot — bots fill hidden fields; real visitors leave it empty.
    if (data.get("company")) return;
    const fields = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "company"),
    ) as Record<string, string>;

    setStatus("submitting");
    const res = await submitInquiry("Dinosaur Events", fields);
    if (res.ok) {
      form.reset();
      setPkg("");
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="book"
      aria-labelledby="ebk-title"
      className={cn(
        "ebk relative isolate scroll-mt-24 overflow-hidden",
        motionOK && "anim",
        inView && "is-in",
      )}
    >
      {/* aged-parchment ground + faint tracks + corner foliage */}
      <div aria-hidden className="ebk-paper absolute inset-0" />
      <div aria-hidden className="ebk-tex pointer-events-none absolute inset-0" />
      <div aria-hidden className="ebk-prints pointer-events-none absolute inset-0">
        <BookTrack className="absolute left-[6%] top-[18%] w-7 rotate-[18deg]" />
        <BookTrack className="absolute left-[11%] top-[54%] w-6 -rotate-[12deg]" />
        <BookTrack className="absolute right-[7%] top-[22%] w-7 rotate-[24deg]" />
        <BookTrack className="absolute right-[12%] bottom-[16%] w-6 -rotate-[14deg]" />
      </div>
      <div aria-hidden className="ebk-frond ebk-frond-bl">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>
      <div aria-hidden className="ebk-frond ebk-frond-br">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[920px] px-5 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="ebk-eyebrow">
            <Footprints className="h-3.5 w-3.5 text-[#6E9A5E]" aria-hidden />
            Begin the Expedition
          </span>
          <h2 id="ebk-title" className="ebk-title">
            Bring Harvey to Your Event
          </h2>
          <span className="ebk-rule" aria-hidden />
          <p className="ebk-sub">
            Tell us about your event and we&apos;ll help plan the perfect expedition. No checkout
            today — just a quick request, and we&apos;ll follow up to confirm availability.
          </p>
        </div>

        {status === "success" ? (
          <BookingSent onReset={() => setStatus("idle")} />
        ) : (
          <div className="ebk-card-frame mt-10">
            <form onSubmit={handleSubmit} noValidate className="ebk-card">
              {/* permit header */}
              <div className="ebk-permit">
                <span className="ebk-badge">
                  <Compass className="h-3.5 w-3.5" aria-hidden />
                  Expedition Request
                </span>
                <span className="ebk-permit-note">Field permit · Metro Vancouver</span>
              </div>

              {/* Honeypot — visually hidden, off-screen, never shown to users */}
              <div
                aria-hidden
                className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="ebk-company">Company (leave blank)</label>
                <input
                  id="ebk-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {requestedPackage ? (
                <div className="ebk-req">
                  <Leaf className="h-4 w-4 shrink-0 text-[#6E9A5E]" aria-hidden />
                  <p>
                    Requesting the <strong className="font-semibold">{requestedPackage}</strong> —
                    we&apos;ll confirm availability for your date.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="ebk-name">
                    Your Name
                  </label>
                  <input
                    id="ebk-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldCls}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-email">
                    Email
                  </label>
                  <input
                    id="ebk-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldCls}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-phone">
                    Phone
                  </label>
                  <input
                    id="ebk-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldCls}
                    placeholder="(778) 800-6940"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-child">
                    Birthday Explorer&apos;s Name{" "}
                    <span className="font-normal text-[#2E4A38]/55">(if a birthday)</span>
                  </label>
                  <input
                    id="ebk-child"
                    name="childName"
                    type="text"
                    className={fieldCls}
                    placeholder="Who are we celebrating?"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-eventType">
                    Event Type
                  </label>
                  <select id="ebk-eventType" name="eventType" className={fieldCls} defaultValue="">
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
                  <label className={labelCls} htmlFor="ebk-package">
                    Expedition Package
                  </label>
                  <select
                    id="ebk-package"
                    name="package"
                    className={fieldCls}
                    value={pkg}
                    onChange={(ev) => setPkg(ev.target.value)}
                  >
                    <option value="" disabled>
                      Choose an expedition
                    </option>
                    {PACKAGES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-date">
                    Event Date
                  </label>
                  <input id="ebk-date" name="date" type="date" className={fieldCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-time">
                    Event Time
                  </label>
                  <input id="ebk-time" name="time" type="time" className={fieldCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-guests">
                    Guest Count
                  </label>
                  <input
                    id="ebk-guests"
                    name="guests"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    className={fieldCls}
                    placeholder="e.g. 20"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ebk-venue">
                    Venue Type <span className="font-normal text-[#2E4A38]/55">(optional)</span>
                  </label>
                  <input
                    id="ebk-venue"
                    name="venue"
                    type="text"
                    className={fieldCls}
                    placeholder="Backyard, gym, hall, school…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="ebk-address">
                    Event Address / City
                  </label>
                  <input
                    id="ebk-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    className={fieldCls}
                    placeholder="Street address and city"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelCls} htmlFor="ebk-message">
                  Tell Us About Your Event{" "}
                  <span className="font-normal text-[#2E4A38]/55">(optional)</span>
                </label>
                <textarea
                  id="ebk-message"
                  name="message"
                  rows={4}
                  className={fieldCls}
                  placeholder="Group age range, space, timing, and anything special you have in mind."
                />
              </div>

              {status === "error" ? (
                <div role="alert" className="ebk-error">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C24A40]" aria-hidden />
                  <span>
                    Something went wrong sending your request. Please try again, or email us
                    directly at{" "}
                    <a
                      href={`mailto:${BOOKING_EMAIL}`}
                      className="font-semibold text-[#9c7406] underline-offset-4 hover:underline"
                    >
                      {BOOKING_EMAIL}
                    </a>
                    .
                  </span>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="ebk-submit group"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    <>
                      Send Expedition Request
                      <Send
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </>
                  )}
                </button>
                <p className="text-xs text-[#2E4A38]/65">
                  We typically reply within one business day.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function BookingSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="ebk-card-frame mt-10">
      <div className="ebk-card ebk-sent">
        <span aria-hidden className="ebk-sent-medal">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="ebk-sent-h">Your Expedition Request Is In</h3>
        <p className="ebk-sent-p">
          Thank you! We&apos;ve received your request and sent a confirmation to your email. Our
          team will follow up within one business day to confirm availability and plan the details.
          (If you don&apos;t see the confirmation, check your spam folder.)
        </p>
        <button type="button" onClick={onReset} className="ebk-sent-again">
          Send another request
        </button>
      </div>
    </div>
  );
}

/** A 3-toed dinosaur track for the background. */
function BookTrack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 104" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="74" rx="19" ry="23" />
      <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
      <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
      <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
    </svg>
  );
}
