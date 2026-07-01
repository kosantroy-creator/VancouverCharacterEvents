import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, CalendarCheck, Compass, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * TeamClose — the final act of the Our Team page: "Ready to meet the team at your
 * event?". A stage finale rather than a boxed card: the compass seal, invitation type,
 * and CTAs sit directly on the dark spotlit stage (velvet edges + vignette from the
 * act styling), with the one gold-filled button on the page as the closing action.
 * Below, the four reassurances run as a slim programme strip with hairline dividers —
 * echoing the Trust act's printed-programme archetype. CSS-only, motion under
 * .tcl.anim, reduced-motion safe. See ".tcl" in styles.css.
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

      <div className="relative z-10 mx-auto w-full max-w-[880px] px-5 py-24 text-center sm:px-6 md:py-28 lg:px-8">
        <Reveal y={14}>
          <span aria-hidden className="tcl-seal"><Compass className="h-7 w-7" /></span>
        </Reveal>

        <Reveal delay={90} y={14}>
          <span className="tcl-eyebrow">
            <span aria-hidden className="tcl-eyebrow-fl" />
            Bring the Cast to Your Celebration
            <span aria-hidden className="tcl-eyebrow-fl tcl-eyebrow-fl--r" />
          </span>
        </Reveal>

        <Reveal delay={160} y={16}>
          <h2 id="tcl-title" className="tcl-title">
            Ready to meet the team <em className="tcl-title-em">at your event?</em>
          </h2>
        </Reveal>

        <Reveal delay={230} y={14}>
          <p className="tcl-sub">
            From character greetings and party hosting to photos, games, dancing, storytelling,
            holiday visits, dinosaur experiences, mascot moments, and event add-ons, our cast helps
            bring the Vancouver Character Events worlds to life.
          </p>
        </Reveal>
        <Reveal delay={290} y={12}>
          <p className="tcl-support">
            Tell us what you are planning, and we&apos;ll help match the right performers, worlds,
            characters, and experiences to your event.
          </p>
        </Reveal>

        <Reveal delay={360} y={14}>
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
        </Reveal>

        <Reveal delay={430} y={10}>
          <a href="/contact" className="tcl-help">
            Not sure where to start? We can help you choose.
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>

      {/* reassurance programme strip — hairline dividers on the dark stage */}
      <Reveal delay={200} y={14} className="relative z-10 block">
        <ul className="tcl-strip mx-auto w-full max-w-[1100px] px-5 pb-16 sm:px-6 lg:px-8">
          {REASSURE.map(({ icon: Icon, label, sub }) => (
            <li key={label} className="tcl-strip-item">
              <span aria-hidden className="tcl-strip-ic"><Icon className="h-4 w-4" /></span>
              <strong>{label}</strong>
              <span>{sub}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
