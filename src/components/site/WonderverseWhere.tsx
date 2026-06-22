import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { ArrowRight, Drama, Mic, Moon, Orbit, Sparkles, Star, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WonderverseWhere — "Where the Rare Characters Appear": the explainer section
 * after the hero. A moonlit-theatre two-column band on a deep-purple celestial
 * ground. Left: a translucent purple-glass "theatre program" panel (eyebrow,
 * heading with a script accent, subheading, paragraph, a gold CTA). Right: six
 * brand-safe "realm-fragment" cards arranged in a loose constellation around a
 * faint moon compass, joined by gold lines that draw in on scroll; each card
 * bursts from a star and lifts on hover with its own accent glow. Category
 * archetypes only — no franchise names, logos, costumes, or likenesses. VISIBLE
 * BY DEFAULT (hidden only under `.wvr.anim` before `.is-in`), reduced-motion
 * safe. See "WONDERVERSE REALM — WHERE" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const REALMS: {
  key: string;
  title: string;
  desc: string;
  icon: IconType;
  acc: string;
  left: number;
  top: number;
}[] = [
  {
    key: "fairy",
    title: "Fairy Magic",
    desc: "Fairies, pixies, woodland magic",
    icon: Sparkles,
    acc: "#A9E6B0",
    left: 27,
    top: 13,
  },
  {
    key: "spell",
    title: "Spellcasters",
    desc: "Good witches, magical guides, enchanted hosts",
    icon: Wand2,
    acc: "#E7C977",
    left: 64,
    top: 13,
  },
  {
    key: "galaxy",
    title: "Galaxy Adventures",
    desc: "Space fantasy, cosmic warriors, galactic parties",
    icon: Orbit,
    acc: "#6FA8E8",
    left: 84,
    top: 45,
  },
  {
    key: "pop",
    title: "Pop & Performance",
    desc: "Concert parties, pop-star tributes, stage-energy characters",
    icon: Mic,
    acc: "#F09AC8",
    left: 16,
    top: 51,
  },
  {
    key: "villain",
    title: "Villains & Mischief",
    desc: "Storybook villains, playful troublemakers, dramatic guests",
    icon: Drama,
    acc: "#A98AE6",
    left: 44,
    top: 81,
  },
  {
    key: "custom",
    title: "Custom Personas",
    desc: "Original characters, special requests, unique themes",
    icon: Star,
    acc: "#F2E4C0",
    left: 76,
    top: 81,
  },
];

/* Constellation web (percent coords matching the card centres + the moon). */
const RING_D = "M27,13 L64,13 L84,45 L76,81 L44,81 L16,51 Z";
const SPOKES_D =
  "M50,46 L27,13 M50,46 L64,13 M50,46 L84,45 M50,46 L16,51 M50,46 L44,81 M50,46 L76,81";

/* Deterministic background stars (SSR-safe). */
const STARS = [
  { left: "8%", top: "22%", s: 3, delay: "0s", dur: "5s" },
  { left: "20%", top: "70%", s: 2, delay: "1.4s", dur: "6s" },
  { left: "33%", top: "12%", s: 4, delay: "0.7s", dur: "5.5s" },
  { left: "47%", top: "84%", s: 2, delay: "2.1s", dur: "6.5s" },
  { left: "61%", top: "18%", s: 3, delay: "1s", dur: "5s" },
  { left: "73%", top: "76%", s: 2, delay: "2.6s", dur: "6s" },
  { left: "88%", top: "30%", s: 3, delay: "0.4s", dur: "5.8s" },
  { left: "94%", top: "62%", s: 2, delay: "1.8s", dur: "6.2s" },
] as const;

export function WonderverseWhere() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="wvr-title"
      className={cn("wvr relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvr-bg absolute inset-0" />
      <div aria-hidden className="wvr-stars pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvr-star-dot"
            style={{
              left: s.left,
              top: s.top,
              width: s.s,
              height: s.s,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          />
        ))}
      </div>
      <span aria-hidden className="wvr-glow wvr-glow-l" />
      <span aria-hidden className="wvr-glow wvr-glow-r" />
      <div aria-hidden className="wvr-seam-top pointer-events-none absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="wvr-seam-bottom pointer-events-none absolute inset-x-0 bottom-0"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 py-20 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,29rem)_1fr] lg:gap-12 lg:px-8">
        {/* ===================== LEFT — theatre-program panel ===================== */}
        <div className="wvr-panel">
          <span aria-hidden className="wvr-panel-moon">
            <Moon className="h-5 w-5" />
          </span>
          <span aria-hidden className="wvr-panel-corner wvr-panel-corner--tl" />
          <span aria-hidden className="wvr-panel-corner wvr-panel-corner--tr" />
          <span aria-hidden className="wvr-panel-corner wvr-panel-corner--bl" />
          <span aria-hidden className="wvr-panel-corner wvr-panel-corner--br" />

          <span className="wvr-eyebrow">
            <span aria-hidden className="wvr-eyebrow-rule" />
            Beyond the Other Realms
            <span aria-hidden className="wvr-eyebrow-rule" />
          </span>
          <h2 id="wvr-title" className="wvr-title">
            Where the rare characters{" "}
            <span className="wvr-title-script">
              appear.
              <span aria-hidden className="wvr-title-swash" />
            </span>
          </h2>
          <p className="wvr-sub">
            Wonderverse Realm is home to our most unusual characters, custom personas, tribute-style
            performers, fantasy guests, galaxy adventurers, fairies, spellcasters, villains, and
            one-of-a-kind event requests.
          </p>
          <span aria-hidden className="wvr-rule" />
          <p className="wvr-para">
            If your event needs something outside the usual princess, hero, mermaid, dinosaur,
            mascot, or holiday experience, this is where the magic goes. The Wonderverse is built
            for unique themes, special requests, and characters that feel rare, theatrical, and
            unforgettable.
          </p>
          <a href="#cast" className="wvr-cta group">
            <span aria-hidden className="wvr-cta-gloss" />
            Explore Rare Characters
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>

        {/* ===================== RIGHT — constellation of realm cards ===================== */}
        <div className="wvr-stage">
          <svg aria-hidden className="wvr-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="wvr-line wvr-line--ring" pathLength={1} d={RING_D} />
            <path className="wvr-line wvr-line--spokes" pathLength={1} d={SPOKES_D} />
          </svg>

          <span aria-hidden className="wvr-compass">
            <span className="wvr-compass-ring wvr-compass-ring--1" />
            <span className="wvr-compass-ring wvr-compass-ring--2" />
            <Moon className="wvr-compass-moon h-6 w-6" />
          </span>

          <ul className="wvr-grid">
            {REALMS.map((r, i) => (
              <li
                key={r.key}
                className={cn("wvr-cell", `wvr-cell--${r.key}`)}
                style={
                  {
                    "--cl": `${r.left}%`,
                    "--ct": `${r.top}%`,
                    "--acc": r.acc,
                    "--i": i,
                  } as Vars
                }
              >
                <span aria-hidden className="wvr-spark" />
                <article className="wvr-card">
                  <span aria-hidden className="wvr-card-glow" />
                  <span aria-hidden className="wvr-card-ink" />
                  <span className="wvr-card-ic" aria-hidden>
                    <r.icon className="h-5 w-5" />
                  </span>
                  <h3 className="wvr-card-title">{r.title}</h3>
                  <p className="wvr-card-desc">{r.desc}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
