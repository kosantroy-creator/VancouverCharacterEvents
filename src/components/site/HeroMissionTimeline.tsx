import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "./ScrollTimeline";

/**
 * HeroMissionTimeline — the hero sibling of ScrollTimeline, styled as a premium
 * "mission briefing": a vertical mission stepper on the left, a large framed
 * image panel on the right that crossfades with the active step.
 *
 * Desktop: a tall scroll runway with a sticky stage; as the visitor scrolls the
 * red rail fills, the active mission node glows, and the panel swaps. One
 * rAF-throttled scroll handler, transform/opacity only. Small screens and
 * reduced-motion get a clean stacked list (mission + its image), no scroll-jack.
 */

/** Sticky site header height — the stage pins just below it. */
const STICKY_OFFSET = 84;

const RED = "var(--hero-red)";
const NAVY = "var(--hero-navy)";
const MIST = "var(--hero-mist)";

/** The futuristic icy-blue frame around the panel image (shared desktop/mobile). */
function MissionFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative rounded-[28px] border-2 border-[var(--hero-sky)] bg-white/55 p-2 shadow-[0_28px_64px_-26px_rgba(36,66,104,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_36px_76px_-22px_rgba(36,66,104,0.55)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-[var(--hero-navy)]/35 bg-[var(--hero-ice)]">
        {children}
      </div>
      {/* illuminated red corner details */}
      <span className="pointer-events-none absolute left-2.5 top-2.5 h-6 w-6 rounded-tl-[16px] border-l-2 border-t-2 border-[var(--hero-red)]" />
      <span className="pointer-events-none absolute right-2.5 top-2.5 h-6 w-6 rounded-tr-[16px] border-r-2 border-t-2 border-[var(--hero-red)]" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-6 w-6 rounded-bl-[16px] border-b-2 border-l-2 border-[var(--hero-red)]" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-6 w-6 rounded-br-[16px] border-b-2 border-r-2 border-[var(--hero-red)]" />
      {/* bottom-center red glow accent */}
      <span className="pointer-events-none absolute inset-x-1/3 bottom-[3px] h-[3px] rounded-full bg-[var(--hero-red)] opacity-80 shadow-[0_0_14px_var(--hero-red)]" />
    </div>
  );
}

function Caption({ step }: { step: TimelineStep }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[rgba(24,54,93,0.78)] via-[rgba(24,54,93,0.25)] to-transparent p-5 pt-14">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--hero-red-soft)]">
        Mission {step.n}
      </p>
      <p className="font-display text-2xl font-bold text-white">{step.title}</p>
    </div>
  );
}

export function HeroMissionTimeline({ steps }: { steps: TimelineStep[] }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return; // static fallback stays

    setInteractive(true);
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = runwayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stickyH = window.innerHeight - STICKY_OFFSET;
      const total = rect.height - stickyH;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, (STICKY_OFFSET - rect.top) / total));
      setProgress(p);
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  /** Click a mission → glide to its segment of the runway. */
  const jumpTo = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const stickyH = window.innerHeight - STICKY_OFFSET;
    const total = el.offsetHeight - stickyH;
    window.scrollTo({
      top: top - STICKY_OFFSET + (total * (i + 0.5)) / steps.length,
      behavior: "smooth",
    });
  };

  /* ----- Small screens & reduced motion: clean stacked mission list ----- */
  const staticList = (
    <ol className={cn("space-y-9", interactive && "lg:hidden")}>
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.n} className="relative pl-16">
            <span
              className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-2 bg-white shadow-[var(--shadow-sm)]"
              style={{ borderColor: RED, color: RED }}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute bottom-[-2.25rem] left-[23px] top-14 w-[2px] rounded-full"
                style={{ background: `color-mix(in oklab, ${RED} 28%, transparent)` }}
              />
            ) : null}
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--hero-red-deep)]">
              Mission {s.n}
            </p>
            <h3 className="mt-0.5 font-display text-2xl font-bold text-[var(--hero-navy)]">
              {s.title}
            </h3>
            <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-fg-2">{s.body}</p>
            <div className="mt-4">
              <MissionFrame>
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <Caption step={s} />
              </MissionFrame>
            </div>
          </li>
        );
      })}
    </ol>
  );

  if (!interactive) return staticList;

  return (
    <>
      {staticList}

      {/* Scroll runway — sticky mission stage inside. 80vh per mission. */}
      <div ref={runwayRef} className="hidden lg:block" style={{ height: `${steps.length * 80}vh` }}>
        <div
          className="sticky flex items-center"
          style={{ top: STICKY_OFFSET, height: `calc(100svh - ${STICKY_OFFSET}px)` }}
        >
          <div className="grid w-full grid-cols-[minmax(300px,0.82fr)_1.45fr] items-center gap-12">
            {/* Mission stepper */}
            <div className="relative pl-2">
              {/* dashed rail (full) */}
              <div
                aria-hidden
                className="absolute bottom-7 left-[29px] top-7 w-[2px]"
                style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, color-mix(in oklab, ${NAVY} 22%, transparent) 0 6px, transparent 6px 12px)`,
                }}
              />
              {/* red progress fill */}
              <div
                aria-hidden
                className="absolute left-[29px] top-7 w-[3px] -translate-x-px rounded-full bg-gradient-to-b from-[var(--hero-red)] to-[var(--hero-red-deep)] transition-[height] duration-300 ease-out"
                style={{ height: `calc(${Math.round(progress * 100)}% * 0.86)` }}
              />
              <ol className="relative space-y-6">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const on = i === active;
                  const past = i < active;
                  const lit = on || past;
                  return (
                    <li key={s.n}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={on ? "step" : undefined}
                        className="group/m flex w-full items-start gap-4 text-left"
                      >
                        <span
                          className="relative grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 bg-white transition-all duration-300 ease-out group-hover/m:brightness-105"
                          style={{
                            borderColor: lit ? RED : MIST,
                            color: on ? RED : lit ? "var(--hero-blue-deep)" : "var(--hero-blue)",
                            boxShadow: on
                              ? "0 0 0 4px rgba(216,58,74,0.12), 0 10px 24px -8px rgba(216,58,74,0.55)"
                              : "0 2px 8px rgba(8,17,31,0.06)",
                            transform: on ? "scale(1)" : "scale(0.95)",
                          }}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="pt-1">
                          <span
                            className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-colors"
                            style={{ color: on ? "var(--hero-red-deep)" : "var(--hero-blue)" }}
                          >
                            Mission {s.n}
                          </span>
                          <span
                            className={cn(
                              "block font-display text-[1.35rem] font-bold leading-tight transition-colors group-hover/m:text-[var(--hero-navy)]",
                              on ? "text-[var(--hero-navy)]" : "text-[var(--hero-blue-deep)]/65",
                            )}
                          >
                            {s.title}
                          </span>
                          <span
                            className={cn(
                              "mt-1 block max-w-[280px] text-[0.85rem] leading-snug transition-colors",
                              on ? "text-fg-2" : "text-fg-3/80",
                            )}
                          >
                            {s.body}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Mission panel — crossfading framed image */}
            <MissionFrame>
              {steps.map((s, i) => (
                <img
                  key={s.n}
                  src={s.img}
                  alt={i === active ? s.alt : ""}
                  aria-hidden={i !== active}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out",
                    i === active
                      ? "z-10 translate-x-0 scale-100 opacity-100"
                      : "z-0 translate-x-3 scale-[1.04] opacity-0",
                  )}
                />
              ))}
              <Caption step={steps[active]} />
            </MissionFrame>
          </div>
        </div>
      </div>
    </>
  );
}
