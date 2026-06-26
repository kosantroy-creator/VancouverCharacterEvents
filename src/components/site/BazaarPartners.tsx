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
import { ArrowRight, Camera, Check, Clock, Palette, PartyPopper, RotateCcw, Sparkles, Tent } from "lucide-react";
import { cn } from "@/lib/utils";
import laurenPhoto from "@/assets/bazaar/lauren.webp";
import stallFace from "@/assets/bazaar/stalls/stall-face-painting.webp";
import stallBalloon from "@/assets/bazaar/stalls/stall-balloon.webp";
import stallPhoto from "@/assets/bazaar/stalls/stall-photography.webp";
import stallInflatable from "@/assets/bazaar/stalls/stall-inflatable.webp";

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
type Zone = {
  id: string;
  name: string;
  icon: IconType;
  bg: string;
  acc: string;
  accDeep: string;
  story: string;
  person?: Person;
  note?: string;
  cta?: string;
};

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
    note: "We're curating face painting partners for the Bazaar. Tell us your event type and date, and we'll match the right artist and confirm availability.",
    cta: "Request Face Painting",
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
      "Inflatable add-ons may be available through trusted partner vendors for larger parties, schools, festivals, and community events.",
    note: "Inflatables are arranged through trusted partner vendors — availability varies by date, location, and event. Tell us your event and we'll help connect the right setup.",
    cta: "Request Inflatable Partners",
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
        z.person ? <PersonZone key={z.id} zone={z} index={i} /> : <PlaceholderZone key={z.id} zone={z} index={i} />,
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
