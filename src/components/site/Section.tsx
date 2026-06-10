import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

/** Light-first storybook tones; navy/ink are rare accents, not the field. */
type Tone = "ivory" | "parchment" | "champagne" | "sky" | "navy" | "page" | "cream" | "ink";

const TONE_BG: Record<Tone, string> = {
  ivory: "var(--grad-ivory)",
  parchment: "var(--grad-parchment)",
  champagne: "var(--grad-champagne)",
  sky: "var(--grad-sky-soft)",
  page: "var(--grad-page-warm)",
  cream: "var(--grad-cream-warm)",
  navy: "var(--grad-navy-panel)",
  ink: "var(--grad-ink-dusk)",
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  as?: ElementType;
  /** faint gold filigree on light tones (default on) */
  filigree?: boolean;
  /** floating sparkle field on light tones */
  sparkle?: boolean;
  /** tighten vertical rhythm */
  compact?: boolean;
};

/**
 * Section — the page's light storybook band.
 *
 * Backgrounds gain depth from layered light, paper grain, faint gold linework
 * and optional sparkle — never heavy dark fills. Navy and ink are reserved as
 * rare premium accents (a single jewel, a finale), keeping the page bright.
 */
export function Section({
  children,
  className,
  tone = "ivory",
  id,
  as: Tag = "section",
  filigree = true,
  sparkle = false,
  compact = false,
}: SectionProps) {
  const dark = tone === "navy" || tone === "ink";
  const toneClass = tone === "ink" ? "ink-section" : tone === "navy" ? "navy-section" : "text-fg";

  return (
    <Tag
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        compact ? "py-12 md:py-16" : "py-16 md:py-24",
        toneClass,
        className,
      )}
      style={dark ? undefined : { background: TONE_BG[tone] }}
    >
      {/* Texture */}
      {dark ? (
        <>
          <div aria-hidden className="tx-stars absolute inset-0" style={{ opacity: 0.35 }} />
          <div aria-hidden className="tx-grain absolute inset-0" />
        </>
      ) : (
        <>
          {filigree ? <div aria-hidden className="tx-filigree absolute inset-0" /> : null}
          {sparkle ? (
            <div
              aria-hidden
              className="tx-sparkle-field absolute inset-0"
              style={{ opacity: 0.4 }}
            />
          ) : null}
          <div aria-hidden className="tx-paper absolute inset-0" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {children}
      </div>
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
      {eyebrow ? (
        <Eyebrow className={onInk ? "text-gold-400" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className="t-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-lg", onInk ? "text-fg-on-ink/80" : "text-fg-2")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
