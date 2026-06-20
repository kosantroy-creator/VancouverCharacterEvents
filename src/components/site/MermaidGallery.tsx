import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Shell, Sparkles } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { OceanDecor } from "./OceanDecor";
import { cn } from "@/lib/utils";
import swimImg from "@/assets/mermaid/gallery/swim.webp";
import crowningImg from "@/assets/mermaid/gallery/crowning.webp";
import storytimeImg from "@/assets/mermaid/gallery/storytime.webp";
import ridesImg from "@/assets/mermaid/gallery/rides.webp";
import pirateImg from "@/assets/mermaid/gallery/pirate.webp";

/**
 * MermaidGallery — "Real Mermaid Cove Moments": the Cove Journal gallery after
 * the pricing section. A large featured swim photo on the left and a 2×2 of
 * supporting moments (crowning, storytime, rides, pirate games), each framed
 * like a page in a poolside memory log — pearl-shell crowned cards with a small
 * field-note caption, a soft water-ripple on hover, a "View the Gallery" CTA and
 * a script sign-off. Emotional proof before the FAQ / booking. Photos are
 * generated placeholders, swap-ready. Calm aquatic motion; VISIBLE BY DEFAULT
 * (hidden only under `.mgl.anim:not(.is-in)`), reduced-motion safe. See "MERMAID
 * COVE GALLERY" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const FEATURED = {
  img: swimImg,
  label: "Mermaid Magic Swim",
  alt: "A smiling mermaid performer in a sunlit pool reaching warmly toward a happy child at the pool edge.",
};

const TILES = [
  {
    img: crowningImg,
    label: "Birthday Crowning",
    alt: "A mermaid performer placing a sparkly tiara on a delighted young girl at a poolside birthday party.",
  },
  {
    img: storytimeImg,
    label: "Storytime & Singing",
    alt: "A mermaid performer reading a storybook to a group of children in mermaid costumes at a bright party.",
  },
  {
    img: ridesImg,
    label: "Mermaid Rides",
    alt: "A mermaid performer gliding through a sparkling pool with a joyful child for a playful mermaid ride.",
  },
  {
    img: pirateImg,
    label: "Pirate Games",
    alt: "Happy children in costume pirate hats playing a cheerful foam-sword game beside a sunny pool.",
  },
];

const BUBBLES = [
  { left: "9%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "28%", s: 6, delay: "3.6s", dur: "20s", dx: "-9px" },
  { left: "50%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "71%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "88%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

function MomentCard({
  img,
  label,
  alt,
  variant,
  i,
}: {
  img: string;
  label: string;
  alt: string;
  variant: "featured" | "tile";
  i: number;
}) {
  return (
    <article className={cn("mgl-card", `mgl-card--${variant}`)} style={{ "--i": i } as Vars}>
      <div className="mgl-frame">
        <img className="mgl-img" src={img} alt={alt} loading="lazy" decoding="async" />
        <span aria-hidden className="mgl-ripple" />
        <span aria-hidden className="mgl-glow" />
        <span className="mgl-label">
          <Shell className="h-3.5 w-3.5" aria-hidden />
          {label}
        </span>
      </div>
      <span aria-hidden className="mgl-shell-top">
        <Shell className="h-4 w-4" />
      </span>
    </article>
  );
}

export function MermaidGallery() {
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
      aria-labelledby="mgl-title"
      className={cn("mgl relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mgl-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,40 C250,84 520,6 760,32 C1010,58 1230,92 1440,52 L1440,0 L0,0 Z"
            fill="#97D6E7"
          />
        </svg>
      </div>

      <div aria-hidden className="mgl-bg absolute inset-0" />
      <div aria-hidden className="mgl-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mgl-surface pointer-events-none absolute inset-x-0 top-0" />
      <OceanDecor variant="a" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mgl-bubble"
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

      <span aria-hidden className="mgl-stamp">
        Real Moments · Pool Magic · Summer Memories
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mgl-head mx-auto max-w-2xl text-center">
          <span className="mgl-eyebrow">
            <span aria-hidden className="mgl-eyebrow-rule" />
            Cove Journal
            <span aria-hidden className="mgl-eyebrow-rule" />
          </span>
          <h2 id="mgl-title" className="mgl-title">
            Real Mermaid Cove Moments
            <Sparkles className="mgl-title-spark" aria-hidden />
          </h2>
          <p className="mgl-sub">
            A look at the swimming, singing, crowning, pool games, and magical memories that make
            every Mermaid Cove visit feel unforgettable.
          </p>
        </div>

        {/* the cove-journal gallery */}
        <div className="mgl-grid mt-12 md:mt-14">
          <MomentCard {...FEATURED} variant="featured" i={0} />
          {TILES.map((t, i) => (
            <MomentCard key={t.label} {...t} variant="tile" i={i + 1} />
          ))}
        </div>

        {/* CTA + script sign-off */}
        <div className="mgl-cta-wrap">
          <CTAButton to="/contact" size="md" className="mgl-cta group">
            <Shell className="h-4 w-4" aria-hidden />
            View the Gallery
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </CTAButton>
          <p className="mgl-script">Real moments. Magical memories.</p>
        </div>
      </div>
    </section>
  );
}
