import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Compass, Crown, Loader2, Sparkles, Tent, Wand2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { submitInquiry } from "@/lib/inquiry";
import formBg from "@/assets/booking/step3-form-bg.webp";

/**
 * EventDetailsForm — "Step Three: Event Details". A single, short request form on the
 * dream-vista background: only the details the team actually needs. Carries the path /
 * worlds / characters chosen in Steps 1–2 forward (hidden fields + a recap), and uses
 * the same submitInquiry → Resend pipeline (field handlers untouched). The heading
 * lives in the BookingIntro blend section just above. See ".edf" / ".ef3" in styles.css.
 */
type Status = "idle" | "submitting" | "success" | "error";

const BOOKING_EMAIL = "info@vancouvercharacterevents.com";
const fld =
  "w-full rounded-[12px] border border-[rgba(201,164,92,0.5)] bg-[#FFFDF7] px-3.5 py-2.5 text-[0.95rem] text-[#243463] placeholder:text-[#9aa0b5] transition-colors focus:border-[#C19A3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B24B]/45";
const lbl = "mb-1.5 block text-sm font-semibold text-[#1B2A52]";

const EVENT_TYPES = [
  "Birthday Party",
  "School / Daycare Event",
  "Festival / Community Event",
  "Mall Appearance",
  "Corporate Event",
  "Family Fun Day",
  "Holiday Event",
  "Other / Custom Event",
];
const PACKAGE = ["60 Minutes", "90 Minutes", "Custom / Not sure yet"];

export function EventDetailsForm({
  bookingPath,
  selectedWorlds,
  selectedCharacters,
  requestedGuest,
  requestedInflatable,
}: {
  bookingPath?: string;
  selectedWorlds?: string;
  selectedCharacters?: string;
  requestedGuest?: string;
  requestedInflatable?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot
    const fields = Object.fromEntries(
      [...data.entries()].filter(([k]) => k !== "company"),
    ) as Record<string, string>;
    setStatus("submitting");
    const res = await submitInquiry("Event request (booking page)", fields);
    if (res.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="book" aria-labelledby="edf-title" className="edf ef3 relative isolate scroll-mt-20 overflow-hidden">
      <img src={formBg} alt="" aria-hidden decoding="async" loading="lazy" className="ef3-bg absolute inset-0 -z-20 h-full w-full object-cover" />
      <span aria-hidden className="ef3-scrim absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        {status === "success" ? (
          <Reveal y={18} className="block">
            <div className="ef3-card ef3-success text-center">
              <span aria-hidden className="ef3-seal"><Crown className="h-7 w-7" /></span>
              <h3 id="edf-title" className="ef3-success-title">Your Event Request Has Entered the Booking Hall</h3>
              <p className="ef3-success-copy">
                Thank you! We&apos;ve received your event details and will follow up with availability,
                recommendations, and next steps — usually within one business day. (If you don&apos;t see
                our confirmation, check your spam folder.)
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="ef3-success-again">
                Send another request
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal y={18} className="block">
            <form onSubmit={handleSubmit} className="ef3-card" noValidate>
              {/* honeypot */}
              <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="company">Company (leave blank)</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* carried-forward selections (hidden + recap) */}
              {bookingPath ? <input type="hidden" name="bookingPath" value={bookingPath} /> : null}
              {selectedWorlds ? <input type="hidden" name="selectedWorlds" value={selectedWorlds} /> : null}
              {selectedCharacters ? <input type="hidden" name="selectedCharacters" value={selectedCharacters} /> : null}
              {requestedGuest ? <input type="hidden" name="requestedGuest" value={requestedGuest} /> : null}
              {requestedInflatable ? (
                <>
                  <input type="hidden" name="requestedInflatable" value={requestedInflatable} />
                  <input type="hidden" name="inflatablePartner" value="HW House of Bounce" />
                </>
              ) : null}

              <h3 id="edf-title" className="ef3-title">Just a few event details</h3>
              <p className="ef3-sub">Tell us what you know — we&apos;ll follow up with availability and next steps.</p>

              {(bookingPath || selectedCharacters || selectedWorlds) ? (
                <div className="ef3-recap" aria-label="Your selections">
                  {bookingPath ? <span className="ef3-recap-chip"><Compass className="h-3.5 w-3.5" aria-hidden /> {bookingPath}</span> : null}
                  {selectedCharacters ? (
                    <span className="ef3-recap-chip"><Sparkles className="h-3.5 w-3.5" aria-hidden /> {selectedCharacters}</span>
                  ) : selectedWorlds ? (
                    <span className="ef3-recap-chip"><Sparkles className="h-3.5 w-3.5" aria-hidden /> {selectedWorlds}</span>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={lbl} htmlFor="date">Event date</label>
                  <input id="date" name="date" type="date" className={fld} />
                </div>
                <div>
                  <label className={lbl} htmlFor="time">Event time</label>
                  <input id="time" name="time" type="time" className={fld} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl} htmlFor="address">Event address</label>
                  <input id="address" name="address" type="text" className={fld} placeholder="Street address or venue name" />
                </div>
                <div>
                  <label className={lbl} htmlFor="city">Event city</label>
                  <input id="city" name="city" type="text" className={fld} placeholder="Coquitlam, Vancouver, Surrey…" />
                </div>
                <div>
                  <label className={lbl} htmlFor="eventType">Event type</label>
                  <select id="eventType" name="eventType" className={fld} defaultValue="">
                    <option value="" disabled>Select event type</option>
                    {EVENT_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className={lbl} htmlFor="name">Your name <span className="text-[#C9337E]">*</span></label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={fld} placeholder="Your full name" />
                </div>
                <div>
                  <label className={lbl} htmlFor="guestName">
                    Child&apos;s name <span className="font-normal text-[#7a8099]">(optional — helps us prep our actors)</span>
                  </label>
                  <input id="guestName" name="guestName" type="text" className={fld} placeholder="Guest of honour" />
                </div>
                <div>
                  <label className={lbl} htmlFor="email">Email <span className="text-[#C9337E]">*</span></label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={fld} placeholder="you@example.com" />
                </div>
                <div>
                  <label className={lbl} htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={fld} placeholder="(778) 000-0000" />
                </div>
                <div>
                  <label className={lbl} htmlFor="guests">Guest count</label>
                  <input id="guests" name="guests" type="number" min={1} className={fld} placeholder="Approx. number of guests" />
                </div>
                <div>
                  <label className={lbl} htmlFor="packageStyle">Package</label>
                  <select id="packageStyle" name="packageStyle" className={fld} defaultValue="">
                    <option value="" disabled>Select</option>
                    {PACKAGE.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl} htmlFor="message">Notes</label>
                  <textarea id="message" name="message" rows={4} className={fld} placeholder="Theme, favourite characters, schedule, special moments, parking/access, or anything else we should know." />
                </div>
              </div>

              <p className="ef3-note">
                <Tent className="h-3.5 w-3.5" aria-hidden /> Inflatable partner add-ons may be available through
                trusted vendors depending on date, location, setup needs, and event type.
              </p>

              <label className="ef3-ack">
                <input type="checkbox" name="acknowledge" value="Yes" className="ef3-ack-box" />
                <span>I understand this is a request for availability &amp; pricing, not a confirmed booking yet.</span>
              </label>

              {status === "error" ? (
                <div role="alert" className="ef3-error">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Something went wrong sending your request. Please try again, or email us at{" "}
                    <a href={`mailto:${BOOKING_EMAIL}`} className="font-semibold underline underline-offset-2">{BOOKING_EMAIL}</a>.
                  </span>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === "submitting"} className="ef3-submit group">
                  {status === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending Request…</>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" aria-hidden />
                      Send My Event Request
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                    </>
                  )}
                </button>
                <p className="text-xs text-[#6B7596]">We typically reply within one business day.</p>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
