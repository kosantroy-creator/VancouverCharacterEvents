import { type ComponentType, type CSSProperties } from "react";
import {
  ArrowRight,
  Check,
  Compass,
  Crown,
  Footprints,
  Moon,
  PawPrint,
  Shell,
  Shield,
  Snowflake,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import type { BookingPathId } from "./BookingPaths";

/**
 * BookingWorlds — "Choose Your World": step two of the booking page, under Choose
 * Your Booking Path. A realm-selection table inside the Grand Booking Hall: eight
 * world medallion cards + a "Help Me Decide" card, with a live "Your Event Plan"
 * panel. Selection mode ADAPTS to the path picked in the previous section —
 * Single World = single-select (radio), Multi-World / Larger events = multi-select
 * (checkbox). Selections flow up to the booking form. Central VCE palette (cream +
 * gold + navy) with gentle per-world accents; reduced-motion safe via Reveal + the
 * global guard. See ".bkw" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type World = {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  acc: string;
  copy: string;
  bestFor: string[];
};

const WORLDS: World[] = [
  { id: "princess", name: "Princess Realm", icon: Crown, acc: "#C9337E", copy: "Elegant princess-inspired visits — storybook greetings, songs, games, photos, and magical party moments.", bestFor: ["Birthdays", "Tea parties", "Schools"] },
  { id: "hero", name: "Hero Headquarters", icon: Shield, acc: "#3E6EA8", copy: "Action-packed hero parties with training games, missions, heroic entrances, and high-energy photo moments.", bestFor: ["Birthdays", "School events", "Active parties"] },
  { id: "jurassic", name: "Jurassic Expedition", icon: Footprints, acc: "#4E8E5B", copy: "Dinosaur experiences with trainer-led moments, dino interaction, photos, and expedition excitement.", bestFor: ["Birthdays", "Schools", "Festivals"] },
  { id: "mermaid", name: "Mermaid Cove", icon: Shell, acc: "#1E8A9E", copy: "Mermaid-inspired visits, ocean magic, poolside appearances, photos, and whimsical aquatic moments.", bestFor: ["Pool parties", "Summer events", "Birthdays"] },
  { id: "mascot", name: "Mascot Meadows", icon: PawPrint, acc: "#6DA63C", copy: "Fun mascot visits with hugs, dancing, photos, games, and cheerful character energy.", bestFor: ["Younger birthdays", "Daycares", "Family events"] },
  { id: "holiday", name: "Holiday Village", icon: Snowflake, acc: "#B3433F", copy: "Seasonal visits for Easter, Halloween, Christmas, school events, mall appearances, and holiday photos.", bestFor: ["Easter", "Halloween", "Christmas"] },
  { id: "wonderverse", name: "Wonderverse Realm", icon: Moon, acc: "#8E5BC8", copy: "Rare, specialty, storybook, and fantasy-style characters that don't fit one standard world.", bestFor: ["Unique parties", "Themed events", "Custom"] },
  { id: "bazaar", name: "Enchanted Bazaar", icon: Store, acc: "#2C8A93", copy: "Face painting, balloon twisting, photography, inflatable partner add-ons, and event extras.", bestFor: ["Add-ons", "Festivals", "Larger events"] },
];

const HELP: World = {
  id: "help",
  name: "Help Me Decide",
  icon: Compass,
  acc: "#C19A3C",
  copy: "Not sure which world or add-ons fit your event? Tell us your date, guests, venue, and event style — we'll recommend the best options.",
  bestFor: ["Unsure clients", "Mixed events", "Custom ideas"],
};

const ALL: Record<string, World> = Object.fromEntries([...WORLDS, HELP].map((w) => [w.id, w]));

/** id -> display name, for carrying selections into the booking form. */
export const WORLD_NAMES: Record<string, string> = Object.fromEntries(
  [...WORLDS, HELP].map((w) => [w.id, w.name]),
);

const PATH_HELP: Record<BookingPathId, string> = {
  single: "Choose the main world you want for your event. You can still mention add-ons later.",
  multi: "Choose all the worlds, characters, and add-ons you may want to combine.",
  larger: "Choose the experiences you're considering — performers, stations, walk-around moments, photos, or add-ons.",
};

const PATH_LABEL: Record<BookingPathId, string> = {
  single: "Single World Experience",
  multi: "Multi-World Event",
  larger: "Schools, Corporate & Festivals",
};

export function BookingWorlds({
  path,
  selected,
  onChange,
}: {
  path: BookingPathId | null;
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const multi = path !== "single";

  const toggle = (id: string) => {
    if (!multi) {
      onChange(selected[0] === id ? [] : [id]);
      return;
    }
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const helper = path ? PATH_HELP[path] : "Pick the worlds, characters, or add-ons you're interested in. Choose Help Me Decide if you'd like a recommendation.";
  const chips = selected.map((id) => ALL[id]).filter(Boolean);
  // Warm the section gently toward the first chosen realm (<=14% in CSS — central hall stays).
  const selAcc = selected.length ? ALL[selected[0]]?.acc : undefined;

  const renderCard = (w: World, featured = false) => {
    const Icon = w.icon;
    const isSel = selected.includes(w.id);
    return (
      <div
        className={cn("bkw-card", featured && "bkw-card--help", isSel && "is-selected")}
        style={{ "--acc": w.acc } as Vars}
      >
        <button
          type="button"
          role={multi ? "checkbox" : "radio"}
          aria-checked={isSel}
          onClick={() => toggle(w.id)}
          className="bkw-select"
        >
          <span aria-hidden className="bkw-stamp"><Check className="h-3.5 w-3.5" /></span>
          <span aria-hidden className="bkw-medal"><Icon className="h-6 w-6" /></span>
          <span className="bkw-name">{w.name}</span>
          <span className="bkw-copy">{w.copy}</span>
          <span className="bkw-bestfor">
            <span className="bkw-bestfor-l">Best for:</span>
            {w.bestFor.map((b) => (
              <span key={b} className="bkw-tag">{b}</span>
            ))}
          </span>
        </button>
      </div>
    );
  };

  return (
    <section
      id="choose-world"
      aria-labelledby="bkw-title"
      className="bkw relative isolate scroll-mt-20 overflow-hidden"
      style={selAcc ? ({ "--world-acc": selAcc } as Vars) : undefined}
    >
      <div aria-hidden className="bkw-decor pointer-events-none absolute inset-0">
        <span className="bkw-glow bkw-glow-l" />
        <span className="bkw-glow bkw-glow-r" />
        <span className="bkw-map" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bkw-head mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <span className="bkw-eyebrow">
              <span aria-hidden className="bkw-eyebrow-fl" />
              Step Two · Choose Your World
              <span aria-hidden className="bkw-eyebrow-fl bkw-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={90} y={16}>
            <h2 id="bkw-title" className="bkw-title">What kind of magic are you planning?</h2>
          </Reveal>
          <Reveal delay={160} y={14}>
            <p className="bkw-sub">
              Select the world, characters, experiences, or add-ons you&apos;re interested in. Not sure
              yet? Choose <strong>Help Me Decide</strong> and we&apos;ll recommend the best fit.
            </p>
          </Reveal>
          <Reveal delay={220} y={12}>
            <p className="bkw-mode-hint">
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> {helper}
            </p>
          </Reveal>
        </div>

        {/* layout: cards + Your Event Plan panel */}
        <div className="bkw-layout">
          <div className="bkw-main">
            <div role={multi ? "group" : "radiogroup"} aria-label="Choose your world" className="bkw-grid">
              {WORLDS.map((w, i) => (
                <Reveal key={w.id} delay={260 + Math.min(i, 5) * 70} y={20} className="bkw-cell">
                  {renderCard(w)}
                </Reveal>
              ))}
            </div>
            <Reveal delay={300} y={20} className="mt-4 block">
              {renderCard(HELP, true)}
            </Reveal>
          </div>

          {/* Your Event Plan */}
          <Reveal delay={200} y={18} as="aside" className="bkw-plan-wrap">
            <div className="bkw-plan" aria-live="polite">
              <h3 className="bkw-plan-title">
                <Sparkles className="h-4 w-4" aria-hidden /> Your Event Plan
              </h3>

              <div className="bkw-plan-row">
                <span className="bkw-plan-label">Booking path</span>
                {path ? (
                  <p className="bkw-plan-value">
                    {PATH_LABEL[path]}
                    <a href="#booking-paths" className="bkw-plan-link">Change path</a>
                  </p>
                ) : (
                  <p className="bkw-plan-value bkw-plan-muted">
                    <a href="#booking-paths" className="bkw-plan-link">Choose a booking path</a>
                  </p>
                )}
              </div>

              <div className="bkw-plan-row">
                <span className="bkw-plan-label">{multi ? "Selected worlds" : "Selected world"}</span>
                {chips.length ? (
                  <ul className="bkw-plan-chips">
                    {chips.map((w) => (
                      <li key={w.id} className="bkw-plan-chip" style={{ "--acc": w.acc } as Vars}>
                        <span aria-hidden className="bkw-plan-chip-dot" />
                        {w.name}
                        <button
                          type="button"
                          aria-label={`Remove ${w.name}`}
                          onClick={() => onChange(selected.filter((x) => x !== w.id))}
                          className="bkw-plan-chip-x"
                        >
                          <X className="h-3 w-3" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p className="bkw-plan-value bkw-plan-muted">Your selections will appear here.</p>
                    <div aria-hidden className="bkw-plan-ghost">
                      {WORLDS.map((w) => {
                        const I = w.icon;
                        return (
                          <span key={w.id} style={{ "--g": w.acc } as Vars}><I className="h-3.5 w-3.5" /></span>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <p className="bkw-plan-next">
                <strong>What happens next?</strong> We&apos;ll collect your event date, city, guest
                count, and character or service details — then confirm availability.
              </p>

              <a href="#book" className="bkw-plan-cta group">
                Continue to Event Details
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <p className="bkw-plan-fine">Your information is secure — only used for your request.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
