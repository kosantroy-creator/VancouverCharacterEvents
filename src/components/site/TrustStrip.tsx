import { GraduationCap, Sparkles, Mic, ListChecks, MapPin, HeartHandshake } from "lucide-react";
import { trustHighlights } from "@/lib/site-data";
import { Reveal } from "./Reveal";

/** Icons paired to trustHighlights (same order). */
const ICONS = [GraduationCap, Sparkles, Mic, ListChecks, MapPin, HeartHandshake];

/**
 * TrustStrip — the small-but-impactful bridge between the cinematic hero and
 * the character worlds. Tells visitors instantly: this is real, professional,
 * safe, and worth it.
 */
export function TrustStrip() {
  return (
    <section
      className="relative border-y border-gold-500/20 bg-warm-white"
      aria-label="Why families and planners trust us"
    >
      <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.05 }} />
      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-5 gap-y-6 px-5 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:gap-3 lg:px-8">
        {trustHighlights.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal
              key={label}
              delay={i * 70}
              y={14}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 bg-surface text-gold-600 shadow-[var(--shadow-sm)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[0.8rem] font-semibold leading-tight text-fg-2">{label}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
