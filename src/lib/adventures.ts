import type { ComponentType } from "react";
import {
  Anchor,
  Crown,
  Dumbbell,
  Fingerprint,
  Gift,
  Heart,
  Leaf,
  Mountain,
  Rabbit,
  Sprout,
  Swords,
  Waves,
} from "lucide-react";

// Custom cinematic event posters — generated with Nano Banana 2 (Higgsfield),
// 16:9, brand-safe original designs. One poster per adventure.
import royalBall from "@/assets/adventures/royal-ball.webp";
import valentinesTea from "@/assets/adventures/valentines-tea-party.webp";
import enchantedNursery from "@/assets/adventures/enchanted-nursery-scavenger-hunt.webp";
import wonderlandEaster from "@/assets/adventures/wonderland-easter-high-tea.webp";
import heroBootcamp from "@/assets/adventures/hero-bootcamp.webp";
import spiderClimbing from "@/assets/adventures/spider-climbing-academy.webp";
import mermaidLagoon from "@/assets/adventures/mermaid-lagoon-pool-party.webp";
import pirateCruise from "@/assets/adventures/pirate-adventure-cruise.webp";
import galacticAcademy from "@/assets/adventures/galactic-academy.webp";
import pumpkinHarvest from "@/assets/adventures/pumpkin-harvest-festival.webp";
import detectiveAcademy from "@/assets/adventures/mystical-detective-academy.webp";
import holidayWorkshop from "@/assets/adventures/holiday-build-a-bear-workshop.webp";

type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

/**
 * Adventure status — the page launches in "interest" mode (collecting interest
 * before tickets exist). The same field grows into the future ticketing system:
 * tickets-soon → on-sale → sold-out → past. The UI already branches on it.
 */
export type AdventureStatus = "interest" | "tickets-soon" | "on-sale" | "sold-out" | "past";

/** Per-event palette — every card carries its own atmosphere. */
export type AdventureTheme = {
  /** primary accent — frame, badge, button */
  accent: string;
  /** deep accent — gradients, headings, ink */
  deep: string;
  /** soft glow / wash behind the poster */
  glow: string;
  /** card field background (light, premium) */
  field: string;
  /** wax-seal colour for the invitation letter */
  seal: string;
};

export type Adventure = {
  /** stable slug — also the anchor id on the page */
  id: string;
  month: string;
  monthShort: string;
  /** 0 = January … 11 = December */
  monthIndex: number;
  name: string;
  /** short evocative line under the name */
  tagline: string;
  /** venue partner type */
  venue: string;
  description: string;
  /** brand-safe character hosts (archetype names only) */
  hosts: string[];
  icon: IconType;
  /** promo poster (placeholder world scene for now) */
  image: string;
  status: AdventureStatus;
  theme: AdventureTheme;

  /* ---- Future expansion (unused at launch; the structure is ready) ---------
   * priceFrom?: number;       // ticket price once sales open
   * capacity?: number;        // seats, for availability + "sold out"
   * ticketsRemaining?: number;
   * gallery?: string[];       // past-event photos
   * recapVideo?: string;      // recap reel
   * token?: string;           // collectible adventure token art
   * membersOnlyUntil?: string;// early access for Character Adventure members
   * ------------------------------------------------------------------------ */
};

/**
 * The year-long lineup. One ticketed adventure per month — a single growing
 * program rather than isolated events. Hosts use brand-safe archetype names
 * (never copyrighted character or franchise names), consistent with the rest of
 * the site. Imagery is placeholder world scenes until the Higgsfield posters land.
 */
export const adventures: Adventure[] = [
  {
    id: "royal-ball",
    month: "January",
    monthShort: "Jan",
    monthIndex: 0,
    name: "Royal Ball",
    tagline: "The year opens with a crown and a waltz.",
    venue: "Banquet Hall",
    description:
      "An elegant evening of dancing, royal ceremonies, princess performances, and magical memories.",
    hosts: ["Crystal Princess", "Golden-Gown Princess", "Coronation Queen"],
    icon: Crown,
    image: royalBall,
    status: "interest",
    theme: {
      accent: "#C9A24B",
      deep: "#23305C",
      glow: "#F2E2B0",
      field: "linear-gradient(160deg, #FFFBF0 0%, #F6ECCF 55%, #EAE6D8 100%)",
      seal: "#A8842F",
    },
  },
  {
    id: "valentines-tea-party",
    month: "February",
    monthShort: "Feb",
    monthIndex: 1,
    name: "Valentine's Tea Party",
    tagline: "Sweethearts, sugar, and storybook charm.",
    venue: "High Tea House",
    description: "Share tea, treats, crafts, and royal conversation with beloved princesses.",
    hosts: ["Rose Princess", "Storybook Beauty", "Butterfly Princess"],
    icon: Heart,
    image: valentinesTea,
    status: "interest",
    theme: {
      accent: "#E07A9E",
      deep: "#A21B61",
      glow: "#FBD9E6",
      field: "linear-gradient(160deg, #FFF6FA 0%, #FBE7F0 55%, #F8E0DA 100%)",
      seal: "#C9337E",
    },
  },
  {
    id: "enchanted-nursery-scavenger-hunt",
    month: "March",
    monthShort: "Mar",
    monthIndex: 2,
    name: "Enchanted Nursery Scavenger Hunt",
    tagline: "Follow the petals to hidden surprises.",
    venue: "Garden Centre / Nursery",
    description:
      "Help magical characters uncover hidden treasures, flowers, and surprises throughout the nursery.",
    hosts: ["Firefly Princess", "Spring Fairy", "Meadow Sprite"],
    icon: Sprout,
    image: enchantedNursery,
    status: "interest",
    theme: {
      accent: "#7BA86A",
      deep: "#3E6B43",
      glow: "#D8F0C0",
      field: "linear-gradient(160deg, #FAFCF1 0%, #E9F3D6 55%, #DCEBC6 100%)",
      seal: "#4E7E3A",
    },
  },
  {
    id: "wonderland-easter-high-tea",
    month: "April",
    monthShort: "Apr",
    monthIndex: 3,
    name: "Wonderland Easter High Tea",
    tagline: "A curiouser kind of spring celebration.",
    venue: "High Tea House",
    description: "Step into a whimsical world of tea, riddles, Easter fun, and curious adventures.",
    hosts: ["The Curious Girl", "The Mad Hatter", "The White Rabbit"],
    icon: Rabbit,
    image: wonderlandEaster,
    status: "interest",
    theme: {
      accent: "#6FBFB0",
      deep: "#2C6E6A",
      glow: "#CFF0E8",
      field: "linear-gradient(160deg, #F4FCFA 0%, #DDF1EC 55%, #EAE6F5 100%)",
      seal: "#2C6E6A",
    },
  },
  {
    id: "hero-bootcamp",
    month: "May",
    monthShort: "May",
    monthIndex: 4,
    name: "Hero Bootcamp",
    tagline: "Prove you have what it takes.",
    venue: "Martial Arts Studio / Fitness Facility",
    description:
      "Train with legendary heroes and prove you have what it takes to join the ranks of tomorrow's protectors.",
    hosts: ["Captain Valor", "Star Captain", "The Steel Sentinel"],
    icon: Dumbbell,
    image: heroBootcamp,
    status: "interest",
    theme: {
      accent: "#D83A4A",
      deep: "#23518F",
      glow: "#F2C0C6",
      field: "linear-gradient(160deg, #F4F9FF 0%, #E2EEFB 55%, #F7DDE0 100%)",
      seal: "#A92534",
    },
  },
  {
    id: "spider-climbing-academy",
    month: "June",
    monthShort: "Jun",
    monthIndex: 5,
    name: "Spider Climbing Academy",
    tagline: "Scale the city. Become the hero.",
    venue: "Rock Climbing Facility",
    description:
      "Scale towering structures, complete agility challenges, and become a true urban hero.",
    hosts: ["The Web Slinger", "Web Dancer"],
    icon: Mountain,
    image: spiderClimbing,
    status: "interest",
    theme: {
      accent: "#D13A4A",
      deep: "#1F2C72",
      glow: "#F2C0C6",
      field: "linear-gradient(160deg, #FFF6F6 0%, #F6DDE0 50%, #DCE0F5 100%)",
      seal: "#B42434",
    },
  },
  {
    id: "mermaid-lagoon-pool-party",
    month: "July",
    monthShort: "Jul",
    monthIndex: 6,
    name: "Mermaid Lagoon Pool Party",
    tagline: "Dive into a summer of treasure and tails.",
    venue: "Outdoor Pool",
    description:
      "Swim alongside mermaids, search for treasure, and explore the mysteries of the lagoon.",
    hosts: ["Ocean Princess", "Pearl Princess", "Coral Mermaid"],
    icon: Waves,
    image: mermaidLagoon,
    status: "interest",
    theme: {
      accent: "#2CBEB0",
      deep: "#0E6E7E",
      glow: "#9FF3E8",
      field: "linear-gradient(160deg, #F1FCFB 0%, #D6F2EE 55%, #CFEAF2 100%)",
      seal: "#0E6E7E",
    },
  },
  {
    id: "pirate-adventure-cruise",
    month: "August",
    monthShort: "Aug",
    monthIndex: 7,
    name: "Pirate Adventure Cruise",
    tagline: "Weigh anchor for treasure and tall tales.",
    venue: "Pirate Ship",
    description:
      "Set sail on a thrilling pirate expedition filled with treasure hunts, sea legends, and adventure.",
    hosts: ["Captain Saltbeard", "First Mate Marlowe", "The Sea Siren"],
    icon: Anchor,
    image: pirateCruise,
    status: "interest",
    theme: {
      accent: "#2E8F8B",
      deep: "#163A3A",
      glow: "#CDE8E0",
      field: "linear-gradient(160deg, #F4FBF9 0%, #DCEFE9 55%, #EDE2C9 100%)",
      seal: "#1A4A46",
    },
  },
  {
    id: "galactic-academy",
    month: "September",
    monthShort: "Sep",
    monthIndex: 8,
    name: "Galactic Academy",
    tagline: "Train in the ways of the galaxy's guardians.",
    venue: "Academie Duello",
    description:
      "Train in the ways of legendary galactic warriors through lightsaber lessons and immersive missions.",
    hosts: ["Galactic Guardian", "Star Sentinel", "The Nova Knight"],
    icon: Swords,
    image: galacticAcademy,
    status: "interest",
    theme: {
      accent: "#7C5CE0",
      deep: "#2C1E66",
      glow: "#D2C4FF",
      field: "linear-gradient(160deg, #F7F5FF 0%, #E4DCFA 55%, #D7E0F6 100%)",
      seal: "#3E2C86",
    },
  },
  {
    id: "pumpkin-harvest-festival",
    month: "October",
    monthShort: "Oct",
    monthIndex: 9,
    name: "Pumpkin Harvest Festival",
    tagline: "A golden-hour celebration of autumn.",
    venue: "Pumpkin Patch / Farm",
    description:
      "Celebrate autumn with pumpkin decorating, harvest activities, seasonal characters, and magical memories.",
    hosts: ["The Harvest Fairy", "Scarecrow Jack", "The Autumn Witch"],
    icon: Leaf,
    image: pumpkinHarvest,
    status: "interest",
    theme: {
      accent: "#E08A3C",
      deep: "#8A4B1E",
      glow: "#F7D7A8",
      field: "linear-gradient(160deg, #FFF9EF 0%, #F8E5C8 55%, #EFD3AE 100%)",
      seal: "#9C5520",
    },
  },
  {
    id: "mystical-detective-academy",
    month: "November",
    monthShort: "Nov",
    monthIndex: 10,
    name: "Mystical Detective Academy",
    tagline: "Follow the clues. Recover what was lost.",
    venue: "Large Escape Room Facility",
    description:
      "Work alongside master detectives and magical protectors to solve mysteries and recover lost artifacts.",
    hosts: ["The Master Detective", "Inspector Quill", "The Arcane Warden"],
    icon: Fingerprint,
    image: detectiveAcademy,
    status: "interest",
    theme: {
      accent: "#4A78B0",
      deep: "#26344F",
      glow: "#E6C277",
      field: "linear-gradient(160deg, #F5F8FC 0%, #E0E7F1 55%, #E9DEC4 100%)",
      seal: "#2C3C5A",
    },
  },
  {
    id: "holiday-build-a-bear-workshop",
    month: "December",
    monthShort: "Dec",
    monthIndex: 11,
    name: "Holiday Build-A-Bear Workshop",
    tagline: "Stitch a friend, share the season.",
    venue: "Build-A-Bear Workshop",
    description:
      "Create a new furry friend and celebrate the holidays alongside festive characters.",
    hosts: ["The Holiday Friends", "Sugarplum Fairy", "Jolly Saint Nick"],
    icon: Gift,
    image: holidayWorkshop,
    status: "interest",
    theme: {
      accent: "#3FA46A",
      deep: "#154A36",
      glow: "#B6F0C8",
      field: "linear-gradient(160deg, #F3FBF5 0%, #DCF0E0 50%, #F7DAD6 100%)",
      seal: "#C8413E",
    },
  },
];

/** Human label + dot colour for each status — used by the card status pill and,
 *  later, the ticketing UI. */
export const STATUS_META: Record<AdventureStatus, { label: string; tone: string }> = {
  interest: { label: "Interest List Open", tone: "#C9A24B" },
  "tickets-soon": { label: "Tickets Coming Soon", tone: "#4A78B0" },
  "on-sale": { label: "Tickets On Sale", tone: "#3FA46A" },
  "sold-out": { label: "Sold Out", tone: "#A92534" },
  past: { label: "Adventure Complete", tone: "#6B7E94" },
};

export const adventureById = (id: string) => adventures.find((a) => a.id === id);
