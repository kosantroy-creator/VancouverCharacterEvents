import { Star, ChevronDown } from "lucide-react";
import heroCharacters from "@/assets/scenes/hero-beach-midday.webp";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";

/**
 * Hero — image-led and BRIGHT. One real midday photograph carries the promise:
 * every world, side by side, in full Vancouver sunshine. The cast stands on the
 * right; the copy lives in the open sea-and-sky on the left over a soft cream
 * scrim, so the page opens sunny instead of cinematic-dark.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-warm-white md:min-h-[92svh]">
      {/* Our characters on the North Shore at midday — the whole pitch in one frame */}
      <img
        src={heroCharacters}
        alt="Vancouver Character Events performers — mermaid, princess, dinosaur, mascot, and superhero together on a sunny Vancouver beach"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_42%]"
      />

      {/* Readability scrims — a soft pool of cream light on the copy side */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(253,250,244,0.88) 0%, rgba(253,250,244,0.6) 30%, rgba(253,250,244,0.18) 52%, rgba(253,250,244,0) 68%)",
        }}
      />
      {/* gentle white rise at the base so the trust strip hand-off is seamless */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-28"
        style={{ background: "linear-gradient(180deg, rgba(255,253,247,0) 0%, #FFFDF7 100%)" }}
      />

      {/* Copy — navy on sunlight */}
      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-20 pt-28 sm:px-6 md:pb-24 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal as="p" className="t-eyebrow text-[#7A5B22]" y={14}>
            Metro Vancouver &amp; the Lower Mainland
          </Reveal>

          <Reveal delay={80} y={20}>
            <h1 className="t-display mt-4 text-balance text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.05] text-[#16234A]">
              Vancouver character events that feel like{" "}
              <span className="text-[#9A6E2B]">stepping into a story</span>
            </h1>
          </Reveal>

          <Reveal delay={180} y={18}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3C4670]">
              Princesses, heroes, dinosaurs, mermaids, mascots, holiday characters, and specialty
              performers for birthdays, schools, festivals, and corporate events.
            </p>
          </Reveal>

          <Reveal delay={280} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/contact" size="lg" className="cta-pulse">
                Book an Experience
              </CTAButton>
              <CTAButton href="#choose-your-chapter" variant="ghost" size="lg">
                Explore Characters
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={380} y={14}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#3C4670]">
              <span className="inline-flex items-center gap-1.5" aria-label="Five star rated">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" aria-hidden />
                ))}
                <span className="ml-1 text-sm font-semibold text-[#16234A]">
                  Loved by Vancouver families
                </span>
              </span>
              <span className="hidden h-4 w-px bg-[#16234A]/25 sm:block" aria-hidden />
              <span className="text-sm">Real performers · real events · real reactions</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#16234A]/45">
        <ChevronDown className="bob-soft h-5 w-5" />
      </div>
    </section>
  );
}
