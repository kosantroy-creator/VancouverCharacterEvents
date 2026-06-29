import { type ComponentType } from "react";
import { BadgeCheck, Headset, Sparkles, SlidersHorizontal } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import panorama from "@/assets/booking/all-worlds-panorama.webp";
import imgSingle from "@/assets/booking/path-single.webp";
import imgMulti from "@/assets/booking/path-multi.webp";
import imgLarger from "@/assets/booking/path-larger.webp";

/**
 * BookingPaths — "Step One: Choose Your Path". Three ornate booking-plaque buttons
 * (the supplied card art) floating on the full-brightness all-eight-worlds panorama.
 * The intro heading lives in BookingIntro just above, blending the hero into this
 * vista. Picking a card is what reveals Steps 2 & 3 below (route-gated) — one choice
 * at a time. Reduced-motion safe via Reveal + the global guard. See ".bkp" in
 * styles.css.
 */
export type BookingPathId = "single" | "multi" | "larger";

type Path = { id: BookingPathId; title: string; img: string };

// Order: Multi-World (left), Single World (middle — the most common), Larger (right).
const PATHS: Path[] = [
  { id: "multi", title: "Multi-World Event — best when combining characters, worlds, experiences, or add-ons. Build multi-world event.", img: imgMulti },
  { id: "single", title: "Single World Experience — best for birthdays, private parties, and simple character visits. Start single world booking.", img: imgSingle },
  { id: "larger", title: "Schools, Corporate & Festivals — best for larger events and public appearances. Plan larger event.", img: imgLarger },
];

const TRUST: { icon: ComponentType<{ className?: string }>; title: string; note: string }[] = [
  { icon: BadgeCheck, title: "Professional Performers", note: "Trained, in-house, and experienced." },
  { icon: Sparkles, title: "Magical Memories", note: "Bringing stories to life." },
  { icon: SlidersHorizontal, title: "Custom Experiences", note: "Tailored to your vision." },
  { icon: Headset, title: "Worlds Come Together", note: "One event, infinite wonder." },
];

export function BookingPaths({
  selected,
  onSelect,
}: {
  selected: BookingPathId | null;
  onSelect: (id: BookingPathId) => void;
}) {
  return (
    <section id="booking-paths" aria-label="Choose your booking path" className="bkp relative isolate scroll-mt-20 overflow-hidden">
      {/* all-worlds panorama background — full brightness */}
      <img
        src={panorama}
        alt="A panorama of all eight magical worlds — castle kingdom, hero city, dinosaur valley, mermaid cove, mascot meadows, holiday village, wonderverse, and enchanted bazaar."
        decoding="async"
        loading="lazy"
        className="bkp-bg absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* path plaque buttons */}
        <div role="radiogroup" aria-label="Choose your booking path" className="bkp-grid">
          {PATHS.map((p, i) => {
            const isSel = selected === p.id;
            return (
              <Reveal key={p.id} delay={120 + i * 140} y={28} className="bkp-cell">
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSel}
                  aria-label={p.title}
                  onClick={() => onSelect(p.id)}
                  className={cn("bkp-btn", isSel && "is-selected")}
                >
                  <img src={p.img} alt="" aria-hidden className="bkp-btn-img" />
                  <span aria-hidden className="bkp-btn-sheen" />
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* trust strip */}
        <Reveal delay={320} y={16} className="block">
          <ul className="bkp-trust">
            {TRUST.map(({ icon: Icon, title, note }) => (
              <li key={title} className="bkp-trust-item">
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span>
                  <span className="bkp-trust-title">{title}</span>
                  <span className="bkp-trust-note">{note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
