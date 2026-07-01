import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, CalendarCheck, Compass, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * TeamClose — final section of the Our Team page: "Ready to meet the team at your
 * event?". A warm customer-facing sendoff that turns the focus back to booking — a
 * centred cream Cast-Hall card on a dark theatre panel, with a compass-star seal, two
 * CTAs (start a booking / explore worlds), a help link, and a reassurance row. CSS-only
 * (velvet-curtain edges + spotlight + gold dust via gradients), motion under .tcl.anim,
 * reduced-motion safe. See ".tcl" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const REASSURE = [
  { icon: Users, label: "Real Performers", sub: "People behind every character" },
  { icon: ShieldCheck, label: "Event-Ready Visits", sub: "Prepared, professional, and guest-focused" },
  { icon: CalendarCheck, label: "Flexible Experiences", sub: "Tailored to your event, venue, and guests" },
  { icon: Heart, label: "Memories First", sub: "Creating moments that last" },
] as const;

const DUST = [
  { left: "12%", s: 3, delay: "0s", dur: "15s", dx: "8px" },
  { left: "30%", s: 4, delay: "3.6s", dur: "17s", dx: "-7px" },
  { left: "70%", s: 3, delay: "1.8s", dur: "14s", dx: "10px" },
  { left: "88%", s: 4, delay: "5.2s", dur: "16.5s", dx: "-9px" },
] as const;

export function TeamClose() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="tcl-title"
      className={cn("tcl relative isolate overflow-hidden", motionOK && "anim")}
    >
      {/* velvet-curtain edges + warm spotlight (CSS gradients) */}
      <span aria-hidden className="tcl-curtain tcl-curtain--l" />
      <span aria-hidden className="tcl-curtain tcl-curtain--r" />
      <span aria-hidden className="tcl-spot absolute -z-10" />
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="tcl-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[880px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal y={18} className="block">
          <div className="tcl-card">
            <span aria-hidden className="tcl-seal"><Compass className="h-7 w-7" /></span>

            <span className="tcl-eyebrow">
              <span aria-hidden className="tcl-eyebrow-fl" />
              Bring the Cast to Your Celebration
              <span aria-hidden className="tcl-eyebrow-fl tcl-eyebrow-fl--r" />
            </span>

            <h2 id="tcl-title" className="tcl-title">
              Ready to meet the team <em className="tcl-title-em">at your event?</em>
            </h2>

            <p className="tcl-sub">
              From character greetings and party hosting to photos, games, dancing, storytelling,
              holiday visits, dinosaur experiences, mascot moments, and event add-ons, our cast helps
              bring the Vancouver Character Events worlds to life.
            </p>
            <p className="tcl-support">
              Tell us what you are planning, and we&apos;ll help match the right performers, worlds,
              characters, and experiences to your event.
            </p>

            <div className="tcl-ctas">
              <CTAButton to="/contact" size="lg" variant="ghost-ink" className="tcl-cta-primary group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Start Booking Request
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </CTAButton>
              <CTAButton to="/character-adventures" size="lg" variant="ghost-ink" className="tcl-cta-ghost">
                Explore Our Worlds
              </CTAButton>
            </div>

            <Reveal delay={120} y={10}>
              <a href="/contact" className="tcl-help">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Not sure where to start? We can help you choose.
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </Reveal>

            <ul className="tcl-reassure">
              {REASSURE.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="tcl-reassure-item">
                  <span aria-hidden className="tcl-reassure-ic"><Icon className="h-4 w-4" /></span>
                  <span className="tcl-reassure-txt">
                    <strong>{label}</strong>
                    <span>{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
