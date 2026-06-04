import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** dark "night" band vs light parchment/cream */
  tone?: "page" | "cream" | "ink";
  id?: string;
  as?: ElementType;
};

/**
 * SectionWrapper — vertical rhythm + container. Alternating light/ink bands
 * create the storybook page-turn feel.
 */
export function Section({ children, className, tone = "page", id, as: Tag = "section" }: SectionProps) {
  const toneClass =
    tone === "ink"
      ? "ink-section"
      : tone === "cream"
        ? "bg-cream-100 text-fg"
        : "bg-cream-50 text-fg";

  return (
    <Tag id={id} className={cn("py-16 md:py-24", toneClass, className)}>
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">{children}</div>
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("t-eyebrow mb-3", className)}>{children}</p>;
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("rule-gold my-10", className)} role="presentation" />;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onInk?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onInk = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow className={onInk ? "text-gold-400" : undefined}>{eyebrow}</Eyebrow> : null}
      <h2 className="t-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-lg", onInk ? "text-fg-on-ink/80" : "text-fg-2")}>{description}</p>
      ) : null}
    </div>
  );
}
