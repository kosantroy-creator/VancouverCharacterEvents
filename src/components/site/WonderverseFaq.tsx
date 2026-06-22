import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Minus, Moon, Plus, Sparkles, Star, Users, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WonderverseFaq — "Wonderverse Details": the moonlit planning guide that closes
 * booking questions before the final CTA. A celestial Field-Guide spread — a
 * sticky deep-purple "Wonderverse Guide" card on the left and a premium accordion
 * of theatre-program rows on the right; each row is a keyboard-operable <button>
 * with aria-expanded / aria-controls, answers open with a smooth grid-rows height
 * + fade and a gold shimmer along the open row's top edge. A "Send an Inquiry"
 * helper bar sits beneath. Brand-safe archetype language only (no franchise names
 * / likenesses). VISIBLE BY DEFAULT (hidden only under `.wvf.anim` before
 * `.is-in`), reduced-motion safe. See "WONDERVERSE REALM FAQ" in styles.css.
 */
type IconType = ComponentType<{ className?: string }>;

const CHECKLIST: { icon: IconType; label: string }[] = [
  { icon: Star, label: "Solo visits available" },
  { icon: Moon, label: "Signature duos available" },
  { icon: Users, label: "Custom cast options" },
  { icon: Wand2, label: "Special requests welcome" },
  { icon: Clock, label: "Availability varies by character" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What kind of characters belong in Wonderverse?",
    a: "Wonderverse is for rare, specialty, tribute-style, fantasy, galaxy, fairy, spellcaster, villain, pop-performance, and custom persona characters that do not naturally fit into our other realms.",
  },
  {
    q: "Can I book just one Wonderverse character?",
    a: "Sometimes, yes. Some Wonderverse characters are available as solo visits, while others work best or are only offered as a duo or themed pairing. We'll recommend the right format based on the character style and your event.",
  },
  {
    q: "Why are some characters recommended as duos?",
    a: "Some character concepts create a better guest experience when they appear together. A duo can create stronger reactions, more interaction, better photo moments, and a more complete story or performance.",
  },
  {
    q: "Can I request a specific rare character?",
    a: "Yes. You can tell us the character style or specific type of guest you are hoping for. Availability depends on performer scheduling, costume readiness, event location, and whether the concept is offered solo, as a duo, or as a custom booking.",
  },
  {
    q: "Can you create a custom character or persona?",
    a: "Yes. Custom personas may be available for unique themes, corporate events, brand activations, or one-of-a-kind requests. Custom concepts may require extra planning time, design work, or a custom quote.",
  },
  {
    q: "Are tribute-style performers available?",
    a: "Yes, some Wonderverse experiences can be tribute-inspired or performance-style. We avoid using copyrighted names, logos, or protected branding in our public materials, and we can help describe the experience in a brand-safe way.",
  },
  {
    q: "Is pricing the same for every Wonderverse character?",
    a: "No. Pricing can vary based on the character format, whether it is solo or duo, performance needs, travel, event length, preparation time, and whether the request is custom. We'll recommend the right option after reviewing your inquiry.",
  },
  {
    q: "What ages is Wonderverse best for?",
    a: "Wonderverse can work for a wide age range depending on the character style. Fairy and spellcaster visits may suit younger guests, while galaxy adventures, villains, and pop-performance options may work better for older kids, tweens, teens, or themed events.",
  },
  {
    q: "How much notice do custom requests need?",
    a: "The more unique the request, the more notice is helpful. Standard Wonderverse visits may depend mostly on availability, while custom personas, special themes, or larger cast experiences may need additional planning time.",
  },
  {
    q: "What happens after I send a request?",
    a: "We'll review your date, location, guest count, event type, preferred character style, and whether the concept works best as a solo visit, duo, or custom cast experience. Then we'll follow up with availability and recommended next steps.",
  },
];

const STARS = [
  { left: "8%", top: "20%", s: 3, delay: "0s", dur: "5s" },
  { left: "21%", top: "72%", s: 2, delay: "1.5s", dur: "6s" },
  { left: "37%", top: "10%", s: 3, delay: "0.7s", dur: "5.4s" },
  { left: "55%", top: "84%", s: 2, delay: "2.2s", dur: "6.4s" },
  { left: "68%", top: "14%", s: 3, delay: "1s", dur: "5s" },
  { left: "82%", top: "76%", s: 2, delay: "2.7s", dur: "6.1s" },
  { left: "92%", top: "30%", s: 3, delay: "0.4s", dur: "5.7s" },
  { left: "96%", top: "62%", s: 2, delay: "1.9s", dur: "6.3s" },
] as const;

export function WonderverseFaq() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  // One row open at a time; the first opens by default to show the open state.
  const [open, setOpen] = useState<number | null>(0);

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
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="wvf-title"
      className={cn("wvf relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvf-bg absolute inset-0" />
      <div aria-hidden className="wvf-stars pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvf-star-dot"
            style={{
              left: s.left,
              top: s.top,
              width: s.s,
              height: s.s,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          />
        ))}
      </div>
      <span aria-hidden className="wvf-glow wvf-glow-l" />
      <span aria-hidden className="wvf-glow wvf-glow-r" />
      <div aria-hidden className="wvf-seam-top pointer-events-none absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="wvf-seam-bottom pointer-events-none absolute inset-x-0 bottom-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvf-head mx-auto max-w-2xl text-center">
          <span className="wvf-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Wonderverse Details
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvf-title" className="wvf-title">
            Before You Summon the Wonderverse
          </h2>
          <p className="wvf-sub">
            Helpful notes about rare characters, recommended duos, custom requests, availability,
            and how we match the right experience to your event.
          </p>
          <span aria-hidden className="wvf-divider">
            <span className="wvf-divider-rule" />
            <Moon className="h-3.5 w-3.5" />
            <span className="wvf-divider-rule" />
          </span>
        </div>

        {/* the field-guide spread */}
        <div className="wvf-grid mt-12 md:mt-14">
          {/* left — sticky guide card */}
          <div className="wvf-aside">
            <div className="wvf-card">
              <span aria-hidden className="wvf-card-corner wvf-card-corner--tl" />
              <span aria-hidden className="wvf-card-corner wvf-card-corner--tr" />
              <span aria-hidden className="wvf-card-corner wvf-card-corner--bl" />
              <span aria-hidden className="wvf-card-corner wvf-card-corner--br" />

              <span aria-hidden className="wvf-card-moon">
                <Moon className="h-5 w-5" />
              </span>
              <span className="wvf-badge">Wonderverse Guide</span>
              <h3 className="wvf-card-h">Rare characters need the right format.</h3>
              <p className="wvf-card-p">
                Some Wonderverse characters shine as solo visits, while others work best as
                signature duos, themed pairings, or custom cast experiences. Tell us what
                you&apos;re imagining, and we&apos;ll help recommend the right booking format.
              </p>

              <ul className="wvf-checks">
                {CHECKLIST.map(({ icon: Icon, label }) => (
                  <li key={label} className="wvf-check">
                    <span aria-hidden className="wvf-check-ic">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <p className="wvf-card-note">
                Some character concepts are only available as a pair or recommended as a duo for the
                best guest experience.
              </p>
            </div>
          </div>

          {/* right — FAQ accordion */}
          <ul className="wvf-list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className={cn("wvf-item", isOpen && "is-open")}
                  style={{ ["--i" as string]: i }}
                >
                  <button
                    type="button"
                    className="wvf-q"
                    aria-expanded={isOpen}
                    aria-controls={`wvf-a-${i}`}
                    id={`wvf-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span aria-hidden className="wvf-num">
                      {i + 1}
                    </span>
                    <span className="wvf-q-text">{f.q}</span>
                    <span aria-hidden className="wvf-toggle">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    id={`wvf-a-${i}`}
                    role="region"
                    aria-labelledby={`wvf-q-${i}`}
                    className="wvf-a"
                  >
                    <div className="wvf-a-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* helper bar */}
        <div className="wvf-help mt-10 md:mt-12">
          <span aria-hidden className="wvf-help-moon">
            <Moon className="h-6 w-6" />
          </span>
          <div className="wvf-help-text">
            <h3 className="wvf-help-title">Still have questions? We&apos;re happy to help.</h3>
            <p className="wvf-help-copy">
              Every Wonderverse booking is shaped around your event, character style, and the moment
              you want to create.
            </p>
          </div>
          <Link to="/contact" className="wvf-help-cta group">
            <span aria-hidden className="wvf-cta-gloss" />
            Send an Inquiry
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
