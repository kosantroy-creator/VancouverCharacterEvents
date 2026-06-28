import { useEffect, useRef, useState } from "react";
import { Crown, Sparkles as SparklesIcon } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

/**
 * RoyalInvitation — "You're Invited to the Royal Ball."
 *
 * A hand-built envelope that opens itself as it scrolls into view: the wax
 * seal releases, the flap swings back, and the invitation card rises out in
 * a soft golden glow. Pure CSS choreography (styles.css "ROYAL INVITATION"),
 * triggered once by an IntersectionObserver. The CTA walks straight into the
 * booking flow.
 */
export function RoyalInvitation() {
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
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("invite", open && "is-open")}
      role="group"
      aria-label="You're invited to the Royal Ball"
    >
      <div
        className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-gold-500/45 p-7 shadow-[var(--shadow-lg)] sm:p-9"
        style={{
          background: "linear-gradient(120deg, #FFFDF7 0%, #FBF3E4 55%, #F9ECD8 100%)",
        }}
      >
        {/* faint castle + carriage watermarks */}
        <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.05 }} />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 bottom-0 top-0 w-40 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(closest-side at 30% 75%, var(--pp-magenta) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_auto_0.95fr] lg:gap-12">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2">
              <Crown className="h-5 w-5 text-gold-600" aria-hidden />
              <span className="t-engrave text-[0.62rem] tracking-[0.26em] text-gold-700">
                A royal request
              </span>
            </span>
            <h3 className="mt-2 font-display text-3xl leading-tight text-ink-800 sm:text-4xl">
              You&apos;re Invited to the{" "}
              <span className="t-script text-[1.2em] text-[var(--pp-magenta)]">Royal Ball</span>
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-fg-2 lg:mx-0">
              Step into a world of enchantment, tiaras, and timeless memories. A magical princess
              experience awaits.
            </p>
          </div>

          {/* The envelope — top padding reserves room for the rising card */}
          <div className="invite-env relative mx-auto mt-14 h-[150px] w-[240px] sm:mt-16 sm:h-[178px] sm:w-[285px]">
            {/* glow behind the rising card */}
            <span
              aria-hidden
              className="invite-glow absolute -inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,228,160,0.55), transparent 72%)",
              }}
            />

            {/* The invitation card (rises out) */}
            <div className="invite-card absolute inset-x-[10%] bottom-[8%] top-[6%]">
              <div className="flex h-full flex-col items-center justify-center rounded-[10px] border border-gold-500/60 bg-[#FFFDF6] px-4 text-center shadow-[0_10px_30px_-12px_rgba(120,80,40,0.45)]">
                <Crown className="h-4 w-4 text-gold-600" aria-hidden />
                <p className="t-engrave mt-1 text-[0.5rem] tracking-[0.2em] text-ink-700">
                  You&apos;re invited to the
                </p>
                <p className="t-script mt-0.5 text-2xl leading-none text-[var(--pp-magenta)]">
                  Royal Ball
                </p>
                <span className="pp-hairline mt-2 w-16" aria-hidden />
              </div>
            </div>

            {/* Envelope body */}
            <div className="absolute inset-x-0 bottom-0 z-[3] h-[62%] overflow-hidden rounded-[10px] border border-gold-500/50 bg-gradient-to-b from-[#FBF4E6] to-[#F3E6CD] shadow-[0_14px_30px_-14px_rgba(120,80,40,0.5)]">
              {/* pocket folds */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, #F8EFDC 0%, #F8EFDC 46%, transparent 47%), linear-gradient(245deg, #F6ECD6 0%, #F6ECD6 46%, transparent 47%)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(176,138,82,0.14))",
                }}
              />
            </div>

            {/* Flap (swings open) + wax seal */}
            <div className="invite-flap absolute inset-x-0 top-[12%] z-[4] h-[46%]" aria-hidden>
              <span
                className="absolute inset-0 border border-gold-500/50 bg-gradient-to-b from-[#1E3A5F] to-[#16263F]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
              <span
                className="invite-seal absolute left-1/2 top-[72%] z-[5] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 38% 32%, #F2D693 0%, #CFA862 55%, #9A7330 100%)",
                  boxShadow: "0 2px 8px rgba(120,80,40,0.5), inset 0 1px 2px rgba(255,255,255,0.6)",
                }}
              >
                <Crown className="h-4 w-4 text-[#5F4516]" aria-hidden />
              </span>
            </div>

            {/* twinkles */}
            <span className="sparkle absolute -right-3 top-2 text-gold-500" aria-hidden>
              ✦
            </span>
            <span
              className="sparkle absolute -left-4 bottom-6 text-gold-500"
              style={{ animationDelay: "1.4s" }}
              aria-hidden
            >
              ✦
            </span>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-right">
            <CTAButton
              href="#book"
              size="lg"
              className="cta-pulse !bg-ink-800 !text-gold-300 hover:!bg-ink-700"
            >
              <SparklesIcon className="h-4 w-4" aria-hidden />
              Open Your Invitation
            </CTAButton>
            <p className="mt-3 text-xs text-fg-3">
              Every moment thoughtfully planned — every detail designed to be unforgettable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
