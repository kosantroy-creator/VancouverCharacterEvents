import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Quote, Shell, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { OceanDecor } from "./OceanDecor";

/**
 * MermaidTestimonials — "What the Cove Crew Says": the social-proof section
 * between the Cove Experience journey and the cove packages. A wide pearl
 * spotlight review above a trio of supporting review cards on the same aqua
 * cove stage — gold five-star ratings, a soft shell quote glyph, pearl-shell
 * initial avatars, a foam wave-top, caustics, ocean decor and drifting bubbles
 * matching its neighbours, closed by a script sign-off. Brand-safe archetype
 * language only (generic mermaid / pirate; no franchise names / likenesses);
 * reviews are representative placeholders, swap-ready. VISIBLE BY DEFAULT
 * (hidden only under `.mts.anim:not(.is-in)`), reduced-motion safe. See "MERMAID
 * COVE TESTIMONIALS" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const SPOTLIGHT = {
  quote:
    "The mermaid swam right up to the kids and our daughter's face lit up like I've never seen. The pirate kept every child laughing between the swim moments, and the whole flow was so smooth — it was the most magical birthday we've ever thrown.",
  name: "Jessica & Tom",
  role: "Mermaid Cove Party · Coquitlam",
  initials: "JT",
};

const CARDS = [
  {
    quote:
      "From the welcome to the treasure games, every moment was organized and full of wonder. The mermaid was kind, graceful, and so good with the little ones.",
    name: "Megan L.",
    role: "Backyard Pool Party · Langley",
    initials: "ML",
  },
  {
    quote:
      "Worth every minute. The pirate had the whole crew giggling and the swim ride was the highlight of the summer. The photos came out gorgeous.",
    name: "Priya S.",
    role: "Community Pool Event · Richmond",
    initials: "PS",
  },
  {
    quote:
      "Professional, punctual, and absolutely enchanting. Our guests are still talking about the singing and the birthday crowning moment.",
    name: "The Harnett Family",
    role: "Birthday at Home · North Vancouver",
    initials: "HF",
  },
] as const;

const BUBBLES = [
  { left: "10%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "30%", s: 6, delay: "3.5s", dur: "20s", dx: "-9px" },
  { left: "52%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "70%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "87%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

function Rating({ className }: { className?: string }) {
  return (
    <span className={cn("mts-stars", className)} role="img" aria-label="Rated five out of five stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <Star key={n} className="h-3.5 w-3.5" fill="currentColor" aria-hidden />
      ))}
    </span>
  );
}

export function MermaidTestimonials() {
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
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mts-title"
      className={cn("mts relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* foam wave tucking under the Cove Experience above */}
      <div aria-hidden className="mts-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,42 C250,86 520,6 760,32 C1010,58 1230,92 1440,50 L1440,0 L0,0 Z"
            fill="#9CD9E6"
          />
        </svg>
      </div>

      <div aria-hidden className="mts-bg absolute inset-0" />
      <div aria-hidden className="mts-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mts-surface pointer-events-none absolute inset-x-0 top-0" />
      <OceanDecor variant="a" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mts-bubble"
            style={
              {
                left: b.left,
                width: b.s,
                height: b.s,
                animationDelay: b.delay,
                animationDuration: b.dur,
                "--dx": b.dx,
              } as Vars
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mts-head mx-auto max-w-2xl text-center">
          <span aria-hidden className="mts-crown">
            <Shell className="h-5 w-5" />
          </span>
          <span className="mts-eyebrow">
            <span aria-hidden className="mts-eyebrow-rule" />
            Cove Reviews
            <span aria-hidden className="mts-eyebrow-rule" />
          </span>
          <h2 id="mts-title" className="mts-title">
            What the Cove Crew Says
          </h2>
          <p className="mts-sub">
            Real words from the families behind our favourite poolside birthdays — the swim moments,
            the laughter, and the magic they remember most.
          </p>
        </div>

        {/* spotlight review */}
        <figure className="mts-spotlight mt-12 md:mt-14">
          <span aria-hidden className="mts-crest">
            <Shell className="h-5 w-5" />
          </span>
          <Quote aria-hidden className="mts-spotlight-mark" />
          <Rating className="mts-spotlight-stars" />
          <blockquote className="mts-spotlight-quote">{SPOTLIGHT.quote}</blockquote>
          <figcaption className="mts-author mts-author--center">
            <span aria-hidden className="mts-avatar">
              {SPOTLIGHT.initials}
            </span>
            <span className="mts-author-meta">
              <span className="mts-name">{SPOTLIGHT.name}</span>
              <span className="mts-role">{SPOTLIGHT.role}</span>
            </span>
          </figcaption>
        </figure>

        {/* supporting reviews */}
        <div className="mts-grid mt-5 md:mt-6">
          {CARDS.map((c, i) => (
            <figure key={c.name} className="mts-card" style={{ "--i": i } as Vars}>
              <Quote aria-hidden className="mts-card-mark" />
              <Rating />
              <blockquote className="mts-text">{c.quote}</blockquote>
              <span aria-hidden className="mts-rule" />
              <figcaption className="mts-author">
                <span aria-hidden className="mts-avatar">
                  {c.initials}
                </span>
                <span className="mts-author-meta">
                  <span className="mts-name">{c.name}</span>
                  <span className="mts-role">{c.role}</span>
                </span>
              </figcaption>
              <Shell aria-hidden className="mts-card-shell" />
            </figure>
          ))}
        </div>

        {/* script sign-off */}
        <div className="mts-foot" aria-hidden>
          <Shell className="mts-foot-shell h-4 w-4" />
          <p className="mts-foot-script">Happy crews. Magical memories.</p>
        </div>
      </div>
    </section>
  );
}
