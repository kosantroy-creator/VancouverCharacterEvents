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

/** A single storybook that opens as it scrolls into view. */
function StorybookBook({ world, index }: { world: (typeof storybookWorlds)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Opens gradually over a longer scroll distance — begins when the book's
      // top reaches ~78% of the viewport and is fully open near ~8%.
      const start = vh * 0.78;
      const end = vh * 0.08;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const coverAngle = reduced ? -175 : -175 * Math.min(1, progress / 1);
  const opened = progress >= 0.7;
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-xl [perspective:2400px]"
      style={{ zIndex: storybookWorlds.length - index }}
    >
      {/* accent-colored backing panel behind the book (chapter's main color) */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[var(--radius-2xl)] transition-all duration-700 sm:-inset-8"
        style={{
          background: `linear-gradient(160deg, color-mix(in oklab, var(--chapter-${world.accent}) 92%, #0E2038) 0%, color-mix(in oklab, var(--chapter-${world.accent}) 70%, #0E2038) 100%)`,
          opacity: opened ? 1 : 0.55,
          boxShadow: opened
            ? `0 0 60px 6px color-mix(in oklab, var(--chapter-${world.accent}) 65%, transparent), var(--shadow-ink)`
            : "var(--shadow-ink)",
        }}
        aria-hidden
      />

      {/* ambient glow behind this book — pulses to draw the eye when open */}
      <div
        className={`pointer-events-none absolute -inset-8 -z-10 blur-3xl transition-opacity duration-700 sm:-inset-14 ${opened ? "sb-glow-pulse" : ""}`}
        style={{
          opacity: opened ? 1 : 0.25,
          background: `radial-gradient(55% 55% at 50% 45%, var(--chapter-${world.accent}), transparent 70%)`,
        }}
        aria-hidden
      />

      {/* The open spread — revealed beneath the cover */}
      <div
        className="relative grid overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-ink)] transition-shadow duration-700 sm:grid-cols-2"
        style={{
          background: "linear-gradient(180deg, #FCF9F2 0%, #F3E9D4 100%)",
          boxShadow: opened
            ? `inset 0 0 0 2px rgba(207,168,98,0.45), inset 0 0 0 6px rgba(252,249,242,0.6), inset 0 0 0 7px rgba(147,108,48,0.25), 0 0 50px -4px color-mix(in oklab, var(--chapter-${world.accent}) 60%, transparent), var(--shadow-ink)`
            : "inset 0 0 0 2px rgba(207,168,98,0.45), inset 0 0 0 6px rgba(252,249,242,0.6), inset 0 0 0 7px rgba(147,108,48,0.25), var(--shadow-ink)",
        }}
      >
        {/* text page */}
        <div className={`relative order-2 flex flex-col justify-center p-7 sm:p-9 ${flipped ? "sm:order-2" : "sm:order-1"}`}>
          {/* faint logo watermark filling the top-right deadspace */}
          <img
            src={logo}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-4 top-4 h-24 w-24 object-contain opacity-[0.07] mix-blend-multiply sm:h-28 sm:w-28"
          />
          <div className="relative flex items-center gap-3">
            <img src={world.medallion} alt="" className="h-12 w-12 shrink-0 object-contain drop-shadow" width={48} height={48} aria-hidden />
            <p className="t-engrave text-[0.62rem] tracking-[0.3em] text-[#9a743a]">Chapter {String(index + 1).padStart(2, "0")}</p>
          </div>
          <h3 className="mt-3 font-display text-3xl leading-tight text-[#23425f] sm:text-4xl">{world.name}</h3>
          <div className="mt-3 h-px w-24 bg-gradient-to-r from-gold-600/60 to-transparent" />
          <p className="mt-4 text-[0.97rem] leading-relaxed text-[#4a5b6b]">{world.blurb}</p>
          <Link
            to={`/${world.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-pill bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-900 transition-all duration-200 hover:scale-[1.03] hover:shadow-[var(--glow-gold)]"
          >
            Explore this world
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* scene page */}
        <div className={`relative order-1 min-h-[230px] overflow-hidden sm:min-h-[330px] ${flipped ? "sm:order-1" : "sm:order-2"}`}>
          <img
            src={world.scene}
            alt={`${world.name} scene`}
            className="absolute inset-0 h-full w-full object-cover"
            width={1024}
            height={1024}
            loading="lazy"
          />
          <Sparkles />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
        </div>

        {/* center spine */}
        <div className="pointer-events-none absolute inset-y-5 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent sm:block" aria-hidden />
      </div>

      {/* The leather cover that swings open as you scroll */}
      <div className="absolute inset-0 z-20 [perspective:2400px] [pointer-events:none]" aria-hidden>
        <div
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
          style={{
            transform: `rotateY(${coverAngle}deg)`,
            opacity: coverAngle <= -120 ? 0 : 1,
            transition: "opacity 150ms ease-out",
          }}
        >
          {/* front of cover */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius-2xl)] [backface-visibility:hidden]"
            style={{
              background: "radial-gradient(120% 120% at 50% 0%, #2A4D72 0%, #16304F 55%, #0E2038 100%)",
              boxShadow: "inset 0 0 0 2px rgba(207,168,98,0.55), inset 0 0 60px rgba(0,0,0,0.5), var(--shadow-ink)",
            }}
          >
            <div className="absolute inset-3 rounded-[var(--radius-xl)] sm:inset-5" style={{ boxShadow: "inset 0 0 0 1px rgba(207,168,98,0.4)" }} />
            <span
              className="pointer-events-none absolute -inset-6 opacity-50 blur-2xl"
              style={{ background: `radial-gradient(circle at 50% 50%, var(--chapter-${world.accent}), transparent 65%)` }}
              aria-hidden
            />
            <img src={world.medallion} alt="" className="relative h-24 w-24 object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] sm:h-28 sm:w-28" />
            <h3 className="relative mt-4 px-6 text-center font-display text-2xl text-star-white sm:text-3xl">{world.name}</h3>
            <p className="t-engrave relative mt-3 text-[0.6rem] tracking-[0.3em] text-gold-300 sm:text-xs">— Scroll to open —</p>
          </div>
          {/* back of cover — parchment */}
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

export function StorybookWorlds() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* ornamental header */}
      <div className="mb-12 text-center">
        <p className="t-engrave text-[0.62rem] tracking-[0.34em] text-gold-400 sm:text-xs">— Turn the page —</p>
        <h3 className="mt-2 font-display text-3xl text-star-white sm:text-4xl">Choose Your Chapter</h3>
        <div className="mx-auto mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-600/60" />
          <img src={logo} alt="" className="h-8 w-8 rounded-full object-cover opacity-90" aria-hidden />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-600/60" />
        </div>
      </div>

      {/* continuous chapter-colored backdrop so no flat blue shows between books */}
      <div className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-[-4rem] bottom-[-4rem] w-screen -translate-x-1/2"
          style={{
            background: `linear-gradient(180deg, ${storybookWorlds
              .map(
                (w, i) =>
                  `color-mix(in oklab, var(--chapter-${w.accent}) 78%, #0E2038) ${(
                    (i / (storybookWorlds.length - 1)) *
                    100
                  ).toFixed(1)}%`,
              )
              .join(", ")})`,
          }}
          aria-hidden
        />
        {/* each world is its own book that opens on scroll — paired two-up to reduce scrolling */}
        <div className="relative grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {storybookWorlds.map((world, i) => (
            <StorybookBook key={world.slug} world={world} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
