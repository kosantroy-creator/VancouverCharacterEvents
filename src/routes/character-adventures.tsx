import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Clapperboard,
  Coins,
  Compass,
  Images,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { Reveal } from "@/components/site/Reveal";
import { AdventureTimeline } from "@/components/site/AdventureTimeline";
import { InvitationModal } from "@/components/site/InvitationModal";
import { adventures, type Adventure } from "@/lib/adventures";
import { cn } from "@/lib/utils";

import mRoyal from "@/assets/adventures/royal-ball.webp";
import mHero from "@/assets/adventures/hero-bootcamp.webp";
import mMermaid from "@/assets/adventures/mermaid-lagoon-pool-party.webp";
import mPirate from "@/assets/adventures/pirate-adventure-cruise.webp";
import mGalactic from "@/assets/adventures/galactic-academy.webp";

const DESCRIPTION =
  "Join us throughout the year for unforgettable character experiences, magical celebrations, heroic training missions, pirate expeditions, and seasonal adventures across the Lower Mainland.";

/** The warm colour the hero fades down into / the intro field starts from. */
const CANVAS_TOP = "#F7EDD8";

export const Route = createFileRoute("/character-adventures")({
  head: () => ({
    meta: [
      { title: "Character Adventures 2027 | Vancouver Character Events" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Character Adventures 2027 | Vancouver Character Events" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/character-adventures" },
    ],
    links: [{ rel: "canonical", href: "/character-adventures" }],
  }),
  component: CharacterAdventuresPage,
});

/** `"program"` = the whole-year interest list (opened from the hero / final CTA). */
type InviteTarget = Adventure | "program" | null;

function CharacterAdventuresPage() {
  const [invite, setInvite] = useState<InviteTarget>(null);
  const openProgram = () => setInvite("program");

  return (
    <>
      <AdventuresHero onJoin={openProgram} />

      {/* Intro + calendar heading on a clean champagne field that the hero fades
          into. The colour-themed event bands carry the page from here. */}
      <div style={{ background: `linear-gradient(180deg, ${CANVAS_TOP} 0%, #F4E6C9 100%)` }}>
        <Band compact>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="t-eyebrow" style={{ color: "var(--gold-700)" }}>
                The 2027 Season
              </p>
              <h2 className="t-display mt-3 text-3xl leading-tight md:text-5xl">
                A year of adventures waiting to be discovered.
              </h2>
              <p className="mt-4 text-lg text-fg-2">
                Twelve ticketed adventures — one each month through 2027 — at real venues across
                Metro Vancouver. This isn&apos;t a list of one-off events; it&apos;s a single
                growing story your family follows all year long. Tickets aren&apos;t on sale yet, so
                join the interest list and we&apos;ll make sure you&apos;re first through the gates.
              </p>
            </div>
          </Reveal>
        </Band>

        <Band id="calendar" className="!pt-2">
          <SectionHeading
            eyebrow="The 2027 Adventure Calendar"
            title="Twelve months. Twelve adventures."
            description="Follow the trail through the year. Each adventure has its own world, its own character hosts, and its own venue — request an invitation for the ones that call to your family."
          />
        </Band>
      </div>

      {/* The colour-themed, full-width event bands */}
      <AdventureTimeline adventures={adventures} onRequest={(a) => setInvite(a)} />

      {/* Future expansion — a navy "jewel" panel on a soft champagne field */}
      <div style={{ background: "linear-gradient(180deg, #F6EAD0 0%, #F1E2C2 100%)" }}>
        <FutureSection />
      </div>

      {/* Final CTA */}
      <div style={{ background: "var(--grad-champagne)" }}>
        <Band className="text-center">
          <Reveal>
            <Compass className="mx-auto h-9 w-9 text-gold-600" aria-hidden />
            <h2 className="t-display mt-4 text-3xl leading-tight md:text-4xl">
              Don&apos;t miss a single adventure.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
              One interest list, a whole year of magic. We&apos;ll send word the moment tickets open
              for each 2027 adventure — your family gets first pick of dates.
            </p>
            <div className="mt-7">
              <CTAButton onClick={openProgram} size="lg" className="cta-pulse">
                <Sparkles className="h-4 w-4" aria-hidden />
                Join The Interest List
              </CTAButton>
            </div>
          </Reveal>
        </Band>
      </div>

      <InvitationModal
        open={invite !== null}
        adventure={invite && invite !== "program" ? invite : null}
        onClose={() => setInvite(null)}
      />
    </>
  );
}

/** Contained content band — transparent, so the parent section's colour shows. */
function Band({
  children,
  id,
  compact,
  className,
}: {
  children: ReactNode;
  id?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative", compact ? "py-12 md:py-16" : "py-16 md:py-24", className)}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/* ============================================================================
   HERO — montage of blended adventure worlds + the programme lockup.
   ============================================================================ */
function AdventuresHero({ onJoin }: { onJoin: () => void }) {
  // Soft feathered tiles that overlap into a single dreamy montage.
  const tiles: { src: string; pos: string; drift: string }[] = [
    { src: mRoyal, pos: "left-[-6%] w-[42%]", drift: "adv-drift-a" },
    { src: mHero, pos: "left-[24%] w-[40%]", drift: "adv-drift-b" },
    { src: mMermaid, pos: "left-[46%] w-[40%]", drift: "adv-drift-a" },
    { src: mPirate, pos: "left-[66%] w-[40%]", drift: "adv-drift-b" },
    { src: mGalactic, pos: "left-[86%] w-[40%]", drift: "adv-drift-a" },
  ];

  return (
    <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-ink-900">
      {/* montage */}
      <div aria-hidden className="absolute inset-0 -z-30">
        {tiles.map((t, i) => (
          <img
            key={i}
            src={t.src}
            alt=""
            className={cn("absolute inset-y-[-8%] h-[116%] object-cover", t.pos, t.drift)}
            style={{
              WebkitMaskImage: "radial-gradient(58% 75% at 50% 50%, #000 30%, transparent 78%)",
              maskImage: "radial-gradient(58% 75% at 50% 50%, #000 30%, transparent 78%)",
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      {/* unifying warm + depth wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 30%, rgba(20,33,57,0.86) 0%, rgba(20,33,57,0.5) 38%, rgba(20,33,57,0.2) 60%, transparent 78%), linear-gradient(180deg, rgba(20,33,57,0.7) 0%, transparent 26%, transparent 58%, rgba(20,33,57,0.55) 82%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(207,168,98,0.16) 0%, transparent 42%, rgba(229,154,192,0.12) 100%)",
        }}
      />
      {/* drifting sparkles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="ember absolute"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: `${(i * 37) % 80}%`,
              animationDuration: `${7 + (i % 5)}s`,
              animationDelay: `${(i % 7) * 0.8}s`,
            }}
          />
        ))}
      </div>
      {/* fade the hero down into the warm field so the page blends */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-0 h-28 sm:h-40"
        style={{ background: `linear-gradient(180deg, transparent, ${CANVAS_TOP})` }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="max-w-2xl">
          <Reveal y={16}>
            <p className="t-engrave inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] text-gold-300">
              <Star className="h-3 w-3 fill-gold-400 text-gold-400" aria-hidden />
              Vancouver Character Events · 2027 Season
            </p>
          </Reveal>
          <Reveal delay={120} y={18}>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.02] text-star-white">
              Character{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(100deg, var(--gold-300), var(--gold-500))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Adventures
              </span>
            </h1>
          </Reveal>
          <Reveal delay={220} y={16}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-on-ink/85">{DESCRIPTION}</p>
          </Reveal>
          <Reveal delay={320} y={14}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton onClick={onJoin} size="lg" className="cta-pulse">
                <Sparkles className="h-4 w-4" aria-hidden />
                Join The Interest List
              </CTAButton>
              <CTAButton href="#calendar" variant="ghost-ink" size="lg">
                See the 12 adventures
                <ArrowRight className="h-4 w-4" aria-hidden />
              </CTAButton>
            </div>
          </Reveal>
          <Reveal delay={420} y={12}>
            <p className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-fg-on-ink/70">
              <Calendar className="h-4 w-4 text-gold-300" aria-hidden />
              12 monthly adventures · 2027 Season · Metro Vancouver &amp; the Lower Mainland
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FUTURE EXPANSION — the vision, as a refined navy jewel panel.
   ============================================================================ */
const FUTURE = [
  {
    icon: Ticket,
    title: "Ticketed Entry",
    body: "Secure seats the moment each adventure opens for sale.",
  },
  {
    icon: Calendar,
    title: "Live Availability",
    body: "Real-time seats remaining — and a badge when an adventure sells out.",
  },
  {
    icon: Images,
    title: "Event Galleries",
    body: "Relive every adventure with photo galleries from the day.",
  },
  {
    icon: Clapperboard,
    title: "Recap Films",
    body: "Cinematic recap reels from each monthly adventure.",
  },
  {
    icon: Coins,
    title: "Collectible Tokens",
    body: "Earn a keepsake adventure token for every event you attend.",
  },
  {
    icon: Star,
    title: "Adventure Membership",
    body: "Members unlock early access, perks, and a season of magic.",
  },
];

function FutureSection() {
  return (
    <Band>
      <div className="navy-section relative overflow-hidden rounded-[var(--radius-2xl)] px-6 py-12 shadow-[var(--shadow-ink)] sm:px-10 md:px-14 md:py-16">
        <div aria-hidden className="tx-stars absolute inset-0" style={{ opacity: 0.4 }} />
        <div aria-hidden className="tx-grain absolute inset-0" />
        <div className="relative">
          <SectionHeading
            onInk
            eyebrow="Where this is headed"
            title="This is just the beginning"
            description="Character Adventures is built to grow into one of the most exciting parts of the website. Here's what's coming as the programme expands."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 70} y={20}>
                <div className="group h-full rounded-[var(--radius-xl)] border border-gold-500/25 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold-400/50">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/15 text-gold-300 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-star-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-on-ink/70">{body}</p>
                  <span className="mt-4 inline-block rounded-[var(--radius-pill)] bg-gold-500/10 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-gold-300/90">
                    Coming soon
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
