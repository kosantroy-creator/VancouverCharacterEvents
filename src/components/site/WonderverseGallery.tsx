import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Moon, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import arrivalImg from "@/assets/specialty/gallery/arrival.webp";
import fairyImg from "@/assets/specialty/gallery/fairy.webp";
import galaxyImg from "@/assets/specialty/gallery/galaxy.webp";
import popImg from "@/assets/specialty/gallery/pop.webp";
import mischiefImg from "@/assets/specialty/gallery/mischief.webp";

/**
 * WonderverseGallery — "Real Wonderverse Moments": the moonlit memory-archive
 * proof section after the pricing. A deep-purple celestial theatre gallery — one
 * large featured memory frame on the left and a 2×2 of supporting moments on the
 * right, each in an ornate gold/lavender theatre-frame card with a crescent crest,
 * a velvet caption ticket, and a faint constellation that surfaces on hover. A
 * "Real Moments" stamp, a star-field, soft mist and a "See More Rare Moments" CTA.
 * Brand-safe archetype labels only (no franchise names / likenesses); photos are
 * original generated placeholders, swap-ready. VISIBLE BY DEFAULT (hidden only
 * under `.wvg.anim` before `.is-in`), reduced-motion safe. See "WONDERVERSE REALM
 * GALLERY" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const FEATURED = {
  img: arrivalImg,
  label: "Rare Character Arrival",
  alt: "A child in a sparkling lavender gown walking toward a glowing violet archway, flanked by two caped guardian performers with glowing staffs.",
};

const TILES = [
  {
    key: "fairy",
    img: fairyImg,
    label: "Fairy Magic",
    alt: "A winged fairy performer sharing a glowing ball of light with a delighted young girl in a fairy-lit garden.",
  },
  {
    key: "galaxy",
    img: galaxyImg,
    label: "Galaxy Adventure",
    alt: "A cosmic space-adventurer performer in a glowing purple suit high-fiving a happy young boy against a starry nebula backdrop.",
  },
  {
    key: "pop",
    img: popImg,
    label: "Pop Performance",
    alt: "A sparkling pop-star performer singing into a microphone on stage as a crowd of happy children wave glow sticks.",
  },
  {
    key: "mischief",
    img: mischiefImg,
    label: "Storybook Mischief",
    alt: "A playful theatrical sorceress performer in a purple-and-gold gown laughing with a delighted child at a party.",
  },
] as const;

const STARS = [
  { left: "7%", top: "18%", s: 3, delay: "0s", dur: "5s" },
  { left: "19%", top: "70%", s: 2, delay: "1.5s", dur: "6s" },
  { left: "34%", top: "10%", s: 3, delay: "0.7s", dur: "5.4s" },
  { left: "52%", top: "86%", s: 2, delay: "2.2s", dur: "6.4s" },
  { left: "66%", top: "14%", s: 3, delay: "1s", dur: "5s" },
  { left: "80%", top: "78%", s: 2, delay: "2.7s", dur: "6.1s" },
  { left: "90%", top: "32%", s: 3, delay: "0.4s", dur: "5.7s" },
  { left: "95%", top: "64%", s: 2, delay: "1.9s", dur: "6.3s" },
] as const;

function MomentCard({
  img,
  label,
  alt,
  featured,
  i,
}: {
  img: string;
  label: string;
  alt: string;
  featured?: boolean;
  i: number;
}) {
  return (
    <article
      className={cn("wvg-card", featured ? "wvg-card--featured" : "wvg-card--tile")}
      style={{ "--i": i } as Vars}
    >
      <span aria-hidden className="wvg-crest">
        <Moon className="h-3.5 w-3.5" />
      </span>
      <div className="wvg-frame">
        <img className="wvg-img" src={img} alt={alt} loading="lazy" decoding="async" />
        <span aria-hidden className="wvg-constellation" />
        <span aria-hidden className="wvg-shade" />
        <span className="wvg-cap">
          <Moon className="h-3 w-3" aria-hidden />
          {label}
        </span>
      </div>
    </article>
  );
}

export function WonderverseGallery() {
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
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="wvg-title"
      className={cn("wvg relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvg-bg absolute inset-0" />
      <div aria-hidden className="wvg-stars pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvg-star-dot"
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
      <span aria-hidden className="wvg-glow wvg-glow-l" />
      <span aria-hidden className="wvg-glow wvg-glow-r" />
      <div aria-hidden className="wvg-mist pointer-events-none absolute inset-x-0 bottom-0" />
      <div aria-hidden className="wvg-seam-top pointer-events-none absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="wvg-seam-bottom pointer-events-none absolute inset-x-0 bottom-0"
      />

      <span aria-hidden className="wvg-stamp">
        <span className="wvg-stamp-ring" />
        <Moon className="wvg-stamp-moon h-4 w-4" />
        <span className="wvg-stamp-text">
          Real
          <br />
          Moments
        </span>
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvg-head mx-auto max-w-2xl text-center">
          <span className="wvg-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Moonlit Memories
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvg-title" className="wvg-title">
            Real Wonderverse Moments
          </h2>
          <span aria-hidden className="wvg-divider">
            <span className="wvg-divider-rule" />
            <Moon className="h-3.5 w-3.5" />
            <span className="wvg-divider-rule" />
          </span>
          <p className="wvg-sub">
            A glimpse at the rare appearances, custom characters, performance moments, magical
            entrances, and one-of-a-kind memories that make the Wonderverse feel unforgettable.
          </p>
          <span className="wvg-tags">
            <span className="wvg-tag">Rare Characters</span>
            <Star className="h-2.5 w-2.5" aria-hidden />
            <span className="wvg-tag">Custom Magic</span>
            <Star className="h-2.5 w-2.5" aria-hidden />
            <span className="wvg-tag">Theatrical Moments</span>
          </span>
        </div>

        {/* the memory gallery */}
        <div className="wvg-gallery mt-12 md:mt-14">
          <MomentCard {...FEATURED} featured i={0} />
          {TILES.map((t, i) => (
            <MomentCard key={t.key} img={t.img} label={t.label} alt={t.alt} i={i + 1} />
          ))}
        </div>

        {/* CTA + note */}
        <div className="wvg-foot mt-12 text-center">
          <Link to="/gallery" className="wvg-cta group">
            <span aria-hidden className="wvg-cta-gloss" />
            <Moon className="h-4 w-4" aria-hidden />
            See More Rare Moments
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <p className="wvg-foot-script">Rare characters. One-of-a-kind memories.</p>
          <p className="wvg-foot-note">
            <Moon className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-[#E7C977]" aria-hidden />
            Every Wonderverse visit is shaped around the character style, event theme, and moment
            you want to create.
          </p>
        </div>
      </div>
    </section>
  );
}
