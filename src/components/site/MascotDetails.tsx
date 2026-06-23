import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  ArrowRight,
  Camera,
  DoorOpen,
  Flag,
  Flower2,
  Hand,
  Heart,
  Music,
  PawPrint,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MascotDetails — "More Than a Mascot Appearance": the reassurance / positioning
 * section after Meet the Meadow Friends. A cheerful meadow planning board on the
 * left (why a Mascot Meadows visit is guided, not just a costume showing up) and
 * five "trail-sign" detail cards on the right strung along a winding pawprint
 * trail, closed by an Arrival → Farewell mini-flow strip that previews the next
 * section. Warm, organized, parent/planner-friendly; brand-safe archetype
 * language only. VISIBLE BY DEFAULT (hidden only under `.mmd.anim:not(.is-in)`),
 * reduced-motion safe. See "MASCOT MEADOWS DETAILS" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const DETAILS: { n: number; icon: IconType; title: string; copy: string }[] = [
  {
    n: 1,
    icon: DoorOpen,
    title: "Guided Entrance",
    copy: "We help create a clear arrival moment so the mascot feels exciting, not chaotic.",
  },
  {
    n: 2,
    icon: Flag,
    title: "Handler Supported",
    copy: "A helper supports movement, visibility, positioning, and smoother transitions.",
  },
  {
    n: 3,
    icon: Camera,
    title: "Photo-Friendly Flow",
    copy: "We build in time for family photos, group shots, birthday moments, and big reactions.",
  },
  {
    n: 4,
    icon: Music,
    title: "Games & Dancing",
    copy: "Simple movement games, dance moments, and cheerful activities keep the energy moving.",
  },
  {
    n: 5,
    icon: Hand,
    title: "Smooth Farewell",
    copy: "A planned goodbye helps the visit end warmly without awkward transitions.",
  },
];

const FLOW: { icon: IconType; label: string }[] = [
  { icon: DoorOpen, label: "Arrival" },
  { icon: Hand, label: "Hellos & Introductions" },
  { icon: Music, label: "Games & Dancing" },
  { icon: Camera, label: "Photos & Big Moments" },
  { icon: Heart, label: "Farewell & High Fives" },
];

const PETALS = [
  { left: "16%", s: 9, delay: "0s", dur: "18s", dx: "13px", rot: "180deg", c: "#FFD25A" },
  { left: "44%", s: 7, delay: "4s", dur: "21s", dx: "-10px", rot: "240deg", c: "#F2B4CC" },
  { left: "72%", s: 8, delay: "2s", dur: "19s", dx: "12px", rot: "120deg", c: "#7CC86A" },
  { left: "88%", s: 7, delay: "5.4s", dur: "22s", dx: "-11px", rot: "300deg", c: "#5BB7E6" },
] as const;

export function MascotDetails() {
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
      aria-labelledby="mmd-title"
      className={cn("mmd relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* meadow backdrop */}
      <div aria-hidden className="mmd-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mmd-sun" />
        <span className="mmd-bunting" />
        <span className="mmd-corner mmd-corner-l" />
        <span className="mmd-corner mmd-corner-r" />
        {motionOK ? (
          <>
            {PETALS.map((p, i) => (
              <span
                key={i}
                className="mmd-petal"
                style={
                  {
                    left: p.left,
                    width: p.s,
                    height: p.s,
                    animationDelay: p.delay,
                    animationDuration: p.dur,
                    "--dx": p.dx,
                    "--rot": p.rot,
                    "--c": p.c,
                  } as Vars
                }
              />
            ))}
          </>
        ) : null}
      </div>
      <div aria-hidden className="mmd-grass pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mmd-grid">
          {/* LEFT — planning board */}
          <div className="mmd-board">
            <span aria-hidden className="mmd-board-pattern" />
            <span className="mmd-sign mmd-sign-board">
              <Flower2 className="h-3.5 w-3.5" aria-hidden />
              Why Mascot Meadows Feels Different
            </span>
            <h2 id="mmd-title" className="mmd-title">
              <span className="mmd-title-a">More than a</span>{" "}
              <span className="mmd-title-b">mascot appearance.</span>
            </h2>
            <p className="mmd-sub">
              A great mascot visit is not just a character walking into the room. It is the entrance,
              the pacing, the photos, the games, the helper support, and the way every child gets a
              moment without the host having to manage it all.
            </p>
            <span aria-hidden className="mmd-rule">
              <span className="mmd-rule-line" />
              <Flower2 className="h-3.5 w-3.5" />
              <span className="mmd-rule-line" />
            </span>
            <p className="mmd-body">
              Whether you are planning a birthday, daycare visit, school event, mall appearance,
              festival, or community celebration, our mascot experiences are designed to feel
              cheerful, organized, and easy to enjoy. We help guide the visit so the mascot can focus
              on the smiles, hugs, dancing, photos, and big reactions.
            </p>
            <a href="#visit-flow" className="mmd-cta group">
              See How Visits Flow
              <PawPrint className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          {/* RIGHT — the difference is in the details */}
          <div className="mmd-right">
            <span className="mmd-sign mmd-sign-right">The Difference Is in the Details</span>
            <ul className="mmd-cards">
              <svg
                aria-hidden
                className="mmd-trail"
                viewBox="0 0 100 540"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  className="mmd-trail-path"
                  d="M22,28 C70,70 78,150 30,196 C-12,238 14,316 60,348 C96,374 86,452 38,496"
                  stroke="#7CB85A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="1 12"
                />
              </svg>
              {DETAILS.map(({ n, icon: Icon, title, copy }, i) => (
                <li
                  key={title}
                  className={cn("mmd-card", i % 2 === 1 && "mmd-card--r")}
                  style={{ "--i": i } as Vars}
                >
                  <span aria-hidden className="mmd-card-medal">
                    <span className="mmd-card-n">{n}</span>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mmd-card-text">
                    <h3 className="mmd-card-title">{title}</h3>
                    <p className="mmd-card-copy">{copy}</p>
                  </div>
                  <Flower2 aria-hidden className="mmd-card-flower h-3.5 w-3.5" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM — mini flow strip (previews the full experience flow) */}
        <div id="visit-flow" className="mmd-flow">
          <p className="mmd-flow-title">
            <PawPrint className="h-4 w-4" aria-hidden />
            A Visit With Purpose. A Trail of Happy Moments.
          </p>
          <ol className="mmd-flow-steps">
            {FLOW.map(({ icon: Icon, label }, i) => (
              <li key={label} className="mmd-flow-step" style={{ "--i": i } as Vars}>
                <span aria-hidden className="mmd-flow-ic">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mmd-flow-label">{label}</span>
                {i < FLOW.length - 1 ? (
                  <PawPrint aria-hidden className="mmd-flow-arrow h-3.5 w-3.5" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
