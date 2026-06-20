import { useEffect, useState } from "react";
import { BadgeCheck, ChevronDown, Play, Sparkles, Star, Wand2, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import heroPoster from "@/assets/specialty/wonderverse-gateway.webp";

/**
 * WonderverseHero — Section 1 of /specialty-events (Wonderverse Realm). The violet
 * theatre-hall film plays full-bleed; the copy sits directly on the art at the
 * left over a soft lilac wash — the same lockup → headline → reel → CTAs →
 * trust-row composition as the Princess, Hero and Jurassic heroes (no glass
 * panel). A "Vancouver / Wonderverse / Realm" wordmark, a display headline, a
 * descriptive line, a "Watch Us In Action" reel, two CTAs and a trust row.
 * Drifting star-motes and slow twinkles sparkle over the realms on the right.
 * Reduced-motion safe (the global guard pauses the loops; entrances use the
 * shared Reveal). See "WONDERVERSE REALM HERO" in styles.css.
 */
const VIDEO_SRC = "/video/wonderverse-hero.mp4";

/** Deterministic drifting star-motes — identical on server & client. */
const MOTES = [
  { left: "54%", top: "20%", delay: "0s", dur: "9s", s: 5 },
  { left: "66%", top: "58%", delay: "2.4s", dur: "11s", s: 4 },
  { left: "74%", top: "26%", delay: "1.1s", dur: "10s", s: 6 },
  { left: "84%", top: "48%", delay: "3.6s", dur: "12s", s: 4 },
  { left: "92%", top: "18%", delay: "0.7s", dur: "9.5s", s: 5 },
  { left: "60%", top: "74%", delay: "2.9s", dur: "10.5s", s: 4 },
  { left: "88%", top: "70%", delay: "1.8s", dur: "11.5s", s: 6 },
] as const;

const TWINKLES = [
  { left: "58%", top: "16%", size: "1.2rem", delay: "0s" },
  { left: "79%", top: "12%", size: "0.85rem", delay: "1.6s" },
  { left: "70%", top: "72%", size: "0.95rem", delay: "2.8s" },
  { left: "90%", top: "40%", size: "0.75rem", delay: "0.9s" },
] as const;

const TRUST = [
  { icon: Sparkles, label: "Rare & custom personas" },
  { icon: Wand2, label: "Tailored to your vision" },
  { icon: Star, label: "Premium costumes" },
  { icon: BadgeCheck, label: "Professional performers" },
] as const;

export function WonderverseHero() {
  return (
    <section
      aria-label="Vancouver Wonderverse Realm"
      className="relative isolate flex min-h-[94svh] items-center overflow-hidden bg-[#F1ECFB]"
    >
      {/* the theatre-hall film — full-bleed, looping + muted, poster for first paint */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[64%_center]"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A grand violet theatre hall whose gilded archways open onto magical realms beneath a star-dust ceiling"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* left lilac wash — keeps the deep-purple copy legible over the art */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, rgba(243,239,251,0.97) 0%, rgba(243,239,251,0.9) 26%, rgba(243,239,251,0.55) 46%, rgba(243,239,251,0.16) 62%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-40"
        style={{ background: "linear-gradient(180deg, rgba(243,239,251,0.82), transparent)" }}
      />
      {/* gentle overall lift on small screens so copy stays crisp over the art */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#F1ECFB]/30 sm:hidden" />

      {/* drifting star-motes + slow twinkles over the realms */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="wvh-mote"
            style={{
              left: m.left,
              top: m.top,
              width: m.s,
              height: m.s,
              animationDelay: m.delay,
              animationDuration: m.dur,
            }}
          />
        ))}
        {TWINKLES.map((t, i) => (
          <span
            key={`t-${i}`}
            className="wvh-twinkle"
            style={{
              left: t.left,
              top: t.top,
              fontSize: t.size,
              animationDelay: t.delay,
              animationDuration: "4.5s",
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="max-w-xl">
          <Reveal y={16}>
            <div className="flex flex-col items-start">
              <span aria-hidden className="inline-flex items-center gap-2">
                <Sparkles
                  className="h-5 w-5 shrink-0 text-[var(--chapter-specialty)]"
                  aria-hidden
                />
                <span className="t-engrave text-[clamp(1.05rem,2.3vw,1.65rem)] tracking-[0.2em] text-[var(--chapter-specialty-deep)]">
                  Vancouver
                </span>
              </span>
              <h1 className="sr-only">
                Vancouver Wonderverse Realm — rare, custom characters for unique events
              </h1>
              <span
                aria-hidden
                className="t-script-hero mt-1 block text-[clamp(2.7rem,7.2vw,4.9rem)] leading-[0.9] text-[#7A45C6]"
                style={{ textShadow: "0 2px 18px rgba(255,255,255,0.9)" }}
              >
                Wonderverse
              </span>
              <span
                aria-hidden
                className="t-engrave mt-2 inline-flex items-center gap-2.5 text-[clamp(0.78rem,1.5vw,1rem)] tracking-[0.4em] text-[var(--chapter-specialty-deep)]"
              >
                <Star
                  className="h-3 w-3 fill-[var(--chapter-specialty)] text-[var(--chapter-specialty)]"
                  aria-hidden
                />
                Realm
                <Star
                  className="h-3 w-3 fill-[var(--chapter-specialty)] text-[var(--chapter-specialty)]"
                  aria-hidden
                />
              </span>
              <span
                aria-hidden
                className="mt-4 block h-px w-56"
                style={{
                  background:
                    "linear-gradient(90deg, var(--chapter-specialty), #6E7FD6 55%, transparent)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={200} y={16}>
            <p className="t-display mt-3 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug text-[var(--chapter-specialty-deep)]">
              Rare, custom characters for truly unique events
            </p>
          </Reveal>

          <Reveal delay={260} y={16}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#4A3578]">
              Distinctive, imaginative, and beautifully presented — specialty performers and custom
              personas for events that want to stand apart across Metro Vancouver.
            </p>
          </Reveal>

          <Reveal delay={300} y={14}>
            <WonderReel />
          </Reveal>

          <Reveal delay={340} y={16}>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                to="/contact"
                size="lg"
                className="group cta-pulse !bg-[var(--chapter-specialty)] !text-white hover:!bg-[var(--chapter-specialty-deep)] hover:!shadow-[0_0_30px_rgba(182,139,230,0.5)]"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Bring a Character to Life
              </CTAButton>
              <CTAButton
                to="/pricing"
                variant="ghost"
                size="lg"
                className="!border-[var(--chapter-specialty-deep)]/45 !bg-white/75 !text-[var(--chapter-specialty-deep)] hover:!border-[var(--chapter-specialty)] hover:!text-[var(--chapter-specialty-deep)]"
              >
                View Pricing
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-wide text-[var(--chapter-specialty-deep)]"
                >
                  <Icon className="h-4 w-4 text-[var(--chapter-specialty)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* soft bottom seam into the ivory section below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24"
        style={{ background: "linear-gradient(180deg, transparent, var(--ivory) 96%)" }}
      />

      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--chapter-specialty-deep)]/50"
      >
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   "Watch Us In Action" — a white play-pill + a lazy fullscreen video modal
   (matches the Princess / Hero reel styling; reuses the hero film).
   --------------------------------------------------------------------------- */
function WonderReel() {
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
        className="group mt-7 inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--chapter-specialty)]/30 bg-white/85 py-2 pl-2 pr-5 text-left backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--chapter-specialty)]"
      >
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--chapter-specialty)] to-[var(--chapter-specialty-deep)] text-white shadow-[0_6px_16px_-6px_rgba(92,63,148,0.7)]">
          <span
            aria-hidden
            className="watch-ring absolute inset-0 rounded-full ring-2 ring-[var(--chapter-specialty)]/50"
          />
          <Play className="h-4 w-4 translate-x-px fill-white" aria-hidden />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="t-engrave text-[0.56rem] tracking-[0.2em] text-[var(--chapter-specialty-deep)]">
            Featured Reel
          </span>
          <span className="text-[0.98rem] font-bold text-[var(--chapter-specialty-deep)]">
            Watch Us In Action
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#160A2C]/92 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Wonderverse Realm reel"
        >
          <video
            src={VIDEO_SRC}
            poster={heroPoster}
            autoPlay
            controls
            loop
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88svh] w-auto max-w-[96vw] rounded-[var(--radius-lg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
          <button
            type="button"
            aria-label="Close reel"
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
