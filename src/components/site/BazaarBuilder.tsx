import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Check,
  Palette,
  PartyPopper,
  Plus,
  Sparkles,
  Store,
  Tent,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import stallFace from "@/assets/bazaar/stalls/stall-face-painting.webp";
import stallBalloon from "@/assets/bazaar/stalls/stall-balloon.webp";
import stallPhoto from "@/assets/bazaar/stalls/stall-photography.webp";
import stallInflatable from "@/assets/bazaar/stalls/stall-inflatable.webp";

/**
 * BazaarBuilder — "Build Your Bazaar Mix": the interactive add-on selector. Because
 * face painting, balloon twisting, photography, and inflatable partner add-ons each
 * price on different variables, this replaces a pricing table with a magical market
 * tray — pick the add-on "tokens" you want and they drop into a glowing Your Bazaar
 * Mix request slip that explains a custom quote is built from your event details +
 * partner availability. Cream parchment base + jewel-tone accents (teal · magenta ·
 * indigo · gold), amber lantern glow. Request/quote language only (no cart wording).
 * Accessible toggle buttons (aria-pressed), live mix status, partner language for
 * inflatables, no invented prices. VISIBLE BY DEFAULT (hidden only under
 * `.bzb.anim:not(.is-in)`), reduced-motion safe. See "ENCHANTED BAZAAR BUILDER".
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Service = {
  id: string;
  title: string;
  icon: IconType;
  img: string;
  acc: string;
  accDeep: string;
  copy: string;
  factors: string[];
  addLabel: string;
};

const SERVICES: Service[] = [
  {
    id: "face",
    title: "Face Painting",
    icon: Palette,
    img: stallFace,
    acc: "#1E8A9E",
    accDeep: "#156B7A",
    copy: "Colourful, photo-friendly designs that add personality, sparkle, and excitement to the event.",
    factors: ["Guest count", "Event length", "Simple vs detailed designs", "Indoor / outdoor setup", "Private vs public event"],
    addLabel: "Add Face Painting",
  },
  {
    id: "balloon",
    title: "Balloon Twisting",
    icon: PartyPopper,
    img: stallBalloon,
    acc: "#B83D7A",
    accDeep: "#8E2D5E",
    copy: "Playful balloon creations that keep guests smiling and give children something fun to take home.",
    factors: ["Event length", "Number of guests", "Simple vs complex balloons", "Line / guest flow needs", "Public vs private event"],
    addLabel: "Add Balloon Twisting",
  },
  {
    id: "photo",
    title: "Photography",
    icon: Camera,
    img: stallPhoto,
    acc: "#3E6EA8",
    accDeep: "#2C5282",
    copy: "Photo support for greetings, reactions, group shots, event details, and moments hosts often miss.",
    factors: ["Coverage time", "Event type", "Photo moments needed", "Edited gallery needs", "Location / travel"],
    addLabel: "Add Photography",
  },
  {
    id: "inflatable",
    title: "Inflatable Partners",
    icon: Tent,
    img: stallInflatable,
    acc: "#C28A2E",
    accDeep: "#9A6E2B",
    copy: "Inflatable add-ons may be available through trusted partner vendors for larger parties, schools, festivals, and community events.",
    factors: ["Inflatable type", "Rental duration", "Delivery / setup location", "Space & surface requirements", "Partner availability"],
    addLabel: "Ask About Inflatables",
  },
];

const MIX_FACTORS = [
  "Event date and city",
  "Guest count and age range",
  "Event length",
  "Indoor / outdoor setup",
  "Selected add-ons",
  "Partner availability",
];

const MIXES: { title: string; icon: IconType; includes: string; bestFor: string; acc: string; accDeep: string }[] = [
  { title: "Birthday Colour Boost", icon: PartyPopper, includes: "Face Painting + Balloon Twisting", bestFor: "Birthdays and family parties", acc: "#B83D7A", accDeep: "#8E2D5E" },
  { title: "Memory Maker", icon: Camera, includes: "Photography + One Activity Add-On", bestFor: "Events where photos matter", acc: "#3E6EA8", accDeep: "#2C5282" },
  { title: "Festival Flow", icon: Store, includes: "Face Painting + Balloon Twisting + Partner Add-On Inquiry", bestFor: "Schools, festivals, and community events", acc: "#1E8A9E", accDeep: "#156B7A" },
  { title: "Full Bazaar Experience", icon: Sparkles, includes: "Custom mix based on event size", bestFor: "Larger or multi-hour events", acc: "#C28A2E", accDeep: "#9A6E2B" },
];

export function BazaarBuilder() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const remove = (id: string) => setSelected((s) => s.filter((x) => x !== id));
  const byId = (id: string) => SERVICES.find((s) => s.id === id)!;
  const count = selected.length;

  return (
    <section
      ref={ref}
      id="bazaar-builder"
      aria-labelledby="bzb-title"
      className={cn("bzb relative isolate overflow-hidden scroll-mt-20", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="bzb-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bzb-glow" />
        <span className="bzb-stalls bzb-stalls-l" />
        <span className="bzb-stalls bzb-stalls-r" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bzb-head mx-auto max-w-3xl text-center">
          <span className="bzb-sign">
            <Sparkles className="h-3 w-3" aria-hidden />
            Magical Extras. Meaningful Memories.
          </span>
          <span className="bzb-eyebrow">
            <span aria-hidden className="bzb-eyebrow-fl" />
            Build Your Bazaar Mix
            <span aria-hidden className="bzb-eyebrow-fl bzb-eyebrow-fl--r" />
          </span>
          <h2 id="bzb-title" className="bzb-title">
            Choose the <span className="bzb-title-a">extras</span> that fit your event.
          </h2>
          <p className="bzb-sub">
            Face painting, balloon twisting, photography, and inflatable partner add-ons all work a
            little differently, so Bazaar pricing is built around the services you choose and the
            details of your event.
          </p>
          <p className="bzb-help">
            Select the add-ons you are interested in, then send us your event details so we can
            recommend the best mix and prepare a custom quote.
          </p>
        </div>

        {/* main — selector + mix slip */}
        <div className="bzb-main">
          <div className="bzb-left">
            <ul className="bzb-services">
              {SERVICES.map(({ id, title, icon: Icon, img, acc, accDeep, copy, factors, addLabel }, i) => {
                const on = selected.includes(id);
                return (
                  <li
                    key={id}
                    className={cn("bzb-card", on && "is-on")}
                    style={{ "--ca": acc, "--cad": accDeep, "--i": i } as Vars}
                  >
                    <span aria-hidden className="bzb-card-img" style={{ backgroundImage: `url(${img})` }}>
                      <span className="bzb-card-shade" />
                      {on ? <span className="bzb-card-stamp">Added to Mix</span> : null}
                    </span>
                    <span aria-hidden className="bzb-card-medal"><Icon className="h-5 w-5" /></span>
                    <div className="bzb-card-body">
                      <h3 className="bzb-card-title">{title}</h3>
                      <p className="bzb-card-copy">{copy}</p>
                      <p className="bzb-card-fh">Quote depends on:</p>
                      <ul className="bzb-card-factors">
                        {factors.map((f) => (
                          <li key={f} className="bzb-card-factor">
                            <span aria-hidden className="bzb-card-tick"><Check className="h-2.5 w-2.5" /></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className={cn("bzb-card-add", on && "is-on")}
                      aria-pressed={on}
                      onClick={() => toggle(id)}
                    >
                      {on ? (
                        <><Check className="h-4 w-4" aria-hidden /> Added to Mix</>
                      ) : (
                        <><Plus className="h-4 w-4" aria-hidden /> {addLabel}</>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="bzb-inflatable-note">
              Inflatable partner add-ons may be available through trusted vendors depending on date,
              location, and event needs.
            </p>
          </div>

          {/* Your Bazaar Mix — request slip */}
          <aside className="bzb-mix" aria-label="Your Bazaar Mix">
            <div className="bzb-mix-panel">
              <h3 className="bzb-mix-title">
                <Sparkles className="h-4 w-4" aria-hidden />
                Your Bazaar Mix
              </h3>
              <p className="bzb-mix-count" aria-live="polite">
                {count === 0 ? "No add-ons selected yet" : `${count} add-on${count === 1 ? "" : "s"} selected`}
              </p>

              {count > 0 ? (
                <ul className="bzb-chips">
                  {selected.map((id) => {
                    const s = byId(id);
                    const Icon = s.icon;
                    return (
                      <li key={id} className="bzb-chip" style={{ "--ca": s.acc, "--cad": s.accDeep } as Vars}>
                        <span aria-hidden className="bzb-chip-ic"><Icon className="h-3.5 w-3.5" /></span>
                        <span className="bzb-chip-label">{s.title}</span>
                        <button type="button" className="bzb-chip-x" onClick={() => remove(id)} aria-label={`Remove ${s.title} from your mix`}>
                          <X className="h-3 w-3" aria-hidden />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              <p className={cn("bzb-mix-msg", count > 0 ? "is-full" : "is-empty")}>
                {count > 0
                  ? "Great choice. We'll quote your Bazaar Mix based on your event details and partner availability."
                  : "Choose one or more Bazaar add-ons to start building your event enhancement plan."}
              </p>

              <p className="bzb-mix-fh">Your quote may depend on:</p>
              <ul className="bzb-mix-factors">
                {MIX_FACTORS.map((f) => (
                  <li key={f} className="bzb-mix-factor">
                    <span aria-hidden className="bzb-mix-dot" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="bzb-mix-cta group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Request My Bazaar Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link to="/contact" className="bzb-mix-help">
                <Wand2 className="h-3.5 w-3.5" aria-hidden />
                Not Sure? Help Me Choose
              </Link>
              <p className="bzb-mix-note">
                Partner-based services are subject to availability and may vary by date, location,
                setup needs, and event type.
              </p>
            </div>
          </aside>
        </div>

        {/* Popular Bazaar Mixes — suggestions, not fixed packages */}
        <div className="bzb-popular">
          <p className="bzb-popular-title">
            <span aria-hidden className="bzb-popular-fl" />
            Popular Bazaar Mixes
            <span aria-hidden className="bzb-popular-fl bzb-popular-fl--r" />
          </p>
          <ul className="bzb-mixes">
            {MIXES.map(({ title, icon: Icon, includes, bestFor, acc, accDeep }, i) => (
              <li key={title} className="bzb-mixcard" style={{ "--ca": acc, "--cad": accDeep, "--i": i } as Vars}>
                <span aria-hidden className="bzb-mixcard-medal"><Icon className="h-5 w-5" /></span>
                <h4 className="bzb-mixcard-title">{title}</h4>
                <p className="bzb-mixcard-inc">{includes}</p>
                <p className="bzb-mixcard-best">Best for {bestFor.toLowerCase()}</p>
                <span className="bzb-mixcard-quote">Custom Quote</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
