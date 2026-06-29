import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  Check,
  Compass,
  HeartHandshake,
  Mail,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * WhatHappensNext — "What happens next?": the post-submit process beat of the
 * booking page, after the FAQ. Five Grand Booking Hall planning steps along a gold
 * path (We Review → Check Availability → Recommend → Send Pricing → You Finalize),
 * a "You are not locked in yet" reassurance strip, and a quiet CTA back to the
 * form. Request language only — the booking is confirmed only after final review.
 * Central VCE palette (cream + gold + royal navy); reduced-motion safe via Reveal +
 * the global guard. See ".whn" in styles.css.
 */
/* Each step's medal carries a faint realm-hue ring — five of the eight worlds
   (incl. mascot + bazaar), so the timeline reads as one gold path with realm waypoints. */
const STEPS: { icon: ComponentType<{ className?: string }>; title: string; copy: string; acc: string }[] = [
  {
    icon: ScrollText,
    title: "We Review Your Request",
    copy: "We look over your event date, city, venue, guest count, selected world(s), character or service interests, and any notes you shared.",
    acc: "#3E6EA8",
  },
  {
    icon: CalendarCheck,
    title: "We Check Availability",
    copy: "We check performer, character, partner, and add-on availability for your requested date, time, location, and event type.",
    acc: "#6DA63C",
  },
  {
    icon: Compass,
    title: "We Recommend the Best Fit",
    copy: "If you're unsure or your first choice isn't available, we suggest the best world, character, package, add-on, or event format for your celebration.",
    acc: "#8E5BC8",
  },
  {
    icon: Mail,
    title: "We Send Pricing & Next Steps",
    copy: "We follow up with availability, pricing options, important details, and the next steps to move forward. Larger events or add-ons may need a custom quote.",
    acc: "#B3433F",
  },
  {
    icon: BadgeCheck,
    title: "You Finalize the Booking",
    copy: "Once the details are confirmed, we'll guide you through the final steps. Your event is only confirmed after everything is reviewed and finalized.",
    acc: "#2C8A93",
  },
];

const POINTS = [
  "Availability checked manually",
  "Recommendations included",
  "Custom quotes available",
  "Booking confirmed only after final approval",
];

export function WhatHappensNext() {
  // Draw the gold timeline path in when it scrolls into view. The path is armed at
  // 0 width by CSS; JS just adds .is-drawn. Reduced-motion is forced to full width
  // in CSS, so the line is never shipped invisible.
  const stepsRef = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="what-happens-next" aria-labelledby="whn-title" className="whn relative isolate overflow-hidden">
      <div aria-hidden className="whn-decor pointer-events-none absolute inset-0">
        <span className="whn-glow whn-glow-l" />
        <span className="whn-glow whn-glow-r" />
        <span className="whn-map" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="whn-head mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <span className="whn-eyebrow">
              <span aria-hidden className="whn-eyebrow-fl" />
              After you send your request
              <span aria-hidden className="whn-eyebrow-fl whn-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={90} y={16}>
            <h2 id="whn-title" className="whn-title">What happens next?</h2>
          </Reveal>
          <Reveal delay={160} y={14}>
            <p className="whn-sub">
              Once your event request reaches the VCE booking desk, we review the details, check
              availability, and follow up with the best options for your celebration.
            </p>
          </Reveal>
          <Reveal delay={220} y={12}>
            <p className="whn-helper">
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> Your booking isn&apos;t confirmed until
              availability, pricing, and final details are reviewed and agreed.
            </p>
          </Reveal>
        </div>

        {/* 5-step timeline */}
        <ol ref={stepsRef} className={drawn ? "whn-steps is-drawn" : "whn-steps"}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={280 + i * 110} y={20} as="li" className="whn-step">
                <span aria-hidden className="whn-medal" style={{ "--acc": s.acc } as CSSProperties}>{i + 1}</span>
                <div className="whn-card">
                  <span aria-hidden className="whn-emblem"><Icon className="h-6 w-6" /></span>
                  <h3 className="whn-step-title">{s.title}</h3>
                  <p className="whn-step-copy">{s.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* reassurance strip */}
        <Reveal delay={140} y={16} className="block">
          <div className="whn-reassure">
            <div className="whn-reassure-lead">
              <span aria-hidden className="whn-reassure-ic"><HeartHandshake className="h-5 w-5" /></span>
              <div>
                <h3 className="whn-reassure-title">You are not locked in yet.</h3>
                <p className="whn-reassure-copy">
                  The form simply gives us the details we need to recommend the right option. We&apos;ll
                  follow up before anything is finalized.
                </p>
              </div>
            </div>
            <ul className="whn-points">
              {POINTS.map((p) => (
                <li key={p}><Check className="h-3.5 w-3.5" aria-hidden /> {p}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
