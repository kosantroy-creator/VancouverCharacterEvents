/**
 * world-characters — the consolidated roster used by the booking page's "Choose Your
 * World" step. One entry per world: its hero image (reused from the world page), its
 * accent hue, a short tagline, and the brand-safe list of characters/options available
 * in that world (names pulled from royal-court / hero-roster / MermaidMeet /
 * MeadowFriends / HolidayBooking / WonderverseCast). Bazaar lists add-on options
 * rather than characters; Jurassic lists Harvey + his experiences.
 */
import { type ComponentType } from "react";
import { Crown, Footprints, Moon, PawPrint, Shell, Shield, Snowflake, Store } from "lucide-react";
import castleBright from "@/assets/princess/castle-bright.jpg";
import heroHq from "@/assets/hero/hq-hero.webp";
import dinoHero from "@/assets/dinosaur/harvey-hero-poster.webp";
import mermaidHero from "@/assets/mermaid/mermaid-hero-poster.webp";
import mascotHero from "@/assets/mascot/mascot-hero.webp";
import holidayHero from "@/assets/holiday/village-christmas.webp";
import wonderverseHero from "@/assets/specialty/wonderverse-gateway.webp";
import bazaarHero from "@/assets/bazaar/bazaar-hero.webp";

export type WorldChar = { id: string; name: string };
export type BookingWorld = {
  id: string;
  name: string;
  hero: string;
  icon: ComponentType<{ className?: string }>;
  /** object-position for the card crop, so each world's subject sits centred */
  cardPos: string;
  /** extra zoom for the card crop (>1 pulls the subject forward, <1 zooms out) */
  cardScale?: number;
  acc: string;
  /** ambient motif used to theme the Step-3 form (bubbles, leaves, snow…) */
  motif: "petal" | "spark" | "leaf" | "bubble" | "confetti" | "snow" | "star" | "lantern";
  tagline: string;
  /** label used for the roster list ("Characters" vs "Add-ons") */
  rosterLabel: string;
  characters: WorldChar[];
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const chars = (names: string[]): WorldChar[] => names.map((n) => ({ id: slug(n), name: n }));

export const BOOKING_WORLDS: BookingWorld[] = [
  {
    id: "princess",
    name: "Princess Realm",
    hero: castleBright,
    icon: Crown,
    cardPos: "47% 50%",
    cardScale: 1.25,
    acc: "#C9337E",
    motif: "petal",
    tagline: "Storybook royalty — songs, games, and magical greetings.",
    rosterLabel: "Characters",
    characters: chars([
      "Ice Queen", "Spirit Queen", "Crystal Princess", "Snow Princess", "Winter Princess",
      "Coronation Queen", "Golden Gown Princess", "Village Beauty", "Christmas Rose Princess",
      "Storybook Beauty", "Pearl Princess", "Ocean Princess", "Mermaid Princess", "Island Princess",
      "Glass Slipper Princess", "Dreaming Princess", "Fairest Princess", "Tower Princess",
      "Butterfly Princess", "Desert Princess", "Firefly Princess",
    ]),
  },
  {
    id: "hero",
    name: "Hero Headquarters",
    hero: heroHq,
    icon: Shield,
    cardPos: "76% 50%",
    acc: "#3E6EA8",
    motif: "spark",
    tagline: "High-energy hero missions, training games, and heroic entrances.",
    rosterLabel: "Characters",
    characters: chars([
      "The Web Slinger", "Web Dancer", "Captain Valor", "Star Captain", "The Midnight Agent",
      "The Frost Agent", "The Steel Sentinel", "The Night Guardian", "The Warrior Princess",
    ]),
  },
  {
    id: "jurassic",
    name: "Jurassic Expedition",
    hero: dinoHero,
    icon: Footprints,
    cardPos: "78% 50%",
    acc: "#4E8E5B",
    motif: "leaf",
    tagline: "Trainer-led dinosaur encounters and expedition excitement.",
    rosterLabel: "Experiences",
    characters: chars(["Harvey the Dinosaur", "Dino Trainer Show", "Baby Dino Meet"]),
  },
  {
    id: "mermaid",
    name: "Mermaid Cove",
    hero: mermaidHero,
    icon: Shell,
    cardPos: "88% 50%",
    acc: "#1E8A9E",
    motif: "bubble",
    tagline: "Ocean magic, poolside appearances, and whimsical photos.",
    rosterLabel: "Characters",
    characters: chars(["Marina Pearlwave", "Coralina SunSplash", "Nerissa Moonreef"]),
  },
  {
    id: "mascot",
    name: "Mascot Meadows",
    hero: mascotHero,
    icon: PawPrint,
    cardPos: "50% 50%",
    acc: "#6DA63C",
    motif: "confetti",
    tagline: "Huggable mascots, dancing, games, and cheerful energy.",
    rosterLabel: "Characters",
    characters: chars([
      "Friendly Snowman", "Classic Mouse", "Dapper Mouse", "Sweetheart Mouse", "Pretty Bow Mouse",
      "Sea Sponge Pal", "Little Vampire", "Red Furry Friend", "Little Piglet", "Happy Troll",
      "Little Shark", "Blue Pup", "Electric Mouse", "Police Pup", "Fire Pup", "Cat Hero", "Owl Hero",
      "Explorer Girl", "Animal Rescuer", "Pete the Pirate", "Blue Dino", "Pink Dino",
      "Antabella the Ant", "Cuddly Koala", "Busy Beaver", "Spring Bunny",
    ]),
  },
  {
    id: "holiday",
    name: "Holiday Village",
    hero: holidayHero,
    icon: Snowflake,
    cardPos: "42% 50%",
    acc: "#B3433F",
    motif: "snow",
    tagline: "Seasonal visits for Easter, Halloween, and Christmas.",
    rosterLabel: "Characters",
    characters: chars([
      "Storybook Alice", "Easter Bunny", "Mad Hatter", "Spooky Gothic Guest", "Santa", "Mrs. Claus",
      "Mischievous Green Guest", "Sweet Christmas Helper", "Caroler Trio", "Christmas Belle",
    ]),
  },
  {
    id: "wonderverse",
    name: "Wonderverse Realm",
    hero: wonderverseHero,
    icon: Moon,
    cardPos: "75% 50%",
    acc: "#8E5BC8",
    motif: "star",
    tagline: "Rare, specialty, and fantasy-style storybook characters.",
    rosterLabel: "Characters",
    characters: chars([
      "The Dark Lord", "The Cosmic Knight", "The Good Witch Rose", "The Good Witch Violet",
      "The Emerald Witch", "The Pop Superstar", "The MVP Champion", "The Pixie Fairy",
      "The Neverland Boy", "The Unicorn Fairy",
    ]),
  },
  {
    id: "bazaar",
    name: "Enchanted Bazaar",
    hero: bazaarHero,
    icon: Store,
    cardPos: "80% 50%",
    acc: "#2C8A93",
    motif: "lantern",
    tagline: "Add-ons and event extras to layer onto any booking.",
    rosterLabel: "Add-ons",
    characters: chars([
      "Face Painting", "Balloon Twisting", "Photography", "Inflatable Partners",
      "Glitter Tattoos", "Character Host",
    ]),
  },
];

/** id -> display name, for carrying selections into the booking form. */
export const WORLD_NAMES: Record<string, string> = Object.fromEntries(
  BOOKING_WORLDS.map((w) => [w.id, w.name]),
);

export const WORLD_BY_ID: Record<string, BookingWorld> = Object.fromEntries(
  BOOKING_WORLDS.map((w) => [w.id, w]),
);
