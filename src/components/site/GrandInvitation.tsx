import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Crown, Sparkles as SparklesIcon } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Mountains } from "./Scenery";
import { characterWorlds, serviceAreas } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import duskSky from "@/assets/home/dusk-sky.webp";

/**
 * GrandInvitation — the homepage finale at dusk. Ends the day the hero opened:
 * a graded dusk sky over the North Shore silhouette, eight tiny world-hue lights
 * along the ridge (a quiet final nav — one per world), the service areas resting in
 * the dusk glow, and a royal-navy envelope sealed with a gold crown that OPENS
 * ITSELF on scroll-in (the proven RoyalInvitation choreography, re-addressed to the
 * whole mothership). Merges the old service-area + final-CTA sections into one
 * crescendo. Reduced-motion: envelope already open, lights steady. See ".ginv".
 */
type Vars = CSSProperties & Record<string, string | number>;

/** Ridge lights — one per world, spread along the mountain line. */
const RIDGE_X = ["8%", "20%", "33%", "45%", "57%", "69%", "81%", "92%"];

export function GrandInvitation() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setOpen(true), 450);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="ginv-title" className="ginv relative isolate overflow-hidden">
      {/* the painted dusk itself — glow up top continuing the day-arc, stars settling
          onto the ridge. CSS gradient behind it stays as the loading/failure fallback. */}
      <img
        src={duskSky}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* veil matched to the day-arc's exact exit colour so the hand-off is invisible */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-36 md:h-44"
        style={{ background: "linear-gradient(180deg, #F8EEE0 0%, rgba(248,238,224,0) 100%)" }}
      />
      {/* first stars of the evening */}
      <div aria-hidden className="tx-stars absolute inset-0 opacity-40" />

      <div
        ref={ref}
        className={cn("invite relative z-10 mx-auto w-full max-w-3xl px-5 pb-10 pt-20 text-center sm:px-6 md:pt-24", open && "is-open")}
      >
        <span className="ginv-eyebrow">
          <Crown className="h-4 w-4" aria-hidden />
          Bring the story home
        </span>
        <h2 id="ginv-title" className="ginv-title">
          Begin <em className="ginv-title-em">your story</em>
        </h2>
        <p className="ginv-sub">
          The date is yours and the characters are ready. Tell us what you&apos;re dreaming up, and
          we&apos;ll help you create a day your guests will never forget.
        </p>

        {/* The envelope — proven self-opening choreography, addressed to the house */}
        <div className="invite-env relative mx-auto mt-16 h-[150px] w-[240px] sm:h-[178px] sm:w-[285px]">
          <span
            aria-hidden
            className="invite-glow absolute -inset-6 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,228,160,0.45), transparent 72%)" }}
          />
          <div className="invite-card absolute inset-x-[10%] bottom-[8%] top-[6%]">
            <div className="flex h-full flex-col items-center justify-center rounded-[10px] border border-gold-500/60 bg-[#FFFDF6] px-4 text-center shadow-[0_10px_30px_-12px_rgba(20,20,60,0.55)]">
              <Crown className="h-4 w-4 text-gold-600" aria-hidden />
              <p className="t-engrave mt-1 text-[0.5rem] tracking-[0.2em] text-ink-700">
                To the storyteller of the house
              </p>
              <p className="t-script mt-0.5 text-2xl leading-none text-[#9A6E2B]">You&apos;re invited</p>
              <span className="pp-hairline mt-2 w-16" aria-hidden />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-[3] h-[62%] overflow-hidden rounded-[10px] border border-gold-500/50 bg-gradient-to-b from-[#243463] to-[#16234A] shadow-[0_14px_30px_-14px_rgba(4,8,30,0.8)]">
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,253,247,0.06) 0%, rgba(255,253,247,0.06) 46%, transparent 47%), linear-gradient(245deg, rgba(255,253,247,0.05) 0%, rgba(255,253,247,0.05) 46%, transparent 47%)",
              }}
            />
          </div>
          <div className="invite-flap absolute inset-x-0 top-[12%] z-[4] h-[46%]" aria-hidden>
            <span
              className="absolute inset-0 border border-gold-500/50 bg-gradient-to-b from-[#2C3F76] to-[#1B2A52]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <span
              className="invite-seal absolute left-1/2 top-[72%] z-[5] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle at 38% 32%, #F2D693 0%, #CFA862 55%, #9A7330 100%)",
                boxShadow: "0 2px 8px rgba(4,8,30,0.6), inset 0 1px 2px rgba(255,255,255,0.6)",
              }}
            >
              <Crown className="h-4 w-4 text-[#5F4516]" aria-hidden />
            </span>
          </div>
          <span className="sparkle absolute -right-3 top-2 text-gold-500" aria-hidden>✦</span>
          <span className="sparkle absolute -left-4 bottom-6 text-gold-500" style={{ animationDelay: "1.4s" }} aria-hidden>✦</span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg" variant="ghost-ink" className="ginv-cta group">
            <SparklesIcon className="h-4 w-4" aria-hidden />
            Book an Experience
          </CTAButton>
          <CTAButton to="/pricing" variant="ghost-ink" size="lg" className="ginv-cta-ghost">
            View Pricing
          </CTAButton>
        </div>

        {/* the local team, resting in the dusk glow */}
        <p className="ginv-areas-lead">A local team, across the Lower Mainland</p>
        <ul className="ginv-areas">
          {serviceAreas.map((a) => (
            <li key={a} className="ginv-area">{a}</li>
          ))}
        </ul>
      </div>

      {/* the ridge — eight world lights over the North Shore */}
      <div className="relative z-10 mt-6">
        <div className="ginv-ridge-lights" aria-label="The eight worlds, along the ridge">
          {characterWorlds.map((w, i) => (
            <Link
              key={w.slug}
              to={w.exploreTo}
              title={w.name}
              aria-label={w.name}
              className="ginv-light"
              style={{ left: RIDGE_X[i % RIDGE_X.length], "--acc": `var(--chapter-${w.accent})`, "--tw": `${(i % 4) * 0.9}s` } as Vars}
            />
          ))}
        </div>
        <Mountains
          className="block h-[90px] w-full sm:h-[130px]"
          back="rgba(16, 20, 46, 0.55)"
          front="rgba(10, 13, 34, 0.85)"
        />
      </div>
    </section>
  );
}
