import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Camera, Leaf, Megaphone, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import expeditionMap from "@/assets/dinosaur/expedition-map.webp";

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
        <div className="grid items-center gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:gap-9">
          {/* ===================== LEFT — the Expedition Map ===================== */}
          <figure className="aca-map">
            <img
              src={expeditionMap}
              alt="Illustrated expedition map — a winding footprint trail leads past fossils, a waterfall, a watching amber eye and a friendly long-necked dinosaur through five marked stops: Recruit, Discover, Learn, Harvey and Graduate, all pointing toward Harvey."
              className="aca-map-img"
              width={941}
              height={1672}
              loading="lazy"
            />
          </figure>

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
