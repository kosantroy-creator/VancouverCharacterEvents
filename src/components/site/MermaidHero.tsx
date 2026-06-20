import { useEffect, useState, type CSSProperties } from "react";
import { Anchor, Droplets, Play, Shell, Sun, Waves, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import heroPoster from "@/assets/mermaid/mermaid-hero-poster.webp";

/**
 * MermaidHero — Section 1 of the Mermaid Cove page. The vibrant cove film plays
 * full-bleed; a frosted pearl-aqua glass panel floats on the left holding the
 * lockup, headline, CTAs and feature badges — translucent so the water shimmers
 * through, with a light gold trim and a faint caustic shimmer. The panel rises in
 * like it's surfacing through water; the copy then staggers in; the pills bubble
 * up one by one. A soft tide-wash flows the hero into the trust strip below.
 * The video carries the motion, so the UI animation stays calm. Reduced-motion
 * safe (the global guard pauses the loops; entrances use the shared Reveal).
 * See the "MERMAID COVE HERO" block in styles.css.
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

/* Soft particles drifting around the glass panel. */
const DUST = [
  { left: "8%", top: "18%", s: 5, delay: "0s", dur: "9s" },
  { left: "92%", top: "30%", s: 4, delay: "2s", dur: "11s" },
  { left: "-3%", top: "62%", s: 6, delay: "1s", dur: "10s" },
  { left: "97%", top: "74%", s: 4, delay: "3.4s", dur: "12s" },
  { left: "50%", top: "-4%", s: 5, delay: "1.8s", dur: "10.5s" },
] as const;

const INFO = [
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

      {/* very soft top fade so the film tucks under the header; the glass panel
          carries copy readability so the film stays vibrant everywhere else */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-32"
        style={{ background: "linear-gradient(180deg, rgba(228,246,250,0.6), transparent)" }}
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

      {/* ===================== GLASS PANEL (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-28 pt-28 sm:px-6 md:pt-32 lg:px-8">
        {/* NB: the frosted panel must NOT sit inside a transformed/will-change
            ancestor — that suppresses its backdrop-filter mid-entrance and snaps it
            on when the transform clears. So this wrapper is a plain (untransformed)
            box and the panel fades itself in via opacity only. */}
        <div className="w-full max-w-[37rem]">
          <div className="mco-panel mco-panel-in">
            <span aria-hidden className="mco-panel-caustic" />
            <span aria-hidden className="mco-panel-sheen" />
            {/* soft particles drifting around the panel */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {DUST.map((d, i) => (
                <span
                  key={i}
                  className="mco-dust"
                  style={
                    {
                      left: d.left,
                      top: d.top,
                      width: d.s,
                      height: d.s,
                      animationDelay: d.delay,
                      animationDuration: d.dur,
                    } as Vars
                  }
                />
              ))}
            </div>

            <div className="relative">
              <Reveal y={10} delay={120}>
                <span className="mco-eyebrow">
                  <Shell className="h-3 w-3" aria-hidden />
                  Chapter 04 · Ocean Magic · Summer Splash
                  <Shell className="h-3 w-3 -scale-x-100" aria-hidden />
                </span>
              </Reveal>

              <Reveal y={14} delay={200}>
                <div className="mt-3 flex flex-col items-start leading-none">
                  <span className="mco-brand">
                    <span className="mco-brand-rule" aria-hidden />
                    Vancouver
                    <span className="mco-brand-rule" aria-hidden />
                  </span>
                  <h1 className="sr-only">Vancouver Mermaid Cove Events</h1>
                  <span aria-hidden className="mco-name">
                    Mermaid Cove
                  </span>
                  <span aria-hidden className="mco-divider">
                    <span className="mco-divider-rule" />
                    <Shell className="h-3.5 w-3.5" />
                    <span className="mco-divider-rule" />
                  </span>
                  <span aria-hidden className="mco-events">
                    Events
                  </span>
                </div>
              </Reveal>

              <Reveal y={14} delay={300}>
                <p className="mco-headline mt-5">
                  Real swimming mermaids for unforgettable pool parties
                </p>
              </Reveal>

              <Reveal y={14} delay={370}>
                <p className="mco-body mt-3.5">
                  Bring ocean magic to your next celebration with real mermaids and playful pirate
                  handlers — storytime, singing, crowning, mermaid rides, swim moments and summer
                  games for public and private pool events.
                </p>
              </Reveal>

              <Reveal y={14} delay={450}>
                <div className="mco-cta-row mt-6">
                  <CTAButton to="/contact" size="md" className="mco-cta-primary group">
                    <Shell className="h-4 w-4" aria-hidden />
                    Book Mermaid Cove
                  </CTAButton>
                  <CTAButton href="#cove-trust" size="md" className="mco-cta-ghost">
                    Meet the Mermaids
                  </CTAButton>
                </div>
              </Reveal>

              <Reveal y={12} delay={530}>
                <div className="mt-4">
                  <MermaidReel />
                </div>
              </Reveal>

              <ul className="mco-info">
                {INFO.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="mco-info-pill" style={{ "--i": i } as Vars}>
                    <span className="mco-info-ic" aria-hidden>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
            fill="#B7DFF1"
          />
          <path
            d="M0,72 C220,118 420,30 720,58 C1010,84 1220,128 1440,84"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   "Watch us in Action" — a small magical play token + a lazy video modal.
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
        <span className="mco-reel-token">
          <span aria-hidden className="mco-reel-ripple" />
          <Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden />
        </span>
        <span className="mco-reel-label">Watch us in action</span>
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
