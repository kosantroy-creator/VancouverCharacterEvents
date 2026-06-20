import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Compass, Shell, Sparkles } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { OceanDecor } from "./OceanDecor";
import { cn } from "@/lib/utils";
import splashImg from "@/assets/mermaid/packages/splash.webp";
import partyImg from "@/assets/mermaid/packages/party.webp";
import takeoverImg from "@/assets/mermaid/packages/takeover.webp";

/**
 * MermaidPricing — "Choose Your Cove Adventure": the packages section. Three
 * pearl-and-gold "cove pass" cards (Splash Visit · Mermaid Cove Party [the
 * featured Signature Cove Experience] · Ocean Takeover), each with a scene photo,
 * a shell crown, a best-for line, a placeholder price, an included list and a
 * booking CTA, plus a soft "Help Me Choose" helper note. Prices are placeholders
 * (From $___ / Custom Quote) — nothing invented. Mermaid-ride wording is careful
 * ("where pool rules allow"). Calm aquatic motion; VISIBLE BY DEFAULT (hidden
 * only under `.mpr.anim:not(.is-in)`), reduced-motion safe. See "MERMAID COVE
 * PRICING" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

type Pkg = {
  slug: string;
  theme: "light" | "feature" | "deep";
  img: string;
  alt: string;
  badge?: string;
  name: string;
  bestFor: string;
  price: string;
  includes: string[];
  cta: string;
};

const PACKAGES: Pkg[] = [
  {
    slug: "splash",
    theme: "light",
    img: splashImg,
    alt: "A mermaid performer floating in a sunlit backyard pool with pastel balloons and shell decorations.",
    name: "Splash Visit",
    bestFor: "Smaller pool parties, quick mermaid moments, and simple birthday visits.",
    price: "From $___",
    includes: [
      "Swimming mermaid appearance",
      "Pirate support included",
      "Poolside greeting",
      "Story or song moment",
      "Photo opportunity",
      "Simple swim interaction",
    ],
    cta: "Request Splash Visit",
  },
  {
    slug: "party",
    theme: "feature",
    img: partyImg,
    alt: "A poolside birthday party with a swimming mermaid and a friendly pirate helper among festive decorations.",
    badge: "Signature Cove Experience",
    name: "Mermaid Cove Party",
    bestFor: "The full Mermaid Cove birthday experience.",
    price: "From $___",
    includes: [
      "Swimming mermaid visit",
      "Pirate support included",
      "Storytime and singing",
      "Birthday crowning",
      "Mermaid rides where pool rules allow",
      "Pool games and treasure fun",
      "Photo moments",
      "Magical farewell",
    ],
    cta: "Request Mermaid Cove Party",
  },
  {
    slug: "takeover",
    theme: "deep",
    img: takeoverImg,
    alt: "A grand resort community pool with a swimming mermaid, ocean banners and elegant decorations.",
    name: "Ocean Takeover",
    bestFor: "Community pools, summer camps, resorts, festivals, schools, and larger events.",
    price: "Custom Quote",
    includes: [
      "Custom event flow",
      "Large group support",
      "Mermaid and pirate entertainment",
      "Extended appearance options",
      "Poolside activity planning",
      "Photo station or crowd moments",
      "Custom schedule",
    ],
    cta: "Plan an Ocean Takeover",
  },
];

const BUBBLES = [
  { left: "10%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "30%", s: 6, delay: "3.6s", dur: "20s", dx: "-9px" },
  { left: "52%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "72%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "89%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

export function MermaidPricing() {
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
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mpr-title"
      className={cn("mpr relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mpr-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,40 C250,84 520,6 760,32 C1010,58 1230,92 1440,52 L1440,0 L0,0 Z"
            fill="#9CD9E6"
          />
        </svg>
      </div>

      <div aria-hidden className="mpr-bg absolute inset-0" />
      <div aria-hidden className="mpr-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mpr-surface pointer-events-none absolute inset-x-0 top-0" />
      <OceanDecor variant="b" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mpr-bubble"
            style={
              {
                left: b.left,
                width: b.s,
                height: b.s,
                animationDelay: b.delay,
                animationDuration: b.dur,
                "--dx": b.dx,
              } as Vars
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mpr-head mx-auto max-w-2xl text-center">
          <span className="mpr-eyebrow">
            <span aria-hidden className="mpr-eyebrow-rule" />
            Cove Packages
            <span aria-hidden className="mpr-eyebrow-rule" />
          </span>
          <h2 id="mpr-title" className="mpr-title">
            <Sparkles className="mpr-title-spark" aria-hidden />
            Choose Your Cove Adventure
            <Sparkles className="mpr-title-spark" aria-hidden />
          </h2>
          <p className="mpr-sub">
            Pick the Mermaid Cove experience that fits your pool party, summer event, camp, or
            larger celebration.
          </p>
          <p className="mpr-sub2">
            Every visit includes a swimming mermaid, pirate support, and a magical poolside
            experience built around your group.
          </p>
        </div>

        {/* the three cove passes */}
        <div className="mpr-grid mt-12 md:mt-14">
          {PACKAGES.map((p, i) => (
            <article
              key={p.slug}
              className={cn("mpr-card", `mpr-card--${p.theme}`)}
              style={{ "--i": i } as Vars}
            >
              {p.theme === "feature" ? <span aria-hidden className="mpr-card-glow" /> : null}
              {p.badge ? <span className="mpr-ribbon">{p.badge}</span> : null}

              <div className="mpr-photo">
                <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                <span aria-hidden className="mpr-photo-fade" />
                <span aria-hidden className="mpr-photo-sheen" />
              </div>

              <div className="mpr-body">
                <span aria-hidden className="mpr-crown">
                  <Shell className="h-5 w-5" />
                </span>
                <h3 className="mpr-name">{p.name}</h3>
                <p className="mpr-bestfor">{p.bestFor}</p>
                <span aria-hidden className="mpr-rule" />
                <p className="mpr-price">{p.price}</p>

                <ul className="mpr-list">
                  {p.includes.map((t, j) => (
                    <li key={t} className="mpr-item" style={{ "--j": j } as Vars}>
                      <span aria-hidden className="mpr-check">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <CTAButton to="/contact" size="md" className="mpr-cta">
                  {p.cta}
                </CTAButton>
              </div>
            </article>
          ))}
        </div>

        {/* helper note */}
        <div className="mpr-helper">
          <span aria-hidden className="mpr-helper-ic">
            <Compass className="h-6 w-6" />
          </span>
          <div className="mpr-helper-text">
            <h3 className="mpr-helper-title">Not sure which cove adventure fits?</h3>
            <p className="mpr-helper-copy">
              Tell us your pool type, guest count, date, and event style — we&apos;ll help recommend
              the right Mermaid Cove package.
            </p>
          </div>
          <CTAButton to="/contact" size="md" className="mpr-helper-cta">
            Help Me Choose
          </CTAButton>
        </div>

        {/* pool-safety wording — careful + practical */}
        <p className="mpr-note">
          Mermaid rides happen where pool rules and setup allow. Pool supervision and lifeguard
          requirements remain the responsibility of the venue or event host according to pool rules.
        </p>
      </div>
    </section>
  );
}
