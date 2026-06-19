import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Binoculars, Check, Plus } from "lucide-react";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";

/**
 * ExpeditionDetails — "Everything Parents Ask Before Booking Harvey". The practical
 * FAQ section after the gallery: a field-guide spread with a sticky "Need-to-Know
 * Details" intro card on the left and an accessible expedition-manual accordion on
 * the right. Each row is a keyboard-operable <button> with aria-expanded/aria-controls;
 * answers open with a smooth grid-rows height + opacity transition. Reveals are
 * IntersectionObserver-driven and VISIBLE BY DEFAULT, so reduced-motion / pre-JS
 * render gets it composed & still. See the "EXPEDITION DETAILS" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const CHECKLIST = [
  "Family-friendly",
  "Trainer-led",
  "Indoor/outdoor options",
  "Custom support for larger events",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is Harvey too scary for younger kids?",
    a: "Harvey is designed to feel exciting, not frightening. Our safari trainers guide the interaction, set expectations, and keep the experience family-friendly. For younger or more cautious kids, we can slow down the reveal and keep the interaction gentler.",
  },
  {
    q: "How much space do you need?",
    a: "Harvey needs enough open space for safe movement, photos, and trainer guidance. Backyards, gyms, community rooms, school spaces, and outdoor areas can all work depending on layout. If you are unsure, send us a few details or photos of the space and we can help confirm.",
  },
  {
    q: "Can Harvey appear indoors?",
    a: "Yes, depending on the venue size, ceiling height, entrances, and available movement space. Gyms, halls, large rooms, and community spaces are often good options. We will confirm the setup requirements before booking.",
  },
  {
    q: "Can this work for schools, daycares, festivals, or malls?",
    a: "Yes. Harvey can be adapted for birthdays, schools, daycares, malls, festivals, corporate events, and larger public activations. Larger events may use a different structure, crowd flow, or appearance schedule.",
  },
  {
    q: "What happens if it rains?",
    a: "Outdoor events may need a weather backup plan. Depending on the event and conditions, we can look at covered areas, indoor alternatives, or adjustments to the setup. We will discuss weather considerations during booking.",
  },
  {
    q: "Do trainers stay with Harvey the whole time?",
    a: "Yes. Harvey is always guided by trained safari staff. The trainers lead the experience, manage the flow, help kids interact safely, and keep the event organized.",
  },
  {
    q: "How far in advance should we book?",
    a: "Popular weekends can book up quickly, especially during spring, summer, and holiday periods. The earlier you reach out, the better chance we have of matching your preferred date and time.",
  },
  {
    q: "What happens after I send an inquiry?",
    a: "We will review your event date, location, venue type, group size, and package interest. Then we will help recommend the right expedition option and confirm availability, setup needs, and next steps.",
  },
];

export function ExpeditionDetails() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  // One row open at a time (collapsible). Default to the third question open so the
  // open-state styling is visible on first paint — mirrors the reference spread.
  const [open, setOpen] = useState<number | null>(2);

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="det-title"
      className={cn("det relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* aged-parchment ground + faint tracks + corner foliage */}
      <div aria-hidden className="det-paper absolute inset-0" />
      <div aria-hidden className="det-tex pointer-events-none absolute inset-0" />
      <div aria-hidden className="det-prints pointer-events-none absolute inset-0">
        <DetTrack className="absolute left-[5%] top-[16%] w-7 rotate-[18deg]" />
        <DetTrack className="absolute left-[9%] top-[52%] w-6 -rotate-[12deg]" />
        <DetTrack className="absolute right-[6%] top-[24%] w-7 rotate-[24deg]" />
        <DetTrack className="absolute right-[10%] bottom-[16%] w-6 -rotate-[14deg]" />
      </div>
      <div aria-hidden className="det-frond det-frond-bl">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>
      <div aria-hidden className="det-frond det-frond-br">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="det-eyebrow">Expedition Details</span>
          <h2 id="det-title" className="det-title">
            Everything Parents Ask Before Booking Harvey
          </h2>
          <span className="det-rule" aria-hidden />
          <p className="det-sub">
            A few helpful notes about space, safety, setup, and what to expect when the expedition
            arrives.
          </p>
        </div>

        {/* the field-guide spread */}
        <div className="det-grid mt-12 md:mt-14">
          {/* left — sticky field-guide intro card */}
          <div className="det-aside">
            <div className="det-card">
              <span className="det-badge">
                <Binoculars className="h-3.5 w-3.5" aria-hidden />
                Field Guide
              </span>
              <span aria-hidden className="det-card-stamp">
                <DetTrack className="w-5" />
                <span className="det-card-stamp-top">Jurassic</span>
                <span className="det-card-stamp-bot">Expedition</span>
              </span>

              <h3 className="det-card-h">Need-to-Know Details</h3>
              <span className="det-card-rule" aria-hidden />
              <p className="det-card-p">
                Every Harvey experience is led by professional trainers and adapted to your venue,
                age group, and event size for a safe, memorable adventure.
              </p>

              <ul className="det-checks">
                {CHECKLIST.map((c) => (
                  <li key={c} className="det-check">
                    <span className="det-check-ic" aria-hidden>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>

              {/* subtle expedition vista + compass */}
              <div aria-hidden className="det-vista">
                <Compass className="det-compass" />
              </div>
            </div>
          </div>

          {/* right — FAQ accordion */}
          <div className="det-faq">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={cn("det-row", isOpen && "is-open")}
                  style={{ "--i": i } as Vars}
                >
                  <h3 className="det-row-h">
                    <button
                      type="button"
                      className="det-q"
                      aria-expanded={isOpen}
                      aria-controls={`det-a-${i}`}
                      id={`det-q-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="det-q-text">{f.q}</span>
                      <span className="det-q-ic" aria-hidden>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`det-a-${i}`}
                    role="region"
                    aria-labelledby={`det-q-${i}`}
                    className="det-a"
                  >
                    <div className="det-a-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A 3-toed dinosaur track for the background + stamp. */
function DetTrack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 104" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="74" rx="19" ry="23" />
      <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
      <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
      <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
    </svg>
  );
}

/** A simple compass rose for the intro-card vista. */
function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <circle cx="48" cy="48" r="42" fill="#F6ECCF" stroke="#9c7406" strokeWidth="3" />
      <circle
        cx="48"
        cy="48"
        r="34"
        fill="none"
        stroke="#C9A85B"
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />
      <path d="M48 16 L56 48 L48 80 L40 48 Z" fill="#C24A40" />
      <path d="M16 48 L48 40 L80 48 L48 56 Z" fill="#2E4A38" opacity="0.85" />
      <circle cx="48" cy="48" r="4.5" fill="#9c7406" />
    </svg>
  );
}
