import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check, Leaf, Star } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import inflatable from "@/assets/dinosaur/inflatable-typical.webp";
import harveyMeet from "@/assets/dinosaur/harvey-meet.webp";

/**
 * DinoComparison — the positioning section after the Trainer Academy. A premium
 * field-guide comparison that makes Harvey read as a full trainer-led attraction,
 * not a costume cameo: "Typical Dinosaur Visit" (clean, neutral, respectful) vs
 * "The Harvey Expedition" (emphasized — amber border, soft glow-pulse, badge, gold
 * check stamps). Reveals are IntersectionObserver-driven and visible-by-default,
 * so reduced-motion / pre-JS render gets everything composed and still. The left
 * side is never mocked — it just feels simpler. See the "DINO COMPARISON" CSS block.
 */
type Vars = CSSProperties & Record<string, string | number>;

const TYPICAL = [
  "Quick appearance",
  "Basic meet and greet",
  "Simple photos",
  "Little structure",
  "Minimal story or buildup",
  "Kids may not know how to interact",
];

const HARVEY = [
  "A 13-foot T-Rex encounter",
  "Two safari trainers on-site",
  "A structured Junior Trainer Academy",
  "A big, planned reveal moment",
  "Commands, clues, eggs, fossils & story",
  "Organized photos + birthday-child feature moment",
  "Family-friendly safety built into every step",
  "Built for birthdays, schools, festivals & larger events",
];

export function DinoComparison() {
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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="cmp-title"
      className={cn("cmp relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
      style={{
        background: "linear-gradient(180deg, #FFFCF6 0%, #F7EFDD 46%, #F3EAD6 78%, #FBF6EC 100%)",
      }}
    >
      <div aria-hidden className="cmp-tex pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-24 pt-20 sm:px-6 md:pb-28 md:pt-24 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="cmp-eyebrow t-engrave inline-flex items-center gap-2 text-[0.66rem] font-bold tracking-[0.3em] text-[#9c7406]">
            <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
            Why Harvey Feels Different
            <Leaf className="h-3 w-3 -scale-x-100 text-[#6E9A5E]" aria-hidden />
          </span>
          <h2
            id="cmp-title"
            className="cmp-title t-display mt-2 text-3xl font-bold leading-tight text-[#2E4A38] md:text-[2.7rem]"
          >
            Not a Mascot. A Full Dinosaur Encounter.
          </h2>
          <p className="cmp-sub mx-auto mt-3 max-w-2xl text-[1.05rem] font-semibold text-[#2E4A38]/80">
            A trainer-led experience built around story, safety, reactions, and the reveal moment
            kids remember.
          </p>
          <p className="cmp-intro mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-[#2E4A38]/75">
            Most dinosaur visits are simple appearances. Harvey is different. With safari trainers,
            a structured adventure, a massive 13-foot presence, and a planned reveal moment, the
            experience feels like a real expedition arriving at your event.
          </p>
        </div>

        {/* comparison panels */}
        <div className="mt-12 grid items-start gap-5 md:mt-14 md:grid-cols-[1fr_1.06fr] md:gap-6">
          {/* LEFT — typical (neutral, respectful) */}
          <article className="cmp-panel cmp-left">
            <div className="cmp-banner">
              <img
                src={inflatable}
                alt="A simple inflatable dinosaur costume at an ordinary backyard party"
                className="cmp-img-muted h-full w-full object-cover"
                loading="lazy"
              />
              <span className="cmp-banner-label">Typical Dinosaur Visit</span>
            </div>
            <ul className="cmp-list">
              {TYPICAL.map((t, i) => (
                <li key={t} className="cmp-point" style={{ "--i": i } as Vars}>
                  <span className="cmp-dot" aria-hidden />
                  <span className="text-[#2E4A38]/85">{t}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* RIGHT — the Harvey Expedition (emphasized) */}
          <article className="cmp-panel cmp-right">
            <span className="cmp-badge">
              <Star className="h-3 w-3" aria-hidden /> Feature Attraction
            </span>
            <div className="cmp-banner">
              <img
                src={harveyMeet}
                alt="Harvey, our 13-foot T-Rex, with a safari trainer on a sunlit forest trail"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="cmp-banner-label cmp-banner-label-strong">
                The Harvey Expedition
              </span>
            </div>
            <ul className="cmp-list">
              {HARVEY.map((t, i) => (
                <li key={t} className="cmp-point" style={{ "--i": i } as Vars}>
                  <span className="cmp-check" aria-hidden>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium text-[#2E4A38]">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* bottom callout */}
        <div className="cmp-callout mt-10 flex flex-col items-center gap-5 rounded-[22px] border border-[#D4A017]/30 bg-[#FFFDF7]/85 px-6 py-7 text-center shadow-[0_22px_50px_-34px_rgba(46,74,56,0.5)] backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left md:px-9">
          <div>
            <p className="t-display text-[1.3rem] font-bold leading-snug text-[#2E4A38]">
              Built like an attraction, delivered to your event.
            </p>
            <p className="mt-1.5 max-w-xl text-[0.92rem] leading-relaxed text-[#2E4A38]/75">
              From the first trainer briefing to Harvey&apos;s big entrance, every part of the
              experience is designed to feel organized, exciting, and unforgettable.
            </p>
          </div>
          <CTAButton
            href="#expedition"
            size="lg"
            className="group shrink-0 !bg-[#D4A017] !text-[#2A1C05] hover:!bg-[#D99A32] hover:!shadow-[0_0_30px_rgba(212,160,23,0.4)]"
          >
            Choose Your Expedition
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
