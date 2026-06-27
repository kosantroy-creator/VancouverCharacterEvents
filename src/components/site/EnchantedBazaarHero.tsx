import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Brush, Camera, ChevronDown, PartyPopper, Sparkles, Tent, Wand2 } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/bazaar/bazaar-hero.webp";

/**
 * EnchantedBazaarHero — Section 1 of the Enchanted Bazaar page: "The Enchanted
 * Night Market". The selected night-market art plays full-bleed; the copy sits on
 * the left over the image's lighter blue space, lifted by a soft deep-teal wash —
 * the eighth realm hero in the same Vancouver Character Events system (eyebrow →
 * title → italic subtitle → body → category chips → two CTAs). A warm lantern glow
 * spills from the right, gold dust drifts and a few sparkles twinkle near the
 * stalls (motion-gated), and a scalloped silk awning flows the hero into the cream
 * section below. Brand-safe — face painters, balloon twisters, photographers and
 * inflatable PARTNERS (partner-based; we don't imply we operate inflatables).
 * Reduced-motion safe. See "ENCHANTED BAZAAR HERO" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const TRUST = [
  { icon: Brush, label: "Face Painting" },
  { icon: PartyPopper, label: "Balloon Twisting" },
  { icon: Camera, label: "Photography" },
  { icon: Tent, label: "Inflatable Partners" },
  { icon: Wand2, label: "Event Add-Ons" },
  { icon: Sparkles, label: "Festival Friendly" },
] as const;

/* Deterministic drifting gold dust (identical on server & client), weighted to
   the lantern-lit right side of the market. */
const DUST = [
  { left: "30%", s: 4, delay: "0s", dur: "13s", dx: "10px", c: "#F0C674" },
  { left: "44%", s: 3, delay: "3.2s", dur: "15s", dx: "-8px", c: "#F4A93B" },
  { left: "55%", s: 5, delay: "1.4s", dur: "12s", dx: "12px", c: "#FBE3A6" },
  { left: "63%", s: 3, delay: "5s", dur: "16s", dx: "-10px", c: "#F0C674" },
  { left: "70%", s: 4, delay: "2.2s", dur: "14s", dx: "9px", c: "#F4A93B" },
  { left: "78%", s: 5, delay: "4.4s", dur: "13.5s", dx: "-12px", c: "#FBE3A6" },
  { left: "85%", s: 3, delay: "0.8s", dur: "15.5s", dx: "11px", c: "#F0C674" },
  { left: "91%", s: 4, delay: "3.8s", dur: "12.5s", dx: "-9px", c: "#F4A93B" },
  { left: "48%", s: 3, delay: "6s", dur: "17s", dx: "8px", c: "#FBE3A6" },
] as const;

/* A few soft sparkles near the lantern arch + stalls (right side). */
const SPARKS = [
  { left: "60%", top: "30%", s: 11, delay: "0.4s" },
  { left: "80%", top: "20%", s: 9, delay: "1.6s" },
  { left: "72%", top: "44%", s: 13, delay: "2.6s" },
  { left: "90%", top: "36%", s: 10, delay: "0.9s" },
  { left: "66%", top: "14%", s: 8, delay: "3.2s" },
] as const;

export function EnchantedBazaarHero() {
  const [motionOK, setMotionOK] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);

    // Subtle scroll parallax: the lantern glow, ambient dust and awning drift at
    // different rates than the static night-market art for depth. rAF-throttled,
    // only while the hero is on screen.
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < 1000) el.style.setProperty("--ebz-py", `${y}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Desktop cursor spotlight: a warm lantern glow tracks the pointer over the art.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      el.classList.add("is-spot");
    };
    const onLeave = () => el.classList.remove("is-spot");
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Enchanted Bazaar — a glowing night market of magical event add-ons"
      className="ebz relative isolate flex min-h-[88svh] items-center overflow-hidden"
    >
      {/* selected enchanted night-market art — full-bleed background */}
      <img
        src={heroImg}
        alt="A glowing enchanted night market with lanterns, balloons, face painting supplies, photography props, and event add-on stalls."
        className="ebz-img absolute inset-0 -z-30 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* deep-teal washes keep the left copy readable over the night art */}
      <div aria-hidden className="ebz-wash absolute inset-0 -z-20" />
      <div aria-hidden className="ebz-wash-top absolute inset-x-0 top-0 -z-20 h-44" />
      <div aria-hidden className="ebz-wash-mobile absolute inset-0 -z-20 sm:hidden" />

      {/* warm lantern glow spilling from the right */}
      <span aria-hidden className={cn("ebz-glow absolute -z-10", motionOK && "is-live")} />

      {/* desktop cursor spotlight (toggled on first pointer move) */}
      <span aria-hidden className="ebz-spot" />

      {/* ambient gold dust + market sparkles (motion only) */}
      {motionOK ? (
        <div aria-hidden className="ebz-amb pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="ebz-dust"
              style={
                {
                  left: d.left,
                  width: d.s,
                  height: d.s,
                  animationDelay: d.delay,
                  animationDuration: d.dur,
                  "--dx": d.dx,
                  "--c": d.c,
                } as Vars
              }
            />
          ))}
          {SPARKS.map((s, i) => (
            <span
              key={`s${i}`}
              className="ebz-spark"
              style={{ left: s.left, top: s.top, width: s.s, height: s.s, animationDelay: s.delay }}
            />
          ))}
        </div>
      ) : null}

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-xl">
          {/* Vancouver Enchanted Bazaar Events lockup */}
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#E7B24B]" aria-hidden />
                <span className="t-engrave text-[clamp(1.1rem,2.4vw,1.7rem)] tracking-[0.18em] text-[#F0C674]">
                  Vancouver
                </span>
              </span>
              <h1 className="sr-only">
                Vancouver Enchanted Bazaar Events — the marketplace of magical event add-ons
              </h1>
              <span
                aria-hidden
                className="ebz-script t-script mt-1 block pb-1 text-[clamp(2.3rem,6vw,4rem)] leading-[1.1]"
              >
                Enchanted Bazaar
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2.5 inline-flex items-center gap-2.5 text-[clamp(0.8rem,1.6vw,1rem)] tracking-[0.42em] text-[#EAF7F6]"
              >
                <span className="text-[#E7B24B]">✦</span> Events <span className="text-[#E7B24B]">✦</span>
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{ background: "linear-gradient(90deg, #E7B24B, #F0C674 55%, transparent)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={150} y={16}>
            <p
              className="t-display mt-6 text-[clamp(1.4rem,2.8vw,2rem)] leading-snug text-[#EAF7F6]"
              style={{ textShadow: "0 2px 14px rgba(7,40,52,0.6)" }}
            >
              Face painting, balloons, photography &amp;{" "}
              <span className="text-[#F0C674]">event add-ons</span>
            </p>
          </Reveal>

          <Reveal delay={220} y={16}>
            <p className="ebz-body mt-4 max-w-md text-lg leading-relaxed text-[#DCEBEA]">
              Step into the marketplace of magical extras. From colourful face painting and balloon
              twisting to photo moments and inflatable partner add-ons, the Enchanted Bazaar fills
              birthdays, schools, festivals, corporate events, and community celebrations with colour,
              activity, and unforgettable guest moments.
            </p>
          </Reveal>

          <Reveal delay={300} y={16}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#bazaar-partners" size="lg" className="ebz-cta-primary group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Explore the Bazaar
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton to="/pricing" variant="ghost-ink" size="lg" className="ebz-cta-ghost">
                <Wand2 className="h-4 w-4" aria-hidden />
                Request Add-On Pricing
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[#EAF7F6]"
                >
                  <Icon className="h-4 w-4 text-[#E7B24B]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* ===================== scalloped silk awning → next section ============ */}
      <div aria-hidden className="ebz-awning pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="ebz-awning-glow"
            d="M0,30 q60,56 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 L1440,120 L0,120 Z"
            fill="#F4A93B"
            opacity="0.18"
          />
          <path
            d="M0,40 q60,56 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 L1440,120 L0,120 Z"
            fill="#FBF1E6"
          />
          <path
            d="M0,40 q60,56 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0"
            fill="none"
            stroke="#E7B24B"
            strokeWidth="3"
            opacity="0.85"
          />
          <g className="ebz-awning-lights">
            <circle cx="60" cy="64" r="3.6" fill="#F4A93B" />
            <circle cx="300" cy="64" r="3.6" fill="#D14A86" />
            <circle cx="540" cy="64" r="3.6" fill="#4FC4D6" />
            <circle cx="780" cy="64" r="3.6" fill="#E7B24B" />
            <circle cx="1020" cy="64" r="3.6" fill="#E08AB0" />
            <circle cx="1260" cy="64" r="3.6" fill="#7CC8C2" />
          </g>
        </svg>
      </div>

      {/* gentle scroll cue */}
      <a
        href="#bazaar-partners"
        aria-label="Scroll to explore the Enchanted Bazaar"
        className="ebz-chev"
      >
        <ChevronDown className="h-5 w-5" aria-hidden />
      </a>
    </section>
  );
}
