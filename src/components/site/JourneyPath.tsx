import { useEffect, useRef, useState } from "react";
import { ClipboardList, Wand2, CalendarCheck, PartyPopper, type LucideIcon } from "lucide-react";
import { howItWorks } from "@/lib/site-data";

/** One icon per step, in order. */
const ICONS: LucideIcon[] = [ClipboardList, Wand2, CalendarCheck, PartyPopper];

/**
 * JourneyPath — the "How it works" journey.
 *
 * Four steps strung along a dashed gold trail (horizontal on desktop, vertical
 * on mobile) that draws itself in as the section enters view, with the numbered
 * stations popping in sequence. Motion is pure CSS (this is a calm section, not
 * a GSAP showpiece) and fully reduced-motion safe.
 */
export function JourneyPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto max-w-[1080px]">
      {/* Dashed trail — vertical on mobile/tablet */}
      <div
        aria-hidden
        className="absolute bottom-10 left-[31px] top-10 border-l-[3px] border-dashed border-gold-500/45 lg:hidden"
        style={{
          transform: drawn ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 1100ms var(--ease-out)",
        }}
      />
      {/* Dashed trail — horizontal on desktop */}
      <div
        aria-hidden
        className="absolute left-[12%] right-[12%] top-[31px] hidden border-t-[3px] border-dashed border-gold-500/45 lg:block"
        style={{
          transform: drawn ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 1100ms var(--ease-out)",
        }}
      />

      <ol className="relative grid gap-y-9 lg:grid-cols-4 lg:gap-x-6">
        {howItWorks.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li
              key={s.step}
              className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
              style={{
                opacity: drawn ? 1 : 0,
                transform: drawn ? "none" : "translateY(20px)",
                transition: "opacity 600ms var(--ease-out), transform 600ms var(--ease-out)",
                transitionDelay: drawn ? `${i * 130}ms` : "0ms",
              }}
            >
              <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold-500/45 bg-surface shadow-[var(--shadow-md)] lg:mb-5">
                <Icon className="h-7 w-7 text-gold-600" aria-hidden />
                <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink-900 text-[0.62rem] font-bold text-gold-300">
                  {i + 1}
                </span>
              </div>
              <div className="lg:px-2">
                <h3 className="font-display text-xl text-fg">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
