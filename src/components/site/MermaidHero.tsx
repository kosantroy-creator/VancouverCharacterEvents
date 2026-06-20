import { useEffect, useState, type CSSProperties } from "react";
import { Anchor, ChevronDown, Droplets, Play, Shell, Sun, Waves, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import heroPoster from "@/assets/mermaid/mermaid-hero-poster.webp";

/**
 * MermaidHero — Section 1 of the Mermaid Cove page. The vibrant cove film plays
 * full-bleed; the copy sits directly on the art at the left over a soft pearl-aqua
 * wash — the same lockup → headline → reel → CTAs → trust-row composition as the
 * Princess, Hero and Jurassic heroes (no glass panel). A "Vancouver / Mermaid Cove
 * / Events" wordmark, a display headline, a descriptive line, a "Watch Us In
 * Action" reel, two CTAs and a trust row. Drifting bubbles add life and a soft
 * tide-wash flows the hero into the trust strip below. Reduced-motion safe (the
 * global guard pauses the loops; entrances use the shared Reveal). See the
 * "MERMAID COVE HERO" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
const VIDEO_SRC = "/video/mermaid-cove-hero.mp4";

/* Deterministic rising bubbles (identical on server & client). `c` tints each
   bubble across the cove range — aqua, periwinkle-blue, and a soft shell-coral. */
const AQUA = "#9FF3E8";
const PERI = "#C2C9F2";
const CORAL = "#F7CBC2";
const BUBBLES = [
  { left: "5%", bottom: "-6%", s: 12, delay: "0s", dur: "15s", dx: "18px", c: AQUA },
  { left: "14%", bottom: "-8%", s: 8, delay: "3.2s", dur: "18s", dx: "-12px", c: PERI },
  { left: "24%", bottom: "-5%", s: 15, delay: "1.4s", dur: "16s", dx: "22px", c: AQUA },
  { left: "34%", bottom: "-7%", s: 7, delay: "5.1s", dur: "20s", dx: "-16px", c: CORAL },
  { left: "62%", bottom: "-6%", s: 10, delay: "2.3s", dur: "17s", dx: "14px", c: AQUA },
  { left: "72%", bottom: "-9%", s: 9, delay: "6s", dur: "19s", dx: "-20px", c: PERI },
  { left: "81%", bottom: "-5%", s: 14, delay: "0.8s", dur: "15.5s", dx: "16px", c: AQUA },
  { left: "89%", bottom: "-7%", s: 8, delay: "4.2s", dur: "18.5s", dx: "-14px", c: PERI },
  { left: "95%", bottom: "-6%", s: 11, delay: "2.9s", dur: "16.5s", dx: "18px", c: AQUA },
] as const;

const TRUST = [
  { icon: Shell, label: "Swimming mermaids" },
  { icon: Anchor, label: "Pirate handler included" },
  { icon: Droplets, label: "Public & private pools" },
  { icon: Sun, label: "Perfect for summer parties" },
] as const;

export function MermaidHero() {
  return (
    <section
      id="cove"
      aria-label="Vancouver Mermaid Cove Events"
      className="mco-hero relative isolate flex min-h-[94svh] items-center overflow-hidden"
    >
      {/* the cove film — full-bleed, looping + muted, poster for first paint */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[58%_44%]"
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

      {/* left pearl-aqua wash — keeps the deep-teal copy legible over the bright film */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, rgba(228,246,250,0.97) 0%, rgba(228,246,250,0.9) 26%, rgba(228,246,250,0.55) 46%, rgba(228,246,250,0.16) 62%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-40"
        style={{ background: "linear-gradient(180deg, rgba(228,246,250,0.82), transparent)" }}
      />
      {/* gentle overall lift on small screens so copy stays crisp over the art */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#E4F6FA]/30 sm:hidden" />

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
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="max-w-xl">
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <span aria-hidden className="inline-flex items-center gap-2">
                <Shell className="h-5 w-5 shrink-0 text-[var(--chapter-mermaid)]" aria-hidden />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.65rem)] tracking-[0.2em] text-[var(--chapter-mermaid-deep)]">
                  Vancouver
                </span>
              </span>
              <h1 className="sr-only">Vancouver Mermaid Cove Events</h1>
              <span
                aria-hidden
                className="t-script-hero mt-1 block text-[clamp(2.6rem,7.4vw,4.8rem)] leading-[0.9] text-[var(--chapter-mermaid-deep)]"
                style={{ textShadow: "0 2px 16px rgba(255,255,255,0.9)" }}
              >
                Mermaid Cove
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[var(--chapter-mermaid-deep)]"
              >
                <Waves className="h-3 w-3 text-[var(--chapter-mermaid)]" aria-hidden />
                Events
                <Waves className="h-3 w-3 -scale-x-100 text-[var(--chapter-mermaid)]" aria-hidden />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{
                  background:
                    "linear-gradient(90deg, var(--chapter-mermaid), #D9B25A 55%, transparent)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={200} y={16}>
            <p className="t-display mt-3 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug text-[#0E5A66]">
              Real swimming mermaids for unforgettable pool parties
            </p>
          </Reveal>

          <Reveal delay={260} y={16}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#0E5A66]/85">
              Bring ocean magic to your next celebration with real mermaids and playful pirate
              handlers — storytime, singing, crowning, mermaid rides, swim moments and summer games
              for public and private pool events.
            </p>
          </Reveal>

          <Reveal delay={300} y={14}>
            <MermaidReel />
          </Reveal>

          <Reveal delay={340} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                to="/contact"
                size="lg"
                className="group cta-pulse !bg-[var(--chapter-mermaid)] !text-[#06363E] hover:!bg-[var(--chapter-mermaid-deep)] hover:!text-white hover:!shadow-[0_0_30px_rgba(54,190,176,0.45)]"
              >
                <Shell className="h-4 w-4" aria-hidden />
                Book Mermaid Cove
              </CTAButton>
              <CTAButton
                href="#cove-trust"
                variant="ghost"
                size="lg"
                className="!border-[var(--chapter-mermaid-deep)]/45 !bg-white/75 !text-[var(--chapter-mermaid-deep)] hover:!border-[var(--chapter-mermaid)] hover:!text-[var(--chapter-mermaid-deep)]"
              >
                Meet the Mermaids
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[var(--chapter-mermaid-deep)]"
                >
                  <Icon className="h-4 w-4 text-[var(--chapter-mermaid)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* ===================== TIDE-WASH → trust strip ===================== */}
      <div aria-hidden className="mco-tide pointer-events-none absolute inset-x-0 bottom-0">
        <span className="mco-tide-mist" />
        <svg
          className="mco-tide-wave"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,72 C220,118 420,30 720,58 C1010,84 1220,128 1440,84 L1440,130 L0,130 Z"
            fill="#B4E5F1"
          />
          <path
            d="M0,72 C220,118 420,30 720,58 C1010,84 1220,128 1440,84"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--chapter-mermaid-deep)]/50"
      >
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   "Watch Us In Action" — a white play-pill + a lazy fullscreen video modal
   (matches the Princess / Hero reel styling).
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-7 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--chapter-mermaid)]/30 bg-white/85 py-2 pl-2 pr-5 text-left backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--chapter-mermaid)]"
      >
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--chapter-mermaid)] to-[var(--chapter-mermaid-deep)] text-white shadow-[0_6px_16px_-6px_rgba(14,110,126,0.7)]">
          <span
            aria-hidden
            className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--chapter-mermaid)]/50"
          />
          <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-[var(--chapter-mermaid-deep)]">
            Featured Reel
          </span>
          <span className="text-[0.98rem] font-bold text-[#0E5A66]">Watch Us In Action</span>
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
