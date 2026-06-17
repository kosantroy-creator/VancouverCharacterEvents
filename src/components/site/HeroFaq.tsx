import { useState, type ComponentType } from "react";
import {
  ChevronDown,
  Headset,
  Home,
  MessageCircle,
  Shield,
  ShieldCheck,
  Star,
  Users,
  VenetianMask,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { q: string; a: string };
type Meta = { icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>; label: string };

/** Small left-hand labels + icons, matched to the hero FAQ order. */
const FAQ_META: Meta[] = [
  { icon: ShieldCheck, label: "Safety" },
  { icon: VenetianMask, label: "Characters" },
  { icon: Users, label: "Groups" },
  { icon: Home, label: "Space" },
];

/**
 * HeroFaq — the `/hero-events` "Mission Intel" briefing list. A compact, calm
 * accordion (hero sibling of the shared FaqAccordion, left untouched): light-blue
 * cards, navy type, blue dividers/icons, a red accent only on the open item, and
 * answers in a soft frosted-blue panel. Single-open + collapsible; the first item
 * opens by default. Reduced-motion is handled by the global guard in styles.css.
 */
export function HeroFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* shield-star divider */}
      <div className="mx-auto mb-7 flex max-w-[18rem] items-center gap-3">
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--hero-red)]/45"
        />
        <span
          aria-hidden
          className="relative grid h-9 w-9 place-items-center text-[var(--hero-navy)]"
        >
          <Shield className="h-8 w-8 fill-[var(--hero-navy)]" />
          <Star className="absolute h-2.5 w-2.5 -translate-y-px fill-white text-white" />
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--hero-red)]/45"
        />
      </div>

      {/* briefing list */}
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          const meta = FAQ_META[i] ?? { icon: Shield, label: "Intel" };
          const Icon = meta.icon;
          return (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-300",
                isOpen
                  ? "border-[var(--hero-red)]/35 shadow-[0_18px_40px_-22px_rgba(216,58,74,0.35)]"
                  : "border-[var(--hero-blue)]/25 shadow-[var(--shadow-sm)] hover:border-[var(--hero-blue)]/50 hover:shadow-[0_14px_30px_-18px_rgba(79,143,220,0.5)]",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`hfaq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)] sm:gap-4 sm:px-5"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    isOpen
                      ? "bg-[var(--hero-red)]/12 text-[var(--hero-red)]"
                      : "bg-[var(--hero-blue)]/12 text-[var(--hero-blue-deep)]",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="hidden w-[5.25rem] shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[var(--hero-blue)] sm:block">
                  {meta.label}
                </span>
                <span
                  aria-hidden
                  className="hidden h-8 w-px shrink-0 bg-[var(--hero-blue)]/25 sm:block"
                />
                <span className="flex-1 font-display text-base font-bold leading-snug text-[var(--hero-navy)] sm:text-lg">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
                    isOpen
                      ? "border-[var(--hero-red)] text-[var(--hero-red)]"
                      : "border-[var(--hero-blue)]/50 text-[var(--hero-blue-deep)]",
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </span>
              </button>

              <div
                id={`hfaq-panel-${i}`}
                role="region"
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5">
                    <p className="rounded-xl border-l-[3px] border-[var(--hero-red)] bg-[var(--hero-sky)]/45 px-4 py-3.5 text-[0.95rem] leading-relaxed text-[var(--hero-navy)]/85 backdrop-blur-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* "Still have questions?" CTA */}
      <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-[var(--hero-blue)]/25 bg-[var(--hero-sky)]/45 px-5 py-5 backdrop-blur-sm sm:flex-row sm:justify-between sm:px-7">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--hero-blue)]/12 text-[var(--hero-blue-deep)]">
            <Headset className="h-6 w-6" aria-hidden />
          </span>
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-bold text-[var(--hero-navy)]">
              Still have questions?
            </p>
            <p className="mt-0.5 text-sm text-fg-2">
              Our team is here to help you plan the perfect mission.
            </p>
          </div>
        </div>
        <a
          href="#book"
          className="btn-magic inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(216,58,74,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Ask Mission Control
        </a>
      </div>
    </div>
  );
}
