import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  Crown,
  Heart,
  Map as MapIcon,
  Music,
  PawPrint,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { courtTraits, matchCharacters, type CourtTrait, type WorldCourt } from "@/lib/royal-court";
import { CARD_ART } from "./KingdomDoors";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

// Princess traits only — CourtTrait now also covers the hero court, so this is
// a Partial map and lookups fall back to Compass.
const TRAIT_ICONS: Partial<Record<CourtTrait, typeof Compass>> = {
  adventure: Compass,
  animals: PawPrint,
  music: Music,
  magic: Wand2,
  exploring: MapIcon,
  kindness: Heart,
};

/**
 * The Fairy Godmother herself — a hand-drawn, gently floating figure with a
 * twinkling wand. Pure SVG, themed to the page's periwinkle + gold.
 */
function GodmotherFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} role="img" aria-label="The Fairy Godmother">
      <defs>
        <linearGradient id="gmCloak" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#C3CFF4" />
          <stop offset="60%" stopColor="#9AABE6" />
          <stop offset="100%" stopColor="#7E92D8" />
        </linearGradient>
        <linearGradient id="gmHood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4DDF8" />
          <stop offset="100%" stopColor="#A6B5EA" />
        </linearGradient>
        <radialGradient id="gmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,232,160,0.9)" />
          <stop offset="100%" stopColor="rgba(255,232,160,0)" />
        </radialGradient>
      </defs>

      {/* wand sparkle trail */}
      <circle cx="186" cy="38" r="14" fill="url(#gmGlow)" className="wand-star" />
      <g className="wand-star" style={{ transformOrigin: "186px 38px" }}>
        <path
          d="M186 28 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6 Z"
          fill="#E9BE6A"
        />
      </g>
      <circle cx="170" cy="56" r="1.8" fill="#E9BE6A" className="sparkle" />
      <circle
        cx="196"
        cy="58"
        r="1.4"
        fill="#E9BE6A"
        className="sparkle"
        style={{ animationDelay: "1.3s" }}
      />
      <circle
        cx="178"
        cy="22"
        r="1.4"
        fill="#E9BE6A"
        className="sparkle"
        style={{ animationDelay: "2.2s" }}
      />

      {/* wand */}
      <line
        x1="156"
        y1="66"
        x2="184"
        y2="40"
        stroke="#B98A3C"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* raised arm */}
      <path
        d="M124 92 C138 84 150 74 157 66"
        stroke="url(#gmCloak)"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="157" cy="65" r="6" fill="#F2D2B8" />

      {/* cloak body */}
      <path
        d="M110 58 C84 74 66 106 58 162 C92 182 130 182 162 162 C152 106 136 74 110 58 Z"
        fill="url(#gmCloak)"
      />
      {/* cloak fold lines */}
      <path
        d="M96 92 C90 118 86 140 84 158"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M126 92 C132 118 136 140 138 158"
        stroke="rgba(70,82,140,0.3)"
        strokeWidth="2"
        fill="none"
      />

      {/* hood */}
      <path
        d="M110 26 C90 26 80 42 82 58 C90 70 130 70 138 58 C140 42 130 26 110 26 Z"
        fill="url(#gmHood)"
      />
      {/* face */}
      <circle cx="110" cy="50" r="14" fill="#F6D9C2" />
      {/* glasses */}
      <circle cx="104.5" cy="49" r="4.6" fill="none" stroke="#8A6320" strokeWidth="1.4" />
      <circle cx="116.5" cy="49" r="4.6" fill="none" stroke="#8A6320" strokeWidth="1.4" />
      <line x1="109" y1="49" x2="112" y2="49" stroke="#8A6320" strokeWidth="1.4" />
      {/* smile + blush */}
      <path
        d="M105 58 C108 61 113 61 116 58"
        stroke="#C2186A"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="100" cy="55" r="2" fill="rgba(229,154,192,0.55)" />
      <circle cx="121" cy="55" r="2" fill="rgba(229,154,192,0.55)" />
      {/* hair wisp */}
      <path
        d="M97 40 C100 35 106 32 112 32"
        stroke="#EDEFF8"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* gold clasp + trim */}
      <circle cx="110" cy="74" r="3.4" fill="#CFA862" />
      <path
        d="M76 150 C100 164 122 164 146 150"
        stroke="rgba(207,168,98,0.65)"
        strokeWidth="2.4"
        fill="none"
      />

      {/* left arm resting */}
      <path
        d="M96 92 C86 102 80 114 78 126"
        stroke="url(#gmCloak)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * FairyGodmother — a tiny, personal matchmaker for overwhelmed parents.
 * One delightful question → three recommended royal guests. Pure client
 * state, no backend, reusable for any world that defines a WorldCourt.
 */
export function FairyGodmother({ court }: { court: WorldCourt }) {
  const [loves, setLoves] = useState<CourtTrait[]>([]);
  const [revealed, setRevealed] = useState(false);
  // bumped on every trait ADD — re-keys the one-shot sparkle on the chosen chip.
  const [selToken, setSelToken] = useState(0);
  const armed = loves.length > 0;
  const matches = useMemo(
    () => (revealed ? matchCharacters(court, loves) : []),
    [court, loves, revealed],
  );

  const toggle = (t: CourtTrait) => {
    setRevealed(false);
    setLoves((prev) => {
      if (prev.includes(t)) return prev.filter((x) => x !== t);
      const next = prev.length >= 2 ? [prev[1], t] : [...prev, t];
      return next;
    });
    if (!loves.includes(t)) setSelToken((n) => n + 1);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[var(--radius-2xl)] border border-gold-500/30 bg-[rgba(255,252,246,0.9)] p-6 shadow-[var(--shadow-lg)] sm:p-9">
        {/* Herself — wand at the ready */}
        <div className="mb-2 flex justify-center">
          <GodmotherFigure className="godmother h-36 w-36 sm:h-44 sm:w-44" />
        </div>
        <p className="text-center font-display text-lg italic text-fg-2">
          &ldquo;Hello, dear! One little question and I&apos;ll find your perfect princess.&rdquo;
        </p>

        {/* The question */}
        <fieldset className="mt-6">
          <legend className="t-display block w-full pt-2 text-center text-2xl text-fg sm:text-3xl">
            What does your child love?
          </legend>
          <p className="mt-2 text-center text-sm text-fg-2">
            Choose up to two — the Fairy Godmother will do the rest.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {courtTraits.map(({ id, label }) => {
              const Icon = TRAIT_ICONS[id] ?? Compass;
              const active = loves.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(id)}
                  className={cn(
                    "fg-chip relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-pill)] border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                    active
                      ? "is-on border-gold-500 text-[var(--pp-magenta-deep)]"
                      : "border-border-strong bg-cream-50 text-fg-2 hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-fg hover:shadow-[0_10px_22px_-14px_rgba(207,168,98,0.6)]",
                  )}
                >
                  <Icon
                    className={cn("h-4 w-4", active ? "text-gold-600" : "text-fg-3")}
                    aria-hidden
                  />
                  {label}
                  {active ? (
                    <Sparkles className="h-3.5 w-3.5 text-[var(--pp-magenta)]" aria-hidden />
                  ) : null}
                  {active ? (
                    <span key={`fg-${selToken}`} aria-hidden className="fg-sparkle">
                      <span className="fg-sparkle-burst" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton
            onClick={() => {
              if (loves.length) setRevealed(true);
            }}
            size="lg"
            className={cn(armed ? "fg-armed" : "pointer-events-none opacity-50")}
          >
            <Wand2 className="h-4 w-4" aria-hidden />
            Reveal My Matches
          </CTAButton>
          {revealed ? (
            <button
              type="button"
              onClick={() => {
                setLoves([]);
                setRevealed(false);
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-2 underline-offset-4 transition-colors hover:text-fg-gold hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
            </button>
          ) : null}
        </div>

        {/* The matches */}
        {revealed && matches.length ? (
          <div className="mt-8 border-t border-gold-500/25 pt-7">
            <p className="flex items-center justify-center gap-2 text-center font-display text-xl text-[var(--pp-magenta-deep)]">
              <Sparkles className="h-5 w-5 text-gold-500" aria-hidden /> Royal Match Found!
            </p>
            <p className="mt-1.5 text-center font-display text-base italic text-fg-2">
              &ldquo;Bibbidi done! These royal guests can&apos;t wait to meet your little
              one.&rdquo;
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {matches.map((m, i) => (
                <Reveal key={m.id} delay={i * 110} y={16}>
                  <div
                    className="flex h-full flex-col rounded-[var(--radius-lg)] border bg-surface p-4 text-center shadow-[var(--shadow-sm)]"
                    style={{
                      borderColor: `color-mix(in oklab, ${m.door.accent} 60%, transparent)`,
                    }}
                  >
                    {m.photo || CARD_ART[m.id] ? (
                      <img
                        src={m.photo ?? CARD_ART[m.id]}
                        alt={`${m.name} — royal guest`}
                        loading="lazy"
                        className="mx-auto h-20 w-20 rounded-full object-cover object-top"
                        style={{ outline: `2px solid ${m.door.accent}`, outlineOffset: "3px" }}
                      />
                    ) : (
                      <span
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                        style={{
                          background: `color-mix(in oklab, ${m.door.accent} 22%, var(--cream-100))`,
                          outline: `2px solid ${m.door.accent}`,
                          outlineOffset: "3px",
                        }}
                      >
                        <Crown className="h-7 w-7" style={{ color: m.door.accent }} aria-hidden />
                      </span>
                    )}
                    <h3 className="t-display mt-3 text-xl text-fg">{m.name}</h3>
                    <p className="mt-0.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-fg-3">
                      {m.door.name}
                    </p>
                    <p className="mt-2 flex-1 text-[0.83rem] italic leading-snug text-fg-2">
                      &ldquo;{m.welcome}&rdquo;
                    </p>
                    <Link
                      to="/contact"
                      search={{ guest: m.name, world: court.worldSlug }}
                      className="mt-4 inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-gold-500/60 px-4 py-2 text-[0.8rem] font-semibold text-fg transition-colors hover:bg-gold-500/10 hover:text-fg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                    >
                      Request {m.name.split(" ")[0]}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
