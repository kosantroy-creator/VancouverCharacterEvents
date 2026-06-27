import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Palette, PartyPopper, Sparkles, Tent } from "lucide-react";
import { cn } from "@/lib/utils";
import bazaarHero from "@/assets/bazaar/bazaar-hero.webp";
import stallFace from "@/assets/bazaar/stalls/stall-face-painting.webp";
import stallBalloon from "@/assets/bazaar/stalls/stall-balloon.webp";
import stallPhoto from "@/assets/bazaar/stalls/stall-photography.webp";
import stallInflatable from "@/assets/bazaar/stalls/stall-inflatable.webp";

/**
 * BazaarGallery — "Real Bazaar Moments": the proof / gallery section after Build
 * Your Bazaar Mix. A glowing night-market memory wall — one large featured framed
 * memory + a 2x2 of service-themed memory cards (face painting · balloon twisting ·
 * photography · inflatable partner add-on), each in a cream/gold frame with a
 * caption tag and a service accent. Cream parchment base + jewel tones, amber
 * lantern glow. Placeholder imagery (the bazaar stall scenes) is framed as gallery
 * memories and is ready to swap for real event photos later. Partner language for
 * inflatables. VISIBLE BY DEFAULT (hidden only under `.bzg.anim:not(.is-in)`),
 * reduced-motion safe. See "ENCHANTED BAZAAR GALLERY" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Shot = { img: string; label: string; alt: string; icon: IconType; acc: string; accDeep: string; pos?: string };

const FEATURED: Shot = {
  img: bazaarHero,
  label: "Colourful Party Moment",
  alt: "A glowing enchanted night market full of colour, lanterns, balloons, and celebration.",
  icon: Sparkles,
  acc: "#C28A2E",
  accDeep: "#9A6E2B",
  pos: "center 42%",
};

const SHOTS: Shot[] = [
  {
    img: stallFace,
    label: "Face Painting Details",
    alt: "A face painting stall with colourful, photo-friendly designs and glitter.",
    icon: Palette,
    acc: "#1E8A9E",
    accDeep: "#156B7A",
  },
  {
    img: stallBalloon,
    label: "Balloon Twisting Fun",
    alt: "A balloon twisting stall with playful balloon creations for guests.",
    icon: PartyPopper,
    acc: "#C8556E",
    accDeep: "#A23A54",
  },
  {
    img: stallPhoto,
    label: "Photo Moments",
    alt: "An event photography stall set up to capture guest reactions and details.",
    icon: Camera,
    acc: "#3E6EA8",
    accDeep: "#2C5282",
  },
  {
    img: stallInflatable,
    label: "Inflatable Partner Add-On",
    alt: "An inflatable partner add-on setup for larger parties and community events.",
    icon: Tent,
    acc: "#8E2D6E",
    accDeep: "#6E2356",
  },
];

const DUST = [
  { left: "12%", s: 4, delay: "0s", dur: "18s", dx: "9px", c: "#E2C271" },
  { left: "38%", s: 3, delay: "3.4s", dur: "21s", dx: "-7px", c: "#F0C674" },
  { left: "60%", s: 4, delay: "1.6s", dur: "19s", dx: "10px", c: "#F4A93B" },
  { left: "86%", s: 3, delay: "4.8s", dur: "22s", dx: "-9px", c: "#E2C271" },
] as const;

function MemoryCard({ shot, featured }: { shot: Shot; featured?: boolean }) {
  const Icon = shot.icon;
  return (
    <figure
      className={cn("bzg-card", featured && "bzg-card--featured")}
      style={{ "--ca": shot.acc, "--cad": shot.accDeep } as Vars}
    >
      <div className="bzg-photo-wrap">
        <img
          className="bzg-photo"
          src={shot.img}
          alt={shot.label + " — " + shot.alt}
          loading="lazy"
          decoding="async"
          style={shot.pos ? { objectPosition: shot.pos } : undefined}
        />
        <span aria-hidden className="bzg-photo-shade" />
        <span aria-hidden className="bzg-photo-sheen" />
        {featured ? <span aria-hidden className="bzg-stamp">Moment Made</span> : null}
      </div>
      <figcaption className="bzg-label">
        <span aria-hidden className="bzg-label-ic"><Icon className="h-3.5 w-3.5" /></span>
        {shot.label}
      </figcaption>
    </figure>
  );
}

export function BazaarGallery() {
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
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="bzg-title"
      className={cn("bzg relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="bzg-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bzg-glow" />
        <span className="bzg-stalls bzg-stalls-l" />
        <span className="bzg-stalls bzg-stalls-r" />
        <Palette className="bzg-corner bzg-corner-tl" aria-hidden />
        <Camera className="bzg-corner bzg-corner-br" aria-hidden />
        {motionOK ? (
          <>
            {DUST.map((d, i) => (
              <span
                key={`d${i}`}
                className="bzg-dust"
                style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx, "--c": d.c } as Vars}
              />
            ))}
          </>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bzg-head mx-auto max-w-2xl text-center">
          <span className="bzg-eyebrow">
            <span aria-hidden className="bzg-eyebrow-fl" />
            Bazaar Memories
            <span aria-hidden className="bzg-eyebrow-fl bzg-eyebrow-fl--r" />
          </span>
          <h2 id="bzg-title" className="bzg-title">Real Bazaar Moments</h2>
          <p className="bzg-sub">
            A glimpse at the colour, activity, photos, balloon creations, partner add-ons, and guest
            moments that help make celebrations feel fuller from start to finish.
          </p>
          <span className="bzg-tags">
            <Sparkles className="h-3 w-3" aria-hidden />
            Face Painting · Balloons · Photos · Event Add-Ons
          </span>
        </div>

        {/* memory wall */}
        <div className="bzg-gallery">
          <MemoryCard shot={FEATURED} featured />
          {SHOTS.map((s) => (
            <MemoryCard key={s.label} shot={s} />
          ))}
        </div>

        <p className="bzg-partner-note">
          Partner add-on imagery is illustrative — inflatable add-ons are available through trusted
          partner vendors where applicable.
        </p>

        {/* CTA */}
        <div className="bzg-cta">
          <p className="bzg-cta-tag">Colour. Activity. Photos. Guest moments.</p>
          <div className="bzg-cta-actions">
            <a href="#bazaar-builder" className="bzg-cta-primary group">
              <Sparkles className="h-4 w-4" aria-hidden />
              Build My Bazaar Mix
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <Link to="/pricing" className="bzg-cta-ghost">Request Add-On Pricing</Link>
          </div>
          <p className="bzg-cta-note">
            Every add-on plan is shaped around your event type, guest count, space, schedule, and
            partner availability.
          </p>
        </div>
      </div>
    </section>
  );
}
