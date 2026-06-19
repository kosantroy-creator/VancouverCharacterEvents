import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  Award,
  BookOpen,
  Camera,
  Check,
  Clock,
  Egg,
  Eye,
  Handshake,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";

/**
 * DinoComparison — "Why Harvey Feels Different". A premium expedition-dossier
 * field report (not a generic comparison table): a respectful, pale "Typical
 * Dinosaur Visit" card beside the emphasized, jungle-green "Harvey Expedition"
 * card — amber glow frame, gold medallions + check stamps, field-guide stamps
 * (Trainer-Led / 13 FT / Big Reveal), and a footprint trail transforming a simple
 * visit into a full expedition. Aged-parchment ground, corner foliage. Reveals are
 * IntersectionObserver-driven and visible-by-default, so reduced-motion / pre-JS
 * render gets it composed & still. See the "DINO COMPARISON" CSS block.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

/** A 3-toed dinosaur track. */
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

const TYPICAL: { icon: IconType; label: string }[] = [
  { icon: Clock, label: "Quick appearance" },
  { icon: Handshake, label: "Basic meet and greet" },
  { icon: Camera, label: "Simple photos" },
  { icon: Workflow, label: "Little structure" },
  { icon: BookOpen, label: "Minimal story or buildup" },
];

const HARVEY: { icon: IconType; label: string }[] = [
  { icon: DinoTrack, label: "13-foot T-Rex encounter" },
  { icon: Users, label: "Two safari trainers on-site" },
  { icon: Award, label: "Junior Dinosaur Trainer Academy" },
  { icon: Eye, label: "Big reveal moment" },
  { icon: Egg, label: "Commands, clues, eggs, fossils, and story" },
  { icon: Camera, label: "Organized photos + birthday child feature moment" },
  { icon: ShieldCheck, label: "Family-friendly safety built into the experience" },
];

export function DinoComparison() {
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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="cmp-title"
      className={cn("cmp relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* aged-parchment ground + faint tracks + corner foliage */}
      <div aria-hidden className="cmp-paper absolute inset-0" />
      <div aria-hidden className="cmp-tex pointer-events-none absolute inset-0" />
      <div aria-hidden className="cmp-prints pointer-events-none absolute inset-0">
        <DinoTrack className="absolute left-[6%] top-[40%] w-7 rotate-[18deg]" />
        <DinoTrack className="absolute left-[12%] top-[58%] w-6 -rotate-[8deg]" />
        <DinoTrack className="absolute right-[8%] top-[18%] w-7 rotate-[24deg]" />
        <DinoTrack className="absolute right-[14%] bottom-[16%] w-6 -rotate-[12deg]" />
      </div>
      <div aria-hidden className="cmp-frond cmp-frond-bl">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>
      <div aria-hidden className="cmp-frond cmp-frond-br">
        <Frond fill="#3E5E32" className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="cmp-eyebrow">Field Guide 02</span>
          <h2 id="cmp-title" className="cmp-title">
            Why Harvey Feels Different
          </h2>
          <p className="cmp-tagline">Not a Mascot. A Full Dinosaur Encounter.</p>
          <p className="cmp-sub">
            A trainer-led experience built around story, safety, reactions, and the reveal moment
            kids remember.
          </p>
        </div>

        {/* the dossier */}
        <div className="cmp-grid mt-12 md:mt-14">
          {/* LEFT — typical visit */}
          <article className="cmp-card-frame cmp-left-frame">
            <div className="cmp-card cmp-left">
              <h3 className="cmp-card-h">Typical Dinosaur Visit</h3>
              <ul className="cmp-list">
                {TYPICAL.map((p, i) => (
                  <li key={p.label} className="cmp-row" style={{ "--i": i } as Vars}>
                    <span className="cmp-ic-dim">
                      <p.icon className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <span className="cmp-row-label">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* CENTER — the transformation (desktop) */}
          <div aria-hidden className="cmp-mid">
            <span className="cmp-mid-note cmp-mid-note-top">From a simple visit…</span>
            <svg viewBox="0 0 60 200" preserveAspectRatio="xMidYMid meet" className="cmp-mid-trail">
              {[
                { x: 30, y: 38, r: 18 },
                { x: 22, y: 64, r: -8 },
                { x: 34, y: 88, r: 22 },
                { x: 26, y: 112, r: -10 },
                { x: 36, y: 136, r: 16 },
              ].map((f, i) => (
                <g
                  key={i}
                  className="cmp-mid-print"
                  style={{ "--i": i } as Vars}
                  transform={`translate(${f.x} ${f.y}) rotate(${f.r}) scale(0.16)`}
                  fill="rgba(110,80,40,0.55)"
                >
                  <ellipse cx="40" cy="74" rx="19" ry="23" />
                  <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
                  <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
                  <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
                </g>
              ))}
              <path
                className="cmp-mid-arrow"
                d="M24 160 q14 8 20 20"
                fill="none"
                stroke="#9c7406"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                className="cmp-mid-arrow"
                d="M44 180 l1 -8 m-1 8 l-7 -3"
                fill="none"
                stroke="#9c7406"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="cmp-mid-note cmp-mid-note-bot">…to a full expedition</span>
          </div>

          {/* RIGHT — the Harvey Expedition */}
          <article className="cmp-card-frame cmp-harvey-frame">
            <div className="cmp-card cmp-harvey">
              {/* field-guide stamps */}
              <span className="cmp-stamp cmp-stamp-trainer">
                <span className="cmp-stamp-stars">★★★</span>
                <span className="cmp-stamp-lg">Trainer-Led</span>
                <span className="cmp-stamp-sm">Attraction</span>
              </span>
              <span className="cmp-stamp cmp-stamp-13ft">
                <span className="cmp-stamp-xl">13 FT</span>
                <span className="cmp-stamp-sm">Encounter</span>
              </span>
              <span className="cmp-stamp cmp-stamp-reveal">Big Reveal</span>

              <h3 className="cmp-card-h cmp-card-h-gold">The Harvey Expedition</h3>
              <ul className="cmp-list">
                {HARVEY.map((p, i) => (
                  <li key={p.label} className="cmp-row cmp-row-gold" style={{ "--i": i } as Vars}>
                    <span className="cmp-ic-gold">
                      <p.icon className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <span className="cmp-row-label-light">{p.label}</span>
                    <span className="cmp-check" aria-hidden>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* ticket-stub callout */}
        <div className="cmp-ticket">
          <DinoTrack className="cmp-ticket-print" />
          <span className="cmp-ticket-text">
            Built like an attraction, delivered to your event.
          </span>
          <a href="#expedition" className="cmp-ticket-cta">
            Choose Your Expedition <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
