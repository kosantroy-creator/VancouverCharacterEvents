import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type RefObject,
} from "react";
import {
  ArrowRight,
  Camera,
  DoorOpen,
  Footprints,
  Leaf,
  ShieldCheck,
  Tent,
  Users,
  Volume2,
} from "lucide-react";
import gsap from "gsap";
import { CTAButton } from "./CTAButton";
import { Frond } from "./HarveyHero";
import { cn } from "@/lib/utils";
import harveyMeet from "@/assets/dinosaur/harvey-meet.webp";

/**
 * HarveyReveal — the cinematic, scroll-led pay-off that follows the eye section.
 * It withholds the full dinosaur through two suspense beats, then brightens into
 * the reveal:
 *
 *   2 · Trail Signs   — footprints press in along the path, mist drifts, foliage
 *                       shifts; "the trail changes… the trainers know he's close."
 *   3 · Shadow Moment — a massive soft T-Rex silhouette looms behind blurred
 *                       leaves and mist as you scroll; "he's closer than you think."
 *   4 · Meet Harvey   — the FLAGSHIP moment: a jungle "viewing blind". Harvey
 *                       already sits in the image behind a leafy, misty, lantern-
 *                       lit cover. Clicking "Open the Viewing Gate" runs a ~1.6s
 *                       GSAP sequence (shake → fog → passing shadow → the leaf
 *                       panels split & slide outward → sunlight) that reveals him;
 *                       the label + Book/Packages CTAs become the conversion payoff.
 *
 * Motion is scroll-led but ROBUST: entrances are IntersectionObserver-driven
 * (`.is-in`) and the shadow's loom is driven by a rAF-throttled scroll-progress
 * var (`--sp`). Every layer is VISIBLE BY DEFAULT — the pre-entrance hidden state
 * only applies while `.anim` is present (added on mount when motion is allowed)
 * AND the beat is `:not(.is-in)`. So reduced-motion users, and anyone before JS
 * runs, get the whole sequence composed, bright and still. No horror, no jump
 * scares; warm cream/amber → moss/jungle → warm gold. See the "HARVEY REVEAL"
 * block in styles.css. Backgrounds are seam-matched per beat (no hard lines).
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

/** True once mounted with motion allowed — gates the `.anim` choreography class. */
function useMotionOK() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return ok;
}

/** Adds `is-in` once the element scrolls into view (immediately under reduced-motion / no-IO). */
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* The footprints receding up the path — smaller and fainter into the distance.
   They press in one after another as the trail beat scrolls in. */
const PRINTS = [
  { left: "44%", bottom: "6%", w: 92, rot: -6, delay: 0 },
  { left: "55%", bottom: "20%", w: 74, rot: 8, delay: 220 },
  { left: "47%", bottom: "33%", w: 58, rot: -4, delay: 440 },
  { left: "56%", bottom: "44%", w: 44, rot: 10, delay: 660 },
  { left: "50%", bottom: "53%", w: 33, rot: -6, delay: 880 },
];

/** A single pressed three-toed print (same shape as the eye section's). */
function Print({ className, style }: { className?: string; style?: Vars }) {
  return (
    <svg viewBox="0 0 80 104" className={className} style={style} aria-hidden="true">
      <g fill="rgba(58,38,22,0.55)">
        <ellipse cx="40" cy="74" rx="20" ry="24" />
        <path d="M40 56 C30 40 24 22 30 12 C36 4 44 4 50 12 C56 22 50 40 40 56 Z" />
        <path d="M22 64 C10 54 4 40 8 30 C12 22 22 22 26 32 C30 44 30 56 22 64 Z" />
        <path d="M58 64 C70 54 76 40 72 30 C68 22 58 22 54 32 C50 44 50 56 58 64 Z" />
      </g>
    </svg>
  );
}

const STATS: { icon: IconType; label: string; note: string }[] = [
  { icon: Footprints, label: "13-Foot T-Rex", note: "A towering, life-sized presence" },
  { icon: Users, label: "Two Trainers On-Site", note: "Guided, staffed and safe" },
  { icon: Volume2, label: "Roars & Movement", note: "He stomps, turns and roars" },
  { icon: Tent, label: "Indoor & Outdoor Encounters", note: "Venues, parks and backyards" },
  { icon: Camera, label: "Built for Photos", note: "Unforgettable photo moments" },
  { icon: ShieldCheck, label: "Family-Friendly Safety First", note: "Built for young explorers" },
];

/* Fern silhouettes lining each gate's inner edge — the "leaves" the visitor
   parts. The right gate mirrors the left. */
const GATE_FRONDS = [
  { y: "-8%", w: 250, rot: 22, fill: "#1B2C15", op: 0.96 },
  { y: "20%", w: 196, rot: -12, fill: "#16250F", op: 0.92 },
  { y: "46%", w: 264, rot: 16, fill: "#1B2C15", op: 0.96 },
  { y: "74%", w: 208, rot: -20, fill: "#16250F", op: 0.92 },
];

function GateFronds({ side }: { side: "l" | "r" }) {
  const edge = side === "l" ? "right" : "left";
  return (
    <>
      {GATE_FRONDS.map((f, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute"
          style={
            {
              top: f.y,
              [edge]: "-16%",
              width: f.w,
              transform: `scaleX(${side === "l" ? 1 : -1}) rotate(${f.rot}deg)`,
              transformOrigin: `${edge} center`,
            } as Vars
          }
        >
          <Frond className="block h-auto w-full" fill={f.fill} style={{ opacity: f.op } as Vars} />
        </div>
      ))}
    </>
  );
}

/* A large, soft T-Rex silhouette (facing left) — deep jungle green, never black,
   blurred so it reads as a shape glimpsed through the foliage, not a hard cutout. */
function HarveyShadow() {
  return (
    <svg
      viewBox="0 0 640 420"
      preserveAspectRatio="xMidYMax meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M70 124 C58 96 92 58 150 56 C188 54 218 70 232 102 C246 132 250 152 292 166
           C362 150 432 160 482 212 C542 252 600 304 632 410 L556 410
           C520 346 472 326 432 326 C432 364 422 410 382 410 L330 410
           C322 368 322 336 300 306 C272 286 250 256 240 214
           C220 204 176 198 150 184 C112 172 82 152 70 124 Z"
        fill="var(--hvr-shadow)"
      />
    </svg>
  );
}

export function HarveyReveal() {
  const motionOK = useMotionOK();
  const rootRef = useRef<HTMLDivElement>(null);
  const shadowBeatRef = useRef<HTMLElement>(null);

  const [trailRef, trailIn] = useInView<HTMLElement>(0.3);
  const [shadowRef, shadowIn] = useInView<HTMLElement>(0.3);
  const [revealRef, revealIn] = useInView<HTMLElement>(0.3);

  // The flagship moment is INTENTIONAL and CINEMATIC. Three phases:
  //   idle     — Harvey hides behind the misty leafy viewing gate.
  //   opening  — a ~1.6s GSAP sequence runs (shake → fog → shadow → gates split).
  //   revealed — Harvey is shown; label + CTAs become the conversion payoff.
  // Once revealed he stays revealed.
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">("idle");
  const cardRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const fallbackRef = useRef<number | undefined>(undefined);
  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(
    () => () => {
      tlRef.current?.kill();
      window.clearTimeout(fallbackRef.current);
    },
    [],
  );

  // The visitor "opens the viewing gate". Reduced-motion (or no card) reveals
  // instantly; otherwise a transform-based GSAP timeline runs the encounter.
  const openGate = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    const card = cardRef.current;
    if (reducedRef.current || !card) {
      setPhase("revealed");
      return;
    }
    const q = (s: string) => card.querySelector<HTMLElement>(s);
    const qa = (s: string) => Array.from(card.querySelectorAll<HTMLElement>(s));
    const small = window.matchMedia("(max-width: 640px)").matches;
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        window.clearTimeout(fallbackRef.current);
        setPhase("revealed");
      },
    });
    // 0.0 button text already flips via state; the center plate fades out
    tl.to(q(".hvr-cover-center"), { autoAlpha: 0, duration: 0.3 }, 0.05);
    // 0.2 subtle card shake (gentler on mobile) + lantern flare
    tl.to(
      card,
      {
        x: small ? -2.5 : -6,
        duration: 0.06,
        repeat: small ? 3 : 5,
        yoyo: true,
        ease: "sine.inOut",
      },
      0.2,
    ).set(card, { x: 0 });
    tl.to(qa(".hvr-lantern"), { opacity: 1.15, duration: 0.12, repeat: 3, yoyo: true }, 0.2);
    // 0.4 fog thickens across the card
    tl.to(q(".hvr-fog"), { opacity: 1, duration: 0.4 }, 0.4);
    // 0.6 a large shadow passes behind the leaves
    tl.fromTo(
      q(".hvr-pass"),
      { xPercent: -48, opacity: 0 },
      { xPercent: 26, opacity: 0.6, duration: 0.7, ease: "sine.inOut" },
      0.55,
    ).to(q(".hvr-pass"), { opacity: 0, duration: 0.35 }, 1.05);
    // 0.8–1.0 the leafy cover splits from the center and slides outward
    tl.to(q(".hvr-blind-l"), { xPercent: -112, duration: 0.9, ease: "power3.inOut" }, 0.8);
    tl.to(q(".hvr-blind-r"), { xPercent: 112, duration: 0.9, ease: "power3.inOut" }, 0.8);
    tl.to(qa(".hvr-lantern"), { opacity: 0, duration: 0.5 }, 1.0);
    tl.to([q(".hvr-cover-hint"), q(".hvr-glint")], { opacity: 0, duration: 0.5 }, 1.0);
    // 1.1 fog clears as Harvey is revealed underneath
    tl.to(q(".hvr-fog"), { opacity: 0, duration: 0.6 }, 1.15);
    // 1.6 warm sunlight glow + dust clearing settles over the image
    tl.fromTo(q(".hvr-sun"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.2).to(
      q(".hvr-sun"),
      { opacity: 0.32, duration: 0.7 },
      1.8,
    );
    tlRef.current = tl;
    // Safety net: if the rAF ticker is ever throttled (e.g. a backgrounded tab),
    // still resolve to the revealed state so Harvey always appears.
    fallbackRef.current = window.setTimeout(() => setPhase("revealed"), 2600);
  };
  const revealed = phase === "revealed";

  // Keep the shadow-beat ref in sync with the in-view ref (same element).
  const setShadowRefs = (el: HTMLElement | null) => {
    (shadowRef as RefObject<HTMLElement | null>).current = el;
    shadowBeatRef.current = el;
  };

  // Scroll-progress (0→1) of the shadow beat through the viewport → `--sp` on the
  // root, used to drift + loom the silhouette. rAF-throttled, passive, transform
  // only. Skipped entirely under reduced motion (silhouette rests composed).
  useEffect(() => {
    if (!motionOK) return;
    const root = rootRef.current;
    const beat = shadowBeatRef.current;
    if (!root || !beat) return;

    let raf = 0;
    const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
    const measure = () => {
      raf = 0;
      const rect = beat.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = clamp((vh - rect.top) / (vh + rect.height));
      root.style.setProperty("--sp", p.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [motionOK]);

  return (
    <div ref={rootRef} className={cn("hvr", motionOK && "anim")} style={{ "--sp": 0 } as Vars}>
      {/* ============================ BEAT 2 · TRAIL SIGNS ============================ */}
      <section
        ref={trailRef}
        aria-label="Signs on the trail — Harvey is close"
        className={cn("hvr-beat hvr-trail", trailIn && "is-in")}
        style={{
          background: "linear-gradient(180deg, #5E8240 0%, #557B45 26%, #4A6F3C 60%, #3E5E32 100%)",
        }}
      >
        {/* warm amber light filtering through the canopy (behind everything) */}
        <div
          aria-hidden
          className="hvr-fade pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 40% at 26% 8%, rgba(255,228,160,0.5) 0%, rgba(255,210,130,0.16) 40%, transparent 72%)",
          }}
        />
        {/* drifting mist low on the path */}
        <div
          aria-hidden
          className="hvr-mist hvr-fade pointer-events-none absolute inset-x-[-8%] bottom-[8%] h-[34%]"
          style={{
            background:
              "radial-gradient(60% 100% at 32% 60%, rgba(231,238,214,0.55), transparent 72%), radial-gradient(52% 100% at 74% 50%, rgba(231,238,214,0.4), transparent 74%)",
            filter: "blur(16px)",
          }}
        />

        {/* the receding line of footprints (behind the copy, never over it) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
          {PRINTS.map((p, i) => (
            <div
              key={i}
              className="hvr-print absolute"
              style={
                {
                  left: p.left,
                  bottom: p.bottom,
                  width: p.w,
                  transform: `rotate(${p.rot}deg)`,
                  "--print-delay": `${p.delay}ms`,
                } as Vars
              }
            >
              <Print className="h-auto w-full" />
            </div>
          ))}
        </div>

        {/* foliage shifting slightly at the lower edges — local to this beat, behind text */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="hvr-leaf absolute -left-[3%] bottom-[-12%] w-[230px]"
            style={{ "--leaf-d": "9s" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#3E5E32"
              style={{ opacity: 0.85 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute left-[8%] bottom-[-16%] w-[180px]"
            style={{ "--leaf-d": "11s", "--leaf-delay": "1.2s" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#34502B"
              style={{ opacity: 0.8 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute right-[-2%] bottom-[-12%] w-[240px]"
            style={{ "--leaf-d": "10s", "--leaf-delay": "0.6s" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#3E5E32"
              style={{ opacity: 0.85 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute right-[10%] bottom-[-15%] w-[176px]"
            style={{ "--leaf-d": "12s", "--leaf-delay": "1.6s" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#34502B"
              style={{ opacity: 0.78 } as Vars}
            />
          </div>
        </div>

        {/* lower seam — settle to the shadow beat's top green so the boundary is
            seamless and the clipped fronds dissolve into it (no hard line) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36"
          style={{ background: "linear-gradient(180deg, transparent 0%, #3E5E32 100%)" }}
        />

        {/* COPY */}
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-28 text-center sm:px-6 md:py-36 lg:px-8">
          <span className="hvr-rise t-engrave inline-flex items-center gap-2 text-[0.64rem] tracking-[0.32em] text-[#F4E2A6]">
            <Leaf className="h-3 w-3 text-[#A9C98A]" aria-hidden />
            Field Note 02 · The Trail Changes
            <Leaf className="h-3 w-3 -scale-x-100 text-[#A9C98A]" aria-hidden />
          </span>
          <p
            className="hvr-rise mx-auto mt-5 max-w-2xl font-display text-[clamp(1.7rem,4vw,2.9rem)] font-semibold leading-[1.16] text-[#FBF6EC]"
            style={{ "--rise-delay": "120ms" } as Vars}
          >
            The trail changes. The leaves move.{" "}
            <span className="italic text-[#F2C75B]">The trainers know Harvey is close.</span>
          </p>
          <p
            className="hvr-rise mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-[#E7EFD6]/85"
            style={{ "--rise-delay": "260ms" } as Vars}
          >
            Fresh three-toed prints press into the path, deeper and closer with every step.
          </p>
        </div>
      </section>

      {/* =========================== BEAT 3 · SHADOW MOMENT =========================== */}
      <section
        ref={setShadowRefs}
        aria-label="A massive shadow moves behind the leaves"
        className={cn("hvr-beat hvr-shadow", shadowIn && "is-in")}
        style={{
          background: "linear-gradient(180deg, #3E5E32 0%, #314A28 34%, #26391F 70%, #22351C 100%)",
        }}
      >
        {/* warm amber backlight that the silhouette is read against (never black) */}
        <div
          aria-hidden
          className="hvr-fade pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 56% at 60% 42%, rgba(217,154,50,0.34) 0%, rgba(180,120,40,0.12) 44%, transparent 74%)",
          }}
        />

        {/* THE SILHOUETTE — large, only partly in frame (suggesting scale), drifting
            and looming with scroll via --sp. Soft + blurred = behind the leaves. */}
        <div
          aria-hidden
          className="hvr-silhouette pointer-events-none absolute bottom-0 left-1/2 z-0 h-[78%] w-[min(120vw,1100px)]"
        >
          <HarveyShadow />
        </div>

        {/* drifting mist over the silhouette so it stays half-hidden */}
        <div
          aria-hidden
          className="hvr-mist pointer-events-none absolute inset-x-[-10%] bottom-[6%] z-[1] h-[42%]"
          style={
            {
              "--mist-d": "30s",
              background:
                "radial-gradient(60% 100% at 40% 60%, rgba(210,222,190,0.4), transparent 72%), radial-gradient(54% 100% at 76% 50%, rgba(210,222,190,0.32), transparent 74%)",
              filter: "blur(20px)",
            } as Vars
          }
        />

        {/* blurred foreground fronds the shadow passes BEHIND */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          <div
            className="hvr-leaf absolute -left-[5%] bottom-[-16%] w-[320px]"
            style={{ "--leaf-d": "8.5s", filter: "blur(2px)" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#1B2C15"
              style={{ opacity: 0.92 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute left-[16%] bottom-[-20%] w-[270px]"
            style={{ "--leaf-d": "9.6s", "--leaf-delay": "0.8s", filter: "blur(2px)" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#16250F"
              style={{ opacity: 0.9 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute right-[-4%] bottom-[-16%] w-[330px]"
            style={{ "--leaf-d": "8.9s", "--leaf-delay": "0.4s", filter: "blur(2px)" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#1B2C15"
              style={{ opacity: 0.92 } as Vars}
            />
          </div>
          <div
            className="hvr-leaf absolute right-[18%] bottom-[-19%] w-[260px]"
            style={{ "--leaf-d": "10.4s", "--leaf-delay": "1.3s", filter: "blur(2px)" } as Vars}
          >
            <Frond
              className="block h-auto w-full"
              fill="#16250F"
              style={{ opacity: 0.9 } as Vars}
            />
          </div>
        </div>

        {/* lower seam — settle to the reveal beat's dark top so the silhouette's
            base and the clipped fronds sink into shadow (no hard line) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-44"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #22351C 88%, #22351C 100%)",
          }}
        />

        {/* COPY */}
        <div className="relative z-10 mx-auto flex min-h-[72svh] w-full max-w-[1180px] flex-col items-center justify-center px-5 py-28 text-center sm:px-6 md:py-36 lg:px-8">
          <span className="hvr-rise t-engrave inline-flex items-center gap-2 text-[0.64rem] tracking-[0.32em] text-[#E7C271]">
            <Leaf className="h-3 w-3 text-[#C9A24E]" aria-hidden />
            Field Note 03 · Something Immense
            <Leaf className="h-3 w-3 -scale-x-100 text-[#C9A24E]" aria-hidden />
          </span>
          <p
            className="hvr-rise mt-5 font-display text-[clamp(2.1rem,5.4vw,3.8rem)] font-semibold leading-[1.06] text-[#FBF6EC]"
            style={{ "--rise-delay": "140ms", textShadow: "0 2px 30px rgba(0,0,0,0.45)" } as Vars}
          >
            He&apos;s closer than <span className="italic text-[#F2C75B]">you think.</span>
          </p>
        </div>
      </section>

      {/* ============================ BEAT 4 · MEET HARVEY ============================ */}
      <section
        ref={revealRef}
        id="meet-harvey"
        aria-labelledby="meet-harvey-title"
        className={cn(
          "hvr-beat hvr-reveal scroll-mt-24",
          revealIn && "is-in",
          revealed && "is-revealed",
        )}
        style={{
          background:
            "linear-gradient(180deg, #22351C 0%, #3C4A24 22%, #8C7233 50%, #E8CE8E 76%, #FFFCF6 100%)",
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-24 pt-24 sm:px-6 md:pb-28 md:pt-28 lg:px-8">
          {/* heading — always visible, above the viewing gate */}
          <div className="text-center">
            <p className="hvr-rise t-engrave text-[0.62rem] tracking-[0.34em] text-[#F4E2A6]">
              The Reveal · Field Note 04
            </p>
            <h2
              id="meet-harvey-title"
              className="hvr-rise mt-2 font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.98] text-[#FFFCF6]"
              style={{ "--rise-delay": "120ms", textShadow: "0 4px 30px rgba(0,0,0,0.4)" } as Vars}
            >
              Meet <span className="text-[#F2C75B]">Harvey</span>
            </h2>
            <p
              className="hvr-rise mx-auto mt-3 max-w-xl font-display text-[1.15rem] italic text-[#FBF6EC]/90"
              style={{ "--rise-delay": "200ms", textShadow: "0 2px 18px rgba(0,0,0,0.35)" } as Vars}
            >
              The reveal moment everyone remembers.
            </p>
          </div>

          {/* THE VIEWING GATE — Harvey already sits behind the leafy, misty cover;
              clicking "Open the Viewing Gate" runs a short cinematic sequence that
              parts the blind and reveals him. */}
          <figure className="hvr-frame relative mt-9 overflow-hidden rounded-[28px] shadow-[0_44px_96px_-42px_rgba(20,30,16,0.85)] ring-1 ring-[#3E5E32]/35">
            <div ref={cardRef} className="hvr-card-inner relative">
              <img
                src={harveyMeet}
                alt="Harvey, our life-sized T-Rex, meeting a safari trainer on a sunlit forest trail at golden hour"
                width={1672}
                height={941}
                className="block aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
              {/* warm sunlight glow + dust that clears over Harvey at the end */}
              <span
                aria-hidden
                className="hvr-sun pointer-events-none absolute inset-0 z-[2]"
                style={{
                  background:
                    "radial-gradient(75% 95% at 50% 8%, rgba(255,234,170,0.6), transparent 62%)",
                }}
              />
              {/* the conversion label, settles in after the reveal */}
              <figcaption className="hvr-cap pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-[linear-gradient(0deg,rgba(18,28,15,0.86),rgba(18,28,15,0.45)_55%,transparent)] px-6 pb-6 pt-20 text-left md:px-9 md:pb-7">
                <p className="t-engrave text-[0.7rem] font-bold tracking-[0.28em] text-[#F4E2A6]">
                  HARVEY — OUR 13-FOOT T-REX
                </p>
                <p className="mt-1.5 max-w-xl text-[0.92rem] leading-relaxed text-[#EAF1DD]">
                  A realistic dinosaur encounter for birthdays, schools, festivals, and special
                  events.
                </p>
              </figcaption>

              {/* ===== THE COVER — the leafy viewing blind that parts on click ===== */}
              <div
                className={cn("hvr-cover", revealed && "is-revealed")}
                aria-hidden={revealed || undefined}
              >
                {/* the dark Harvey silhouette behind the leaves + a subtle eye glint */}
                <span aria-hidden className="hvr-cover-hint">
                  <HarveyShadow />
                </span>
                <span aria-hidden className="hvr-glint" />
                {/* a larger shadow that passes behind the leaves mid-sequence */}
                <span aria-hidden className="hvr-pass">
                  <HarveyShadow />
                </span>
                {/* the two leafy/fog panels that split from the center and slide out */}
                <div aria-hidden className="hvr-blind hvr-blind-l">
                  <GateFronds side="l" />
                </div>
                <div aria-hidden className="hvr-blind hvr-blind-r">
                  <GateFronds side="r" />
                </div>
                {/* drifting fog inside the card (thickens, then clears) */}
                <span aria-hidden className="hvr-fog" />
                {/* soft lantern flicker on each side */}
                <span aria-hidden className="hvr-lantern hvr-lantern-l" />
                <span aria-hidden className="hvr-lantern hvr-lantern-r" />
                {/* center plate — microcopy + the themed gate button */}
                <div className="hvr-cover-center">
                  <p className="t-engrave text-[0.62rem] tracking-[0.32em] text-[#E7C271]">
                    The Viewing Blind
                  </p>
                  <p
                    className="mt-2 max-w-sm font-display text-[clamp(1.15rem,2.6vw,1.7rem)] font-semibold leading-snug text-[#FBF6EC]"
                    style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
                  >
                    A 13-foot encounter is waiting beyond the leaves.
                  </p>
                  <button
                    type="button"
                    onClick={openGate}
                    disabled={phase !== "idle"}
                    aria-expanded={revealed}
                    aria-label="Open the viewing gate to reveal Harvey, our 13-foot T-Rex"
                    tabIndex={revealed ? -1 : undefined}
                    className="hvr-gate-btn group mt-6"
                  >
                    <DoorOpen
                      className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                      aria-hidden
                    />
                    {phase === "opening" ? "Stand back…" : "Open the Viewing Gate"}
                  </button>
                </div>
              </div>
            </div>
          </figure>

          {/* stat badges — appear one by one after the reveal */}
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3">
            {STATS.map((s, i) => (
              <StatCard key={s.label} icon={s.icon} label={s.label} note={s.note} index={i} />
            ))}
          </ul>

          {/* CTAs — the conversion payoff, appear after the reveal */}
          <div className="hvr-cta mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              to="/contact"
              size="lg"
              className="group !bg-[#D4A017] !text-[#2A1C05] hover:!bg-[#D99A32] hover:!shadow-[0_0_34px_rgba(212,160,23,0.5)]"
            >
              Book Harvey
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </CTAButton>
            <CTAButton
              to="/pricing"
              variant="ghost"
              size="lg"
              className="!border-[#2E4A38]/40 !text-[#2E4A38] hover:!border-[#2E4A38] hover:!text-[#1d3326]"
            >
              View Packages
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  note,
  index,
}: {
  icon: IconType;
  label: string;
  note: string;
  index: number;
}) {
  return (
    <li
      className="hvr-stat flex items-center gap-3.5 rounded-[16px] border border-[#D4A017]/30 bg-[#FFFDF7]/90 px-4 py-3.5 shadow-[0_18px_36px_-26px_rgba(46,74,56,0.55)] backdrop-blur-sm"
      style={{ "--stat-delay": `${index * 90}ms` } as Vars}
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white shadow-[0_8px_16px_-8px_rgba(46,74,56,0.6)]"
        style={{ background: "linear-gradient(150deg, #D99A32, #6E9A5E)" }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.86rem] font-semibold leading-tight text-[#2E4A38]">
          {label}
        </span>
        <span className="mt-0.5 block text-[0.72rem] leading-snug text-[#2E4A38]/65">{note}</span>
      </span>
    </li>
  );
}
