import type { CSSProperties } from "react";

/**
 * Scenery — the site's hand-built SVG decor library.
 *
 * Everything here is lightweight inline SVG (no image requests), aria-hidden,
 * and tinted via props so each storybook world can carry its own illustrated
 * scenery. This is the "art-directed", not "template", layer.
 */

type DivProps = { className?: string; style?: CSSProperties };

/* ---- Curved section divider — breaks the straight block edge ----------- */
export function Curve({
  position = "bottom",
  fill = "var(--ivory)",
  className,
  height = 70,
}: {
  position?: "top" | "bottom";
  fill?: string;
  className?: string;
  height?: number;
}) {
  // A gentle, asymmetric page-edge wave anchored to the section edge.
  const d =
    position === "bottom"
      ? "M0,80 L1440,80 L1440,40 C1120,-4 760,78 420,40 C250,22 110,28 0,40 Z"
      : "M0,0 L1440,0 L1440,40 C1120,84 760,2 420,40 C250,58 110,52 0,40 Z";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 block w-full ${
        position === "bottom" ? "bottom-0" : "top-0"
      } ${className ?? ""}`}
      style={{ height }}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

/* ---- Vancouver North Shore mountains — soft layered silhouette --------- */
export function Mountains({
  className,
  back = "color-mix(in oklab, var(--ink-700) 22%, transparent)",
  front = "color-mix(in oklab, var(--ink-800) 30%, transparent)",
  style,
}: DivProps & { back?: string; front?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={`pointer-events-none w-full ${className ?? ""}`}
      style={style}
    >
      <path
        d="M0,220 L0,120 L150,70 L300,130 L450,60 L620,140 L780,70 L960,150 L1120,80 L1290,140 L1440,90 L1440,220 Z"
        fill={back}
      />
      <path
        d="M0,220 L0,170 L180,120 L360,175 L540,110 L720,180 L900,120 L1080,185 L1260,130 L1440,180 L1440,220 Z"
        fill={front}
      />
    </svg>
  );
}

/* ---- A few placed, twinkling sparkles --------------------------------- */
const SPARKS = [
  { l: "12%", t: "26%", s: 10, d: 0 },
  { l: "82%", t: "20%", s: 8, d: 0.6 },
  { l: "68%", t: "62%", s: 12, d: 1.2 },
  { l: "28%", t: "70%", s: 7, d: 1.8 },
  { l: "48%", t: "16%", s: 9, d: 0.9 },
];
export function Sparkles({
  className,
  color = "var(--gold-400)",
  count = 5,
}: DivProps & { color?: string; count?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      {SPARKS.slice(0, count).map((s, i) => (
        <svg
          key={i}
          className="sparkle absolute"
          viewBox="0 0 24 24"
          style={{
            left: s.l,
            top: s.t,
            width: s.s,
            height: s.s,
            color,
            animationDelay: `${s.d}s`,
          }}
        >
          <path
            d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

/* ===========================================================================
   WORLD DECOR — one illustrated motif per chapter, tinted by the world theme.
   Each returns an absolutely-positioned, aria-hidden decorative layer.
   =========================================================================== */

type DecorKind =
  | "curtains"
  | "city"
  | "leaves"
  | "waves"
  | "confetti"
  | "holiday"
  | "skyline"
  | "stars"
  | "bazaar";

export function WorldDecor({
  kind,
  accent,
  secondary,
}: {
  kind: DecorKind;
  accent: string;
  secondary: string;
}) {
  switch (kind) {
    case "curtains":
      // Royal ballroom drapes sweeping in from the top corners.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
            <path
              d="M0,0 H170 C150,90 120,150 60,210 C20,150 6,80 0,0 Z"
              fill={accent}
              opacity="0.5"
            />
            <path
              d="M0,0 H110 C100,70 80,120 40,165 C16,120 6,70 0,0 Z"
              fill={secondary}
              opacity="0.55"
            />
            <path
              d="M600,0 H430 C450,90 480,150 540,210 C580,150 594,80 600,0 Z"
              fill={accent}
              opacity="0.5"
            />
            <path
              d="M600,0 H490 C500,70 520,120 560,165 C584,120 594,70 600,0 Z"
              fill={secondary}
              opacity="0.55"
            />
          </svg>
        </div>
      );
    case "city":
      // Heroic skyline + soft action rays from a high spotlight.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
            <g stroke={secondary} strokeWidth="2" opacity="0.25">
              <line x1="300" y1="0" x2="60" y2="400" />
              <line x1="300" y1="0" x2="200" y2="400" />
              <line x1="300" y1="0" x2="400" y2="400" />
              <line x1="300" y1="0" x2="540" y2="400" />
            </g>
            <g fill={accent} opacity="0.45">
              <rect x="20" y="280" width="60" height="120" />
              <rect x="95" y="230" width="48" height="170" />
              <rect x="160" y="300" width="40" height="100" />
              <rect x="420" y="250" width="52" height="150" />
              <rect x="486" y="300" width="40" height="100" />
              <rect x="540" y="270" width="50" height="130" />
            </g>
          </svg>
        </div>
      );
    case "leaves":
      // Prehistoric valley fronds with a warm sunbeam.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
            <g fill={accent} opacity="0.5">
              <path d="M0,0 C70,40 90,120 60,200 C30,120 6,60 0,0 Z" />
              <path d="M0,30 C90,60 130,140 120,230 C70,150 20,90 0,30 Z" opacity="0.7" />
            </g>
            <g fill={secondary} opacity="0.5">
              <path d="M600,10 C520,50 500,130 540,210 C575,130 596,70 600,10 Z" />
              <path d="M600,40 C500,70 470,150 500,240 C560,160 590,100 600,40 Z" opacity="0.7" />
            </g>
          </svg>
        </div>
      );
    case "waves":
      // Ocean cove — flowing wave bands + bubbles.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMax slice"
            className="h-full w-full"
          >
            <g className="wave-track" style={{ color: accent }}>
              <path
                d="M0,300 C150,260 300,340 600,300 C900,260 1050,340 1200,300 L1200,400 L0,400 Z"
                fill="currentColor"
                opacity="0.35"
              />
              <path
                d="M-1200,300 C-1050,260 -900,340 -600,300 C-300,260 -150,340 0,300 L0,400 L-1200,400 Z"
                fill="currentColor"
                opacity="0.35"
              />
            </g>
            <path
              d="M0,340 C200,310 400,360 700,335 C1000,312 1100,360 1200,340 L1200,400 L0,400 Z"
              fill={secondary}
              opacity="0.4"
            />
            <g fill="var(--star-white)" opacity="0.5">
              <circle cx="220" cy="250" r="5" />
              <circle cx="300" cy="210" r="3" />
              <circle cx="860" cy="240" r="6" />
              <circle cx="940" cy="200" r="3" />
            </g>
          </svg>
        </div>
      );
    case "confetti":
      // Cheerful community confetti.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" className="h-full w-full">
            <g opacity="0.7">
              <rect
                x="60"
                y="40"
                width="12"
                height="12"
                rx="2"
                fill={accent}
                transform="rotate(20 66 46)"
              />
              <rect
                x="180"
                y="80"
                width="10"
                height="10"
                rx="2"
                fill={secondary}
                transform="rotate(-15 185 85)"
              />
              <circle cx="320" cy="50" r="6" fill={accent} />
              <rect
                x="430"
                y="60"
                width="12"
                height="12"
                rx="2"
                fill={secondary}
                transform="rotate(30 436 66)"
              />
              <circle cx="520" cy="100" r="5" fill={accent} />
              <rect
                x="110"
                y="150"
                width="10"
                height="10"
                rx="2"
                fill={secondary}
                transform="rotate(40 115 155)"
              />
              <circle cx="500" cy="180" r="6" fill={accent} />
            </g>
          </svg>
        </div>
      );
    case "holiday":
      // Festive garland swag + drifting snow.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
            <path
              d="M-20,20 C120,90 220,90 300,55 C380,90 480,90 620,20"
              fill="none"
              stroke={accent}
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.5"
            />
            <g fill="var(--star-white)" opacity="0.8">
              <circle cx="120" cy="120" r="3" />
              <circle cx="260" cy="80" r="2.5" />
              <circle cx="380" cy="150" r="3" />
              <circle cx="500" cy="100" r="2.5" />
              <circle cx="200" cy="200" r="2.5" />
              <circle cx="440" cy="220" r="3" />
            </g>
            <g fill={secondary} opacity="0.7">
              <circle cx="80" cy="60" r="5" />
              <circle cx="300" cy="40" r="5" />
              <circle cx="520" cy="60" r="5" />
            </g>
          </svg>
        </div>
      );
    case "skyline":
      // Polished city-event skyline with stage lights.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 1200 360"
            preserveAspectRatio="xMidYMax slice"
            className="h-full w-full"
          >
            <g fill={accent} opacity="0.4">
              <rect x="40" y="180" width="70" height="180" />
              <rect x="130" y="120" width="54" height="240" />
              <rect x="200" y="210" width="46" height="150" />
              <rect x="900" y="150" width="60" height="210" />
              <rect x="980" y="200" width="48" height="160" />
              <rect x="1050" y="120" width="60" height="240" />
            </g>
            <g stroke={secondary} strokeWidth="2" opacity="0.3">
              <line x1="600" y1="20" x2="380" y2="200" />
              <line x1="600" y1="20" x2="820" y2="200" />
              <line x1="600" y1="20" x2="600" y2="220" />
            </g>
          </svg>
        </div>
      );
    case "bazaar": {
      // Enchanted night-market — a draped light string with hanging lanterns that
      // sway gently, plus a little drifting market sparkle.
      const lanterns = [
        { x: 92, y: 56, c: accent },
        { x: 200, y: 76, c: secondary },
        { x: 320, y: 60, c: accent },
        { x: 446, y: 80, c: secondary },
        { x: 540, y: 56, c: accent },
      ];
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
            {/* the draped light string the lanterns hang from */}
            <path
              d="M-20,16 C150,84 300,84 320,60 C340,84 470,90 620,20"
              fill="none"
              stroke={secondary}
              strokeWidth="2.5"
              opacity="0.5"
            />
            <g className="bazaar-lanterns">
              {lanterns.map((l, i) => (
                <g key={i} transform={`translate(${l.x} ${l.y})`}>
                  <line
                    x1="0"
                    y1="-6"
                    x2="0"
                    y2="6"
                    stroke={secondary}
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  <circle cx="0" cy="24" r="22" fill={l.c} opacity="0.16" />
                  <rect x="-9" y="6" width="18" height="26" rx="8" fill={l.c} opacity="0.7" />
                  <rect x="-6" y="3" width="12" height="5" rx="2" fill={secondary} opacity="0.85" />
                  <line
                    x1="0"
                    y1="32"
                    x2="0"
                    y2="39"
                    stroke={l.c}
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  <circle cx="0" cy="41" r="2" fill={secondary} opacity="0.85" />
                </g>
              ))}
            </g>
            {/* drifting market sparkle */}
            <g fill={accent} opacity="0.75">
              <path d="M150 200 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
              <path d="M470 210 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
            </g>
            <g fill={secondary} opacity="0.85">
              <path d="M300 230 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
              <path d="M225 150 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
            </g>
          </svg>
        </div>
      );
    }
    case "stars":
    default:
      // Specialty / theatre — moonlight, stars and a soft spotlight.
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 600 400" className="h-full w-full">
            <circle cx="500" cy="90" r="46" fill={secondary} opacity="0.45" />
            <circle cx="486" cy="80" r="40" fill="var(--ivory)" opacity="0.6" />
            <g fill={accent} opacity="0.8">
              <path d="M120 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" />
              <path d="M300 60 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
              <path d="M210 180 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
              <path d="M380 200 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
            </g>
          </svg>
        </div>
      );
  }
}
