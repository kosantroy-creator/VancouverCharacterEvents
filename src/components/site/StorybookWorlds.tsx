import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characterWorlds, worldThemes } from "@/lib/site-data";
import { WorldDecor } from "./Scenery";
import { Reveal } from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
// useLayoutEffect on the client (sets the GSAP "from" state before paint → no
// flash), plain useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const tileVar = (accent: string) => ({ ["--tile"]: `var(--chapter-${accent})` }) as CSSProperties;

/**
 * Choose Your Chapter — eight dimensional world cards.
 *
 * Each card is its own little environment: chapter palette, a softly drifting
 * background motif (WorldDecor), a glowing emblem, character preview chips, and
 * two themed CTAs (Explore / Pricing). Hover lift + glow are pure CSS; GSAP only
 * powers the staggered entrance as the grid scrolls into view. Corporate is not
 * a world here (it lives under Event Types).
 */
function WorldCard({ world }: { world: (typeof characterWorlds)[number] }) {
  const theme = worldThemes[world.slug];
  const accent = `var(--chapter-${world.accent})`;

  return (
    <article
      data-card
      className="world-card group relative isolate flex flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border-soft p-6 shadow-[var(--shadow-sm)]"
      style={{ ...tileVar(world.accent), background: theme.bg }}
    >
      {/* Active background motif — softly drifting, unique per world */}
      <div className="card-decor pointer-events-none absolute inset-0 opacity-50">
        <WorldDecor kind={theme.decor} accent={theme.accent} secondary={theme.secondary} />
      </div>
      {/* Glow behind the emblem; intensifies on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Emblem — larger, filling its circle */}
        <div
          className="world-card-emblem mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full border-2 bg-surface shadow-[var(--shadow-md)]"
          style={{ borderColor: `color-mix(in oklab, ${accent} 60%, var(--gold-500))` }}
        >
          <img
            src={world.medallion}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            width={80}
            height={80}
          />
        </div>

        <p
          className="t-engrave mt-4 text-center text-[0.56rem] tracking-[0.2em]"
          style={{ color: `color-mix(in oklab, ${accent} 70%, var(--ink-800))` }}
        >
          {theme.mood}
        </p>
        <h3 className="t-display mt-1 text-center text-2xl text-fg">{world.name}</h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-fg-2">{world.blurb}</p>

        {/* Character preview chips */}
        <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
          {world.sampleCharacters.slice(0, 4).map((c) => (
            <li
              key={c}
              className="rounded-pill border bg-surface/80 px-2.5 py-1 text-[0.7rem] font-medium text-fg-2"
              style={{ borderColor: `color-mix(in oklab, ${accent} 35%, transparent)` }}
            >
              {c}
            </li>
          ))}
        </ul>

        <p
          className="mt-4 text-center text-xs font-semibold"
          style={{ color: `color-mix(in oklab, ${accent} 64%, var(--ink-900))` }}
        >
          {world.pricingSummary}
        </p>

        {/* Two themed CTAs */}
        <div className="mt-auto flex flex-col gap-2.5 pt-5">
          <Link
            to={world.exploreTo}
            className="inline-flex items-center justify-center gap-1.5 rounded-pill px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            style={{ background: `color-mix(in oklab, ${accent} 80%, var(--ink-900))` }}
          >
            {world.exploreLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to={world.pricingTo}
            className="inline-flex items-center justify-center rounded-pill border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            style={{
              borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
              color: `color-mix(in oklab, ${accent} 70%, var(--ink-900))`,
            }}
          >
            {world.pricingLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function StorybookWorlds() {
  const gridRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-card]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="choose-your-chapter"
      className="relative isolate scroll-mt-24 overflow-hidden py-16 md:py-24"
      style={{ background: "var(--grad-parchment)" }}
    >
      <div aria-hidden className="tx-sparkle-field absolute inset-0" style={{ opacity: 0.4 }} />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal as="p" className="t-eyebrow text-fg-gold" y={12}>
            Choose your chapter
          </Reveal>
          <Reveal delay={80} y={18}>
            <h2 className="t-display mt-3 text-4xl text-fg sm:text-5xl">
              Step into eight magical worlds
            </h2>
          </Reveal>
          <Reveal delay={160} y={16}>
            <p className="mt-4 text-lg text-fg-2">
              Every character is its own little world. Pick the adventure that fits your event —
              from backyard birthdays to city festivals across Metro Vancouver.
            </p>
          </Reveal>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characterWorlds.map((w) => (
            <WorldCard key={w.slug} world={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
