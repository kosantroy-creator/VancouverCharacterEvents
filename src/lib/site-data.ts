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
    highlights: ["Single character appearance", "Meet, greet & photos", "Interactive hello & sing-along moment"],
  },
  {
    name: "Deluxe Experience",
    blurb: "Our most-booked format with structured entertainment from start to finish.",
    highlights: ["Extended appearance", "Themed games & activities", "Group & individual photos", "Storytelling moment"],
  },
  {
    name: "Premium Event Appearance",
    blurb: "A show-stopping presence built for larger or public-facing events.",
    highlights: ["Premium costume & presentation", "Multi-character options", "Event-flow coordination", "Tailored to your venue"],
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
    shortDescription: "Fairytale visits, royal celebrations, sing-alongs, photos, and magical birthday moments.",
    emotionalHeadline: "A royal welcome, written just for them.",
    intro: "Elegant, gentle, and full of wonder — our princess experiences turn an ordinary afternoon into a fairytale your guests will remember for years.",
    whatItIs: "A graceful princess performer arrives in a premium gown to host a celebration full of warmth and magic — from a royal entrance to sing-alongs, gentle games, and unhurried photo moments. Every visit is age-aware, calm, and crafted to make each child feel genuinely seen.",
    bestFor: ["Birthdays", "Tea parties", "Photo experiences", "Schools & daycares", "Mall appearances"],
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
      { q: "How long is a typical visit?", a: "Most princess appearances run between 45 and 90 minutes depending on the package and your event flow. We'll recommend the right length for your group." },
      { q: "Can the princess sing live?", a: "Yes — a gentle sing-along moment is part of every visit, and can be expanded in our Deluxe and Premium formats." },
      { q: "Is this suitable for very young children?", a: "Absolutely. Our performers are calm and age-aware, keeping the pace gentle for little ones while still delighting older kids." },
      { q: "Do you travel across Metro Vancouver?", a: "Yes. We serve Vancouver and the wider Lower Mainland — see our service area for the full list of communities." },
    ],
  },
  {
    slug: "hero-events",
    name: "Hero Events",
    navLabel: "Heroes",
    accent: "hero",
    medallion: heroMedallion,
    tagline: "High-energy adventures for brave young guests",
    shortDescription: "Action-packed character visits, superhero-style games, training missions, and high-energy party moments.",
    emotionalHeadline: "Every great hero starts with one big adventure.",
    intro: "Bold, energetic, and endlessly fun — our hero experiences channel big imaginations into structured missions, games, and unforgettable arrivals.",
    whatItIs: "A confident hero performer leads guests through an action-packed experience: a dramatic entrance, hero 'training' missions, team challenges, and plenty of high-fives. It's energetic but always organized, keeping excitement high and the group together.",
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
      { q: "Are the activities safe for mixed ages?", a: "Yes — missions and games are scaled live to match the energy and ages in the room, so everyone can join in safely." },
      { q: "Do you use original, non-copyrighted characters?", a: "Yes. We deliver premium original hero personas inspired by classic adventure archetypes — never copyrighted names or likenesses." },
      { q: "Can you handle large groups?", a: "We can. Our Premium format is built for bigger birthdays, schools, and public events with structured crowd flow." },
      { q: "What space do you need?", a: "An open area indoors or outdoors works well. We'll confirm space needs once we know your venue and guest count." },
    ],
  },
  {
    slug: "dinosaur-events",
    name: "Dinosaur Events",
    navLabel: "Dinosaurs",
    accent: "dinosaur",
    medallion: dinosaurMedallion,
    tagline: "Larger-than-life prehistoric encounters",
    shortDescription: "Larger-than-life prehistoric encounters, trainer-led activities, and unforgettable dino appearances.",
    emotionalHeadline: "A prehistoric encounter they'll talk about for weeks.",
    intro: "Awe-inspiring and a little bit cheeky — our dinosaur experiences pair a remarkable creature with a knowledgeable trainer for moments of genuine wonder.",
    whatItIs: "A lifelike dinosaur arrives with a friendly trainer who guides the encounter — introducing the creature, leading curious questions, and keeping the experience safe, interactive, and full of gasps. Equal parts thrilling and educational.",
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
      { q: "Is the dinosaur frightening for young kids?", a: "Our trainers manage the encounter carefully and read the room — building wonder, not fear. Nervous little ones can watch from a comfortable distance." },
      { q: "Is it educational?", a: "Yes. Schools love this experience for its blend of excitement and learning, with age-appropriate facts woven through the visit." },
      { q: "How much space is required?", a: "A reasonably open indoor or outdoor area is ideal. We'll confirm specifics based on your venue." },
      { q: "Can it appear at a large festival?", a: "Definitely — our Premium appearance is designed for high-traffic public events with crowd-aware staging." },
    ],
  },
  {
    slug: "mermaid-events",
    name: "Mermaid Events",
    navLabel: "Mermaids",
    accent: "mermaid",
    medallion: mermaidMedallion,
    tagline: "Enchanting moments from under the sea",
    shortDescription: "Ocean-inspired appearances, magical photo moments, poolside themes, and under-the-sea experiences.",
    emotionalHeadline: "An ocean of wonder, right where you are.",
    intro: "Serene, shimmering, and utterly magical — our mermaid experiences bring under-the-sea enchantment to birthdays, poolside parties, and summer events.",
    whatItIs: "A graceful mermaid performer hosts an ocean-themed celebration with storytelling, gentle games, sing-along moments, and dreamy photo opportunities. Poolside formats are available where venues allow, always with safety front of mind.",
    bestFor: ["Birthdays", "Pool & summer parties", "Photo experiences", "Festivals", "Mall appearances"],
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
      { q: "Do you offer in-water appearances?", a: "Poolside and in-water formats are available at suitable, supervised venues. We'll review safety requirements with you when booking." },
      { q: "Is this only for summer?", a: "Not at all — land-based mermaid visits are magical year-round, indoors or out." },
      { q: "How long is a visit?", a: "Typically 45–90 minutes depending on your package and event flow." },
      { q: "Which areas do you serve?", a: "All of Metro Vancouver and the Lower Mainland — see our service area for details." },
    ],
  },
  {
    slug: "mascot-events",
    name: "Mascot Events",
    navLabel: "Mascots",
    accent: "mascot",
    medallion: mascotMedallion,
    tagline: "Friendly faces that light up any crowd",
    shortDescription: "Friendly mascot appearances for parties, schools, community events, malls, and brand activations.",
    emotionalHeadline: "A warm, friendly welcome for every guest.",
    intro: "Cheerful and crowd-pleasing — our mascot appearances bring instant smiles to community events, schools, malls, and brand activations.",
    whatItIs: "A friendly mascot performer brings energy and warmth to your event with waves, photos, gentle interaction, and a presence that draws crowds. Ideal for high-traffic, public-facing moments where everyone wants a photo.",
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
      { q: "Can the mascot represent our brand?", a: "Yes — we provide professional, brand-aware mascot talent and can coordinate appearances around your activation goals." },
      { q: "Do you provide a handler?", a: "For busy public events we recommend a handler to manage crowd flow and keep lines moving smoothly. It's included in larger formats." },
      { q: "How long can a mascot stay 'on'?", a: "We schedule structured breaks to keep performances safe and high-quality. We'll build a timing plan around your event." },
      { q: "Can you bring multiple mascots?", a: "Absolutely — multi-character appearances are available for larger events." },
    ],
  },
  {
    slug: "holiday-events",
    name: "Holiday Events",
    navLabel: "Holidays",
    accent: "holiday",
    medallion: holidayMedallion,
    tagline: "Seasonal magic for every celebration",
    shortDescription: "Seasonal characters for Christmas, Easter, Halloween, Canada Day, winter events, and festive celebrations.",
    emotionalHeadline: "Make the season unforgettable.",
    intro: "Festive, warm, and beautifully presented — our holiday characters bring seasonal magic to homes, malls, schools, and city celebrations all year round.",
    whatItIs: "Seasonal character appearances tailored to the occasion — from winter wonderland visits to spring, Halloween, and Canada Day celebrations. Each appearance is polished, photo-ready, and designed to fit family events and large public programs alike.",
    bestFor: ["Christmas & winter events", "Easter & spring", "Halloween", "Canada Day", "Malls & city events"],
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
      { q: "Do you book up early for the holidays?", a: "Peak seasons fill quickly — we recommend reserving your dates well in advance to secure availability." },
      { q: "Can you support a multi-day mall program?", a: "Yes. Our Premium format is built for recurring, public-facing seasonal programs with reliable scheduling." },
      { q: "Are appearances available for any holiday?", a: "We cover the major seasonal celebrations year-round. Tell us your occasion and we'll match the right character." },
      { q: "Do you serve all of Metro Vancouver?", a: "Yes — across Vancouver and the Lower Mainland." },
    ],
  },
  {
    slug: "corporate-events",
    name: "Corporate & City Events",
    navLabel: "Corporate",
    accent: "corporate",
    medallion: corporateMedallion,
    tagline: "Premium entertainment for public-facing events",
    shortDescription: "Premium character entertainment for malls, festivals, city activations, company parties, and public-facing events.",
    emotionalHeadline: "For event planners who cannot afford a bad event.",
    intro: "Reliable, polished, and presentation-first — our corporate and city experiences deliver premium character entertainment that reflects well on your brand and keeps crowds moving.",
    whatItIs: "Professional character entertainment engineered for public-facing events: malls, festivals, city activations, holiday programs, and company celebrations. We focus on reliability, presentation quality, audience flow, and strong photo opportunities — so your event runs smoothly and looks exceptional.",
    bestFor: ["Malls & shopping centres", "Festivals & city events", "Brand activations", "Corporate parties", "Holiday programs"],
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
        highlights: ["One vetted performer", "Premium presentation", "Photo opportunities", "On-time, professional delivery"],
      },
      {
        name: "Program Package",
        blurb: "Recurring appearances for multi-day or multi-location public programs.",
        highlights: ["Multiple appearances", "Scheduling & logistics support", "Crowd-flow handler", "Consistent presentation"],
      },
      {
        name: "Signature Activation",
        blurb: "A flagship, multi-character experience designed around your brand and venue.",
        highlights: ["Multi-character lineup", "Custom staging & flow", "Dedicated event coordination", "Tailored to your objectives"],
      },
    ],
    faqs: [
      { q: "Are your performers insured?", a: "We deliver public-ready, liability-aware appearances. Share your venue's requirements and we'll align our documentation accordingly." },
      { q: "Can you handle high-traffic public events?", a: "Yes — crowd flow, scheduling, and presentation are core to our corporate and city formats." },
      { q: "Do you support multi-day programs?", a: "Absolutely. Our Program Package is built for recurring appearances across days or locations." },
      { q: "How far in advance should we book?", a: "For city events and seasonal programs, earlier is better. Reach out and we'll confirm availability for your dates." },
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
  { title: "Birthday Parties", audience: "Families", description: "Magical, structured celebrations that keep kids engaged from the entrance to the final photo." },
  { title: "Schools & Daycares", audience: "Educators", description: "Engaging, age-aware visits that blend wonder with learning — easy to schedule and manage." },
  { title: "Malls & Shopping Centres", audience: "Retail & marketing", description: "Crowd-drawing appearances and photo moments that bring foot traffic and delight shoppers." },
  { title: "Festivals & City Events", audience: "Municipal & community", description: "Premium, public-ready character entertainment with reliable scheduling and crowd flow." },
  { title: "Corporate Events", audience: "Planners & brands", description: "Polished, presentation-first entertainment for family days, activations, and company parties." },
  { title: "Holiday Events", audience: "Seasonal programs", description: "Seasonal characters that make Christmas, Halloween, Easter, and more truly memorable." },
];

export const serviceAreas = [
  "Vancouver", "Coquitlam", "Burnaby", "Richmond", "Surrey", "Langley",
  "North Vancouver", "West Vancouver", "New Westminster", "Port Moody",
  "Port Coquitlam", "Maple Ridge", "Delta", "White Rock", "Abbotsford", "Chilliwack",
];

export const trustItems = [
  "5,000+ Events Performed",
  "Professional Performers",
  "Premium Costumes & Experiences",
  "Schools, Festivals & Corporate",
  "Serving Metro Vancouver",
];

export type StorybookWorld = {
  name: string;
  slug: string;
  accent: string;
  medallion: string;
  scene: string;
  blurb: string;
};

export const storybookWorlds: StorybookWorld[] = [
  { name: "Princess Kingdom", slug: "princess-events", accent: "princess", medallion: princessMedallion, scene: princessScene, blurb: "Royal welcomes, sing-alongs, and fairytale photo moments." },
  { name: "Hero Headquarters", slug: "hero-events", accent: "hero", medallion: heroMedallion, scene: heroScene, blurb: "High-energy missions and brave adventures for young heroes." },
  { name: "Jurassic Valley", slug: "dinosaur-events", accent: "dinosaur", medallion: dinosaurMedallion, scene: dinosaurScene, blurb: "Larger-than-life prehistoric encounters led by expert trainers." },
  { name: "Mermaid Cove", slug: "mermaid-events", accent: "mermaid", medallion: mermaidMedallion, scene: mermaidScene, blurb: "Shimmering under-the-sea magic for parties and poolside events." },
  { name: "Mascot Meadows", slug: "mascot-events", accent: "mascot", medallion: mascotMedallion, scene: mascotScene, blurb: "Friendly, crowd-pleasing characters that light up any event." },
  { name: "Holiday Village", slug: "holiday-events", accent: "holiday", medallion: holidayMedallion, scene: holidayScene, blurb: "Seasonal characters that make every holiday unforgettable." },
  { name: "Corporate District", slug: "corporate-events", accent: "corporate", medallion: corporateMedallion, scene: corporateScene, blurb: "Polished, reliable entertainment for public and brand events." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  { quote: "From the first email to the final photo, everything was effortless. Our daughter's face when the princess arrived was priceless.", name: "Sarah M.", role: "Parent · Burnaby" },
  { quote: "The team handled a gym full of excited kids with total professionalism. Engaging, organized, and genuinely educational.", name: "Mr. Donnelly", role: "Elementary School · Surrey" },
  { quote: "Their characters drew the biggest crowds at our summer festival. Reliable, premium, and an absolute pleasure to coordinate with.", name: "Priya R.", role: "Festival Organizer · Richmond" },
  { quote: "We needed entertainment that reflected our brand at a public activation. They delivered flawlessly and on schedule.", name: "James T.", role: "Marketing Lead · Vancouver" },
];

export const whyPoints = [
  { title: "Professional performers", body: "Vetted, trained talent who know how to hold a room and read every audience." },
  { title: "Premium costumes & presentation", body: "High-quality costumes and styling that look exceptional in person and on camera." },
  { title: "Structured entertainment", body: "Real activities and flow — not just photos. Every minute is thoughtfully planned." },
  { title: "Audience-aware delivery", body: "We adapt live to ages, energy, and setting, from intimate parties to public crowds." },
  { title: "Family, school & corporate ready", body: "One trusted team for birthdays, classrooms, malls, festivals, and company events." },
  { title: "Local Metro Vancouver team", body: "Proudly based in the Lower Mainland, with reliable, on-time local delivery." },
];

export const bookingSteps = [
  { step: "01", title: "Choose Your Adventure", body: "Browse our worlds and pick the character experience that fits your event." },
  { step: "02", title: "Select Your Package", body: "We help match your event with the right format, length, and presentation." },
  { step: "03", title: "Reserve Your Date", body: "Lock in your date and details with our friendly local team." },
  { step: "04", title: "We Bring the Magic", body: "Your character team arrives prepared, polished, and ready to create memories." },
];
