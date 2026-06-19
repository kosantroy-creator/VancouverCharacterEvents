import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { ArrowRight, Check, Clock, Compass, Footprints, Leaf, Users } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";

/**
 * ExpeditionPackages — "Choose Your Expedition". The themed pricing section after
 * the comparison: three expedition passes laid out like field permits on a desk,
 * with the middle "Birthday Expedition" the featured/recommended pass (gold frame,
 * glow, Signature Expedition stamp, raised). Placeholder pricing ($X99 / Custom
 * Quote) — no invented numbers. Reveals are IntersectionObserver-driven and
 * visible-by-default, so reduced-motion / pre-JS render gets it composed & still.
 * Carries the #expedition anchor the "Choose Your Expedition" CTAs scroll to.
 * See the "EXPEDITION PACKAGES" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

function DinoTrack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 104" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="74" rx="19" ry="23" />
      <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
      <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
      <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
    </svg>
  );
}

type Pkg = {
  id: string;
  name: string;
  icon: IconType;
  bestFor: string;
  priceTop: string;
  priceMain: string;
  duration: string;
  durIcon: IconType;
  includes: string[];
  cta: string;
  featured?: boolean;
  ctaClass: string;
};

const PACKAGES: Pkg[] = [
  {
    id: "dino-discovery",
    name: "Dino Discovery",
    icon: Footprints,
    bestFor: "Best for smaller birthdays and quick dino visits.",
    priceTop: "From",
    priceMain: "$X99",
    duration: "60 minutes",
    durIcon: Clock,
    includes: [
      "Harvey appearance",
      "Safari trainer",
      "Simple dino intro",
      "Photo moment",
      "Birthday child feature",
    ],
    cta: "Request Dino Discovery",
    ctaClass: "!bg-[#5C8A4E] !text-white hover:!bg-[#6E9A5E]",
  },
  {
    id: "birthday-expedition",
    name: "Birthday Expedition",
    icon: DinoTrack,
    featured: true,
    bestFor: "The full Junior Dinosaur Trainer Academy experience.",
    priceTop: "From",
    priceMain: "$X99",
    duration: "90 minutes",
    durIcon: Clock,
    includes: [
      "Trainer-led academy",
      "Fossils, clues, eggs, and commands",
      "Harvey reveal",
      "Birthday child Lead Trainer moment",
      "Organized photos",
      "Graduation ending",
    ],
    cta: "Request Birthday Expedition",
    ctaClass:
      "!bg-[#D4A017] !text-[#2A1C05] hover:!bg-[#D99A32] hover:!shadow-[0_0_30px_rgba(212,160,23,0.45)]",
  },
  {
    id: "jurassic-takeover",
    name: "Jurassic Takeover",
    icon: Users,
    bestFor: "For schools, festivals, malls, corporate events, and large groups.",
    priceTop: "",
    priceMain: "Custom Quote",
    duration: "Large events",
    durIcon: Users,
    includes: [
      "Large crowd flow",
      "Extended appearance options",
      "Trainer-led crowd control",
      "Photo station or activation",
      "Custom schedule",
      "Public event support",
    ],
    cta: "Plan a Jurassic Takeover",
    ctaClass: "!bg-[#2E4A38] !text-white hover:!bg-[#23381f]",
  },
];

export function ExpeditionPackages() {
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
      id="expedition"
      aria-labelledby="pkg-title"
      className={cn(
        "pkg relative isolate scroll-mt-24 overflow-hidden",
        motionOK && "anim",
        inView && "is-in",
      )}
    >
      {/* aged-parchment ground + faint tracks + corner foliage */}
      <div aria-hidden className="pkg-paper absolute inset-0" />
      <div aria-hidden className="pkg-tex pointer-events-none absolute inset-0" />
      <div aria-hidden className="pkg-prints pointer-events-none absolute inset-0">
        <DinoTrack className="absolute left-[5%] top-[26%] w-7 rotate-[16deg]" />
        <DinoTrack className="absolute left-[10%] top-[64%] w-6 -rotate-[10deg]" />
        <DinoTrack className="absolute right-[7%] top-[30%] w-7 rotate-[22deg]" />
        <DinoTrack className="absolute right-[12%] bottom-[14%] w-6 -rotate-[14deg]" />
      </div>
      <div aria-hidden className="pkg-frond pkg-frond-tl">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>
      <div aria-hidden className="pkg-frond pkg-frond-br">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="pkg-eyebrow">
            <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
            Expedition Packages
            <Leaf className="h-3 w-3 -scale-x-100 text-[#6E9A5E]" aria-hidden />
          </span>
          <h2 id="pkg-title" className="pkg-title">
            Choose Your Expedition
          </h2>
          <p className="pkg-sub">
            Pick the visit that fits your party, school, festival, or full Jurassic takeover.
          </p>
          <p className="pkg-note-line">
            Every expedition includes trained handlers, a structured experience, and a memorable
            Harvey moment.
          </p>
        </div>

        {/* the three passes */}
        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <article
              key={p.id}
              className={cn("pkg-card-frame", p.featured ? "pkg-feat-frame" : "pkg-plain-frame")}
              style={{ "--i": i } as Vars}
            >
              <div className={cn("pkg-card", p.featured && "pkg-feat")}>
                {p.featured ? <span className="pkg-stamp">Signature Expedition</span> : null}

                <span className={cn("pkg-medal", p.featured && "pkg-medal-gold")}>
                  <p.icon className="h-6 w-6" />
                </span>

                <h3 className={cn("pkg-name", p.featured && "pkg-name-gold")}>{p.name}</h3>
                <p className="pkg-bestfor">{p.bestFor}</p>

                <div className="pkg-price-row">
                  <div className="pkg-price">
                    {p.priceTop ? <span className="pkg-price-top">{p.priceTop}</span> : null}
                    <span
                      className={cn("pkg-price-main", p.priceMain.length > 6 && "pkg-price-sm")}
                    >
                      {p.priceMain}
                    </span>
                  </div>
                  <span className="pkg-price-div" aria-hidden />
                  <div className="pkg-dur">
                    <p.durIcon className="h-5 w-5 text-[#6E9A5E]" aria-hidden />
                    <span className="pkg-dur-label">{p.duration}</span>
                  </div>
                </div>

                <ul className="pkg-list">
                  {p.includes.map((h, j) => (
                    <li key={h} className="pkg-item" style={{ "--j": j } as Vars}>
                      <span className={cn("pkg-tick", p.featured && "pkg-tick-gold")} aria-hidden>
                        <Check className="h-3 w-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <CTAButton
                  to="/contact"
                  className={cn("pkg-cta group mt-auto w-full justify-center", p.ctaClass)}
                >
                  {p.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </CTAButton>
              </div>
            </article>
          ))}
        </div>

        {/* "help me choose" ticket */}
        <div className="pkg-help">
          <span className="pkg-help-ic" aria-hidden>
            <Compass className="h-5 w-5" />
          </span>
          <div className="pkg-help-text">
            <p className="pkg-help-h">Not sure which expedition fits?</p>
            <p className="pkg-help-p">
              Tell us your event size, date, and venue — we&apos;ll help recommend the right option.
            </p>
          </div>
          <CTAButton
            to="/contact"
            className="pkg-cta group shrink-0 !bg-[#2E4A38] !text-white hover:!bg-[#23381f]"
          >
            Help Me Choose
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
