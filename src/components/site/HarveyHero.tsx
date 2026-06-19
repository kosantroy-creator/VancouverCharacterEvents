import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronDown, Leaf } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

/**
 * HarveyHero — Chapter Three, "The Jurassic Expedition".
 *
 * The flagship dinosaur hero. The whole idea is to WITHHOLD THE REVEAL: Harvey
 * is mostly hidden in a sunlit golden-hour PNW forest and all you catch is his
 * amber eye watching through a gap in the ferns, plus one slow blink. The feeling
 * is wonder and anticipation — awe, not threat. It's a sibling of the Princess
 * Kingdom and Hero Headquarters heroes: light, warm, storybook, gold-accented.
 *
 * The scene is built entirely from CSS + SVG so it works with no video. Motion is
 * gated behind the `.harvey-anim` class (added only when motion is allowed) and
 * the global reduced-motion guard, so reduced-motion users get the full scene
 * composed and STILL. See the "JURASSIC EXPEDITION" block in styles.css.
 *
 * VIDEO: set HARVEY_VIDEO_SRC to a muted, looping clip (Higgsfield/Kling) and the
 * component fades the video in behind the ferns and fades the coded eye/mass out.
 */

/** When set, a looping background clip replaces the coded eye/mass. */
const HARVEY_VIDEO_SRC = "";

type Vars = CSSProperties & Record<string, string | number>;

/* A single fern frond, drawn as an SVG leaf with programmatically-placed pinnae
   so every frond varies a little. Anchored at the bottom of its viewBox.
   Exported so the gate hero's seam foliage reuses the same fern. */
export function Frond({
  fill,
  className,
  style,
}: {
  fill: string;
  className?: string;
  style?: Vars;
}) {
  const N = 15;
  const pinnae: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1); // 0 = base, 1 = tip
    const y = 250 - t * 240;
    const x = 60 + Math.sin(t * Math.PI) * 6; // gentle rachis curve
    const len = 46 * (1 - t * 0.82) + 5;
    const ang = 30 + t * 18; // pinnae sweep upward toward the tip
    const ry = Math.max(2.3, 5.2 * (1 - t * 0.7));
    pinnae.push(
      <g key={`l${i}`} transform={`rotate(${-ang} ${x} ${y})`}>
        <ellipse cx={x - len / 2} cy={y} rx={len / 2} ry={ry} fill={fill} />
      </g>,
      <g key={`r${i}`} transform={`rotate(${ang} ${x} ${y})`}>
        <ellipse cx={x + len / 2} cy={y} rx={len / 2} ry={ry} fill={fill} />
      </g>,
    );
  }
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      style={style}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <path
        d="M60 258 C 56 198 60 116 66 8"
        stroke={fill}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      {pinnae}
    </svg>
  );
}

/* Fern placement — explicit configs (deterministic, so SSR and client match)
   that read as natural variation. Mid ferns sit behind; foreground ferns are
   larger, darker and closest to the camera (largest parallax), with two crossing
   in front of the eye (~58%). */
type FernCfg = {
  left: string;
  bottom: string;
  w: number;
  rot: number;
  fill: string;
  op: number;
  d: number; // sway duration (s)
  delay: number; // sway delay (s)
  dx: number; // parallax depth x (px)
  dy: number; // parallax depth y (px)
  z: number;
};

const MID_FERNS: FernCfg[] = [
  {
    left: "2%",
    bottom: "-6%",
    w: 220,
    rot: -16,
    fill: "var(--hv-fern)",
    op: 0.9,
    d: 8.6,
    delay: 0.3,
    dx: 13,
    dy: 6,
    z: 1,
  },
  {
    left: "16%",
    bottom: "-9%",
    w: 168,
    rot: 9,
    fill: "var(--hv-fern)",
    op: 0.78,
    d: 9.4,
    delay: 1.1,
    dx: 15,
    dy: 7,
    z: 1,
  },
  {
    left: "38%",
    bottom: "-10%",
    w: 150,
    rot: -7,
    fill: "#5C8A4E",
    op: 0.7,
    d: 10.2,
    delay: 0.7,
    dx: 16,
    dy: 7,
    z: 1,
  },
  {
    left: "78%",
    bottom: "-8%",
    w: 196,
    rot: 13,
    fill: "var(--hv-fern)",
    op: 0.86,
    d: 8.9,
    delay: 0.5,
    dx: 14,
    dy: 6,
    z: 1,
  },
  {
    left: "90%",
    bottom: "-10%",
    w: 168,
    rot: -10,
    fill: "#5C8A4E",
    op: 0.72,
    d: 9.8,
    delay: 1.4,
    dx: 16,
    dy: 7,
    z: 1,
  },
];

const FORE_FERNS: FernCfg[] = [
  {
    left: "-6%",
    bottom: "-14%",
    w: 360,
    rot: -10,
    fill: "var(--hv-cedar)",
    op: 0.97,
    d: 7.6,
    delay: 0,
    dx: 30,
    dy: 14,
    z: 3,
  },
  {
    left: "12%",
    bottom: "-16%",
    w: 300,
    rot: 8,
    fill: "var(--hv-cedar-deep)",
    op: 0.95,
    d: 8.2,
    delay: 0.9,
    dx: 32,
    dy: 15,
    z: 3,
  },
  {
    left: "50%",
    bottom: "-15%",
    w: 318,
    rot: 12,
    fill: "var(--hv-cedar)",
    op: 0.9,
    d: 7.9,
    delay: 0.5,
    dx: 34,
    dy: 16,
    z: 4,
  },
  {
    left: "66%",
    bottom: "-17%",
    w: 360,
    rot: -9,
    fill: "var(--hv-cedar-deep)",
    op: 0.95,
    d: 7.2,
    delay: 1.2,
    dx: 36,
    dy: 17,
    z: 4,
  },
  {
    left: "86%",
    bottom: "-14%",
    w: 330,
    rot: 10,
    fill: "var(--hv-cedar)",
    op: 0.96,
    d: 8.5,
    delay: 0.3,
    dx: 31,
    dy: 15,
    z: 3,
  },
];

/* Drifting pollen motes (deterministic). */
const POLLEN = [
  { left: "20%", bottom: "26%", s: 5, d: 17, delay: 0, x: 22 },
  { left: "34%", bottom: "16%", s: 4, d: 21, delay: 3, x: -16 },
  { left: "48%", bottom: "34%", s: 6, d: 15, delay: 1.5, x: 28 },
  { left: "60%", bottom: "20%", s: 4, d: 19, delay: 4.5, x: -20 },
  { left: "72%", bottom: "30%", s: 5, d: 16, delay: 2.4, x: 18 },
  { left: "84%", bottom: "22%", s: 4, d: 22, delay: 5.5, x: -24 },
  { left: "10%", bottom: "34%", s: 5, d: 18, delay: 6, x: 20 },
];

/* Canopy fronds overhanging from the top edge (rotated ~180° to droop down) —
   they frame the clearing and thicken the jungle. */
const CANOPY = [
  {
    left: "-6%",
    top: "-15%",
    w: 330,
    rot: 165,
    fill: "var(--hv-cedar)",
    op: 0.92,
    d: 9.5,
    delay: 0.2,
  },
  {
    left: "8%",
    top: "-19%",
    w: 250,
    rot: 198,
    fill: "var(--hv-cedar-deep)",
    op: 0.82,
    d: 10.6,
    delay: 1.1,
  },
  {
    left: "70%",
    top: "-17%",
    w: 300,
    rot: 196,
    fill: "var(--hv-cedar)",
    op: 0.88,
    d: 9.1,
    delay: 0.6,
  },
  {
    left: "90%",
    top: "-14%",
    w: 270,
    rot: 163,
    fill: "var(--hv-cedar-deep)",
    op: 0.86,
    d: 10.1,
    delay: 1.5,
  },
];

/* Soft undergrowth bushes that fill the gaps between fern clusters. */
const BUSHES = [
  { left: "-4%", bottom: "-4%", w: 320, h: 160, c: "#4C7639", op: 0.55 },
  { left: "20%", bottom: "-6%", w: 260, h: 130, c: "#3F6330", op: 0.5 },
  { left: "42%", bottom: "-7%", w: 300, h: 140, c: "#46703A", op: 0.46 },
  { left: "62%", bottom: "-6%", w: 270, h: 132, c: "#3C5E2D", op: 0.5 },
  { left: "82%", bottom: "-5%", w: 320, h: 160, c: "#4C7639", op: 0.55 },
];

const HEADLINE = ["Something", "ancient", "is", "watching…"];

export function HarveyHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const hasVideo = HARVEY_VIDEO_SRC.length > 0;

  // Orchestrated entrance: when motion is allowed, flip `is-ready` one frame
  // after mount so the CSS intro transitions run. When reduced, render the
  // final, still composed scene immediately (no `.harvey-anim`).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Pointer + device-tilt parallax → writes --px / --py in [-1, 1] on the root.
  // rAF-throttled, passive, transform-only. Skipped entirely when motion is reduced.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const clamp = (n: number) => (n < -1 ? -1 : n > 1 ? 1 : n);
    const apply = () => {
      raf = 0;
      root.style.setProperty("--px", px.toFixed(3));
      root.style.setProperty("--py", py.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      px = clamp(((e.clientX - r.left) / r.width - 0.5) * 2);
      py = clamp(((e.clientY - r.top) / r.height - 0.5) * 2);
      schedule();
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      px = clamp(e.gamma / 28); // left-right
      py = clamp((e.beta - 42) / 28); // front-back, neutral ~hand-held
      schedule();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Deep in the prehistoric valley — something ancient is watching"
      className={cn(
        "harvey-hero relative isolate flex min-h-[92svh] w-full items-center overflow-hidden",
        !reduced && "harvey-anim",
        ready && "is-ready",
        hasVideo && "has-video",
      )}
      style={{
        background:
          "linear-gradient(177deg, #B7D08F 0%, #A7C57E 13%, #93B86C 40%, #7FA85B 64%, #6C9449 85%, #5E8240 100%)",
      }}
    >
      {/* Top seam — a whisper of green-gold haze so the credentials bridge above
          melts into the scene (the bridge already settles to this moss green). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24"
        style={{
          background:
            "linear-gradient(180deg, #B7D08F 0%, rgba(183,208,143,0.3) 50%, transparent 100%)",
        }}
      />
      {/* ================= SCENE — pushes in together once on load ================= */}
      <div className="hv-stage pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm sun glow, top-centre */}
        <div
          aria-hidden
          className="hv-fade absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 44% at 50% -2%, rgba(255,243,201,0.95) 0%, rgba(255,236,176,0.45) 38%, transparent 72%)",
          }}
        />
        {/* Subtle god rays fanning from the sun */}
        <div
          aria-hidden
          className="hv-rays absolute -top-[10%] left-1/2 h-[80%] w-[150%] -translate-x-1/2"
          style={
            {
              background:
                "repeating-conic-gradient(from 198deg at 50% 0%, rgba(255,246,206,0) 0deg, rgba(255,246,206,0.16) 1.6deg, rgba(255,246,206,0) 4.4deg)",
              WebkitMaskImage: "radial-gradient(72% 82% at 50% 0%, #000 0%, transparent 72%)",
              maskImage: "radial-gradient(72% 82% at 50% 0%, #000 0%, transparent 72%)",
            } as Vars
          }
        />

        {/* Hazy distant tree silhouettes near the horizon */}
        <svg
          aria-hidden
          viewBox="0 0 1440 360"
          preserveAspectRatio="xMidYMax slice"
          className="hv-fade absolute inset-x-0 bottom-[26%] h-[34%] w-full"
          style={{ opacity: 0.36, filter: "blur(2px)" } as Vars}
        >
          <g fill="#8FB173">
            {Array.from({ length: 22 }).map((_, i) => {
              const x = i * 70 - 20;
              const h = 150 + ((i * 53) % 120);
              const w = 46 + ((i * 31) % 26);
              return (
                <path
                  key={i}
                  d={`M${x} 360 L${x} ${360 - h} Q${x + w / 2} ${360 - h - 40} ${x + w} ${360 - h} L${x + w} 360 Z`}
                />
              );
            })}
          </g>
        </svg>

        {/* Drifting cream mist */}
        <div
          aria-hidden
          className="hv-mist-band hv-fade absolute inset-x-[-10%] bottom-[30%] h-[24%]"
          style={{
            background:
              "radial-gradient(60% 100% at 30% 50%, rgba(252,247,232,0.8), transparent 70%), radial-gradient(50% 90% at 72% 60%, rgba(250,244,222,0.7), transparent 72%)",
            filter: "blur(14px)",
          }}
        />
        <div
          aria-hidden
          className="hv-mist-band hv-fade absolute inset-x-[-10%] bottom-[14%] h-[20%]"
          style={
            {
              "--mist-d": "38s",
              background:
                "radial-gradient(55% 100% at 60% 50%, rgba(252,247,232,0.7), transparent 72%)",
              filter: "blur(18px)",
            } as Vars
          }
        />

        {/* HARVEY — a soft dark-green mass (never a hard black silhouette) */}
        <div
          aria-hidden
          className="hv-coded hv-fade absolute"
          style={
            {
              left: "40%",
              top: "6%",
              width: "min(64vw, 620px)",
              height: "min(74vw, 560px)",
              background:
                "radial-gradient(50% 52% at 52% 48%, rgba(28,46,33,0.92) 0%, rgba(34,56,40,0.78) 38%, rgba(46,74,56,0.36) 62%, transparent 78%)",
              filter: "blur(6px)",
            } as Vars
          }
        />
        {/* a softer brow shadow seating the eye into the bulk */}
        <div
          aria-hidden
          className="hv-coded hv-fade absolute"
          style={
            {
              left: "52%",
              top: "24%",
              width: "min(34vw, 330px)",
              height: "120px",
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(15,28,20,0.6), transparent 72%)",
              filter: "blur(8px)",
            } as Vars
          }
        />

        {/* Optional looping clip — behind the ferns, over Harvey's form */}
        {hasVideo ? (
          <video
            className="hv-video absolute"
            style={
              {
                left: "44%",
                top: "12%",
                width: "min(56vw, 560px)",
                height: "min(60vw, 460px)",
                objectFit: "cover",
                borderRadius: "40% 40% 46% 46%",
                filter: "saturate(1.02)",
              } as Vars
            }
            src={HARVEY_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}

        {/* THE AMBER EYE — focal point, watching through the gap */}
        <div
          aria-hidden
          className="hv-par hv-coded hv-fade absolute"
          style={
            {
              "--dx": "13px",
              "--dy": "9px",
              left: "53%",
              top: "29%",
              width: "min(40vw, 320px)",
              zIndex: 4,
            } as Vars
          }
        >
          {/* Soft amber glow behind the eye. A blurred radial (NOT an SVG
              ellipse — that clips to the viewBox and leaves a hard rectangle)
              so the warmth melts into the jungle around the eye. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-[42%] -inset-y-[72%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(217,154,50,0.5) 0%, rgba(217,154,50,0.15) 46%, transparent 76%)",
              filter: "blur(14px)",
            }}
          />
          <svg viewBox="0 0 220 140" className="relative h-auto w-full" aria-hidden="true">
            <defs>
              <radialGradient id="hvIris" cx="42%" cy="36%" r="70%">
                <stop offset="0%" stopColor="#FCE39A" />
                <stop offset="32%" stopColor="var(--hv-gold)" />
                <stop offset="68%" stopColor="var(--hv-amber)" />
                <stop offset="100%" stopColor="#7A4E12" />
              </radialGradient>
              <clipPath id="hvLid">
                <path d="M8 70 Q110 6 212 70 Q110 134 8 70 Z" />
              </clipPath>
            </defs>

            {/* the wet socket the eye sits in */}
            <path d="M8 70 Q110 6 212 70 Q110 134 8 70 Z" fill="#16271C" />

            <g clipPath="url(#hvLid)">
              {/* iris + pupil roll dramatically toward the cursor (the eye is
                  the one thing that moves; the rest of the scene holds still) */}
              <g className="hv-par" style={{ "--dx": "34px", "--dy": "22px" } as Vars}>
                <circle cx="110" cy="70" r="58" fill="url(#hvIris)" />
                <ellipse cx="110" cy="70" rx="10" ry="48" fill="#0E140C" />
                <circle cx="91" cy="47" r="9" fill="#FFFDF2" opacity="0.92" />
                <circle cx="128" cy="88" r="4" fill="#FFF6DE" opacity="0.6" />
              </g>
              {/* eyelid — skin-coloured, rests OPEN (above), drops to blink */}
              <rect
                className="hv-eyelid"
                x="0"
                y="0"
                width="220"
                height="140"
                fill="#243B2C"
                style={{ transform: "translateY(-102%)" }}
              />
            </g>

            {/* lid lines seat the eye into Harvey's skin */}
            <path
              d="M8 70 Q110 6 212 70"
              stroke="#0F1D15"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M8 70 Q110 134 212 70"
              stroke="#12241A"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Sunlit dirt trail + the first T-Rex footprint, dotted tail off-screen */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[24%]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(138,90,60,0.16) 36%, rgba(120,78,50,0.42) 100%)",
          }}
        />
        <div className="absolute bottom-[3%] left-[42%] w-[clamp(64px,8vw,108px)]">
          <div className="relative">
            {/* dust puff */}
            <span
              className="hv-dust absolute left-1/2 top-1/2 -z-10 h-[140%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(170,120,80,0.5), transparent 70%)",
                opacity: 0,
              }}
              aria-hidden
            />
            {/* 3-toed print, pressed into the dirt */}
            <svg viewBox="0 0 80 104" className="hv-print h-auto w-full" aria-hidden="true">
              <g fill="rgba(74,48,30,0.62)">
                <ellipse cx="40" cy="74" rx="20" ry="24" />
                <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
                <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
                <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
              </g>
            </svg>
            {/* dotted trail tail dropping off the bottom edge */}
            <div
              className="absolute left-1/2 top-full -translate-x-1/2"
              aria-hidden
              style={{ width: "60%" }}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="mx-auto mt-3 block rounded-full"
                  style={{
                    width: `${14 - i * 2}px`,
                    height: `${10 - i * 1.5}px`,
                    marginLeft: i % 2 ? "38%" : "8%",
                    background: "rgba(74,48,30,0.4)",
                    opacity: 1 - i * 0.22,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* UNDERGROWTH — soft bush masses behind the ferns for density */}
        {BUSHES.map((b, i) => (
          <div
            key={`bush${i}`}
            aria-hidden
            className="absolute"
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.w,
              height: b.h,
              zIndex: 1,
              borderRadius: "50%",
              background: `radial-gradient(closest-side, ${b.c} 0%, ${b.c} 42%, transparent 78%)`,
              opacity: b.op,
              filter: "blur(3px)",
            }}
          />
        ))}

        {/* MID FERNS (behind). Base lean lives on the wrapper so the sway
            animation on the frond doesn't overwrite it. */}
        {MID_FERNS.map((f, i) => (
          <div
            key={`mf${i}`}
            className="absolute"
            style={{
              left: f.left,
              bottom: f.bottom,
              width: f.w,
              zIndex: f.z,
              transform: `rotate(${f.rot}deg)`,
              transformOrigin: "bottom center",
            }}
          >
            <Frond
              className="hv-frond block h-auto w-full"
              fill={f.fill}
              style={
                { "--sway-d": `${f.d}s`, "--sway-delay": `${f.delay}s`, opacity: f.op } as Vars
              }
            />
          </div>
        ))}

        {/* POLLEN drifting in the light */}
        {POLLEN.map((p, i) => (
          <span
            key={`p${i}`}
            aria-hidden
            className="hv-pollen absolute rounded-full"
            style={
              {
                left: p.left,
                bottom: p.bottom,
                width: p.s,
                height: p.s,
                "--p-d": `${p.d}s`,
                "--p-delay": `${p.delay}s`,
                "--p-x": `${p.x}px`,
                background:
                  "radial-gradient(circle, rgba(255,247,214,0.95) 0%, rgba(212,160,23,0.5) 50%, transparent 72%)",
                zIndex: 2,
              } as Vars
            }
          />
        ))}

        {/* FOREGROUND FERNS (closest, two crossing the eye) */}
        {FORE_FERNS.map((f, i) => (
          <div
            key={`ff${i}`}
            className="absolute"
            style={{
              left: f.left,
              bottom: f.bottom,
              width: f.w,
              zIndex: f.z,
              transform: `rotate(${f.rot}deg)`,
              transformOrigin: "bottom center",
            }}
          >
            <Frond
              className="hv-frond block h-auto w-full"
              fill={f.fill}
              style={
                { "--sway-d": `${f.d}s`, "--sway-delay": `${f.delay}s`, opacity: f.op } as Vars
              }
            />
          </div>
        ))}

        {/* CANOPY — fronds overhanging from the top edge for jungle density */}
        {CANOPY.map((f, i) => (
          <div
            key={`cf${i}`}
            aria-hidden
            className="absolute"
            style={{
              left: f.left,
              top: f.top,
              width: f.w,
              zIndex: 2,
              transform: `rotate(${f.rot}deg)`,
              transformOrigin: "top center",
            }}
          >
            <Frond
              className="hv-frond block h-auto w-full"
              fill={f.fill}
              style={
                { "--sway-d": `${f.d}s`, "--sway-delay": `${f.delay}s`, opacity: f.op } as Vars
              }
            />
          </div>
        ))}
      </div>

      {/* Cream scrim behind the copy for legibility. Kept to the left so it backs
          the text without washing out the amber eye (~53%), which must read as the
          focal point on every screen size. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 64% at 17% 46%, rgba(251,243,223,0.96) 0%, rgba(251,243,223,0.58) 38%, transparent 68%)",
        }}
      />

      {/* ================= COPY ================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-28 sm:px-6 md:pt-32 lg:px-8">
        {/* Field-note eyebrow — the second beat of the expedition */}
        <div className="hv-rise mb-6 inline-flex flex-col" style={{ transitionDelay: "120ms" }}>
          <span className="t-engrave inline-flex items-center gap-2 text-[0.64rem] tracking-[0.32em] text-[var(--hv-gold-deep)]">
            <Leaf className="h-3 w-3 text-[var(--hv-fern)]" aria-hidden />
            Field Note 01 · Deep in the Valley
            <Leaf className="h-3 w-3 -scale-x-100 text-[var(--hv-fern)]" aria-hidden />
          </span>
          <span
            aria-hidden
            className="mt-2 h-px w-24"
            style={{ background: "linear-gradient(90deg, var(--hv-gold), transparent)" }}
          />
        </div>

        <div className="max-w-xl">
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1.04] text-[var(--hv-cedar-deep)]">
            {HEADLINE.map((word, i) => {
              const accent = word === "ancient";
              return (
                <Fragment key={i}>
                  <span
                    className={cn("hv-word", accent && "italic")}
                    style={{
                      transitionDelay: `${300 + i * 90}ms`,
                      color: accent ? "var(--hv-gold)" : undefined,
                    }}
                  >
                    {word}
                  </span>
                  {i < HEADLINE.length - 1 ? " " : ""}
                </Fragment>
              );
            })}
          </h1>

          <p
            className="hv-rise mt-5 max-w-lg text-[1.05rem] leading-relaxed text-[var(--hv-cedar)]/90"
            style={{ transitionDelay: "780ms" }}
          >
            Deep in the prehistoric valley, our mighty 13-foot T-Rex roams. Stay close to your
            trainers — and get ready for a thrilling encounter your guests will never forget.
          </p>

          <div className="hv-rise mt-8" style={{ transitionDelay: "900ms" }}>
            <CTAButton
              href="#meet-harvey"
              size="lg"
              className="group !bg-[var(--hv-gold)] !text-[#2A1C05] hover:!bg-[var(--hv-amber)] hover:!shadow-[0_0_30px_rgba(212,160,23,0.45)]"
            >
              Continue the Expedition
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hv-rise absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-1 text-[var(--hv-cedar)]/70"
        style={{ transitionDelay: "1320ms" }}
        aria-hidden
      >
        <span className="t-engrave text-[0.56rem] tracking-[0.3em]">Follow the trail</span>
        <ChevronDown className="bob-soft h-4 w-4" />
      </div>

      {/* base fade — settle the clearing floor to the trail beat's moss green so
          the eye section melts into it (covers the clipped foreground ferns; the
          footprints carry on into the trail beat below). No hard seam line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-44"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(94,130,64,0.85) 60%, #5E8240 88%)",
        }}
      />
    </section>
  );
}
