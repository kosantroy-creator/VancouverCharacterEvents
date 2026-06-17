import { useEffect, useRef, useState } from "react";
import { Camera, Medal, Shield, Star, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HeroMissionBriefing — "You've Been Called to Hero HQ."
 *
 * The hero sibling of RoyalInvitation. A 3D-style mission dossier folder that
 * rises and reveals its mission plan as it scrolls into view: the panel slides
 * up, the navy folder lifts, the plan card slides out, the shield badge pulses
 * once, and the CTA fades in. Pure CSS choreography (styles.css "HERO MISSION
 * BRIEFING"), triggered once by an IntersectionObserver. CTA walks into booking.
 */

const PLAN_ROWS = [
  {
    icon: Target,
    title: "Hero Training",
    desc: "Learn poses, powers, and heroic skills.",
    tint: "var(--hero-blue)",
  },
  {
    icon: Users,
    title: "Team Challenges",
    desc: "Work together through games and missions.",
    tint: "var(--hero-red)",
  },
  {
    icon: Medal,
    title: "Hero Ceremony",
    desc: "Celebrate the birthday hero of the day.",
    tint: "var(--hero-blue)",
  },
  {
    icon: Camera,
    title: "Photos & High Fives",
    desc: "Capture memories and one last heroic moment.",
    tint: "var(--hero-red)",
  },
] as const;

export function HeroMissionBriefing() {
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
          window.setTimeout(() => setOpen(true), 200);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("hmb", open && "is-open")}
      role="group"
      aria-label="You've been called to Hero HQ"
    >
      <div className="hmb-panel relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--hero-mist)] bg-gradient-to-br from-[var(--hero-ice)] to-[#E7F0FC] px-6 py-12 shadow-[0_30px_70px_-30px_rgba(36,66,104,0.4)] sm:px-10 lg:px-14">
        {/* faint star/dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(47,95,168,0.10) 1px, transparent 1.6px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* red corner accents */}
        <span className="pointer-events-none absolute left-3 top-3 h-7 w-7 rounded-tl-[18px] border-l-2 border-t-2 border-[var(--hero-red)]" />
        <span className="pointer-events-none absolute right-3 top-3 h-7 w-7 rounded-tr-[18px] border-r-2 border-t-2 border-[var(--hero-red)]" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 rounded-bl-[18px] border-b-2 border-l-2 border-[var(--hero-red)]" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 rounded-br-[18px] border-b-2 border-r-2 border-[var(--hero-red)]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2">
              <Star
                className="h-3.5 w-3.5 fill-[var(--hero-gold)] text-[var(--hero-gold)]"
                aria-hidden
              />
              <span className="t-engrave text-[0.66rem] tracking-[0.26em] text-[var(--hero-red-deep)]">
                Mission Briefing
              </span>
            </span>
            <h3 className="t-display mt-2 text-4xl font-bold leading-[1.05] text-[var(--hero-navy)] sm:text-5xl">
              You&apos;ve Been Called to <span className="text-[var(--hero-red)]">Hero HQ</span>
            </h3>
            <span
              aria-hidden
              className="mx-auto mt-4 flex max-w-[230px] items-center gap-2 lg:mx-0"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--hero-gold)]/70" />
              <Star className="h-3 w-3 fill-[var(--hero-gold)] text-[var(--hero-gold)]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--hero-gold)]/70" />
            </span>
            <p className="mx-auto mt-4 max-w-md text-[0.97rem] leading-relaxed text-[var(--hero-blue-deep)] lg:mx-0">
              Your young hero&apos;s adventure is planned from first arrival to final photo — every
              moment built to feel exciting, organized, and unforgettable.
            </p>
          </div>

          {/* Mission dossier */}
          <div className="hmb-folder relative mx-auto h-[332px] w-[290px]">
            {/* blue glow */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(closest-side, rgba(79,143,220,0.4), transparent 72%)",
              }}
            />
            {/* folder back panel */}
            <span
              aria-hidden
              className="absolute inset-x-3 bottom-0 top-9 rounded-[18px]"
              style={{
                background: "linear-gradient(180deg, #25457a, #16294a)",
                boxShadow: "0 24px 50px -20px rgba(24,54,93,0.6)",
              }}
            />

            {/* Mission plan card (rises out) */}
            <div className="hmb-paper absolute inset-x-7 top-0 z-10">
              <div className="relative rounded-[10px] border border-[var(--hero-gold)]/40 bg-[#FBF6EA] px-3.5 pb-4 pt-5 shadow-[0_14px_30px_-12px_rgba(24,54,93,0.5)]">
                <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-[6px] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-2.5 py-1 text-[0.46rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_10px_-3px_rgba(216,58,74,0.7)]">
                  <Star className="h-2 w-2 fill-white text-white" /> Your Mission Awaits
                  <Star className="h-2 w-2 fill-white text-white" />
                </span>
                <p className="mt-0.5 text-center font-sans text-[0.92rem] font-extrabold uppercase tracking-wide text-[var(--hero-navy)]">
                  Hero Mission Plan
                </p>
                <span className="mx-auto mt-1 block h-px w-16 bg-[var(--hero-gold)]/60" />
                <ul className="mt-2.5 space-y-2">
                  {PLAN_ROWS.map((r) => {
                    const Icon = r.icon;
                    return (
                      <li key={r.title} className="flex items-start gap-2">
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                          style={{ background: `color-mix(in oklab, ${r.tint} 18%, white)` }}
                        >
                          <Icon className="h-3 w-3" style={{ color: r.tint }} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.6rem] font-bold uppercase tracking-wide text-[var(--hero-navy)]">
                            {r.title}
                          </span>
                          <span className="block text-[0.56rem] leading-tight text-fg-3">
                            {r.desc}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* folder front pocket */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-20 h-[44%] overflow-hidden rounded-[18px]"
              style={{
                background: "linear-gradient(180deg, #284c7e, #15294a)",
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.08), 0 18px 40px -16px rgba(24,54,93,0.6)",
              }}
            >
              {/* red corner accents on pocket */}
              <span className="absolute left-2 top-2 h-4 w-4 rounded-tl-[10px] border-l-2 border-t-2 border-[var(--hero-red)]" />
              <span className="absolute bottom-2 right-2 h-4 w-4 rounded-br-[10px] border-b-2 border-r-2 border-[var(--hero-red)]" />
              {/* MISSION DOSSIER label */}
              <span className="absolute inset-x-0 bottom-3 text-center font-sans text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/85">
                Mission Dossier
              </span>
            </span>

            {/* shield + star badge on the pocket */}
            <span className="hmb-badge absolute bottom-[20%] left-1/2 z-30 inline-grid -translate-x-1/2 place-items-center">
              <Shield
                className="h-[58px] w-[58px] fill-[var(--hero-blue-deep)] text-[#cfdaec]"
                strokeWidth={1.5}
                aria-hidden
              />
              <Star
                className="absolute h-5 w-5 -translate-y-[3px] fill-white text-white"
                aria-hidden
              />
            </span>
          </div>

          {/* CTA */}
          <div className="hmb-cta text-center lg:text-right">
            <a
              href="#book"
              className="btn-magic relative inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_30px_-10px_rgba(216,58,74,0.6)] transition-all hover:shadow-[0_0_34px_rgba(216,58,74,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
            >
              <Shield className="h-4 w-4" aria-hidden />
              Open Your Mission
            </a>
            <span
              aria-hidden
              className="mx-auto mt-6 flex max-w-[220px] items-center gap-2 lg:ml-auto lg:mr-0"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--hero-gold)]/70" />
              <Star className="h-3 w-3 fill-[var(--hero-gold)] text-[var(--hero-gold)]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--hero-gold)]/70" />
            </span>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[var(--hero-blue-deep)] lg:ml-auto lg:mr-0">
              Hero training, team challenges, ceremony moments, and photos — all handled by
              professional performers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
