import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";

export type TimelineStep = {
  n: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

/**
 * ScrollTimeline — the Apple-style "progress through the experience" section.
 *
 * Desktop: a tall scroll runway with a sticky stage. As the visitor scrolls,
 * the left rail's progress line fills, steps light up in turn, and the right
 * visual crossfades. One rAF-throttled scroll handler, transform/opacity
 * only. Small screens and reduced-motion get a simple stacked timeline —
 * same content, zero scroll-jacking.
 */
/** Sticky site header height — the stage pins just below it so the visual
 *  never tucks under the header (which read as the image being "cut off"). */
const STICKY_OFFSET = 76;

export function ScrollTimeline({ steps, accent }: { steps: TimelineStep[]; accent?: string }) {
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
      // Stage pins at STICKY_OFFSET, so progress opens there (not viewport top).
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

  /** Click a step → glide to its segment of the runway. */
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

  const gold = "var(--gold-500)";
  const tint = accent ?? "var(--pp-magenta)";

  /* ----- Small screens & reduced motion: honest stacked timeline ----- */
  const staticList = (
    <ol className={cn("space-y-10", interactive && "lg:hidden")}>
      {steps.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.n} className="relative pl-12">
            <span
              className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-[var(--shadow-sm)]"
              style={{ borderColor: gold, color: tint }}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span
              aria-hidden
              className="absolute bottom-[-2.5rem] left-[17px] top-10 w-px last:hidden"
              style={{ background: `color-mix(in oklab, ${gold} 35%, transparent)` }}
            />
            <p className="t-eyebrow" style={{ color: tint }}>
              Moment {s.n}
            </p>
            <h3 className="t-display mt-1 text-2xl text-fg">{s.title}</h3>
            <p className="mt-2 max-w-md text-base leading-relaxed text-fg-2">{s.body}</p>
            <div className="plate mt-4 bg-white p-2">
              <div className="overflow-hidden rounded-[var(--radius-xl)]">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-[50%_22%]"
                />
              </div>
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

      {/* Scroll runway — sticky stage inside */}
      {/* 70vh per moment — quick enough to feel alive, slow enough to land */}
      <div ref={runwayRef} className="hidden lg:block" style={{ height: `${steps.length * 70}vh` }}>
        <div
          className="sticky flex items-center"
          style={{ top: STICKY_OFFSET, height: `calc(100svh - ${STICKY_OFFSET}px)` }}
        >
          <div className="grid w-full grid-cols-[minmax(300px,0.9fr)_1.4fr] items-center gap-14">
            {/* Rail */}
            <div className="relative pl-2">
              <div
                aria-hidden
                className="tl-rail absolute bottom-5 left-[27px] top-5 w-[3px] rounded-full"
              />
              <div
                aria-hidden
                className="tl-rail-fill absolute left-[27px] top-5 w-[3px] rounded-full"
                style={{ height: `calc(${Math.round(progress * 100)}% * 0.92)` }}
              />
              <ol className="relative space-y-7">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const on = i === active;
                  const past = i < active;
                  return (
                    <li key={s.n}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={on ? "step" : undefined}
                        className={cn(
                          "tl-step group flex w-full items-center gap-4 text-left",
                          on ? "opacity-100" : past ? "opacity-60" : "opacity-40",
                          !on && "hover:opacity-75",
                        )}
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-300"
                          style={{
                            borderColor: on || past ? gold : "var(--border-strong)",
                            color: on ? tint : "var(--fg-3)",
                            boxShadow: on
                              ? `0 0 22px color-mix(in oklab, ${gold} 55%, transparent)`
                              : "none",
                            transform: on ? "scale(1.08)" : "scale(1)",
                          }}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span>
                          <span
                            className={cn(
                              "t-display block text-xl leading-tight transition-colors",
                              on ? "text-fg" : "text-fg-2",
                            )}
                          >
                            {s.title}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block max-w-[230px] text-[0.8rem] leading-snug text-fg-3 transition-all duration-300",
                              on ? "max-h-12 opacity-100" : "max-h-0 overflow-hidden opacity-0",
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

            {/* Visual stage — framed in a white storybook mat */}
            <div className="relative">
              <div className="plate relative bg-white p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] bg-white">
                  {steps.map((s, i) => (
                    <img
                      key={s.n}
                      src={s.img}
                      alt={i === active ? s.alt : ""}
                      aria-hidden={i !== active}
                      loading={i === 0 ? "eager" : "lazy"}
                      className={cn(
                        "tl-visual absolute inset-0 h-full w-full object-cover object-[50%_22%]",
                        i === active ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.035] opacity-0",
                      )}
                    />
                  ))}
                  {/* caption */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[rgba(20,16,24,0.72)] to-transparent p-6 pt-14">
                    <p className="t-eyebrow !mb-0 text-gold-300">Moment {steps[active].n}</p>
                    <p className="t-display mt-1 text-2xl text-star-white">{steps[active].title}</p>
                  </div>
                </div>
              </div>
              {/* step dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    aria-hidden
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 26 : 8,
                      background:
                        i === active ? tint : `color-mix(in oklab, ${gold} 35%, transparent)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
