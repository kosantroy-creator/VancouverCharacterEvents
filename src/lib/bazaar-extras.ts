/**
 * bazaar-extras — the shared Enchanted Bazaar partner roster: the people in each
 * add-on category and their packages/prices, plus HW House of Bounce's inflatable
 * rentals. Used by both the Bazaar page (BazaarPartners) and the booking form's
 * add-on / estimate builder, so pricing lives in one place. Real published prices;
 * "Custom Quote" items have no fixed number (priceNum = null) and the team quotes them.
 */
import { type ComponentType } from "react";
import { Camera, Palette, PartyPopper, Tent } from "lucide-react";
import laurenPhoto from "@/assets/bazaar/lauren.webp";
import alejandraPhoto from "@/assets/bazaar/alejandra.webp";
import behroozPhoto from "@/assets/bazaar/behrooz.webp";
import hobLogo from "@/assets/bazaar/inflatables/hob-logo.png";
import imgUltraWhite from "@/assets/bazaar/inflatables/ultra-white.webp";
import imgEnchanted from "@/assets/bazaar/inflatables/enchanted-forest.webp";
import imgJellyBean from "@/assets/bazaar/inflatables/jelly-bean.webp";
import imgDoubleSlide from "@/assets/bazaar/inflatables/double-slide.webp";
import imgJoySlide from "@/assets/bazaar/inflatables/joy-slide.webp";
import imgRedYellowBlue from "@/assets/bazaar/inflatables/red-yellow-blue.webp";
import imgAaSmall from "@/assets/bazaar/inflatables/aa-small.webp";
import imgSoftSuper from "@/assets/bazaar/inflatables/soft-super.webp";
import imgSoftModerate from "@/assets/bazaar/inflatables/soft-moderate.webp";
import imgSoftSmall from "@/assets/bazaar/inflatables/soft-small.webp";
import imgSoftMini from "@/assets/bazaar/inflatables/soft-mini.webp";
import imgBlueShark from "@/assets/bazaar/inflatables/blue-shark-park.webp";

type IconType = ComponentType<{ className?: string }>;
export type Pkg = { name: string; meta: string; price: string; includes: string[]; bestFor: string; featured?: boolean };
export type Person = { name: string; role: string; photo: string; objectPos?: string; packages: Pkg[] };
export type Rental = { name: string; desc: string; img: string; dims?: string; specs?: string; rate?: string };
export type InflatableCat = { id: string; name: string; icon: IconType; acc: string; accDeep: string; blurb: string; thumb: string; items: Rental[] };

/* ---- the three artist partners ---- */
export const FACE_ARTIST: Person = {
  name: "Alejandra",
  role: "Face & Body Artist",
  photo: alejandraPhoto,
  objectPos: "center 22%",
  packages: [
    { name: "1 Hour Painting", meta: "60 minutes", price: "$200 + travel", bestFor: "Birthdays & smaller parties", includes: ["Skin-safe, hypoallergenic paints", "Design menu — animals, superheroes, flowers & more", "Cheek art and full-face designs", "Cosmetic-grade glitter accents", "Great for up to 12–15 guests"] },
    { name: "1½ Hours Painting", meta: "1 hour + 30 min", price: "$300 + travel", bestFor: "Bigger parties & longer events", featured: true, includes: ["Everything in the 1 Hour package", "An extra 30 minutes of painting", "More guests painted, shorter wait in line", "Mix of quick and detailed designs"] },
    { name: "Custom & Public Events", meta: "2-hour minimum", price: "Custom Quote", bestFor: "Large or public events", includes: ["Schools, festivals & community events", "Multiple artists for large crowds", "Themed design sets to match your event", "Glitter & gem stations", "Built around your timing & guest flow"] },
  ],
};

export const BALLOON_ARTIST: Person = {
  name: "Lauren",
  role: "Twistress Purple · Balloon Artist",
  photo: laurenPhoto,
  objectPos: "center 24%",
  packages: [
    { name: "1 Hour Twisting", meta: "60 minutes", price: "$200 + travel", bestFor: "Birthdays & smaller parties", includes: ["Festive attire (no clown makeup)", "Balloon menu — animals, swords, flowers & wearables", "~15 balloons (up to 20–30 simple)", "Great for up to 15 guests", "Twists alongside your other activities"] },
    { name: "1½ Hours Twisting", meta: "1 hour + 30 min", price: "Custom Quote", bestFor: "Bigger parties & longer events", featured: true, includes: ["Everything in the 1 Hour package", "An extra 30 minutes of twisting", "More balloons & a shorter wait in line", "Optional mini twisting lesson"] },
    { name: "Custom & Public Events", meta: "2-hour minimum", price: "Custom Quote", bestFor: "Large or public events", includes: ["Schools, festivals & corporate picnics", "Multiple artists for large crowds", "Party favours / balloon candy cups", "Mini twisting lessons (15–30 min)", "Built around your timing & guest flow"] },
  ],
};

export const PHOTOGRAPHER: Person = {
  name: "Behrooz",
  role: "Event Photographer · Lumen Photography",
  photo: behroozPhoto,
  objectPos: "center 18%",
  packages: [
    { name: "1 Hour Coverage", meta: "60 minutes", price: "$250 + travel", bestFor: "Birthdays & smaller parties", includes: ["Candid + posed coverage of your event", "Greetings, reactions, group shots & details", "Professionally edited high-resolution photos", "Private online gallery to view & download", "Great for up to ~15–20 guests"] },
    { name: "1½ Hours Coverage", meta: "1 hour + 30 min", price: "$375 + travel", bestFor: "Bigger parties & longer events", featured: true, includes: ["Everything in the 1 Hour package", "An extra 30 minutes of coverage", "More of the event captured start to finish", "A fuller edited gallery", "Ideal for bigger parties & milestones"] },
    { name: "Custom & Public Events", meta: "2-hour minimum", price: "Custom Quote", bestFor: "Large or public events", includes: ["Schools, festivals & community events", "Corporate & public appearances", "Extended multi-hour coverage", "Custom gallery & delivery options", "Built around your timing & guest flow"] },
  ],
};

/* ---- HW House of Bounce inflatable catalog (rates are per-day; partner quotes final) ---- */
export const INFLATABLE_CATS: InflatableCat[] = [
  {
    id: "castles", name: "Bouncy Castles", icon: Tent, acc: "#8E2D6E", accDeep: "#6E2356",
    blurb: "Classic jump-and-play castles and slide combos.", thumb: imgUltraWhite,
    items: [
      { name: "Ultra White Bouncy Castle", img: imgUltraWhite, desc: "Great for creative wedding photos and customizable party fun.", dims: "13.5'L x 16.5'W x 20'H", specs: "Max 1100 lbs · 10 kids / 6 adults · Ages 6+", rate: "$375" },
      { name: "Enchanted Forest Inflatable", img: imgEnchanted, desc: "A whimsical forest-themed bounce house with a pool slide.", dims: "26.5'L (with pool) x 14'W x 14.5'H", specs: "Max 800 lbs · Ages 3+", rate: "$300" },
      { name: "Jelly Bean Bounce House with Slide", img: imgJellyBean, desc: "A playful bounce house with a built-in slide.", dims: "26.5'L x 14'W x 14.5'H", specs: "Max 700 lbs · Ages 3+", rate: "$300" },
      { name: "Double Slide Triple Play", img: imgDoubleSlide, desc: "A larger bounce house with double slides and play features.", dims: "13.7'W x 16.7'D x 7.1'H", specs: "Max 500 lbs · Ages 3-10", rate: "$200" },
      { name: "Joy Moderate Slide Bounce House", img: imgJoySlide, desc: "A mid-size bounce house with a slide.", dims: "10.5'L x 9.2'W x 7.6'H", specs: "Max 300 lbs · Ages 3-10", rate: "$170" },
      { name: "Red Yellow Blue Bouncy Castle", img: imgRedYellowBlue, desc: "A bright, colourful classic bouncy castle.", dims: "13.1'D x 12.5'W x 8.2'H", specs: "Max 800 lbs · Ages 3-10", rate: "$220" },
      { name: "AA Small Bounce House", img: imgAaSmall, desc: "A compact bounce house for smaller spaces and younger guests.", dims: "9'W x 12'D x 6.1'H", specs: "Max 250 lbs · Ages 3-10", rate: "$170" },
      { name: "Blue Shark Park", img: imgBlueShark, desc: "A shark-themed inflatable park with slide and splash play.", dims: "19'L x 11'W x 8.25'H", specs: "Max 300 lbs in bounce area · Ages 3+", rate: "$220" },
    ],
  },
  {
    id: "softplay", name: "Soft Play Sets", icon: Tent, acc: "#C8556E", accDeep: "#A23A54",
    blurb: "Sensory-friendly soft play for younger children.", thumb: imgSoftSuper,
    items: [
      { name: "Sensory “Super” Soft Play Set with Bounce House", img: imgSoftSuper, desc: "Our largest sensory soft-play set with a bounce house.", dims: "30'D x 16'W x 7.5'H (adjustable)", specs: "Max 500 lbs in bouncy · Ages 1+", rate: "$300" },
      { name: "Sensory “Moderate” Soft Play Set with Bounce House", img: imgSoftModerate, desc: "Mini ball pit, bouncy castle, mats & two soft-play units.", dims: "18'D x 14'W x 7.5'H (adjustable)", specs: "Max 300 lbs in bouncy · Ages 1+", rate: "$250" },
      { name: "Sensory “Small” Soft Play Set with Bounce House", img: imgSoftSmall, desc: "A smaller sensory soft-play set for tighter spaces.", dims: "18'D x 14'W x 6.1'H (adjustable)", specs: "250 lbs in bouncy · Ages 1+", rate: "$240" },
      { name: "Sensory “Mini” Soft Play Foam Set", img: imgSoftMini, desc: "A compact sensory foam play set for the littlest guests.", dims: "14'D x 14'W (adjustable)", specs: "Ages 6 months+", rate: "$200" },
    ],
  },
  {
    id: "water", name: "Water Parks", icon: Tent, acc: "#1FA2B8", accDeep: "#13768A",
    blurb: "Splashy inflatable water slides and play parks for warm days.", thumb: imgBlueShark,
    items: [
      { name: "Jelly Bean Bounce House with Slide", img: imgJellyBean, desc: "A playful bounce house with a built-in slide for warm days.", dims: "26.5'L x 14'W x 14.5'H", specs: "Max 700 lbs · Ages 3+", rate: "$300" },
      { name: "Enchanted Forest Inflatable", img: imgEnchanted, desc: "A whimsical forest-themed water-play inflatable with a pool.", dims: "26.5'L (with pool) x 14'W x 14.5'H", specs: "Max 800 lbs · Ages 3+", rate: "$300" },
      { name: "Blue Shark Park", img: imgBlueShark, desc: "A shark-themed inflatable water park with slide and splash play.", dims: "19'L x 11'W x 8.25'H", specs: "Max 300 lbs in bounce area · Ages 3+", rate: "$220" },
    ],
  },
];
export const HOB_LOGO = hobLogo;

/* ---- consolidated structure for the booking form: category -> people -> packages,
   with inflatables going one deeper: category -> HW House of Bounce -> sub-categories
   (Bouncy Castles / Soft Play / Water Parks) -> items (image + price). ---- */
export type FormPkg = { id: string; name: string; meta: string; price: string; priceNum: number | null; includes: string[]; bestFor: string; img?: string };
export type FormSubcat = { id: string; name: string; thumb: string; items: FormPkg[] };
export type FormVendor = { id: string; name: string; role: string; photo?: string; logo?: string; packages?: FormPkg[]; subcats?: FormSubcat[] };
export type FormCategory = { id: string; name: string; icon: IconType; acc: string; vendors: FormVendor[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const priceNum = (s: string): number | null => {
  const m = s.replace(/,/g, "").match(/\$(\d+)/);
  return m ? parseInt(m[1], 10) : null;
};

const personVendor = (id: string, p: Person): FormVendor => ({
  id, name: p.name, role: p.role, photo: p.photo,
  packages: p.packages.map((pk) => ({ id: `${id}-${slug(pk.name)}`, name: pk.name, meta: pk.meta, price: pk.price, priceNum: priceNum(pk.price), includes: pk.includes, bestFor: pk.bestFor })),
});

// HW inflatables: each rental becomes a selectable item (image + per-day rate) under
// its sub-category (Bouncy Castles / Soft Play / Water Parks).
const rentalPkg = (r: Rental): FormPkg => ({
  id: `hob-${slug(r.name)}`,
  name: r.name,
  meta: [r.dims, r.specs].filter(Boolean).join(" · "),
  price: r.rate ? `${r.rate}/day` : "Custom Quote",
  priceNum: r.rate ? priceNum(r.rate) : null,
  includes: [r.desc],
  bestFor: "Backyard events (no corporate)",
  img: r.img,
});
const HOB_SUBCATS: FormSubcat[] = INFLATABLE_CATS.map((c) => ({ id: c.id, name: c.name, thumb: c.thumb, items: c.items.map(rentalPkg) }));

export const BAZAAR_CATEGORIES: FormCategory[] = [
  { id: "face", name: "Face Painting", icon: Palette, acc: "#1E8A9E", vendors: [personVendor("alejandra", FACE_ARTIST)] },
  { id: "balloon", name: "Balloon Twisting", icon: PartyPopper, acc: "#9152C8", vendors: [personVendor("lauren", BALLOON_ARTIST)] },
  { id: "photo", name: "Photography", icon: Camera, acc: "#3E7CA8", vendors: [personVendor("behrooz", PHOTOGRAPHER)] },
  { id: "inflatable", name: "Inflatables", icon: Tent, acc: "#C28A2E", vendors: [{ id: "hob", name: "HW House of Bounce", role: "Inflatable rentals · trusted partner", logo: HOB_LOGO, subcats: HOB_SUBCATS }] },
];

export const FORM_PKG_BY_ID: Record<string, FormPkg & { vendor: string; category: string }> = Object.fromEntries(
  BAZAAR_CATEGORIES.flatMap((c) =>
    c.vendors.flatMap((v) => {
      const pkgs = v.packages ?? (v.subcats ? v.subcats.flatMap((s) => s.items) : []);
      return pkgs.map((p) => [p.id, { ...p, vendor: v.name, category: c.name }]);
    }),
  ),
);
