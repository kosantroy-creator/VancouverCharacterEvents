import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Egg, Ghost, Snowflake, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Blossom, ChristmasTree, EasterEgg, Holly, MiniPumpkin, Present, Wreath } from "./holiday-decor";

/**
 * HolidayFaq — Part 1 of the final "Plan Your Holiday Village Visit" planning desk:
 * the "Holiday Village Details" FAQ (the holiday sibling of MascotFaq). A big cream
 * card holding a two-column accordion (Q1–5 left, Q6–10 right) of the most common
 * booking questions, opened by a + / − toggle, with a decorative Spring/Easter ·
 * Halloween · Christmas season row and a "Still have a question?" note. Sits directly
 * above HolidayBooking on a shared candlelight ground. Cream / berry / antique-gold,
 * no brown. Brand-safe seasonal language. Single-open (first open by default);
 * reduced-motion handled by the global guard in styles.css.
 */
type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What happens during a Holiday Village visit?",
    a: "A Holiday Village visit can include a festive entrance, warm greetings, simple themed interaction, seasonal photo moments, spotlight moments, and a cheerful farewell. The exact flow depends on the season, character style, package, event type, age range, and setting.",
  },
  {
    q: "What seasonal characters are available?",
    a: "Holiday Village currently includes Spring Storybook Guest & Easter Bunny visits for Easter and spring events, a Spooky Gothic Guest for Halloween-style events, and Christmas Characters & Carolers for Christmas parties, schools, malls, corporate events, and community celebrations.",
  },
  {
    q: "Is a handler included?",
    a: "Holiday Village visits are handler-supported. The helper supports timing, positioning, transitions, visibility, photo moments, and smoother character interaction so the performer can focus on greetings, photos, and seasonal magic.",
  },
  {
    q: "Are holiday visits good for younger children?",
    a: "Yes. Visits can be adjusted for younger guests, daycares, preschool groups, and children who may need time to warm up. We keep the interaction friendly, flexible, and age-appropriate.",
  },
  {
    q: "Can you attend schools, malls, corporate events, or festivals?",
    a: "Yes. Holiday Village can support private parties, schools, daycares, malls, festivals, corporate gatherings, markets, community events, and public appearances. Larger or higher-traffic events may require a custom quote based on timing, appearance needs, and flow.",
  },
  {
    q: "Can we take photos with the characters?",
    a: "Yes. Photo moments are a major part of Holiday Village visits. We can help guide family photos, group shots, school photos, mall photo moments, and quick public-event photo opportunities.",
  },
  {
    q: "Do holiday characters do activities?",
    a: "Depending on the package and setting, visits can include simple themed activities, greetings, storybook-style interaction, music moments, festive games, caroling, or photo-focused appearances.",
  },
  {
    q: "Which seasonal visit should I choose?",
    a: "Choose based on your season and event type. Spring / Easter visits are soft and cheerful, Halloween appearances are quirky and family-friendly, and Christmas visits are best for festive photos, greetings, carolers, malls, schools, corporate events, and holiday parties. If you are not sure, we can recommend the best fit.",
  },
  {
    q: "Can I request something custom?",
    a: "Custom seasonal requests may be available depending on timing, performers, costume readiness, and event needs. Use the form below and tell us the season, theme, and character style you are imagining.",
  },
  {
    q: "How do I request pricing?",
    a: "Use the form below with your event date, location, guest count, season, event type, and the character style you are interested in. We'll review the details and recommend the best Holiday Village format.",
  },
];

const SEASON_CHIPS: { label: string; icon: typeof Egg; acc: string }[] = [
  { label: "Spring / Easter", icon: Egg, acc: "#9B7BB8" },
  { label: "Halloween", icon: Ghost, acc: "#E07B39" },
  { label: "Christmas", icon: Snowflake, acc: "#B0232A" },
];

function FaqRow({
  faq,
  n,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  n: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-[#1E6E4A]/50 bg-[#F4F8F2] shadow-[0_16px_36px_-22px_rgba(30,46,33,0.4),0_0_0_1px_rgba(193,154,60,0.25)]"
          : "border-[rgba(193,154,60,0.4)] bg-[rgba(255,253,247,0.9)] hover:border-[#1E6E4A]/45",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`hfq-panel-${n}`}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6E4A]"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#E0C271] to-[#C19A3C] font-display text-[0.82rem] font-extrabold text-white shadow-[0_4px_10px_-4px_rgba(74,42,20,0.5)]">
          {n}
        </span>
        <span className="flex-1 font-display text-[0.96rem] font-semibold leading-snug text-[#6E2A48]">
          {faq.q}
        </span>
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
            isOpen ? "border-[#1E6E4A] text-[#1E6E4A]" : "border-[rgba(193,154,60,0.6)] text-[#C19A3C]",
          )}
        >
          <span aria-hidden className="relative block h-3.5 w-3.5">
            <span className="absolute left-1/2 top-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-opacity duration-300",
                isOpen && "opacity-0",
              )}
            />
          </span>
        </span>
      </button>
      <div
        id={`hfq-panel-${n}`}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-[0.9rem] leading-relaxed text-[#4A3A30]">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export function HolidayFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const left = FAQS.slice(0, 5);
  const right = FAQS.slice(5, 10);

  return (
    <section
      aria-labelledby="hfq-title"
      className="relative isolate overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFBF1 0%, #FCF6EB 30%, #FBF3E0 100%)" }}
    >
      {/* candlelight backdrop + seasonal decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="absolute left-1/2 top-[-7rem] h-[22rem] w-[44rem] -translate-x-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,238,196,0.6), transparent 70%)" }}
        />
        {/* left cluster */}
        <Wreath className="absolute left-9 top-[14%] hidden w-[52px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.18)] min-[1180px]:block" />
        <ChristmasTree className="absolute left-2 top-[24%] hidden w-[88px] drop-shadow-[0_4px_6px_rgba(110,42,72,0.2)] min-[1180px]:block" />
        <Present className="absolute left-6 top-[52%] hidden w-[48px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.18)] min-[1180px]:block" box="#B0232A" ribbon="#E0C271" />
        {/* right cluster */}
        <Wreath className="absolute right-9 top-[16%] hidden w-[50px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.18)] min-[1180px]:block" />
        <ChristmasTree className="absolute right-2 top-[26%] hidden w-[84px] drop-shadow-[0_4px_6px_rgba(110,42,72,0.2)] min-[1180px]:block" />
        <MiniPumpkin className="absolute right-7 top-[54%] hidden w-[50px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.18)] min-[1180px]:block" />
        {/* bottom corner florals */}
        <Blossom className="absolute bottom-9 left-3 hidden w-[40px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.16)] min-[760px]:block" color="#DE789B" />
        <Blossom className="absolute bottom-16 left-12 hidden w-[28px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.16)] min-[760px]:block" color="#9B7BB8" />
        <EasterEgg className="absolute bottom-2 left-11 hidden w-[26px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.16)] min-[760px]:block" color="#7FB98E" />
        <Holly className="absolute bottom-9 right-3 hidden w-[34px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.16)] min-[760px]:block" />
        <Present className="absolute bottom-2 right-11 hidden w-[40px] drop-shadow-[0_3px_4px_rgba(110,42,72,0.16)] min-[760px]:block" box="#2C7D4F" ribbon="#E0C271" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 pb-10 pt-24 sm:px-6 md:pt-28 lg:px-8">
        {/* header */}
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 font-engrave text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-[#B0892E]">
            <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-[rgba(193,154,60,0.85)]" />
            Before You Book
            <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-[rgba(193,154,60,0.85)]" />
          </span>
          <h2
            id="hfq-title"
            className="mt-3 font-display text-[clamp(2rem,4.6vw,3.1rem)] font-bold leading-[1.06]"
          >
            <span className="text-[#6E2A48]">A few helpful details before your</span>{" "}
            <span className="text-[#B0232A]">holiday visit.</span>
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-[#4A3A30]">
            Here are the most common questions about Easter visits, Halloween appearances, Christmas
            characters, photos, public events, handlers, and choosing the right Holiday Village format.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {SEASON_CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-[rgba(255,253,247,0.9)] px-3 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.1em]"
                  style={{ borderColor: `color-mix(in oklab, ${c.acc} 45%, #E0C271)`, color: c.acc }}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {c.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* the details card */}
        <div className="relative mx-auto mt-9 max-w-[1080px] rounded-[28px] border-2 border-[rgba(193,154,60,0.5)] bg-[rgba(255,253,247,0.94)] p-4 shadow-[0_30px_64px_-34px_rgba(74,42,20,0.45)] backdrop-blur-sm sm:p-6 md:p-7">
          <span className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-xl border border-[rgba(193,154,60,0.6)] bg-gradient-to-b from-[#2C7D4F] to-[#1E6E4A] px-3.5 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#FBF4DE] shadow-[0_8px_16px_-8px_rgba(30,46,33,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <CalendarDays className="h-3.5 w-3.5 text-[#FFE6A8]" aria-hidden />
            Holiday Village Details
          </span>

          <div className="mt-5 grid gap-3 md:grid-cols-2 md:gap-x-5">
            <div className="space-y-3">
              {left.map((faq, i) => (
                <FaqRow key={faq.q} faq={faq} n={i + 1} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              ))}
            </div>
            <div className="space-y-3">
              {right.map((faq, i) => {
                const idx = i + 5;
                return (
                  <FaqRow key={faq.q} faq={faq} n={idx + 1} isOpen={open === idx} onToggle={() => setOpen(open === idx ? null : idx)} />
                );
              })}

              {/* Still have a question? */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-[rgba(193,154,60,0.45)] bg-gradient-to-b from-[#FFFDF8] to-[#FBF1D6] px-4 py-3.5 shadow-[0_14px_28px_-16px_rgba(74,42,20,0.4)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/85 text-[#B0232A] shadow-[inset_0_0_0_2px_rgba(176,35,42,0.2)]">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[1.05rem] font-bold leading-tight text-[#6E2A48]">
                    Still have a question?
                  </p>
                  <p className="mt-0.5 text-[0.84rem] leading-snug text-[#5A4A3E]">
                    We&apos;re happy to help you choose the best seasonal visit for your event.{" "}
                    <Link to="/contact" className="font-semibold text-[#1E6E4A] underline-offset-2 hover:underline">
                      Contact us
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
