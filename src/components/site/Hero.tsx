import { Star, ChevronDown } from "lucide-react";
import heroCharacters from "@/assets/scenes/hero-characters.jpg";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";

/**
 * Hero — image-led. One real photograph carries the promise: every world,
 * side by side, on a Vancouver shoreline. Copy sits in the open sky/water on
 * the left; scrims stay feather-light so the photo remains the star.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-ink-900 md:min-h-[92svh]">
      {/* Our characters on the North Shore — the whole pitch in one frame */}
      <img
        src={heroCharacters}
        alt="Vancouver Character Events performers — mermaid, princess, dinosaur, and superhero together on a Vancouver beach at sunset"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_30%]"
      />

      {/* Readability scrims — subtle, the photo stays the star */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,22,38,0.42) 0%, rgba(13,22,38,0.06) 30%, rgba(13,22,38,0.34) 68%, rgba(13,22,38,0.88) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(110% 80% at 10% 88%, rgba(8,17,31,0.66), transparent 56%)",
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
