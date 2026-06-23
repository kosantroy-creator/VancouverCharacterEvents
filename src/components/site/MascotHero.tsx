import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Cake,
  Camera,
  ChevronDown,
  Flower2,
  Music,
  PawPrint,
  Play,
  School,
  Sparkles,
  Store,
  Tent,
  X,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/mascot/mascot-hero.webp";

/**
 * MascotHero — Section 1 of the Mascot Meadows page: "The Meadow Parade". The
 * selected meadow-festival photo plays full-bleed; the copy sits on the left
 * directly over a soft cream wash — the same wordmark → tagline → body → reel →
 * CTAs → trust-row composition as the Hero Headquarters hero (no glass panel).
 * A "Vancouver / Mascot Meadows / Events" lockup, a display line, a "Watch Us In
 * Action" reel (fullscreen video), two CTAs and a trust row. Ambient confetti /
 * petal drift, sparkles near the arch and a warm upper-left sunlight glow add
 * life (motion-gated), and a rolling meadow-grass shape flows the hero into the
 * section below. Brand-safe (generic mascots only). Reduced-motion safe — the
 * drifting decor only renders when motion is allowed. See "MASCOT MEADOWS HERO"
 * in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

/** Fullscreen "Watch Us In Action" reel source — drop the file in to enable. */
const REEL_SRC = "/video/mascot-meadows.mp4";

const TRUST = [
  { icon: Cake, label: "Birthday Mascots" },
  { icon: School, label: "School & Daycare Visits" },
  { icon: Store, label: "Mall Events" },
  { icon: Tent, label: "Festival Appearances" },
  { icon: Music, label: "Dancing & Games" },
  { icon: Camera, label: "Photo Moments" },
] as const;

/* Deterministic drifting confetti + petals (identical on server & client). */
const DRIFT = [
  { left: "6%", s: 11, delay: "0s", dur: "15s", dx: "16px", rot: "120deg", c: "#FFD25A", k: "c" },
  { left: "15%", s: 8, delay: "3.4s", dur: "18s", dx: "-12px", rot: "200deg", c: "#5BB7E6", k: "p" },
  { left: "23%", s: 13, delay: "1.6s", dur: "16s", dx: "20px", rot: "80deg", c: "#F4977E", k: "c" },
  { left: "31%", s: 9, delay: "5.2s", dur: "19s", dx: "-15px", rot: "260deg", c: "#7CC86A", k: "p" },
  { left: "40%", s: 10, delay: "2.3s", dur: "17s", dx: "14px", rot: "150deg", c: "#F2B4CC", k: "c" },
  { left: "58%", s: 12, delay: "4.1s", dur: "16.5s", dx: "-18px", rot: "300deg", c: "#FFD25A", k: "p" },
  { left: "68%", s: 8, delay: "1s", dur: "18.5s", dx: "13px", rot: "60deg", c: "#5BB7E6", k: "c" },
  { left: "78%", s: 11, delay: "6s", dur: "15.5s", dx: "-16px", rot: "220deg", c: "#7CC86A", k: "p" },
  { left: "88%", s: 9, delay: "2.8s", dur: "19.5s", dx: "17px", rot: "110deg", c: "#F4977E", k: "c" },
] as const;

const SPARKS = [
  { left: "63%", top: "26%", s: 12, delay: "0.4s" },
  { left: "82%", top: "18%", s: 9, delay: "1.6s" },
  { left: "74%", top: "40%", s: 14, delay: "2.6s" },
  { left: "90%", top: "34%", s: 10, delay: "0.9s" },
  { left: "69%", top: "12%", s: 8, delay: "3.2s" },
] as const;

export function MascotHero() {
  const { isCinema, setCinema } = useCinema();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionOK(true);
  }, []);

  // Drive playback off the cinema flag — try with sound, fall back to muted.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isCinema) {
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        void v.play().catch(() => undefined);
      });
    } else {
      v.pause();
    }
  }, [isCinema]);

  // Escape leaves the reel.
  useEffect(() => {
    if (!isCinema) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCinema(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCinema, setCinema]);

  return (
    <section
      aria-label="Mascot Meadows — bright mascot celebrations"
      className="mhr relative isolate flex min-h-[88svh] items-center overflow-hidden"
    >
      {/* selected meadow-festival photo — full-bleed background */}
      <img
        src={heroImg}
        alt="A bright sunny meadow festival entrance with a flower-covered archway and a wooden Mascot Meadows sign, balloons, colourful bunting, a winding path lined with flowers, and friendly costumed character mascots greeting children."
        className="mhr-img absolute inset-0 -z-30 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* soft cream washes keep the left copy readable over the bright art */}
      <div aria-hidden className="mhr-wash absolute inset-0 -z-20" />
      <div aria-hidden className="mhr-wash-top absolute inset-x-0 top-0 -z-20 h-44" />
      <div aria-hidden className="mhr-wash-mobile absolute inset-0 -z-20 sm:hidden" />

      {/* warm upper-left sunlight glow */}
      <span aria-hidden className={`mhr-sun absolute -z-10 ${motionOK ? "is-live" : ""}`} />

      {/* ambient drift — confetti, petals + arch sparkles (motion only) */}
      {motionOK ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-500",
            isCinema && "opacity-0",
          )}
        >
          {DRIFT.map((d, i) => (
            <span
              key={`d${i}`}
              className={d.k === "p" ? "mhr-petal" : "mhr-confetti"}
              style={
                {
                  left: d.left,
                  width: d.s,
                  height: d.s,
                  animationDelay: d.delay,
                  animationDuration: d.dur,
                  "--dx": d.dx,
                  "--rot": d.rot,
                  "--c": d.c,
                } as Vars
              }
            />
          ))}
          {SPARKS.map((s, i) => (
            <span
              key={`s${i}`}
              className="mhr-spark"
              style={{ left: s.left, top: s.top, width: s.s, height: s.s, animationDelay: s.delay }}
            />
          ))}
        </div>
      ) : null}

      {/* ===================== COPY (left) ===================== */}
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1240px] px-5 py-20 transition-all duration-500 ease-[var(--ease-out)] sm:px-6 lg:px-8 lg:py-24",
          isCinema && "pointer-events-none -translate-y-6 opacity-0",
        )}
      >
        <div className="max-w-xl">
          {/* Vancouver Mascot Meadows Events — ornate wordmark (Hero-HQ style) */}
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <h1 className="sr-only">Vancouver Mascot Meadows Events</h1>
              <span aria-hidden className="inline-flex items-center gap-2">
                <PawPrint className="h-5 w-5 shrink-0 text-[var(--m-gold)]" aria-hidden />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.65rem)] tracking-[0.2em] text-[var(--m-green-deep)]">
                  Vancouver
                </span>
              </span>
              <span aria-hidden className="mhr-script t-script-hero mt-1 block text-[clamp(2.2rem,6.4vw,4rem)]">
                Mascot Meadows
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[var(--m-green-deep)]"
              >
                <Flower2 className="h-3 w-3 text-[var(--m-green)]" aria-hidden />
                Events
                <Flower2 className="h-3 w-3 -scale-x-100 text-[var(--m-green)]" aria-hidden />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{ background: "linear-gradient(90deg, var(--m-green), var(--m-gold) 55%, transparent)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={200} y={16}>
            <p className="t-display mt-3 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug text-[var(--m-green-deep)]">
              Big friendly characters for parties, schools and festivals
            </p>
          </Reveal>

          <Reveal delay={260} y={16}>
            <p
              className="mt-4 max-w-md text-lg leading-relaxed text-[#355238]"
              style={{ textShadow: "0 1px 2px rgba(255,250,238,0.8)" }}
            >
              Step into a cheerful meadow of hugs, dancing, games, photos, and big party moments for
              birthdays, daycares, schools, malls, festivals, and community celebrations across the
              Vancouver area.
            </p>
          </Reveal>

          {/* Watch Us In Action — the video button */}
          <Reveal delay={280} y={14}>
            <button
              type="button"
              onClick={() => setCinema(true)}
              className="watch-cta group mt-7 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--m-green)]/30 bg-white/85 py-2 pl-2 pr-5 text-left backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--m-green)]"
            >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--m-green)] to-[var(--m-green-deep)] text-white shadow-[0_6px_16px_-6px_rgba(44,110,58,0.7)]">
                <span
                  aria-hidden
                  className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--m-green)]/50"
                />
                <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-[var(--m-green-deep)]">
                  Featured Reel
                </span>
                <span className="text-[0.98rem] font-bold text-[var(--m-green-ink)]">
                  Watch Us In Action
                </span>
              </span>
            </button>
          </Reveal>

          {/* the two CTAs */}
          <Reveal delay={340} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="#mascot-trail"
                size="lg"
                className="group !bg-[#4CA45D] !text-white hover:!-translate-y-0.5 hover:!bg-[#2C6E3A] hover:!shadow-[0_12px_30px_-10px_rgba(44,110,58,0.65)]"
              >
                <PawPrint className="h-4 w-4" aria-hidden />
                Explore Mascot Meadows
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton
                to="/pricing"
                variant="ghost"
                size="lg"
                className="!border-[#4CA45D]/55 !bg-white/80 !text-[#2C6E3A] shadow-[var(--shadow-sm)] backdrop-blur-sm hover:!-translate-y-0.5 hover:!border-[#E2A92E] hover:!text-[#235C30]"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Request Mascot Pricing
              </CTAButton>
            </div>
          </Reveal>

          {/* trust row */}
          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[var(--m-green-deep)]"
                >
                  <Icon className="h-4 w-4 text-[var(--m-gold)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* ===================== rolling meadow grass → next section ============ */}
      <div aria-hidden className="mhr-grass pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,86 C240,52 470,104 720,80 C1000,52 1230,108 1440,78 L1440,130 L0,130 Z"
            fill="#EAF6DC"
          />
          <path
            d="M0,104 C260,74 460,120 720,98 C1010,74 1220,122 1440,100 L1440,130 L0,130 Z"
            fill="#CDE9A6"
          />
          <g className="mhr-grass-tufts" fill="none" stroke="#7CB85A" strokeWidth="3" strokeLinecap="round">
            <path d="M150,104 q-3,-12 2,-20 M158,104 q3,-10 9,-16 M166,104 q1,-8 -3,-15" />
            <path d="M620,100 q-3,-12 2,-20 M628,100 q3,-10 9,-16 M636,100 q1,-8 -3,-15" />
            <path d="M1080,104 q-3,-12 2,-20 M1088,104 q3,-10 9,-16 M1096,104 q1,-8 -3,-15" />
          </g>
          <g className="mhr-grass-buds">
            <circle cx="168" cy="84" r="3.4" fill="#F6C544" />
            <circle cx="637" cy="80" r="3.4" fill="#F4977E" />
            <circle cx="1097" cy="84" r="3.4" fill="#5BB7E6" />
          </g>
        </svg>
      </div>

      {/* gentle scroll cue */}
      <a
        href="#mascot-trail"
        aria-label="Scroll to explore Mascot Meadows"
        className={cn("mhr-chev transition-opacity duration-300", isCinema && "!opacity-0")}
      >
        <ChevronDown className="h-5 w-5" aria-hidden />
      </a>

      {/* CINEMA REEL — fullscreen "Watch Us In Action" video (covers header too) */}
      <div
        className={cn(
          "fixed inset-0 z-[120] flex items-center justify-center bg-black transition-opacity duration-500",
          isCinema ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isCinema}
      >
        <video
          ref={videoRef}
          src={REEL_SRC}
          poster={heroImg}
          playsInline
          preload="none"
          controls
          onEnded={() => setCinema(false)}
          className="max-h-[100svh] w-auto max-w-[100vw]"
        />
        <button
          type="button"
          onClick={() => setCinema(false)}
          aria-label="Close video"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
