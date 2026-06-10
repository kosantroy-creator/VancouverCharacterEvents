import { Quote } from "lucide-react";
import { worldTestimonials } from "@/lib/site-data";
import { Reveal } from "./Reveal";

/**
 * Testimonials — each card is gently themed to its world/event color, with
 * readability first (a faint accent wash, never a busy background). Names are
 * editable placeholders until real client stories are added (see worldTestimonials).
 */
export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {worldTestimonials.map((t, i) => {
        const accent = `var(--chapter-${t.accent})`;
        return (
          <Reveal key={`${t.name}-${i}`} delay={(i % 3) * 80} y={22} className="h-full">
            <figure
              className="flex h-full flex-col rounded-[var(--radius-xl)] border p-6 shadow-[var(--shadow-sm)]"
              style={{
                borderColor: `color-mix(in oklab, ${accent} 30%, var(--border-soft))`,
                background: `linear-gradient(180deg, color-mix(in oklab, ${accent} 7%, var(--surface)) 0%, var(--surface) 58%)`,
              }}
            >
              <Quote className="h-7 w-7" style={{ color: accent }} aria-hidden />
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-fg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption
                className="mt-5 border-t pt-4"
                style={{ borderColor: `color-mix(in oklab, ${accent} 18%, var(--border-soft))` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-fg">{t.name}</span>
                  <span
                    className="t-engrave text-[0.56rem] tracking-[0.14em]"
                    style={{ color: `color-mix(in oklab, ${accent} 68%, var(--ink-800))` }}
                  >
                    {t.world}
                  </span>
                </div>
                <p className="mt-1 text-xs text-fg-3">
                  {t.eventType} · {t.city}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        );
      })}
    </div>
  );
}
