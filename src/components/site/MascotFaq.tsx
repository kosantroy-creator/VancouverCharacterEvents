import { useState } from "react";
import { Flower2, Heart, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MascotFaq — Part 1 of the final "Plan Your Mascot Meadows Visit" planning
 * station: the "Mascot Meadows Details" FAQ. A big cream meadow card holding a
 * two-column accordion (Q1–5 left, Q6–10 right) of the most common booking
 * questions, opened by a paw + / − toggle, closing with a wooden "Still have a
 * question?" sign. Sits directly above MascotBooking on a shared meadow ground.
 * Brand-safe archetype language, no prices. Single-open (first open by default);
 * reduced-motion handled by the global guard in styles.css.
 */
type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What happens during a mascot visit?",
    a: "A mascot visit can include a cheerful entrance, hugs and hellos, high-fives, simple games, dancing, photo moments, birthday spotlight moments, and a warm farewell. The exact flow depends on the package, event type, age range, and setting.",
  },
  {
    q: "Is a handler included?",
    a: "Mascot visits are handler-supported. The helper supports movement, positioning, transitions, visibility, and smoother interaction so the mascot can focus on creating smiles, photos, and fun moments.",
  },
  {
    q: "Are mascot visits good for younger children?",
    a: "Yes. Mascot visits can be adjusted for younger guests, daycares, preschool groups, and children who may need time to warm up. We keep the interaction friendly, gentle, and flexible.",
  },
  {
    q: "Can mascots attend schools, malls, or festivals?",
    a: "Yes. Mascot Meadows can support private parties, schools, daycares, malls, festivals, community events, grand openings, and family fun days. Larger public events may require a custom quote based on timing, flow, and appearance needs.",
  },
  {
    q: "Can we take photos with the mascot?",
    a: "Yes. Photo moments are a major part of Mascot Meadows visits. We can help guide family photos, group shots, birthday photos, and quick public-event photo moments.",
  },
  {
    q: "Do mascots play games or dance?",
    a: "Depending on the package and setting, mascot visits can include simple movement games, dancing, silly reactions, and cheerful party interaction. We keep activities simple, visual, and easy for guests to follow.",
  },
  {
    q: "Which mascot should I choose?",
    a: "You can choose based on the type of moment you want. Some mascot styles are better for hugs and photos, some are better for dancing and games, and some work well for public-event energy. If you are not sure, we can recommend the best fit.",
  },
  {
    q: "Do you offer seasonal or holiday mascots?",
    a: "Yes. Seasonal mascot visits may be available for holidays, themed events, winter parties, spring celebrations, autumn events, and other calendar moments, depending on availability.",
  },
  {
    q: "Can you do custom mascot requests?",
    a: "Custom mascot-style requests may be available for brand events, school spirit, unique themes, launches, and special appearances. Custom requests may require additional planning time and a custom quote.",
  },
  {
    q: "How do I request pricing?",
    a: "Use the form below with your event date, location, guest count, event type, and the mascot style you are interested in. We'll review the details and recommend the best Mascot Meadows format.",
  },
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
          ? "border-[#4CA45D]/55 bg-[#F2F8E6] shadow-[0_16px_36px_-22px_rgba(46,74,40,0.4)]"
          : "border-[rgba(124,184,90,0.4)] bg-[rgba(255,253,246,0.9)] hover:border-[#4CA45D]/50",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`mfq-panel-${n}`}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4CA45D]"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5DA866] to-[#2C6E3A] text-white shadow-[0_4px_10px_-4px_rgba(20,50,24,0.6)]">
          <PawPrint className="h-4 w-4" aria-hidden />
        </span>
        <span className="flex-1 font-display text-[0.98rem] font-semibold leading-snug text-[#20532C]">
          <span className="text-[#4CA45D]">{n}.</span> {faq.q}
        </span>
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
            isOpen ? "border-[#4CA45D] text-[#4CA45D]" : "border-[rgba(226,169,46,0.6)] text-[#E2A92E]",
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
        id={`mfq-panel-${n}`}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-[0.9rem] leading-relaxed text-[#3C5840]">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export function MascotFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const left = FAQS.slice(0, 5);
  const right = FAQS.slice(5, 10);

  return (
    <section
      aria-labelledby="mfq-title"
      className="relative isolate overflow-hidden"
      style={{ background: "linear-gradient(180deg, #CFEBFF 0%, #EAF6FF 26%, #F4FAEA 64%, #EAF5D8 100%)" }}
    >
      {/* meadow backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mpl-bunting" style={{ top: "1.2rem" }} />
        <span className="mpl-signpost hidden md:flex">
          We&apos;re Here
          <br />
          To Help!
        </span>
        <span
          className="absolute left-1/2 top-[-9rem] h-[24rem] w-[40rem] -translate-x-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at 50% 44%, rgba(255,244,200,0.7), transparent 70%)" }}
        />
        <span className="mpl-balloon" style={{ right: "5%", top: "5rem", ["--c" as string]: "#F4977E" }} />
        <span className="mpl-balloon" style={{ right: "9%", top: "6.5rem", ["--c" as string]: "#5BB7E6" }} />
        <span className="mpl-balloon" style={{ right: "2%", top: "7rem", ["--c" as string]: "#FFD25A" }} />
        <span
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(180deg, transparent, rgba(170,214,120,0.5) 50%, #BCE08C)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 pb-10 pt-20 sm:px-6 md:pt-24 lg:px-8">
        {/* header */}
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mpl-hangsign mx-auto">
            <span aria-hidden className="mpl-hangsign-chain left-[18%]" />
            <span aria-hidden className="mpl-hangsign-chain right-[18%]" />
            <PawPrint className="h-3.5 w-3.5 text-[#FFD98E]" aria-hidden />
            Before You Book
            <PawPrint className="h-3.5 w-3.5 -scale-x-100 text-[#FFD98E]" aria-hidden />
          </span>
          <h2
            id="mfq-title"
            className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-2 font-display text-[clamp(2rem,4.6vw,3.1rem)] font-bold leading-[1.06] text-[#2C6E3A]"
          >
            A few helpful details before your mascot visit.
            <Flower2 className="h-5 w-5 text-[#F2A0C0]" aria-hidden />
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-[#2F5638]">
            Here are the most common questions about mascot visits, handlers, photos, public events,
            and choosing the right Mascot Meadows format.
          </p>
        </div>

        {/* the details card */}
        <div className="relative mx-auto mt-9 max-w-[1080px] rounded-[28px] border-2 border-[rgba(226,169,46,0.5)] bg-[rgba(255,252,242,0.92)] p-4 shadow-[0_30px_64px_-34px_rgba(46,74,40,0.5)] backdrop-blur-sm sm:p-6 md:p-7">
          <span className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-xl border border-[rgba(58,40,20,0.5)] bg-gradient-to-b from-[#6FA84E] to-[#3C7A33] px-3.5 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#FBF4DE] shadow-[0_8px_16px_-8px_rgba(20,50,24,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <PawPrint className="h-3.5 w-3.5 text-[#FFE6A8]" aria-hidden />
            Mascot Meadows Details
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
              <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-[rgba(155,118,60,0.45)] bg-gradient-to-b from-[#E8D6A8] to-[#D8BE84] px-4 py-3.5 shadow-[0_14px_28px_-16px_rgba(60,42,20,0.5)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/80 text-[#E6588F] shadow-[inset_0_0_0_2px_rgba(230,88,143,0.25)]">
                  <Heart className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[1.05rem] font-bold leading-tight text-[#5A3F1E]">
                    Still have a question?
                  </p>
                  <p className="mt-0.5 text-[0.84rem] leading-snug text-[#6B4F26]">
                    We&apos;re happy to help you choose the best mascot visit for your event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pawprint trail toward the form */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-2 -z-[5] flex justify-center">
        <svg width="320" height="40" viewBox="0 0 320 40" fill="none" className="opacity-60">
          <path d="M6,30 C70,8 130,8 180,22 C230,36 280,30 314,14" stroke="#9A7445" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14" />
        </svg>
      </div>
    </section>
  );
}
