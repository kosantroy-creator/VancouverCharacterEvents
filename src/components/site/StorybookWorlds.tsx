import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characterWorlds, worldThemes, chapterBySlug } from "@/lib/site-data";
import { WorldDecor, Sparkles } from "./Scenery";
import { cn } from "@/lib/utils";

// GSAP powers this one cinematic section. Register only ScrollTrigger, client-only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type World = (typeof characterWorlds)[number];

/**
 * Choose Your Chapter — the most immersive section of the site.
 *
 * A quick-jump rail of eight world emblems sits up top; below it, each world
 * unfolds as a LARGE alternating panel in its own environment (palette, drifting
 * motif, glow). GSAP drives the whole thing: the heading "explodes" in on scroll,
 * the rail pops, and every panel slides + parallaxes as it enters. Fully
 * reduced-motion safe — when motion is reduced, nothing is hidden and it reads
 * as a clean, static long-form section.
 */

function ExploreButton({ world }: { world: World }) {
  const accent = `var(--chapter-${world.accent})`;
  return (
    <Link
      to={world.exploreTo}
      className="inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3 text-base font-semibold text-white shadow-[var(--shadow-sm)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      style={{ background: `color-mix(in oklab, ${accent} 80%, var(--ink-900))` }}
    >
      {world.exploreLabel} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

function PriceButton({ world }: { world: World }) {
  const accent = `var(--chapter-${world.accent})`;
  return (
    <Link
      to={world.pricingTo}
      className="price-btn inline-flex items-center justify-center rounded-pill border px-7 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
        color: `color-mix(in oklab, ${accent} 72%, var(--ink-900))`,
      }}
    >
      {world.pricingLabel}
    </Link>
  );
}

function WorldPanel({ world, index }: { world: World; index: number }) {
  const theme = worldThemes[world.slug];
  const chapter = chapterBySlug(world.slug);
  const accent = `var(--chapter-${world.accent})`;
  const flip = index % 2 === 1;

  return (
    <section
      id={`world-${world.slug}`}
      data-panel
      aria-labelledby={`world-${world.slug}-title`}
      className="relative isolate overflow-hidden scroll-mt-24 py-20 md:py-28"
      style={{ background: theme.bg }}
    >
      {/* Drifting world motif + faint linework */}
      <div className="card-decor pointer-events-none absolute inset-0 opacity-60">
        <WorldDecor kind={theme.decor} accent={theme.accent} secondary={theme.secondary} />
      </div>
      <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.05 }} />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div data-panel-visual className={cn("relative", flip && "lg:order-2")}>
            <div
              className="plate relative overflow-hidden bg-ink-900"
              style={{ outlineColor: `color-mix(in oklab, ${accent} 60%, var(--gold-500))` }}
            >
              <img
                data-parallax
                src={world.scene}
                alt={`${world.name} — premium ${world.navLabel.toLowerCase()} entertainment in Metro Vancouver`}
                className="aspect-[4/3] w-full scale-110 object-cover"
                width={1100}
                height={825}
                loading="lazy"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 50%, color-mix(in oklab, ${accent} 34%, transparent) 100%)`,
                }}
              />
            </div>

            {/* Large floating emblem */}
            <div
              className="absolute -left-3 -top-7 grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 bg-ink-900 shadow-[var(--shadow-lg)] sm:-left-5 sm:h-28 sm:w-28"
              style={{ borderColor: `color-mix(in oklab, ${accent} 60%, var(--gold-500))` }}
            >
              <img
                src={world.medallion}
                alt=""
                aria-hidden
                className="bob-soft h-full w-full object-cover"
                width={112}
                height={112}
              />
            </div>
            <Sparkles color={theme.glow} count={3} />
          </div>

          {/* Copy */}
          <div data-panel-copy className={cn(flip && "lg:order-1")}>
            <p
              className="t-engrave text-[0.66rem] tracking-[0.28em]"
              style={{ color: `color-mix(in oklab, ${accent} 78%, var(--ink-800))` }}
            >
              Chapter {String(index + 1).padStart(2, "0")} · {theme.mood}
            </p>
            <h3
              id={`world-${world.slug}-title`}
              className="t-display mt-3 text-4xl text-fg sm:text-5xl md:text-6xl"
            >
              {world.name}
            </h3>
            {chapter?.tagline ? (
              <p className="mt-2 font-display text-xl italic text-fg-2 md:text-2xl">
                {chapter.tagline}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-2">{world.blurb}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {world.sampleCharacters.map((c) => (
                <li
                  key={c}
                  className="rounded-pill border bg-surface/70 px-3.5 py-1.5 text-sm font-medium text-fg-2"
                  style={{ borderColor: `color-mix(in oklab, ${accent} 38%, transparent)` }}
                >
                  {c}
                </li>
              ))}
            </ul>

            <p
              className="mt-5 text-sm font-semibold"
              style={{ color: `color-mix(in oklab, ${accent} 66%, var(--ink-900))` }}
            >
              {world.pricingSummary}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ExploreButton world={world} />
              <PriceButton world={world} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StorybookWorlds() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1 · The heading "explodes" in.
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: "[data-intro]", start: "top 78%", once: true },
      });
      introTl
        .from("[data-flare]", { scale: 0, opacity: 0, duration: 0.9, ease: "power3.out" }, 0)
        .from(
          "[data-explode]",
          {
            scale: 0.55,
            opacity: 0,
            y: 36,
            filter: "blur(10px)",
            duration: 0.85,
            ease: "back.out(1.6)",
            stagger: 0.12,
          },
          0.08,
        )
        .to("[data-flare]", { opacity: 0, scale: 1.5, duration: 1.3, ease: "power2.out" }, 0.45);

      // 2 · Quick-jump rail pops in.
      gsap.from("[data-rail] > li", {
        opacity: 0,
        y: 18,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.05,
        scrollTrigger: { trigger: "[data-rail]", start: "top 88%", once: true },
      });

      // 3 · Each world panel slides + parallaxes as it enters.
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, i) => {
        const visual = panel.querySelector("[data-panel-visual]");
        const copy = panel.querySelector("[data-panel-copy]");
        const dir = i % 2 === 1 ? 1 : -1;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 72%", once: true },
        });
        if (visual) {
          tl.from(visual, {
            opacity: 0,
            xPercent: dir * 12,
            scale: 0.92,
            duration: 0.9,
            ease: "power3.out",
          });
        }
        if (copy) {
          tl.from(
            (copy as HTMLElement).children,
            { opacity: 0, y: 30, duration: 0.7, ease: "power2.out", stagger: 0.09 },
            0.15,
          );
        }

        const img = panel.querySelector("[data-parallax]");
        if (img) {
          gsap.to(img, {
            yPercent: -9,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Intro + quick-jump rail */}
      <section
        id="choose-your-chapter"
        className="relative isolate overflow-hidden scroll-mt-24 pt-16 md:pt-24"
        style={{ background: "var(--grad-parchment)" }}
      >
        <div aria-hidden className="tx-sparkle-field absolute inset-0" style={{ opacity: 0.4 }} />

        <div data-intro className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          {/* Burst flare behind the title */}
          <div
            data-flare
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224,195,131,0.5) 0%, rgba(231,181,158,0.22) 42%, transparent 70%)",
            }}
          />
          <Sparkles className="-z-0" color="var(--gold-400)" count={5} />
          <p data-explode className="t-eyebrow relative text-fg-gold">
            Choose your chapter
          </p>
          <h2
            data-explode
            className="t-display relative mt-3 text-4xl text-fg sm:text-5xl md:text-6xl"
          >
            Step into eight magical worlds
          </h2>
          <p data-explode className="relative mt-4 text-lg text-fg-2">
            Every character is its own little world. Pick the adventure that fits your event — from
            backyard birthdays to city festivals across Metro Vancouver.
          </p>
        </div>

        {/* Quick-jump rail — eight world buttons */}
        <ul
          data-rail
          className="relative mx-auto mt-10 flex max-w-[1100px] flex-wrap justify-center gap-2.5 px-5 sm:px-6 lg:px-8"
        >
          {characterWorlds.map((w) => {
            const accent = `var(--chapter-${w.accent})`;
            return (
              <li key={w.slug}>
                <a
                  href={`#world-${w.slug}`}
                  className="group inline-flex items-center gap-2 rounded-pill border bg-surface/80 py-2 pl-2 pr-4 text-sm font-semibold text-fg shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  style={{ borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }}
                >
                  <span
                    className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border bg-ink-900"
                    style={{ borderColor: `color-mix(in oklab, ${accent} 55%, var(--gold-500))` }}
                  >
                    <img
                      src={w.medallion}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                      width={28}
                      height={28}
                    />
                  </span>
                  {w.navLabel}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="h-12 md:h-16" />
      </section>

      {/* The eight worlds, large */}
      {characterWorlds.map((world, i) => (
        <WorldPanel key={world.slug} world={world} index={i} />
      ))}
    </div>
  );
}
