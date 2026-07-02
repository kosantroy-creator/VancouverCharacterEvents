import type { CSSProperties } from "react";
import { GraduationCap, Sparkles, Mic, ListChecks, MapPin, HeartHandshake } from "lucide-react";
import { trustHighlights } from "@/lib/site-data";
import { Reveal } from "./Reveal";

type Vars = CSSProperties & Record<string, string>;

/** Icons paired to trustHighlights (same order), each sealed in one world's hue —
 *  the first whisper of the eight-world spectrum waiting below. */
const SEALS = [
  { icon: GraduationCap, accent: "princess" },
  { icon: Sparkles, accent: "hero" },
  { icon: Mic, accent: "dinosaur" },
  { icon: ListChecks, accent: "mermaid" },
  { icon: MapPin, accent: "mascot" },
  { icon: HeartHandshake, accent: "holiday" },
] as const;

/**
 * TrustStrip — the bridge between the cinematic hero and the character worlds.
 * Six navy wax-seal nodes strung on a gold hairline (same seal grammar as the
 * Storykeeper's book and the story beats), each ringed in a world hue. The
 * section itself is a dark→light ramp: the hero's dusk bleeds in at the top,
 * the parchment of the worlds intro rises at the bottom — no borders, no edges.
 */
export function TrustStrip() {
  return (
    <section
      className="trust-seam relative bg-warm-white"
      aria-label="Why families and planners trust us"
    >
      <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.05 }} />
      {/* gold thread stringing the six seals (desktop) */}
      <span aria-hidden className="trust-thread hidden lg:block" />
      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-5 gap-y-6 px-5 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:gap-3 lg:px-8">
        {trustHighlights.map((label, i) => {
          const { icon: Icon, accent } = SEALS[i % SEALS.length];
          return (
            <Reveal
              key={label}
              delay={i * 70}
              y={14}
              scaleFrom={0.85}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <span className="trust-seal" style={{ "--acc": `var(--chapter-${accent})` } as Vars}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="trust-label">{label}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
