import { useState, type ComponentType } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Compass,
  Mail,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * BookingFaq — "Before You Send Your Request": the final reassurance / FAQ beat of
 * the booking page, after the Event Details form. A calm corner of the Grand
 * Booking Hall — a left reassurance panel ("You do not need to have everything
 * figured out" + four trust points) beside a right accordion of the ten most-asked
 * booking questions, closed by a Return-to-form CTA bar. Central VCE palette
 * (cream + gold + royal navy). Single-open accordion with real buttons /
 * aria-expanded; reduced-motion safe via Reveal + the global guard. See ".bkf".
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a confirmed booking?",
    a: "No. Submitting the form sends us your event request. Your booking is not confirmed until we review availability, recommend the best option, send pricing or next steps, and the booking is finalized.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We review your event date, time, location, guest count, selected world(s), character or service interests, and any notes you provided. Then we follow up with availability, recommendations, pricing options, and next steps.",
  },
  {
    q: "What if I don't know which character or world to choose?",
    a: "That's completely okay. Choose Help Me Decide or select the closest option. We can recommend the best world, character style, visit format, or add-ons based on your event type, age range, location, and guest count.",
  },
  {
    q: "Why isn't pricing always one simple number?",
    a: "Pricing can depend on the character or service, event length, location, travel, guest count, setup needs, date, time, add-ons, and whether the event is private, school-based, public, corporate, or festival-style.",
  },
  {
    q: "Can I combine multiple worlds or services?",
    a: "Yes. Multi-world events can include multiple characters, experiences, or Enchanted Bazaar add-ons such as face painting, balloon twisting, photography, or inflatable partner inquiries. We can help recommend the best combination.",
  },
  {
    q: "Do you do schools, daycares, malls, festivals, and corporate events?",
    a: "Yes. We can support birthdays, schools, daycares, malls, festivals, corporate events, community celebrations, family fun days, and larger public appearances. Larger events may require more planning around timing, space, guest flow, and performer availability.",
  },
  {
    q: "Can I request add-ons like face painting, balloons, photography, or inflatables?",
    a: "Yes. Enchanted Bazaar add-ons can be requested through the booking form. Face painting, balloon twisting, and photography may be available depending on date, location, setup needs, and guest count. Inflatable partner add-ons may be available through trusted vendors depending on date, location, setup needs, and event type.",
  },
  {
    q: "How far in advance should I book?",
    a: "The earlier the better — especially for weekends, holidays, schools, malls, festivals, corporate events, and popular characters. Last-minute requests may still be possible depending on availability.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve events across the Vancouver area and surrounding Lower Mainland communities. Travel availability and fees may depend on the city, timing, performer, and event type.",
  },
  {
    q: "Can I ask a question instead of filling out the full form?",
    a: "For the fastest, most accurate help, we recommend choosing the closest booking path and completing the form with what you know. If your question is very specific, include it in the notes section and we'll respond with guidance.",
  },
];

const TRUST: { icon: ComponentType<{ className?: string }>; t: string }[] = [
  { icon: CalendarCheck, t: "Availability checked manually" },
  { icon: Wand2, t: "Recommendations included" },
  { icon: Sparkles, t: "Custom options available" },
  { icon: ShieldCheck, t: "No booking confirmed until finalized" },
];

export function BookingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="booking-faq" aria-labelledby="bkf-title" className="bkf relative isolate overflow-hidden">
      <div aria-hidden className="bkf-decor pointer-events-none absolute inset-0">
        <span className="bkf-glow bkf-glow-l" />
        <span className="bkf-glow bkf-glow-r" />
        <span className="bkf-map" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bkf-head mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <span className="bkf-eyebrow">
              <span aria-hidden className="bkf-eyebrow-fl" />
              Booking Hall Details
              <span aria-hidden className="bkf-eyebrow-fl bkf-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={90} y={16}>
            <h2 id="bkf-title" className="bkf-title">A few helpful answers before you send your request.</h2>
          </Reveal>
          <Reveal delay={160} y={14}>
            <p className="bkf-sub">
              Not every event fits into one simple box. Here are the most common questions about
              availability, pricing, add-ons, larger events, and what happens after you submit your
              request.
            </p>
          </Reveal>
        </div>

        {/* layout: reassurance panel + accordion */}
        <div className="bkf-layout">
          {/* reassurance */}
          <Reveal delay={140} y={18} className="block">
            <aside className="bkf-reassure">
              <span aria-hidden className="bkf-scroll"><Compass className="h-8 w-8" /></span>
              <h3 className="bkf-reassure-title">You do not need to have everything figured out.</h3>
              <p className="bkf-reassure-copy">
                Tell us what you know — your date, city, guest count, event type, and the kind of
                experience you&apos;re imagining. We&apos;ll help recommend the best world, character,
                package, or add-ons.
              </p>
              <span className="bkf-goodhands">
                <span aria-hidden className="bkf-goodhands-fl" /> You&apos;re in good hands
                <span aria-hidden className="bkf-goodhands-fl bkf-goodhands-fl--r" />
              </span>
              <ul className="bkf-trust">
                {TRUST.map(({ icon: Icon, t }) => (
                  <li key={t} className="bkf-trust-item">
                    <span aria-hidden className="bkf-trust-ic"><Icon className="h-4 w-4" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="bkf-contact">
                <span className="bkf-contact-l">Still have a question?</span>
                <div className="bkf-contact-links">
                  <a href="tel:+17788006940"><Phone className="h-4 w-4" aria-hidden /> (778) 800-6940</a>
                  <a href="mailto:info@vancouvercharacterevents.com"><Mail className="h-4 w-4" aria-hidden /> Email us</a>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* accordion */}
          <Reveal delay={120} y={18} className="block">
            <ul className="bkf-acc">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className={cn("bkf-row", isOpen && "is-open")}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`bkf-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="bkf-q"
                      >
                        <span aria-hidden className="bkf-q-ic"><Compass className="h-4 w-4" /></span>
                        <span className="bkf-q-n">{i + 1}.</span>
                        <span className="bkf-q-text">{item.q}</span>
                        <span aria-hidden className="bkf-q-toggle">
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                    </h3>
                    <div id={`bkf-a-${i}`} role="region" className="bkf-a">
                      <div className="bkf-a-inner"><p>{item.a}</p></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* CTA bar */}
        <Reveal delay={120} y={18} className="block">
          <div className="bkf-cta">
            <div className="bkf-cta-copy">
              <span aria-hidden className="bkf-seal">VCE</span>
              <div>
                <h3 className="bkf-cta-title">Ready to send your event request?</h3>
                <p className="bkf-cta-text">
                  Choose your path, select your world, and share your event details — we&apos;ll review
                  everything and follow up with availability and recommendations.
                </p>
              </div>
            </div>
            <div className="bkf-cta-actions">
              <a href="#book" className="bkf-cta-primary group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Return to Event Form
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
