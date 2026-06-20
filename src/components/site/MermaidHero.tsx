import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Droplets,
  Play,
  Sparkles as SparklesIcon,
  Sun,
  Waves,
  X,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import heroPoster from "@/assets/mermaid/mermaid-hero-poster.webp";

/**
 * MermaidHero — Section 1 of the Mermaid Cove page. A bright, aquatic full-bleed
 * hero: the looping cove film plays across the whole 16:9 backdrop while the
 * premium copy lockup sits on the left over a pearl-aqua wash (same composition
 * as the Jurassic / Princess / Hero heroes). Drifting bubbles + a shimmering
 * script name layer over the top. A "Watch in action" reel opens the clip larger.
 * The video supplies the motion, so the foreground UI is only gently animated.
 * Reduced-motion safe (the global guard pauses the loops; entrances use Reveal).
 * Palette echoes the homepage cove panel — aqua #36BEB0 · periwinkle #9AA8E6 ·
 * deep teal #0E6E7E · pearl. See the "MERMAID COVE HERO" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
const VIDEO_SRC = "/video/mermaid-cove-hero.mp4";

/* Deterministic rising bubbles (identical on server & client). `c` tints each
   bubble across the cove range — aqua, periwinkle-blue, and a soft shell-coral. */
const AQUA = "#9FF3E8";
const PERI = "#C2C9F2";
const CORAL = "#F7CBC2";
const BUBBLES = [
  { left: "6%", bottom: "-6%", s: 12, delay: "0s", dur: "15s", dx: "18px", c: AQUA },
  { left: "16%", bottom: "-8%", s: 8, delay: "3.2s", dur: "18s", dx: "-12px", c: PERI },
  { left: "27%", bottom: "-5%", s: 16, delay: "1.4s", dur: "16s", dx: "22px", c: AQUA },
  { left: "39%", bottom: "-7%", s: 7, delay: "5.1s", dur: "20s", dx: "-16px", c: CORAL },
  { left: "52%", bottom: "-6%", s: 11, delay: "2.3s", dur: "17s", dx: "14px", c: PERI },
  { left: "63%", bottom: "-9%", s: 9, delay: "6s", dur: "19s", dx: "-20px", c: AQUA },
  { left: "74%", bottom: "-5%", s: 14, delay: "0.8s", dur: "15.5s", dx: "16px", c: PERI },
  { left: "84%", bottom: "-7%", s: 8, delay: "4.2s", dur: "18.5s", dx: "-14px", c: AQUA },
  { left: "92%", bottom: "-6%", s: 12, delay: "2.9s", dur: "16.5s", dx: "18px", c: PERI },
] as const;

const INFO = [
  { icon: Waves, label: "Swimming mermaids" },
  { icon: Anchor, label: "Pirate handler included" },
  { icon: Droplets, label: "Public & private pools" },
  { icon: Sun, label: "Perfect for summer parties" },
] as const;

export function MermaidHero() {
  return (
    <section
      id="cove"
      aria-label="Vancouver Mermaid Cove Events"
      className="mco-hero relative isolate flex min-h-[92svh] items-center overflow-hidden"
    >
      {/* the cove film — plays across the whole backdrop, looping + muted with a
          poster for first paint. Cropped so the glowing grotto sits to the right
          of the copy. */}
      <video
        className="absolute inset-0 -z-40 h-full w-full object-cover object-[58%_44%]"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A glowing turquoise mermaid cove with shimmering water and warm lantern light"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* a left-only cove wash keeps the copy crisp while the vibrant film comes
          through everywhere else — pale aqua → sky-blue → lavender, fading out fast
          so the right of the frame stays full-strength and saturated */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, rgba(234,251,250,0.95) 0%, rgba(228,244,251,0.86) 22%, rgba(233,237,250,0.5) 40%, rgba(240,237,251,0.14) 56%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-40"
        style={{ background: "linear-gradient(180deg, rgba(234,247,251,0.78), transparent)" }}
      />
      {/* a light top-weighted lift on small screens so the copy stays crisp while
          the lower film stays vibrant */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(230,242,251,0.6) 0%, rgba(230,242,251,0.34) 42%, transparent 72%)",
        }}
      />

      {/* drifting bubbles over the whole section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mco-bubble"
            style={
              {
                left: b.left,
                bottom: b.bottom,
                width: b.s,
                height: b.s,
                animationDelay: b.delay,
                animationDuration: b.dur,
                "--dx": b.dx,
                "--bub": b.c,
              } as Vars
            }
          />
        ))}
      </div>

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-24 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="max-w-xl">
          <Reveal y={14}>
            <span className="mco-eyebrow">
              <SparklesIcon className="h-3 w-3 text-[var(--chapter-mermaid)]" aria-hidden />
              Chapter 04 · Ocean Magic · Summer Splash
            </span>
          </Reveal>

          <Reveal delay={100} y={16}>
            <div className="mt-4 flex flex-col items-start leading-none">
              <span className="mco-brand">
                <Waves className="h-4 w-4 text-[var(--chapter-mermaid-deep)]" aria-hidden />
                Vancouver
              </span>
              <h1 className="sr-only">Vancouver Mermaid Cove Events</h1>
              <span aria-hidden className="mco-name">
                Mermaid Cove
              </span>
              <span aria-hidden className="mco-events">
                <span className="mco-events-star">✦</span> Events{" "}
                <span className="mco-events-star">✦</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={200} y={14}>
            <p className="mco-headline mt-6">
              Real swimming mermaids for unforgettable pool parties
            </p>
          </Reveal>

          <Reveal delay={270} y={14}>
            <p className="mco-body mt-4 max-w-lg">
              Bring ocean magic to your next celebration with real mermaids and playful pirate
              handlers. Mermaid Cove visits include storytime, singing, crowning, mermaid rides,
              swim moments, and summer games for public and private pool events.
            </p>
          </Reveal>

          <Reveal delay={340} y={14}>
            <div className="mt-7">
              <MermaidReel />
            </div>
          </Reveal>

          <Reveal delay={400} y={14}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton to="/contact" size="lg" className="mco-cta-primary group">
                Book Mermaid Cove
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton href="#cove-trust" variant="ghost" size="lg" className="mco-cta-ghost">
                Meet the Mermaids
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={460} y={12}>
            <Link to="/pricing" className="mco-pkg-link">
              See pool packages
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={520} y={12}>
            <ul className="mco-info">
              {INFO.map(({ icon: Icon, label }) => (
                <li key={label} className="mco-info-pill">
                  <Icon className="h-3.5 w-3.5 text-[var(--chapter-mermaid-deep)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* soft pearl fade at the very base so the hero melts into the trust strip */}
      <div
        aria-hidden
        className="mco-base-fade pointer-events-none absolute inset-x-0 bottom-0 z-0"
      />
    </section>
  );
}

/* ---------------------------------------------------------------------------
   "Watch in action" — a featured reel button + a lazy video modal. The video
   only mounts when opened, so nothing extra loads on first paint.
   --------------------------------------------------------------------------- */
function MermaidReel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="mco-reel group">
        <span className="mco-reel-play">
          <span aria-hidden className="mco-reel-ring" />
          <Play className="h-4 w-4 translate-x-px fill-current" aria-hidden />
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="mco-reel-eyebrow">Featured Reel</span>
          <span className="mco-reel-title">Watch Mermaid Cove in action</span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#06343A]/92 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mermaid Cove reel"
        >
          <video
            src={VIDEO_SRC}
            poster={heroPoster}
            autoPlay
            controls
            loop
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88svh] w-auto max-w-[96vw] rounded-[var(--radius-lg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
          <button
            type="button"
            aria-label="Close reel"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </>
  );
}
