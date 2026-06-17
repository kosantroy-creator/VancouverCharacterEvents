import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Shield, Sparkles, Zap } from "lucide-react";
import type { CourtCharacter, CourtDoor, WorldCourt } from "@/lib/royal-court";
import { cn } from "@/lib/utils";

import midnightAgent from "@/assets/hero/characters/midnight-agent.webp";
import frostAgent from "@/assets/hero/characters/frost-agent.webp";
import webSlinger from "@/assets/hero/characters/web-slinger.webp";
import webDancer from "@/assets/hero/characters/web-dancer.webp";
import nightGuardian from "@/assets/hero/characters/night-guardian.webp";
import captainValor from "@/assets/hero/characters/captain-valor.webp";
import starCaptain from "@/assets/hero/characters/star-captain.webp";
import steelSentinel from "@/assets/hero/characters/steel-sentinel.webp";
import warriorPrincess from "@/assets/hero/characters/warrior-princess.webp";
import bgWeb from "@/assets/hero/portals/web-heroes.webp";
import bgStarShield from "@/assets/hero/portals/star-shield.webp";
import bgLegends from "@/assets/hero/portals/legends.webp";
import cutWebSlinger from "@/assets/hero/cutouts/web-slinger.webp";
import cutWebDancer from "@/assets/hero/cutouts/web-dancer.webp";
import cutCaptainValor from "@/assets/hero/cutouts/captain-valor.webp";
import cutStarCaptain from "@/assets/hero/cutouts/star-captain.webp";
import cutMidnightAgent from "@/assets/hero/cutouts/midnight-agent.webp";
import cutFrostAgent from "@/assets/hero/cutouts/frost-agent.webp";
import cutSteelSentinel from "@/assets/hero/cutouts/steel-sentinel.webp";
import cutNightGuardian from "@/assets/hero/cutouts/night-guardian.webp";
import cutWarriorPrincess from "@/assets/hero/cutouts/warrior-princess.webp";
import sectionWeb from "@/assets/hero/sections/web-heroes.webp";
import sectionStarShield from "@/assets/hero/sections/star-shield.webp";
import sectionLegends from "@/assets/hero/sections/legends.webp";

/**
 * HeroDivisions — the "Assemble Your Squad" showcase. The hero sibling of the
 * princess KingdomDoors: three large, immersive Hero HQ portals. Each portal is
 * an alternating row — a cinematic environment portal (still image + looping
 * activation video) on one side, the portal name, description, hero profile
 * cards and a CTA on the other.
 *
 * Cards read `photo ?? HERO_CARD_ART[id]`. The two agents are original generated
 * art; the rest fill in from Drive performer photos. Each portal activates on
 * scroll (styles.css "HERO PORTAL").
 */

/** Hero portraits keyed by character id. Brand-safe names only. */
export const HERO_CARD_ART: Record<string, string> = {
  "web-slinger": webSlinger,
  "web-dancer": webDancer,
  "captain-valor": captainValor,
  "star-captain": starCaptain,
  "midnight-agent": midnightAgent,
  "frost-agent": frostAgent,
  "steel-sentinel": steelSentinel,
  "night-guardian": nightGuardian,
  "warrior-princess": warriorPrincess,
};

/** Performer cutouts (background removed) — used on the themed portal cards. */
const HERO_CUTOUT: Record<string, string> = {
  "web-slinger": cutWebSlinger,
  "web-dancer": cutWebDancer,
  "captain-valor": cutCaptainValor,
  "star-captain": cutStarCaptain,
  "midnight-agent": cutMidnightAgent,
  "frost-agent": cutFrostAgent,
  "steel-sentinel": cutSteelSentinel,
  "night-guardian": cutNightGuardian,
  "warrior-princess": cutWarriorPrincess,
};
/**
 * Per-portal visual theme. Each portal gets its own wide cinematic city band
 * (behind the portal video + content, full-bleed across the section) and a fully
 * themed card: a clean two-tone gradient behind the cutout (no busy photo) plus
 * matching frame, name, chips and CTA colors.
 *   · Web Heroes        → red / white
 *   · Star & Shield     → blue / red
 *   · Legends & Guardians → gold / black
 */
type PortalTheme = {
  /** Wide environment band that fills the whole section behind the portal. */
  section: string;
  /** Two-tone gradient painted behind the performer cutout. */
  portrait: string;
  /** Card surface, border and text colors. */
  surface: string;
  border: string;
  name: string;
  label: string;
  /** Trait chip background + text. */
  chipBg: string;
  chipText: string;
  /** Portrait corner brackets (rest → hover). */
  cornerA: string;
  cornerAOn: string;
  cornerB: string;
  cornerBOn: string;
  /** "Invite This Hero" CTA. */
  ctaBg: string;
  ctaHover: string;
  ctaText: string;
  /** Color glow that radiates from the portal into the band. */
  tint: string;
};

const PORTAL_THEME: Record<string, PortalTheme> = {
  "web-heroes": {
    section: sectionWeb,
    portrait:
      "radial-gradient(125% 100% at 50% 10%, #FFFFFF 0%, #FCDCE0 34%, #E85060 70%, #BE2738 100%)",
    surface: "#FFFFFF",
    border: "rgba(216,58,74,0.55)",
    name: "#A92534",
    label: "rgba(169,37,52,0.78)",
    chipBg: "rgba(216,58,74,0.12)",
    chipText: "#A92534",
    cornerA: "rgba(216,58,74,0.7)",
    cornerAOn: "#D83A4A",
    cornerB: "rgba(255,255,255,0.9)",
    cornerBOn: "#FFFFFF",
    ctaBg: "#D83A4A",
    ctaHover: "#A92534",
    ctaText: "#FFFFFF",
    tint: "rgba(216,58,74,0.30)",
  },
  "star-shield-heroes": {
    section: sectionStarShield,
    portrait:
      "radial-gradient(125% 100% at 50% 8%, #EAF3FF 0%, #7FAEE6 28%, #3A66AE 58%, #9A2A38 100%)",
    surface: "#FFFFFF",
    border: "rgba(47,95,168,0.6)",
    name: "#18365D",
    label: "rgba(35,81,143,0.8)",
    chipBg: "rgba(79,143,220,0.14)",
    chipText: "#23518F",
    cornerA: "rgba(79,143,220,0.75)",
    cornerAOn: "#4F8FDC",
    cornerB: "rgba(216,58,74,0.7)",
    cornerBOn: "#D83A4A",
    ctaBg: "#2F5FA8",
    ctaHover: "#D83A4A",
    ctaText: "#FFFFFF",
    tint: "rgba(79,143,220,0.30)",
  },
  "legends-guardians": {
    section: sectionLegends,
    portrait:
      "radial-gradient(125% 105% at 50% 8%, #FBE390 0%, #D7A646 26%, #6E5316 52%, #0B0E14 100%)",
    surface: "#13161F",
    border: "rgba(215,166,70,0.6)",
    name: "#F3C75A",
    label: "rgba(243,199,90,0.82)",
    chipBg: "rgba(215,166,70,0.16)",
    chipText: "#F3C75A",
    cornerA: "rgba(215,166,70,0.78)",
    cornerAOn: "#F3C75A",
    cornerB: "rgba(243,199,90,0.5)",
    cornerBOn: "#F3C75A",
    ctaBg: "#D7A646",
    ctaHover: "#B8842B",
    ctaText: "#1A1205",
    tint: "rgba(215,166,70,0.26)",
  },
};

const DEFAULT_THEME = PORTAL_THEME["web-heroes"];

type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

/** Per-portal icon (also used in the content header). */
const PORTAL_ICON: Record<string, IconType> = {
  "web-heroes": Zap,
  "star-shield-heroes": Shield,
  "legends-guardians": Landmark,
};
/** Per-portal environment still (poster + reduced-motion fallback). */
const PORTAL_BG: Record<string, string> = {
  "web-heroes": bgWeb,
  "star-shield-heroes": bgStarShield,
  "legends-guardians": bgLegends,
};
/** Per-portal looping activation video (public/, served as a static asset). */
const PORTAL_VIDEO: Record<string, string> = {
  "web-heroes": "/video/hero-portals/web-heroes.mp4",
  "star-shield-heroes": "/video/hero-portals/star-shield.mp4",
  "legends-guardians": "/video/hero-portals/legends.mp4",
};
/**
 * Per-portal media framing. Each 16:9 portal clip frames its ring off-centre, so
 * we shift `object-position` to bring the portal to the middle of the square.
 * The web portal is also mirrored so its mouth opens toward the hero cards.
 */
const PORTAL_VIDEO_FX: Record<string, { objectPosition?: string; flipX?: boolean }> = {
  "web-heroes": { objectPosition: "95% 50%", flipX: true },
  "star-shield-heroes": { objectPosition: "88% 50%" },
  "legends-guardians": { objectPosition: "8% 50%" },
};

export function HeroDivisions({ squad }: { squad: WorldCourt }) {
  return (
    <div className="space-y-12 md:space-y-20">
      {squad.doors.map((door, i) => (
        <PortalRow key={door.id} door={door} index={i} />
      ))}
    </div>
  );
}

function PortalRow({ door, index }: { door: CourtDoor; index: number }) {
  const Icon = PORTAL_ICON[door.id] ?? Shield;
  const theme = PORTAL_THEME[door.id] ?? DEFAULT_THEME;
  const flip = index % 2 === 1;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setReduced(true);
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-portal
      aria-label={door.name}
      className={cn("hportal relative isolate scroll-mt-24 py-10 md:py-14", active && "is-active")}
    >
      {/* Wide cinematic city band — full-bleed behind the whole row, feathered
          top & bottom so it melts into the navy canvas (mirrors the princess
          realm background that runs across each kingdom). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
        }}
      >
        <img src={theme.section} alt="" loading="lazy" className="h-full w-full object-cover" />
        {/* depth grade top → bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,20,38,0.5) 0%, rgba(12,20,38,0.24) 40%, rgba(12,20,38,0.36) 70%, rgba(12,20,38,0.66) 100%)",
          }}
        />
        {/* readability scrim toward the copy side */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${flip ? "to left" : "to right"}, transparent 44%, rgba(11,20,40,0.6) 100%)`,
          }}
        />
        {/* portal-side color glow radiating from the video */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(760px 520px at ${flip ? "82%" : "18%"} 46%, ${theme.tint}, transparent 72%)`,
          }}
        />
      </div>

      <div
        className={cn(
          "grid items-center gap-9 lg:gap-14",
          flip
            ? "lg:grid-cols-[1fr_minmax(320px,440px)]"
            : "lg:grid-cols-[minmax(320px,440px)_1fr]",
        )}
      >
        <div className={cn("mx-auto w-full max-w-[440px]", flip && "lg:order-2")}>
          <PortalVisual door={door} active={active} reduced={reduced} />
        </div>

        <div className={cn("min-w-0", flip && "lg:order-1")}>
          <div
            className={cn("hportal-reveal flex items-center gap-3", flip && "lg:justify-end")}
            style={{ transitionDelay: "120ms" }}
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border"
              style={{
                borderColor: `color-mix(in oklab, ${door.accent} 60%, white)`,
                background: `color-mix(in oklab, ${door.accent} 26%, transparent)`,
              }}
            >
              <Icon className="h-5 w-5 text-white" aria-hidden />
            </span>
            <div>
              <p className="t-engrave text-[0.56rem] tracking-[0.24em] text-[#A9CCF0]">
                Hero Portal · 0{index + 1}
              </p>
              <h3 className="t-display text-3xl font-bold leading-tight text-star-white sm:text-4xl">
                {door.name}
              </h3>
            </div>
          </div>

          <p
            className={cn(
              "hportal-reveal mt-3 max-w-xl text-[0.97rem] leading-relaxed text-fg-on-ink/80",
              flip && "lg:ml-auto lg:text-right",
            )}
            style={{ transitionDelay: "180ms" }}
          >
            {door.story}
          </p>

          <ul
            className={cn("mt-6 flex flex-wrap gap-3.5", flip && "lg:justify-end")}
            aria-label={`${door.name} heroes`}
          >
            {door.characters.map((c, i) => (
              <HeroCard key={c.id} c={c} theme={theme} index={i} />
            ))}
          </ul>

          <div
            className={cn("hportal-reveal mt-7 flex items-center gap-4", flip && "lg:justify-end")}
            style={{ transitionDelay: `${320 + door.characters.length * 80}ms` }}
          >
            <a
              href="#book"
              className="btn-magic group/cta relative inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(216,58,74,0.6)] transition-all hover:shadow-[0_0_30px_rgba(216,58,74,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
            >
              Assemble This Squad
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                aria-hidden
              />
            </a>
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-fg-on-ink/55">
              {door.characters.length} hero{door.characters.length === 1 ? "" : "es"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalVisual({
  door,
  active,
  reduced,
}: {
  door: CourtDoor;
  active: boolean;
  reduced: boolean;
}) {
  const Icon = PORTAL_ICON[door.id] ?? Shield;
  const bg = PORTAL_BG[door.id];
  const video = PORTAL_VIDEO[door.id];
  const fx = PORTAL_VIDEO_FX[door.id];
  const fxStyle: CSSProperties | undefined = fx
    ? { objectPosition: fx.objectPosition, transform: fx.flipX ? "scaleX(-1)" : undefined }
    : undefined;
  return (
    <div className="hportal-frame relative aspect-square w-full overflow-hidden rounded-[26px] border-2 border-[var(--hero-sky)]/55 bg-[var(--hero-navy)]">
      {/* Single base layer. When active (and motion is allowed) the portal IS the
          video — its own `poster` covers the brief load, so there's no separate
          still stacked underneath to flash through during the swap (mirrors the
          princess door portals). Reduced-motion / pre-activation shows the still. */}
      {active && !reduced ? (
        <video
          src={video}
          poster={bg}
          autoPlay
          muted
          playsInline
          preload="none"
          style={fxStyle}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={bg}
          alt=""
          aria-hidden
          loading="lazy"
          style={fxStyle}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* blue activation glow (dim → lit on activate) */}
      <span
        aria-hidden
        className="hportal-glow pointer-events-none absolute inset-0"
        style={{ boxShadow: `inset 0 0 64px -8px ${door.glow}` }}
      />
      {/* subtle red motion streaks over the art */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "repeating-linear-gradient(125deg, transparent 0 80px, rgba(216,58,74,0.08) 80px 83px)",
        }}
      />
      {/* bottom scrim + portal label */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{ background: "linear-gradient(180deg, transparent, rgba(8,18,38,0.72))" }}
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 p-5 text-center">
        <span className="t-engrave text-[0.56rem] tracking-[0.26em] text-white/85">
          Enter the Portal
        </span>
        <span className="inline-flex items-center gap-2 font-sans text-lg font-extrabold uppercase tracking-wide text-white">
          <Icon className="h-4 w-4" aria-hidden />
          {door.name}
        </span>
      </div>

      {/* red accent line that sweeps the frame once on activate */}
      <span
        aria-hidden
        className="hportal-redline absolute inset-x-6 top-5 h-[2px] rounded bg-[var(--hero-red)]"
      />
      {/* corner accents */}
      <span className="pointer-events-none absolute left-3 top-3 h-7 w-7 rounded-tl-[16px] border-l-2 border-t-2 border-[var(--hero-red)]" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 rounded-br-[16px] border-b-2 border-r-2 border-[var(--hero-red)]" />
    </div>
  );
}

function HeroCard({ c, theme, index }: { c: CourtCharacter; theme: PortalTheme; index: number }) {
  const cut = HERO_CUTOUT[c.id];
  return (
    <li
      className="hportal-card group/card relative h-[190px] w-[130px]"
      style={
        {
          transitionDelay: `${240 + index * 80}ms`,
          "--portrait": theme.portrait,
          "--surface": theme.surface,
          "--border": theme.border,
          "--name": theme.name,
          "--label": theme.label,
          "--chip-bg": theme.chipBg,
          "--chip-text": theme.chipText,
          "--corner-a": theme.cornerA,
          "--corner-a-on": theme.cornerAOn,
          "--corner-b": theme.cornerB,
          "--corner-b-on": theme.cornerBOn,
          "--cta-bg": theme.ctaBg,
          "--cta-hover": theme.ctaHover,
          "--cta-text": theme.ctaText,
        } as CSSProperties
      }
    >
      {/* gentle drift; pauses while the card is expanded */}
      <div
        className="card-sway absolute inset-0"
        style={
          {
            "--sway-d": `${6.4 + (index % 3) * 0.9}s`,
            "--sway-delay": `${1.4 + index * 0.35}s`,
          } as CSSProperties
        }
      >
        {/* the card expands in place on hover/focus (princess cardx mechanics) */}
        <div className="cardx absolute left-1/2 top-0 w-[130px] -translate-x-1/2 overflow-hidden rounded-[14px] border bg-[var(--surface)] p-1.5 shadow-[0_12px_28px_-16px_rgba(8,17,31,0.6)] [border-color:var(--border)]">
          {/* portrait: clean two-tone themed gradient + performer cutout */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "var(--portrait)" }}
            />
            {cut ? (
              <img
                src={cut}
                alt={`${c.name} — ${c.gown}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_6px_10px_rgba(8,17,31,0.45)]"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center">
                <Shield className="h-8 w-8 text-white/85" aria-hidden />
              </span>
            )}
            <span className="pointer-events-none absolute left-1 top-1 h-3.5 w-3.5 rounded-tl-[8px] border-l-2 border-t-2 transition-colors duration-300 [border-color:var(--corner-a)] group-hover/card:[border-color:var(--corner-a-on)]" />
            <span className="pointer-events-none absolute bottom-1 right-1 h-3.5 w-3.5 rounded-br-[8px] border-b-2 border-r-2 transition-colors duration-300 [border-color:var(--corner-b)] group-hover/card:[border-color:var(--corner-b-on)]" />
          </div>

          <p className="mt-1.5 px-0.5 text-center font-display text-[0.84rem] font-bold leading-tight [color:var(--name)]">
            {c.name}
          </p>

          {/* revealed as the card grows */}
          <div className="cardx-extra px-0.5 text-center">
            <p className="t-engrave mt-0.5 text-[0.46rem] tracking-[0.14em] [color:var(--label)]">
              {c.gown}
            </p>
            <ul className="mt-1.5 flex flex-wrap justify-center gap-1">
              {c.highlights.slice(0, 3).map((h) => (
                <li
                  key={h}
                  className="rounded-full px-1.5 py-0.5 text-[0.5rem] font-semibold [background:var(--chip-bg)] [color:var(--chip-text)]"
                >
                  {h}
                </li>
              ))}
            </ul>
            <Link
              to="/hero-events"
              search={{ hero: c.name }}
              hash="book"
              className="mb-0.5 mt-2 inline-flex w-full items-center justify-center gap-1 rounded-[var(--radius-pill)] px-2.5 py-1.5 text-[0.62rem] font-bold transition-colors bg-[var(--cta-bg)] [color:var(--cta-text)] hover:bg-[var(--cta-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cta-bg)]"
            >
              <Sparkles className="h-2.5 w-2.5" aria-hidden />
              Invite This Hero
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
