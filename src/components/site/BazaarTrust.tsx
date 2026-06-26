import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Camera, ClipboardCheck, Palette, PartyPopper, Sparkles, Store, Tent } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BazaarTrust — "More Colour. More Activity. More Moments." The Enchanted Bazaar
 * trust strip (the bazaar sibling of HolidayTrust / the other realm trust strips):
 * six "market stall" badge cards under a draped silk awning + side lanterns,
 * reassuring planners that Bazaar add-ons fill the event with colour, activity,
 * photos and smoother flow — practical and magical, not just decorative. Cream /
 * parchment base with jewel-tone accents (teal · magenta · turquoise · plum · gold
 * · coral), amber lantern glow, gold dust + jewel sparkles. Inflatables are
 * PARTNER-based (we don't imply we operate them). VISIBLE BY DEFAULT (hidden only
 * under `.bzt.anim:not(.is-in)`), reduced-motion safe. See "ENCHANTED BAZAAR TRUST".
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

const BADGES: { id: string; title: string; desc: string; icon: IconType; acc: string; accDeep: string }[] = [
  {
    id: "face",
    title: "Face Painting Ready",
    desc: "Colourful, photo-friendly designs that bring extra excitement and personality to the event.",
    icon: Palette,
    acc: "#0F7E8C",
    accDeep: "#0A5A66",
  },
  {
    id: "balloon",
    title: "Balloon Twisting",
    desc: "Fun balloon creations that keep guests smiling and give children something to take home.",
    icon: PartyPopper,
    acc: "#B83D7A",
    accDeep: "#8E2D5E",
  },
  {
    id: "photo",
    title: "Photography Moments",
    desc: "Capture the greetings, reactions, group shots, and details hosts often miss while managing the event.",
    icon: Camera,
    acc: "#1E8A9E",
    accDeep: "#156B7A",
  },
  {
    id: "inflatable",
    title: "Inflatable Partners",
    desc: "Inflatable add-ons may be available through trusted partner vendors for larger parties and public events.",
    icon: Tent,
    acc: "#8E2D6E",
    accDeep: "#6E2356",
  },
  {
    id: "festival",
    title: "Festival & Public Event Friendly",
    desc: "Great for schools, malls, festivals, community events, corporate celebrations, and family fun days.",
    icon: Store,
    acc: "#C28A2E",
    accDeep: "#9A6E2B",
  },
  {
    id: "coord",
    title: "Easy Add-On Coordination",
    desc: "We help match the right extras to your event style, timing, space, and guest flow.",
    icon: ClipboardCheck,
    acc: "#C8556E",
    accDeep: "#A23A54",
  },
];

/* Draped silk awning swags (alternating jewel tones) — the market-canopy divider. */
const SWAGS = [
  { x: -60, c: "#0F7E8C" },
  { x: 120, c: "#8E2D6E" },
  { x: 300, c: "#C28A2E" },
  { x: 480, c: "#1E8A9E" },
  { x: 660, c: "#B83D7A" },
  { x: 840, c: "#0F7E8C" },
  { x: 1020, c: "#C8556E" },
  { x: 1200, c: "#8E2D6E" },
  { x: 1380, c: "#C28A2E" },
] as const;

/* Drifting gold dust (deterministic) + a few jewel sparkles. */
const DUST = [
  { left: "12%", s: 4, delay: "0s", dur: "16s", dx: "9px", c: "#E2C271" },
  { left: "30%", s: 3, delay: "3.4s", dur: "19s", dx: "-7px", c: "#F0C674" },
  { left: "52%", s: 4, delay: "1.6s", dur: "17s", dx: "10px", c: "#F4A93B" },
  { left: "70%", s: 3, delay: "5s", dur: "20s", dx: "-9px", c: "#E2C271" },
  { left: "86%", s: 4, delay: "2.6s", dur: "18s", dx: "8px", c: "#F0C674" },
] as const;
const SPARKS = [
  { left: "18%", top: "30%", s: 9, delay: "0.4s", c: "#4FC4D6" },
  { left: "44%", top: "22%", s: 8, delay: "1.8s", c: "#E08AB0" },
  { left: "64%", top: "32%", s: 9, delay: "2.7s", c: "#F0C674" },
  { left: "82%", top: "24%", s: 8, delay: "1.1s", c: "#7CC8C2" },
] as const;

function Lantern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 100" aria-hidden>
      <line x1="24" y1="0" x2="24" y2="10" stroke="#9A6E2B" strokeWidth="2" />
      <path d="M24 8 a6 6 0 0 1 6 6 h-12 a6 6 0 0 1 6 -6z" fill="#9A6E2B" />
      <rect x="11" y="14" width="26" height="48" rx="7" fill="#B8862E" />
      <rect x="16" y="18" width="16" height="40" rx="4" fill="#FFD98E" />
      <path d="M24 28 c-3.4 4.6 -3.4 11 0 15.4 c3.4 -4.6 3.4 -10.8 0 -15.4z" fill="#F7A93B" />
      <ellipse cx="24" cy="40" rx="2.2" ry="3.4" fill="#FFF1C2" />
      <rect x="12" y="60" width="24" height="7" rx="3" fill="#9A6E2B" />
      <line x1="24" y1="67" x2="24" y2="82" stroke="#C19A3C" strokeWidth="1.5" />
      <circle cx="24" cy="84" r="3" fill="#C19A3C" />
    </svg>
  );
}

export function BazaarTrust() {
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="bzt-title"
      className={cn("bzt relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* amber lantern glow + draped silk awning canopy */}
      <span aria-hidden className="bzt-glow" />
      <div aria-hidden className="bzt-awning-wrap pointer-events-none absolute inset-x-0 top-0">
        <svg className="bzt-awning" viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true">
          <rect x="0" y="0" width="1440" height="8" fill="#C19A3C" />
          {SWAGS.map((s, i) => (
            <path key={`f${i}`} d={`M ${s.x},8 Q ${s.x + 110},64 ${s.x + 220},8 Z`} fill={s.c} opacity="0.9" />
          ))}
          {SWAGS.map((s, i) => (
            <path key={`t${i}`} d={`M ${s.x},8 Q ${s.x + 110},64 ${s.x + 220},8`} fill="none" stroke="#E7C977" strokeWidth="2.5" opacity="0.85" />
          ))}
          <g className="bzt-awning-tassels">
            {SWAGS.map((s, i) => (
              <g key={`l${i}`}>
                <line x1={s.x + 110} y1="48" x2={s.x + 110} y2="58" stroke="#9A6E2B" strokeWidth="1.5" />
                <circle cx={s.x + 110} cy="61" r="3.4" fill="#F4D98A" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <Lantern className="bzt-lantern bzt-lantern-l" />
      <Lantern className="bzt-lantern bzt-lantern-r" />

      {/* gold dust + jewel sparkles (motion only) */}
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="bzt-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx, "--c": d.c } as Vars}
            />
          ))}
          {SPARKS.map((s, i) => (
            <span
              key={`s${i}`}
              className="bzt-spark"
              style={{ left: s.left, top: s.top, width: s.s, height: s.s, animationDelay: s.delay, "--c": s.c } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        {/* header */}
        <div className="bzt-head mx-auto max-w-2xl text-center">
          <span className="bzt-eyebrow">
            <span aria-hidden className="bzt-eyebrow-fl" />
            Bazaar Promise
            <span aria-hidden className="bzt-eyebrow-fl bzt-eyebrow-fl--r" />
          </span>
          <h2 id="bzt-title" className="bzt-title">
            More <span className="bzt-w-teal">colour</span>, more{" "}
            <span className="bzt-w-magenta">activity</span>, and more{" "}
            <span className="bzt-w-turq">moments</span>.
          </h2>
          <p className="bzt-sub">
            From face painting and balloon twisting to photography and inflatable partner add-ons, the
            Enchanted Bazaar helps make birthdays, schools, festivals, corporate events, and community
            celebrations feel fuller, smoother, and more memorable.
          </p>
          <span aria-hidden className="bzt-rule">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* badges — market stall passes */}
        <ul className="bzt-grid">
          {BADGES.map(({ id, title, desc, icon: Icon, acc, accDeep }, i) => (
            <li key={id} className="bzt-card" style={{ "--ca": acc, "--cad": accDeep, "--i": i } as Vars}>
              <span aria-hidden className="bzt-medallion" style={{ borderColor: acc, color: acc }}>
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="bzt-card-title" style={{ color: accDeep }}>{title}</h3>
              <p className="bzt-card-desc">{desc}</p>
              <span aria-hidden className="bzt-card-spark" style={{ color: acc }}>
                <Sparkles className="h-3 w-3" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* soft fade into the section below */}
      <div aria-hidden className="bzt-seam pointer-events-none absolute inset-x-0 bottom-0" />
    </section>
  );
}
