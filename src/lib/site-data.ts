import princessMedallion from "@/assets/chapters/princess.png";
import heroMedallion from "@/assets/chapters/hero.png";
import dinosaurMedallion from "@/assets/chapters/dinosaur.png";
import mermaidMedallion from "@/assets/chapters/mermaid.png";
import mascotMedallion from "@/assets/chapters/mascot.png";
import holidayMedallion from "@/assets/chapters/holiday.png";
import corporateMedallion from "@/assets/chapters/corporate.png";
import princessScene from "@/assets/worlds/princess.jpg";
import heroScene from "@/assets/worlds/hero.jpg";
import dinosaurScene from "@/assets/worlds/dinosaur.jpg";
import mermaidScene from "@/assets/worlds/mermaid.jpg";
import mascotScene from "@/assets/worlds/mascot.jpg";
import holidayScene from "@/assets/worlds/holiday.jpg";
import corporateScene from "@/assets/worlds/corporate.jpg";
import specialtyScene from "@/assets/worlds/specialty.jpg";
import characterExtrasMedallion from "@/assets/chapters/character-extras.png";
import brandLogo from "@/assets/brand/logo-primary.png";

export type ChapterPackage = {
  name: string;
  blurb: string;
  highlights: string[];
};

export type ChapterFaq = { q: string; a: string };

export type Chapter = {
  slug: string;
  name: string;
  navLabel: string;
  /** tailwind color token suffix, e.g. "princess" → text-princess / bg-princess */
  accent: string;
  medallion: string;
  tagline: string;
  shortDescription: string;
  emotionalHeadline: string;
  intro: string;
  whatItIs: string;
  bestFor: string[];
  included: string[];
  packages: ChapterPackage[];
  faqs: ChapterFaq[];
};

const sharedPackages = (label: string): ChapterPackage[] => [
  {
    name: "Classic Visit",
    blurb: `A polished ${label} appearance — perfect for an intimate, magical moment.`,
    highlights: [
      "Single character appearance",
      "Meet, greet & photos",
      "Interactive hello & sing-along moment",
    ],
  },
  {
    name: "Deluxe Experience",
    blurb: "Our most-booked format with structured entertainment from start to finish.",
    highlights: [
      "Extended appearance",
      "Themed games & activities",
      "Group & individual photos",
      "Storytelling moment",
    ],
  },
  {
    name: "Premium Event Appearance",
    blurb: "A show-stopping presence built for larger or public-facing events.",
    highlights: [
      "Premium costume & presentation",
      "Multi-character options",
      "Event-flow coordination",
      "Tailored to your venue",
    ],
  },
];

export const chapters: Chapter[] = [
  {
    slug: "princess-events",
    name: "Princess Events",
    navLabel: "Princesses",
    accent: "princess",
    medallion: princessMedallion,
    tagline: "Where every guest feels like royalty",
    shortDescription:
      "Fairytale visits, royal celebrations, sing-alongs, photos, and magical birthday moments.",
    emotionalHeadline: "A royal welcome, written just for them.",
    intro:
      "Elegant, gentle, and full of wonder — our princess experiences turn an ordinary afternoon into a fairytale your guests will remember for years.",
    whatItIs:
      "A graceful princess performer arrives in a premium gown to host a celebration full of warmth and magic — from a royal entrance to sing-alongs, gentle games, and unhurried photo moments. Every visit is age-aware, calm, and crafted to make each child feel genuinely seen.",
    bestFor: [
      "Birthdays",
      "Tea parties",
      "Photo experiences",
      "Schools & daycares",
      "Mall appearances",
    ],
    included: [
      "Professional princess performer",
      "Premium gown & presentation",
      "Royal entrance & welcome",
      "Sing-along & interactive moments",
      "Gentle themed games",
      "Photos with every guest",
    ],
    packages: sharedPackages("princess"),
    faqs: [
      {
        q: "How long is a typical visit?",
        a: "Most princess appearances run between 45 and 90 minutes depending on the package and your event flow. We'll recommend the right length for your group.",
      },
      {
        q: "Can the princess sing live?",
        a: "Yes — a gentle sing-along moment is part of every visit, and can be expanded in our Deluxe and Premium formats.",
      },
      {
        q: "Is this suitable for very young children?",
        a: "Absolutely. Our performers are calm and age-aware, keeping the pace gentle for little ones while still delighting older kids.",
      },
      {
        q: "Do you travel across Metro Vancouver?",
        a: "Yes. We serve Vancouver and the wider Lower Mainland — see our service area for the full list of communities.",
      },
    ],
  },
  {
    slug: "hero-events",
    name: "Hero Events",
    navLabel: "Heroes",
    accent: "hero",
    medallion: heroMedallion,
    tagline: "High-energy adventures for brave young guests",
    shortDescription:
      "Action-packed character visits, superhero-style games, training missions, and high-energy party moments.",
    emotionalHeadline: "Every great hero starts with one big adventure.",
    intro:
      "Bold, energetic, and endlessly fun — our hero experiences channel big imaginations into structured missions, games, and unforgettable arrivals.",
    whatItIs:
      "A confident hero performer leads guests through an action-packed experience: a dramatic entrance, hero 'training' missions, team challenges, and plenty of high-fives. It's energetic but always organized, keeping excitement high and the group together.",
    bestFor: ["Birthdays", "Schools", "Festivals", "Malls", "Corporate family days"],
    included: [
      "Professional hero performer",
      "Premium costume & presentation",
      "Dynamic entrance",
      "Hero training missions & games",
      "Team challenges",
      "Photos with every guest",
    ],
    packages: sharedPackages("hero"),
    faqs: [
      {
        q: "Are the activities safe for mixed ages?",
        a: "Yes — missions and games are scaled live to match the energy and ages in the room, so everyone can join in safely.",
      },
      {
        q: "Do you use original, non-copyrighted characters?",
        a: "Yes. We deliver premium original hero personas inspired by classic adventure archetypes — never copyrighted names or likenesses.",
      },
      {
        q: "Can you handle large groups?",
        a: "We can. Our Premium format is built for bigger birthdays, schools, and public events with structured crowd flow.",
      },
      {
        q: "What space do you need?",
        a: "An open area indoors or outdoors works well. We'll confirm space needs once we know your venue and guest count.",
      },
    ],
  },
  {
    slug: "dinosaur-events",
    name: "Dinosaur Events",
    navLabel: "Dinosaurs",
    accent: "dinosaur",
    medallion: dinosaurMedallion,
    tagline: "Larger-than-life prehistoric encounters",
    shortDescription:
      "Larger-than-life prehistoric encounters, trainer-led activities, and unforgettable dino appearances.",
    emotionalHeadline: "A prehistoric encounter they'll talk about for weeks.",
    intro:
      "Awe-inspiring and a little bit cheeky — our dinosaur experiences pair a remarkable creature with a knowledgeable trainer for moments of genuine wonder.",
    whatItIs:
      "A lifelike dinosaur arrives with a friendly trainer who guides the encounter — introducing the creature, leading curious questions, and keeping the experience safe, interactive, and full of gasps. Equal parts thrilling and educational.",
    bestFor: ["Birthdays", "Schools & daycares", "Festivals", "Malls", "Community events"],
    included: [
      "Lifelike dinosaur appearance",
      "Professional trainer/handler",
      "Interactive introduction",
      "Curious Q&A & learning moments",
      "Safe meet & photo time",
      "Themed activity options",
    ],
    packages: sharedPackages("dinosaur"),
    faqs: [
      {
        q: "Is the dinosaur frightening for young kids?",
        a: "Our trainers manage the encounter carefully and read the room — building wonder, not fear. Nervous little ones can watch from a comfortable distance.",
      },
      {
        q: "Is it educational?",
        a: "Yes. Schools love this experience for its blend of excitement and learning, with age-appropriate facts woven through the visit.",
      },
      {
        q: "How much space is required?",
        a: "A reasonably open indoor or outdoor area is ideal. We'll confirm specifics based on your venue.",
      },
      {
        q: "Can it appear at a large festival?",
        a: "Definitely — our Premium appearance is designed for high-traffic public events with crowd-aware staging.",
      },
    ],
  },
  {
    slug: "mermaid-events",
    name: "Mermaid Events",
    navLabel: "Mermaids",
    accent: "mermaid",
    medallion: mermaidMedallion,
    tagline: "Enchanting moments from under the sea",
    shortDescription:
      "Ocean-inspired appearances, magical photo moments, poolside themes, and under-the-sea experiences.",
    emotionalHeadline: "An ocean of wonder, right where you are.",
    intro:
      "Serene, shimmering, and utterly magical — our mermaid experiences bring under-the-sea enchantment to birthdays, poolside parties, and summer events.",
    whatItIs:
      "A graceful mermaid performer hosts an ocean-themed celebration with storytelling, gentle games, sing-along moments, and dreamy photo opportunities. Poolside formats are available where venues allow, always with safety front of mind.",
    bestFor: [
      "Birthdays",
      "Pool & summer parties",
      "Photo experiences",
      "Festivals",
      "Mall appearances",
    ],
    included: [
      "Professional mermaid performer",
      "Premium tail & presentation",
      "Under-the-sea storytelling",
      "Gentle ocean-themed games",
      "Sing-along moment",
      "Photos with every guest",
    ],
    packages: sharedPackages("mermaid"),
    faqs: [
      {
        q: "Do you offer in-water appearances?",
        a: "Poolside and in-water formats are available at suitable, supervised venues. We'll review safety requirements with you when booking.",
      },
      {
        q: "Is this only for summer?",
        a: "Not at all — land-based mermaid visits are magical year-round, indoors or out.",
      },
      {
        q: "How long is a visit?",
        a: "Typically 45–90 minutes depending on your package and event flow.",
      },
      {
        q: "Which areas do you serve?",
        a: "All of Metro Vancouver and the Lower Mainland — see our service area for details.",
      },
    ],
  },
  {
    slug: "mascot-events",
    name: "Mascot Events",
    navLabel: "Mascots",
    accent: "mascot",
    medallion: mascotMedallion,
    tagline: "Friendly faces that light up any crowd",
    shortDescription:
      "Friendly mascot appearances for parties, schools, community events, malls, and brand activations.",
    emotionalHeadline: "A warm, friendly welcome for every guest.",
    intro:
      "Cheerful and crowd-pleasing — our mascot appearances bring instant smiles to community events, schools, malls, and brand activations.",
    whatItIs:
      "A friendly mascot performer brings energy and warmth to your event with waves, photos, gentle interaction, and a presence that draws crowds. Ideal for high-traffic, public-facing moments where everyone wants a photo.",
    bestFor: ["Community events", "Schools", "Malls", "Brand activations", "Sports & festivals"],
    included: [
      "Professional mascot performer",
      "Premium costume & presentation",
      "Crowd interaction & waves",
      "Photo opportunities",
      "Optional handler for crowd flow",
      "Brand-friendly conduct",
    ],
    packages: sharedPackages("mascot"),
    faqs: [
      {
        q: "Can the mascot represent our brand?",
        a: "Yes — we provide professional, brand-aware mascot talent and can coordinate appearances around your activation goals.",
      },
      {
        q: "Do you provide a handler?",
        a: "For busy public events we recommend a handler to manage crowd flow and keep lines moving smoothly. It's included in larger formats.",
      },
      {
        q: "How long can a mascot stay 'on'?",
        a: "We schedule structured breaks to keep performances safe and high-quality. We'll build a timing plan around your event.",
      },
      {
        q: "Can you bring multiple mascots?",
        a: "Absolutely — multi-character appearances are available for larger events.",
      },
    ],
  },
  {
    slug: "holiday-events",
    name: "Holiday Events",
    navLabel: "Holidays",
    accent: "holiday",
    medallion: holidayMedallion,
    tagline: "Seasonal magic for every celebration",
    shortDescription:
      "Seasonal characters for Christmas, Easter, Halloween, Canada Day, winter events, and festive celebrations.",
    emotionalHeadline: "Make the season unforgettable.",
    intro:
      "Festive, warm, and beautifully presented — our holiday characters bring seasonal magic to homes, malls, schools, and city celebrations all year round.",
    whatItIs:
      "Seasonal character appearances tailored to the occasion — from winter wonderland visits to spring, Halloween, and Canada Day celebrations. Each appearance is polished, photo-ready, and designed to fit family events and large public programs alike.",
    bestFor: [
      "Christmas & winter events",
      "Easter & spring",
      "Halloween",
      "Canada Day",
      "Malls & city events",
    ],
    included: [
      "Seasonal character performer",
      "Premium seasonal costume",
      "Festive entrance & greeting",
      "Photo moments for guests",
      "Themed activity options",
      "Family- and crowd-friendly delivery",
    ],
    packages: sharedPackages("holiday"),
    faqs: [
      {
        q: "Do you book up early for the holidays?",
        a: "Peak seasons fill quickly — we recommend reserving your dates well in advance to secure availability.",
      },
      {
        q: "Can you support a multi-day mall program?",
        a: "Yes. Our Premium format is built for recurring, public-facing seasonal programs with reliable scheduling.",
      },
      {
        q: "Are appearances available for any holiday?",
        a: "We cover the major seasonal celebrations year-round. Tell us your occasion and we'll match the right character.",
      },
      {
        q: "Do you serve all of Metro Vancouver?",
        a: "Yes — across Vancouver and the Lower Mainland.",
      },
    ],
  },
  {
    slug: "corporate-events",
    name: "Corporate & City Events",
    navLabel: "Corporate",
    accent: "corporate",
    medallion: corporateMedallion,
    tagline: "Premium entertainment for public-facing events",
    shortDescription:
      "Premium character entertainment for malls, festivals, city activations, company parties, and public-facing events.",
    emotionalHeadline: "For event planners who cannot afford a bad event.",
    intro:
      "Reliable, polished, and presentation-first — our corporate and city experiences deliver premium character entertainment that reflects well on your brand and keeps crowds moving.",
    whatItIs:
      "Professional character entertainment engineered for public-facing events: malls, festivals, city activations, holiday programs, and company celebrations. We focus on reliability, presentation quality, audience flow, and strong photo opportunities — so your event runs smoothly and looks exceptional.",
    bestFor: [
      "Malls & shopping centres",
      "Festivals & city events",
      "Brand activations",
      "Corporate parties",
      "Holiday programs",
    ],
    included: [
      "Vetted professional performers",
      "Premium costumes & presentation",
      "Audience-flow coordination",
      "Photo-opportunity staging",
      "Reliable scheduling & punctuality",
      "Liability-aware, public-ready conduct",
    ],
    packages: [
      {
        name: "Single Appearance",
        blurb: "A polished, dependable appearance for a focused activation or event window.",
        highlights: [
          "One vetted performer",
          "Premium presentation",
          "Photo opportunities",
          "On-time, professional delivery",
        ],
      },
      {
        name: "Program Package",
        blurb: "Recurring appearances for multi-day or multi-location public programs.",
        highlights: [
          "Multiple appearances",
          "Scheduling & logistics support",
          "Crowd-flow handler",
          "Consistent presentation",
        ],
      },
      {
        name: "Signature Activation",
        blurb: "A flagship, multi-character experience designed around your brand and venue.",
        highlights: [
          "Multi-character lineup",
          "Custom staging & flow",
          "Dedicated event coordination",
          "Tailored to your objectives",
        ],
      },
    ],
    faqs: [
      {
        q: "Are your performers insured?",
        a: "We deliver public-ready, liability-aware appearances. Share your venue's requirements and we'll align our documentation accordingly.",
      },
      {
        q: "Can you handle high-traffic public events?",
        a: "Yes — crowd flow, scheduling, and presentation are core to our corporate and city formats.",
      },
      {
        q: "Do you support multi-day programs?",
        a: "Absolutely. Our Program Package is built for recurring appearances across days or locations.",
      },
      {
        q: "How far in advance should we book?",
        a: "For city events and seasonal programs, earlier is better. Reach out and we'll confirm availability for your dates.",
      },
    ],
  },
  {
    slug: "specialty-events",
    name: "Specialty Characters",
    navLabel: "Specialty",
    accent: "specialty",
    medallion: brandLogo,
    tagline: "Rare, one-of-a-kind characters for unique events",
    shortDescription:
      "Custom personas, unique characters, and specialty appearances tailored to truly one-of-a-kind events.",
    emotionalHeadline: "When your event calls for something truly unique.",
    intro:
      "Distinctive, imaginative, and beautifully presented — our specialty characters bring rare and custom personas to events that want to stand apart.",
    whatItIs:
      "A specialty performer arrives in a premium, distinctive costume tailored to your theme — from good witches and fairies to custom-built personas. Each appearance is crafted around your event's unique vision, with polished interaction, photo moments, and themed engagement.",
    bestFor: [
      "Themed birthdays",
      "Festivals",
      "Brand activations",
      "Custom events",
      "Photo experiences",
    ],
    included: [
      "Professional specialty performer",
      "Premium, distinctive costume",
      "Themed entrance & interaction",
      "Photos with every guest",
      "Custom persona options",
      "Tailored to your event vision",
    ],
    packages: sharedPackages("specialty"),
    faqs: [
      {
        q: "Can you create a custom character?",
        a: "Yes — custom personas are our specialty. Share your vision and we'll build a polished, premium appearance around it.",
      },
      {
        q: "What kinds of specialty characters do you offer?",
        a: "From good witches and fairies to unique themed personas, we cover a wide range. Tell us your theme and we'll match the right character.",
      },
      {
        q: "How long is a typical appearance?",
        a: "Most specialty appearances run 45–90 minutes depending on package and event flow.",
      },
      {
        q: "Do you serve all of Metro Vancouver?",
        a: "Yes — across Vancouver and the wider Lower Mainland.",
      },
    ],
  },
];

export const chapterBySlug = (slug: string) => chapters.find((c) => c.slug === slug);

export const navChapters = chapters;

export type EventType = {
  title: string;
  audience: string;
  description: string;
};

export const eventTypes: EventType[] = [
  {
    title: "Birthday Parties",
    audience: "Families",
    description:
      "Magical, structured celebrations that keep kids engaged from the entrance to the final photo.",
  },
  {
    title: "Schools & Daycares",
    audience: "Educators",
    description:
      "Engaging, age-aware visits that blend wonder with learning — easy to schedule and manage.",
  },
  {
    title: "Malls & Shopping Centres",
    audience: "Retail & marketing",
    description:
      "Crowd-drawing appearances and photo moments that bring foot traffic and delight shoppers.",
  },
  {
    title: "Festivals & City Events",
    audience: "Municipal & community",
    description:
      "Premium, public-ready character entertainment with reliable scheduling and crowd flow.",
  },
  {
    title: "Corporate Events",
    audience: "Planners & brands",
    description:
      "Polished, presentation-first entertainment for family days, activations, and company parties.",
  },
  {
    title: "Holiday Events",
    audience: "Seasonal programs",
    description:
      "Seasonal characters that make Christmas, Halloween, Easter, and more truly memorable.",
  },
];

export const serviceAreas = [
  "Vancouver",
  "Coquitlam",
  "Burnaby",
  "Richmond",
  "Surrey",
  "Langley",
  "North Vancouver",
  "West Vancouver",
  "New Westminster",
  "Port Moody",
  "Port Coquitlam",
  "Maple Ridge",
  "Delta",
  "White Rock",
  "Abbotsford",
  "Chilliwack",
];

export const trustItems = [
  "5,000+ Events Performed",
  "Professional Performers",
  "Premium Costumes & Experiences",
  "Schools, Festivals & Corporate",
  "Serving Metro Vancouver",
];

export type StorybookWorld = {
  /** World/card title, e.g. "Jurassic Expedition". */
  name: string;
  /** Service-page slug (also the world anchor id). */
  slug: string;
  /** Short nav label, e.g. "Dinosaurs". */
  navLabel: string;
  /** Chapter color token suffix → var(--chapter-<accent>). */
  accent: string;
  /** Circular emblem / logo. */
  medallion: string;
  /** Scene illustration used on the service page + gallery. */
  scene: string;
  /** One-line description. */
  blurb: string;
  /** Preview chips — sample characters that live in this world. */
  sampleCharacters: string[];
  /** Card-level price hook, e.g. "From $288 · 60-min event". */
  pricingSummary: string;
  /** Primary CTA label, e.g. "Explore Princesses". */
  exploreLabel: string;
  /** Where Explore goes (service page, or /contact for inquiry-only worlds). */
  exploreTo: string;
  /** Secondary CTA label, e.g. "Princess Pricing" / "Request Specialty Pricing". */
  pricingLabel: string;
  /** Where the pricing CTA goes (/pricing or /contact). */
  pricingTo: string;
  /** Worlds priced per-character route their pricing CTA to inquiry. */
  requestPricing?: boolean;
  /** Links a world to its themed testimonial. */
  testimonialTheme: string;
  /** "corporate" worlds are excluded from the character grid & mega-menu. */
  kind?: "character" | "corporate";
};

/**
 * The eight character worlds, in story order. Specialty sits between Mermaid
 * and Mascot; Corporate is NOT a character world (kept last, kind "corporate",
 * only for its own service page imagery — filtered out of grids & menus).
 */
export const storybookWorlds: StorybookWorld[] = [
  {
    name: "Princess Kingdom",
    slug: "princess-events",
    navLabel: "Princesses",
    accent: "princess",
    medallion: princessMedallion,
    scene: princessScene,
    blurb: "Royal welcomes, sing-alongs, and fairytale photo moments.",
    sampleCharacters: ["Ice Queen", "Glass Slipper Princess", "Tower Princess", "Beauty Princess"],
    pricingSummary: "From $288 · 60-min event",
    exploreLabel: "Explore Princesses",
    exploreTo: "/princess-events",
    pricingLabel: "Princess Pricing",
    pricingTo: "/pricing",
    testimonialTheme: "princess",
  },
  {
    name: "Hero Headquarters",
    slug: "hero-events",
    navLabel: "Heroes",
    accent: "hero",
    medallion: heroMedallion,
    scene: heroScene,
    blurb: "High-energy missions and brave adventures for young heroes.",
    sampleCharacters: ["Spider Hero", "Shield Hero", "Bat Hero", "Wonder Hero"],
    pricingSummary: "From $388 · 60-min event",
    exploreLabel: "Explore Heroes",
    exploreTo: "/hero-events",
    pricingLabel: "Hero Pricing",
    pricingTo: "/pricing",
    testimonialTheme: "hero",
  },
  {
    name: "Jurassic Expedition",
    slug: "dinosaur-events",
    navLabel: "Dinosaurs",
    accent: "dinosaur",
    medallion: dinosaurMedallion,
    scene: dinosaurScene,
    blurb: "Larger-than-life prehistoric encounters led by expert trainers.",
    sampleCharacters: ["Harvey the Dino", "Safari Trainer", "Dino Handler"],
    pricingSummary: "From $788 · 60-min event",
    exploreLabel: "Explore Dinosaurs",
    exploreTo: "/dinosaur-events",
    pricingLabel: "Jurassic Pricing",
    pricingTo: "/pricing",
    testimonialTheme: "dinosaur",
  },
  {
    name: "Mermaid Cove",
    slug: "mermaid-events",
    navLabel: "Mermaids",
    accent: "mermaid",
    medallion: mermaidMedallion,
    scene: mermaidScene,
    blurb: "Shimmering under-the-sea magic for parties and poolside events.",
    sampleCharacters: ["Mermaid Performer", "Mer-Assistant", "Ocean Princess"],
    pricingSummary: "From $438 · 60-min event",
    exploreLabel: "Explore Mermaids",
    exploreTo: "/mermaid-events",
    pricingLabel: "Mermaid Pricing",
    pricingTo: "/pricing",
    testimonialTheme: "mermaid",
  },
  {
    name: "Specialty Characters",
    slug: "specialty-events",
    navLabel: "Specialty",
    accent: "specialty",
    medallion: brandLogo,
    scene: specialtyScene,
    blurb: "Rare, one-of-a-kind characters and custom personas for unique events.",
    sampleCharacters: ["Good Witch", "Fairy", "Storybook Villain", "Custom Personas"],
    pricingSummary: "Custom pricing",
    exploreLabel: "Explore Specialty Characters",
    exploreTo: "/specialty-events",
    pricingLabel: "Request Specialty Pricing",
    pricingTo: "/contact",
    requestPricing: true,
    testimonialTheme: "specialty",
  },
  {
    name: "Mascot Meadow",
    slug: "mascot-events",
    navLabel: "Mascots",
    accent: "mascot",
    medallion: mascotMedallion,
    scene: mascotScene,
    blurb: "Friendly, crowd-pleasing characters that light up any event.",
    sampleCharacters: ["Bears", "Bunnies", "Holiday Mascots", "Custom Mascots"],
    pricingSummary: "From $248 · 1 hour",
    exploreLabel: "Explore Mascots",
    exploreTo: "/mascot-events",
    pricingLabel: "Mascot Pricing",
    pricingTo: "/pricing",
    testimonialTheme: "mascot",
  },
  {
    name: "Holiday Village",
    slug: "holiday-events",
    navLabel: "Holidays",
    accent: "holiday",
    medallion: holidayMedallion,
    scene: holidayScene,
    blurb: "Seasonal characters that make every holiday unforgettable.",
    sampleCharacters: ["Winter Gift-Giver", "Spring Bunny", "Spooky Friends", "Maple Mascot"],
    pricingSummary: "Seasonal pricing",
    exploreLabel: "Explore Holiday Characters",
    exploreTo: "/holiday-events",
    pricingLabel: "Request Holiday Pricing",
    pricingTo: "/contact",
    requestPricing: true,
    testimonialTheme: "holiday",
  },
  {
    name: "Character Extras",
    slug: "character-extras",
    navLabel: "Character Extras",
    accent: "festival",
    medallion: characterExtrasMedallion,
    scene: specialtyScene,
    blurb:
      "Face painting, balloon twisting, photography, and magical add-ons that make any event bigger.",
    sampleCharacters: ["Face Painting", "Balloon Twisting", "Photography", "Surprise Characters"],
    pricingSummary: "Custom add-ons",
    exploreLabel: "Explore Character Extras",
    exploreTo: "/contact",
    pricingLabel: "Request Pricing",
    pricingTo: "/contact",
    requestPricing: true,
    testimonialTheme: "specialty",
  },
  {
    name: "Corporate & City Events",
    slug: "corporate-events",
    navLabel: "Corporate",
    accent: "corporate",
    medallion: corporateMedallion,
    scene: corporateScene,
    blurb: "Polished, reliable entertainment for public and brand events.",
    sampleCharacters: ["Brand Mascots", "Festival Characters", "Multi-character Activations"],
    pricingSummary: "Tailored quotes",
    exploreLabel: "Explore Corporate",
    exploreTo: "/corporate-events",
    pricingLabel: "Request a Quote",
    pricingTo: "/corporate-events",
    requestPricing: true,
    testimonialTheme: "mascot",
    kind: "corporate",
  },
];

/** The eight character worlds (Corporate excluded) — for grids & the mega-menu. */
export const characterWorlds = storybookWorlds.filter((w) => w.kind !== "corporate");

export const worldBySlug = (slug: string) => storybookWorlds.find((w) => w.slug === slug);

export type WorldTheme = {
  /** Light panel background — each world its own environment. */
  bg: string;
  accent: string;
  secondary: string;
  glow: string;
  decor: "curtains" | "city" | "leaves" | "waves" | "confetti" | "holiday" | "skyline" | "stars";
  mood: string;
};

/** Per-world art direction — each chapter is its own illustrated environment. */
export const worldThemes: Record<string, WorldTheme> = {
  "princess-events": {
    bg: "linear-gradient(165deg, #FFF6FA 0%, #FBEDF3 50%, #F9E9DF 100%)",
    accent: "var(--chapter-princess)",
    secondary: "var(--rose-gold)",
    glow: "var(--chapter-princess-glow)",
    decor: "curtains",
    mood: "Royal ballroom · fairytale garden",
  },
  "hero-events": {
    bg: "linear-gradient(165deg, #EEF5FF 0%, #E4EDFB 50%, #F4F7FB 100%)",
    accent: "var(--chapter-hero)",
    secondary: "var(--chapter-hero-accent)",
    glow: "var(--chapter-hero-glow)",
    decor: "city",
    mood: "City lights · heroic spotlight",
  },
  "dinosaur-events": {
    bg: "linear-gradient(165deg, #F4F7E8 0%, #ECF0D7 50%, #F8F0D9 100%)",
    accent: "var(--chapter-dinosaur)",
    secondary: "#C8923E",
    glow: "var(--chapter-dinosaur-glow)",
    decor: "leaves",
    mood: "Prehistoric valley · sunbeam glow",
  },
  "mermaid-events": {
    bg: "linear-gradient(165deg, #EAFBFA 0%, #E1F2FB 50%, #F0EDFB 100%)",
    accent: "var(--chapter-mermaid)",
    secondary: "#9AA8E6",
    glow: "var(--chapter-mermaid-glow)",
    decor: "waves",
    mood: "Ocean cove · pearl shimmer",
  },
  "mascot-events": {
    bg: "linear-gradient(165deg, #EEF6FF 0%, #F2F8EB 52%, #FFF6E4 100%)",
    accent: "var(--chapter-mascot)",
    secondary: "#5BA9D6",
    glow: "var(--chapter-mascot-glow)",
    decor: "confetti",
    mood: "Community event · crowd-friendly",
  },
  "holiday-events": {
    bg: "linear-gradient(165deg, #F0F7F1 0%, #FBF2E4 52%, #F7EBEB 100%)",
    accent: "var(--chapter-holiday)",
    secondary: "var(--chapter-holiday-accent)",
    glow: "var(--chapter-holiday-glow)",
    decor: "holiday",
    mood: "Festive village · lantern glow",
  },
  "corporate-events": {
    bg: "linear-gradient(165deg, #F4F8FD 0%, #EEF1F6 50%, #FBF6EC 100%)",
    accent: "var(--ink-700)",
    secondary: "var(--gold-500)",
    glow: "var(--soft-sky-2)",
    decor: "skyline",
    mood: "City activation · stage lights",
  },
  "specialty-events": {
    bg: "linear-gradient(165deg, #F3EFFB 0%, #ECF0FB 50%, #FBF5EC 100%)",
    accent: "var(--chapter-specialty)",
    secondary: "#6E7FD6",
    glow: "var(--chapter-specialty-glow)",
    decor: "stars",
    mood: "Magical theatre · moonlight",
  },
  "character-extras": {
    bg: "linear-gradient(165deg, #F4EFFB 0%, #EEE9FB 52%, #FBF1F6 100%)",
    accent: "var(--chapter-festival)",
    secondary: "#C9A2E8",
    glow: "var(--chapter-festival-glow)",
    decor: "confetti",
    mood: "Surprise & sparkle · add-on magic",
  },
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the first email to the final photo, everything was effortless. Our daughter's face when the princess arrived was priceless.",
    name: "Sarah M.",
    role: "Parent · Burnaby",
  },
  {
    quote:
      "The team handled a gym full of excited kids with total professionalism. Engaging, organized, and genuinely educational.",
    name: "Mr. Donnelly",
    role: "Elementary School · Surrey",
  },
  {
    quote:
      "Their characters drew the biggest crowds at our summer festival. Reliable, premium, and an absolute pleasure to coordinate with.",
    name: "Priya R.",
    role: "Festival Organizer · Richmond",
  },
  {
    quote:
      "We needed entertainment that reflected our brand at a public activation. They delivered flawlessly and on schedule.",
    name: "James T.",
    role: "Marketing Lead · Vancouver",
  },
];

export const whyPoints = [
  {
    title: "Professional performers",
    body: "Vetted, trained talent who know how to hold a room and read every audience.",
  },
  {
    title: "Premium costumes & presentation",
    body: "High-quality costumes and styling that look exceptional in person and on camera.",
  },
  {
    title: "Structured entertainment",
    body: "Real activities and flow — not just photos. Every minute is thoughtfully planned.",
  },
  {
    title: "Audience-aware delivery",
    body: "We adapt live to ages, energy, and setting, from intimate parties to public crowds.",
  },
  {
    title: "Family, school & corporate ready",
    body: "One trusted team for birthdays, classrooms, malls, festivals, and company events.",
  },
  {
    title: "Local Metro Vancouver team",
    body: "Proudly based in the Lower Mainland, with reliable, on-time local delivery.",
  },
];

export const bookingSteps = [
  {
    step: "01",
    title: "Choose Your Adventure",
    body: "Browse our worlds and pick the character experience that fits your event.",
  },
  {
    step: "02",
    title: "Select Your Package",
    body: "We help match your event with the right format, length, and presentation.",
  },
  {
    step: "03",
    title: "Reserve Your Date",
    body: "Lock in your date and details with our friendly local team.",
  },
  {
    step: "04",
    title: "We Bring the Magic",
    body: "Your character team arrives prepared, polished, and ready to create memories.",
  },
];

export type PricingTier = {
  name: string;
  duration: string;
  price: string;
  addOn?: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export type AudiencePath = {
  title: string;
  blurb: string;
  points: string[];
  to: string;
  cta: string;
};

/** Buyer self-select lanes — parents vs. planners "where do I go" gateways. */
export const audiencePaths: AudiencePath[] = [
  {
    title: "Birthday Parties",
    blurb:
      "Magical, structured celebrations that keep kids spellbound from the grand entrance to the final photo.",
    points: ["Age-aware hosting", "Games, stories & sing-alongs", "Photos with every guest"],
    to: "/contact",
    cta: "Plan a birthday",
  },
  {
    title: "Schools & Daycares",
    blurb:
      "Engaging, age-aware visits that blend genuine wonder with learning — easy to schedule and manage.",
    points: ["Educational & age-appropriate", "Calm, organized delivery", "Whole-group engagement"],
    to: "/contact",
    cta: "Bring magic to class",
  },
  {
    title: "Malls, Festivals & City Events",
    blurb:
      "Crowd-drawing appearances with reliable scheduling and smooth audience flow for public-facing programs.",
    points: ["High-traffic ready", "Crowd-flow coordination", "Strong photo moments"],
    to: "/corporate-events",
    cta: "Plan a public event",
  },
  {
    title: "Corporate & Brand Activations",
    blurb:
      "Polished, presentation-first entertainment that reflects well on your brand and runs exactly on schedule.",
    points: [
      "Vetted professional performers",
      "On-brand, on-time delivery",
      "Flexible event formats",
    ],
    to: "/corporate-events",
    cta: "Plan an activation",
  },
];

export type ExperienceInclusion = { title: string; body: string };

/** "Not just costumes — complete experiences." */
export const experienceInclusions: ExperienceInclusion[] = [
  {
    title: "Professional performers",
    body: "Trained, vetted talent who know how to hold a room and read every audience.",
  },
  {
    title: "Premium costumes",
    body: "High-quality, camera-ready costumes and styling that look exceptional up close.",
  },
  {
    title: "Structured entertainment",
    body: "Real games, stories, and activities with thoughtful flow — not just an appearance.",
  },
  {
    title: "Photo moments",
    body: "Built-in, unhurried photo opportunities so every guest goes home with a memory.",
  },
  {
    title: "Audience-aware delivery",
    body: "We adapt live to ages, energy, and setting — from quiet toddlers to big crowds.",
  },
  {
    title: "Crowd flow for public events",
    body: "Handlers and staging that keep lines moving and large events running smoothly.",
  },
];

/** Assurances aimed at planners "who cannot afford a bad event." */
export const plannerAssurances = [
  "Reliable, responsive communication",
  "Vetted professional performers",
  "Polished, on-brand presentation",
  "Crowd-friendly interaction & flow",
  "Strong photo opportunities",
  "Mall, city & corporate ready",
  "Flexible event formats",
  "On-time, every time",
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Single Character",
    duration: "1 hour event",
    price: "$288",
    addOn: "Add an additional character for $148",
    description:
      "One professional performer hosting a full hour of magic — perfect for birthdays and intimate celebrations.",
    highlights: [
      "One character appearance",
      "Full hour of entertainment",
      "Photos with every guest",
      "Add characters anytime",
    ],
  },
  {
    name: "Premium",
    duration: "1.5 hour event",
    price: "$388",
    addOn: "Add an additional character for $198",
    description:
      "Our most-booked format — ninety minutes of structured entertainment from grand entrance to final photo.",
    highlights: [
      "One character appearance",
      "90 minutes of entertainment",
      "Themed games & activities",
      "Add characters anytime",
    ],
    featured: true,
  },
  {
    name: "Custom Package",
    duration: "3+ characters",
    price: "Custom",
    description:
      "A tailored, multi-character experience built around your venue, timing, and guest count.",
    highlights: [
      "Three or more characters",
      "Custom staging & flow",
      "Dedicated event coordination",
      "Tailored to your event",
    ],
  },
];

/* =============================================================================
   PRICING — organized by character world. Travel is included within our
   standard Metro Vancouver service area; unusual logistics are confirmed first.
   ============================================================================= */
export type PricingRate = { label: string; price: string };
export type PricingOption = { name: string; rates: PricingRate[] };
export type WorldPricing = {
  slug: string;
  world: string;
  accent: string;
  options: PricingOption[];
  requestOnly?: boolean;
  requestLabel?: string;
  note?: string;
};

export const worldPricing: WorldPricing[] = [
  {
    slug: "princess-events",
    world: "Princesses",
    accent: "princess",
    options: [
      {
        name: "Single Princess",
        rates: [
          { label: "60-minute event", price: "$288" },
          { label: "90-minute event", price: "$388" },
        ],
      },
      {
        name: "Duo Princess / Princess + Prince",
        rates: [
          { label: "60-minute event", price: "$438" },
          { label: "90-minute event", price: "$538" },
        ],
      },
    ],
  },
  {
    slug: "hero-events",
    world: "Heroes",
    accent: "hero",
    options: [
      {
        name: "Hero with Sidekick",
        rates: [
          { label: "60-minute event", price: "$388" },
          { label: "90-minute event", price: "$488" },
        ],
      },
      {
        name: "Duo Hero",
        rates: [
          { label: "60-minute event", price: "$488" },
          { label: "90-minute event", price: "$588" },
        ],
      },
    ],
  },
  {
    slug: "dinosaur-events",
    world: "Jurassic Expedition",
    accent: "dinosaur",
    options: [
      {
        name: "Harvey & Safari Trainer",
        rates: [
          { label: "60-minute event", price: "$788" },
          { label: "90-minute event", price: "$988" },
        ],
      },
    ],
  },
  {
    slug: "mermaid-events",
    world: "Mermaids",
    accent: "mermaid",
    options: [
      {
        name: "Mermaid with Mer-Assistant",
        rates: [
          { label: "60-minute event", price: "$438" },
          { label: "90-minute event", price: "$588" },
        ],
      },
    ],
  },
  {
    slug: "mascot-events",
    world: "Mascots",
    accent: "mascot",
    options: [
      {
        name: "Mascot with Handler",
        rates: [
          { label: "1 hour", price: "$248" },
          { label: "2 hours", price: "$448" },
        ],
      },
    ],
  },
  {
    slug: "specialty-events",
    world: "Specialty Characters",
    accent: "specialty",
    options: [],
    requestOnly: true,
    requestLabel: "Request Specialty Pricing",
    note: "Each specialty character is priced individually — costume, performance, and event needs vary.",
  },
  {
    slug: "holiday-events",
    world: "Holiday Characters",
    accent: "holiday",
    options: [],
    requestOnly: true,
    requestLabel: "Request Holiday Pricing",
    note: "Seasonal characters are priced by character and season. Peak dates book early.",
  },
  {
    slug: "character-extras",
    world: "Character Extras",
    accent: "festival",
    options: [],
    requestOnly: true,
    requestLabel: "Request Pricing",
    note: "Add-ons and surprise characters are quoted to fit your event and budget.",
  },
];

/** The promise around travel + why prices differ — shown on the Pricing page. */
export const pricingPromise = {
  included: [
    "Travel is included in listed pricing within our standard Metro Vancouver service area.",
    "No hidden travel fees for standard service-area events.",
  ],
  confirmFirst:
    "If your location requires ferry access, paid parking, extended distance, or unusual logistics, we'll confirm any adjustment clearly before you book — never a surprise after.",
  whyVaries: [
    "Costume complexity & quality",
    "Number of performers",
    "Professional audio & equipment",
    "Performer training & vocal coaching",
    "Setup, staging & event structure",
    "Travel & logistics",
  ],
};

/* =============================================================================
   FIND YOUR EVENT — visitor-focused lanes. Each recommends character worlds.
   ============================================================================= */
export type EventTypeCardData = {
  title: string;
  who: string;
  worksBest: string;
  recommended: string[]; // world slugs
  accent: string; // chapter token suffix used to tint the card
  cta: { label: string; to: string };
};

export const eventTypeCards: EventTypeCardData[] = [
  {
    title: "Birthday Parties",
    who: "Families planning a magical day for one very important kid.",
    worksBest: "A featured character with games, stories, songs, and photos with every guest.",
    recommended: ["princess-events", "hero-events", "dinosaur-events", "mermaid-events"],
    accent: "princess",
    cta: { label: "Plan a birthday", to: "/contact" },
  },
  {
    title: "Schools & Daycares",
    who: "Educators who want wonder that's calm, age-aware, and easy to schedule.",
    worksBest: "Structured, curriculum-friendly visits that engage a whole class or gym.",
    recommended: ["dinosaur-events", "princess-events", "mascot-events", "holiday-events"],
    accent: "dinosaur",
    cta: { label: "Bring magic to class", to: "/contact" },
  },
  {
    title: "Community Events & Festivals",
    who: "Organizers drawing crowds who'll remember your event for years.",
    worksBest: "High-visibility mascots and characters with handler support and smooth crowd flow.",
    recommended: ["mascot-events", "dinosaur-events", "hero-events", "holiday-events"],
    accent: "mascot",
    cta: { label: "Plan a public event", to: "/contact" },
  },
  {
    title: "Corporate & Brand Events",
    who: "Planners and brands who can't afford a bad event.",
    worksBest: "Polished, on-brand, on-time entertainment with reliable logistics.",
    recommended: ["mascot-events", "holiday-events", "specialty-events", "dinosaur-events"],
    accent: "corporate",
    cta: { label: "Plan a corporate event", to: "/corporate-events" },
  },
];

/* =============================================================================
   WHY CHOOSE US — what separates us from a basic character appearance.
   ============================================================================= */
export const whyChooseUs: { title: string; body: string }[] = [
  {
    title: "In-house performer training",
    body: "We train actors for each role and test them before they ever perform at your event.",
  },
  {
    title: "Vocal coaching for singing characters",
    body: "Our singing performers work with an award-winning vocal coach, so the music feels real.",
  },
  {
    title: "Premium costumes",
    body: "Our baseline is high-end, cosplay-level costuming — with many designer and cinema-grade pieces.",
  },
  {
    title: "Professional audio equipment",
    body: "We bring professional 200-watt sound and industry-standard SM58 microphones where appropriate.",
  },
  {
    title: "Structured experiences",
    body: "Not just a character showing up — guided interaction, activities, photos, games, songs, and audience-aware performance.",
  },
  {
    title: "Neurodivergent-aware approach",
    body: "Not every child experiences events the same way. We read the room and adapt our approach when needed.",
  },
  {
    title: "Handler & support systems",
    body: "Large characters, mascots, mermaids, and dinosaurs include support where needed for smoother, safer events.",
  },
  {
    title: "Transparent communication",
    body: "A clear inquiry process, honest pricing expectations, and no surprise travel fees within our service area.",
  },
];

/* =============================================================================
   TESTIMONIALS — themed to the world/event. Names are editable placeholders.
   ============================================================================= */
export type WorldTestimonial = {
  quote: string;
  name: string;
  eventType: string;
  world: string;
  accent: string;
  city: string;
  placeholder?: boolean;
};

export const worldTestimonials: WorldTestimonial[] = [
  {
    quote:
      "From the first email to the final photo, everything was effortless. Our daughter's face when the princess arrived was priceless.",
    name: "Sarah M.",
    eventType: "Birthday Party",
    world: "Princess Kingdom",
    accent: "princess",
    city: "Burnaby",
    placeholder: true,
  },
  {
    quote:
      "The dinosaur and trainer had a gym full of kids gasping and laughing. Reliable, organized, and genuinely educational.",
    name: "Mr. Donnelly",
    eventType: "School Assembly",
    world: "Jurassic Expedition",
    accent: "dinosaur",
    city: "Surrey",
    placeholder: true,
  },
  {
    quote:
      "Our mermaid was pure magic poolside — calm, graceful, and wonderful with the kids the entire time.",
    name: "Priya R.",
    eventType: "Summer Party",
    world: "Mermaid Cove",
    accent: "mermaid",
    city: "Richmond",
    placeholder: true,
  },
  {
    quote:
      "The heroes ran a high-energy mission that kept twenty kids together and grinning the whole time.",
    name: "Jordan K.",
    eventType: "Birthday Party",
    world: "Hero Headquarters",
    accent: "hero",
    city: "Coquitlam",
    placeholder: true,
  },
  {
    quote:
      "Their characters drew the biggest crowds at our winter festival. Premium presentation and a pleasure to coordinate.",
    name: "Alana W.",
    eventType: "Holiday Festival",
    world: "Holiday Village",
    accent: "holiday",
    city: "North Vancouver",
    placeholder: true,
  },
  {
    quote:
      "We needed entertainment that reflected our brand at a public activation. They delivered flawlessly and on schedule.",
    name: "James T.",
    eventType: "Brand Activation",
    world: "Mascot Meadow",
    accent: "mascot",
    city: "Vancouver",
    placeholder: true,
  },
];

/* =============================================================================
   HOW IT WORKS — five reassuring steps from inquiry to memories.
   ============================================================================= */
export const howItWorks = [
  {
    step: "01",
    title: "Tell us about your event",
    body: "Share your date, location, and the moment you're planning. It only takes a minute.",
  },
  {
    step: "02",
    title: "We match the right character & world",
    body: "We help you choose the world and format that fits your guests, your space, and your goals.",
  },
  {
    step: "03",
    title: "Confirm details & pricing",
    body: "You'll get clear pricing and a simple confirmation — no surprises, no pressure.",
  },
  {
    step: "04",
    title: "We arrive & you enjoy the memories",
    body: "A trained, polished performer arrives ready — you stay present while we create the moments, and photos, you'll keep.",
  },
];

/* =============================================================================
   OUR TEAM — performer bios. Editable placeholders until real content is added.
   ============================================================================= */
export type TeamMember = {
  name: string;
  specialties: string[];
  bio: string;
  training: string[];
  strengths: string[];
  photo?: string;
  placeholder?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Performer Name",
    specialties: ["Princess roles", "Singing characters"],
    bio: "A short, warm bio goes here — training, favourite event moments, and what makes this performer special with young audiences.",
    training: ["In-house role training", "Award-winning vocal coaching"],
    strengths: ["Live singing", "Gentle, age-aware hosting"],
    placeholder: true,
  },
  {
    name: "Performer Name",
    specialties: ["Hero roles", "Mascot handling"],
    bio: "A short, warm bio goes here — training, favourite event moments, and what makes this performer special with young audiences.",
    training: ["In-house role training", "Movement & stage presence"],
    strengths: ["High-energy hosting", "Crowd engagement"],
    placeholder: true,
  },
  {
    name: "Performer Name",
    specialties: ["Mermaid roles", "Specialty characters"],
    bio: "A short, warm bio goes here — training, favourite event moments, and what makes this performer special with young audiences.",
    training: ["In-house role training", "Presentation & photography coaching"],
    strengths: ["Graceful presence", "Photo-ready moments"],
    placeholder: true,
  },
];

/* Compact proof points that bridge the hero into the worlds. */
export const trustHighlights = [
  "Trained in-house performers",
  "Premium costumes",
  "Professional audio equipment",
  "Structured experiences",
  "Travel included in our service area",
  "Neurodivergent-aware approach",
];
