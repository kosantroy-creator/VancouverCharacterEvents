import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Calendar,
  Check,
  CloudRain,
  Compass,
  Droplets,
  Fish,
  LifeBuoy,
  Mail,
  Minus,
  Plus,
  Shell,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";
import { OceanDecor } from "./OceanDecor";
import { cn } from "@/lib/utils";

/**
 * MermaidFaq — "Cove Details": the practical FAQ that closes booking hesitation
 * before the final CTA. A polished Cove Guide spread — a sticky "Need-to-Know
 * Pool Details" intro card on the left and an accessible poolside-guide accordion
 * on the right. Each row is a keyboard-operable <button> with aria-expanded /
 * aria-controls; answers open with a smooth grid-rows height + opacity transition.
 * Safety wording is careful ("where pool rules and setup allow"; lifeguard /
 * supervision stays with the venue/host). VISIBLE BY DEFAULT (hidden only under
 * `.mfq.anim:not(.is-in)`), reduced-motion safe. See "MERMAID COVE FAQ" in
 * styles.css.
 */
type IconType = ComponentType<{ className?: string }>;

const CHECKLIST = [
  "Public & private pools",
  "Swimming mermaids",
  "Pirate support included",
  "Pool rules respected",
  "Summer party ready",
];

const FAQS: { icon: IconType; q: string; a: string }[] = [
  {
    icon: Waves,
    q: "Can mermaids swim with the children?",
    a: "Yes. Mermaid Cove visits are designed around real swimming mermaids. The mermaid can join the children in the pool for guided swim moments, games, photos, and magical interactions where pool rules and setup allow.",
  },
  {
    icon: Shell,
    q: "What kind of pool do we need?",
    a: "Public pools, private pools, community pools, and some resort or club pools can work. The best setup depends on pool rules, space, access, group size, and supervision requirements. If you are unsure, send us the pool details and we can help confirm.",
  },
  {
    icon: Droplets,
    q: "Can you come to a public pool?",
    a: "Yes, if the pool allows outside entertainment and the event host has permission from the facility. Some public pools have specific rules for performers, photography, group activities, and supervision, so we recommend confirming with the pool before booking.",
  },
  {
    icon: LifeBuoy,
    q: "Do you provide lifeguards?",
    a: "No. Mermaid Cove is an entertainment experience. Pool supervision and lifeguard requirements remain the responsibility of the venue, facility, or event host according to pool rules. Our pirate helpers support the entertainment flow and help the mermaid on land, but they do not replace required water safety supervision.",
  },
  {
    icon: Fish,
    q: "Are mermaid rides always included?",
    a: "Mermaid rides may be included where pool rules, setup, age range, and safety conditions allow. If rides are not appropriate for the pool or group, we can focus on swim moments, games, photos, songs, stories, and other magical activities instead.",
  },
  {
    icon: PirateHat,
    q: "What does the pirate handler do?",
    a: "The pirate helper supports the mermaid on land, gathers the children, leads treasure games and poolside activities, helps with transitions, and keeps the adventure moving between swim moments.",
  },
  {
    icon: Sparkles,
    q: "What ages is Mermaid Cove best for?",
    a: "Mermaid Cove is especially popular with younger children and elementary-age kids, but it can be adapted for different groups. The style of visit can be softer, more playful, or more story-based depending on the age range.",
  },
  {
    icon: CloudRain,
    q: "What happens if it rains?",
    a: "Outdoor pool events should have a weather backup plan. Depending on the pool, venue, and conditions, we may be able to adjust timing, move to a covered or indoor area, or discuss alternate options before the event.",
  },
  {
    icon: Star,
    q: "Can we choose the mermaid?",
    a: "You can request a preferred mermaid, and we will do our best to match your request based on availability. If your first choice is unavailable, we can recommend another mermaid style that fits your party.",
  },
  {
    icon: Calendar,
    q: "How far in advance should we book?",
    a: "Summer dates and weekend pool-party times can book quickly. The earlier you inquire, the better chance we have of matching your preferred date, time, mermaid, and package.",
  },
  {
    icon: Mail,
    q: "What happens after I send an inquiry?",
    a: "We'll review your event date, pool location, group size, package interest, and any special requests. Then we'll help confirm availability, discuss pool requirements, and recommend the right Mermaid Cove option.",
  },
];

const BUBBLES = [
  { left: "8%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "27%", s: 6, delay: "3.6s", dur: "20s", dx: "-9px" },
  { left: "49%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "70%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "88%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

export function MermaidFaq() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  // One row open at a time (collapsible). Default the second question open so the
  // open-state styling is visible on first paint — mirrors the reference spread.
  const [open, setOpen] = useState<number | null>(1);

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
      aria-labelledby="mfq-title"
      className={cn("mfq relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mfq-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,40 C250,84 520,6 760,32 C1010,58 1230,92 1440,52 L1440,0 L0,0 Z"
            fill="#97D6E7"
          />
        </svg>
      </div>

      <div aria-hidden className="mfq-bg absolute inset-0" />
      <div aria-hidden className="mfq-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mfq-surface pointer-events-none absolute inset-x-0 top-0" />
      <OceanDecor variant="b" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mfq-bubble"
            style={{
              left: b.left,
              width: b.s,
              height: b.s,
              animationDelay: b.delay,
              animationDuration: b.dur,
              ["--dx" as string]: b.dx,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mfq-head mx-auto max-w-2xl text-center">
          <span className="mfq-eyebrow">
            <span aria-hidden className="mfq-eyebrow-rule" />
            Cove Details
            <span aria-hidden className="mfq-eyebrow-rule" />
          </span>
          <h2 id="mfq-title" className="mfq-title">
            Everything Parents Ask Before Booking Mermaid Cove
          </h2>
          <p className="mfq-sub">
            Helpful notes about pools, supervision, mermaid rides, pirate support, and what to
            expect when ocean magic arrives.
          </p>
        </div>

        {/* the cove-guide spread */}
        <div className="mfq-grid mt-12 md:mt-14">
          {/* left — sticky cove-guide intro card */}
          <div className="mfq-aside">
            <div className="mfq-card">
              <span className="mfq-badge">
                <Shell className="h-3.5 w-3.5" aria-hidden />
                Cove Guide
              </span>
              <h3 className="mfq-card-h">Need-to-Know Pool Details</h3>
              <span aria-hidden className="mfq-card-rule" />
              <p className="mfq-card-p">
                Every Mermaid Cove visit is planned around your pool, group size, age range, and
                event style. We&apos;ll help confirm what works best before your booking is
                finalized.
              </p>

              <ul className="mfq-checks">
                {CHECKLIST.map((c) => (
                  <li key={c} className="mfq-check">
                    <span aria-hidden className="mfq-check-ic">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>

              <span aria-hidden className="mfq-compass">
                <Compass className="h-9 w-9" />
              </span>

              <p className="mfq-card-note">
                Pool supervision and lifeguard requirements remain the responsibility of the venue
                or event host according to pool rules.
              </p>
            </div>
          </div>

          {/* right — FAQ accordion */}
          <ul className="mfq-list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className={cn("mfq-item", isOpen && "is-open")}
                  style={{ ["--i" as string]: i }}
                >
                  <button
                    type="button"
                    className="mfq-q"
                    aria-expanded={isOpen}
                    aria-controls={`mfq-a-${i}`}
                    id={`mfq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span aria-hidden className="mfq-q-ic">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <span className="mfq-q-text">{f.q}</span>
                    <span aria-hidden className="mfq-toggle">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    id={`mfq-a-${i}`}
                    role="region"
                    aria-labelledby={`mfq-q-${i}`}
                    className="mfq-a"
                  >
                    <div className="mfq-a-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* A small, friendly pirate-hat ornament (decorative, currentColor). */
function PirateHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 5.2c-2.6 0-4.4 1.7-5 4.3-1-.2-2.1-.1-3.1.3-.9.4-.9.8-.1 1.2 2.2 1.1 5 1.7 8.2 1.7s6-.6 8.2-1.7c.8-.4.8-.8-.1-1.2-1-.4-2.1-.5-3.1-.3-.6-2.6-2.4-4.3-5-4.3z" />
    </svg>
  );
}
