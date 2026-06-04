import type { EventType } from "@/lib/site-data";

export function EventTypeCard({ event }: { event: EventType }) {
  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] border border-border-soft bg-surface p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[var(--shadow-md)]">
      <span className="t-eyebrow mb-2 text-[0.68rem]">{event.audience}</span>
      <h3 className="font-display text-xl text-fg">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-2">{event.description}</p>
    </div>
  );
}
