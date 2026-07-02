import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characterWorlds, worldThemes, chapterBySlug } from "@/lib/site-data";
import { WorldDecor, Sparkles } from "./Scenery";
import { cn } from "@/lib/utils";
import allWorldsPanorama from "@/assets/booking/all-worlds-panorama.webp";
import princessArt from "@/assets/princess/castle-bright.jpg";
import heroArt from "@/assets/hero/hq-hero.webp";
import dinoArt from "@/assets/dinosaur/harvey-hero-poster.webp";
import mermaidArt from "@/assets/mermaid/mermaid-hero-poster.webp";
import mascotArt from "@/assets/mascot/mascot-hero.webp";
import holidayArt from "@/assets/holiday/village-christmas.webp";
import wonderverseArt from "@/assets/specialty/wonderverse-gateway.webp";
import bazaarArt from "@/assets/bazaar/bazaar-hero.webp";

/* ---- Move 6: painted world atmospheres — soft-focus gouache washes that let each
   panel COMMIT to its palette (mermaid gets to be teal) without doubling the plate art. */
import ambPrincess from "@/assets/worlds/ambient/princess.webp";
import ambHero from "@/assets/worlds/ambient/hero.webp";
import ambDinosaur from "@/assets/worlds/ambient/dinosaur.webp";
import ambMermaid from "@/assets/worlds/ambient/mermaid.webp";
import ambWonderverse from "@/assets/worlds/ambient/wonderverse.webp";
import ambMascot from "@/assets/worlds/ambient/mascot.webp";
import ambHoliday from "@/assets/worlds/ambient/holiday.webp";
import ambBazaar from "@/assets/worlds/ambient/bazaar.webp";

const WORLD_AMBIENT: Record<string, string> = {
  "princess-events": ambPrincess,
  "hero-events": ambHero,
  "dinosaur-events": ambDinosaur,
  "mermaid-events": ambMermaid,
  "specialty-events": ambWonderverse,
  "mascot-events": ambMascot,
  "holiday-events": ambHoliday,
  "character-extras": ambBazaar,
};

/** One world's edge colour — its accent breathed into warm white. Panel feathers
 *  and the between-panel blend strips both draw from this, so every boundary is a
 *  continuous hue ramp (world A tint → world B tint) with no hard edge. */
const edgeTint = (accent: string) => `color-mix(in oklab, var(--chapter-${accent}) 20%, #FFFDF7)`;

/**
 * The REAL world-page hero art now powers each homepage panel — the same painting a
 * visitor meets when they step into that world's page, so homepage → world page is one
 * continuous image. bookingId matches the Grand Booking Hall's world ids for
 * /contact?world= deep links; pos = each art's proven focal point.
 */
const WORLD_ART: Record<string, { art: string; bookingId: string; pos: string }> = {
  "princess-events": { art: princessArt, bookingId: "princess", pos: "47% 50%" },
  "hero-events": { art: heroArt, bookingId: "hero", pos: "76% 50%" },
  "dinosaur-events": { art: dinoArt, bookingId: "jurassic", pos: "78% 50%" },
  "mermaid-events": { art: mermaidArt, bookingId: "mermaid", pos: "88% 50%" },
  "specialty-events": { art: wonderverseArt, bookingId: "wonderverse", pos: "75% 50%" },
  "mascot-events": { art: mascotArt, bookingId: "mascot", pos: "50% 50%" },
  "holiday-events": { art: holidayArt, bookingId: "holiday", pos: "42% 50%" },
  "character-extras": { art: bazaarArt, bookingId: "bazaar", pos: "80% 50%" },
};

/* ---- The residents: real character art rotating on each world's collectible card ---- */
import iceQueen from "@/assets/princess/cards/ice-queen.webp";
import glassSlipper from "@/assets/princess/cards/glass-slipper-princess.webp";
import fairest from "@/assets/princess/cards/fairest-princess.webp";
import crystal from "@/assets/princess/cards/crystal-princess.webp";
import webSlinger from "@/assets/hero/cutouts/web-slinger.webp";
import captainValor from "@/assets/hero/cutouts/captain-valor.webp";
import nightGuardian from "@/assets/hero/cutouts/night-guardian.webp";
import warriorPrincess from "@/assets/hero/cutouts/warrior-princess.webp";
import harveyMeet from "@/assets/dinosaur/harvey-meet.webp";
import harveyReveal from "@/assets/dinosaur/harvey-reveal.webp";
import trainerAcademy from "@/assets/dinosaur/gallery/trainer-academy.webp";
import marina from "@/assets/mermaid/marina-mermaid.webp";
import coralina from "@/assets/mermaid/coralina-mermaid.webp";
import nerissa from "@/assets/mermaid/nerissa-mermaid.webp";
import wvDark from "@/assets/specialty/cast/dark.webp";
import wvKnight from "@/assets/specialty/cast/knight.webp";
import wvPixie from "@/assets/specialty/cast/pixie.webp";
import wvUnicorn from "@/assets/specialty/cast/unicorn.webp";
import mascotHug from "@/assets/mascot/gallery/birthday-hug.webp";
import mascotDance from "@/assets/mascot/gallery/dance-party.webp";
import mascotPhoto from "@/assets/mascot/gallery/photo-garden.webp";
import holXmas from "@/assets/holiday/zones/zone-christmas.webp";
import holEaster from "@/assets/holiday/zones/zone-easter.webp";
import holHalloween from "@/assets/holiday/zones/zone-halloween.webp";
import bzAlejandra from "@/assets/bazaar/alejandra.webp";
import bzLauren from "@/assets/bazaar/lauren.webp";
import bzBehrooz from "@/assets/bazaar/behrooz.webp";
import goldenGown from "@/assets/princess/cards/golden-gown-princess.webp";
import towerPrincess from "@/assets/princess/cards/tower-princess.webp";
import starCaptain from "@/assets/hero/cutouts/star-captain.webp";
import steelSentinel from "@/assets/hero/cutouts/steel-sentinel.webp";
import dinoEntrance from "@/assets/dinosaur/gallery/big-entrance.webp";
import dinoSchool from "@/assets/dinosaur/gallery/school-visit.webp";
import wvEmerald from "@/assets/specialty/cast/emerald.webp";
import wvRose from "@/assets/specialty/cast/rose.webp";
import mascotFestival from "@/assets/mascot/gallery/festival-appearance.webp";
import mascotSchool from "@/assets/mascot/gallery/school-visit.webp";

type Resident = { img: string; name: string; pos?: string };
const WORLD_RESIDENTS: Record<string, Resident[]> = {
  "princess-events": [
    { img: iceQueen, name: "Ice Queen" },
    { img: glassSlipper, name: "Glass Slipper Princess" },
    { img: fairest, name: "Fairest Princess" },
    { img: crystal, name: "Crystal Princess" },
    { img: goldenGown, name: "Golden Gown Princess" },
    { img: towerPrincess, name: "Tower Princess" },
  ],
  "hero-events": [
    { img: webSlinger, name: "The Web Slinger" },
    { img: captainValor, name: "Captain Valor" },
    { img: nightGuardian, name: "The Night Guardian" },
    { img: warriorPrincess, name: "The Warrior Princess" },
    { img: starCaptain, name: "The Star Captain" },
    { img: steelSentinel, name: "The Steel Sentinel" },
  ],
  "dinosaur-events": [
    { img: harveyMeet, name: "Harvey the Dinosaur" },
    { img: harveyReveal, name: "The Big Reveal" },
    { img: trainerAcademy, name: "Trainer Academy" },
    { img: dinoEntrance, name: "The Grand Entrance" },
    { img: dinoSchool, name: "School Visits" },
  ],
  "mermaid-events": [
    { img: marina, name: "Marina Pearlwave", pos: "50% 20%" },
    { img: coralina, name: "Coralina SunSplash", pos: "50% 20%" },
    { img: nerissa, name: "Nerissa Moonreef", pos: "50% 20%" },
  ],
  "specialty-events": [
    { img: wvKnight, name: "The Cosmic Knight" },
    { img: wvPixie, name: "The Pixie Fairy" },
    { img: wvUnicorn, name: "The Unicorn Fairy" },
    { img: wvDark, name: "The Dark Lord" },
    { img: wvEmerald, name: "The Emerald Fairy" },
    { img: wvRose, name: "The Rose Fairy" },
  ],
  "mascot-events": [
    { img: mascotHug, name: "Birthday Hugs" },
    { img: mascotDance, name: "Dance Parties" },
    { img: mascotPhoto, name: "Photo Moments" },
    { img: mascotFestival, name: "Festival Fun" },
    { img: mascotSchool, name: "School Visits" },
  ],
  "holiday-events": [
    { img: holXmas, name: "Christmas Visits" },
    { img: holEaster, name: "Spring & Easter" },
    { img: holHalloween, name: "Spooky Season" },
  ],
  "character-extras": [
    { img: bzAlejandra, name: "Alejandra · Face Artist", pos: "50% 22%" },
    { img: bzLauren, name: "Lauren · Balloon Artist", pos: "50% 24%" },
    { img: bzBehrooz, name: "Behrooz · Photographer", pos: "50% 18%" },
  ],
};

/**
 * ResidentCard — a collectible character card that lives on each world panel and
 * slowly rotates through the world's real residents, so visitors see exactly the
 * kinds of characters they can expect. Cross-fade starts when the panel is in view;
 * reduced-motion holds the first resident.
 */
function ResidentCard({ slug, accent }: { slug: string; accent: string }) {
  const residents = WORLD_RESIDENTS[slug];
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!residents || residents.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (timer === undefined)
          timer = window.setInterval(() => setIdx((i) => (i + 1) % residents.length), 3400);
      } else if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [residents]);

  if (!residents?.length) return null;

  return (
    <div ref={ref} className="resident-card" style={{ "--acc": accent } as React.CSSProperties}>
      <div className="resident-card-frame">
        {residents.map((r, i) => (
          <img
            key={r.name}
            src={r.img}
            alt={i === idx ? `${r.name} — one of the characters in this world` : ""}
            aria-hidden={i !== idx}
            loading="lazy"
            decoding="async"
            className="resident-card-img"
            data-active={i === idx || undefined}
            style={{ objectPosition: r.pos ?? "50% 12%" }}
          />
        ))}
        <span aria-hidden className="resident-card-shine" />
      </div>
      <span className="resident-card-name" aria-live="polite">{residents[idx].name}</span>
    </div>
  );
}

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
      className="btn-magic inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3 text-base font-semibold text-white shadow-[var(--shadow-sm)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      style={{ background: `color-mix(in oklab, ${accent} 80%, var(--ink-900))` }}
    >
      {world.exploreLabel} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

function BookButton({ world }: { world: World }) {
  const accent = `var(--chapter-${world.accent})`;
  const bookingId = WORLD_ART[world.slug]?.bookingId;
  return (
    <Link
      to="/contact"
      search={bookingId ? { world: bookingId } : undefined}
      className="btn-magic inline-flex items-center justify-center gap-2 rounded-pill border-[1.5px] bg-surface/80 px-7 py-3 text-base font-semibold text-fg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 55%, var(--gold-500))`,
        color: `color-mix(in oklab, ${accent} 70%, var(--ink-900))`,
      }}
    >
      Book This World
    </Link>
  );
}

function WorldPanel({ world, index }: { world: World; index: number }) {
  const theme = worldThemes[world.slug];
  const chapter = chapterBySlug(world.slug);
  const accent = `var(--chapter-${world.accent})`;
  const flip = index % 2 === 1;
  const land = WORLD_ART[world.slug];
  const art = land?.art ?? world.scene;

  return (
    <section
      id={`world-${world.slug}`}
      data-panel
      data-world-panel={land?.bookingId ?? world.slug}
      data-world-name={world.name}
      data-world-accent={`var(--chapter-${world.accent})`}
      aria-labelledby={`world-${world.slug}-title`}
      className="relative isolate overflow-hidden scroll-mt-24 py-24 md:py-36"
      style={{ background: theme.bg }}
    >
      {/* The land's atmosphere — a soft-focus painted wash committed to this world's
          palette. Strong enough to feel like weather (not wallpaper); a copy-side scrim
          below keeps the words readable instead of a heavy full-bleed veil. */}
      <img
        src={WORLD_AMBIENT[world.slug] ?? art}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.6]"
      />
      {/* top/bottom feather into this world's OWN edge tint — the blend strip
          between panels then ramps tint→tint, so no boundary is ever hard */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, ${edgeTint(world.accent)} 0%, transparent 18%, transparent 80%, ${edgeTint(world.accent)} 100%)`,
        }}
      />
      {/* copy-side scrim — a soft cream pool under the text column only */}
      <div
        aria-hidden
        className="absolute inset-y-0 -z-10 w-[62%] max-lg:hidden"
        style={{
          [flip ? "left" : "right"]: 0,
          background: `linear-gradient(${flip ? "270deg" : "90deg"}, rgba(255,253,247,0) 0%, rgba(255,253,247,0.55) 34%, rgba(255,253,247,0.72) 70%, rgba(255,253,247,0.55) 100%)`,
        }}
      />
      {/* stacked layout (mobile/tablet): one gentle veil so copy stays readable */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(255,253,247,0.34)] lg:hidden" />

      {/* Drifting world motif + faint linework */}
      <div className="card-decor pointer-events-none absolute inset-0 opacity-60">
        <WorldDecor kind={theme.decor} accent={theme.accent} secondary={theme.secondary} />
      </div>
      <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.05 }} />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Visual — the world's real gateway art */}
          <div data-panel-visual className={cn("relative", flip && "lg:order-2")}>
            <div
              className="plate relative overflow-hidden bg-ink-900"
              style={{ outlineColor: `color-mix(in oklab, ${accent} 60%, var(--gold-500))` }}
            >
              <img
                data-parallax
                src={art}
                alt={`${world.name} — premium ${world.navLabel.toLowerCase()} entertainment in Metro Vancouver`}
                className="aspect-[3/2] w-full scale-110 object-cover"
                style={{ objectPosition: land?.pos ?? "50% 50%" }}
                width={1240}
                height={827}
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

            {/* The residents — a collectible card rotating through this world's real characters */}
            <ResidentCard slug={world.slug} accent={accent} />
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
              className="t-display mt-3 text-4xl text-fg sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {world.name}
            </h3>
            {chapter?.tagline ? (
              <p className="mt-2 font-display text-xl italic text-fg-2 md:text-2xl">
                {chapter.tagline}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-2">{world.blurb}</p>

            <p
              className="mt-5 text-sm font-semibold"
              style={{ color: `color-mix(in oklab, ${accent} 66%, var(--ink-900))` }}
            >
              {world.pricingSummary}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ExploreButton world={world} />
              <BookButton world={world} />
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
      // One motion grammar page-wide: GSAP speaks Reveal's dialect.
      gsap.defaults({ ease: "power2.out", duration: 0.7 });

      // 1 · The heading rises in — same values the panel copy uses.
      gsap.from("[data-explode]", {
        opacity: 0,
        y: 30,
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-intro]", start: "top 78%", once: true },
      });

      // 2 · The gold thread draws, then the chapter seals stamp in.
      gsap.from("[data-thread]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        scrollTrigger: { trigger: "[data-rail]", start: "top 88%", once: true },
      });
      gsap.from("[data-rail] li", {
        opacity: 0,
        y: 14,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-rail]", start: "top 88%", once: true },
      });

      // 3 · Each world panel eases in as it enters (softened — the land is the star).
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, i) => {
        const visual = panel.querySelector("[data-panel-visual]");
        const copy = panel.querySelector("[data-panel-copy]");
        const dir = i % 2 === 1 ? 1 : -1;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 72%", once: true },
        });
        if (visual) {
          tl.from(visual, { opacity: 0, xPercent: dir * 6, scale: 0.97, duration: 0.9 });
        }
        if (copy) {
          tl.from(
            (copy as HTMLElement).children,
            { opacity: 0, y: 30, stagger: 0.09 },
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
        {/* All eight worlds in one painting — the chapter map behind the invitation */}
        <img
          src={allWorldsPanorama}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,243,225,0.92) 0%, rgba(251,243,225,0.55) 40%, rgba(251,243,225,0.75) 100%)",
          }}
        />
        <div aria-hidden className="tx-sparkle-field absolute inset-0" style={{ opacity: 0.4 }} />

        <div data-intro className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          <Sparkles className="-z-0" color="var(--gold-400)" count={5} />
          <p data-explode className="t-eyebrow relative text-fg-gold">
            Choose your chapter
          </p>
          <h2
            data-explode
            className="t-display relative mt-3 text-4xl text-fg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Step into eight magical <em className="act-em">worlds</em>
          </h2>
          <p data-explode className="relative mt-4 text-lg text-fg-2">
            Every character is its own little world. Pick the adventure that fits your event — from
            backyard birthdays to city festivals across Metro Vancouver.
          </p>
        </div>

        {/* Illuminated table of contents — the eight chapters strung on a gold thread */}
        <nav
          data-rail
          aria-label="Jump to a world"
          className="relative mx-auto mt-12 hidden max-w-[1160px] px-5 lg:block"
        >
          <span aria-hidden data-thread className="cyc-thread" />
          <ul className="relative z-10 flex items-start justify-between">
            {characterWorlds.map((w) => (
              <li key={w.slug}>
                <a
                  href={`#world-${w.slug}`}
                  className="cyc-anchor group"
                  style={{ "--acc": `var(--chapter-${w.accent})` } as React.CSSProperties}
                >
                  <span className="cyc-anchor-seal">
                    <img src={w.medallion} alt="" aria-hidden width={48} height={48} />
                  </span>
                  <span className="cyc-anchor-label">{w.navLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile quick-jump rail — eight world pills */}
        <ul
          data-rail
          className="relative mx-auto mt-10 flex max-w-[1100px] flex-wrap justify-center gap-2.5 px-5 sm:px-6 lg:hidden lg:px-8"
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

      {/* The eight worlds, large — each dissolving into the next through a soft
          hue ramp (this world's tint → the next world's tint, in oklab). Bookend
          strips close the section's outer edges the same way: parchment intro →
          first world, last world → the day-arc's dawn cream. */}
      <div
        className="world-blend"
        aria-hidden
        style={{
          background: `linear-gradient(180deg, #F1E6D0 0%, ${edgeTint(characterWorlds[0].accent)} 100%)`,
        }}
      />
      {characterWorlds.map((world, i) => (
        <Fragment key={world.slug}>
          <WorldPanel world={world} index={i} />
          <div
            className="world-blend"
            aria-hidden
            style={{
              background:
                i < characterWorlds.length - 1
                  ? `linear-gradient(180deg, ${edgeTint(world.accent)} 0%, ${edgeTint(characterWorlds[i + 1].accent)} 100%)`
                  : `linear-gradient(180deg, ${edgeTint(world.accent)} 0%, #FDF9F0 100%)`,
            }}
          />
        </Fragment>
      ))}
    </div>
  );
}
