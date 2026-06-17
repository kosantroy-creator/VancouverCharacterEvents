/**
 * HERO HEADQUARTERS — three hero portals, nine heroes.
 *
 * The hero sibling of the princess `royalCourt`. It reuses the same generic
 * court types (`WorldCourt` / `CourtDoor` / `CourtCharacter`) so the shared
 * matchmaker (`matchCharacters`) and card components work unchanged. The
 * `gown` field is repurposed as the suit / costume label, and `highlights`
 * as the card's short trait chips. Heroes are grouped into three immersive
 * Hero HQ portals; add more heroes to any portal as the roster grows.
 *
 * LEGAL: public site uses BRAND-SAFE ARCHETYPE NAMES ONLY — never copyrighted
 * character or franchise names, in names, suit labels, welcomes, or imagery.
 * Each persona is original; it merely evokes a classic adventure archetype.
 */
import type { CourtTrait, WorldCourt } from "@/lib/royal-court";

/** Matchmaker traits — the things a young hero loves. */
export const heroTraits: { id: CourtTrait; label: string }[] = [
  { id: "courage", label: "Courage" },
  { id: "strength", label: "Strength" },
  { id: "speed", label: "Speed" },
  { id: "tech", label: "Tech" },
  { id: "teamwork", label: "Teamwork" },
  { id: "justice", label: "Justice" },
];

export const heroSquad: WorldCourt = {
  worldSlug: "hero-events",
  headline: "Assemble Your Squad",
  subheadline: "Step inside Hero HQ and choose the hero style that fits your celebration.",
  doors: [
    {
      id: "web-heroes",
      name: "Web Heroes",
      story:
        "Fast, playful, high-energy heroes with acrobatic poses, big reactions, and action-packed party moments.",
      accent: "#4F8FDC",
      glow: "rgba(79, 143, 220, 0.45)",
      characters: [
        {
          id: "web-slinger",
          name: "The Web Slinger",
          gown: "Crimson & Cobalt Suit",
          welcome: "Friendly neighbourhood hero, reporting for birthday duty!",
          highlights: ["Fast", "Playful", "Acrobatics"],
          traits: ["speed", "courage"],
        },
        {
          id: "web-dancer",
          name: "Web Dancer",
          gown: "White & Rose Hooded Suit",
          welcome: "Two webs, twice the fun — let's flip into action together.",
          highlights: ["Fast", "Playful", "Acrobatics"],
          traits: ["speed", "teamwork"],
        },
      ],
    },
    {
      id: "star-shield-heroes",
      name: "Star & Shield Heroes",
      story:
        "Brave leaders, cosmic champions, and tactical mission specialists ready to lead the team.",
      accent: "#2F5FA8",
      glow: "rgba(47, 95, 168, 0.45)",
      characters: [
        {
          id: "captain-valor",
          name: "Captain Valor",
          gown: "Star Shield & Stripes",
          welcome: "Stand tall, recruits — every great hero starts with a brave heart.",
          highlights: ["Courage", "Teamwork", "Mission"],
          traits: ["courage", "teamwork"],
        },
        {
          id: "star-captain",
          name: "Star Captain",
          gown: "Cosmic Flight Suit",
          welcome: "Higher, further, faster — ready to soar with me?",
          highlights: ["Courage", "Teamwork", "Mission"],
          traits: ["strength", "justice"],
        },
        {
          id: "midnight-agent",
          name: "The Midnight Agent",
          gown: "Black Tactical Suit",
          welcome: "Mission accepted — let's see who's got the sharpest spy skills.",
          highlights: ["Courage", "Teamwork", "Mission"],
          traits: ["tech", "speed"],
        },
        {
          id: "frost-agent",
          name: "The Frost Agent",
          gown: "White Tactical Suit",
          welcome: "Cool, calm, and clever — every great team needs a steady hand.",
          highlights: ["Courage", "Teamwork", "Mission"],
          traits: ["teamwork", "tech"],
        },
      ],
    },
    {
      id: "legends-guardians",
      name: "Legends & Guardians",
      story:
        "Larger-than-life heroes with dramatic entrances, powerful presence, and unforgettable photo moments.",
      accent: "#3C6FB5",
      glow: "rgba(60, 111, 181, 0.45)",
      characters: [
        {
          id: "steel-sentinel",
          name: "The Steel Sentinel",
          gown: "Blue Suit & Red Cape",
          welcome: "Up, up, and away — let's show everyone what courage looks like.",
          highlights: ["Iconic", "Powerful", "Photos"],
          traits: ["strength", "courage"],
        },
        {
          id: "night-guardian",
          name: "The Night Guardian",
          gown: "Caped Vigilante, Black",
          welcome: "The city's safe tonight — because heroes like you showed up.",
          highlights: ["Iconic", "Powerful", "Photos"],
          traits: ["tech", "justice"],
        },
        {
          id: "warrior-princess",
          name: "The Warrior Princess",
          gown: "Golden Amazon Armor",
          welcome: "Truth, kindness, and courage — that's the warrior's way.",
          highlights: ["Iconic", "Powerful", "Photos"],
          traits: ["justice", "strength"],
        },
      ],
    },
  ],
};
