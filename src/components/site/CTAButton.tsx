import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-ink";
type Size = "md" | "lg";

const base =
  "btn-magic inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold tracking-wide transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-ink-900 hover:bg-gold-400 hover:shadow-[var(--glow-gold)] active:bg-gold-600",
  ghost:
    "border border-border-strong text-fg hover:border-gold-500 hover:text-fg-gold bg-transparent",
  "ghost-ink":
    "border border-gold-500/50 text-fg-on-ink hover:border-gold-400 hover:bg-gold-500/10 bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = CommonProps & { to: string; params?: Record<string, string>; href?: never };
type AnchorProps = CommonProps & { href: string; to?: never; onClick?: () => void };
type ButtonProps = CommonProps & {
  to?: never;
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function CTAButton(props: LinkProps | AnchorProps | ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} params={props.params} className={classes}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </a>
    );
  }
  const { type = "button", onClick } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
