import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  Camera,
  ChevronDown,
  Crown,
  MapPin,
  Music,
  Play,
  Quote,
  Sparkles as SparklesIcon,
  Star,
  X,
} from "lucide-react";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/site/CTAButton";
import { Reveal } from "@/components/site/Reveal";
import { KingdomDoors } from "@/components/site/KingdomDoors";
import { FairyGodmother } from "@/components/site/FairyGodmother";
import { PrincessFaq } from "@/components/site/PrincessFaq";
import {
  PrincessHighlightReel,
  type RoyalFeatured,
  type RoyalMoment,
} from "@/components/site/PrincessHighlightReel";
import { RoyalInvitation } from "@/components/site/RoyalInvitation";
import { ScrollTimeline, type TimelineStep } from "@/components/site/ScrollTimeline";
import { PrincessBookingForm } from "@/components/site/PrincessBookingForm";
import { WorldTrustStrip, type WorldTrustItem } from "@/components/site/WorldTrustStrip";
import { chapterBySlug, worldPricing, pricingPromise } from "@/lib/site-data";
import { princessCourt } from "@/lib/royal-court";

import flankSingle from "@/assets/princess/figures/single-princess.webp";
import flankDuo from "@/assets/princess/figures/duo-prince-princess.webp";

import castleBright from "@/assets/princess/castle-bright.jpg";
import momentEntrance from "@/assets/princess/real-frog-entrance.jpg";
import momentStory from "@/assets/princess/real-mermaid-mirror.jpg";
import momentGames from "@/assets/princess/real-mermaid-joy.jpg";
import momentCrown from "@/assets/princess/tiara.jpg";
import momentPhotos from "@/assets/princess/real-frog-twirl.jpg";
import galleryPortrait from "@/assets/princess/real-mermaid-portrait.jpg";
import galleryTwirl from "@/assets/princess/real-mermaid-twirl.jpg";

const chapter = chapterBySlug("princess-events")!;
const princessPricing = worldPricing.find((w) => w.slug === "princess-events")!;

/* Small trust strip beneath the hero (shared WorldTrustStrip, blush/gold theme). */
const PRINCESS_TRUST: WorldTrustItem[] = [
  { icon: Crown, title: "Premium Gowns", note: "Beautifully detailed, character-accurate gowns." },
  {
    icon: BadgeCheck,
    title: "Trained Performers",
    note: "In-character singing, stories, and grace.",
  },
  {
    icon: BookOpen,
    title: "Storytime & Singing",
    note: "Live storytelling and a sing-along moment.",
  },
  { icon: Camera, title: "Photos With Every Guest", note: "Unhurried photo time to treasure." },
  {
    icon: SparklesIcon,
    title: "Coronation Moment",
    note: "Your child crowned in their own ceremony.",
  },
  {
    icon: CalendarCheck,
    title: "Structured Experiences",
    note: "Organized, age-aware party flow.",
  },
];
const PRINCESS_TRUST_VARS: Record<string, string> = {
  "--wts-base": "#FDEFF5",
  "--wts-bg":
    "radial-gradient(60% 46% at 50% -6%, rgba(255,255,255,0.6), transparent 58%), radial-gradient(48% 44% at 14% 4%, rgba(229,154,192,0.4), transparent 62%), radial-gradient(50% 46% at 86% 8%, rgba(207,168,98,0.26), transparent 64%), linear-gradient(180deg, #FDEFF5 0%, #FBE6F0 52%, #FDF0F6 100%)",
  "--wts-dot": "rgba(201,51,126,0.07)",
  "--wts-glow-c": "rgba(229,154,192,0.4)",
  "--wts-title-c": "var(--pp-magenta-deep)",
  "--wts-spark": "#CFA862",
  "--wts-gold": "#D9B25A",
  "--wts-gold-soft": "rgba(217,178,90,0.75)",
  "--wts-accent": "rgba(201,51,126,0.4)",
  "--wts-card": "linear-gradient(165deg, rgba(255,255,255,0.95), rgba(251,230,240,0.9))",
  "--wts-card-bd": "rgba(207,168,98,0.4)",
  "--wts-token": "radial-gradient(circle at 38% 32%, #FCE9F1, #F6CFE0 60%, #EBA9C8 100%)",
  "--wts-token-bd": "#E2C276",
  "--wts-ink": "#8E1F54",
  "--wts-note": "rgba(122,33,81,0.72)",
  "--wts-ring": "rgba(229,154,192,0.5)",
  "--wts-sh": "120,20,70",
};

export const Route = createFileRoute("/princess-events")({
  head: () => ({
    meta: [
      { title: "Vancouver Princess Events | Where Fairytales Step Off the Page" },
      {
        name: "description",
        content:
          "Magical princess experiences designed to create unforgettable memories for families across the Lower Mainland. Meet the Royal Court and begin your story.",
      },
      { property: "og:title", content: "Vancouver Princess Events" },
      {
        property: "og:description",
        content:
          "Where fairytales step off the page — premium princess experiences across Metro Vancouver.",
      },
      { property: "og:url", content: "/princess-events" },
      { property: "og:image", content: castleBright },
    ],
    links: [{ rel: "canonical", href: "/princess-events" }],
  }),
  validateSearch: (search: Record<string, unknown>): { guest?: string } => ({
    guest: typeof search.guest === "string" ? search.guest : undefined,
  }),
  component: PrincessPage,
});

/* ============================================================================
   1 · HERO — bright fairytale morning. Castle, blossoms, mountains; the
   Vancouver Princess Events lockup carries the brand. Light, airy, golden.
   ============================================================================ */

/** Deterministic blossom petals — identical on server & client. */
const PETALS = [
  { left: "8%", top: "12%", delay: "0s", duration: "9s", dx: "26px", s: 7 },
  { left: "18%", top: "4%", delay: "2.4s", duration: "11s", dx: "-18px", s: 5 },
  { left: "34%", top: "8%", delay: "1.1s", duration: "10s", dx: "20px", s: 6 },
  { left: "52%", top: "3%", delay: "3.6s", duration: "12s", dx: "-24px", s: 5 },
  { left: "67%", top: "9%", delay: "0.7s", duration: "9.5s", dx: "18px", s: 7 },
  { left: "81%", top: "5%", delay: "2.9s", duration: "10.5s", dx: "-16px", s: 5 },
  { left: "92%", top: "13%", delay: "1.8s", duration: "11.5s", dx: "22px", s: 6 },
] as const;

const TRUST_INDICATORS = [
  { icon: SparklesIcon, label: "Thousands of Smiles Created" },
  { icon: BadgeCheck, label: "Professional Performers" },
  { icon: Crown, label: "Premium Costumes" },
  { icon: CalendarCheck, label: "Structured Experiences" },
] as const;

/* "Watch the Magic in Action" — a featured reel button + lazy video modal. The
   video only mounts when opened, so nothing loads on page load. Placeholder reel
   source until final princess footage lands. */
function PrincessReel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-magic group inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-gold-500/40 bg-white/85 py-2 pl-2 pr-5 text-left shadow-[0_10px_26px_-14px_rgba(162,27,97,0.4)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--pp-magenta)] to-[var(--pp-magenta-deep)] text-white shadow-[0_6px_16px_-6px_rgba(162,27,97,0.7)]">
          <span
            aria-hidden
            className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--pp-magenta)]/50"
          />
          <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-gold-600">
            Featured Reel
          </span>
          <span className="text-[0.98rem] font-bold text-fg">Watch the Magic in Action</span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Featured reel"
        >
          <video
            src="/video/doors/glass-slipper-kingdom.mp4"
            autoPlay
            controls
            playsInline
            preload="none"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88svh] w-auto max-w-[96vw] rounded-[var(--radius-lg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </>
  );
}

function PrincessHero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-[#FDEFF5]">
      {/* The bright kingdom */}
      <img
        src={castleBright}
        alt="Pink fairytale castle above a river with cherry blossoms and North Shore mountains"
        fetchPriority="high"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[68%_38%]"
      />

      {/* Light washes for copy legibility — luminous, never dark */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,248,251,0.92) 0%, rgba(255,248,251,0.72) 30%, rgba(255,248,251,0.22) 52%, transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-36"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(255,246,250,0.9) 90%)",
        }}
      />

      {/* Drifting blossom petals */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="pcl pcl-petal"
            style={{
              left: p.left,
              top: p.top,
              width: p.s,
              height: p.s + 2,
              background: "linear-gradient(140deg, #F8C8D8 20%, #F09EBC 80%)",
              boxShadow: "0 0 8px rgba(240,158,188,0.5)",
              animationDelay: p.delay,
              animationDuration: p.duration,
              ["--dx" as string]: p.dx,
            }}
          />
        ))}
      </div>

      {/* Copy + lockup */}
      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-28 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          {/* The Vancouver Princess Events lockup */}
          <Reveal y={18}>
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2">
                <Crown className="h-5 w-5 text-gold-600" aria-hidden />
                <span className="t-engrave text-[clamp(1.1rem,2.4vw,1.7rem)] tracking-[0.18em] text-[var(--pp-magenta-deep)]">
                  Vancouver
                </span>
              </span>
              <h1 className="sr-only">
                Vancouver Princess Events — Where Fairytales Step Off the Page
              </h1>
              <span
                aria-hidden
                className="t-script mt-1 block text-[clamp(3.4rem,8.5vw,6rem)] leading-[0.85] text-[var(--pp-magenta)]"
                style={{ textShadow: "0 2px 24px rgba(255,255,255,0.85)" }}
              >
                Princess
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2.5 inline-flex items-center gap-2.5 text-[clamp(0.8rem,1.6vw,1rem)] tracking-[0.42em] text-ink-700"
              >
                <span className="text-gold-600">✦</span> Events{" "}
                <span className="text-gold-600">✦</span>
              </span>
              <span className="pp-hairline mt-4 w-56" aria-hidden />
            </div>
          </Reveal>

          <Reveal delay={140} y={18}>
            <p className="t-display mt-6 text-[clamp(1.5rem,3vw,2.1rem)] leading-snug text-fg">
              Where Fairytales <span className="text-[var(--pp-magenta)]">Step Off the Page</span>
            </p>
          </Reveal>

          <Reveal delay={220} y={16}>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-fg-2">
              Magical princess experiences designed to create unforgettable memories for families
              across the Lower Mainland.
            </p>
          </Reveal>

          <Reveal delay={290} y={14}>
            <div className="mt-7">
              <PrincessReel />
            </div>
          </Reveal>

          <Reveal delay={350} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#royal-court" size="lg" className="cta-pulse">
                Explore the Royal Court
              </CTAButton>
              <CTAButton to="/pricing" variant="ghost" size="lg" className="bg-white/60">
                View Pricing
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={420} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-ink-700"
                >
                  <Icon className="h-4 w-4 text-gold-600" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ink-700/50">
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>
    </section>
  );
}

/* ============================================================================
   2 · WHAT HAPPENS AT A PRINCESS PARTY — scroll-driven timeline.
   ============================================================================ */

const MOMENTS: TimelineStep[] = [
  {
    n: "01",
    title: "The Grand Entrance",
    body: "The door opens, the room goes quiet, and a real princess steps into your celebration.",
    img: momentEntrance,
    alt: "Princess performer arriving at a Vancouver venue in a flowing green gown",
    icon: Crown,
  },
  {
    n: "02",
    title: "Storytelling & Singing",
    body: "Gentle, live storytelling and a sing-along moment every child is drawn into.",
    img: momentStory,
    alt: "Princess performer telling a story beside a waterfall",
    icon: BookOpen,
  },
  {
    n: "03",
    title: "Royal Games & Dancing",
    body: "Structured, age-aware games that keep every guest laughing and included.",
    img: momentGames,
    alt: "Princess performer twirling with open arms during party games",
    icon: Music,
  },
  {
    n: "04",
    title: "The Coronation",
    body: "Your child is crowned royalty in a moment made just for them.",
    img: momentCrown,
    alt: "Jeweled tiara resting on a velvet cushion in candlelight",
    icon: SparklesIcon,
  },
  {
    n: "05",
    title: "Memories to Treasure",
    body: "Unhurried photo time with every guest — the pictures you'll keep forever.",
    img: momentPhotos,
    alt: "Princess performer twirling in front of a grand manor",
    icon: Camera,
  },
];

/* ============================================================================
   3 · PROOF — real moments + reviews.
   ============================================================================ */

/* Real-fairytale highlight reel — placeholder imagery until final photography
   lands; swap each `src` for real photos (and the featured for the reel still). */
const REEL_FEATURED: RoyalFeatured = {
  title: "Watch the Magic Reel",
  subtitle: "See the gowns, the songs, and the unforgettable moments.",
  src: momentEntrance,
};
const REAL_MOMENTS: RoyalMoment[] = [
  { id: "arrival", label: "The Grand Arrival", src: momentEntrance, icon: Crown },
  { id: "hello", label: "A Royal Hello", src: galleryPortrait, icon: SparklesIcon },
  { id: "dance", label: "Dancing Together", src: momentGames, icon: Music },
  { id: "story", label: "Storytime by the Falls", src: momentStory, icon: BookOpen },
  { id: "twirl", label: "The Twirl", src: galleryTwirl, icon: Star },
  { id: "memory", label: "The Memory", src: momentPhotos, icon: Camera },
];

/* Family "royal notes". `em` is the gold/magenta-emphasised phrase in each quote. */
const REVIEWS = [
  {
    pre: "From the first email to the final photo, everything was effortless. Our daughter's face when the princess arrived was ",
    em: "absolutely priceless",
    post: ".",
    name: "Sarah M.",
    initials: "SM",
    role: "Birthday Visit",
    city: "Burnaby",
    favorite: false,
  },
  {
    pre: "The gown, the singing, the way she stayed perfectly in character for ninety minutes — the quality ",
    em: "genuinely surprised us",
    post: ".",
    name: "Melissa & Dean",
    initials: "MD",
    role: "Birthday Visit",
    city: "North Vancouver",
    favorite: true,
  },
  {
    pre: "Booking was simple, communication was professional, and she had twenty kids ",
    em: "calm and completely enchanted",
    post: ".",
    name: "Amrit K.",
    initials: "AK",
    role: "Community Event",
    city: "Surrey",
    favorite: false,
  },
] as const;

/* Trust badges shown above the royal reviews. */
const REVIEW_TRUST = [
  { icon: BadgeCheck, label: "Professional Performers" },
  { icon: Crown, label: "Premium Gowns" },
  { icon: SparklesIcon, label: "Magical Experiences" },
  { icon: MapPin, label: "Metro Vancouver Events" },
] as const;

/* A "Royal Note" testimonial card — gold/pink corner accents, a note label, a
   gold quote mark, gold stars, and a name/role/city footer. The fairest-favourite
   card carries a magenta ribbon and a slightly stronger frame. */
function RoyalNoteCard({ review, index }: { review: (typeof REVIEWS)[number]; index: number }) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col rounded-[20px] border bg-[rgba(255,252,247,0.9)] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7",
        review.favorite
          ? "border-[var(--pp-magenta)]/45 shadow-[0_24px_52px_-26px_rgba(162,27,97,0.4)] hover:shadow-[0_30px_56px_-24px_rgba(162,27,97,0.45)]"
          : "border-gold-500/35 shadow-[var(--shadow-sm)] hover:border-gold-500/60 hover:shadow-[0_26px_52px_-24px_rgba(207,168,98,0.4)]",
      )}
    >
      {/* gold/pink corner accents */}
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
            "pointer-events-none absolute h-6 w-6 border-gold-500/55 transition-colors duration-300 group-hover:border-gold-500",
            c,
          )}
        />
      ))}

      {/* fairest-favourite ribbon */}
      {review.favorite ? (
        <span
          aria-hidden
          className="absolute -top-px right-5 z-10 flex w-[3.1rem] flex-col items-center gap-0.5 px-1 pb-3 pt-2 text-white shadow-[0_8px_16px_-6px_rgba(162,27,97,0.55)]"
          style={{
            background: "linear-gradient(180deg, var(--pp-magenta), var(--pp-magenta-deep))",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
          }}
        >
          <Crown className="h-3.5 w-3.5" aria-hidden />
          <span className="text-center text-[0.44rem] font-bold uppercase leading-[1.15] tracking-wide">
            Royal Favourite
          </span>
        </span>
      ) : null}

      {/* note label + faint crest */}
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--pp-magenta-deep)]">
          <BookOpen className="h-4 w-4 text-gold-600" aria-hidden />
          Royal Note 0{index + 1}
        </span>
        {!review.favorite ? <Crown aria-hidden className="h-7 w-7 text-gold-500/25" /> : null}
      </div>

      {/* quote */}
      <Quote className="mt-3 h-9 w-9 text-gold-500/35" aria-hidden />
      <blockquote className="mt-1 flex-1 text-[0.97rem] leading-relaxed text-fg-2">
        {review.pre}
        <span className="pr-em">{review.em}</span>
        {review.post}
      </blockquote>

      {/* gold stars */}
      <div className="mt-5 flex items-center gap-1" aria-label="Five star review">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="h-4 w-4 fill-gold-500 text-gold-500" aria-hidden />
        ))}
      </div>

      {/* footer */}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-gold-500/20 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--pp-magenta)] to-[var(--pp-magenta-deep)] text-sm font-bold text-white shadow-[0_4px_10px_-4px_rgba(162,27,97,0.6)]">
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-tight text-fg">{review.name}</p>
          <p className="text-sm font-semibold leading-tight text-[var(--pp-magenta-deep)]">
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

/* ============================================================================
   THE PAGE — light from end to end: blush, pearl, rose, gold.
   ============================================================================ */

function PrincessPage() {
  const { guest } = Route.useSearch();

  // A guest set on the URL means someone tapped "Book Now" on a specific
  // royal guest — glide them down to the booking form with her pre-filled.
  // Defer past layout/scroll-restoration so a cold load lands accurately.
  useEffect(() => {
    if (!guest) return;
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
  }, [guest]);

  return (
    <>
      <PrincessHero />

      {/* Small trust strip — sibling of the Mermaid / Jurassic / Wonderverse bands. */}
      <WorldTrustStrip
        id="princess-trust"
        title="Trusted for Royal Celebrations"
        flankIcon={Crown}
        items={PRINCESS_TRUST}
        vars={PRINCESS_TRUST_VARS}
      />

      {/* What happens — scroll timeline (clip off so the sticky stage can pin) */}
      <Section tone="pearl" id="what-happens" sparkle clip={false}>
        {/* Enchanted backdrop — auroras + drifting sparkles, contained locally */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span
            className="aurora aurora-a"
            style={{
              left: "-8%",
              top: "6%",
              width: "440px",
              height: "440px",
              background: "radial-gradient(circle, rgba(229,154,192,0.5), transparent 70%)",
            }}
          />
          <span
            className="aurora aurora-b"
            style={{
              right: "-10%",
              top: "32%",
              width: "520px",
              height: "520px",
              background: "radial-gradient(circle, rgba(244,206,132,0.42), transparent 70%)",
            }}
          />
          <span
            className="aurora aurora-c"
            style={{
              left: "22%",
              bottom: "-6%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(168,196,235,0.4), transparent 70%)",
            }}
          />
          {PETALS.slice(0, 5).map((p, i) => (
            <span
              key={i}
              className="pcl pcl-petal"
              style={{
                left: p.left,
                top: "2%",
                width: p.s,
                height: p.s + 2,
                background: "linear-gradient(140deg, #F4CE84 20%, #E59AC0 80%)",
                animationDelay: p.delay,
                animationDuration: p.duration,
                ["--dx" as string]: p.dx,
              }}
            />
          ))}
          <span className="sparkle absolute left-[12%] top-[18%] text-xl text-gold-500/70">✦</span>
          <span
            className="sparkle absolute right-[14%] top-[12%] text-sm text-[var(--pp-magenta)]/60"
            style={{ animationDelay: "1.6s" }}
          >
            ✦
          </span>
          <span
            className="sparkle absolute bottom-[16%] left-[8%] text-sm text-gold-500/60"
            style={{ animationDelay: "2.8s" }}
          >
            ✦
          </span>
        </div>

        <SectionHeading
          eyebrow="✦ The experience ✦"
          title="What happens at a princess party?"
          description="A magical journey from beginning to end — parents book experiences, not appearances."
        />
        <div className="mt-12 lg:mt-4">
          <ScrollTimeline steps={MOMENTS} />
        </div>

        {/* You're invited to the Royal Ball */}
        <div className="mt-14">
          <RoyalInvitation />
        </div>
      </Section>

      {/* Meet the Royal Court — one continuous enchanted journey.
          A deep-night base runs beneath every kingdom; fixed-height cream →
          lavender → violet seams at the top and bottom melt it into the page. */}
      <section
        id="royal-court"
        className="navy-section relative isolate scroll-mt-24 overflow-hidden"
      >
        {/* Shared deep-night base — the indigo-BLUE the kingdoms live in
            (blue is the dominant colour; purple/lavender is only the top fade). */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(180deg, #1C2A4E 0%, #16233E 30%, #101B32 52%, #16233E 74%, #1C2A4E 100%)",
          }}
        />
        {/* Top seam — cream → soft lavender → periwinkle → deep indigo-BLUE,
            then transparent so the blue base (and the ice cavern) carries the
            majority of the band. Fixed height = consistent blend at any length. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-20 h-[820px]"
          style={{
            background:
              "linear-gradient(180deg, #F2ECE2 0%, #E3DBE9 8%, #C0B9D8 16%, #8E8FC2 24%, #5963A1 31%, #38447C 39%, #28365F 48%, #1F2D50 58%, #1B2848 72%, #1C2A4E 86%, rgba(28,42,78,0) 100%)",
          }}
        />
        {/* Bottom seam — the blue night rising back into the page's blush. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-20 h-[820px]"
          style={{
            background:
              "linear-gradient(0deg, #F2ECE2 0%, #E3DBE9 8%, #C0B9D8 16%, #8E8FC2 24%, #5963A1 31%, #38447C 39%, #28365F 48%, #1F2D50 58%, #1B2848 72%, #1C2A4E 86%, rgba(28,42,78,0) 100%)",
          }}
        />
        {/* star dust + slow aurora drifting through the whole journey */}
        <div aria-hidden className="tx-stars twinkle absolute inset-0 -z-10 opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span
            className="aurora aurora-a"
            style={{
              left: "-10%",
              top: "8%",
              width: "560px",
              height: "560px",
              background: "radial-gradient(circle, rgba(150,170,240,0.16), transparent 70%)",
            }}
          />
          <span
            className="aurora aurora-b"
            style={{
              right: "-12%",
              top: "42%",
              width: "640px",
              height: "640px",
              background: "radial-gradient(circle, rgba(229,154,192,0.13), transparent 70%)",
            }}
          />
          <span
            className="aurora aurora-c"
            style={{
              left: "20%",
              bottom: "6%",
              width: "520px",
              height: "520px",
              background: "radial-gradient(circle, rgba(244,206,132,0.10), transparent 70%)",
            }}
          />
        </div>

        <div className="relative pt-24 md:pt-28">
          <SectionHeading
            onInk
            eyebrow="✦ Meet the Royal Court ✦"
            title={princessCourt.headline}
            description="Discover the royal guests waiting throughout the kingdom."
            className="rc-heading px-5"
          />
        </div>

        <div className="mt-6">
          <KingdomDoors court={princessCourt} />
        </div>

        <p className="relative mx-auto max-w-xl px-5 pb-24 pt-4 text-center text-sm font-medium text-ink-800/90 [text-shadow:0_1px_10px_rgba(255,255,255,0.6)] md:pb-28">
          Every royal guest is a trained professional performer in a premium gown — described here
          in our own storybook language.
        </p>
      </section>

      {/* Fairy Godmother Matchmaker */}
      <Section tone="rose" sparkle id="matchmaker">
        <SectionHeading
          eyebrow="✦ The Fairy Godmother ✦"
          title="Not sure which princess? Ask the Fairy Godmother."
          description="Answer one little question and she'll match your child with their perfect royal guests."
        />
        <div className="mt-10">
          <FairyGodmother court={princessCourt} />
        </div>
      </Section>

      {/* Pricing preview */}
      <Section tone="pearl" id="pricing-preview">
        {/* Flanking royals — frame the packages on desktop (decorative) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden lg:block"
        >
          <img
            src={flankSingle}
            alt=""
            width={1000}
            height={1333}
            className="absolute bottom-0 left-0 h-[86%] w-auto -translate-x-[26%] select-none object-contain object-bottom drop-shadow-[0_20px_30px_rgba(162,27,97,0.16)] xl:h-[88%] xl:-translate-x-[13%]"
          />
          <img
            src={flankDuo}
            alt=""
            width={1000}
            height={1333}
            className="absolute bottom-0 right-0 h-[89%] w-auto translate-x-[26%] select-none object-contain object-bottom drop-shadow-[0_20px_30px_rgba(162,27,97,0.16)] xl:h-[91%] xl:translate-x-[13%]"
          />
        </div>

        <SectionHeading
          eyebrow="✦ Pricing preview ✦"
          title="Clear pricing, royal presentation"
          description="No surprises — travel within our standard Metro Vancouver service area is included."
        />
        <div className="relative mx-auto mt-12 grid max-w-2xl gap-6 md:grid-cols-2">
          {princessPricing.options.map((opt, i) => (
            <Reveal key={opt.name} delay={i * 100} y={22}>
              <div
                className={`flex h-full flex-col rounded-[var(--radius-xl)] border bg-white/85 p-7 shadow-[var(--shadow-sm)] ${
                  i === 0 ? "border-gold-500/70" : "border-gold-500/30"
                }`}
              >
                {i === 0 ? (
                  <span className="mb-3 inline-flex w-fit rounded-[var(--radius-pill)] bg-gold-500 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-900">
                    Most loved
                  </span>
                ) : null}
                <h3 className="font-display text-2xl text-fg">{opt.name}</h3>
                <ul className="mt-5 flex-1 space-y-3">
                  {opt.rates.map((r) => (
                    <li
                      key={r.label}
                      className="flex items-baseline justify-between gap-4 border-b border-gold-500/20 pb-3 last:border-0"
                    >
                      <span className="text-sm text-fg-2">{r.label}</span>
                      <span className="font-display text-2xl text-[var(--pp-magenta-deep)]">
                        {r.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-fg-3">
          {pricingPromise.included[0]}
        </p>
        <div className="mt-8 text-center">
          <CTAButton to="/pricing" size="lg">
            Explore Princess Packages
          </CTAButton>
        </div>
      </Section>

      {/* Real fairytale moments */}
      <Section tone="blush" id="real-moments">
        <SectionHeading
          eyebrow="✦ Real fairytale moments ✦"
          title="Genuine reactions, real celebrations"
          description="Our own performers, our own gowns, real Metro Vancouver events — no stock photos."
        />
        <div className="mt-10">
          <PrincessHighlightReel featured={REEL_FEATURED} moments={REAL_MOMENTS} />
        </div>
        <div className="mt-10 text-center">
          <CTAButton
            to="/gallery"
            variant="ghost"
            size="lg"
            className="!border-gold-500/55 bg-white/60 !text-[var(--pp-magenta-deep)] hover:!border-gold-500 hover:!text-[var(--pp-magenta-deep)]"
          >
            View the Royal Gallery
          </CTAButton>
        </div>
      </Section>

      {/* Reviews — "Royal Notes" trust section */}
      <Section tone="pearl" id="reviews">
        <SectionHeading
          eyebrow="✦ Royal reviews ✦"
          title="What Families Say After the Magic"
          description="Elegant performers, magical moments, and unforgettable memories — in their words."
        />

        {/* trust badges */}
        <Reveal delay={60} y={16}>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {REVIEW_TRUST.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-gold-500/25 bg-white/80 px-4 py-3.5 shadow-[var(--shadow-sm)]"
              >
                <Icon className="h-6 w-6 shrink-0 text-gold-600" aria-hidden />
                <span className="text-sm font-semibold leading-tight text-fg">{label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* royal notes */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} y={24}>
              <RoyalNoteCard review={r} index={i} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={120} y={18}>
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="flex w-full max-w-md items-center gap-3">
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/45"
              />
              <span
                aria-hidden
                className="relative grid h-10 w-10 place-items-center text-gold-600"
              >
                <Crown className="h-9 w-9" />
                <SparklesIcon className="absolute -right-0.5 -top-0.5 h-3 w-3 text-[var(--pp-magenta)]" />
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/45"
              />
            </div>
            <h3 className="mt-5 t-display text-2xl text-fg sm:text-[1.7rem]">
              Ready to begin your fairytale?
            </h3>
            <a
              href="#book"
              className="btn-magic mt-5 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-[0_16px_34px_-14px_rgba(207,168,98,0.7)] transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            >
              Begin Your Story
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Section>

      {/* FAQ — Royal Details briefing list */}
      <Section tone="blush" compact id="faq">
        <SectionHeading
          eyebrow="✦ Royal details ✦"
          title="Good to Know Before the Magic Begins"
          description="A few gentle answers to the questions families ask us most."
        />
        <div className="mt-9">
          <PrincessFaq faqs={chapter.faqs} />
        </div>
      </Section>

      {/* Begin Your Story — the booking form, dressed for the kingdom */}
      <Section tone="rose" sparkle id="book" className="scroll-mt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {PETALS.slice(0, 5).map((p, i) => (
            <span
              key={i}
              className="pcl pcl-petal"
              style={{
                left: p.left,
                top: "6%",
                width: p.s,
                height: p.s + 2,
                background: "linear-gradient(140deg, #F8C8D8 20%, #F09EBC 80%)",
                animationDelay: p.delay,
                animationDuration: p.duration,
                ["--dx" as string]: p.dx,
              }}
            />
          ))}
        </div>
        <div className="text-center">
          <Crown className="mx-auto h-8 w-8 text-gold-600" aria-hidden />
          <GoldRule className="mx-auto mt-4 max-w-xs" />
          <h2 className="t-display text-3xl text-fg md:text-5xl">Begin Your Story</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-2">
            Tell us a little about your celebration, and we&apos;ll help bring the perfect fairytale
            to life.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-4xl">
          <PrincessBookingForm requestedGuest={guest} />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-fg-3">
          No checkout today — just a quick request. We&apos;ll follow up to confirm availability.
        </p>
      </Section>
    </>
  );
}
