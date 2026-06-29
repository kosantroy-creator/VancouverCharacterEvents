import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Compass,
  Crown,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Tent,
  Wand2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { submitInquiry } from "@/lib/inquiry";

/**
 * EventDetailsForm — "Tell Us About Your Event": step three of the booking page,
 * the Event Request Scroll. The same inquiry pipeline as the rest of the site
 * (submitInquiry → Resend) — field names/handlers untouched — re-organized into
 * grouped Grand Booking Hall planning panels with a live "Your Event Plan" summary
 * that carries the booking path + selected worlds forward from the previous
 * sections (hidden fields keep them in the request). Cream/gold planning-desk
 * palette, navy headings, reduced-motion safe. See ".edf" in styles.css.
 */
type Status = "idle" | "submitting" | "success" | "error";

const BOOKING_EMAIL = "info@vancouvercharacterevents.com";
const fld =
  "w-full rounded-[12px] border border-[rgba(201,164,92,0.5)] bg-[#FFFDF7] px-3.5 py-2.5 text-[0.95rem] text-[#243463] placeholder:text-[#9aa0b5] transition-colors focus:border-[#C19A3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B24B]/45";
const lbl = "mb-1.5 block text-sm font-semibold text-[#1B2A52]";

const SETTING = ["Indoor", "Outdoor", "Both", "Not sure yet"];
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
const AGE = ["1–3", "4–6", "7–10", "11–13", "Teens", "Adults", "Mixed Ages", "Not sure yet"];
const PACKAGE = [
  "Short Character Visit",
  "Full Party Experience",
  "School / Daycare Visit",
  "Mall / Festival Appearance",
  "Corporate / Community Event",
  "Add-On Services",
  "Not Sure Yet",
];
const ADDONS = [
  "Face Painting",
  "Balloon Twisting",
  "Photography",
  "Inflatable Partners",
  "Multiple Add-Ons",
  "Not Sure Yet",
  "No Add-Ons Needed",
];
const REFERRAL = ["Google", "Instagram", "Facebook", "Referral", "Past Client", "Event / Festival", "GigSalad", "Other"];
const CONTACT_METHOD = ["Email", "Text", "Phone Call", "No preference"];

function Panel({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal y={18} className="block">
      <fieldset className="edf-panel">
        <legend className="edf-legend">
          <span aria-hidden className="edf-legend-n">{n}</span>
          {title}
        </legend>
        {children}
      </fieldset>
    </Reveal>
  );
}

export function EventDetailsForm({
  bookingPath,
  selectedWorlds,
  requestedGuest,
  requestedInflatable,
  defaultInterest,
}: {
  bookingPath?: string;
  selectedWorlds?: string;
  requestedGuest?: string;
  requestedInflatable?: string;
  defaultInterest?: string;
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
    <section id="book" aria-labelledby="edf-title" className="edf relative isolate scroll-mt-20">
      <div aria-hidden className="edf-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="edf-glow edf-glow-l" />
        <span className="edf-glow edf-glow-r" />
        <span className="edf-map" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="edf-head mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <span className="edf-eyebrow">
              <span aria-hidden className="edf-eyebrow-fl" />
              Step Three · Event Details
              <span aria-hidden className="edf-eyebrow-fl edf-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={90} y={16}>
            <h2 id="edf-title" className="edf-title">Tell us about your celebration.</h2>
          </Reveal>
          <Reveal delay={160} y={14}>
            <p className="edf-sub">
              Share the date, location, guest count, and event style so we can check availability and
              recommend the best characters, experiences, and add-ons.
            </p>
          </Reveal>
          <Reveal delay={220} y={12}>
            <p className="edf-help">
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> You don&apos;t need to know every detail
              yet — tell us what you know and we&apos;ll help guide the rest.
            </p>
          </Reveal>
        </div>

        {status === "success" ? (
          <div className="edf-success mx-auto mt-10 max-w-xl text-center">
            <span aria-hidden className="edf-seal"><Crown className="h-7 w-7" /></span>
            <h3 className="edf-success-title">Your Event Request Has Entered the Booking Hall</h3>
            <p className="edf-success-copy">
              Thank you! We&apos;ve received your event details and will follow up with availability,
              recommendations, and next steps — usually within one business day. (If you don&apos;t see
              our confirmation, check your spam folder.)
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="edf-success-again">
              Send another request
            </button>
          </div>
        ) : (
          <div className="edf-layout">
            {/* ===== form ===== */}
            <form onSubmit={handleSubmit} className="edf-form" noValidate>
              {/* honeypot */}
              <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="company">Company (leave blank)</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* carried-forward selections */}
              {bookingPath ? <input type="hidden" name="bookingPath" value={bookingPath} /> : null}
              {selectedWorlds ? <input type="hidden" name="selectedWorlds" value={selectedWorlds} /> : null}
              {requestedGuest ? <input type="hidden" name="requestedGuest" value={requestedGuest} /> : null}
              {requestedInflatable ? (
                <>
                  <input type="hidden" name="requestedInflatable" value={requestedInflatable} />
                  <input type="hidden" name="inflatablePartner" value="HW House of Bounce" />
                </>
              ) : null}

              {/* Group 1 — Event Basics */}
              <Panel n="1" title="Event Basics">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={lbl} htmlFor="date">Event date</label>
                    <input id="date" name="date" type="date" className={fld} />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="city">City / area</label>
                    <input id="city" name="city" type="text" className={fld} placeholder="Coquitlam, Vancouver, Surrey, Langley…" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="time">Approx. start time</label>
                    <input id="time" name="time" type="time" className={fld} />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="endTime">Approx. end / duration</label>
                    <input id="endTime" name="endTime" type="text" className={fld} placeholder="e.g. 2 hours, or 4:00 PM" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="venue">Venue / setting</label>
                    <input id="venue" name="venue" type="text" className={fld} placeholder="Home, school, daycare, mall, park, venue…" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="setting">Indoor or outdoor?</label>
                    <select id="setting" name="setting" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {SETTING.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </Panel>

              {/* Group 2 — Event Type & Guests */}
              <Panel n="2" title="Event Type & Guests">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={lbl} htmlFor="eventType">Event type</label>
                    <select id="eventType" name="eventType" className={fld} defaultValue="">
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl} htmlFor="guests">Estimated guest count</label>
                    <input id="guests" name="guests" type="number" min={1} className={fld} placeholder="Approx. number of children / guests" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="ageRange">Age range of guests</label>
                    <select id="ageRange" name="ageRange" className={fld} defaultValue="">
                      <option value="" disabled>Select age range</option>
                      {AGE.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl} htmlFor="guestName">Guest of honour <span className="font-normal text-[#7a8099]">(optional)</span></label>
                    <input id="guestName" name="guestName" type="text" className={fld} placeholder="Child's name, class, company, group…" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={lbl} htmlFor="guestAge">Guest of honour age <span className="font-normal text-[#7a8099]">(optional)</span></label>
                    <input id="guestAge" name="guestAge" type="text" className={fld} placeholder="Turning 5, grade 2, mixed group…" />
                  </div>
                </div>
              </Panel>

              {/* Group 3 — Experience Details */}
              <Panel n="3" title="Experience Details">
                {(bookingPath || selectedWorlds) ? (
                  <div className="edf-carried">
                    {bookingPath ? (
                      <p><Compass className="h-4 w-4" aria-hidden /> Booking path: <strong>{bookingPath}</strong></p>
                    ) : null}
                    {selectedWorlds ? (
                      <p><Sparkles className="h-4 w-4" aria-hidden /> Worlds: <strong>{selectedWorlds}</strong></p>
                    ) : null}
                  </div>
                ) : null}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={lbl} htmlFor="interest">Character / service interest</label>
                    <input id="interest" name="interest" type="text" className={fld} defaultValue={defaultInterest ?? ""} placeholder="Princess visit, dinosaur experience, mascot, face painting, Santa visit, multiple performers, not sure yet…" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="packageStyle">Package / visit style</label>
                    <select id="packageStyle" name="packageStyle" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {PACKAGE.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl} htmlFor="addOns">Interested in add-ons?</label>
                    <select id="addOns" name="addOns" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {ADDONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <p className="edf-note">
                  <Tent className="h-3.5 w-3.5" aria-hidden /> Inflatable partner add-ons may be available
                  through trusted vendors depending on date, location, setup needs, and event type.
                </p>
              </Panel>

              {/* Group 4 — Planning Notes */}
              <Panel n="4" title="Planning Notes">
                <div className="grid gap-4">
                  <div>
                    <label className={lbl} htmlFor="message">Tell us about your event</label>
                    <textarea id="message" name="message" rows={4} className={fld} placeholder="Theme, schedule, favourite characters, special moments, or the feeling you want the event to have." />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="spaceNotes">Anything we should know about the space? <span className="font-normal text-[#7a8099]">(optional)</span></label>
                    <textarea id="spaceNotes" name="spaceNotes" rows={3} className={fld} placeholder="Parking, stairs, elevator, outdoor surface, school gym, party room, weather plan, accessibility…" />
                  </div>
                  <div className="sm:max-w-xs">
                    <label className={lbl} htmlFor="referral">How did you hear about us?</label>
                    <select id="referral" name="referral" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {REFERRAL.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </Panel>

              {/* Group 5 — Contact Details */}
              <Panel n="5" title="Contact Details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={lbl} htmlFor="name">Your name <span className="text-[#C9337E]">*</span></label>
                    <input id="name" name="name" type="text" required autoComplete="name" className={fld} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="email">Email address <span className="text-[#C9337E]">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={fld} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="phone">Phone number</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={fld} placeholder="(778) 000-0000" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="contactMethod">Best way to contact you</label>
                    <select id="contactMethod" name="contactMethod" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {CONTACT_METHOD.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <label className="edf-ack">
                  <input type="checkbox" name="acknowledge" value="Yes" className="edf-ack-box" />
                  <span>I understand this is a request for availability &amp; pricing, not a confirmed booking yet.</span>
                </label>
              </Panel>

              {status === "error" ? (
                <div role="alert" className="edf-error">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Something went wrong sending your request. Please try again, or email us at{" "}
                    <a href={`mailto:${BOOKING_EMAIL}`} className="font-semibold underline underline-offset-2">{BOOKING_EMAIL}</a>.
                  </span>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === "submitting"} className="edf-submit group">
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

            {/* ===== Your Event Plan summary ===== */}
            <Reveal delay={120} y={18} as="aside" className="edf-aside">
              <div className="edf-summary">
                <h3 className="edf-summary-title"><Sparkles className="h-4 w-4" aria-hidden /> Your Event Plan</h3>

                <div className="edf-summary-row">
                  <span className="edf-summary-label">Booking path</span>
                  <p className="edf-summary-value">{bookingPath ?? <span className="edf-summary-muted">No selections yet</span>}</p>
                </div>
                <div className="edf-summary-row">
                  <span className="edf-summary-label">Selected worlds</span>
                  <p className="edf-summary-value">{selectedWorlds ?? <span className="edf-summary-muted">Choose in the form above</span>}</p>
                </div>

                <ul className="edf-assure">
                  {[
                    { icon: CalendarCheck, t: "Availability checked manually" },
                    { icon: Wand2, t: "Recommendations included" },
                    { icon: Sparkles, t: "Custom options available" },
                    { icon: ShieldCheck, t: "No booking confirmed until finalized" },
                  ].map(({ icon: Icon, t }) => (
                    <li key={t}><Icon className="h-4 w-4" aria-hidden /> {t}</li>
                  ))}
                </ul>

                <div className="edf-summary-contact">
                  <span className="edf-summary-label">Prefer to talk?</span>
                  <a href="tel:+17788006940"><Phone className="h-4 w-4" aria-hidden /> (778) 800-6940</a>
                  <a href={`mailto:${BOOKING_EMAIL}`}><Mail className="h-4 w-4" aria-hidden /> Email us</a>
                </div>
                <p className="edf-trust-line"><BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Trained, in-house performers · Metro Vancouver</p>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
