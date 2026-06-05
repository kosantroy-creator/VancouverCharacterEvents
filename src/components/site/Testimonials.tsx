import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((t) => (
        <figure
          key={t.name}
          className="flex flex-col rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)]"
        >
          <div className="text-gold-500" aria-hidden>
            {"★★★★★"}
          </div>
          <blockquote className="mt-3 flex-1 font-display text-xl leading-snug text-fg">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 border-t border-hairline pt-4">
            <span className="block font-semibold text-fg">{t.name}</span>
            <span className="block text-sm text-fg-3">{t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
