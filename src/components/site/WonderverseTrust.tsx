import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { BadgeCheck, CalendarCheck, Camera, Sparkles, Star, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WonderverseTrust — the small feature/trust strip beneath the Wonderverse hero,
 * the celestial sibling of the Mermaid Cove strip and the Jurassic credentials
 * band: six compact cards on a pale lilac star-dust ground, each with a circular
 * amethyst icon medallion ringed in gold, a short title and subtitle. The heading
 * fades in, a gold rule draws beneath it, then the cards rise on a gentle stagger
 * with a soft medallion shimmer. IntersectionObserver-driven, VISIBLE BY DEFAULT
 * (hidden only under `.wvt.anim` before `.is-in`). See "WONDERVERSE REALM TRUST"
 * in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const ITEMS: { icon: IconType; title: string; note: string }[] = [
  {
    icon: Sparkles,
    title: "Rare & Custom Personas",
    note: "Unique characters built around your theme.",
  },
  {
    icon: Wand2,
    title: "Tailored to Your Vision",
    note: "Every appearance crafted to your event.",
  },
  { icon: Star, title: "Premium Costumes", note: "Distinctive, beautifully detailed looks." },
  {
    icon: BadgeCheck,
    title: "Professional Performers",
    note: "Polished, in-character, and reliable.",
  },
  { icon: Camera, title: "Photo Moments", note: "Memorable photos with every guest." },
  {
    icon: CalendarCheck,
    title: "Structured Experiences",
    note: "Organized timing from arrival to finale.",
  },
];

export function WonderverseTrust() {
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
      id="wonderverse-trust"
      aria-labelledby="wvt-title"
      className={cn("wvt relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="wvt-bg absolute inset-0" />
      <div aria-hidden className="wvt-tex pointer-events-none absolute inset-0" />
      <span aria-hidden className="wvt-glow wvt-glow-l" />
      <span aria-hidden className="wvt-glow wvt-glow-r" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-10 pt-9 sm:px-6 md:pb-12 md:pt-10 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="wvt-title" className="wvt-title">
            <Sparkles className="wvt-title-spark h-4 w-4" aria-hidden />
            Trusted for Unforgettable Events
            <Sparkles className="wvt-title-spark h-4 w-4 -scale-x-100" aria-hidden />
          </h2>
          <span aria-hidden className="wvt-rule" />
        </div>

        {/* the six celestial tokens */}
        <div className="wvt-grid mt-7 md:mt-8">
          {ITEMS.map((item, i) => (
            <article key={item.title} className="wvt-card" style={{ "--i": i } as Vars}>
              <span className="wvt-token" aria-hidden>
                <span className="wvt-token-shine" />
                <item.icon className="h-5 w-5" />
              </span>
              <div className="wvt-card-text">
                <h3 className="wvt-card-title">{item.title}</h3>
                <p className="wvt-card-note">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
