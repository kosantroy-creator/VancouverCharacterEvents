/**
 * princess-portraits — the 21 princess character portrait images, keyed by character
 * id (matching world-characters slugs). Standalone so the booking page can show real
 * princess portraits without pulling in KingdomDoors (and its gsap dependency).
 */
import cardIceQueen from "@/assets/princess/cards/ice-queen.webp";
import cardSpiritQueen from "@/assets/princess/cards/spirit-queen.webp";
import cardCrystal from "@/assets/princess/cards/crystal-princess.webp";
import cardSnow from "@/assets/princess/cards/snow-princess.webp";
import cardWinter from "@/assets/princess/cards/winter-princess.webp";
import cardCoronation from "@/assets/princess/cards/coronation-queen.webp";
import cardGoldenGown from "@/assets/princess/cards/golden-gown-princess.webp";
import cardVillage from "@/assets/princess/cards/village-beauty.webp";
import cardChristmasRose from "@/assets/princess/cards/christmas-rose-princess.webp";
import cardStorybook from "@/assets/princess/cards/storybook-beauty.webp";
import cardPearl from "@/assets/princess/cards/pearl-princess.webp";
import cardOcean from "@/assets/princess/cards/ocean-princess.webp";
import cardMermaid from "@/assets/princess/cards/mermaid-princess.webp";
import cardIsland from "@/assets/princess/cards/island-princess.webp";
import cardGlassSlipper from "@/assets/princess/cards/glass-slipper-princess.webp";
import cardDreaming from "@/assets/princess/cards/dreaming-princess.webp";
import cardFairest from "@/assets/princess/cards/fairest-princess.webp";
import cardTower from "@/assets/princess/cards/tower-princess.webp";
import cardButterfly from "@/assets/princess/cards/butterfly-princess.webp";
import cardDesert from "@/assets/princess/cards/desert-princess.webp";
import cardFirefly from "@/assets/princess/cards/firefly-princess.webp";

export const PRINCESS_ART: Record<string, string> = {
  "ice-queen": cardIceQueen,
  "spirit-queen": cardSpiritQueen,
  "crystal-princess": cardCrystal,
  "snow-princess": cardSnow,
  "winter-princess": cardWinter,
  "coronation-queen": cardCoronation,
  "golden-gown-princess": cardGoldenGown,
  "village-beauty": cardVillage,
  "christmas-rose-princess": cardChristmasRose,
  "storybook-beauty": cardStorybook,
  "pearl-princess": cardPearl,
  "ocean-princess": cardOcean,
  "mermaid-princess": cardMermaid,
  "island-princess": cardIsland,
  "glass-slipper-princess": cardGlassSlipper,
  "dreaming-princess": cardDreaming,
  "fairest-princess": cardFairest,
  "tower-princess": cardTower,
  "butterfly-princess": cardButterfly,
  "desert-princess": cardDesert,
  "firefly-princess": cardFirefly,
};
