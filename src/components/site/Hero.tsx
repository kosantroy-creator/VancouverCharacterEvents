import heroImg from "@/assets/scenes/hero-night-sky.jpg";
import { CTAButton } from "./CTAButton";
import { TrustBar } from "./TrustBar";
import { trustItems } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden ink-section">
      <img
        src={heroImg}
        alt="A glowing storybook beneath the Vancouver mountains, Lions Gate bridge, and a starlit night sky"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_22%]"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      {/* readability scrim — stronger on the left where the copy sits */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/85" />

      <div className="mx-auto w-full max-w-[1200px] flex-1 px-5 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        <div className="max-w-3xl animate-fade-in">
          <p className="t-eyebrow text-gold-400">Premium Character Entertainment · Metro Vancouver</p>
          <h1
            className="mt-4 font-display text-4xl font-normal leading-[1.05] text-star-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 24px rgba(8,17,31,0.55), 0 1px 2px rgba(8,17,31,0.6)" }}
          >
            One Company.<br className="hidden sm:block" /> Endless Adventures.
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-on-ink/90 md:text-xl"
            style={{ textShadow: "0 1px 12px rgba(8,17,31,0.5)" }}
          >
            Princesses, Heroes, Dinosaurs, Mermaids, Mascots, Holiday Characters, and Corporate
            Entertainment across Metro Vancouver.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton to="/contact" size="lg">
              Book an Event
            </CTAButton>
            <CTAButton href="#worlds" variant="ghost-ink" size="lg">
              Explore Our Worlds
            </CTAButton>
          </div>

          <p className="mt-8 max-w-2xl text-sm text-fg-on-ink/75" style={{ textShadow: "0 1px 8px rgba(8,17,31,0.5)" }}>
            Serving Vancouver, Coquitlam, Burnaby, Richmond, Surrey, Langley, North Vancouver, West
            Vancouver, and the wider Lower Mainland.
          </p>
        </div>
      </div>

      <div className="border-t border-ink-600/40 bg-ink-900/55 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-5 sm:px-6 lg:px-8">
          <TrustBar items={trustItems} onInk animate />
        </div>
      </div>
    </section>
  );
}
