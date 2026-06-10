import { Star, ChevronDown } from "lucide-react";
import heroPoster from "@/assets/scenes/hero-night-sky.jpg";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";

/**
 * Hero — cinematic, video-led. The footage is the emotional proof; text is kept
 * light and readable over a subtle gradient scrim. Text entrance uses our CSS
 * Reveal primitive (no GSAP — the video is already the "wow" moment).
 *
 * VIDEO SLOT: drop a looping highlight reel at `public/video/hero.mp4`
 * (and optionally `hero.webm`). Until then, the night-sky poster shows — nothing
 * breaks if the file is missing. See public/video/README.md.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-ink-900 md:min-h-[92svh]">
      {/* Background video (muted autoplay loop; poster fallback) */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability scrims — subtle, so the footage stays the star */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,22,38,0.5) 0%, rgba(13,22,38,0.12) 28%, rgba(13,22,38,0.5) 70%, rgba(13,22,38,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(120% 78% at 12% 92%, rgba(8,17,31,0.72), transparent 58%)",
        }}
      />

      {/* Copy */}
      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-32 sm:px-6 md:pb-24 lg:px-8">
        <div className="max-w-2xl">
          <Reveal as="p" className="t-eyebrow text-gold-300" y={14}>
            Metro Vancouver &amp; the Lower Mainland
          </Reveal>

          <Reveal delay={80} y={20}>
            <h1 className="t-display mt-4 text-balance text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.05] text-star-white [text-shadow:0_2px_22px_rgba(8,17,31,0.5)]">
              Vancouver character events that feel like{" "}
              <span className="text-gold-300">stepping into a story</span>
            </h1>
          </Reveal>

          <Reveal delay={180} y={18}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-on-ink/85">
              Princesses, heroes, dinosaurs, mermaids, mascots, holiday characters, and specialty
              performers for birthdays, schools, festivals, and corporate events.
            </p>
          </Reveal>

          <Reveal delay={280} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/contact" size="lg" className="cta-pulse">
                Book an Experience
              </CTAButton>
              <CTAButton href="#choose-your-chapter" variant="ghost-ink" size="lg">
                Explore Characters
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-fg-on-ink/80">
              <span className="inline-flex items-center gap-1.5" aria-label="Five star rated">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden />
                ))}
                <span className="ml-1 text-sm font-semibold text-star-white">
                  Loved by Vancouver families
                </span>
              </span>
              <span className="hidden h-4 w-px bg-fg-on-ink/25 sm:block" aria-hidden />
              <span className="text-sm">Real performers · real events · real reactions</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-4 left-1/2 -translate-x-1/2 text-fg-on-ink/45">
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>
    </section>
  );
}
