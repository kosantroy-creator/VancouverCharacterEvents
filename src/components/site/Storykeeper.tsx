import { useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Cake,
  Crown,
  Footprints,
  GraduationCap,
  Moon,
  PawPrint,
  Shell,
  Shield,
  Snowflake,
  Sparkles,
  Store,
  Tent,
} from "lucide-react";
import { characterWorlds } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Storykeeper — the homepage's guided matcher: two questions and every visitor is
 * routed. Parents pick who the event is for + what the guest of honour loves, and
 * three matched worlds rise as glowing mini-doors (world page or straight into the
 * booking funnel with the world pre-answered). Schools / malls / corporate skip the
 * quiz entirely into the larger-events lane (/contact?path=larger — Step 1 answered).
 * Replaces FindYourEvent + the old duplicate planning CTA. CSS-only, Reveal-based,
 * reduced-motion safe. See ".sk" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

type Audience = "birthday" | "school" | "mall" | "corporate";

const AUDIENCES: { id: Audience; icon: typeof Cake; label: string }[] = [
  { id: "birthday", icon: Cake, label: "A birthday" },
  { id: "school", icon: GraduationCap, label: "A school or daycare" },
  { id: "mall", icon: Tent, label: "A mall or festival" },
  { id: "corporate", icon: Briefcase, label: "A corporate event" },
];

/** Trait chips → world slugs, in match-priority order; accent = the lead world's hue. */
const TRAITS: { id: string; icon: typeof Crown; label: string; accent: string; worlds: string[] }[] = [
  { id: "royal", icon: Crown, label: "Royalty & sparkle", accent: "princess", worlds: ["princess-events", "specialty-events", "holiday-events"] },
  { id: "brave", icon: Shield, label: "Action & bravery", accent: "hero", worlds: ["hero-events", "dinosaur-events", "specialty-events"] },
  { id: "dino", icon: Footprints, label: "Dinosaurs & discovery", accent: "dinosaur", worlds: ["dinosaur-events", "mascot-events", "hero-events"] },
  { id: "ocean", icon: Shell, label: "Oceans & mermaids", accent: "mermaid", worlds: ["mermaid-events", "princess-events", "specialty-events"] },
  { id: "hugs", icon: PawPrint, label: "Hugs & silly dances", accent: "mascot", worlds: ["mascot-events", "holiday-events", "character-extras"] },
  { id: "seasonal", icon: Snowflake, label: "Holiday magic", accent: "holiday", worlds: ["holiday-events", "mascot-events", "princess-events"] },
  { id: "fantasy", icon: Moon, label: "Fantasy & rare characters", accent: "specialty", worlds: ["specialty-events", "hero-events", "princess-events"] },
  { id: "extras", icon: Store, label: "Face paint & extras", accent: "bazaar", worlds: ["character-extras", "mascot-events", "holiday-events"] },
];

/** World slug → booking-hall world id for /contact?world= deep links. */
const BOOKING_ID: Record<string, string> = {
  "princess-events": "princess",
  "hero-events": "hero",
  "dinosaur-events": "jurassic",
  "mermaid-events": "mermaid",
  "specialty-events": "wonderverse",
  "mascot-events": "mascot",
  "holiday-events": "holiday",
  "character-extras": "bazaar",
};

const PLANNER_COPY: Record<Exclude<Audience, "birthday">, { title: string; points: string[] }> = {
  school: {
    title: "Schools & daycares",
    points: [
      "Age-aware performers who understand classroom energy",
      "Visits shaped around your schedule, space, and group size",
      "One point of contact from request to visit day",
    ],
  },
  mall: {
    title: "Malls & festivals",
    points: [
      "Characters built for crowds, photos, and guest flow",
      "Planning support for timing, space, and appearances",
      "Single or multi-character activations",
    ],
  },
  corporate: {
    title: "Corporate & community",
    points: [
      "Polished, brand-friendly character appearances",
      "Family days, holiday parties, and public events",
      "We plan around your run-sheet and venue",
    ],
  },
};

export function Storykeeper() {
  const [audience, setAudience] = useState<Audience | null>(null);
  const [traits, setTraits] = useState<string[]>([]);

  const toggleTrait = (id: string) =>
    setTraits((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  // Matched worlds: union of selected traits' worlds in pick order, top 3.
  const matched = (() => {
    const out: string[] = [];
    for (const id of traits) {
      const tr = TRAITS.find((t) => t.id === id);
      for (const w of tr?.worlds ?? []) if (!out.includes(w)) out.push(w);
    }
    return out.slice(0, 3).map((slug) => characterWorlds.find((w) => w.slug === slug)).filter(Boolean);
  })();

  const planner = audience && audience !== "birthday" ? PLANNER_COPY[audience] : null;

  return (
    <div className="sk mx-auto max-w-4xl">
      {/* the Storykeeper's book */}
      <Reveal y={14} className="flex justify-center">
        <span aria-hidden className="sk-book">
          <BookOpen className="h-7 w-7" />
          <span className="sk-book-spark"><Sparkles className="h-3.5 w-3.5" /></span>
        </span>
      </Reveal>

      {/* Q1 — who is it for? */}
      <Reveal delay={90} y={14}>
        <p className="sk-q">Who are we celebrating?</p>
      </Reveal>
      <Reveal delay={150} y={14}>
        <div className="sk-chips" role="group" aria-label="What kind of event are you planning?">
          {AUDIENCES.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setAudience(id)}
              aria-pressed={audience === id}
              className={cn("sk-chip", audience === id && "is-on")}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Birthday lane — Q2 traits + matched worlds */}
      {audience === "birthday" ? (
        <div className="sk-lane">
          <p className="sk-q sk-q--2">What does the guest of honour love?</p>
          <div className="sk-chips" role="group" aria-label="Pick what they love">
            {TRAITS.map(({ id, icon: Icon, label, accent }) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleTrait(id)}
                aria-pressed={traits.includes(id)}
                className={cn("sk-chip sk-chip--trait", traits.includes(id) && "is-on")}
                style={{ "--acc": `var(--chapter-${accent})` } as Vars}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>

          {matched.length ? (
            <>
              <p className="sk-result-line">
                <Sparkles className="h-4 w-4" aria-hidden />
                The Storykeeper recommends&hellip;
              </p>
              <ul className="sk-matches">
                {matched.map((w) => {
                  const accent = `var(--chapter-${w!.accent})`;
                  return (
                    <li key={w!.slug} className="sk-match" style={{ "--acc": accent } as Vars}>
                      <span className="sk-match-medallion">
                        <img src={w!.medallion} alt="" aria-hidden width={56} height={56} />
                      </span>
                      <span className="sk-match-name">{w!.name}</span>
                      <span className="sk-match-blurb">{w!.blurb}</span>
                      <span className="sk-match-ctas">
                        <Link to={w!.exploreTo} className="sk-match-link">
                          Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <Link
                          to="/contact"
                          search={{ world: BOOKING_ID[w!.slug] }}
                          className="sk-match-book btn-magic"
                        >
                          Book
                        </Link>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="sk-hint">Pick one or two — the Storykeeper will match the right worlds.</p>
          )}
        </div>
      ) : null}

      {/* Planner lane — schools / malls / corporate skip straight to the funnel */}
      {planner ? (
        <div className="sk-lane">
          <div className="sk-planner">
            <h3 className="sk-planner-title">{planner.title}</h3>
            <ul className="sk-planner-points">
              {planner.points.map((p) => (
                <li key={p}>
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/contact" search={{ path: "larger" }} className="sk-planner-cta btn-magic group">
              Start a Larger-Event Request
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <p className="sk-planner-note">
              Your request opens with the larger-events path already selected.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
