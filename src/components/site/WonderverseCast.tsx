import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Feather,
  Mic,
  Moon,
  Orbit,
  Sparkles,
  Star,
  Sword,
  Trophy,
  Wand2,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import castPoster from "@/assets/specialty/wonderverse-cast-poster.webp";
import artDark from "@/assets/specialty/cast/dark.webp";
import artKnight from "@/assets/specialty/cast/knight.webp";
import artRose from "@/assets/specialty/cast/rose.webp";
import artViolet from "@/assets/specialty/cast/violet.webp";
import artEmerald from "@/assets/specialty/cast/emerald.webp";
import artPop from "@/assets/specialty/cast/pop.webp";
import artMvp from "@/assets/specialty/cast/mvp.webp";
import artPixie from "@/assets/specialty/cast/pixie.webp";
import artNeverland from "@/assets/specialty/cast/neverland.webp";
import artUnicorn from "@/assets/specialty/cast/unicorn.webp";

/**
 * WonderverseCast — "Summon the Cast": the interactive character-reveal for
 * /specialty-events. A looping violet observatory film plays full-bleed; the
 * glowing moon-medallion in the centre is a real button. Tapping it (the only
 * trigger — no auto-reveal) fires a shockwave + flash and the ten brand-safe
 * character cards burst out of balls of energy from the centre, settle into a
 * summoning ring, then drift gently. Cards use the Princess-Kingdom design
 * rethemed amethyst + gold, one accent colour each, with original generated
 * archetype portraits; hover/focus reveals a quick line + a Book Now button.
 * Archetype labels only (no franchise names / likenesses). VISIBLE BY DEFAULT
 * (cards hidden only once JS arms the trigger), reduced-motion safe. See
 * "WONDERVERSE REALM CAST" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const VIDEO_SRC = "/video/wonderverse-cast.mp4";

/* Brand-safe archetypes (internal mapping kept out of rendered output):
   Dark Lord←Vader · Cosmic Knight←Obi-Wan · Good Witch Rose←Glinda(pink) ·
   Good Witch Violet←Glinda(purple) · Emerald Witch←Elphaba · Pop Superstar←
   T.Swift · MVP Champion←T.Kelce · Pixie Fairy←Tinker Bell · Neverland Boy←
   Peter Pan · Unicorn Fairy←original. */
type Cast = {
  key: string;
  name: string;
  sub: string;
  line: string;
  icon: IconType;
  acc: string;
  img: string;
};

const CAST: Cast[] = [
  {
    key: "dark",
    name: "The Dark Lord",
    sub: "Galactic Villain",
    line: "The galaxy's shadow — cue the dramatic entrance.",
    icon: Sword,
    acc: "#E0606A",
    img: artDark,
  },
  {
    key: "knight",
    name: "The Cosmic Knight",
    sub: "Star Guardian",
    line: "Calm, wise, and ready to train young heroes.",
    icon: Orbit,
    acc: "#6FA8E8",
    img: artKnight,
  },
  {
    key: "rose",
    name: "The Good Witch",
    sub: "Rose",
    line: "Sparkle, kindness, and a little pink magic.",
    icon: Wand2,
    acc: "#F09AC8",
    img: artRose,
  },
  {
    key: "violet",
    name: "The Good Witch",
    sub: "Violet",
    line: "Enchantment with a glimmering violet shimmer.",
    icon: Sparkles,
    acc: "#B98BE6",
    img: artViolet,
  },
  {
    key: "emerald",
    name: "The Emerald Witch",
    sub: "Wickedly Fun",
    line: "Deliciously theatrical — wickedly good fun.",
    icon: Moon,
    acc: "#6FCF9B",
    img: artEmerald,
  },
  {
    key: "pop",
    name: "The Pop Superstar",
    sub: "Stage & Sparkle",
    line: "Lights, glitter, and a sing-along for everyone.",
    icon: Mic,
    acc: "#F0B85A",
    img: artPop,
  },
  {
    key: "mvp",
    name: "The MVP Champion",
    sub: "Game Day",
    line: "Game-day energy and high-fives all around.",
    icon: Trophy,
    acc: "#E0828A",
    img: artMvp,
  },
  {
    key: "pixie",
    name: "The Pixie Fairy",
    sub: "Pixie Dust",
    line: "A flutter of wings and a trail of pixie dust.",
    icon: Sparkles,
    acc: "#67D7C0",
    img: artPixie,
  },
  {
    key: "neverland",
    name: "The Neverland Boy",
    sub: "Flight & Fun",
    line: "Adventure, mischief, and never growing up.",
    icon: Feather,
    acc: "#7FC56E",
    img: artNeverland,
  },
  {
    key: "unicorn",
    name: "The Unicorn Fairy",
    sub: "Rainbow Magic",
    line: "Rainbows, wishes, and a touch of unicorn magic.",
    icon: Star,
    acc: "#C79BEE",
    img: artUnicorn,
  },
];

const ROT = [-5, 5, -4, 4, -6, 5, -5, 4, -3, 6];

/* Ring layout, computed once: each card's resting % position around the centre
   trigger + the px vector it flies in from (pointing back toward the centre). */
const RING = CAST.map((_, i) => {
  const a = ((-90 + (360 / CAST.length) * i) * Math.PI) / 180;
  const rx = 39;
  const ry = 35;
  const left = +(50 + rx * Math.cos(a)).toFixed(2);
  const top = +(50 + ry * Math.sin(a)).toFixed(2);
  const fx = Math.round((-(rx * Math.cos(a)) / 100) * 1080 * 0.8);
  const fy = Math.round((-(ry * Math.sin(a)) / 100) * 760 * 0.8);
  return { left, top, fx, fy };
});

export function WonderverseCast() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [summoned, setSummoned] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const play = () => {
      const v = videoRef.current;
      if (v) void v.play().catch(() => undefined);
    };
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      setSummoned(true);
      play();
      return;
    }
    setMotionOK(true);
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          play();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // The cast is summoned only by the trigger button — no auto-reveal.
  const summon = () => setSummoned(true);

  return (
    <section
      ref={ref}
      id="cast"
      aria-labelledby="wvc-title"
      className={cn(
        "wvc relative isolate scroll-mt-24 overflow-hidden",
        motionOK && "anim",
        inView && "is-in",
        armed && "is-armed",
        summoned && "is-summoned",
      )}
    >
      {/* the observatory film — full-bleed loop, poster for first paint */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        poster={castPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div aria-hidden className="wvc-veil absolute inset-0 -z-20" />
      <div aria-hidden className="wvc-seam-top absolute inset-x-0 top-0 -z-20" />
      <div aria-hidden className="wvc-seam-bottom absolute inset-x-0 bottom-0 -z-20" />
      <span aria-hidden className="wvc-flash absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvc-head mx-auto max-w-2xl text-center">
          <span className="wvc-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Now Casting
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvc-title" className="wvc-title">
            Step Into the Wonderverse
          </h2>
          <p className="wvc-sub">
            A constellation of rare, one-of-a-kind characters — tap the moon to summon the cast.
          </p>
        </div>

        {/* the casting stage */}
        <div className="wvc-stage mt-12">
          {/* centre moon-medallion — the trigger */}
          <button
            type="button"
            onClick={summon}
            disabled={summoned}
            aria-pressed={summoned}
            aria-label={summoned ? "The cast is summoned" : "Summon the cast"}
            className="wvc-core"
          >
            <span aria-hidden className="wvc-core-wave" />
            <span aria-hidden className="wvc-core-wave wvc-core-wave--2" />
            <span aria-hidden className="wvc-core-ring" />
            <span aria-hidden className="wvc-core-rays" />
            <span aria-hidden className="wvc-core-pulse" />
            <Moon className="wvc-core-moon" aria-hidden />
            <span className="wvc-core-label">
              {summoned ? (
                <>
                  The Wonderverse
                  <br />
                  Cast
                </>
              ) : (
                <>
                  Summon
                  <br />
                  the Cast
                </>
              )}
            </span>
            {!summoned ? (
              <span aria-hidden className="wvc-core-hint">
                Tap to reveal
              </span>
            ) : null}
          </button>

          <ul className="wvc-grid">
            {CAST.map((c, i) => (
              <li
                key={c.key}
                className="wvc-cell"
                style={
                  {
                    "--clx": `${RING[i].left}%`,
                    "--cly": `${RING[i].top}%`,
                    "--fx": `${RING[i].fx}px`,
                    "--fy": `${RING[i].fy}px`,
                    "--d": `${i * 0.08}s`,
                    "--fd": `${6.2 + (i % 3) * 0.8}s`,
                    "--rot": `${ROT[i]}deg`,
                    "--acc": c.acc,
                  } as Vars
                }
              >
                <span aria-hidden className="wvc-orb" />
                <div className="wvc-float">
                  <div className="wvc-bob">
                    <article className="wvc-card">
                      <span aria-hidden className="wvc-card-shine" />
                      <div className="wvc-portrait">
                        <img
                          className="wvc-portrait-img"
                          src={c.img}
                          alt={`${c.name} — ${c.sub}`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span aria-hidden className="wvc-portrait-glow" />
                        <span aria-hidden className="wvc-portrait-badge">
                          <c.icon className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <div className="wvc-meta">
                        <span className="wvc-card-label">{c.name}</span>
                        <span className="wvc-card-sub">{c.sub}</span>
                        <div className="wvc-card-reveal">
                          <p className="wvc-card-line">{c.line}</p>
                          <Link
                            to="/contact"
                            aria-label={`Book ${c.name}`}
                            className="wvc-card-book"
                          >
                            Book Now
                            <ArrowRight className="h-3 w-3" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* foot + CTA */}
        <div className="wvc-foot mx-auto mt-12 max-w-xl text-center">
          <p className="wvc-foot-line">
            Brand-safe character archetypes — original costume reveals arriving soon. Tell us
            exactly who you&apos;re dreaming of.
          </p>
          <div className="mt-5">
            <CTAButton
              to="/contact"
              size="lg"
              className="cta-pulse !bg-[var(--chapter-specialty)] !text-white hover:!bg-[var(--chapter-specialty-deep)] hover:!shadow-[0_0_30px_rgba(182,139,230,0.55)]"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Request a Character
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
