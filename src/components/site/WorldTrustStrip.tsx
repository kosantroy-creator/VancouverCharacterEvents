import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * WorldTrustStrip — a small, reusable feature/trust strip beneath a world hero,
 * themed entirely through CSS custom properties (`--wts-*`) passed via `vars`. Six
 * compact cards on a tinted star/dot ground, each with a circular icon medallion
 * ringed in gold, a short title and subtitle. The heading fades in, a gold rule
 * draws, then the cards rise on a stagger with a medallion shimmer — the shared
 * engine behind the Mermaid Cove (.mct) and Wonderverse (.wvt) strips, used here
 * for the Princess and Hero worlds. VISIBLE BY DEFAULT (hidden only under
 * `.wts.anim` before `.is-in`), reduced-motion safe. See "REUSABLE WORLD TRUST
 * STRIP" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
export type WorldTrustItem = { icon: IconType; title: string; note: string };

export function WorldTrustStrip({
  id,
  title,
  flankIcon: Flank,
  items,
  vars,
}: {
  id: string;
  title: string;
  flankIcon: IconType;
  items: WorldTrustItem[];
  vars: Record<string, string>;
}) {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("wts relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
      style={vars as Vars}
    >
      <div aria-hidden className="wts-bg absolute inset-0" />
      <div aria-hidden className="wts-tex pointer-events-none absolute inset-0" />
      <span aria-hidden className="wts-glow wts-glow-l" />
      <span aria-hidden className="wts-glow wts-glow-r" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-10 pt-9 sm:px-6 md:pb-12 md:pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={`${id}-title`} className="wts-title">
            <Flank className="wts-title-spark h-4 w-4" aria-hidden />
            {title}
            <Flank className="wts-title-spark h-4 w-4 -scale-x-100" aria-hidden />
          </h2>
          <span aria-hidden className="wts-rule" />
        </div>

        <div className="wts-grid mt-7 md:mt-8">
          {items.map((item, i) => (
            <article key={item.title} className="wts-card" style={{ "--i": i } as Vars}>
              <span className="wts-token" aria-hidden>
                <span className="wts-token-shine" />
                <item.icon className="h-5 w-5" />
              </span>
              <div className="wts-card-text">
                <h3 className="wts-card-title">{item.title}</h3>
                <p className="wts-card-note">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
