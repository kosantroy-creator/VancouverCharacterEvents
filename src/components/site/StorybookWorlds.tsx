import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { storybookWorlds } from "@/lib/site-data";
import logo from "@/assets/brand/logo-primary.png";

/* A few twinkling ambient sparkles layered over a world scene */
function Sparkles() {
  const dots = [
    { top: "14%", left: "20%", delay: "0s" },
    { top: "28%", left: "72%", delay: "0.8s" },
    { top: "60%", left: "40%", delay: "1.6s" },
    { top: "44%", left: "86%", delay: "2.3s" },
    { top: "74%", left: "12%", delay: "1.1s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="sb-twinkle absolute h-1.5 w-1.5 rounded-full bg-gold-200 shadow-[0_0_8px_2px_rgba(247,236,206,0.8)]"
          style={{ top: d.top, left: d.left, animationDelay: d.delay }}
        />
      ))}
    </div>
  );
}

function WorldCard({ world, index, revealed }: { world: (typeof storybookWorlds)[number]; index: number; revealed: boolean }) {
  return (
    <li
      className="transition-all duration-700 ease-out"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${600 + index * 110}ms`,
      }}
    >
      <Link
        to={`/${world.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-gold-500/25 shadow-[var(--shadow-md)] transition-all duration-[250ms] ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:border-gold-500/70 hover:shadow-[var(--glow-gold)] focus-visible:-translate-y-2 focus-visible:scale-[1.03] active:scale-[0.99]"
      >
        {/* miniature movie-set scene */}
        <img
          src={world.scene}
          alt={`${world.name} miniature world`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          width={1024}
          height={1024}
          loading="lazy"
        />
        {/* accent glow that intensifies on hover */}
        <span
          className="sb-glow-pulse pointer-events-none absolute -inset-8 opacity-40 blur-2xl transition-opacity duration-300 group-hover:!opacity-80"
          style={{ background: `radial-gradient(circle at 50% 70%, var(--chapter-${world.accent}), transparent 60%)` }}
          aria-hidden
        />
        {/* shimmer sweep */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="sb-shimmer absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-star-white/15 to-transparent" />
        </span>
        <Sparkles />
        {/* legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent" />

        {/* content */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-left">
          <div className="flex items-center gap-3">
            <img
              src={world.medallion}
              alt=""
              className="h-10 w-10 shrink-0 object-contain drop-shadow"
              width={40}
              height={40}
              loading="lazy"
              aria-hidden
            />
            <h3 className="font-display text-2xl leading-tight text-star-white">{world.name}</h3>
          </div>
          {/* blurb + button reveal on hover/focus */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-[250ms] ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
            <div className="overflow-hidden">
              <p className="mt-2 text-sm leading-relaxed text-fg-on-ink/85">{world.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-gold-500 px-4 py-1.5 text-sm font-semibold text-ink-900">
                Explore
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function StorybookWorlds() {
  const ref = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpened(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl">
      {/* The open book spread that holds the worlds */}
      <div
        className="relative rounded-[var(--radius-2xl)] border border-gold-500/20 p-5 shadow-[var(--shadow-ink)] sm:p-8"
        style={{ background: "linear-gradient(180deg, #FCF9F2 0%, #F3E9D4 100%)" }}
      >
        {/* center spine */}
        <div className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent lg:block" aria-hidden />
        <ul className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {storybookWorlds.map((world, i) => (
            <WorldCard key={world.slug} world={world} index={i} revealed={opened} />
          ))}
        </ul>
      </div>

      {/* The premium leather cover that swings open once */}
      <div className="absolute inset-0 z-20 [perspective:2600px] [pointer-events:none]" aria-hidden>
        <div
          className="absolute inset-0 origin-left transition-transform ease-[cubic-bezier(0.7,0,0.3,1)] [transform-style:preserve-3d]"
          style={{
            transitionDuration: "1500ms",
            transform: opened ? "rotateY(-172deg)" : "rotateY(0deg)",
          }}
        >
          {/* front of cover — luxury leather + gold foil */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius-2xl)] [backface-visibility:hidden]"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, #2A4D72 0%, #16304F 55%, #0E2038 100%)",
              boxShadow: "inset 0 0 0 2px rgba(207,168,98,0.55), inset 0 0 60px rgba(0,0,0,0.5), var(--shadow-ink)",
            }}
          >
            <div
              className="absolute inset-3 rounded-[var(--radius-xl)] sm:inset-5"
              style={{ boxShadow: "inset 0 0 0 1px rgba(207,168,98,0.4)" }}
            />
            <img src={logo} alt="" className="w-40 max-w-[55%] opacity-95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] sm:w-56" />
            <p className="t-engrave mt-6 px-6 text-center text-[0.7rem] tracking-[0.3em] text-gold-300 sm:text-sm">
              Open the book — choose your chapter
            </p>
          </div>
          {/* back of cover — parchment page */}
          <div
            className="absolute inset-0 rounded-[var(--radius-2xl)] [backface-visibility:hidden]"
            style={{
              transform: "rotateY(180deg)",
              background: "linear-gradient(180deg, #F8F1E3 0%, #E4D5B6 100%)",
              boxShadow: "inset 0 0 0 1px rgba(147,108,48,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
