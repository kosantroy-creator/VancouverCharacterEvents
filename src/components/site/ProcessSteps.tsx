type Step = { step: string; title: string; body: string };

export function ProcessSteps({ steps, onInk = false }: { steps: Step[]; onInk?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <div
          key={s.step}
          className={`relative rounded-[var(--radius-lg)] border p-7 ${
            onInk ? "border-ink-600/50 bg-ink-700/50" : "border-border-soft bg-surface shadow-[var(--shadow-sm)]"
          }`}
        >
          <span className="font-display text-5xl text-gold-500/40">{s.step}</span>
          <h3 className={`mt-3 font-display text-xl ${onInk ? "text-star-white" : "text-fg"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${onInk ? "text-fg-on-ink/70" : "text-fg-2"}`}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
