import { useEffect, useState, type ComponentType } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Crown,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * BookingClose — "Your Event Starts Here": the final closing desk of the booking
 * page, after the FAQ. One centred parchment seal-card inside the Grand Booking
 * Hall — a VCE request-desk seal, the warm final push, two CTAs back to the form /
 * event plan, a help link, and a navy four-point reassurance band. Request language
 * only (never "confirmed/reserved/paid"). Central VCE palette (cream + gold + royal
 * navy), gentle dust + a gold sheen on the seal, reduced-motion safe via Reveal +
 * the global guard. See ".bkc" in styles.css.
 */
const ASSURE: { icon: ComponentType<{ className?: string }>; t: string; s: string }[] = [
  { icon: CalendarCheck, t: "Availability checked manually", s: "We personally review every date and request." },
  { icon: Wand2, t: "Recommendations included", s: "We suggest the best characters, experiences, and add-ons." },
  { icon: ShieldCheck, t: "No booking confirmed", s: "Your booking isn't confirmed until we finalize next steps." },
  { icon: Sparkles, t: "Custom options available", s: "We can shape the right experience for your event." },
];

/* The few ambient motes, re-skinned into a mixed all-worlds dust (confetti / bubble /
   star / gold), so the close quietly nods to every realm — no extra nodes. */
const DUST = [
  { left: "8%", s: 5, delay: "0s", dur: "16s", dx: "9px", cls: "bkc-dust--confetti", acc: "#6DA63C" },
  { left: "24%", s: 4, delay: "3.4s", dur: "19s", dx: "-7px", cls: "bkc-dust--bubble", acc: "#1E8A9E" },
  { left: "76%", s: 5, delay: "1.6s", dur: "17s", dx: "10px", cls: "bkc-dust--star", acc: "#8E5BC8" },
  { left: "92%", s: 3, delay: "4.8s", dur: "20s", dx: "-9px", cls: "", acc: "#C19A3C" },
] as const;

export function BookingClose() {
  const [motionOK, setMotionOK] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionOK(true);
  }, []);

  return (
    <section id="booking-close" aria-labelledby="bkc-title" className="bkc relative isolate overflow-hidden">
      <div aria-hidden className="bkc-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bkc-glow" />
        <span className="bkc-map" />
        {motionOK
          ? DUST.map((d, i) => (
              <span
                key={i}
                className={d.cls ? `bkc-dust ${d.cls}` : "bkc-dust"}
                style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, ["--dx" as string]: d.dx, ["--acc" as string]: d.acc }}
              />
            ))
          : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal y={20} className="block">
          <div className="bkc-card">
            {/* request-desk seal */}
            <span aria-hidden className="bkc-seal">
              <Crown className="bkc-seal-crown h-4 w-4" />
              <span className="bkc-seal-vce">VCE</span>
              {motionOK ? <span aria-hidden className="bkc-seal-sheen" /> : null}
            </span>
            <span className="bkc-seal-label">Request Desk</span>

            <Reveal delay={120} y={14}>
              <span className="bkc-eyebrow">
                <span aria-hidden className="bkc-eyebrow-fl" />
                Ready when you are
                <span aria-hidden className="bkc-eyebrow-fl bkc-eyebrow-fl--r" />
              </span>
            </Reveal>
            <Reveal delay={180} y={16}>
              <h2 id="bkc-title" className="bkc-title">Your event starts here.</h2>
            </Reveal>
            <Reveal delay={250} y={14}>
              <p className="bkc-sub">
                Choose your path, share what you know, and we&apos;ll help turn your event idea into the
                right characters, worlds, experiences, and add-ons.
              </p>
            </Reveal>
            <Reveal delay={310} y={14}>
              <p className="bkc-copy">
                Whether you&apos;re planning a birthday, school visit, mall appearance, festival,
                corporate event, holiday celebration, or multi-world experience, your request helps us
                check availability and recommend the best fit.
              </p>
            </Reveal>

            <Reveal delay={380} y={16}>
              <div className="bkc-actions">
                <a href="#book" className="bkc-cta-primary group">
                  <Wand2 className="h-4 w-4" aria-hidden />
                  Send My Event Request
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </a>
                <a href="#choose-world" className="bkc-cta-ghost">Review My Event Plan</a>
              </div>
            </Reveal>
            <Reveal delay={430} y={12}>
              <a href="#choose-world" className="bkc-help">
                <HelpCircle className="h-4 w-4" aria-hidden />
                Still unsure? Choose Help Me Decide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </Reveal>

            {/* reassurance band */}
            <ul className="bkc-assure">
              {ASSURE.map(({ icon: Icon, t, s }) => (
                <li key={t} className="bkc-assure-item">
                  <span aria-hidden className="bkc-assure-ic"><Icon className="h-4 w-4" /></span>
                  <span>
                    <span className="bkc-assure-t">{t}</span>
                    <span className="bkc-assure-s">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="bkc-thanks">
          <span aria-hidden className="bkc-thanks-fl" />
          Thank you for trusting Vancouver Character Events
          <span aria-hidden className="bkc-thanks-fl bkc-thanks-fl--r" />
        </p>
      </div>
    </section>
  );
}
