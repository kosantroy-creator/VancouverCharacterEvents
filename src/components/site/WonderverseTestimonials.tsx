import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Moon, Quote, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WonderverseTestimonials — "Loved Across the Wonderverse": the moonlit praise
 * section between the gallery and the FAQ. A wide spotlight testimonial sits
 * above a trio of supporting quote cards on the same deep-purple celestial
 * stage — gold five-star ratings, a faint constellation quote glyph, crescent
 * crests, moon-disc initial avatars, a star-field with soft glows and ivory
 * seams matching its neighbours, closed by a "Loved by families" trust line.
 * Brand-safe archetype language only (no franchise names / likenesses); quotes
 * are representative placeholders, swap-ready. VISIBLE BY DEFAULT (hidden only
 * under `.wvs.anim` before `.is-in`), reduced-motion safe. See "WONDERVERSE
 * REALM TESTIMONIALS" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const SPOTLIGHT = {
  quote:
    "From the first knock at the door to the last wave goodbye, every detail felt enchanted. The character stayed perfectly in role, the children were spellbound, and the photos look like something out of a storybook. Easily the most magical part of the whole celebration.",
  name: "Priya & Marcus",
  role: "Signature Wonderverse Experience · Burnaby",
  initials: "PM",
};

const CARDS = [
  {
    quote:
      "Our daughter still talks about the glowing wand and the wishes they made together. The fairy was warm, gentle, and absolutely magical with the little ones.",
    name: "Amrita K.",
    role: "Fairy Magic Visit · Vancouver",
    initials: "AK",
  },
  {
    quote:
      "The galaxy adventurer kept a room full of seven-year-olds spellbound for a full hour. Every child wanted a photo. We could not have asked for more.",
    name: "Daniel R.",
    role: "Galaxy Adventure · Surrey",
    initials: "DR",
  },
  {
    quote:
      "We needed something different for our school event, and the custom persona they created was polished, professional, and completely unforgettable.",
    name: "Coast Mountain Elementary",
    role: "Custom Realm Booking · North Vancouver",
    initials: "CM",
  },
] as const;

const STARS = [
  { left: "9%", top: "22%", s: 3, delay: "0s", dur: "5s" },
  { left: "20%", top: "74%", s: 2, delay: "1.5s", dur: "6s" },
  { left: "36%", top: "12%", s: 3, delay: "0.7s", dur: "5.4s" },
  { left: "54%", top: "82%", s: 2, delay: "2.2s", dur: "6.4s" },
  { left: "67%", top: "16%", s: 3, delay: "1s", dur: "5s" },
  { left: "81%", top: "76%", s: 2, delay: "2.7s", dur: "6.1s" },
  { left: "91%", top: "30%", s: 3, delay: "0.4s", dur: "5.7s" },
  { left: "96%", top: "60%", s: 2, delay: "1.9s", dur: "6.3s" },
] as const;

function Rating({ className }: { className?: string }) {
  return (
    <span className={cn("wvs-stars", className)} role="img" aria-label="Rated five out of five stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <Star key={n} className="h-3.5 w-3.5" fill="currentColor" aria-hidden />
      ))}
    </span>
  );
}

export function WonderverseTestimonials() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

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
      aria-labelledby="wvs-title"
      className={cn("wvs relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvs-bg absolute inset-0" />
      <div aria-hidden className="wvs-stars-field pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvs-star-dot"
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
      <span aria-hidden className="wvs-glow wvs-glow-l" />
      <span aria-hidden className="wvs-glow wvs-glow-r" />
      <div aria-hidden className="wvs-mist pointer-events-none absolute inset-x-0 bottom-0" />
      <div aria-hidden className="wvs-seam-top pointer-events-none absolute inset-x-0 top-0" />
      <div aria-hidden className="wvs-seam-bottom pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvs-head mx-auto max-w-2xl text-center">
          <span className="wvs-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Moonlit Praise
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvs-title" className="wvs-title">
            Loved Across the Wonderverse
          </h2>
          <span aria-hidden className="wvs-divider">
            <span className="wvs-divider-rule" />
            <Moon className="h-3.5 w-3.5" />
            <span className="wvs-divider-rule" />
          </span>
          <p className="wvs-sub">
            From fairy visits to galaxy adventures and custom realm bookings, here&apos;s what
            families across Metro Vancouver remember most about their rarest moments.
          </p>
        </div>

        {/* spotlight testimonial */}
        <figure className="wvs-spotlight mt-12 md:mt-14">
          <span aria-hidden className="wvs-crest">
            <Moon className="h-4 w-4" />
          </span>
          <Quote aria-hidden className="wvs-spotlight-mark" />
          <Rating className="wvs-spotlight-stars" />
          <blockquote className="wvs-spotlight-quote">{SPOTLIGHT.quote}</blockquote>
          <figcaption className="wvs-author wvs-author--center">
            <span aria-hidden className="wvs-avatar">
              {SPOTLIGHT.initials}
            </span>
            <span className="wvs-author-meta">
              <span className="wvs-name">{SPOTLIGHT.name}</span>
              <span className="wvs-role">{SPOTLIGHT.role}</span>
            </span>
          </figcaption>
        </figure>

        {/* supporting cards */}
        <div className="wvs-grid mt-5 md:mt-6">
          {CARDS.map((c, i) => (
            <figure key={c.name} className="wvs-card" style={{ "--i": i } as Vars}>
              <Quote aria-hidden className="wvs-card-mark" />
              <Rating />
              <blockquote className="wvs-text">{c.quote}</blockquote>
              <span aria-hidden className="wvs-rule" />
              <figcaption className="wvs-author">
                <span aria-hidden className="wvs-avatar">
                  {c.initials}
                </span>
                <span className="wvs-author-meta">
                  <span className="wvs-name">{c.name}</span>
                  <span className="wvs-role">{c.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* trust line */}
        <div className="wvs-foot mt-12 text-center">
          <Rating className="wvs-foot-stars" />
          <p className="wvs-foot-line">
            <Moon className="mr-1.5 inline h-4 w-4 align-[-3px] text-[#F4D38C]" aria-hidden />
            Loved by families across Metro Vancouver
          </p>
          <p className="wvs-foot-script">Rare characters. Reviews that sparkle.</p>
        </div>
      </div>
    </section>
  );
}
