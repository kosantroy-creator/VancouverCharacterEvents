import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  CalendarCheck,
  Camera,
  Drama,
  Heart,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * CastHallTrust — Section 2 of the Our Team page: "Real people, magical moments,
 * professional care." A calm cream/parchment continuation of the dark Cast Hall
 * hero: a velvet curtain edge + spotlight glow at the top, an engrave eyebrow +
 * serif display heading + supporting line, a gold theatre-light string, then six
 * credential cards (navy medallion + gold icon, engrave title, short reassurance).
 * Central VCE palette (royal navy + warm gold + champagne + cream). Gentle staged
 * reveals + faint gold dust (motion-gated under .cht.anim), reduced-motion safe.
 * See ".cht" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const BADGES = [
  {
    icon: Heart,
    title: "Child-Friendly Performers",
    body: "Warm, respectful performers who understand how to create magical moments with children and families.",
  },
  {
    icon: CalendarCheck,
    title: "Event-Ready Team",
    body: "Our team comes prepared for timing, entrances, photos, activities, and the flow of the celebration.",
  },
  {
    icon: Drama,
    title: "Character & Hosting Skills",
    body: "Performers bring more than costumes — they guide greetings, games, stories, photos, and guest interaction.",
  },
  {
    icon: MessageCircle,
    title: "Parent & Planner Friendly",
    body: "Clear communication and flexible event awareness help make the experience easier for hosts and organizers.",
  },
  {
    icon: Camera,
    title: "Memories First",
    body: "The goal is not just to arrive in costume. It is to help create the moment guests remember.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Presence",
    body: "Our performers aim to be polished, kind, reliable, and attentive to the needs of the room.",
  },
] as const;

/* Faint gold dust drifting up over the parchment (motion only). */
const DUST = [
  { left: "16%", s: 3, delay: "0s", dur: "15s", dx: "8px" },
  { left: "34%", s: 4, delay: "3.4s", dur: "17s", dx: "-7px" },
  { left: "52%", s: 3, delay: "1.6s", dur: "14s", dx: "10px" },
  { left: "68%", s: 4, delay: "5s", dur: "16.5s", dx: "-9px" },
  { left: "84%", s: 3, delay: "2.6s", dur: "15.5s", dx: "8px" },
] as const;

export function CastHallTrust() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);
  }, []);

  return (
    <section
      ref={ref}
      id="cast-trust"
      aria-labelledby="cht-title"
      className={cn("cht relative isolate overflow-hidden", motionOK && "anim")}
    >
      {/* soft warm spotlight glow at the top (the hero fades cleanly into the cream) */}
      <span aria-hidden className="cht-spot absolute -z-10" />

      {/* faint gold dust (motion only) */}
      {motionOK ? (
        <div aria-hidden className="cht-amb pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="cht-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-6 md:py-12 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <span className="cht-eyebrow">
              <span aria-hidden className="cht-eyebrow-fl" />
              Our Team Promise
              <span aria-hidden className="cht-eyebrow-fl cht-eyebrow-fl--r" />
            </span>
          </Reveal>

          <Reveal delay={110} y={16}>
            <h2 id="cht-title" className="cht-title">
              Real people, magical moments, and professional care.
            </h2>
          </Reveal>

          <Reveal delay={180} y={14}>
            <p className="cht-sub">
              Every event is different, but the goal is always the same — create a safe, joyful,
              organized, and memorable experience for the guests in the room.
            </p>
          </Reveal>

          <Reveal delay={240} y={10}>
            <span aria-hidden className="cht-string" />
          </Reveal>
        </div>

        {/* credential cards */}
        <ul className="cht-grid">
          {BADGES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} as="li" delay={300 + i * 80} y={18} className="cht-cell">
              <div className="cht-card">
                <span aria-hidden className="cht-medallion">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="cht-card-title">{title}</h3>
                <p className="cht-card-body">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
