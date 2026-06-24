import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Egg,
  Flower2,
  Ghost,
  Leaf,
  Play,
  School,
  Snowflake,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";
import villageSpring from "@/assets/holiday/village-spring.webp";
import villageHalloween from "@/assets/holiday/village-halloween.webp";
import villageChristmas from "@/assets/holiday/village-christmas.webp";

/**
 * HolidayHero — Section 1 of the Holiday Village page: the seasonal realm
 * entrance, themed as a "Living Holiday Calendar" (one village, three seasons).
 * Same composition as the Mascot Meadows hero, but on a season-spanning palette —
 * mulled berry-plum + antique gold over candlelight cream, with a recurring
 * winter/spring/autumn accent trio (evergreen+snow-blue · lilac+blush · pumpkin).
 * The background is the SAME village recreated for Spring, Halloween and Christmas,
 * cross-fading on a stack so the village magically changes seasons (motion-gated;
 * reduced motion holds the Christmas page). The copy sits left over a soft cream
 * wash — a "Vancouver / Holiday Village / Events" wordmark lockup, a display line,
 * a "Watch Us In Action" reel, two CTAs and a Christmas·Easter·Halloween trust row.
 * Ambient snow + petals + leaves + bats drift together. Brand-safe; reduced-motion
 * safe. See "HOLIDAY VILLAGE HERO" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

/** Fullscreen "Watch Us In Action" reel source — drop the file in to enable. */
const REEL_SRC = "/video/holiday-village.mp4";

/** The same village, three seasons — cross-faded so it changes seasons. */
const SLIDES = [
  { src: villageSpring, alt: "" },
  { src: villageHalloween, alt: "" },
  {
    src: villageChristmas,
    alt: "A festive Holiday Village square — glowing market stalls, garlands, lanterns and a welcome arch — that changes through the seasons.",
  },
] as const;
const SLIDE_START = 2; // Christmas — our busiest season — on first paint
const SLIDE_MS = 6500;

/* Trust row — the three signature seasons up front (Christmas · Easter ·
   Halloween), then the year-round formats. Icons carry the seasonal accent. */
const TRUST = [
  { icon: Egg, label: "Easter Visits", color: "var(--h-lilac)" },
  { icon: Ghost, label: "Halloween Parties", color: "var(--h-pumpkin)" },
  { icon: Snowflake, label: "Christmas Events", color: "var(--h-green)" },
  { icon: School, label: "School Visits", color: "var(--h-gold)" },
  { icon: Store, label: "Mall Appearances", color: "var(--h-gold)" },
  { icon: Camera, label: "Holiday Photos", color: "var(--h-gold)" },
] as const;

/* Deterministic drifting seasons — snow (winter), petals (spring) + leaves
   (autumn) falling together (identical on server & client). */
const DRIFT = [
  { k: "snow", left: "6%", s: 8, delay: "0s", dur: "15s", dx: "16px", rot: "70deg", op: 0.9, c: "#fff" },
  { k: "petal", left: "14%", s: 10, delay: "3.4s", dur: "20s", dx: "-14px", rot: "220deg", op: 0.72, c: "var(--h-blush)" },
  { k: "leaf", left: "22%", s: 11, delay: "1.6s", dur: "17s", dx: "20px", rot: "180deg", op: 0.7, c: "var(--h-pumpkin)" },
  { k: "snow", left: "31%", s: 6, delay: "5.2s", dur: "19s", dx: "-15px", rot: "60deg", op: 0.8, c: "#fff" },
  { k: "petal", left: "40%", s: 9, delay: "2.3s", dur: "18s", dx: "14px", rot: "260deg", op: 0.68, c: "var(--h-lilac)" },
  { k: "leaf", left: "58%", s: 12, delay: "4.1s", dur: "16.5s", dx: "-18px", rot: "150deg", op: 0.72, c: "#C9692C" },
  { k: "snow", left: "68%", s: 7, delay: "1s", dur: "18.5s", dx: "13px", rot: "70deg", op: 0.85, c: "#fff" },
  { k: "petal", left: "78%", s: 9, delay: "6s", dur: "15.5s", dx: "-16px", rot: "300deg", op: 0.7, c: "var(--h-blush)" },
  { k: "leaf", left: "85%", s: 11, delay: "2.8s", dur: "19.5s", dx: "17px", rot: "120deg", op: 0.68, c: "var(--h-pumpkin)" },
  { k: "snow", left: "92%", s: 8, delay: "4.6s", dur: "16.8s", dx: "-13px", rot: "70deg", op: 0.9, c: "#fff" },
  { k: "petal", left: "97%", s: 8, delay: "0.7s", dur: "20.5s", dx: "12px", rot: "200deg", op: 0.64, c: "var(--h-lilac)" },
] as const;

/* Soft garland/arch twinkles near the village (right side). */
const SPARKS = [
  { left: "63%", top: "26%", s: 12, delay: "0.4s" },
  { left: "82%", top: "18%", s: 9, delay: "1.6s" },
  { left: "74%", top: "40%", s: 14, delay: "2.6s" },
  { left: "90%", top: "34%", s: 10, delay: "0.9s" },
  { left: "69%", top: "12%", s: 8, delay: "3.2s" },
] as const;

/* A small bat — a faint Halloween hint drifting in the distance. */
function Bat({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 12" aria-hidden="true">
      <path
        d="M12,3 Q11,1 12,0 Q13,1 12,3 Q14,1.5 16,1.2 Q19,0.8 22,3 Q20,2.6 18.5,3.4 Q17,2.6 16,4.2 Q14,3 12,5 Q10,3 8,4.2 Q7,2.6 5.5,3.4 Q4,2.6 2,3 Q5,0.8 8,1.2 Q10,1.5 12,3 Z"
        fill="#4A2E45"
      />
    </svg>
  );
}

export function HolidayHero() {
  const { isCinema, setCinema } = useCinema();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [slide, setSlide] = useState(SLIDE_START);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionOK(true);
  }, []);

  // Cross-fade the village through its seasons (paused under reduced motion and
  // while the fullscreen reel is open).
  useEffect(() => {
    if (!motionOK || isCinema) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [motionOK, isCinema]);

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
      aria-label="Holiday Village — seasonal character celebrations"
      className="hvl relative isolate flex min-h-[88svh] items-center overflow-hidden"
    >
      {/* the same village, three seasons — cross-fading full-bleed background */}
      <div aria-hidden className="hvl-slides absolute inset-0 -z-30">
        {SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.alt}
            aria-hidden={s.alt ? undefined : true}
            className={cn("hvl-slide", i === slide && "is-active")}
            fetchPriority={i === SLIDE_START ? "high" : "low"}
            decoding="async"
            loading={i === SLIDE_START ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* soft cream washes keep the left copy readable over the art */}
      <div aria-hidden className="hvl-wash absolute inset-0 -z-20" />
      <div aria-hidden className="hvl-wash-top absolute inset-x-0 top-0 -z-20 h-44" />
      <div aria-hidden className="hvl-wash-mobile absolute inset-0 -z-20 sm:hidden" />

      {/* warm upper-left candlelight glow */}
      <span aria-hidden className={`hvl-sun absolute -z-10 ${motionOK ? "is-live" : ""}`} />

      {/* ambient — winter snow + spring petals + autumn leaves drifting together
          (motion only), plus warm garland twinkle */}
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
              className={d.k === "petal" ? "hvl-petal" : d.k === "leaf" ? "hvl-leaf" : "hvl-snow"}
              style={
                {
                  left: d.left,
                  width: d.s,
                  height: d.s,
                  animationDelay: d.delay,
                  animationDuration: d.dur,
                  "--dx": d.dx,
                  "--rot": d.rot,
                  "--op": d.op,
                  "--c": d.c,
                } as Vars
              }
            />
          ))}
          {SPARKS.map((s, i) => (
            <span
              key={`t${i}`}
              className="hvl-spark"
              style={{ left: s.left, top: s.top, width: s.s, height: s.s, animationDelay: s.delay }}
            />
          ))}
          <Bat className="hvl-bat" style={{ left: "30%", top: "16%", width: 18, animationDelay: "0s" } as Vars} />
          <Bat className="hvl-bat" style={{ left: "52%", top: "10%", width: 13, animationDelay: "4s" } as Vars} />
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
          {/* Vancouver Holiday Village Events — ornate wordmark (Hero-HQ style) */}
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <h1 className="sr-only">Vancouver Holiday Village Events</h1>
              <span aria-hidden className="inline-flex items-center gap-2">
                <Snowflake className="h-5 w-5 shrink-0 text-[var(--h-snowblue)]" aria-hidden />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.65rem)] tracking-[0.2em] text-[var(--h-cran)]">
                  Vancouver
                </span>
              </span>
              <span aria-hidden className="hvl-script t-script-hero mt-1 block text-[clamp(2.2rem,6.4vw,4rem)]">
                Holiday Village
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[var(--h-cran)]"
              >
                <Flower2 className="h-3.5 w-3.5 text-[var(--h-lilac)]" aria-hidden />
                Events
                <Leaf className="h-3.5 w-3.5 text-[var(--h-pumpkin)]" aria-hidden />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{ background: "linear-gradient(90deg, var(--h-cran), var(--h-gold) 55%, transparent)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={200} y={16}>
            <p className="t-display mt-3 text-[clamp(1.25rem,2.5vw,1.8rem)] italic leading-snug text-[var(--h-cran)]">
              Seasonal characters for{" "}
              <span className="not-italic font-semibold text-[var(--h-lilac)]">Easter</span>,{" "}
              <span className="not-italic font-semibold text-[var(--h-pumpkin)]">Halloween</span>,{" "}
              <span className="not-italic font-semibold text-[var(--h-green)]">Christmas</span>, and
              magical moments all year long
            </p>
          </Reveal>

          <Reveal delay={260} y={16}>
            <p
              className="mt-4 max-w-md text-lg leading-relaxed text-[var(--h-ink)]"
              style={{ textShadow: "0 1px 2px rgba(250,243,229,0.85)" }}
            >
              Step into a cozy village of festive photos, cheerful greetings, and seasonal character
              visits. Holiday Village brings{" "}
              <span className="font-semibold text-[var(--h-lilac)]">Easter magic</span>,{" "}
              <span className="font-semibold text-[var(--h-pumpkin)]">spooky fun</span>,{" "}
              <span className="font-semibold text-[var(--h-green)]">Christmas wonder</span>, school
              visits, mall appearances, corporate celebrations, and community events to life across the
              Vancouver area.
            </p>
          </Reveal>

          {/* Watch Us In Action — the video button */}
          <Reveal delay={280} y={14}>
            <button
              type="button"
              onClick={() => setCinema(true)}
              className="watch-cta group mt-7 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--h-gold)]/40 bg-white/85 py-2 pl-2 pr-5 text-left backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--h-cran)]"
            >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--h-cran)] to-[var(--h-cran-deep)] text-white shadow-[0_6px_16px_-6px_rgba(78,29,52,0.7)]">
                <span
                  aria-hidden
                  className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--h-cran)]/45"
                />
                <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-[var(--h-gold)]">
                  Featured Reel
                </span>
                <span className="text-[0.98rem] font-bold text-[var(--h-cran)]">
                  Watch Us In Action
                </span>
              </span>
            </button>
          </Reveal>

          {/* the two CTAs */}
          <Reveal delay={340} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="#holiday-explore"
                size="lg"
                className="group ring-1 ring-[#E0C271]/55 !bg-[var(--h-cran)] !text-white hover:!-translate-y-0.5 hover:!bg-[var(--h-cran-deep)] hover:!shadow-[0_12px_30px_-10px_rgba(110,26,34,0.6)]"
              >
                <Snowflake className="h-4 w-4" aria-hidden />
                Explore Holiday Village
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton
                to="/pricing"
                variant="ghost"
                size="lg"
                className="!border-[var(--h-gold)]/60 !bg-white/80 !text-[var(--h-cran)] shadow-[var(--shadow-sm)] backdrop-blur-sm hover:!-translate-y-0.5 hover:!border-[var(--h-cran)] hover:!text-[var(--h-cran-deep)]"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Request Holiday Pricing
              </CTAButton>
            </div>
          </Reveal>

          {/* trust row — the three seasons, then year-round formats */}
          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ icon: Icon, label, color }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[var(--h-ink)]"
                >
                  <Icon className="h-4 w-4" style={{ color }} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* ===================== soft snowdrift → next section ============ */}
      <div aria-hidden className="hvl-snowline pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,82 C250,48 470,100 720,76 C1000,48 1230,104 1440,74 L1440,130 L0,130 Z"
            fill="#FBF5E8"
          />
          <path
            d="M0,102 C260,72 470,118 720,94 C1010,70 1230,120 1440,98 L1440,130 L0,130 Z"
            fill="#FFFFFF"
          />
          <g className="hvl-snowglints" fill="#D9B25A">
            <circle cx="214" cy="68" r="3.4" />
            <circle cx="720" cy="64" r="3.9" />
            <circle cx="1188" cy="70" r="3.4" />
          </g>
        </svg>
      </div>

      {/* gentle scroll cue */}
      <a
        href="#holiday-explore"
        aria-label="Scroll to explore Holiday Village"
        className={cn("hvl-chev transition-opacity duration-300", isCinema && "!opacity-0")}
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
          poster={villageChristmas}
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
