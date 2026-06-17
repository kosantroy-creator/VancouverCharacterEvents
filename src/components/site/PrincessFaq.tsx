import { useState, type ComponentType } from "react";
import { Clock, Crown, Heart, MapPin, Music, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { q: string; a: string };
type Meta = { icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>; label: string };

/** Small royal labels + icons, matched to the princess FAQ order. */
const FAQ_META: Meta[] = [
  { icon: Clock, label: "Timing" },
  { icon: Music, label: "Singing" },
  { icon: Heart, label: "Little Ones" },
  { icon: MapPin, label: "Travel" },
];

/**
 * PrincessFaq — the `/princess-events` "Royal Details" briefing list. The royal
 * sibling of HeroFaq (shared FaqAccordion left untouched): cream cards, navy
 * type, gold dividers/icons, a magenta accent only on the open item, and answers
 * in a soft pink-cream frosted panel. Single-open + collapsible; first item open
 * by default. Reduced-motion handled by the global guard in styles.css.
 */
export function PrincessFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* crown-sparkle divider */}
      <div className="mx-auto mb-7 flex max-w-[18rem] items-center gap-3">
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/55"
        />
        <span aria-hidden className="relative grid h-9 w-9 place-items-center text-gold-600">
          <Crown className="h-7 w-7" />
          <Sparkles className="absolute -right-0.5 -top-0.5 h-3 w-3 text-[var(--pp-magenta)]" />
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/55"
        />
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          const meta = FAQ_META[i] ?? { icon: Crown, label: "Royal" };
          const Icon = meta.icon;
          return (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border bg-[rgba(255,252,247,0.78)] backdrop-blur-sm transition-all duration-300",
                isOpen
                  ? "border-[var(--pp-magenta)]/35 shadow-[0_18px_40px_-22px_rgba(162,27,97,0.32)]"
                  : "border-gold-500/25 shadow-[var(--shadow-sm)] hover:border-gold-500/55 hover:shadow-[0_14px_30px_-18px_rgba(207,168,98,0.5)]",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`pfaq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:gap-4 sm:px-5"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    isOpen
                      ? "bg-[var(--pp-magenta)]/12 text-[var(--pp-magenta)]"
                      : "bg-gold-500/15 text-gold-600",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="hidden w-[5.5rem] shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-600 sm:block">
                  {meta.label}
                </span>
                <span aria-hidden className="hidden h-8 w-px shrink-0 bg-gold-500/30 sm:block" />
                <span className="flex-1 font-display text-base leading-snug text-fg sm:text-lg">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
                    isOpen
                      ? "border-[var(--pp-magenta)] text-[var(--pp-magenta)]"
                      : "border-gold-500/50 text-gold-600",
                  )}
                >
                  <Crown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      isOpen && "scale-110",
                    )}
                    aria-hidden
                  />
                </span>
              </button>

              <div
                id={`pfaq-panel-${i}`}
                role="region"
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5">
                    <p className="rounded-xl border-l-[3px] border-[var(--pp-magenta)] bg-[#FCEFF5]/80 px-4 py-3.5 text-[0.95rem] leading-relaxed text-fg-2 backdrop-blur-sm">
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
      <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-gold-500/25 bg-[#FCEFF5]/70 px-5 py-5 backdrop-blur-sm sm:flex-row sm:justify-between sm:px-7">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-600">
            <Wand2 className="h-6 w-6" aria-hidden />
          </span>
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-fg">Still have questions?</p>
            <p className="mt-0.5 text-sm text-fg-2">
              Our Fairy Godmother is here to help you plan the perfect day.
            </p>
          </div>
        </div>
        <a
          href="#matchmaker"
          className="btn-magic inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-pill)] bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-900 shadow-[0_14px_30px_-12px_rgba(207,168,98,0.6)] transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Ask the Fairy Godmother
        </a>
      </div>
    </div>
  );
}
