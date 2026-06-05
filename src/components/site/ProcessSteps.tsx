import { useEffect, useRef, useState } from "react";

type Step = { step: string; title: string; body: string };

export function ProcessSteps({ steps, onInk = false }: { steps: Step[]; onInk?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div
          key={s.step}
          className={`relative rounded-[var(--radius-lg)] border p-7 transition-all duration-700 ease-out ${
            onInk ? "border-ink-600/50 bg-ink-700/50" : "border-border-soft bg-surface shadow-[var(--shadow-sm)]"
          }`}
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(24px)",
            transitionDelay: `${i * 130}ms`,
          }}
        >
          <span className="font-display text-5xl text-gold-500/40">{s.step}</span>
          <h3 className={`mt-3 font-display text-xl ${onInk ? "text-star-white" : "text-fg"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${onInk ? "text-fg-on-ink/70" : "text-fg-2"}`}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
