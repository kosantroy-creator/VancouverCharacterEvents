import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Cake, Camera, HandHelping, MapPin, Music, PawPrint, School, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MascotTrust — "Big Smiles. Smooth Visits. Photo-Ready Fun." The compact
 * trust / credibility band that bridges the Mascot Meadows hero into the rest
 * of the page (sibling of the Jurassic "Expedition Credentials" strip). Six
 * cheerful meadow-badge cards on a soft cream/sky meadow continuation, a faint
 * pawprint trail behind them, a warm sunlight wash and very subtle petal drift.
 * Reassures parents, schools, malls and festivals that mascot visits are
 * organized, supported and photo-ready. Brand-safe (generic mascots only).
 * VISIBLE BY DEFAULT (hidden only under `.mtr.anim:not(.is-in)`), reduced-motion
 * safe. See "MASCOT MEADOWS TRUST" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const BADGES: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: Cake,
    title: "Birthday Friendly",
    desc: "Perfect for hugs, photos, games, and birthday spotlight moments.",
  },
  {
    icon: School,
    title: "School & Daycare Ready",
    desc: "Gentle, friendly visits for younger children and group settings.",
  },
  {
    icon: MapPin,
    title: "Mall & Festival Friendly",
    desc: "Designed for public appearances, walk-bys, photos, and crowd energy.",
  },
  {
    icon: Music,
    title: "Dancing & Games",
    desc: "Great for simple movement games, dance moments, and cheerful party interaction.",
  },
  {
    icon: Camera,
    title: "Photo Moments",
    desc: "Built for big smiles, family photos, group shots, and memorable reactions.",
  },
  {
    icon: HandHelping,
    title: "Handler Supported",
    desc: "A helper supports flow, transitions, visibility, and smoother mascot interactions.",
  },
];

/* A faint walking pawprint trail behind the grid (deterministic, SSR-safe). */
const PAWS = [
  { left: "8%", top: "16%", rot: "-18deg" },
  { left: "22%", top: "70%", rot: "12deg" },
  { left: "37%", top: "24%", rot: "-10deg" },
  { left: "52%", top: "74%", rot: "16deg" },
  { left: "67%", top: "22%", rot: "-14deg" },
  { left: "82%", top: "68%", rot: "10deg" },
  { left: "93%", top: "30%", rot: "-8deg" },
] as const;

/* Very subtle drifting petals/confetti (few, motion-gated). */
const DRIFT = [
  { left: "12%", s: 9, delay: "0s", dur: "17s", dx: "12px", rot: "160deg", c: "#FFD25A" },
  { left: "34%", s: 7, delay: "3.6s", dur: "20s", dx: "-10px", rot: "240deg", c: "#7CC86A" },
  { left: "56%", s: 8, delay: "1.8s", dur: "18s", dx: "13px", rot: "120deg", c: "#5BB7E6" },
  { left: "74%", s: 7, delay: "5s", dur: "21s", dx: "-12px", rot: "300deg", c: "#F4977E" },
  { left: "88%", s: 9, delay: "2.6s", dur: "19s", dx: "11px", rot: "80deg", c: "#F2B4CC" },
] as const;

export function MascotTrust() {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mtr-title"
      className={cn("mtr relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* warm meadow continuation + sunlight */}
      <span aria-hidden className="mtr-sun" />
      <span aria-hidden className="mtr-cloud mtr-cloud-l" />
      <span aria-hidden className="mtr-cloud mtr-cloud-r" />

      {/* very subtle petal/confetti drift */}
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {DRIFT.map((d, i) => (
            <span
              key={i}
              className="mtr-petal"
              style={
                {
                  left: d.left,
                  width: d.s,
                  height: d.s,
                  animationDelay: d.delay,
                  animationDuration: d.dur,
                  "--dx": d.dx,
                  "--rot": d.rot,
                  "--c": d.c,
                } as Vars
              }
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-6 md:py-16 lg:px-8">
        {/* header */}
        <div className="mtr-head mx-auto max-w-2xl text-center">
          <span className="mtr-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Meadow Promise
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="mtr-title" className="mtr-title">
            Big smiles, smooth visits, and photo-ready fun.
          </h2>
          <p className="mtr-sub">
            From birthdays and daycares to malls, schools, festivals, and community events, Mascot
            Meadows is built around cheerful interactions, clear flow, and memorable photo moments.
          </p>
        </div>

        {/* badges + pawprint trail */}
        <div className="mtr-grid-wrap relative mt-10">
          <div aria-hidden className="mtr-trail pointer-events-none absolute inset-0">
            {PAWS.map((p, i) => (
              <PawPrint
                key={i}
                className="mtr-paw"
                style={{ left: p.left, top: p.top, transform: `rotate(${p.rot})`, "--i": i } as Vars}
                aria-hidden
              />
            ))}
          </div>

          <ul className="mtr-grid">
            {BADGES.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="mtr-card" style={{ "--i": i } as Vars}>
                <span aria-hidden className="mtr-medallion">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mtr-card-text">
                  <h3 className="mtr-card-title">{title}</h3>
                  <p className="mtr-card-desc">{desc}</p>
                </div>
                <PawPrint aria-hidden className="mtr-card-paw h-3.5 w-3.5" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* soft cream fade into the section below */}
      <div aria-hidden className="mtr-seam pointer-events-none absolute inset-x-0 bottom-0" />
    </section>
  );
}
