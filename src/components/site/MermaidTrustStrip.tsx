import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Anchor, Crown, Droplets, Music, Shell, Sun, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MermaidTrustStrip — the feature strip beneath the hero, styled as a row of
 * tide-pool tokens: pearl-seafoam cards with a circular aqua icon badge ringed in
 * gold, a short title + subtitle, on a pale shell-textured ground with soft water
 * caustics and faint coral accents. The heading fades in, a gold tide-line draws
 * beneath it, then the tokens rise on a gentle stagger with a pearl icon shimmer.
 * Reveals are IntersectionObserver-driven and VISIBLE BY DEFAULT (hidden only
 * under `.mct.anim` before `.is-in`). See the "MERMAID COVE TRUST" block in
 * styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const ITEMS: { icon: IconType; title: string; note: string }[] = [
  { icon: Waves, title: "Swimming Mermaids", note: "Real performers who swim with your guests." },
  { icon: Anchor, title: "Pirate Handler Included", note: "A friendly pirate guides every visit." },
  { icon: Droplets, title: "Public & Private Pools", note: "Backyard pools to community centres." },
  { icon: Music, title: "Storytime & Singing", note: "Gentle ocean tales and sing-along moments." },
  {
    icon: Crown,
    title: "Crowning & Mermaid Rides",
    note: "A magical crowning and poolside rides.",
  },
  { icon: Sun, title: "Summer Games & Activities", note: "Playful, structured fun all afternoon." },
];

export function MermaidTrustStrip() {
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
      id="cove-trust"
      aria-labelledby="mct-title"
      className={cn("mct relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mct-bg absolute inset-0" />
      <div aria-hidden className="mct-tex pointer-events-none absolute inset-0" />
      {/* faint coral / shell accents anchoring the bottom corners */}
      <span aria-hidden className="mct-coral mct-coral-l" />
      <span aria-hidden className="mct-coral mct-coral-r" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-14 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="mct-title" className="mct-title">
            <Shell className="mct-title-shell h-4 w-4" aria-hidden />
            Trusted for Magical Memories
            <Shell className="mct-title-shell h-4 w-4 -scale-x-100" aria-hidden />
          </h2>
          <span aria-hidden className="mct-rule" />
        </div>

        {/* the six tide-pool tokens */}
        <div className="mct-grid mt-10 md:mt-12">
          {ITEMS.map((item, i) => (
            <article key={item.title} className="mct-card" style={{ "--i": i } as Vars}>
              <span className="mct-token" aria-hidden>
                <span className="mct-token-shine" />
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mct-card-title">{item.title}</h3>
              <p className="mct-card-note">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
