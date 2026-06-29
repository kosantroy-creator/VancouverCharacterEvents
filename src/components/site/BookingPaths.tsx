import { type ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Compass,
  DoorOpen,
  Headset,
  Sparkles,
  Network,
  SlidersHorizontal,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * BookingPaths — "Choose Your Booking Path": the second section of the Booking /
 * Contact page, directly under the Grand Booking Hall hero. Three selectable
 * planning-path cards (Single World · Multi-World · Schools, Corporate & Festivals)
 * let visitors self-select the right kind of request before the full form. The
 * first card is the featured "Most Common" path (raised navy + gold). Selecting a
 * card glows it, stamps a check, fills the "Your Booking Path" summary panel, and
 * is passed up to the booking form. CTAs scroll to #book. Central VCE palette
 * (royal navy + warm gold + cream), booking-hall texture, reduced-motion safe.
 * See ".bkp" in styles.css.
 */
export type BookingPathId = "single" | "multi" | "larger";

type Path = {
  id: BookingPathId;
  title: string;
  badge?: string;
  icon: ComponentType<{ className?: string }>;
  copy: string;
  examples: string[];
  cta: string;
  /** label carried into the booking form */
  label: string;
  /** shown in the summary panel once selected */
  helper: string;
  next: string;
};

const PATHS: Path[] = [
  {
    id: "single",
    title: "Single World Experience",
    badge: "Most Common",
    icon: DoorOpen,
    copy: "Best for birthdays, private parties, and simple character visits where you want to book one main world or experience.",
    examples: [
      "Princess party",
      "Hero visit",
      "Mascot appearance",
      "Dinosaur experience",
      "Mermaid event",
      "Holiday visit",
      "Wonderverse character",
      "Bazaar add-on",
    ],
    cta: "Start Single World Booking",
    label: "Single World Experience",
    helper: "Great — we'll help you choose one main world and the right visit format.",
    next: "Choose your world and tell us your event details.",
  },
  {
    id: "multi",
    title: "Multi-World Event",
    icon: Network,
    copy: "Best when you want to combine characters, worlds, experiences, or add-ons into one larger celebration.",
    examples: [
      "Princess + Mascot",
      "Hero + Face Painting",
      "Dinosaur + Photographer",
      "Holiday + Carolers",
      "Visit + Bazaar add-ons",
      "Multiple performers",
    ],
    cta: "Build Multi-World Event",
    label: "Multi-World Event",
    helper: "Perfect — you can choose multiple worlds, characters, or Bazaar add-ons for one event.",
    next: "Pick the worlds, characters, and add-ons you'd like to combine.",
  },
  {
    id: "larger",
    title: "Schools, Corporate & Festivals",
    icon: CalendarDays,
    copy: "Best for larger events, public appearances, schools, daycares, malls, festivals, corporate celebrations, and community events.",
    examples: [
      "School visit",
      "Daycare event",
      "Mall appearance",
      "Festival activation",
      "Corporate family day",
      "Community celebration",
      "Brand or venue event",
      "Multi-station public event",
    ],
    cta: "Plan Larger Event",
    label: "Schools, Corporate & Festivals",
    helper: "Great — we'll collect details about your venue, audience, timing, and event flow.",
    next: "Tell us about your venue, audience, timing, and event flow.",
  },
];

const TRUST: { icon: ComponentType<{ className?: string }>; title: string; note: string }[] = [
  { icon: BadgeCheck, title: "Trusted Performers", note: "Vetted, in-character professionals." },
  { icon: SlidersHorizontal, title: "Flexible Options", note: "Shaped around your event." },
  { icon: Headset, title: "Personal Support", note: "Guided from first email to event day." },
  { icon: Sparkles, title: "Magical Results", note: "Moments your guests keep." },
];

export function BookingPaths({
  selected,
  onSelect,
}: {
  selected: BookingPathId | null;
  onSelect: (id: BookingPathId) => void;
}) {
  const chosen = PATHS.find((p) => p.id === selected) ?? null;

  return (
    <section id="booking-paths" aria-labelledby="bkp-title" className="bkp relative isolate scroll-mt-20 overflow-hidden">
      {/* booking-hall continuation — cream/gold field + faint planning-map lines */}
      <div aria-hidden className="bkp-decor pointer-events-none absolute inset-0">
        <span className="bkp-glow bkp-glow-l" />
        <span className="bkp-glow bkp-glow-r" />
        <span className="bkp-map" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bkp-head mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <span className="bkp-eyebrow">
              <span aria-hidden className="bkp-eyebrow-fl" />
              Step One · Choose Your Path
              <span aria-hidden className="bkp-eyebrow-fl bkp-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={90} y={16}>
            <h2 id="bkp-title" className="bkp-title">How would you like to begin?</h2>
          </Reveal>
          <Reveal delay={160} y={14}>
            <p className="bkp-sub">
              Choose the booking path that best matches your event. If you&apos;re not completely sure,
              pick the closest option — we&apos;ll help guide the rest.
            </p>
          </Reveal>
        </div>

        {/* path cards */}
        <div role="radiogroup" aria-label="Choose your booking path" className="bkp-grid">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            const isSel = selected === p.id;
            return (
              <Reveal key={p.id} delay={300 + i * 110} y={22} className="bkp-cell">
                <div className={cn("bkp-card", p.badge && "bkp-card--featured", isSel && "is-selected")}>
                  {p.badge ? (
                    <span className="bkp-ribbon">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      {p.badge}
                    </span>
                  ) : null}

                  {/* select control — the whole upper card toggles the path */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => onSelect(p.id)}
                    className="bkp-select"
                  >
                    <span aria-hidden className="bkp-stamp">
                      <Check className="h-4 w-4" />
                    </span>
                    <span aria-hidden className="bkp-emblem">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="bkp-card-title">{p.title}</span>
                    <span className="bkp-card-copy">{p.copy}</span>
                    <span className="bkp-examples">
                      {p.examples.map((ex) => (
                        <span key={ex} className="bkp-ex">
                          <span aria-hidden className="bkp-ex-dot" />
                          {ex}
                        </span>
                      ))}
                    </span>
                  </button>

                  {/* CTA — selects the path and glides to the form */}
                  <a
                    href="#book"
                    onClick={() => onSelect(p.id)}
                    className={cn("bkp-cta group", !p.badge && "bkp-cta--soft")}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Your Booking Path summary panel */}
        <Reveal delay={120} y={16}>
          <div className={cn("bkp-summary", chosen && "is-set")} aria-live="polite">
            <span className="bkp-summary-ic">
              <Compass className="h-5 w-5" aria-hidden />
            </span>
            {chosen ? (
              <p className="bkp-summary-text">
                <span className="bkp-summary-label">Selected path:</span>{" "}
                <strong>{chosen.label}</strong> · {chosen.helper}{" "}
                <span className="bkp-summary-next">Next: {chosen.next}</span>
              </p>
            ) : (
              <div className="bkp-summary-text">
                <span className="bkp-summary-label">Your booking path</span> — choose a path above to begin.
                <span className="bkp-summary-preview">
                  <span><i aria-hidden />Single World</span>
                  <span><i aria-hidden />Multi-World</span>
                  <span><i aria-hidden />Schools &amp; Festivals</span>
                </span>
              </div>
            )}
          </div>
        </Reveal>

        {/* reassurance row */}
        <ul className="bkp-trust">
          {TRUST.map(({ icon: Icon, title, note }) => (
            <li key={title} className="bkp-trust-item">
              <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
              <span>
                <span className="bkp-trust-title">{title}</span>
                <span className="bkp-trust-note">{note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
