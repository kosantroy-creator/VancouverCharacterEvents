/**
 * Branded event-planning journal — helpful, brand-safe content for SEO.
 *
 * Rules baked in: no copyrighted character names, natural local mentions
 * (Metro Vancouver / Lower Mainland), genuinely useful guidance (not thin
 * spam), and internal links via `related` service slugs + a closing CTA.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  excerpt: string;
  /** chapter accent css var for theming the card/post */
  accent: string;
  /** related service-page slugs for internal links */
  related: string[];
  body: BlogBlock[];
};

export const blogCategories = [
  "Birthday Party Ideas",
  "Princess Party Planning",
  "Superhero Party Planning",
  "Dinosaur Party Ideas",
  "School & Daycare Events",
  "Mall & Festival Entertainment",
  "Corporate & Holiday Events",
  "Vancouver Event Planning",
] as const;

const CTA_NOTE =
  "Vancouver Character Events brings premium, professional character entertainment to families, schools, malls, festivals, and corporate clients across Metro Vancouver and the Lower Mainland.";

export const blogPosts: BlogPost[] = [
  {
    slug: "best-character-party-ideas-for-kids-in-vancouver",
    title: "Best Character Party Ideas for Kids in Vancouver",
    description:
      "Fresh, memorable character party ideas for kids' birthdays across Metro Vancouver — themes, activities, and tips for a celebration that runs smoothly.",
    category: "Birthday Party Ideas",
    date: "2026-05-28",
    readMinutes: 6,
    excerpt:
      "From fairytale tea parties to heroic training missions, here are the character party ideas Vancouver families love most — and how to make yours feel effortless.",
    accent: "var(--chapter-princess)",
    related: ["princess-events", "hero-events", "dinosaur-events"],
    body: [
      {
        type: "p",
        text: "A great character party isn't just about who walks through the door — it's about the story your child gets to live for an afternoon. The best celebrations have a clear theme, a gentle flow, and a professional performer who keeps every guest engaged from the first hello to the final photo.",
      },
      { type: "h2", text: "Pick a theme your child already loves" },
      {
        type: "p",
        text: "Start with what lights your child up. A graceful princess visit suits a calm, magical celebration; an action-packed hero adventure is perfect for high-energy groups; a larger-than-life dinosaur encounter delivers genuine gasps and works beautifully for mixed ages. Choosing a theme first makes every other decision — decor, cake, activities — fall into place.",
      },
      { type: "h2", text: "Plan the flow, not just the guest list" },
      {
        type: "p",
        text: "Kids do best with a loose structure. A reliable rhythm looks like this:",
      },
      {
        type: "ul",
        items: [
          "A grand entrance to capture everyone's attention",
          "An interactive welcome, sing-along, or themed mission",
          "Games and activities matched to the group's age and energy",
          "Unhurried photo time so every guest goes home with a memory",
        ],
      },
      { type: "h2", text: "Match the experience to your space" },
      {
        type: "p",
        text: "Vancouver weather means a backyard plan can become a living-room plan quickly. Choose activities that work indoors or out, keep a flexible footprint, and let your performer adapt live — that flexibility is exactly what a professional brings.",
      },
      { type: "h2", text: "Keep it stress-free for the grown-ups" },
      {
        type: "p",
        text: "The point of hiring entertainment is so you can actually enjoy the party. Confirm timing, space, and any special requests in advance, then let the performer carry the room while you take photos and visit with guests.",
      },
      {
        type: "p",
        text: "If you're not sure which theme fits your child best, our team is happy to help you choose the right experience for the ages and energy in the room.",
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-character-for-a-birthday-party",
    title: "How to Choose the Right Character for a Birthday Party",
    description:
      "A simple framework for choosing the perfect party character by your child's age, personality, and group size — from a Metro Vancouver entertainment team.",
    category: "Birthday Party Ideas",
    date: "2026-05-12",
    readMinutes: 5,
    excerpt:
      "Princess, hero, mermaid, or dinosaur? Use your child's age, personality, and the group's energy to pick a character everyone will love.",
    accent: "var(--chapter-hero)",
    related: ["princess-events", "hero-events", "mermaid-events"],
    body: [
      {
        type: "p",
        text: "With so many wonderful options, choosing a single party character can feel surprisingly hard. The good news: a few simple questions almost always point to the right answer.",
      },
      { type: "h2", text: "Start with age and attention span" },
      {
        type: "p",
        text: "Younger children (ages two to four) tend to love gentle, warm characters with sing-alongs and calm interaction. Older kids often want more action, challenges, and a sense of adventure. A professional performer scales the energy either way, but the character sets the tone.",
      },
      { type: "h2", text: "Consider your child's personality" },
      {
        type: "ul",
        items: [
          "Loves dress-up, stories, and gentle magic? A princess or mermaid visit shines.",
          "Full of energy and big imagination? A hero adventure keeps them moving.",
          "Fascinated by nature and 'wow' moments? A dinosaur encounter is unforgettable.",
          "Wants something nobody else has? A specialty or custom character stands out.",
        ],
      },
      { type: "h2", text: "Factor in the group" },
      {
        type: "p",
        text: "A small, cozy gathering can support quieter, more personal moments. A big guest list benefits from a character and format built to hold a crowd and keep everyone included. Tell your entertainment team your headcount so they can recommend the right package and pacing.",
      },
      { type: "h2", text: "When in doubt, ask" },
      {
        type: "p",
        text: "If you're still torn, describe your child and your space to us — we'll suggest the experience that fits. There's no wrong answer when the performer is professional and the format matches your group.",
      },
    ],
  },
  {
    slug: "princess-party-ideas-for-vancouver-birthdays",
    title: "Princess Party Ideas for Vancouver Birthdays",
    description:
      "Elegant princess party ideas for Vancouver birthdays — royal welcomes, tea-party touches, games, and photo moments that feel genuinely magical.",
    category: "Princess Party Planning",
    date: "2026-04-30",
    readMinutes: 6,
    excerpt:
      "Turn an ordinary afternoon into a fairytale with these graceful, easy-to-plan princess party ideas for Metro Vancouver celebrations.",
    accent: "var(--chapter-princess)",
    related: ["princess-events"],
    body: [
      {
        type: "p",
        text: "A princess party is all about wonder and warmth. The magic comes from small, thoughtful details and a performer who makes each child feel genuinely seen.",
      },
      { type: "h2", text: "Set a graceful scene" },
      {
        type: "p",
        text: "You don't need a ballroom. Soft colours, a few sparkles, a small 'throne' chair, and a tidy photo corner go a long way. Keep decor simple so the focus stays on the experience.",
      },
      { type: "h2", text: "Royal activities kids adore" },
      {
        type: "ul",
        items: [
          "A royal welcome and curtsey lesson to open the party",
          "A gentle sing-along everyone can join",
          "Storytime or a 'royal manners' game for calm, happy moments",
          "Crowning and individual photos with the guest of honour",
        ],
      },
      { type: "h2", text: "Tea-party touches" },
      {
        type: "p",
        text: "Simple snacks served as a 'royal tea' feel special without extra effort — think fruit, small sandwiches, and a signature pink lemonade. Pair it with quiet music for a lovely mid-party reset.",
      },
      { type: "h2", text: "Make it effortless" },
      {
        type: "p",
        text: "Our princess performers arrive in premium gowns and carry the entire experience — entrance, songs, games, and photos — so you can simply enjoy the day. Explore our princess events to see formats for intimate parties and larger celebrations across the Lower Mainland.",
      },
    ],
  },
  {
    slug: "superhero-party-games-for-kids-parties",
    title: "Superhero Party Games for Kids' Parties",
    description:
      "High-energy superhero party games that keep kids engaged and included — training missions, team challenges, and tips for safe, organized fun.",
    category: "Superhero Party Planning",
    date: "2026-04-18",
    readMinutes: 5,
    excerpt:
      "Channel big imaginations into structured fun with these crowd-pleasing superhero party games for energetic Vancouver birthday groups.",
    accent: "var(--chapter-hero)",
    related: ["hero-events"],
    body: [
      {
        type: "p",
        text: "Hero parties thrive on energy — but energy needs a plan. The best superhero entertainment turns excitement into organized missions so every child feels brave, included, and a little heroic.",
      },
      { type: "h2", text: "Hero training academy" },
      {
        type: "p",
        text: "Open with a 'training academy': agility courses, balance challenges, and power poses. It sets expectations, burns the first wave of energy, and gets everyone working together.",
      },
      { type: "h2", text: "Team missions that include everyone" },
      {
        type: "ul",
        items: [
          "A cooperative 'rescue' mission with a simple storyline",
          "Freeze-and-go games that reward listening",
          "A teamwork challenge where the whole group 'saves the day'",
          "A heroic salute and photo to celebrate the win",
        ],
      },
      { type: "h2", text: "Keep it safe and scaled" },
      {
        type: "p",
        text: "Games should flex to the ages and space in the room. A professional performer reads the group live and adjusts intensity so younger guests stay comfortable and older kids stay challenged.",
      },
      { type: "h2", text: "Original heroes, premium delivery" },
      {
        type: "p",
        text: "We deliver original, premium hero personas inspired by classic adventure archetypes — never copyrighted names or likenesses. See our hero events for party and school formats across Metro Vancouver.",
      },
    ],
  },
  {
    slug: "dinosaur-birthday-party-ideas-for-kids-in-vancouver",
    title: "Dinosaur Birthday Party Ideas for Kids in Vancouver",
    description:
      "Roar-worthy dinosaur birthday party ideas for Vancouver kids — a trainer-led encounter, prehistoric games, and educational fun for mixed ages.",
    category: "Dinosaur Party Ideas",
    date: "2026-04-04",
    readMinutes: 6,
    excerpt:
      "A lifelike dinosaur and a friendly trainer make for one of the most memorable birthdays going. Here's how to plan a prehistoric celebration.",
    accent: "var(--chapter-dinosaur)",
    related: ["dinosaur-events"],
    body: [
      {
        type: "p",
        text: "Few things spark genuine awe like a lifelike dinosaur arriving at a party. Paired with a friendly trainer, it becomes equal parts thrilling and educational — perfect for curious kids and mixed-age groups.",
      },
      { type: "h2", text: "Build the prehistoric world" },
      {
        type: "p",
        text: "A few leafy props, a 'fossil dig' bin with sand and toy bones, and some green and amber colours instantly set the scene. Keep an open area clear for the dinosaur's big entrance.",
      },
      { type: "h2", text: "Activities that teach and thrill" },
      {
        type: "ul",
        items: [
          "A trainer-led introduction with curious Q&A",
          "A fossil dig or 'dino egg' hunt for hands-on fun",
          "Safe meet-and-greet and photos with the dinosaur",
          "Simple facts woven through the visit for a learning boost",
        ],
      },
      { type: "h2", text: "Comfortable for nervous little ones" },
      {
        type: "p",
        text: "A skilled trainer manages the encounter carefully, building wonder rather than fear. Nervous guests can watch from a comfortable distance and join in when they're ready.",
      },
      { type: "h2", text: "Great for schools, too" },
      {
        type: "p",
        text: "The same experience is a hit at schools and community events. Explore our dinosaur events for birthday, classroom, and festival formats across the Lower Mainland.",
      },
    ],
  },
  {
    slug: "how-much-does-character-entertainment-cost-in-vancouver",
    title: "How Much Does Character Entertainment Cost in Vancouver?",
    description:
      "Understand what goes into character entertainment pricing in Vancouver — packages, add-ons, travel, and how to get the best value for your event.",
    category: "Vancouver Event Planning",
    date: "2026-03-22",
    readMinutes: 6,
    excerpt:
      "What should you budget for a professional character experience in Metro Vancouver? Here's an honest look at what affects the price.",
    accent: "var(--chapter-corporate)",
    related: ["princess-events", "corporate-events"],
    body: [
      {
        type: "p",
        text: "Character entertainment pricing varies for good reasons — the performer's experience, costume quality, length of the visit, and how much structure your event needs all play a role. Here's how to think about value rather than just the lowest number.",
      },
      { type: "h2", text: "What you're really paying for" },
      {
        type: "ul",
        items: [
          "A trained, vetted performer who can hold a room",
          "Premium costumes that look exceptional in person and on camera",
          "Structured entertainment — games and flow, not just an appearance",
          "Reliable scheduling, punctuality, and professional conduct",
        ],
      },
      { type: "h2", text: "Typical factors that move the price" },
      {
        type: "p",
        text: "Longer visits, multiple characters, larger crowds, and public-facing events generally cost more because they require more planning and staffing. Travel across Metro Vancouver and seasonal demand (holidays fill quickly) can also be factors.",
      },
      { type: "h2", text: "Getting the best value" },
      {
        type: "p",
        text: "Book early for peak dates, be clear about your guest count and space, and choose a package that matches your event rather than over- or under-buying. A good provider will help you right-size the experience.",
      },
      { type: "h2", text: "Transparent packages" },
      {
        type: "p",
        text: "We publish clear, transparent packages and are happy to quote custom, multi-character events. Reach out with your date and details and we'll recommend the best fit for your budget.",
      },
    ],
  },
  {
    slug: "what-to-ask-before-booking-a-party-character",
    title: "What to Ask Before Booking a Party Character",
    description:
      "The essential questions to ask before booking a party character in Vancouver — professionalism, insurance, costumes, and what's included.",
    category: "Vancouver Event Planning",
    date: "2026-03-08",
    readMinutes: 5,
    excerpt:
      "Protect your event (and your peace of mind) by asking these key questions before you book any character performer.",
    accent: "var(--chapter-specialty)",
    related: ["corporate-events"],
    body: [
      {
        type: "p",
        text: "A character visit is the centrepiece of your event, so it's worth a few minutes of due diligence. These questions quickly separate a polished, professional team from a risky booking.",
      },
      { type: "h2", text: "Ask about the essentials" },
      {
        type: "ul",
        items: [
          "Are your performers trained, vetted, and experienced with this age group?",
          "What exactly is included — entrance, activities, photos, and how long?",
          "What do your costumes look like? Can I see recent examples?",
          "How do you handle large groups, crowd flow, and photo moments?",
          "Are you reliable on timing, and what's your backup plan?",
        ],
      },
      { type: "h2", text: "For public and corporate events" },
      {
        type: "p",
        text: "If your event is public-facing, ask about liability-aware conduct, scheduling for multi-hour or multi-day programs, and how the team coordinates with your venue. Professionals will answer clearly and confidently.",
      },
      { type: "h2", text: "Watch for brand-safe practices" },
      {
        type: "p",
        text: "Reputable providers use original, brand-safe characters and category language rather than copyrighted names — a sign they take professionalism (and your event's reputation) seriously.",
      },
      { type: "h2", text: "Trust the conversation" },
      {
        type: "p",
        text: "The right team makes you feel reassured, not pressured. If you'd like straightforward answers to all of the above, our team is glad to help.",
      },
    ],
  },
  {
    slug: "best-entertainment-ideas-for-school-and-daycare-events",
    title: "Best Entertainment Ideas for School and Daycare Events",
    description:
      "Engaging, age-aware entertainment ideas for schools and daycares in Metro Vancouver — easy to schedule, educational, and genuinely fun.",
    category: "School & Daycare Events",
    date: "2026-02-24",
    readMinutes: 5,
    excerpt:
      "From wonder-filled character visits to educational dinosaur encounters, here's what works for classrooms and daycare groups.",
    accent: "var(--chapter-dinosaur)",
    related: ["mascot-events", "dinosaur-events"],
    body: [
      {
        type: "p",
        text: "School and daycare entertainment has to do two things at once: delight a room full of kids and stay easy for educators to manage. The best options blend wonder with structure.",
      },
      { type: "h2", text: "Ideas that fit a school day" },
      {
        type: "ul",
        items: [
          "A character visit tied to a reading, kindness, or seasonal theme",
          "An educational dinosaur encounter with age-appropriate facts",
          "A friendly mascot appearance for assemblies and spirit days",
          "Structured games that keep the whole group included",
        ],
      },
      { type: "h2", text: "Keep it age-aware" },
      {
        type: "p",
        text: "Younger classes need calm pacing and gentle interaction; older students enjoy more challenge and humour. A professional performer adapts live so every group stays engaged and comfortable.",
      },
      { type: "h2", text: "Easy to schedule and manage" },
      {
        type: "p",
        text: "Look for a provider who is punctual, organized, and used to working within a school's routines and space. Clear timing and a calm, prepared performer make the day effortless for staff.",
      },
      { type: "h2", text: "Local and reliable" },
      {
        type: "p",
        text: "We bring engaging, age-aware visits to schools and daycares across Metro Vancouver. Tell us your group size and goals and we'll tailor the visit to your classroom.",
      },
    ],
  },
  {
    slug: "how-to-plan-a-mall-character-appearance",
    title: "How to Plan a Mall Character Appearance",
    description:
      "A practical guide to planning a mall character appearance in Metro Vancouver — crowd flow, scheduling, photo moments, and a polished brand experience.",
    category: "Mall & Festival Entertainment",
    date: "2026-02-10",
    readMinutes: 6,
    excerpt:
      "Mall appearances draw crowds and delight shoppers — when they're planned well. Here's how to keep lines moving and the experience premium.",
    accent: "var(--chapter-mascot)",
    related: ["corporate-events", "mascot-events"],
    body: [
      {
        type: "p",
        text: "A character appearance can bring real foot traffic and goodwill to a shopping centre — but a public, high-traffic setting needs more planning than a backyard party. Crowd flow and presentation are everything.",
      },
      { type: "h2", text: "Plan for crowds and lines" },
      {
        type: "ul",
        items: [
          "Choose a visible, open location with room for a queue",
          "Add a handler to manage flow and keep lines moving",
          "Build in structured breaks to keep the performance fresh and safe",
          "Create a tidy, on-brand photo backdrop",
        ],
      },
      { type: "h2", text: "Schedule for peak traffic" },
      {
        type: "p",
        text: "Align appearance windows with your busiest hours, and consider multi-day programs for seasonal campaigns. Reliable scheduling and punctuality protect both the experience and your brand.",
      },
      { type: "h2", text: "Keep it premium and brand-safe" },
      {
        type: "p",
        text: "Premium costumes, professional conduct, and original, brand-safe characters keep your activation looking polished and avoid licensing risk. Photo moments turn happy shoppers into social shares.",
      },
      { type: "h2", text: "Built for public events" },
      {
        type: "p",
        text: "Our corporate and city events are engineered for malls, festivals, and activations across the Lower Mainland — with crowd flow, scheduling, and presentation handled.",
      },
    ],
  },
  {
    slug: "holiday-character-entertainment-ideas-for-corporate-events",
    title: "Holiday Character Entertainment Ideas for Corporate Events",
    description:
      "Festive, polished holiday character entertainment ideas for corporate events and city programs across Metro Vancouver.",
    category: "Corporate & Holiday Events",
    date: "2026-01-20",
    readMinutes: 5,
    excerpt:
      "Make your company's holiday event memorable with seasonal characters, photo moments, and reliable, brand-safe entertainment.",
    accent: "var(--chapter-holiday)",
    related: ["holiday-events", "corporate-events"],
    body: [
      {
        type: "p",
        text: "Holiday events are a chance to thank employees, customers, and communities — and a warm seasonal character adds genuine delight. The key is festive magic delivered with corporate-level reliability.",
      },
      { type: "h2", text: "Ideas that fit company gatherings" },
      {
        type: "ul",
        items: [
          "Seasonal character meet-and-greets with photo moments",
          "Family-day appearances for employees and their kids",
          "Festive entrances and roaming characters for receptions",
          "Multi-day programs for malls and city holiday events",
        ],
      },
      { type: "h2", text: "Polished and on brand" },
      {
        type: "p",
        text: "Premium seasonal costumes, professional performers, and tidy photo staging keep everything looking exceptional. For public programs, crowd flow and scheduling keep the experience smooth.",
      },
      { type: "h2", text: "Plan ahead for the season" },
      {
        type: "p",
        text: "Holiday dates fill quickly, so reserve early. Share your venue, audience, and goals and we'll build a program that reflects well on your brand.",
      },
      { type: "h2", text: "Reliable city-ready delivery" },
      {
        type: "p",
        text: "Explore our holiday events and corporate and city events for seasonal programs across Metro Vancouver.",
      },
    ],
  },
  {
    slug: "birthday-party-entertainment-ideas-for-rainy-vancouver-days",
    title: "Birthday Party Entertainment Ideas for Rainy Vancouver Days",
    description:
      "Rain-proof birthday party entertainment ideas for Vancouver — indoor-friendly characters, games, and a flexible plan for wet-weather celebrations.",
    category: "Birthday Party Ideas",
    date: "2026-01-06",
    readMinutes: 5,
    excerpt:
      "Vancouver rain doesn't have to dampen the party. Here's how to plan indoor-friendly character entertainment that still feels magical.",
    accent: "var(--chapter-mermaid)",
    related: ["princess-events", "hero-events"],
    body: [
      {
        type: "p",
        text: "If you're planning a birthday in Metro Vancouver, it's wise to assume rain is possible. The trick is choosing entertainment that works beautifully indoors and a plan that flexes at the last minute.",
      },
      { type: "h2", text: "Indoor-friendly experiences" },
      {
        type: "p",
        text: "Princess visits, hero adventures, mermaid storytelling, and specialty characters all shine indoors. They rely on interaction, games, and photos rather than wide-open space, so a living room or community room works perfectly.",
      },
      { type: "h2", text: "Keep the footprint flexible" },
      {
        type: "ul",
        items: [
          "Clear a simple open area for the entrance and games",
          "Have a compact photo corner ready",
          "Plan calmer activities if the group will be indoors a while",
          "Let your performer adapt the format to your space",
        ],
      },
      { type: "h2", text: "A backup that feels seamless" },
      {
        type: "p",
        text: "A professional performer can move a party indoors without missing a beat. Confirm your indoor option in advance so a change in weather never changes the magic.",
      },
      { type: "h2", text: "Book with confidence" },
      {
        type: "p",
        text: "Our experiences are designed to work rain or shine across the Lower Mainland. Tell us your space and we'll recommend the right indoor-friendly format.",
      },
    ],
  },
  {
    slug: "what-makes-a-character-performer-professional",
    title: "What Makes a Character Performer Professional?",
    description:
      "The marks of a truly professional character performer — training, premium costumes, audience awareness, reliability, and brand-safe practices.",
    category: "Vancouver Event Planning",
    date: "2025-12-15",
    readMinutes: 5,
    excerpt:
      "Not all character entertainment is equal. Here's what separates a professional performance from a costume that simply shows up.",
    accent: "var(--chapter-hero)",
    related: ["corporate-events"],
    body: [
      {
        type: "p",
        text: "When people say a character visit was 'amazing', they're usually describing professionalism — even if they don't use the word. Here's what that really means.",
      },
      { type: "h2", text: "Training and audience awareness" },
      {
        type: "p",
        text: "A professional performer knows how to hold a room, read the ages and energy in front of them, and adjust live. They keep shy children comfortable and high-energy groups engaged, all while staying perfectly in character.",
      },
      { type: "h2", text: "Premium presentation" },
      {
        type: "ul",
        items: [
          "High-quality costumes that look exceptional up close and on camera",
          "A confident, polished arrival that sets the tone",
          "Structured entertainment with real games and flow",
          "Unhurried, inclusive photo moments for every guest",
        ],
      },
      { type: "h2", text: "Reliability you can count on" },
      {
        type: "p",
        text: "Punctuality, clear communication, and a calm, prepared presence matter as much as the performance itself — especially for schools, malls, and corporate events where your reputation is on the line.",
      },
      { type: "h2", text: "Brand-safe and original" },
      {
        type: "p",
        text: "Professionals use original, brand-safe characters and category language rather than copyrighted names. It protects your event and reflects a team that takes its craft seriously. That's the standard we hold across Metro Vancouver.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const sortedPosts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const postsByCategory = (category: string) =>
  sortedPosts.filter((p) => p.category === category);

export { CTA_NOTE };
