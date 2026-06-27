import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Blocks, Camera, Castle, Check, Clock, ExternalLink, Palette, PartyPopper, Ruler, RotateCcw, Sparkles, Tag, Tent, Users, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import laurenPhoto from "@/assets/bazaar/lauren.webp";
import alejandraPhoto from "@/assets/bazaar/alejandra.webp";
import stallFace from "@/assets/bazaar/stalls/stall-face-painting.webp";
import stallBalloon from "@/assets/bazaar/stalls/stall-balloon.webp";
import stallPhoto from "@/assets/bazaar/stalls/stall-photography.webp";
import stallInflatable from "@/assets/bazaar/stalls/stall-inflatable.webp";
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

/**
 * BazaarPartners — "Meet the Bazaar Partners". The bazaar sibling of the Princess
 * KingdomDoors: four stall backdrops stacked down the page, each shown FULL (only a
 * soft top/bottom feather — no side fade), with the readable copy floated into its
 * own bordered panel. Only Lauren — "Twistress Purple" from Twist Parties — has a
 * partner today: her portrait sits centred over the Balloon Twisting backdrop, and
 * tapping it spins her aside (GSAP) while her three package cards slide in from the
 * opposite side. The other stalls show a "Coming Soon" placeholder. Inflatables are
 * PARTNER-based; no invented prices beyond Lauren's published 1-hour rate. The
 * desktop reveal never changes the zone height, so the backdrop stays put on
 * click/hover. Reduced-motion + mobile fall back to a simple stacked reveal.
 * See "ENCHANTED BAZAAR PARTNERS" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Pkg = { name: string; meta: string; price: string; includes: string[]; bestFor: string; featured?: boolean };
type Person = { name: string; role: string; photo: string; objectPos?: string; packages: Pkg[] };
type Rental = { name: string; desc: string; img: string; dims?: string; specs?: string; rate?: string };
type InflatableCat = { id: string; name: string; icon: IconType; acc: string; accDeep: string; blurb: string; thumb: string; items: Rental[] };
type Inflatable = { partner: string; tag: string; categories: InflatableCat[] };
type Zone = {
  id: string;
  name: string;
  icon: IconType;
  bg: string;
  acc: string;
  accDeep: string;
  story: string;
  person?: Person;
  inflatable?: Inflatable;
  note?: string;
  cta?: string;
};

/* HW House of Bounce catalog (scrubbed from hwhouseofbounce.ca) — no prices: the
   partner confirms availability and quotes the rental directly. */
const INFLATABLE_CATS: InflatableCat[] = [
  {
    id: "castles",
    name: "Bouncy Castles",
    icon: Castle,
    acc: "#8E2D6E",
    accDeep: "#6E2356",
    blurb: "Classic jump-and-play castles and slide combos.",
    thumb: imgUltraWhite,
    items: [
      { name: "Ultra White Bouncy Castle", img: imgUltraWhite, desc: "Great for creative wedding photos and customizable party fun.", dims: "13.5'L x 16.5'W x 20'H", specs: "Max 1100 lbs · 10 kids / 6 adults · Ages 6+", rate: "$375" },
      { name: "Enchanted Forest Inflatable", img: imgEnchanted, desc: "A whimsical forest-themed bounce house with a pool slide.", dims: "26.5'L (with pool) x 14'W x 14.5'H", specs: "Max 800 lbs · Ages 3+", rate: "$300" },
      { name: "Jelly Bean Bounce House with Slide", img: imgJellyBean, desc: "A playful bounce house with a built-in slide.", dims: "26.5'L x 14'W x 14.5'H", specs: "Max 700 lbs · Ages 3+", rate: "$300" },
      { name: "Double Slide Triple Play", img: imgDoubleSlide, desc: "A larger bounce house with double slides and play features.", dims: "13.7'W x 16.7'D x 7.1'H", specs: "Max 500 lbs · Ages 3-10", rate: "$200" },
      { name: "Joy Moderate Slide Bounce House", img: imgJoySlide, desc: "A mid-size bounce house with a slide.", dims: "10.5'L x 9.2'W x 7.6'H", specs: "Max 300 lbs · Ages 3-10", rate: "$170" },
      { name: "Red Yellow Blue Bouncy Castle", img: imgRedYellowBlue, desc: "A bright, colourful classic bouncy castle.", dims: "13.1'D x 12.5'W x 8.2'H", specs: "Max 800 lbs · Ages 3-10", rate: "$220" },
      { name: "AA Small Bounce House", img: imgAaSmall, desc: "A compact bounce house for smaller spaces and younger guests.", dims: "9'W x 12'D x 6.1'H", specs: "Max 250 lbs · Ages 3-10", rate: "$170" },
      { name: "Sensory “Super” Soft Play Set with Bounce House", img: imgSoftSuper, desc: "Our largest sensory soft-play set with a bounce house.", dims: "30'D x 16'W x 7.5'H (adjustable)", specs: "Max 500 lbs in bouncy · Ages 1+", rate: "$300" },
      { name: "Sensory “Moderate” Soft Play Set with Bounce House", img: imgSoftModerate, desc: "Mini ball pit, bouncy castle, mats & two soft-play units (units may vary).", dims: "18'D x 14'W x 7.5'H (adjustable)", specs: "Max 300 lbs in bouncy · Ages 1+", rate: "$250" },
      { name: "Sensory “Small” Soft Play Set with Bounce House", img: imgSoftSmall, desc: "A smaller sensory soft-play set for tighter spaces.", dims: "18'D x 14'W x 6.1'H (adjustable)", specs: "250 lbs in bouncy · Ages 1+", rate: "$240" },
      { name: "Sensory “Mini” Soft Play Foam Set", img: imgSoftMini, desc: "A compact sensory foam play set for the littlest guests.", dims: "14'D x 14'W (adjustable)", specs: "Ages 6 months+", rate: "$200" },
      { name: "Blue Shark Park", img: imgBlueShark, desc: "A shark-themed inflatable park with slide and splash play.", dims: "19'L x 11'W x 8.25'H", specs: "Max 300 lbs in bounce area · Ages 3+", rate: "$220" },
    ],
  },
  {
    id: "softplay",
    name: "Soft Play Sets",
    icon: Blocks,
    acc: "#C8556E",
    accDeep: "#A23A54",
    blurb: "Sensory-friendly soft play for younger children.",
    thumb: imgSoftSuper,
    items: [
      { name: "Sensory “Super” Soft Play Set with Bounce House", img: imgSoftSuper, desc: "Our largest sensory soft-play set with a bounce house.", dims: "30'D x 16'W x 7.5'H (adjustable)", specs: "Max 500 lbs in bouncy · Ages 1+", rate: "$300" },
      { name: "Sensory “Moderate” Soft Play Set with Bounce House", img: imgSoftModerate, desc: "Mini ball pit, bouncy castle, mats & two soft-play units (units may vary).", dims: "18'D x 14'W x 7.5'H (adjustable)", specs: "Max 300 lbs in bouncy · Ages 1+", rate: "$250" },
      { name: "Sensory “Small” Soft Play Set with Bounce House", img: imgSoftSmall, desc: "A smaller sensory soft-play set for tighter spaces.", dims: "18'D x 14'W x 6.1'H (adjustable)", specs: "250 lbs in bouncy · Ages 1+", rate: "$240" },
      { name: "Sensory “Mini” Soft Play Foam Set", img: imgSoftMini, desc: "A compact sensory foam play set for the littlest guests.", dims: "14'D x 14'W (adjustable)", specs: "Ages 6 months+", rate: "$200" },
    ],
  },
  {
    id: "water",
    name: "Water Parks",
    icon: Waves,
    acc: "#1FA2B8",
    accDeep: "#13768A",
    blurb: "Splashy inflatable water slides and play parks for warm days.",
    thumb: imgBlueShark,
    items: [
      { name: "Jelly Bean Bounce House with Slide", img: imgJellyBean, desc: "A playful bounce house with a built-in slide for warm days.", dims: "26.5'L x 14'W x 14.5'H", specs: "Max 700 lbs · Ages 3+", rate: "$300" },
      { name: "Enchanted Forest Inflatable", img: imgEnchanted, desc: "A whimsical forest-themed water-play inflatable with a pool.", dims: "26.5'L (with pool) x 14'W x 14.5'H", specs: "Max 800 lbs · Ages 3+", rate: "$300" },
      { name: "Blue Shark Park", img: imgBlueShark, desc: "A shark-themed inflatable water park with slide and splash play.", dims: "19'L x 11'W x 8.25'H", specs: "Max 300 lbs in bounce area · Ages 3+", rate: "$220" },
    ],
  },
];

const ZONES: Zone[] = [
  {
    id: "face",
    name: "Face Painting",
    icon: Palette,
    bg: stallFace,
    acc: "#1E8A9E",
    accDeep: "#156B7A",
    story:
      "Colourful, photo-friendly designs and a touch of glitter that bring extra personality to every guest — from quick cheek art to full fantasy looks.",
    person: {
      name: "Alejandra",
      role: "Face & Body Artist",
      photo: alejandraPhoto,
      objectPos: "center 22%",
      packages: [
        {
          name: "1 Hour Painting",
          meta: "60 minutes",
          price: "$200 + travel",
          bestFor: "Birthdays & smaller parties",
          includes: ["Skin-safe, hypoallergenic paints", "Design menu — animals, superheroes, flowers & more", "Cheek art and full-face designs", "Cosmetic-grade glitter accents", "Great for up to 12–15 guests"],
        },
        {
          name: "1½ Hours Painting",
          meta: "1 hour + 30 min",
          price: "$300 + travel",
          bestFor: "Bigger parties & longer events",
          featured: true,
          includes: ["Everything in the 1 Hour package", "An extra 30 minutes of painting", "More guests painted, shorter wait in line", "Mix of quick and detailed designs"],
        },
        {
          name: "Custom & Public Events",
          meta: "2-hour minimum",
          price: "Custom Quote",
          bestFor: "Large or public events",
          includes: ["Schools, festivals & community events", "Multiple artists for large crowds", "Themed design sets to match your event", "Glitter & gem stations", "Built around your timing & guest flow"],
        },
      ],
    },
  },
  {
    id: "balloon",
    name: "Balloon Twisting",
    icon: PartyPopper,
    bg: stallBalloon,
    acc: "#9152C8",
    accDeep: "#5E3A86",
    story:
      "Swords, crowns, flowers, animals, and wearable balloon creations twisted fresh for every guest in line — guests pick their favourites from the balloon menu.",
    person: {
      name: "Lauren",
      role: "Twistress Purple · Balloon Artist",
      photo: laurenPhoto,
      objectPos: "center 24%",
      packages: [
        {
          name: "1 Hour Twisting",
          meta: "60 minutes",
          price: "$200 + travel",
          bestFor: "Birthdays & smaller parties",
          includes: ["Festive attire (no clown makeup)", "Balloon menu — animals, swords, flowers & wearables", "~15 balloons (up to 20–30 simple)", "Great for up to 15 guests", "Twists alongside your other activities"],
        },
        {
          name: "1½ Hours Twisting",
          meta: "1 hour + 30 min",
          price: "Custom Quote",
          bestFor: "Bigger parties & longer events",
          featured: true,
          includes: ["Everything in the 1 Hour package", "An extra 30 minutes of twisting", "More balloons & a shorter wait in line", "Optional mini twisting lesson"],
        },
        {
          name: "Custom & Public Events",
          meta: "2-hour minimum",
          price: "Custom Quote",
          bestFor: "Large or public events",
          includes: ["Schools, festivals & corporate picnics", "Multiple artists for large crowds", "Party favours / balloon candy cups", "Mini twisting lessons (15–30 min)", "Built around your timing & guest flow"],
        },
      ],
    },
  },
  {
    id: "photo",
    name: "Event Photography",
    icon: Camera,
    bg: stallPhoto,
    acc: "#3E7CA8",
    accDeep: "#2C5E82",
    story:
      "A roaming photographer captures the candid magic — greetings, reactions, group shots, and the details you'd otherwise miss while hosting.",
    note: "We're adding event photography partners. Tell us your event and we'll connect the right photographer for your celebration.",
    cta: "Request Photography",
  },
  {
    id: "inflatable",
    name: "Inflatable Partners",
    icon: Tent,
    bg: stallInflatable,
    acc: "#C28A2E",
    accDeep: "#9A6E2B",
    story:
      "Bouncy castles, soft play, and water parks from our trusted partner HW House of Bounce — tap to browse and we'll forward your request for a quote.",
    inflatable: { partner: "HW House of Bounce", tag: "Inflatable rentals · trusted partner", categories: INFLATABLE_CATS },
  },
];

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function BazaarPartners() {
  return (
    <section aria-labelledby="bzp-title" className="bzp relative isolate overflow-hidden">
      <div aria-hidden className="bzp-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="bzp-glow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-4 pt-20 text-center sm:px-6 md:pt-24 lg:px-8">
        <span className="bzp-eyebrow">
          <span aria-hidden className="bzp-eyebrow-fl" />
          Bazaar Partner Guide
          <span aria-hidden className="bzp-eyebrow-fl bzp-eyebrow-fl--r" />
        </span>
        <h2 id="bzp-title" className="bzp-title">Meet the Bazaar Partners</h2>
        <p className="bzp-sub mx-auto max-w-2xl">
          Wander the marketplace and meet the creative partners behind each stall — tap a partner to
          open their bazaar stall and see what they bring to your event.
        </p>
      </div>

      {ZONES.map((z, i) =>
        z.person ? (
          <PersonZone key={z.id} zone={z} index={i} />
        ) : z.inflatable ? (
          <InflatableZone key={z.id} zone={z} index={i} />
        ) : (
          <PlaceholderZone key={z.id} zone={z} index={i} />
        ),
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="bzp-help">
          <div className="bzp-help-text">
            <h3 className="bzp-help-title">
              <Sparkles className="h-4 w-4" aria-hidden />
              Not sure which Bazaar extras fit your event?
            </h3>
            <p className="bzp-help-copy">
              Tell us your event type, guest count, location, and the kind of energy you want — we&apos;ll
              recommend the right add-ons and check partner availability.
            </p>
          </div>
          <div className="bzp-help-cta">
            <Link to="/contact" className="bzp-cta-primary group">
              <Sparkles className="h-4 w-4" aria-hidden />
              Help Me Choose Add-Ons
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link to="/pricing" className="bzp-cta-ghost">
              Request Bazaar Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Static stall — no partner yet: full backdrop + placeholder card + bordered copy. */
function PlaceholderZone({ zone, index }: { zone: Zone; index: number }) {
  const flip = index % 2 === 1;
  const ZoneIcon = zone.icon;
  return (
    <div
      className={cn("bz-zone", flip && "bz-zone--flip")}
      style={{ "--acc": zone.acc, "--acc-deep": zone.accDeep } as Vars}
      aria-label={zone.name}
    >
      <div aria-hidden className="bz-bg">
        <img src={zone.bg} alt="" loading="lazy" decoding="async" />
        <span className="bz-bg-veil" />
      </div>

      <div className="bz-grid">
        <div className="bz-stage">
          <div className="bz-soon" aria-hidden>
            <span className="bz-soon-ic"><ZoneIcon className="h-7 w-7" /></span>
            <span className="bz-soon-k">Bazaar Partner</span>
            <span className="bz-soon-v">Coming Soon</span>
          </div>
        </div>

        <div className="bz-desc">
          <div className="bz-desc-head">
            <span aria-hidden className="bz-desc-ic"><ZoneIcon className="h-5 w-5" /></span>
            <h3 className="bz-desc-title">{zone.name}</h3>
          </div>
          <p className="bz-desc-story">{zone.story}</p>
          <p className="bz-desc-note">{zone.note}</p>
          <Link to="/contact" className="bz-cta group">
            <Sparkles className="h-4 w-4" aria-hidden />
            {zone.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* Partner stall (Lauren): full backdrop + centred portrait that spins aside on
   click (GSAP) while the package cards slide in from the opposite side. */
function PersonZone({ zone, index: _index }: { zone: Zone; index: number }) {
  const person = zone.person!;
  const ZoneIcon = zone.icon;
  const arenaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLButtonElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const pricesRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const animRef = useRef(false);

  // desktop + motion: GSAP choreography. otherwise CSS handles a stacked reveal.
  useIso(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    animRef.current = !reduce && desktop;
    if (!animRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(portraitRef.current, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, rotation: 0, scale: 1 });
      gsap.set(descRef.current, { top: "50%", yPercent: -50 }); // resting: centred with Lauren
      const cards = pricesRef.current?.querySelectorAll("[data-price]") ?? [];
      gsap.set(pricesRef.current, { autoAlpha: 0 });
      gsap.set(cards, { x: 90, autoAlpha: 0, rotation: 4 });
    }, arenaRef);
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (!animRef.current) return;
    const cards = pricesRef.current?.querySelectorAll("[data-price]") ?? [];
    gsap.killTweensOf([portraitRef.current, descRef.current, pricesRef.current, ...cards]);
    if (next) {
      // centre Lauren horizontally over the description panel
      const a = arenaRef.current?.getBoundingClientRect();
      const d = descRef.current?.getBoundingClientRect();
      const laurenLeft = a && d ? `${((d.left + d.width / 2 - a.left) / a.width) * 100}%` : "16%";
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(portraitRef.current, { left: laurenLeft, top: "29%", rotation: 360, scale: 0.82, duration: 0.9, ease: "back.out(1.4)" }, 0)
        .to(descRef.current, { top: "76%", duration: 0.9, ease: "power3.inOut" }, 0) // slides down as Lauren moves across
        .to(pricesRef.current, { autoAlpha: 1, duration: 0.2 }, 0.3)
        .to(cards, { x: 0, autoAlpha: 1, rotation: 0, duration: 0.65, stagger: 0.12, ease: "back.out(1.5)" }, 0.36);
    } else {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.to(cards, { x: 90, autoAlpha: 0, rotation: 4, duration: 0.42, stagger: 0.06 }, 0)
        .to(pricesRef.current, { autoAlpha: 0, duration: 0.2 }, 0.32)
        .to(descRef.current, { top: "50%", duration: 0.75, ease: "power3.inOut" }, 0.1) // back up, centred with Lauren
        .to(portraitRef.current, { left: "50%", top: "50%", rotation: 0, scale: 1, duration: 0.75, ease: "back.out(1.2)" }, 0.12);
    }
  };

  return (
    <div
      className={cn("bz-zone bz-zone--person", open && "is-open")}
      style={{ "--acc": zone.acc, "--acc-deep": zone.accDeep } as Vars}
      aria-label={zone.name}
    >
      <div aria-hidden className="bz-bg">
        <img src={zone.bg} alt="" loading="lazy" decoding="async" />
        <span className="bz-bg-veil" />
      </div>

      <div ref={arenaRef} className="bz-arena">
        {/* Lauren — centred, spins aside on click */}
        <button
          ref={portraitRef}
          type="button"
          className={cn("bz-portrait", open && "is-open")}
          aria-expanded={open}
          aria-controls={`bz-prices-${zone.id}`}
          onClick={toggle}
        >
          <img
            className="bz-portrait-img"
            src={person.photo}
            alt={`${person.name} — ${person.role}`}
            style={person.objectPos ? { objectPosition: person.objectPos } : undefined}
            loading="lazy"
            decoding="async"
          />
          <span aria-hidden className="bz-portrait-shade" />
          <span aria-hidden className="bz-portrait-ring" />
          <span aria-hidden className="bz-portrait-cue">
            {open ? (
              <><Sparkles className="h-3.5 w-3.5" aria-hidden /> Stall Open</>
            ) : (
              <><PartyPopper className="h-3.5 w-3.5" aria-hidden /> Tap to open</>
            )}
          </span>
          <span className="bz-portrait-meta">
            <span className="bz-portrait-name">{person.name}</span>
            <span className="bz-portrait-role">{person.role}</span>
          </span>
        </button>

        {/* bordered description — always visible; centred with Lauren, slides down on open */}
        <div ref={descRef} className="bz-desc bz-desc--float">
          <div className="bz-desc-head">
            <span aria-hidden className="bz-desc-ic"><ZoneIcon className="h-5 w-5" /></span>
            <h3 className="bz-desc-title">{zone.name}</h3>
          </div>
          <p className="bz-desc-story">{zone.story}</p>
          {open ? (
            <button type="button" className="bz-desc-back" onClick={toggle}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Close stall
            </button>
          ) : null}
        </div>

        {/* price cards — slide in from the opposite side, details fully shown */}
        <ul ref={pricesRef} id={`bz-prices-${zone.id}`} className="bz-prices" aria-label={`${person.name}'s packages`}>
          {person.packages.map((p, j) => (
            <li key={p.name} data-price className="bz-pkg-wrap" style={{ "--j": j } as Vars}>
              <div className={cn("bz-pkg", p.featured && "is-featured")}>
                {p.featured ? <span className="bz-pkg-badge">Popular</span> : null}
                <span className="bz-pkg-meta"><Clock className="h-3 w-3" aria-hidden /> {p.meta}</span>
                <span className="bz-pkg-name">{p.name}</span>
                <span className="bz-pkg-price">{p.price}</span>
                <ul className="bz-pkg-list">
                  {p.includes.map((x) => (
                    <li key={x} className="bz-pkg-item">
                      <span aria-hidden className="bz-pkg-tick"><Check className="h-3 w-3" /></span>
                      {x}
                    </li>
                  ))}
                </ul>
                <span className="bz-pkg-bestfor">Best for {p.bestFor}</span>
                <Link to="/contact" className="bz-pkg-book group">
                  <PartyPopper className="h-3.5 w-3.5" aria-hidden />
                  Book {p.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Inflatable partner stall (HW House of Bounce): same portrait-spins-aside reveal as
   the person stall, but the reveal hosts a category -> rentals -> detail browser
   that forwards the chosen inflatable to the booking form (no prices — the partner
   confirms availability and quotes directly). */
function InflatableZone({ zone, index: _index }: { zone: Zone; index: number }) {
  const inflate = zone.inflatable!;
  const ZoneIcon = zone.icon;
  const arenaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLButtonElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"categories" | "rentals" | "detail">("categories");
  const [catId, setCatId] = useState(inflate.categories[0].id);
  const [rental, setRental] = useState<Rental | null>(null);
  const animRef = useRef(false);

  const category = inflate.categories.find((c) => c.id === catId)!;
  const CatIcon = category.icon;

  useIso(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    animRef.current = !reduce && desktop;
    if (!animRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(portraitRef.current, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, rotation: 0, scale: 1 });
      gsap.set(descRef.current, { top: "50%", yPercent: -50 });
      gsap.set(revealRef.current, { autoAlpha: 0, x: 80 });
    }, arenaRef);
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) setView("categories");
    if (!animRef.current) return;
    gsap.killTweensOf([portraitRef.current, descRef.current, revealRef.current]);
    if (next) {
      const a = arenaRef.current?.getBoundingClientRect();
      const d = descRef.current?.getBoundingClientRect();
      const portLeft = a && d ? `${((d.left + d.width / 2 - a.left) / a.width) * 100}%` : "16%";
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(portraitRef.current, { left: portLeft, top: "29%", rotation: 360, scale: 0.82, duration: 0.9, ease: "back.out(1.4)" }, 0)
        .to(descRef.current, { top: "76%", duration: 0.9, ease: "power3.inOut" }, 0)
        .to(revealRef.current, { autoAlpha: 1, x: 0, duration: 0.5 }, 0.34);
    } else {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.to(revealRef.current, { autoAlpha: 0, x: 80, duration: 0.4 }, 0)
        .to(descRef.current, { top: "50%", duration: 0.75, ease: "power3.inOut" }, 0.1)
        .to(portraitRef.current, { left: "50%", top: "50%", rotation: 0, scale: 1, duration: 0.75, ease: "back.out(1.2)" }, 0.12);
    }
  };

  return (
    <div
      className={cn("bz-zone bz-zone--person bz-zone--inflate", open && "is-open")}
      style={{ "--acc": zone.acc, "--acc-deep": zone.accDeep } as Vars}
      aria-label={zone.name}
    >
      <div aria-hidden className="bz-bg">
        <img src={zone.bg} alt="" loading="lazy" decoding="async" />
        <span className="bz-bg-veil" />
      </div>

      <div ref={arenaRef} className="bz-arena">
        <button
          ref={portraitRef}
          type="button"
          className={cn("bz-portrait bz-portrait--logo", open && "is-open")}
          aria-expanded={open}
          aria-controls={`bz-inflate-${zone.id}`}
          onClick={toggle}
        >
          <img className="bz-portrait-img" src={hobLogo} alt="" loading="lazy" decoding="async" />
          <span aria-hidden className="bz-portrait-shade" />
          <span aria-hidden className="bz-portrait-ring" />
          <span aria-hidden className="bz-portrait-cue">
            {open ? (
              <><Sparkles className="h-3.5 w-3.5" aria-hidden /> Stall Open</>
            ) : (
              <><Tent className="h-3.5 w-3.5" aria-hidden /> Tap to explore</>
            )}
          </span>
          <span className="bz-portrait-meta">
            <span className="bz-portrait-role">{inflate.tag}</span>
            <span className="bz-portrait-notice">Backyard events only · No corporate events</span>
          </span>
        </button>

        <div ref={descRef} className="bz-desc bz-desc--float">
          <div className="bz-desc-head">
            <span aria-hidden className="bz-desc-ic"><ZoneIcon className="h-5 w-5" /></span>
            <h3 className="bz-desc-title">{zone.name}</h3>
          </div>
          <p className="bz-desc-story">{zone.story}</p>
          {open ? (
            <button type="button" className="bz-desc-back" onClick={toggle}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Close stall
            </button>
          ) : null}
        </div>

        <div ref={revealRef} id={`bz-inflate-${zone.id}`} className="bz-inflate" aria-label={`${inflate.partner} rentals`}>
          {view === "categories" ? (
            <div className="hob-view">
              <p className="hob-step-label"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Choose a rental category</p>
              <ul className="hob-cats">
                {inflate.categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.id} data-rise>
                      <button type="button" className="hob-cat" style={{ "--ca": c.acc, "--cad": c.accDeep } as Vars} onClick={() => { setCatId(c.id); setView("rentals"); }}>
                        <span aria-hidden className="hob-cat-thumb"><img src={c.thumb} alt="" loading="lazy" decoding="async" /><span className="hob-cat-ic"><Icon className="h-4 w-4" /></span></span>
                        <span className="hob-cat-name">{c.name}</span>
                        <span className="hob-cat-blurb">{c.blurb}</span>
                        <span className="hob-cat-count">{c.items.length} options <ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : view === "rentals" ? (
            <div className="hob-view" style={{ "--ca": category.acc, "--cad": category.accDeep } as Vars}>
              <button type="button" className="hob-back" onClick={() => setView("categories")}>
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All categories
              </button>
              <p className="hob-step-label"><CatIcon className="h-3.5 w-3.5" aria-hidden /> {category.name}</p>
              <ul className="hob-rentals">
                {category.items.map((r) => (
                  <li key={r.name} data-rise className="hob-rental">
                    <span aria-hidden className="hob-rental-thumb"><img src={r.img} alt="" loading="lazy" decoding="async" /></span>
                    <div className="hob-rental-body">
                      <h3 className="hob-rental-name">{r.name}</h3>
                      <p className="hob-rental-desc">{r.desc}</p>
                      {r.dims || r.specs || r.rate ? (
                        <ul className="hob-specs">
                          {r.dims ? <li><Ruler className="h-3 w-3" aria-hidden /> {r.dims}</li> : null}
                          {r.specs ? <li><Users className="h-3 w-3" aria-hidden /> {r.specs}</li> : null}
                          {r.rate ? <li><Tag className="h-3 w-3" aria-hidden /> {r.rate}/day <span className="hob-specs-note">· partner quotes final</span></li> : null}
                        </ul>
                      ) : null}
                      <button type="button" className="hob-select group" onClick={() => { setRental(r); setView("detail"); }}>
                        <span className="hob-select-shine" aria-hidden />
                        <Sparkles className="h-4 w-4" aria-hidden />
                        Book This Inflatable
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="hob-note">Sizes, age ranges, and availability are confirmed by {inflate.partner}.</p>
            </div>
          ) : rental ? (
            <div className="hob-view" style={{ "--ca": category.acc, "--cad": category.accDeep } as Vars}>
              <button type="button" className="hob-back" onClick={() => setView("rentals")}>
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to {category.name}
              </button>
              <div className="hob-detail" data-rise>
                <span aria-hidden className="hob-detail-thumb"><img src={rental.img} alt={rental.name} loading="lazy" decoding="async" /></span>
                <div className="hob-detail-body">
                  <span className="hob-detail-cat">{category.name}</span>
                  <h3 className="hob-detail-name">{rental.name}</h3>
                  <p className="hob-detail-desc">{rental.desc}</p>
                  {rental.dims || rental.specs || rental.rate ? (
                    <ul className="hob-specs">
                      {rental.dims ? <li><Ruler className="h-3 w-3" aria-hidden /> {rental.dims}</li> : null}
                      {rental.specs ? <li><Users className="h-3 w-3" aria-hidden /> {rental.specs}</li> : null}
                      {rental.rate ? <li><Tag className="h-3 w-3" aria-hidden /> {rental.rate}/day <span className="hob-specs-note">· partner quotes final</span></li> : null}
                    </ul>
                  ) : null}
                </div>
              </div>
              <div className="hob-handoff" data-rise>
                <p className="hob-handoff-title"><Sparkles className="h-4 w-4" aria-hidden /> Interested in this inflatable?</p>
                <p className="hob-handoff-copy">
                  Select your preferred inflatable and we&apos;ll forward your request to our trusted
                  partner, {inflate.partner}. They&apos;ll confirm availability and provide you with a
                  quote directly for the inflatable rental — while we coordinate your entertainment
                  booking.
                </p>
                <div className="hob-handoff-actions">
                  <Link to="/contact" search={{ inflatable: rental.name }} className="hob-request group">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Request This Inflatable
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                  <a href="https://hwhouseofbounce.ca" target="_blank" rel="noopener noreferrer nofollow" className="hob-partner-link">
                    Visit {inflate.partner} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
