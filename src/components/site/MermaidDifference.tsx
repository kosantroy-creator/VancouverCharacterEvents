import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Check, Shell, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MermaidDifference — Section 3 of /mermaid-events: "What Makes Mermaid Cove
 * Different". A bright aquatic two-column band on a seafoam seabed.
 *  • Left  — a turquoise pearl-glass story panel: eyebrow, heading (with a
 *    script "adventure"), subheading, supporting paragraph, and three highlight
 *    badges (Swimming Mermaid / Pirate Handler / Poolside Adventure).
 *  • Right — a respectful comparison: a quiet "Standard Character Visit" card
 *    beside a glowing "Mermaid Cove Experience" card with a gold-rimmed shell
 *    badge, check rows, and a MERMAID + PIRATE DUO stamp.
 * The core message: Mermaid Cove is a real poolside ocean adventure with
 * swimming mermaids and pirate handlers — not just a performer beside the pool.
 *
 * Motion is calm and fluid: the water fades in, the panels slide in from the
 * sides, the badges bubble up one by one, the Cove card gives one turquoise glow
 * pulse, and a few bubbles drift up. VISIBLE BY DEFAULT (hidden only under
 * `.mdf.anim:not(.is-in)`), so reduced-motion / pre-JS render is composed & still.
 * See the "MERMAID COVE DIFFERENCE" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const STANDARD = [
  "Land-based appearance",
  "Simple meet and greet",
  "Photos only",
  "Limited pool interaction",
  "Short activity flow",
];

const COVE = [
  "Swimming mermaid in the pool",
  "Pirate handler included",
  "Storytime and singing",
  "Birthday crowning",
  "Mermaid rides and swim moments",
  "Mermaid and pirate activities",
  "Public & private pool ready",
];

const BADGES: { icon: IconType; label: string; kind: "aqua" | "coral" | "green" }[] = [
  { icon: Shell, label: "Swimming Mermaid", kind: "aqua" },
  { icon: PirateHat, label: "Pirate Handler", kind: "coral" },
  { icon: Starfish, label: "Poolside Adventure", kind: "green" },
];

/* A few deterministic rising bubbles (identical on server & client). */
const BUBBLES = [
  { left: "7%", s: 10, delay: "0s", dur: "16s", dx: "14px" },
  { left: "21%", s: 7, delay: "3.4s", dur: "19s", dx: "-10px" },
  { left: "44%", s: 12, delay: "1.6s", dur: "17s", dx: "16px" },
  { left: "58%", s: 6, delay: "5s", dur: "20s", dx: "-12px" },
  { left: "76%", s: 9, delay: "2.4s", dur: "18s", dx: "12px" },
  { left: "91%", s: 8, delay: "4.1s", dur: "16.5s", dx: "-14px" },
] as const;

export function MermaidDifference() {
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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mdf-title"
      className={cn("mdf relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* bright seafoam seabed + slow caustic light + corner glows */}
      <div aria-hidden className="mdf-bg absolute inset-0" />
      <div aria-hidden className="mdf-caustic pointer-events-none absolute inset-0" />
      <span aria-hidden className="mdf-coral mdf-coral-l" />
      <span aria-hidden className="mdf-coral mdf-coral-r" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mdf-bubble"
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
        <div className="mdf-grid">
          {/* ===================== LEFT — story panel ===================== */}
          <div className="mdf-story">
            <span aria-hidden className="mdf-story-shell">
              <Shell className="h-5 w-5" />
            </span>
            <span aria-hidden className="mdf-story-caustic" />
            <span aria-hidden className="mdf-story-sheen" />

            <div className="relative">
              <span className="mdf-eyebrow">
                <Shell className="h-3 w-3" aria-hidden />
                Why Mermaid Cove Feels Different
                <Shell className="h-3 w-3 -scale-x-100" aria-hidden />
              </span>

              <h2 id="mdf-title" className="mdf-title">
                Not just a visit.
                <br />A poolside ocean{" "}
                <span className="mdf-title-script">
                  adventure.
                  <span aria-hidden className="mdf-swash" />
                </span>
              </h2>

              <p className="mdf-sub">
                Our mermaids can swim with the children while playful pirate handlers guide the
                story, games, songs, crowning moments, and poolside magic.
              </p>

              <span aria-hidden className="mdf-rule">
                <Shell className="h-3.5 w-3.5" />
              </span>

              <p className="mdf-para">
                Every Mermaid Cove visit is built as a duo experience: a swimming mermaid brings the
                ocean magic, while a pirate handler keeps the adventure moving on land. Together,
                they create a complete summer party experience for public and private pools.
              </p>

              <ul className="mdf-badges">
                {BADGES.map((b, i) => (
                  <li
                    key={b.label}
                    className={cn("mdf-badge", `mdf-badge--${b.kind}`)}
                    style={{ "--i": i } as Vars}
                  >
                    <span className="mdf-badge-disc">
                      <b.icon className="h-6 w-6" />
                    </span>
                    <span className="mdf-badge-label">{b.label}</span>
                    <WaveMark className="mdf-badge-wave" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ===================== RIGHT — comparison ===================== */}
          <div className="mdf-compare">
            <div className="mdf-compare-grid">
              {/* Standard — quieter, never mocked */}
              <div className="mdf-col mdf-std">
                <span aria-hidden className="mdf-col-badge mdf-col-badge--muted">
                  <Shell className="h-6 w-6" />
                </span>
                <h3 className="mdf-col-title mdf-col-title--muted">
                  Standard
                  <br />
                  Character Visit
                </h3>
                <ul className="mdf-list">
                  {STANDARD.map((t) => (
                    <li key={t} className="mdf-row mdf-row--no">
                      <span aria-hidden className="mdf-ic mdf-ic--no">
                        <X className="h-3.5 w-3.5" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mermaid Cove — alive & premium */}
              <div className="mdf-col mdf-mco">
                <span aria-hidden className="mdf-mco-glow" />
                <span aria-hidden className="mdf-col-badge mdf-col-badge--cove">
                  <Shell className="h-7 w-7" />
                </span>
                <h3 className="mdf-col-title mdf-col-title--cove">
                  Mermaid Cove
                  <br />
                  Experience
                </h3>
                <ul className="mdf-list">
                  {COVE.map((t) => (
                    <li key={t} className="mdf-row mdf-row--yes">
                      <span aria-hidden className="mdf-ic mdf-ic--yes">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div aria-hidden className="mdf-stamp">
                  <span className="mdf-stamp-disc">
                    <Starfish className="mdf-stamp-star" />
                    <span className="mdf-stamp-text">
                      Mermaid
                      <br />+ Pirate
                      <br />
                      Duo
                    </span>
                  </span>
                  <span className="mdf-stamp-ribbon">Swimming Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pool-safety wording — kept light, never implies the handler is a lifeguard */}
        <p className="mdf-note">
          Pirate handlers help guide the entertainment and support the mermaid on land. Pool
          supervision and lifeguard requirements remain the responsibility of the venue or event
          host according to pool rules.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Small inline ornaments (decorative, currentColor) — a friendly pirate hat, a
   starfish, and a little wave squiggle, so the badges echo the reference art.
   --------------------------------------------------------------------------- */
function PirateHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 5.2c-2.6 0-4.4 1.7-5 4.3-1-.2-2.1-.1-3.1.3-.9.4-.9.8-.1 1.2 2.2 1.1 5 1.7 8.2 1.7s6-.6 8.2-1.7c.8-.4.8-.8-.1-1.2-1-.4-2.1-.5-3.1-.3-.6-2.6-2.4-4.3-5-4.3z" />
    </svg>
  );
}

function Starfish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.43 0 .81.27.95.67l1.78 5.02 5.32.09c.95.02 1.34 1.22.58 1.79l-4.26 3.18 1.57 5.09c.28.9-.74 1.65-1.51 1.1L12 17.4l-4 2.83c-.77.55-1.79-.2-1.51-1.1l1.57-5.09-4.26-3.18c-.76-.57-.37-1.77.58-1.79l5.32-.09 1.78-5.02c.14-.4.52-.67.95-.67z" />
    </svg>
  );
}

function WaveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 6" className={className} fill="none" aria-hidden="true">
      <path
        d="M1 3.5c2-2.4 4-2.4 6 0s4 2.4 6 0 4-2.4 6 0 4 2.4 6 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
