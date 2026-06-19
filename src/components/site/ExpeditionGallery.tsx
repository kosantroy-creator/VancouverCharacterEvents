import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  ArrowRight,
  Camera,
  Compass,
  GraduationCap,
  Leaf,
  PartyPopper,
  School,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";
import bigEntrance from "@/assets/dinosaur/gallery/big-entrance.webp";
import birthdayReveal from "@/assets/dinosaur/gallery/birthday-reveal.webp";
import trainerAcademy from "@/assets/dinosaur/gallery/trainer-academy.webp";
import photoMoment from "@/assets/dinosaur/gallery/photo-moment.webp";
import schoolVisit from "@/assets/dinosaur/gallery/school-visit.webp";

/**
 * ExpeditionGallery — "See Harvey in Action". The emotional-proof section after
 * pricing: a field-journal gallery (a large featured "hero moment" + a 2×2 grid of
 * smaller moments) where each photo reads like a print laid into an expedition log
 * — cream borders, field-note caption tabs, soft shadows. Reveals are
 * IntersectionObserver-driven and visible-by-default, so reduced-motion / pre-JS
 * render gets it composed & still. Placeholder photos (brand-safe originals) are
 * ready to swap for real event photos. See the "EXPEDITION GALLERY" CSS block.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const FEATURED = {
  src: bigEntrance,
  label: "Big Entrance",
  icon: Leaf as IconType,
  alt: "Harvey, our friendly life-sized T-Rex, makes his big entrance as delighted children and a safari trainer look on",
};

const SMALL: { src: string; label: string; icon: IconType; alt: string }[] = [
  {
    src: birthdayReveal,
    label: "Birthday Reveal",
    icon: PartyPopper,
    alt: "Children cheering with joy at a birthday party as Harvey the friendly dinosaur appears",
  },
  {
    src: trainerAcademy,
    label: "Trainer Academy",
    icon: GraduationCap,
    alt: "A safari trainer leading the Junior Dinosaur Trainer Academy with a smiling group of kids",
  },
  {
    src: photoMoment,
    label: "Photo Moment",
    icon: Camera,
    alt: "A young explorer posing for a photo beside Harvey the friendly dinosaur",
  },
  {
    src: schoolVisit,
    label: "School Visit",
    icon: School,
    alt: "Harvey the friendly dinosaur visiting a school assembly as children raise their hands",
  },
];

export function ExpeditionGallery() {
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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="gal-title"
      className={cn("gal relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* aged-parchment ground + faint tracks + corner foliage */}
      <div aria-hidden className="gal-paper absolute inset-0" />
      <div aria-hidden className="gal-tex pointer-events-none absolute inset-0" />
      <div aria-hidden className="gal-prints pointer-events-none absolute inset-0">
        <GalTrack className="absolute right-[6%] top-[8%] w-8 rotate-[18deg]" />
        <GalTrack className="absolute right-[11%] top-[15%] w-7 rotate-[24deg]" />
        <GalTrack className="absolute left-[7%] bottom-[20%] w-7 -rotate-[12deg]" />
      </div>
      <div aria-hidden className="gal-frond gal-frond-bl">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>
      <div aria-hidden className="gal-frond gal-frond-br">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>

      {/* field-notes stamp (desktop) */}
      <div aria-hidden className="gal-stamp">
        <span className="gal-stamp-lg">Field Notes</span>
        <span className="gal-stamp-sm">Real Moments · Real Memories</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="gal-eyebrow">
            <Compass className="h-3.5 w-3.5 text-[#9c7406]" aria-hidden />
            Expedition Log
          </span>
          <h2 id="gal-title" className="gal-title">
            See Harvey in Action
          </h2>
          <p className="gal-sub">
            Real birthday parties, school visits, trainer-led moments, and photo memories that make
            every expedition unforgettable.
          </p>
        </div>

        {/* the journal spread */}
        <div className="gal-grid mt-12 md:mt-14">
          <figure className="gal-photo gal-featured" style={{ "--i": 0 } as Vars}>
            <img src={FEATURED.src} alt={FEATURED.alt} className="gal-img" loading="lazy" />
            <span className="gal-label">
              <FEATURED.icon className="h-3.5 w-3.5" aria-hidden />
              {FEATURED.label}
            </span>
          </figure>

          <div className="gal-small-grid">
            {SMALL.map((p, i) => (
              <figure key={p.label} className="gal-photo" style={{ "--i": i + 1 } as Vars}>
                <img src={p.src} alt={p.alt} className="gal-img" loading="lazy" />
                <span className="gal-label">
                  <p.icon className="h-3.5 w-3.5" aria-hidden />
                  {p.label}
                </span>
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gal-cta-row">
          <CTAButton
            to="/gallery"
            size="lg"
            className="gal-cta group !bg-[#23381f] !text-[#F4E2A6] ring-2 ring-[#D4A017]/55 ring-offset-2 ring-offset-transparent hover:!bg-[#2E4A38] hover:ring-[#D4A017]"
          >
            <Compass className="h-4 w-4" aria-hidden />
            View the Gallery
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </CTAButton>
          <span className="gal-handwrite">Real moments. Lasting memories.</span>
        </div>
      </div>
    </section>
  );
}

/** A 3-toed dinosaur track for the background. */
function GalTrack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 104" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="74" rx="19" ry="23" />
      <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
      <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
      <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
    </svg>
  );
}
