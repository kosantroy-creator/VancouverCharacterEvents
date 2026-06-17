/**
 * THE ROYAL COURT — six kingdoms, twenty-one royal guests.
 *
 * Every costume in the wardrobe is its own collectible "card": a brand-safe
 * archetype name, an in-character welcome, matchmaker traits and a gown
 * label. Cards are grouped behind six kingdom doors. All animation, layout
 * and matchmaking derive from this data — add or remove a card (or a whole
 * kingdom) and the site reflows.
 *
 * LEGAL: public site uses BRAND-SAFE ARCHETYPE NAMES ONLY — never
 * copyrighted character or franchise names, in card names or gown labels.
 */
import portraitMermaid from "@/assets/princess/real-mermaid-portrait.jpg";
import portraitFrog from "@/assets/princess/real-frog-entrance.jpg";

/** Matchmaker traits — the things a child loves (from the design brief).
 *  Princess traits first; hero traits follow so the shared `matchCharacters`
 *  helper and the hero court (see `hero-roster.ts`) reuse the same machinery. */
export type CourtTrait =
  | "adventure"
  | "animals"
  | "music"
  | "magic"
  | "exploring"
  | "kindness"
  // Hero Headquarters traits
  | "courage"
  | "strength"
  | "speed"
  | "tech"
  | "teamwork"
  | "justice";

export const courtTraits: { id: CourtTrait; label: string }[] = [
  { id: "adventure", label: "Adventure" },
  { id: "animals", label: "Animals" },
  { id: "music", label: "Music" },
  { id: "magic", label: "Magic" },
  { id: "exploring", label: "Exploring" },
  { id: "kindness", label: "Kindness" },
];

export type CourtCharacter = {
  /** Stable id — also keys the portrait art and inquiry links. */
  id: string;
  /** Brand-safe archetype card name. */
  name: string;
  /** Gown / costume label shown under the name (brand-safe). */
  gown: string;
  /** One-sentence in-character welcome. Concise. Delightful. */
  welcome: string;
  /** Experience highlights — short chips, max three. */
  highlights: string[];
  /** Matchmaker affinity tags. */
  traits: CourtTrait[];
  /** Real performer photo when available (cards fall back to painted art). */
  photo?: string;
};

export type CourtDoor = {
  id: string;
  /** Kingdom name, e.g. "Ice Kingdom". */
  name: string;
  /** One-line story hook / tagline. */
  story: string;
  /** Door accent color (hex). */
  accent: string;
  /** Soft glow used across the kingdom's banner. */
  glow: string;
  characters: CourtCharacter[];
};

export type WorldCourt = {
  worldSlug: string;
  headline: string;
  subheadline: string;
  doors: CourtDoor[];
};

/* ============================================================================
   PRINCESS KINGDOMS — the benchmark court.
   ============================================================================ */

export const princessCourt: WorldCourt = {
  worldSlug: "princess-events",
  headline: "Every Door Leads to Another Story",
  subheadline: "Discover the royal guests waiting throughout the kingdom.",
  doors: [
    {
      id: "ice-kingdom",
      name: "Ice Kingdom",
      story: "A realm of ice and snow where magic glistens in every flake.",
      accent: "#9CC8EE",
      glow: "rgba(156, 200, 238, 0.5)",
      characters: [
        {
          id: "ice-queen",
          name: "Ice Queen",
          gown: "Signature Ice Gown",
          welcome: "The palace doors are open — come learn a little snow magic with me.",
          highlights: ["Snow-magic moment", "Regal storytime", "Winter sing-along"],
          traits: ["magic", "kindness"],
        },
        {
          id: "spirit-queen",
          name: "Spirit Queen",
          gown: "Spirit Gown",
          welcome: "The wind and I have been practicing something special for you.",
          highlights: ["Nature-magic moment", "Brave storytime"],
          traits: ["magic", "adventure"],
        },
        {
          id: "crystal-princess",
          name: "Crystal Princess",
          gown: "Travel Gown",
          welcome: "Every journey sparkles a little brighter when we take it together.",
          highlights: ["Adventure games", "Travel tales"],
          traits: ["adventure", "exploring"],
        },
        {
          id: "snow-princess",
          name: "Snow Princess",
          gown: "Classic Dress",
          welcome: "I save my very best snowball giggles for brand-new friends.",
          highlights: ["Playful games", "Sister sing-along"],
          traits: ["adventure", "magic"],
        },
        {
          id: "winter-princess",
          name: "Winter Princess",
          gown: "Travel Outfit",
          welcome: "Grab your mittens — today we're off on a winter adventure!",
          highlights: ["Winter games", "Adventure storytime"],
          traits: ["adventure", "exploring"],
        },
        {
          id: "coronation-queen",
          name: "Coronation Queen",
          gown: "Coronation Gown",
          welcome: "Today, you shall be crowned royalty of the Ice Kingdom.",
          highlights: ["Coronation ceremony", "Royal waltz"],
          traits: ["kindness", "magic"],
        },
      ],
    },
    {
      id: "rose-kingdom",
      name: "Rose Kingdom",
      story: "A land of timeless romance where beauty blooms eternally.",
      accent: "#E7A8B4",
      glow: "rgba(231, 168, 180, 0.5)",
      characters: [
        {
          id: "golden-gown-princess",
          name: "Golden Gown Princess",
          gown: "Golden Ballgown",
          welcome: "Shall we waltz? The ballroom has been waiting for you.",
          highlights: ["Waltz lesson", "Royal tea-party manners"],
          traits: ["music", "kindness"],
        },
        {
          id: "village-beauty",
          name: "Village Beauty",
          gown: "Village Dress",
          welcome: "Bring your favourite book — I'll bring the happily-ever-after.",
          highlights: ["Enchanted storytime", "Gentle games"],
          traits: ["kindness", "music"],
        },
        {
          id: "christmas-rose-princess",
          name: "Christmas Rose Princess",
          gown: "Christmas Gown",
          welcome: "The roses bloom warmest at Christmastime.",
          highlights: ["Holiday storytime", "Carol sing-along"],
          traits: ["kindness", "magic"],
        },
        {
          id: "storybook-beauty",
          name: "Storybook Beauty",
          gown: "Library Dress",
          welcome: "Every great adventure begins on page one.",
          highlights: ["Library storytime", "Imagination games"],
          traits: ["exploring", "kindness"],
        },
      ],
    },
    {
      id: "ocean-kingdom",
      name: "Ocean Kingdom",
      story: "An underwater paradise where waves whisper ancient songs.",
      accent: "#7FD6CE",
      glow: "rgba(127, 214, 206, 0.5)",
      characters: [
        {
          id: "pearl-princess",
          name: "Pearl Princess",
          gown: "Pink Ballgown",
          welcome: "I've collected a thousand treasures, but stories with you are my favourite.",
          highlights: ["Treasure-hunt game", "Under-the-sea sing-along"],
          traits: ["exploring", "music"],
          photo: portraitMermaid,
        },
        {
          id: "ocean-princess",
          name: "Ocean Princess",
          gown: "Blue Ballgown",
          welcome: "Every wave knows a secret — shall we go find one together?",
          highlights: ["Wave games", "Ocean storytime"],
          traits: ["adventure", "exploring"],
        },
        {
          id: "mermaid-princess",
          name: "Mermaid Princess",
          gown: "Land Tail",
          welcome: "Yes, the tail is real — and yes, you may touch it.",
          highlights: ["Mermaid meet & greet", "Photo moments"],
          traits: ["animals", "magic"],
        },
        {
          id: "island-princess",
          name: "Island Princess",
          gown: "Voyager Dress",
          welcome: "The ocean called — it said it wants to meet you.",
          highlights: ["Voyage games", "Wayfinder sing-along"],
          traits: ["exploring", "adventure", "animals"],
        },
      ],
    },
    {
      id: "glass-slipper-kingdom",
      name: "Glass Slipper Kingdom",
      story: "Where dreams meet destiny and every moment sparkles.",
      accent: "#D9B968",
      glow: "rgba(217, 185, 104, 0.5)",
      characters: [
        {
          id: "glass-slipper-princess",
          name: "Glass Slipper Princess",
          gown: "Royal Ballgown",
          welcome: "Kindness is the real magic — the slippers just sparkle.",
          highlights: ["Royal waltz", "Wish ceremony"],
          traits: ["kindness", "magic", "music"],
        },
        {
          id: "dreaming-princess",
          name: "Dreaming Princess",
          gown: "Pink Gown",
          welcome: "I dreamed of meeting you — and look, dreams really do come true.",
          highlights: ["Gentle storytime", "Royal lullaby"],
          traits: ["magic", "kindness"],
        },
        {
          id: "fairest-princess",
          name: "Fairest Princess",
          gown: "Classic Gown",
          welcome: "Wishing wells work best when you wish with a brand-new friend.",
          highlights: ["Wishing-well storytime", "Gentle games"],
          traits: ["kindness", "animals", "music"],
        },
      ],
    },
    {
      id: "tower-kingdom",
      name: "Tower Kingdom",
      story: "A kingdom of dreams and lanterns where stories reach the sky.",
      accent: "#B89BE0",
      glow: "rgba(184, 155, 224, 0.5)",
      characters: [
        {
          id: "tower-princess",
          name: "Tower Princess",
          gown: "Classic Dress",
          welcome: "I painted my whole tower — let's dream up an adventure of our own.",
          highlights: ["Creative games", "Braids & crowns moment"],
          traits: ["adventure", "exploring", "music"],
        },
        {
          id: "butterfly-princess",
          name: "Butterfly Princess",
          gown: "Classic Dress",
          welcome: "Every family has a little magic — let's go find yours together.",
          highlights: ["Family sing-along", "Butterfly games"],
          traits: ["kindness", "music"],
        },
      ],
    },
    {
      id: "starlight-kingdom",
      name: "Starlight Kingdom",
      story: "A world of desert stars where wishes light the endless night.",
      accent: "#C9A2E8",
      glow: "rgba(201, 162, 232, 0.5)",
      characters: [
        {
          id: "desert-princess",
          name: "Desert Princess",
          gown: "Emerald Outfit",
          welcome: "A whole new adventure is waiting just past the palace walls.",
          highlights: ["Magic-carpet storytime", "Treasure games"],
          traits: ["adventure", "exploring", "magic"],
        },
        {
          id: "firefly-princess",
          name: "Firefly Princess",
          gown: "Evening Ballgown",
          welcome: "Dreams take a little work and a lot of heart — let's stir up some magic.",
          highlights: ["Jazz sing-along", "Dream-big storytime"],
          traits: ["music", "kindness"],
          photo: portraitFrog,
        },
      ],
    },
  ],
};

/** All characters in a court, flattened (door reference included). */
export const courtCharacters = (court: WorldCourt) =>
  court.doors.flatMap((door) => door.characters.map((c) => ({ ...c, door })));

/**
 * Matchmaker — score characters against the traits a child loves and return
 * the top three, spread across different doors when scores tie.
 */
export function matchCharacters(court: WorldCourt, loves: CourtTrait[], take = 3) {
  const all = courtCharacters(court);
  const scored = all
    .map((c) => ({
      ...c,
      score: c.traits.reduce((s, t) => s + (loves.includes(t) ? 2 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  // Prefer door variety among equal scores so siblings discover new realms.
  const picked: typeof scored = [];
  for (const c of scored) {
    if (picked.length >= take) break;
    const doorTaken = picked.some((p) => p.door.id === c.door.id && p.score === c.score);
    if (doorTaken && scored.some((s) => !picked.includes(s) && s.score === c.score)) continue;
    picked.push(c);
  }
  for (const c of scored) {
    if (picked.length >= take) break;
    if (!picked.includes(c)) picked.push(c);
  }
  return picked.slice(0, take);
}
