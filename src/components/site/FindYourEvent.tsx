import { Link } from "@tanstack/react-router";
import { Cake, GraduationCap, Tent, Briefcase, ArrowRight } from "lucide-react";
import { eventTypeCards, worldBySlug } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const ICONS = [Cake, GraduationCap, Tent, Briefcase];

/**
 * Find Your Event — visitor-focused lanes. Each card answers "is this me?" with
 * who it's for, what works best, and the worlds we'd recommend. Motion/CSS only.
 */
export function FindYourEvent() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {eventTypeCards.map((ev, i) => {
        const Icon = ICONS[i % ICONS.length];
        const accent = `var(--chapter-${ev.accent})`;
        return (
          <Reveal key={ev.title} delay={(i % 2) * 90} y={22} className="h-full">
            <article
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)]"
              style={{ borderTop: `3px solid ${accent}` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: `color-mix(in oklab, ${accent} 16%, var(--surface))`,
                    color: `color-mix(in oklab, ${accent} 78%, var(--ink-900))`,
                  }}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display text-2xl text-fg">{ev.title}</h3>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="t-engrave text-[0.6rem] tracking-[0.16em] text-fg-gold">
                    Who it's for
                  </dt>
                  <dd className="mt-1 text-fg-2">{ev.who}</dd>
                </div>
                <div>
                  <dt className="t-engrave text-[0.6rem] tracking-[0.16em] text-fg-gold">
                    What works best
                  </dt>
                  <dd className="mt-1 text-fg-2">{ev.worksBest}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-xs font-semibold text-fg-3">Recommended worlds</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {ev.recommended.map((slug) => {
                    const w = worldBySlug(slug);
                    if (!w) return null;
                    const a = `var(--chapter-${w.accent})`;
                    return (
                      <li key={slug}>
                        <Link
                          to={w.exploreTo}
                          className="inline-flex items-center gap-1.5 rounded-pill border bg-surface px-2.5 py-1 text-[0.72rem] font-medium text-fg-2 transition-colors hover:bg-warm-white"
                          style={{ borderColor: `color-mix(in oklab, ${a} 45%, transparent)` }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: a }}
                            aria-hidden
                          />
                          {w.navLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  to={ev.cta.to}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: `color-mix(in oklab, ${accent} 72%, var(--ink-900))` }}
                >
                  {ev.cta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
