import {
  GraduationCap,
  Mic,
  Sparkles,
  Volume2,
  ListChecks,
  HeartHandshake,
  Users,
  MessageCircle,
} from "lucide-react";
import { whyChooseUs } from "@/lib/site-data";
import { Reveal } from "./Reveal";

/** Icons paired to whyChooseUs (same order). */
const ICONS = [
  GraduationCap,
  Mic,
  Sparkles,
  Volume2,
  ListChecks,
  HeartHandshake,
  Users,
  MessageCircle,
];

/**
 * Why Choose Us — eight scannable proof points that separate us from a basic
 * character appearance. Premium and credible, never corporate-boring.
 */
export function WhyChooseUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {whyChooseUs.map((p, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Reveal key={p.title} delay={(i % 4) * 70} y={20} className="h-full">
            <div className="flex h-full flex-col rounded-[var(--radius-xl)] border border-border-soft bg-surface p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 bg-warm-white text-gold-600">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg leading-snug text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
