import { ArrowRight, ChevronDown, Leaf } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import heroPoster from "@/assets/dinosaur/harvey-hero-poster.webp";

/**
 * JurassicGateHero — Section 1, the flagship first impression. The bright golden
 * stone gate opens onto the prehistoric valley: "Welcome to the Jurassic
 * Expedition." Text sits left over a cream scrim; the gate carries the right.
 *
 * Kept clean and readable — just headline, description and CTAs. The trust badges
 * and the jungle transition now live in the ExpeditionCredentials bridge section
 * below, so nothing crowds or overlays the hero. The base just softens into the
 * credentials band's warm cream.
 */
export function JurassicGateHero() {
  return (
    <section
      id="gate"
      aria-label="Welcome to the Jurassic Expedition"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-[#FBF3DF]"
    >
      {/* the hero film — Harvey on the trail with a trainer, right-weighted so the
          forest sits behind the copy. Looping, muted, with a poster for first paint. */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_38%]"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Harvey, our life-sized T-Rex, on a redwood forest trail with a safari trainer at golden hour"
      >
        <source src="/video/harvey-reveal.mp4" type="video/mp4" />
      </video>
      {/* cream wash on the left keeps the copy crisp over the bright art */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(251,243,223,0.97) 0%, rgba(251,243,223,0.9) 26%, rgba(251,243,223,0.52) 46%, rgba(251,243,223,0.12) 62%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{ background: "linear-gradient(180deg, rgba(251,243,223,0.75), transparent)" }}
      />
      {/* gentle overall lift on small screens so copy stays crisp over the art */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#FBF3DF]/30 sm:hidden" />

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="max-w-xl">
          <Reveal y={14}>
            <span className="t-engrave inline-flex items-center gap-2 text-[0.64rem] tracking-[0.34em] text-[#9c7406]">
              <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
              Chapter Three
              <Leaf className="h-3 w-3 -scale-x-100 text-[#6E9A5E]" aria-hidden />
            </span>
          </Reveal>

          <Reveal delay={100} y={16}>
            <h1 className="mt-4 font-display font-bold leading-[0.98] text-[clamp(3rem,7.6vw,5.6rem)]">
              <span className="block text-[#2E4A38]">Jurassic</span>
              <span className="block text-[#D4A017]">Expedition</span>
            </h1>
          </Reveal>

          <Reveal delay={180} y={14}>
            <p className="mt-4 t-engrave text-[0.72rem] tracking-[0.24em] text-[#9c7406]">
              Larger-than-life prehistoric encounters
            </p>
          </Reveal>

          <Reveal delay={240} y={14}>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-[#2E4A38]/85">
              A life-sized dinosaur encounter led by safari trainers — built for birthdays, schools,
              festivals, and the kind of photo moment a kid talks about for years.
            </p>
          </Reveal>

          <Reveal delay={320} y={14}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton
                href="#meet-harvey"
                size="lg"
                className="group !bg-[#D4A017] !text-[#2A1C05] hover:!bg-[#D99A32] hover:!shadow-[0_0_30px_rgba(212,160,23,0.45)]"
              >
                Meet Harvey
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </CTAButton>
              <CTAButton
                to="/pricing"
                variant="ghost"
                size="lg"
                className="!border-[#2E4A38]/40 !text-[#2E4A38] hover:!border-[#2E4A38] hover:!text-[#1d3326]"
              >
                View Packages
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* soft cream fade at the very base so the image melts into the credentials band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24"
        style={{ background: "linear-gradient(180deg, transparent, #FBF3DF)" }}
      />

      {/* scroll cue */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-1 text-[#2E4A38]/75"
      >
        <span className="t-engrave text-[0.56rem] tracking-[0.3em]">Follow the trail</span>
        <ChevronDown className="bob-soft h-4 w-4" />
      </div>
    </section>
  );
}
