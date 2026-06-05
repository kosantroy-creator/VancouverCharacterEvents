import heroImg from "@/assets/scenes/hero-night-sky.jpg";
import { CTAButton } from "./CTAButton";
import { TrustBar } from "./TrustBar";
import { trustItems } from "@/lib/site-data";

export function Hero() {
  return (
    <>
      {/* Intro text — its own section above the artwork */}
      <section className="ink-section relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-16 text-center sm:px-6 md:pb-16 md:pt-24 lg:px-8">
          <p className="t-eyebrow text-gold-400">Premium Character Entertainment · Metro Vancouver</p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] text-star-white sm:text-5xl md:text-6xl lg:text-7xl">
            One Company.<br className="hidden sm:block" /> Endless Adventures.
          </h1>
        </div>
      </section>

      {/* Hero artwork with bottom-anchored copy */}
      <section className="relative isolate flex min-h-[72vh] flex-col overflow-hidden ink-section">
        <img
          src={heroImg}
          alt="A heroic rider on a dinosaur leading a mermaid, princess, mascot, and holiday characters beneath the Vancouver mountains and Lions Gate bridge at twilight"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        {/* readability scrim — concentrated at the bottom where the copy sits */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/10 via-ink-900/10 to-ink-900/90" />

        <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-end px-5 pb-12 pt-24 sm:px-6 md:pb-16 lg:px-8">
          <div className="mx-auto max-w-3xl animate-fade-in text-center">
            <p
              className="mx-auto max-w-2xl text-lg leading-relaxed text-fg-on-ink md:text-xl"
              style={{ textShadow: "0 1px 12px rgba(8,17,31,0.7)" }}
            >
              Princesses, Heroes, Dinosaurs, Mermaids, Mascots, Holiday Characters, and Corporate
              Entertainment across Metro Vancouver.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton to="/contact" size="lg">
                Book an Event
              </CTAButton>
              <CTAButton href="#worlds" variant="ghost-ink" size="lg">
                Explore Our Worlds
              </CTAButton>
            </div>

            <p className="mx-auto mt-7 max-w-2xl text-sm text-fg-on-ink/85" style={{ textShadow: "0 1px 8px rgba(8,17,31,0.7)" }}>
              Serving Vancouver, Coquitlam, Burnaby, Richmond, Surrey, Langley, North Vancouver, West
              Vancouver, and the wider Lower Mainland.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-ink-600/40 bg-ink-900/55 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-5 sm:px-6 lg:px-8">
          <TrustBar items={trustItems} onInk animate />
        </div>
      </div>
    </>
  );
}
