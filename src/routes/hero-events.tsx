import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Crown,
  Drama,
  FileText,
  MapPin,
  Medal,
  Megaphone,
  Play,
  Quote,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { Reveal } from "@/components/site/Reveal";
import { type TimelineStep } from "@/components/site/ScrollTimeline";
import { HeroMissionTimeline } from "@/components/site/HeroMissionTimeline";
import { HeroMissionBriefing } from "@/components/site/HeroMissionBriefing";
import { HeroDivisions } from "@/components/site/HeroDivisions";
import { MissionControl } from "@/components/site/MissionControl";
import { HeroBookingForm } from "@/components/site/HeroBookingForm";
import {
  HeroHighlightReel,
  type ReelFeatured,
  type ReelMoment,
} from "@/components/site/HeroHighlightReel";
import { HeroFaq } from "@/components/site/HeroFaq";
import { chapterBySlug, worldPricing, pricingPromise } from "@/lib/site-data";
import { heroSquad } from "@/lib/hero-roster";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

import heroHqImg from "@/assets/hero/hq-hero.webp";
import heroScene from "@/assets/worlds/hero.jpg";
import heroCharacters from "@/assets/scenes/hero-characters.jpg";
import mission1 from "@/assets/hero/missions/mission-1-call.webp";
import mission2 from "@/assets/hero/missions/mission-2-training.webp";
import mission3 from "@/assets/hero/missions/mission-3-team.webp";
import mission4 from "@/assets/hero/missions/mission-4-ceremony.webp";
import mission5 from "@/assets/hero/missions/mission-5-photos.webp";

const chapter = chapterBySlug("hero-events")!;
const heroPricing = worldPricing.find((w) => w.slug === "hero-events")!;

export const Route = createFileRoute("/hero-events")({
  head: () => ({
    meta: [
      { title: "Vancouver Hero Headquarters | High-Energy Hero Adventures" },
      { name: "description", content: chapter.shortDescription },
      { property: "og:title", content: "Vancouver Hero Headquarters" },
      { property: "og:description", content: chapter.shortDescription },
      { property: "og:url", content: "/hero-events" },
      { property: "og:image", content: heroScene },
    ],
    links: [{ rel: "canonical", href: "/hero-events" }],
  }),
  validateSearch: (search: Record<string, unknown>): { hero?: string } => ({
    hero: typeof search.hero === "string" ? search.hero : undefined,
  }),
  component: HeroPage,
});

const TRUST_ITEMS = [
  { icon: Star, label: "Thousands of Smiles Created" },
  { icon: BadgeCheck, label: "Professional Performers" },
  { icon: Shield, label: "Premium Costumes" },
  { icon: CalendarCheck, label: "Structured Experiences" },
] as const;

/* Floating hero particles — blue / white / red glints that drift upward over the
   hero, the action sibling of the princess petal-drop. Deterministic (SSR-safe). */
const HERO_PARTICLES = [
  { left: "5%", top: "62%", s: 6, c: "var(--hero-blue)", d: "0s", t: "9s", dx: "16px" },
  { left: "12%", top: "78%", s: 4, c: "#FFFFFF", d: "1.6s", t: "11s", dx: "-12px" },
  { left: "18%", top: "40%", s: 5, c: "var(--hero-red)", d: "0.8s", t: "10s", dx: "10px" },
  { left: "24%", top: "85%", s: 7, c: "var(--hero-blue)", d: "2.4s", t: "12s", dx: "-18px" },
  { left: "31%", top: "55%", s: 4, c: "#FFFFFF", d: "3.1s", t: "9.5s", dx: "14px" },
  { left: "38%", top: "72%", s: 5, c: "var(--hero-red)", d: "1.2s", t: "10.5s", dx: "-10px" },
  { left: "45%", top: "30%", s: 4, c: "var(--hero-blue)", d: "2s", t: "11.5s", dx: "12px" },
  { left: "52%", top: "80%", s: 6, c: "var(--hero-blue)", d: "0.4s", t: "9s", dx: "-14px" },
  { left: "59%", top: "48%", s: 4, c: "#FFFFFF", d: "2.8s", t: "12s", dx: "16px" },
  { left: "66%", top: "68%", s: 5, c: "var(--hero-red)", d: "1.8s", t: "10s", dx: "-12px" },
  { left: "72%", top: "35%", s: 4, c: "var(--hero-blue)", d: "3.4s", t: "11s", dx: "10px" },
  { left: "79%", top: "82%", s: 6, c: "#FFFFFF", d: "0.9s", t: "9.5s", dx: "-16px" },
  { left: "85%", top: "52%", s: 5, c: "var(--hero-red)", d: "2.2s", t: "12s", dx: "14px" },
  { left: "91%", top: "70%", s: 4, c: "var(--hero-blue)", d: "1.4s", t: "10.5s", dx: "-10px" },
  { left: "9%", top: "28%", s: 4, c: "var(--hero-red)", d: "3s", t: "11s", dx: "12px" },
  { left: "48%", top: "62%", s: 4, c: "#FFFFFF", d: "2.6s", t: "10s", dx: "-14px" },
  { left: "63%", top: "88%", s: 5, c: "var(--hero-blue)", d: "0.6s", t: "12s", dx: "16px" },
  { left: "76%", top: "22%", s: 4, c: "var(--hero-red)", d: "3.6s", t: "11.5s", dx: "-12px" },
] as const;

function HeroParticles() {
  return (
    <>
      {HERO_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="pcl pcl-spark"
          style={{
            left: p.left,
            top: p.top,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 2}px ${p.c}`,
            animationDelay: p.d,
            animationDuration: p.t,
            ["--dx" as string]: p.dx,
          }}
        />
      ))}
    </>
  );
}

/* A subtle hero "energy field" — the drifting blue/white/red motes reused as a
   low-opacity section accent (sibling of the princess sparkle field, but hero).
   Sits behind the section content; reduced-motion safe via the global guard. */
function HeroAccentField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60",
        className,
      )}
    >
      <HeroParticles />
    </div>
  );
}

/* ============================================================================
   1 · HERO — full-bleed cinematic city headquarters. The Vancouver hero HQ
   fills the frame; a light wash on the left keeps the overlaid copy crisp.
   Sub-brand lockup + two-tone headline carry the Vancouver Character Events ×
   Vancouver Hero Events identity. Light blue + bold red, premium not comic-book.
   ============================================================================ */
function HeroHero() {
  const { isCinema, setCinema } = useCinema();
  const videoRef = useRef<HTMLVideoElement>(null);

  const openReel = () => setCinema(true);
  const closeReel = () => setCinema(false);

  // Drive playback off the shared cinema flag so the reel plays no matter which
  // trigger opened it — this hero button OR the "Watch the Mission Reel" card in
  // the highlight reel below, both of which just flip `isCinema`. Try with sound;
  // if the browser's autoplay policy blocks it, fall back to muted so it always
  // plays something. Pause when the reel closes.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isCinema) {
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        void v.play().catch(() => undefined);
      });
    } else {
      v.pause();
    }
  }, [isCinema]);

  // Escape leaves the reel.
  useEffect(() => {
    if (!isCinema) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCinema(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCinema, setCinema]);

  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-[var(--hero-ice)]">
      {/* Full-bleed headquarters */}
      <img
        src={heroHqImg}
        alt="A bright cinematic Vancouver hero headquarters — a futuristic command tower with a red cape and a star crest, a suspension bridge, downtown skyline and the North Shore mountains across the water"
        fetchPriority="high"
        width={1672}
        height={941}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[58%_42%]"
      />

      {/* Left light wash — keeps dark copy legible over the bright art */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, rgba(238,247,255,0.97) 0%, rgba(238,247,255,0.9) 26%, rgba(238,247,255,0.62) 44%, rgba(238,247,255,0.18) 60%, transparent 74%)",
        }}
      />
      {/* top + bottom soft fades — also lift copy on mobile where art sits behind */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-44"
        style={{ background: "linear-gradient(180deg, rgba(238,247,255,0.85), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-40"
        style={{ background: "linear-gradient(0deg, rgba(238,247,255,0.82), transparent)" }}
      />
      {/* gentle overall lift on small screens so copy stays crisp over the art */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[var(--hero-ice)]/30 sm:hidden" />

      {/* floating hero particles (blue / white / red) — fade away while the reel plays */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-500",
          isCinema && "opacity-0",
        )}
      >
        <HeroParticles />
      </div>

      <div
        className={cn(
          "relative mx-auto w-full max-w-[1240px] px-5 py-20 transition-all duration-500 ease-[var(--ease-out)] sm:px-6 lg:px-8 lg:py-24",
          isCinema && "pointer-events-none -translate-y-6 opacity-0",
        )}
      >
        <div className="max-w-xl">
          {/* Vancouver Hero Events — ornate wordmark (princess-style, hero-bold) */}
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <h1 className="sr-only">Vancouver Hero Events</h1>
              <span aria-hidden className="inline-flex items-center gap-2">
                <Crown className="h-5 w-5 shrink-0 text-[var(--hero-gold)]" aria-hidden />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.65rem)] tracking-[0.2em] text-[var(--hero-navy)]">
                  Vancouver
                </span>
              </span>
              <span
                aria-hidden
                className="t-script-hero mt-1 block text-[clamp(3.8rem,9.5vw,6.6rem)] text-[var(--hero-red)]"
                style={{
                  textShadow: "0 2px 16px rgba(255,255,255,0.9), 0 10px 30px rgba(216,58,74,0.22)",
                }}
              >
                Hero
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[var(--hero-navy)]"
              >
                <Star
                  className="h-3 w-3 fill-[var(--hero-red)] text-[var(--hero-red)]"
                  aria-hidden
                />
                Events
                <Star
                  className="h-3 w-3 fill-[var(--hero-red)] text-[var(--hero-red)]"
                  aria-hidden
                />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{
                  background:
                    "linear-gradient(90deg, var(--hero-red), var(--hero-gold) 55%, transparent)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={200} y={16}>
            <p className="t-display mt-3 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug text-[var(--hero-blue-deep)]">
              High-energy adventures for brave young guests
            </p>
          </Reveal>

          <Reveal delay={260} y={16}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-2">
              Action-packed character visits with hero training, team challenges, photo moments, and
              a final hero ceremony.
            </p>
          </Reveal>

          <Reveal delay={280} y={14}>
            <button
              type="button"
              onClick={openReel}
              className="watch-cta group mt-7 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--hero-red)]/25 bg-white/85 py-2 pl-2 pr-5 text-left backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
            >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--hero-red)] to-[var(--hero-red-deep)] text-white shadow-[0_6px_16px_-6px_rgba(216,58,74,0.7)]">
                <span
                  aria-hidden
                  className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--hero-red)]/50"
                />
                <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-[var(--hero-red-deep)]">
                  Featured Reel
                </span>
                <span className="text-[0.98rem] font-bold text-[var(--hero-navy)]">
                  Watch Us In Action
                </span>
              </span>
            </button>
          </Reveal>

          <Reveal delay={340} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="#hero-hq"
                size="lg"
                className="group cta-pulse-hero !bg-gradient-to-r !from-[var(--hero-red)] !to-[var(--hero-red-deep)] !text-white hover:!shadow-[0_0_30px_rgba(216,58,74,0.45)]"
              >
                Explore Heroes
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton
                href="#pricing"
                variant="ghost"
                size="lg"
                className="!border-[var(--hero-blue)]/55 !bg-white/80 !text-[var(--hero-blue-deep)] shadow-[var(--shadow-sm)] hover:!border-[var(--hero-blue)] hover:!text-[var(--hero-blue-deep)]"
              >
                Hero Pricing
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[var(--hero-navy)]"
                >
                  <Icon className="h-4 w-4 text-[var(--hero-red)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          "absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--hero-blue-deep)]/45 transition-opacity duration-300",
          isCinema && "opacity-0",
        )}
      >
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>

      {/* CINEMA REEL — fullscreen "Watch Us In Action" video (covers header too) */}
      <div
        className={cn(
          "fixed inset-0 z-[120] flex items-center justify-center bg-black transition-opacity duration-500",
          isCinema ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isCinema}
      >
        <video
          ref={videoRef}
          src="/video/hero-action.mp4"
          playsInline
          preload="none"
          controls
          onEnded={closeReel}
          className="max-h-[100svh] w-auto max-w-[100vw]"
        />
        <button
          type="button"
          onClick={closeReel}
          aria-label="Close video"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}

/* ============================================================================
   2 · WHAT HAPPENS AT A HERO PARTY — scroll-driven timeline (kept light).
   ============================================================================ */
const MOMENTS: TimelineStep[] = [
  {
    n: "01",
    title: "The Call Arrives",
    body: "A hero bursts in, gathers the young recruits, and the adventure begins.",
    img: mission1,
    alt: "A hero performer making a dramatic entrance as costumed children gather to greet them",
    icon: Megaphone,
  },
  {
    n: "02",
    title: "Hero Training Begins",
    body: "Guests learn poses, powers, teamwork, and what it takes to become a hero.",
    img: mission2,
    alt: "Children in capes practising hero poses and training moves with a hero coach",
    icon: Target,
  },
  {
    n: "03",
    title: "Team Challenge",
    body: "The group works together through games, missions, and action-packed party moments.",
    img: mission3,
    alt: "A group of children working together through a fun team challenge game",
    icon: Users,
  },
  {
    n: "04",
    title: "The Hero Ceremony",
    body: "The birthday child is celebrated as the hero of the day.",
    img: mission4,
    alt: "A birthday child being celebrated as hero of the day and receiving a medal",
    icon: Medal,
  },
  {
    n: "05",
    title: "Photos & High Fives",
    body: "Every guest gets time for pictures, smiles, and one last heroic moment.",
    img: mission5,
    alt: "Children posing for photos and high-fiving a hero performer at the party",
    icon: Camera,
  },
];

/* Family "mission reports". `em` is the red-emphasised phrase inside each quote. */
const REVIEWS = [
  {
    pre: "The hero ran a high-energy mission that kept twenty kids together and grinning the entire time. Organized and ",
    em: "so much fun",
    post: "!",
    name: "Jordan K.",
    initials: "JK",
    role: "Birthday Mission",
    city: "Coquitlam",
    favorite: false,
  },
  {
    pre: "Our son was sworn in as a hero and hasn't stopped talking about it. The costume and presentation were ",
    em: "genuinely premium",
    post: ".",
    name: "Renee P.",
    initials: "RP",
    role: "Birthday Mission",
    city: "Burnaby",
    favorite: true,
  },
  {
    pre: "They handled a gym full of excited kids with ",
    em: "total professionalism",
    post: " — structured games, photos, and a big finish.",
    name: "Mr. Alvarez",
    initials: "MA",
    role: "School Event",
    city: "Surrey",
    favorite: false,
  },
] as const;

/* Trust badges shown above the reviews. */
const REVIEW_TRUST = [
  { icon: Award, label: "Professional Performers" },
  { icon: ClipboardCheck, label: "Structured Experiences" },
  { icon: Drama, label: "Premium Costumes" },
  { icon: MapPin, label: "Metro Vancouver Events" },
] as const;

/* A premium "Mission Report" testimonial card — red corner brackets, report
   label, pale-blue quote mark, gold stars, and a name/role/city footer. The
   "parent favorite" card carries a red ribbon and a slightly stronger frame. */
function MissionReportCard({ review, index }: { review: (typeof REVIEWS)[number]; index: number }) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col rounded-[20px] border bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7",
        review.favorite
          ? "border-[var(--hero-blue)]/55 shadow-[0_24px_52px_-26px_rgba(35,81,143,0.45)] hover:shadow-[0_30px_56px_-24px_rgba(35,81,143,0.5)]"
          : "border-[var(--hero-blue)]/30 shadow-[var(--shadow-sm)] hover:border-[var(--hero-blue)]/55 hover:shadow-[0_26px_52px_-24px_rgba(23,54,93,0.4)]",
      )}
    >
      {/* red corner brackets */}
      {[
        "left-2.5 top-2.5 rounded-tl-[14px] border-l-2 border-t-2",
        "right-2.5 top-2.5 rounded-tr-[14px] border-r-2 border-t-2",
        "bottom-2.5 left-2.5 rounded-bl-[14px] border-b-2 border-l-2",
        "bottom-2.5 right-2.5 rounded-br-[14px] border-b-2 border-r-2",
      ].map((c) => (
        <span
          key={c}
          aria-hidden
          className={cn(
            "pointer-events-none absolute h-6 w-6 border-[var(--hero-red)]/55 transition-colors duration-300 group-hover:border-[var(--hero-red)]",
            c,
          )}
        />
      ))}

      {/* parent-favorite ribbon */}
      {review.favorite ? (
        <span
          aria-hidden
          className="absolute -top-px right-5 z-10 flex w-[3.1rem] flex-col items-center gap-0.5 px-1 pb-3 pt-2 text-white shadow-[0_8px_16px_-6px_rgba(216,58,74,0.6)]"
          style={{
            background: "linear-gradient(180deg, var(--hero-red), var(--hero-red-deep))",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
          }}
        >
          <Star className="h-3.5 w-3.5 fill-white" aria-hidden />
          <span className="text-center text-[0.46rem] font-bold uppercase leading-[1.15] tracking-wide">
            Parent Favorite
          </span>
        </span>
      ) : null}

      {/* report label + faint crest */}
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--hero-navy)]">
          <FileText className="h-4 w-4 text-[var(--hero-red)]" aria-hidden />
          Mission Report 0{index + 1}
        </span>
        {!review.favorite ? (
          <span
            aria-hidden
            className="relative grid h-8 w-8 place-items-center text-[var(--hero-blue)]/20"
          >
            <Shield className="h-8 w-8" aria-hidden />
            <Star className="absolute h-3 w-3 -translate-y-px fill-current" aria-hidden />
          </span>
        ) : null}
      </div>

      {/* quote */}
      <Quote className="mt-3 h-9 w-9 text-[var(--hero-blue)]/25" aria-hidden />
      <blockquote className="mt-1 flex-1 text-[0.97rem] leading-relaxed text-fg-2">
        {review.pre}
        <span className="mr-em">{review.em}</span>
        {review.post}
      </blockquote>

      {/* gold stars */}
      <div className="mt-5 flex items-center gap-1" aria-label="Five star review">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star
            key={s}
            className="h-4 w-4 fill-[var(--hero-gold)] text-[var(--hero-gold)]"
            aria-hidden
          />
        ))}
      </div>

      {/* footer */}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-[var(--hero-blue)]/15 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--hero-blue)] to-[var(--hero-blue-deep)] text-sm font-bold text-white shadow-[0_4px_10px_-4px_rgba(23,54,93,0.6)]">
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-tight text-[var(--hero-navy)]">{review.name}</p>
          <p className="text-sm font-semibold leading-tight text-[var(--hero-blue-deep)]">
            {review.role}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-fg-3">
            <MapPin className="h-3 w-3" aria-hidden />
            {review.city}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/* Two premium hero packages. Prices are sourced from `heroPricing` (worldPricing)
   so the amounts never drift; labels/titles/includes are presentation-only. The
   first is the recommended red "Most Popular" card; the second the blue duo card. */
const HERO_PACKAGES = [
  {
    variant: "pop",
    badge: "Most Popular",
    titleMain: "Hero Visit",
    titleAccent: "+ Sidekick Support",
    desc: "A high-energy hero visit with support for games, flow, photos, and party moments.",
    rates: [
      { label: "60-Min Mission", price: heroPricing.options[0].rates[0].price },
      { label: "90-Min Extended Mission", price: heroPricing.options[0].rates[1].price },
    ],
    includes: [
      "Featured hero appearance",
      "Sidekick / event support",
      "Hero training",
      "Team challenge",
      "Ceremony moment",
      "Photos",
    ],
    cta: "Book This Mission",
    starCount: 1,
  },
  {
    variant: "duo",
    badge: "Build Your Squad",
    titleMain: "Duo Hero",
    titleAccent: "Adventure",
    desc: "Two full heroes for bigger entrances, stronger interaction, and a more cinematic party experience.",
    rates: [
      { label: "60-Min Mission", price: heroPricing.options[1].rates[0].price },
      { label: "90-Min Extended Mission", price: heroPricing.options[1].rates[1].price },
    ],
    includes: [
      "Two full heroes",
      "Hero training",
      "Team challenge",
      "Duo photo moments",
      "Birthday hero ceremony",
      "More guest interaction",
    ],
    cta: "Build This Squad",
    starCount: 2,
  },
] as const;

type HeroPackage = (typeof HERO_PACKAGES)[number];

/* A premium hero "command card" — corner brackets, crest badge, mini price rows
   and a themed CTA. The recommended card is red, the duo card blue. */
function HeroPriceCard({ pkg, index }: { pkg: HeroPackage; index: number }) {
  const pop = pkg.variant === "pop";
  const accent = pop ? "var(--hero-red)" : "var(--hero-blue)";
  const accentDeep = pop ? "var(--hero-red-deep)" : "var(--hero-blue-deep)";
  const gradient = pop
    ? "linear-gradient(180deg, var(--hero-red), var(--hero-red-deep))"
    : "linear-gradient(180deg, var(--hero-blue), var(--hero-blue-deep))";
  const BadgeIcon = pop ? Star : Users;
  const CtaIcon = pop ? Shield : Users;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[24px] border-2 bg-white/90 px-6 pb-6 pt-9 backdrop-blur-sm sm:px-8 sm:pb-8",
        pop
          ? "border-[var(--hero-red)]/40 shadow-[0_28px_64px_-30px_rgba(216,58,74,0.5)]"
          : "border-[var(--hero-blue)]/45 shadow-[0_28px_64px_-30px_rgba(35,81,143,0.5)]",
      )}
    >
      {/* hero corner brackets */}
      {[
        "left-2.5 top-2.5 rounded-tl-[16px] border-l-2 border-t-2",
        "right-2.5 top-2.5 rounded-tr-[16px] border-r-2 border-t-2",
        "bottom-2.5 left-2.5 rounded-bl-[16px] border-b-2 border-l-2",
        "bottom-2.5 right-2.5 rounded-br-[16px] border-b-2 border-r-2",
      ].map((c) => (
        <span
          key={c}
          aria-hidden
          className={cn("pointer-events-none absolute h-7 w-7", c)}
          style={{ borderColor: accent, opacity: 0.7 }}
        />
      ))}

      {/* crest badge */}
      <span
        className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_-10px_rgba(8,17,31,0.65)]"
        style={{ background: gradient }}
      >
        <BadgeIcon className="h-3.5 w-3.5" fill="currentColor" aria-hidden />
        {pkg.badge}
      </span>

      {/* header — crest + title */}
      <div className="flex items-center gap-4">
        <span
          className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
            background: `color-mix(in oklab, ${accent} 12%, white)`,
          }}
        >
          <Shield
            className="h-9 w-9"
            style={{ color: accent }}
            fill={`color-mix(in oklab, ${accent} 20%, white)`}
            aria-hidden
          />
          <span className="absolute inset-0 grid -translate-y-px place-items-center">
            <span className="flex gap-0.5">
              {Array.from({ length: pkg.starCount }).map((_, k) => (
                <Star key={k} className="h-2.5 w-2.5 text-white" fill="currentColor" aria-hidden />
              ))}
            </span>
          </span>
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-tight text-[var(--hero-navy)]">
            {pkg.titleMain}
          </h3>
          <p className="font-display text-lg font-bold leading-tight" style={{ color: accentDeep }}>
            {pkg.titleAccent}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-2">{pkg.desc}</p>

      {/* mini price rows — reveal just after the card body */}
      <Reveal delay={index * 120 + 240} y={12} className="mt-5 space-y-2.5">
        {pkg.rates.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-3 rounded-[14px] border border-[var(--hero-mist)]/70 bg-[var(--hero-ice)]/70 px-4 py-3"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-[var(--hero-navy)]">
              <Clock className="h-4 w-4" style={{ color: accent }} aria-hidden />
              {r.label}
            </span>
            <span
              className="font-display text-2xl font-bold leading-none"
              style={{ color: accentDeep }}
            >
              {r.price}
            </span>
          </div>
        ))}
      </Reveal>

      {/* includes */}
      <p
        className="mt-6 text-[0.64rem] font-bold uppercase tracking-[0.18em]"
        style={{ color: accentDeep }}
      >
        Includes:
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-[0.84rem] leading-snug text-fg-2">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: accent }}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-7">
        <a
          href="#book"
          className="btn-magic flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(8,17,31,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: gradient, outlineColor: accent }}
        >
          <CtaIcon className="h-4 w-4" aria-hidden />
          {pkg.cta}
        </a>
      </div>
    </article>
  );
}

/* ============================================================================
   THE PAGE — light from end to end; navy only inside the HQ showcase core.
   ============================================================================ */
function HeroPage() {
  const { hero } = Route.useSearch();

  // A hero set on the URL means someone tapped "Suit Up" on a specific hero —
  // glide them to the booking form with that hero pre-filled. Defer past layout
  // so a cold load lands accurately (mirrors the princess page).
  useEffect(() => {
    if (!hero) return;
    let raf = 0;
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(() => {
        document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 250);
    return () => {
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hero]);

  return (
    <>
      <HeroHero />

      {/* The Experience — hero "mission briefing" (clip off so the stage can pin) */}
      <Section tone="sky" id="what-happens" clip={false}>
        <HeroAccentField />
        {/* Mission briefing header */}
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[var(--hero-gold)] sm:block"
              />
              <span className="t-engrave text-[0.72rem] tracking-[0.3em] text-[var(--hero-red-deep)]">
                The Experience
              </span>
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[var(--hero-gold)] sm:block"
              />
            </div>
          </Reveal>
          <Reveal delay={120} y={18}>
            <h2 className="mt-3 font-sans text-[clamp(1.9rem,4.2vw,3.1rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-[var(--hero-navy)]">
              Your Hero Mission, <span className="text-[var(--hero-red)]">Step by Step</span>
            </h2>
          </Reveal>
          <Reveal delay={240} y={14}>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[var(--hero-blue-deep)]">
              From the first heroic entrance to the final photo moment, every visit is built like a
              mini mission.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-10">
          <HeroMissionTimeline steps={MOMENTS} />
        </div>

        {/* You've been called to Hero HQ — the mission-dossier transition/CTA */}
        <div className="mt-16 md:mt-20">
          <HeroMissionBriefing />
        </div>
      </Section>

      {/* Hero Headquarters — the showcase. Light-blue seams melt a deep-navy
          core into the page; divisions + hero cards live on the navy. */}
      <section id="hero-hq" className="relative isolate scroll-mt-24 overflow-hidden">
        {/* deep-blue base (never black) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background: "linear-gradient(180deg, #1B3556 0%, #16294A 50%, #1B3556 100%)",
          }}
        />
        {/* top seam — light blue → navy → transparent */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-20 h-[600px]"
          style={{
            background:
              "linear-gradient(180deg, #EEF5FF 0%, #DCEAF9 12%, #BFD4EE 24%, #8FB0DC 38%, #5C8BC6 52%, #3A6299 66%, #294E7C 80%, #213F60 90%, #1B3556 96%, rgba(27,53,86,0) 100%)",
          }}
        />
        {/* bottom seam — navy rising back into the page */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-20 h-[600px]"
          style={{
            background:
              "linear-gradient(0deg, #EEF5FF 0%, #DCEAF9 12%, #BFD4EE 24%, #8FB0DC 38%, #5C8BC6 52%, #3A6299 66%, #294E7C 80%, #213F60 90%, #1B3556 96%, rgba(27,53,86,0) 100%)",
          }}
        />
        {/* star dust over the navy core */}
        <div aria-hidden className="tx-stars twinkle absolute inset-0 -z-10 opacity-40" />

        <div className="relative pt-20 md:pt-24">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[var(--hero-red)]/70 sm:block"
              />
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[var(--hero-red-deep)]">
                <Shield className="h-3.5 w-3.5 text-[var(--hero-red)]" aria-hidden />
                Hero HQ
              </span>
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[var(--hero-red)]/70 sm:block"
              />
            </div>
            <h2
              className="t-display mt-3 text-3xl leading-tight text-[var(--hero-navy)] md:text-5xl"
              style={{ textShadow: "0 2px 26px rgba(79,143,220,0.28)" }}
            >
              Assemble Your Squad
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--hero-navy)]/70">
              Step inside Hero HQ and choose the hero style that fits your celebration.
            </p>
            <span
              aria-hidden
              className="mx-auto mt-5 block h-px w-40 bg-gradient-to-r from-transparent via-[var(--hero-blue)]/60 to-transparent"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <HeroDivisions squad={heroSquad} />
        </div>

        <p className="relative mx-auto max-w-xl px-5 pb-20 pt-10 text-center text-sm font-medium text-[var(--hero-navy)] [text-shadow:0_1px_10px_rgba(255,255,255,0.6)] md:pb-24">
          Every hero is a trained professional performer in a premium, original costume — described
          here in our own brand-safe language.
        </p>
      </section>

      {/* Mission Control matchmaker */}
      <Section tone="sky" id="mission-control">
        <SectionHeading
          eyebrow="Mission Control"
          title="Not sure which hero to invite?"
          description="Mission Control can help match your party with the right hero energy."
        />
        <div className="mt-10">
          <MissionControl squad={heroSquad} />
        </div>
      </Section>

      {/* Pricing preview — two premium hero packages + a slim custom-mission banner */}
      <Section tone="ivory" id="pricing">
        <SectionHeading
          eyebrow="Pricing preview"
          title="Choose Your Hero Mission"
          description="Clear pricing for high-energy hero visits across our standard Metro Vancouver service area."
        />
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {HERO_PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.titleMain} delay={i * 120} y={26} scaleFrom={0.985}>
              <HeroPriceCard pkg={pkg} index={i} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-sm text-fg-3">
          {pricingPromise.included[0]}
        </p>

        {/* Slim custom-mission banner */}
        <Reveal delay={120} y={22}>
          <div className="relative mx-auto mt-6 flex max-w-5xl flex-col items-center gap-5 overflow-hidden rounded-[22px] border border-[var(--hero-blue)]/30 bg-gradient-to-r from-[var(--hero-ice)] via-white to-[var(--hero-sky)]/50 px-6 py-6 text-center shadow-[var(--shadow-sm)] sm:flex-row sm:justify-between sm:gap-8 sm:px-9 sm:py-7 sm:text-left">
            <span
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-2.5 h-6 w-6 rounded-tl-[14px] border-l-2 border-t-2 border-[var(--hero-blue)]/45"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2.5 right-2.5 h-6 w-6 rounded-br-[14px] border-b-2 border-r-2 border-[var(--hero-blue)]/45"
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[var(--hero-blue)]/35 bg-[var(--hero-blue)]/12">
                <Building2 className="h-7 w-7 text-[var(--hero-blue-deep)]" aria-hidden />
                <Star
                  className="absolute right-2 top-1.5 h-2.5 w-2.5 text-[var(--hero-gold)]"
                  fill="currentColor"
                  aria-hidden
                />
              </span>
              <div>
                <h3 className="font-display text-xl text-[var(--hero-navy)]">
                  Need something bigger?
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-2">
                  Planning a school visit, festival, corporate event, or custom hero mission? Tell
                  us your vision and we&apos;ll build the right package.
                </p>
              </div>
            </div>
            <a
              href="#book"
              className="btn-magic inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[var(--hero-blue)] bg-white px-6 py-3 text-sm font-bold text-[var(--hero-blue-deep)] shadow-[var(--shadow-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Plan a Custom Mission
            </a>
          </div>
        </Reveal>
      </Section>

      {/* Real hero moments — premium mission highlight reel */}
      <Section tone="sky" id="real-moments">
        <SectionHeading
          eyebrow="Real hero moments"
          title="Genuine reactions, real celebrations"
          description="A highlight reel of arrivals, training, team challenges, ceremony moments, and photos from the mission."
        />
        <div className="mt-10">
          <HeroHighlightReel featured={REEL_FEATURED} moments={REEL_MOMENTS} />
        </div>
        <div className="mt-10 text-center">
          <CTAButton
            to="/gallery"
            variant="ghost"
            size="lg"
            className="!border-[var(--hero-blue)]/50 !text-[var(--hero-blue-deep)] hover:!border-[var(--hero-blue)] bg-white/60"
          >
            View the Full Gallery
          </CTAButton>
        </div>
      </Section>

      {/* Reviews — premium "mission report" trust section */}
      <Section tone="ivory" id="reviews">
        <SectionHeading
          eyebrow="Hero reviews"
          title="What Families Say After the Mission"
          description="Professional performers, structured experiences, and unforgettable reactions — in their words."
        />

        {/* trust badges */}
        <Reveal delay={60} y={16}>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {REVIEW_TRUST.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-[var(--hero-blue)]/25 bg-white px-4 py-3.5 shadow-[var(--shadow-sm)]"
              >
                <Icon className="h-6 w-6 shrink-0 text-[var(--hero-blue-deep)]" aria-hidden />
                <span className="text-sm font-bold leading-tight text-[var(--hero-navy)]">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* mission reports */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} y={24}>
              <MissionReportCard review={r} index={i} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={120} y={18}>
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="flex w-full max-w-md items-center gap-3">
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--hero-blue)]/35"
              />
              <span
                aria-hidden
                className="relative grid h-10 w-10 place-items-center text-[var(--hero-navy)]"
              >
                <Shield className="h-9 w-9 fill-[var(--hero-navy)]" aria-hidden />
                <Star
                  className="absolute h-3 w-3 -translate-y-px fill-white text-white"
                  aria-hidden
                />
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--hero-blue)]/35"
              />
            </div>
            <h3 className="mt-5 font-display text-2xl text-[var(--hero-navy)] sm:text-[1.7rem]">
              Ready to create your own mission?
            </h3>
            <a
              href="#book"
              className="btn-magic mt-5 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_-14px_rgba(216,58,74,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
            >
              Start Your Mission
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Section>

      {/* FAQ — Mission Intel briefing list */}
      <Section tone="sky" compact id="faq">
        <SectionHeading
          eyebrow="Mission intel"
          title="Good to Know Before You Book"
          description="Quick answers to the most common questions from parents and event hosts."
        />
        <div className="mt-9">
          <HeroFaq faqs={chapter.faqs} />
        </div>
      </Section>

      {/* Start Your Mission — the booking form */}
      <Section tone="ivory" id="book" className="scroll-mt-24">
        <HeroAccentField />
        <div className="text-center">
          <Shield className="mx-auto h-8 w-8 text-[var(--hero-blue)]" aria-hidden />
          <GoldRule className="mx-auto mt-4 max-w-xs" />
          <h2 className="t-display text-3xl text-fg md:text-5xl">Start Your Mission</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-2">
            Tell us a little about your celebration, and we&apos;ll help assemble the perfect hero
            squad.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-4xl">
          <HeroBookingForm requestedHero={hero} />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-fg-3">
          No checkout today — just a quick mission request. We&apos;ll follow up to confirm
          availability.
        </p>
      </Section>
    </>
  );
}

/* Real-moments highlight reel — placeholder imagery until real hero photography
   lands; swap each `src` for final photos (and the featured for the reel still). */
const REEL_FEATURED: ReelFeatured = {
  title: "Watch the Mission Reel",
  subtitle: "See the energy, excitement, and unforgettable moments.",
  src: heroScene,
};
const REEL_MOMENTS: ReelMoment[] = [
  { id: "arrival", label: "Mission Arrival", src: mission1, icon: Users },
  { id: "training", label: "Hero Training", src: mission2, icon: Target },
  { id: "team", label: "Team Challenge", src: mission3, icon: Users },
  { id: "ceremony", label: "Hero Ceremony", src: mission4, icon: Medal },
  { id: "photos", label: "Photo Moments", src: mission5, icon: Camera },
  { id: "crowd", label: "Crowd Reactions", src: heroCharacters, icon: Sparkles },
];
