import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Moon, MoonStar, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WonderversePricing — "Choose Your Wonderverse Experience": the celestial
 * packages section after the cast. Three ornate "theatre-invitation" passes on a
 * deep-purple starry stage — a simpler Wonderverse Visit, a featured Signature
 * Wonderverse Experience (raised, gold glow, "Most Recommended"), and a Custom
 * Realm Booking — framed around the *type* of experience (solo / signature duo /
 * custom cast), not a performer count. Request-only pricing ("Custom Quote"); a
 * moonlit "Help Me Choose" note sits beneath. Passes are placed onto the stage on
 * scroll, the badge stamps in, the middle card gives one glow pulse. VISIBLE BY
 * DEFAULT (hidden only under `.wvp.anim` before `.is-in`), reduced-motion safe.
 * Brand-safe archetype language only. See "WONDERVERSE REALM PRICING" in
 * styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Pass = {
  key: string;
  label: string;
  name: string;
  icon: IconType;
  bestFor: string;
  includes: string[];
  note: string;
  cta: string;
  featured?: boolean;
  badge?: string;
};

const PASSES: Pass[] = [
  {
    key: "visit",
    label: "Wonderverse",
    name: "Visit",
    icon: Moon,
    bestFor:
      "Best for smaller birthdays, surprise appearances, photo moments, and simple themed visits.",
    includes: [
      "Specialty character appearance",
      "Meet-and-greet",
      "Photo moments",
      "Light themed interaction",
      "Short story, activity, or performance moment",
      "Flexible event fit",
    ],
    note: "Available as a solo visit or recommended pairing depending on the character.",
    cta: "Request a Wonderverse Visit",
  },
  {
    key: "signature",
    label: "Signature",
    name: "Wonderverse Experience",
    icon: MoonStar,
    featured: true,
    badge: "Most Recommended",
    bestFor:
      "Best for events where the character concept works better as a duo, pairing, or more complete themed experience.",
    includes: [
      "Signature solo, duo, or paired character experience",
      "Themed entrance",
      "Interactive activities",
      "Photo moments",
      "Games, story, or performance moment",
      "Birthday spotlight",
      "More complete event flow",
    ],
    note: "Recommended for duo-based characters and higher-impact appearances.",
    cta: "Request Signature Experience",
  },
  {
    key: "custom",
    label: "Custom Realm",
    name: "Booking",
    icon: Feather,
    bestFor:
      "Best for unique themes, larger events, brand activations, and one-of-a-kind requests.",
    includes: [
      "Custom concept planning",
      "Solo, duo, or small cast options",
      "Original persona / theme support",
      "Custom event flow",
      "Specialty performance options",
      "Larger event support",
      "Brand or theme alignment",
    ],
    note: "Built around your theme, guest count, and vision.",
    cta: "Plan a Custom Realm",
  },
];

/* Deterministic background stars (SSR-safe). */
const STARS = [
  { left: "6%", top: "20%", s: 3, delay: "0s", dur: "5s" },
  { left: "17%", top: "66%", s: 2, delay: "1.6s", dur: "6s" },
  { left: "31%", top: "12%", s: 3, delay: "0.7s", dur: "5.4s" },
  { left: "44%", top: "82%", s: 2, delay: "2.2s", dur: "6.4s" },
  { left: "57%", top: "16%", s: 3, delay: "1s", dur: "5s" },
  { left: "69%", top: "74%", s: 2, delay: "2.7s", dur: "6.1s" },
  { left: "82%", top: "26%", s: 3, delay: "0.4s", dur: "5.7s" },
  { left: "92%", top: "60%", s: 2, delay: "1.9s", dur: "6.3s" },
] as const;

export function WonderversePricing() {
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
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="wvp-title"
      className={cn("wvp relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvp-bg absolute inset-0" />
      <div aria-hidden className="wvp-stars pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvp-star-dot"
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
      <span aria-hidden className="wvp-glow wvp-glow-l" />
      <span aria-hidden className="wvp-glow wvp-glow-r" />
      <div aria-hidden className="wvp-seam-top pointer-events-none absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="wvp-seam-bottom pointer-events-none absolute inset-x-0 bottom-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvp-head mx-auto max-w-3xl text-center">
          <span className="wvp-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Wonderverse Packages
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvp-title" className="wvp-title">
            Choose Your Wonderverse Experience
          </h2>
          <p className="wvp-sub">
            Wonderverse bookings can be solo appearances, signature duos, or custom cast experiences
            depending on the character style and event vision. Tell us what you&apos;re imagining,
            and we&apos;ll recommend the right format.
          </p>
          <span aria-hidden className="wvp-divider">
            <span className="wvp-divider-rule" />
            <Moon className="h-3.5 w-3.5" />
            <span className="wvp-divider-rule" />
          </span>
          <p className="wvp-support">
            Some rare characters shine on their own, while others are designed to appear as a pair
            for the best guest experience.
          </p>
        </div>

        {/* the three passes */}
        <div className="wvp-grid mt-12 md:mt-14">
          {PASSES.map((p, i) => (
            <article
              key={p.key}
              className={cn("wvp-card", `wvp-card--${p.key}`, p.featured && "is-featured")}
              style={{ "--i": i } as Vars}
            >
              {p.featured ? <span aria-hidden className="wvp-spotlight" /> : null}
              {p.badge ? (
                <span className="wvp-badge">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {p.badge}
                </span>
              ) : null}
              <span aria-hidden className="wvp-corner wvp-corner--tl" />
              <span aria-hidden className="wvp-corner wvp-corner--tr" />
              <span aria-hidden className="wvp-corner wvp-corner--bl" />
              <span aria-hidden className="wvp-corner wvp-corner--br" />

              <span aria-hidden className="wvp-crest">
                <span className="wvp-crest-ray" />
                <p.icon className="h-6 w-6" />
              </span>

              <div className="wvp-name">
                <span className="wvp-name-label">{p.label}</span>
                <span className="wvp-name-main">{p.name}</span>
              </div>

              <p className="wvp-bestfor">{p.bestFor}</p>

              <span aria-hidden className="wvp-list-rule">
                <Star className="h-3 w-3" />
              </span>

              <ul className="wvp-list">
                {p.includes.map((inc, j) => (
                  <li key={inc} className="wvp-li" style={{ "--j": j } as Vars}>
                    <span aria-hidden className="wvp-li-ic">
                      <Star className="h-3 w-3" />
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <p className="wvp-note">{p.note}</p>

              <div className="wvp-foot">
                <span className="wvp-price">Custom Quote</span>
                <Link to="/contact" className="wvp-cta group" aria-label={p.cta}>
                  <span aria-hidden className="wvp-cta-gloss" />
                  {p.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* helper note */}
        <div className="wvp-help mt-10 md:mt-12">
          <span aria-hidden className="wvp-help-moon">
            <Moon className="h-6 w-6" />
          </span>
          <div className="wvp-help-text">
            <h3 className="wvp-help-title">Not sure which format fits?</h3>
            <p className="wvp-help-copy">
              Tell us the character style, event size, and the kind of moment you want to create —
              we&apos;ll recommend whether a solo visit, duo, or custom cast experience makes the
              most sense.
            </p>
          </div>
          <Link to="/contact" className="wvp-help-cta group">
            <span aria-hidden className="wvp-cta-gloss" />
            Help Me Choose
            <Sparkles className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
