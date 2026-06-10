import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Vertical travel distance in px (default 24). */
  y?: number;
  /** Starting scale for a subtle "rise" (default 1 = none). */
  scaleFrom?: number;
  /** Transition duration in ms (default 700). */
  duration?: number;
  /** Element to render (default "div"). */
  as?: ElementType;
  /** IntersectionObserver threshold (default 0.15). */
  threshold?: number;
  style?: CSSProperties;
};

/**
 * Reveal — the site's single, shared scroll-reveal primitive.
 *
 * Transform/opacity only (no layout-affecting properties), GPU-composited,
 * and fully reduced-motion aware. Server-render and client-hydrate both start
 * from the same hidden state, so there is no hydration mismatch; the element
 * reveals the moment it enters the viewport (above-the-fold content reveals
 * immediately because IntersectionObserver fires on observe).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scaleFrom = 1,
  duration = 700,
  as: Tag = "div",
  threshold = 0.15,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal immediately when motion is reduced or IntersectionObserver is
    // unavailable, so content is never left stuck hidden.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
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
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      data-reveal=""
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0) scale(${scaleFrom})`,
        transition: `opacity ${duration}ms var(--ease-out), transform ${duration}ms var(--ease-out)`,
        transitionDelay: shown ? `${delay}ms` : "0ms",
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
