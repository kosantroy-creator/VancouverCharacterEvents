import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Crown,
  Drama,
  Footprints,
  Heart,
  Moon,
  PawPrint,
  Shell,
  Shield,
  Snowflake,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import hallImg from "@/assets/team/cast-hall-hero.webp";

/**
 * CastHallHero — Section 1 of the Our Team page: "The Cast Hall". A cinematic
 * backstage theatre hall (navy velvet curtains, golden portrait frames with
 * performer silhouettes, warm hanging lights, a compass-star runner) plays
 * full-bleed; the copy sits on the dark LEFT of the hall under a navy wash, so
 * cream + gold text reads cleanly. Same realm-hero structure used across the site
 * (eyebrow lockup → display heading → italic subtitle → body → trust chips → two
 * CTAs → faint eight-world token strip → scroll cue), inverted for a dark stage.
 * Central VCE palette (royal navy + warm gold + champagne), NOT one world's
 * palette. Warm spotlight bloom, drifting gold dust + faint frame glints
 * (motion-gated) and a light scroll parallax keep it alive. Brand-safe (silhouettes
 * + abstract world symbols only), reduced-motion safe. See ".cth" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

/** Five trust chips — warm, premium, not childish. */
const CHIPS = [
  { icon: Heart, label: "Child-Friendly Performers" },
  { icon: CalendarCheck, label: "Event-Ready Team" },
  { icon: Drama, label: "Character & Hosting Skills" },
  { icon: Users, label: "Parent & Planner Friendly" },
  { icon: Star, label: "Memories First" },
] as const;

/** The eight worlds, as a faint "all realms, one cast" token strip. */
const REALMS = [
  { icon: Crown, acc: "#C9337E", name: "Princess-inspired events" },
  { icon: Shield, acc: "#3E6EA8", name: "Hero parties" },
  { icon: Footprints, acc: "#4E8E5B", name: "Dinosaur experiences" },
  { icon: Shell, acc: "#1E8A9E", name: "Mermaid events" },
  { icon: PawPrint, acc: "#6DA63C", name: "Mascot visits" },
  { icon: Snowflake, acc: "#B3433F", name: "Holiday characters" },
  { icon: Moon, acc: "#8E5BC8", name: "Specialty characters" },
  { icon: Store, acc: "#2C8A93", name: "Event add-ons" },
] as const;

/* Drifting gold dust, weighted to the lantern-lit centre/right (down the hall). */
const DUST = [
  { left: "46%", s: 4, delay: "0s", dur: "14s", dx: "10px" },
  { left: "55%", s: 3, delay: "3.4s", dur: "16s", dx: "-8px" },
  { left: "63%", s: 5, delay: "1.4s", dur: "12.5s", dx: "12px" },
  { left: "71%", s: 3, delay: "5.2s", dur: "17s", dx: "-10px" },
  { left: "79%", s: 4, delay: "2.4s", dur: "15s", dx: "9px" },
  { left: "88%", s: 3, delay: "4.6s", dur: "13.5s", dx: "-11px" },
] as const;

/* Faint warm glints on the golden portrait frames (mid wall). */
const GLINTS = [
  { left: "44%", top: "30%", delay: "0.4s" },
  { left: "57%", top: "26%", delay: "1.9s" },
  { left: "69%", top: "31%", delay: "2.9s" },
] as const;

export function CastHallHero() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);

    // Light scroll parallax on the warm spotlight bloom for depth. rAF-throttled,
    // and the scroll listener is only attached while the hero is on screen.
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let listening = false;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < 1000) el.style.setProperty("--cth-py", `${y}px`);
      });
    };
    const add = () => {
      if (!listening) { window.addEventListener("scroll", onScroll, { passive: true }); listening = true; }
    };
    const remove = () => {
      if (listening) { window.removeEventListener("scroll", onScroll); listening = false; }
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? add() : remove()));
    io.observe(el);
    return () => {
      io.disconnect();
      remove();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="The Cast Hall — meet the performers and creative team behind Vancouver Character Events"
      className={cn("cth relative isolate flex min-h-[90svh] items-center overflow-hidden", motionOK && "anim")}
    >
      {/* The Cast Hall — full-bleed background art */}
      <img
        src={hallImg}
        alt="A magical theatre cast hall with velvet curtains, golden portrait frames, warm spotlights, and subtle symbols from the Vancouver Character Events worlds."
        fetchPriority="high"
        decoding="async"
        className="cth-img absolute inset-0 -z-30 h-full w-full object-cover object-[64%_center] sm:object-[58%_center]"
      />

      {/* navy washes — lift the cream/gold copy off the dark left of the hall */}
      <div aria-hidden className="cth-wash absolute inset-0 -z-20" />
      <div aria-hidden className="cth-wash-mobile absolute inset-0 -z-20 sm:hidden" />
      <div aria-hidden className="cth-seam absolute inset-x-0 bottom-0 -z-20 h-44" />

      {/* warm spotlight bloom down the hall (parallax) */}
      <span aria-hidden className="cth-glow absolute -z-10" />

      {/* ambient gold dust + frame glints (motion only) */}
      {motionOK ? (
        <div aria-hidden className="cth-amb pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="cth-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
          {GLINTS.map((g, i) => (
            <span
              key={`g${i}`}
              className="cth-glint"
              style={{ left: g.left, top: g.top, animationDelay: g.delay } as Vars}
            />
          ))}
        </div>
      ) : null}

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-xl">
          {/* wordmark lockup — same thematic pattern as the eight world heroes */}
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <h1 className="sr-only">Vancouver Character Events — The Cast Hall</h1>
              <span aria-hidden className="inline-flex items-center gap-2">
                <Drama className="h-5 w-5 shrink-0 text-[#E7B24B]" aria-hidden />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.6rem)] tracking-[0.2em] text-[#E7C877]">
                  Vancouver Character Events
                </span>
              </span>
              <span aria-hidden className="cth-script t-script-hero mt-1 block text-[clamp(2.6rem,7.2vw,4.8rem)]">
                The Cast Hall
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[#EBD199]"
              >
                <Star className="h-3 w-3 text-[#E7B24B]" aria-hidden />
                Meet the Cast
                <Star className="h-3 w-3 -scale-x-100 text-[#E7B24B]" aria-hidden />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{ background: "linear-gradient(90deg, #E7B24B, #C19A3C 55%, transparent)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={210} y={16}>
            <p className="cth-sub mt-4">
              Costumes create the first impression. Performers create the memory.
            </p>
          </Reveal>

          <Reveal delay={280} y={16}>
            <p className="cth-body mt-5 max-w-lg">
              Behind every character greeting, hero mission, dinosaur expedition, mascot dance party,
              holiday visit, and magical add-on is a real person who cares about creating a safe,
              joyful, and memorable experience. Meet the performers and creative team who help bring
              Vancouver Character Events to life.
            </p>
          </Reveal>

          {/* trust chips */}
          <Reveal delay={350} y={14}>
            <ul className="cth-chips mt-6">
              {CHIPS.map(({ icon: Icon, label }) => (
                <li key={label} className="cth-chip">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTAs — primary navy+gold, secondary cream/glass */}
          <Reveal delay={430} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#cast" size="lg" variant="ghost-ink" className="cth-cta-primary group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Meet the Cast
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </CTAButton>
              <CTAButton href="#performer-promise" size="lg" variant="ghost-ink" className="cth-cta-ghost">
                Our Performer Promise
              </CTAButton>
            </div>
          </Reveal>

          {/* faint eight-world token strip — all worlds, one cast */}
          <Reveal delay={520} y={14}>
            <div>
              <ul className="cth-realms" aria-label="The eight worlds our cast brings to life">
                {REALMS.map(({ icon: Icon, acc, name }) => (
                  <li key={name} className="cth-realm" style={{ "--acc": acc } as Vars} title={name}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </li>
                ))}
              </ul>
              <p className="cth-realms-cap">Eight worlds · one caring cast</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* gentle scroll cue */}
      <a href="#cast" aria-label="Scroll to meet the cast" className="cth-chev">
        <ChevronDown className="h-5 w-5" aria-hidden />
      </a>
    </section>
  );
}
