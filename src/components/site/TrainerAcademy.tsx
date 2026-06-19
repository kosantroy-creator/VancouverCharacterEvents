import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Camera, Leaf, Megaphone, Search, Users } from "lucide-react";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";

/**
 * TrainerAcademy — the compact "What Happens at the Party" field guide after the
 * Harvey reveal. A two-column expedition spread: a left "Expedition Map" panel
 * (jungle trail + footprint path + checkpoint stamps + a watching amber eye, all
 * pointing toward Harvey) and a right set of five condensed beats — a 2×2 card
 * grid (with the glowing "Harvey Arrives / Big Reveal" card) plus a full-width
 * "Photos & Graduation" card. It reads in one glance as a trainer-led adventure,
 * not a long activity list. Reveals are IntersectionObserver-driven and
 * visible-by-default, so reduced-motion / pre-JS render gets it composed & still.
 * See the "TRAINER ACADEMY" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

/** Harvey's mark — a 3-toed dinosaur footprint. */
function DinoTrack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 104" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="74" rx="19" ry="23" />
      <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
      <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
      <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
    </svg>
  );
}

type Beat = { n: number; short: string; title: string; desc: string; icon: IconType };
const BEATS: Beat[] = [
  {
    n: 1,
    short: "Recruit",
    title: "Recruit the Trainers",
    icon: Users,
    desc: "The safari trainers gather the kids, set the mission, and teach the rules in a fun, story-based way — before Harvey can safely appear.",
  },
  {
    n: 2,
    short: "Discover",
    title: "Discover the Clues",
    icon: Search,
    desc: "Kids hunt for fossils, tracks, dinosaur clues, and eggs while learning how the trainers know Harvey is nearby.",
  },
  {
    n: 3,
    short: "Learn",
    title: "Learn the Commands",
    icon: Megaphone,
    desc: "Kids rehearse the commands they'll use when Harvey arrives — “Easy Harvey,” “Freeze,” “Back up,” “Good dino,” and “Trainer pose.”",
  },
  {
    n: 4,
    short: "Harvey",
    title: "Harvey Arrives",
    icon: DinoTrack,
    desc: "The energy shifts, trainers spot fresh signs, and Harvey makes his big entrance. Kids use what they learned — and the birthday child gets a special feature moment.",
  },
  {
    n: 5,
    short: "Photos",
    title: "Photos & Graduation",
    icon: Camera,
    desc: "It ends with organized photos, a Junior Dinosaur Trainer graduation moment, and a final memory the whole family can capture.",
  },
];

/* Checkpoint stamps placed along the map trail (left/top within the panel). */
const MAP_NODES: { left: string; top: string; short: string; icon: IconType; reveal?: boolean }[] =
  [
    { left: "58%", top: "15%", short: "Recruit", icon: Users },
    { left: "27%", top: "35%", short: "Discover", icon: Search },
    { left: "55%", top: "55%", short: "Learn", icon: Megaphone },
    { left: "71%", top: "73%", short: "Harvey", icon: DinoTrack, reveal: true },
    { left: "33%", top: "90%", short: "Photos", icon: Camera },
  ];

export function TrainerAcademy() {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="academy-title"
      className={cn("aca relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
      style={{
        background:
          "linear-gradient(180deg, #FFFCF6 0%, #FBF4E4 24%, #F6EDD9 58%, #F8F1E1 82%, #FFFCF6 100%)",
      }}
    >
      <div aria-hidden className="aca-tex pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        <div className="grid items-stretch gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-9">
          {/* ===================== LEFT — the Expedition Map ===================== */}
          <div className="aca-map">
            {/* framing foliage (kept to the corners, never over the labels) */}
            <div
              aria-hidden
              className="absolute -right-6 -top-7 w-28 opacity-90"
              style={{ transform: "rotate(168deg)", transformOrigin: "top center" }}
            >
              <Frond fill="#1E3320" className="h-auto w-full" />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-9 -left-6 w-28 opacity-85"
              style={{ transform: "rotate(20deg)", transformOrigin: "bottom center" }}
            >
              <Frond fill="#1E3320" className="h-auto w-full" />
            </div>

            {/* the watching amber eye, half-hidden in the leaves */}
            <span aria-hidden className="aca-eye">
              <span className="aca-eye-glow" />
              <svg viewBox="0 0 60 36" className="relative h-full w-full">
                <path d="M3 18 Q30 1 57 18 Q30 35 3 18 Z" fill="#16271C" />
                <circle cx="30" cy="18" r="13" fill="url(#acaIris)" />
                <ellipse cx="30" cy="18" rx="3.4" ry="12" fill="#0E140C" />
                <circle cx="25" cy="12" r="2.6" fill="#FFFDF2" opacity="0.9" />
                <defs>
                  <radialGradient id="acaIris" cx="42%" cy="36%" r="70%">
                    <stop offset="0%" stopColor="#FCE39A" />
                    <stop offset="45%" stopColor="#D99A32" />
                    <stop offset="100%" stopColor="#8A5A12" />
                  </radialGradient>
                </defs>
              </svg>
            </span>

            {/* drifting mist */}
            <span aria-hidden className="aca-mist" />

            {/* the winding footprint trail — draws on scroll */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <path
                className="aca-trail-path"
                pathLength={1}
                d="M58 15 C44 24 30 26 27 35 C24 46 53 46 55 55 C57 66 66 64 71 73 C75 83 52 82 33 90"
                fill="none"
                stroke="#86A765"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            {/* checkpoint stamps */}
            {MAP_NODES.map((node, i) => (
              <div
                key={node.short}
                className={cn("aca-mnode", node.reveal && "aca-mnode-reveal")}
                style={{ left: node.left, top: node.top, "--i": i } as Vars}
              >
                <span className="aca-mnode-stamp">
                  <node.icon className="h-4 w-4" />
                </span>
                <span className="aca-mnode-label">{node.short}</span>
              </div>
            ))}

            {/* title plate + caption */}
            <div className="aca-map-plate">
              <span className="t-engrave block text-[0.62rem] font-bold tracking-[0.28em] text-[#F4E2A6]">
                Expedition Map
              </span>
              <span className="mt-0.5 block text-[0.78rem] italic text-[#EAF1DD]/90">
                Everything points toward Harvey.
              </span>
            </div>
          </div>

          {/* ===================== RIGHT — heading + five beats ===================== */}
          <div className="aca-right flex flex-col">
            <span className="aca-eyebrow t-engrave inline-flex items-center gap-2 text-[0.66rem] font-bold tracking-[0.3em] text-[#9c7406]">
              <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
              Field Guide 03 · Party Flow
            </span>
            <h2
              id="academy-title"
              className="aca-title t-display mt-2 text-3xl font-bold leading-[1.04] text-[#2E4A38] md:text-[2.7rem]"
            >
              Junior Dinosaur Trainer Academy
            </h2>
            <p className="aca-sub mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[#2E4A38]/80">
              Before Harvey arrives, young explorers train with our safari team through clues,
              commands, eggs, fossils, and story-driven activities — making the final reveal feel
              earned.
            </p>

            <div className="aca-divider mt-6">
              <span>What Happens at the Party</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {BEATS.map((beat, i) => (
                <article
                  key={beat.n}
                  className={cn(
                    "aca-card",
                    beat.n === 4 && "aca-card-reveal",
                    beat.n === 5 && "aca-card-wide sm:col-span-2",
                  )}
                  style={{ "--i": i } as Vars}
                >
                  {beat.n === 4 ? <span className="aca-card-badge">Big Reveal</span> : null}
                  <span className="aca-ic">
                    <beat.icon className="h-[1.15rem] w-[1.15rem]" />
                  </span>
                  <div className="aca-card-body">
                    <h3 className="aca-card-title">
                      <span className="aca-card-no">{beat.n}.</span> {beat.title}
                    </h3>
                    <p className="aca-card-desc">{beat.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
