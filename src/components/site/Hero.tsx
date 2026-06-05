import heroImg from "@/assets/scenes/hero-night-sky.jpg";
import { CTAButton } from "./CTAButton";
import { TrustBar } from "./TrustBar";
import { trustItems, storybookWorlds } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";

function ChapterLinks() {
  return (
    <nav aria-label="Our chapters" className="mt-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {storybookWorlds.map((world) => (
          <li key={world.slug}>
            <Link
              to={`/${world.slug}`}
              className="t-engrave text-[0.72rem] tracking-[0.22em] text-fg-on-ink/75 transition-colors hover:text-gold-400"
            >
              {world.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Hero() {
  return (
    <>
      {/* Intro eyebrow + chapter links */}
      <section className="ink-section relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 pb-7 pt-6 text-center sm:px-6 md:pb-9 md:pt-8 lg:px-8">
          <p className="t-eyebrow text-xs text-gold-400">Premium Character Entertainment · Metro Vancouver</p>
          <ChapterLinks />
        </div>
      </section>

      {/* Hero artwork with bottom-anchored copy pushed well below the image */}
      <section className="relative isolate flex min-h-[90vh] flex-col overflow-hidden ink-section">
        <img
          src={heroImg}
          alt="Professional costumed performers — a princess, superhero, dinosaur, mermaid, and mascot — together beneath the Vancouver mountains and Lions Gate bridge at twilight"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        {/* readability scrim — concentrated at the bottom where the copy sits */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/5 via-ink-900/35 to-ink-900/95" />

        <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-end px-5 pb-16 pt-[55vh] sm:px-6 md:pb-20 lg:px-8">
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
