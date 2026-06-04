import { CTAButton } from "./CTAButton";

type FeatureCardProps = {
  image: string;
  title: string;
  body: string;
  to: string;
  ctaLabel?: string;
};

export function FeatureCard({ image, title, body, to, ctaLabel = "Discover more" }: FeatureCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={1024}
          height={768}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-fg">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-2">{body}</p>
        <div className="mt-5">
          <CTAButton to={to} variant="ghost" size="md">
            {ctaLabel}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
