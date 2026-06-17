import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Cpu,
  Dumbbell,
  Flame,
  Radar,
  RotateCcw,
  Scale,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { matchCharacters, type CourtTrait, type WorldCourt } from "@/lib/royal-court";
import { heroTraits } from "@/lib/hero-roster";
import { HERO_CARD_ART } from "./HeroDivisions";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const TRAIT_ICONS: Partial<Record<CourtTrait, typeof Flame>> = {
  courage: Flame,
  strength: Dumbbell,
  speed: Zap,
  tech: Cpu,
  teamwork: Users,
  justice: Scale,
};

/**
 * MissionControl — a premium, family-friendly "AI command console" matchmaker.
 * A frosted light-blue glass panel with an animated AI core: one question about
 * what a child loves → three matched heroes, each linking into the booking form.
 * Pure client state, no backend; reuses the shared `matchCharacters`.
 *
 * Choreography (all reduced-motion guarded in styles.css "HERO MISSION CONTROL"):
 * scroll-in powers the console on (core pulse + staggered reveals); selecting a
 * trait pulses the core; pressing "Find My Heroes" pulses the core + flashes the
 * button. The CTA only arms once at least one trait is chosen.
 */
export function MissionControl({ squad }: { squad: WorldCourt }) {
  const [loves, setLoves] = useState<CourtTrait[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(false);
  const [corePulse, setCorePulse] = useState(0);
  const [ctaPulse, setCtaPulse] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const armed = loves.length > 0;
  const matches = useMemo(
    () => (revealed ? matchCharacters(squad, loves) : []),
    [squad, loves, revealed],
  );

  // Power the console on once it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (t: CourtTrait) => {
    setRevealed(false);
    setCorePulse((p) => p + 1);
    setLoves((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : prev.length >= 2
          ? [prev[1], t]
          : [...prev, t],
    );
  };

  const findHeroes = () => {
    if (!loves.length) return;
    setRevealed(true);
    setCorePulse((p) => p + 1);
    setCtaPulse((p) => p + 1);
  };

  return (
    <div
      ref={ref}
      className={cn("mc relative mx-auto max-w-4xl", active && "is-active", armed && "is-armed")}
    >
      {/* soft radial glow behind the console */}
      <span aria-hidden className="mc-aura" />

      <div className="mc-panel mc-reveal relative overflow-hidden rounded-[28px] p-6 sm:p-9">
        {/* faint HUD grid + target wash */}
        <span aria-hidden className="mc-hud" />
        {/* red signal corner brackets + dots */}
        <span aria-hidden className="mc-corner mc-corner--tl" />
        <span aria-hidden className="mc-corner mc-corner--tr" />
        <span aria-hidden className="mc-corner mc-corner--bl" />
        <span aria-hidden className="mc-corner mc-corner--br" />
        <span aria-hidden className="mc-sig mc-sig--l" />
        <span aria-hidden className="mc-sig mc-sig--r" />

        <div className="relative z-10">
          {/* AI core */}
          <div className="mc-reveal mb-5 flex justify-center" style={{ transitionDelay: "80ms" }}>
            <div className="mc-core relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
              <span aria-hidden className="mc-ring mc-ring--outer" />
              <span aria-hidden className="mc-ring mc-ring--mid" />
              <span aria-hidden className="mc-sweepline" />
              <span className="mc-disc grid place-items-center">
                <Radar className="mc-core-icon h-8 w-8 sm:h-9 sm:w-9" aria-hidden />
              </span>
              <span aria-hidden className="mc-dot mc-dot--a" />
              <span aria-hidden className="mc-dot mc-dot--b" />
              <span key={corePulse} aria-hidden className="mc-core-ping" />
            </div>
          </div>

          <p
            className="mc-reveal text-center font-display text-lg italic leading-snug text-fg-2"
            style={{ transitionDelay: "180ms" }}
          >
            <span className="font-semibold not-italic text-[var(--hero-blue-deep)]">
              Mission Control
            </span>{" "}
            here — tell me what your child loves, and I&apos;ll find your perfect hero.
          </p>

          <fieldset className="mt-6">
            <legend
              className="mc-reveal t-display block w-full pt-2 text-center text-2xl text-[var(--hero-navy)] sm:text-3xl"
              style={{ transitionDelay: "260ms" }}
            >
              What does your child love most?
            </legend>
            <p
              className="mc-reveal mt-2 text-center text-sm font-medium text-[var(--hero-blue-deep)]"
              style={{ transitionDelay: "320ms" }}
            >
              Choose up to two — Mission Control will do the rest.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {heroTraits.map(({ id, label }, i) => {
                const Icon = TRAIT_ICONS[id] ?? Shield;
                const on = loves.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(id)}
                    style={{ transitionDelay: `${380 + i * 70}ms` }}
                    className={cn("mc-chip mc-reveal group/chip", on && "is-on")}
                  >
                    <span className="mc-chip-ic">
                      <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                    </span>
                    <span className="flex-1 text-left">{label}</span>
                    <span className="mc-chip-check" aria-hidden>
                      <Check className="h-3 w-3" />
                    </span>
                    {on ? <span aria-hidden className="mc-chip-sweep" /> : null}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div
            className="mc-reveal mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ transitionDelay: "820ms" }}
          >
            <button
              type="button"
              onClick={findHeroes}
              aria-disabled={!armed}
              className={cn("mc-cta", !armed && "is-idle")}
            >
              <Radar className="mc-cta-icon h-4 w-4" aria-hidden />
              Find My Heroes
              {ctaPulse > 0 ? <span key={ctaPulse} aria-hidden className="mc-cta-flash" /> : null}
            </button>
            {revealed ? (
              <button
                type="button"
                onClick={() => {
                  setLoves([]);
                  setRevealed(false);
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--hero-blue-deep)]/80 underline-offset-4 transition-colors hover:text-[var(--hero-blue-deep)] hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
              </button>
            ) : null}
          </div>

          {revealed && matches.length ? (
            <div className="mt-8 border-t border-[var(--hero-blue)]/25 pt-7">
              <p className="text-center font-display text-lg italic text-fg-2">
                &ldquo;Squad assembled! These heroes can&apos;t wait to meet your little one.&rdquo;
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {matches.map((m, i) => {
                  const photo = m.photo ?? HERO_CARD_ART[m.id];
                  return (
                    <Reveal key={m.id} delay={i * 110} y={16}>
                      <div
                        className="flex h-full flex-col rounded-[var(--radius-lg)] border bg-white/85 p-4 text-center shadow-[0_12px_30px_-16px_rgba(23,54,93,0.5)] backdrop-blur-sm"
                        style={{
                          borderColor: `color-mix(in oklab, ${m.door.accent} 55%, transparent)`,
                        }}
                      >
                        {photo ? (
                          <img
                            src={photo}
                            alt={`${m.name} — hero`}
                            loading="lazy"
                            className="mx-auto h-20 w-20 rounded-full object-cover object-top"
                            style={{ outline: `2px solid ${m.door.accent}`, outlineOffset: "3px" }}
                          />
                        ) : (
                          <span
                            className="mx-auto grid h-20 w-20 place-items-center rounded-full"
                            style={{
                              background: `color-mix(in oklab, ${m.door.accent} 22%, white)`,
                              outline: `2px solid ${m.door.accent}`,
                              outlineOffset: "3px",
                            }}
                          >
                            <Shield
                              className="h-7 w-7"
                              style={{ color: m.door.accent }}
                              aria-hidden
                            />
                          </span>
                        )}
                        <h3 className="t-display mt-3 text-xl text-[var(--hero-navy)]">{m.name}</h3>
                        <p className="mt-0.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-fg-3">
                          {m.door.name}
                        </p>
                        <p className="mt-2 flex-1 text-[0.83rem] italic leading-snug text-fg-2">
                          &ldquo;{m.welcome}&rdquo;
                        </p>
                        <Link
                          to="/hero-events"
                          search={{ hero: m.name }}
                          hash="book"
                          className="mt-4 inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--hero-blue)]/60 px-4 py-2 text-[0.8rem] font-semibold text-[var(--hero-blue-deep)] transition-colors hover:bg-[var(--hero-blue)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
                        >
                          Request {m.name.replace(/^The /, "").split(" ")[0]}
                        </Link>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
