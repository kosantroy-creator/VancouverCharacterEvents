import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Camera, Flower2, Heart, Music, PawPrint, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import gBirthday from "@/assets/mascot/gallery/birthday-hug.webp";
import gDance from "@/assets/mascot/gallery/dance-party.webp";
import gPhoto from "@/assets/mascot/gallery/photo-garden.webp";
import gSchool from "@/assets/mascot/gallery/school-visit.webp";
import gFestival from "@/assets/mascot/gallery/festival-appearance.webp";

/**
 * MascotGallery — "Real Mascot Meadow Moments": the emotional-proof gallery, laid
 * out as a cheerful Meadow Memory Garden (one large featured memory + a 2x2 grid of
 * supporting memories) rather than a plain photo grid. Each photo sits in a cream
 * meadow frame with a small caption tag, a flower corner, and a gentle sunlight
 * sweep on hover; the featured memory carries a "Meadow Memory" stamp. Closed by a
 * "See More Meadow Moments" CTA and a small wooden planning note. Placeholder photos
 * are brand-safe original generic mascots — swap real event photos in later by
 * replacing the imports. VISIBLE BY DEFAULT (hidden only under
 * `.mgm.anim:not(.is-in)`), reduced-motion safe. See "MASCOT MEADOWS GALLERY" in
 * styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Moment = { src: string; label: string; icon: IconType; alt: string };

const FEATURED: Moment = {
  src: gBirthday,
  label: "Birthday Hug Moment",
  icon: Heart,
  alt: "A friendly costumed mascot sharing a warm hug with a delighted child at a sunny outdoor birthday party.",
};

const TILES: Moment[] = [
  {
    src: gDance,
    label: "Dance Party",
    icon: Music,
    alt: "A colourful costumed mascot dancing with a group of cheerful children at an outdoor party.",
  },
  {
    src: gPhoto,
    label: "Photo Garden",
    icon: Camera,
    alt: "A bunny mascot posing for a group photo with smiling children in a sunny sunflower garden.",
  },
  {
    src: gSchool,
    label: "School Visit",
    icon: BookOpen,
    alt: "A friendly mascot waving to excited children raising their hands in a bright classroom.",
  },
  {
    src: gFestival,
    label: "Festival Appearance",
    icon: Star,
    alt: "A mascot giving a happy child a high-five at a colourful outdoor festival.",
  },
];

const STAMPS = ["HUGS", "DANCING", "PHOTOS", "BIG SMILES"];

const PETALS = [
  { left: "12%", s: 9, delay: "0s", dur: "20s", dx: "13px", rot: "180deg", c: "#FFD25A" },
  { left: "38%", s: 7, delay: "4.4s", dur: "23s", dx: "-10px", rot: "240deg", c: "#F2B4CC" },
  { left: "64%", s: 8, delay: "1.6s", dur: "21s", dx: "12px", rot: "120deg", c: "#7CC86A" },
  { left: "88%", s: 7, delay: "5.6s", dur: "24s", dx: "-11px", rot: "300deg", c: "#5BB7E6" },
] as const;

function MomentCard({ m, featured, i }: { m: Moment; featured?: boolean; i: number }) {
  const Icon = m.icon;
  return (
    <figure
      className={cn("mgm-card", featured ? "mgm-featured" : "mgm-tile")}
      style={{ "--i": i } as Vars}
    >
      <img src={m.src} alt={m.alt} loading="lazy" decoding="async" className="mgm-img" />
      <span aria-hidden className="mgm-frame" />
      <span aria-hidden className="mgm-sheen" />
      <span aria-hidden className="mgm-view">
        <Camera className="h-4 w-4" />
        View Moment
      </span>
      {featured ? (
        <span aria-hidden className="mgm-stamp">
          <PawPrint className="h-3.5 w-3.5" />
          Meadow Memory
        </span>
      ) : null}
      <figcaption className="mgm-tag">
        <Icon className="mgm-tag-ic h-3.5 w-3.5" aria-hidden />
        {m.label}
      </figcaption>
      <Flower2 aria-hidden className="mgm-corner-flower h-4 w-4" />
    </figure>
  );
}

export function MascotGallery() {
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
      aria-labelledby="mgm-title"
      className={cn("mgm relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mgm-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mgm-sun" />
        <span className="mgm-bunting" />
        <span className="mgm-corner mgm-corner-l" />
        <span className="mgm-corner mgm-corner-r" />
        {motionOK
          ? PETALS.map((p, i) => (
              <span
                key={i}
                className="mgm-petal"
                style={
                  {
                    left: p.left,
                    width: p.s,
                    height: p.s,
                    animationDelay: p.delay,
                    animationDuration: p.dur,
                    "--dx": p.dx,
                    "--rot": p.rot,
                    "--c": p.c,
                  } as Vars
                }
              />
            ))
          : null}
      </div>
      <div aria-hidden className="mgm-grass pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mgm-head mx-auto max-w-3xl text-center">
          <span className="mgm-eyebrow">
            <Flower2 className="h-3.5 w-3.5" aria-hidden />
            Meadow Memories
            <Flower2 className="h-3.5 w-3.5 -scale-x-100" aria-hidden />
          </span>
          <h2 id="mgm-title" className="mgm-title">
            Real Mascot Meadow Moments
          </h2>
          <p className="mgm-sub">
            A glimpse at the hugs, dancing, photos, birthday spotlights, school visits, festival
            appearances, and big friendly reactions that make Mascot Meadows feel unforgettable.
          </p>
          <span className="mgm-stamprow">
            {STAMPS.map((s, i) => (
              <span key={s} className="mgm-stamprow-item">
                {i > 0 ? <PawPrint className="mgm-stamprow-dot h-3 w-3" aria-hidden /> : null}
                {s}
              </span>
            ))}
          </span>
        </div>

        {/* gallery */}
        <div className="mgm-grid">
          <MomentCard m={FEATURED} featured i={0} />
          {TILES.map((m, i) => (
            <MomentCard key={m.label} m={m} i={i + 1} />
          ))}
        </div>

        {/* CTA + note */}
        <div className="mgm-foot">
          <Link to="/gallery" className="mgm-cta group">
            <Camera className="h-4 w-4" aria-hidden />
            See More Meadow Moments
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <p className="mgm-cta-sub">
            Big smiles. Easy photos. Happy memories.
            <Heart className="mgm-cta-heart h-3.5 w-3.5" aria-hidden />
          </p>
          <p className="mgm-note">
            <PawPrint className="h-3.5 w-3.5" aria-hidden />
            Every visit is shaped around the mascot style, event setting, age range, and the moments
            you want to create.
          </p>
        </div>
      </div>
    </section>
  );
}
