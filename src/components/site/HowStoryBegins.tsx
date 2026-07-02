import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarHeart, Compass, MapPinned, Sparkles, Wand2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * HowStoryBegins — replaces the generic How-It-Works: four beats strung on a gold
 * thread that draws itself in, then the REAL first step of the booking funnel —
 * three path cards that open /contact with Step 1 already answered (?path=), so the
 * explainer converts into a micro-commitment. Reduced-motion sees the thread drawn.
 * See ".hsb" in styles.css.
 */
const BEATS = [
  { icon: CalendarHeart, title: "Tell us the occasion", copy: "Date, place, guests, and the world you're dreaming of." },
  { icon: Compass, title: "We match the magic", copy: "The right characters, timing, and add-ons for your event." },
  { icon: Wand2, title: "The story arrives", copy: "A prepared performer, a real entrance, a room that lights up." },
  { icon: Sparkles, title: "The memory stays", copy: "Photos, laughter, and the moment they talk about for years." },
] as const;

const PATHS = [
  { id: "single" as const, title: "Single World", copy: "One world, one unforgettable visit.", icon: Sparkles },
  { id: "multi" as const, title: "Multi-World", copy: "Combine worlds for a bigger story.", icon: Compass },
  { id: "larger" as const, title: "Schools, Corporate & Festivals", copy: "Larger events, planned with you.", icon: MapPinned },
];

export function HowStoryBegins() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("hsb", drawn && "is-drawn")}>
      {/* four beats on a gold thread */}
      <div className="hsb-beats">
        <span aria-hidden className="hsb-thread" />
        <ol className="hsb-list">
          {BEATS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} as="li" delay={200 + i * 140} y={16} className="hsb-beat">
              <span aria-hidden className="hsb-beat-node">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="hsb-beat-title">{title}</h3>
              <p className="hsb-beat-copy">{copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* the real first step — Step 1 of the booking hall, answered from here */}
      <Reveal delay={260} y={16}>
        <p className="hsb-step-line">
          <Sparkles className="h-4 w-4" aria-hidden />
          Ready? Choose your path — it&apos;s the first step of the booking hall.
        </p>
      </Reveal>
      <ul className="hsb-paths">
        {PATHS.map(({ id, title, copy, icon: Icon }, i) => (
          <Reveal key={id} as="li" delay={320 + i * 90} y={18} className="hsb-path-cell">
            <Link to="/contact" search={{ path: id }} className="hsb-path btn-magic group">
              <span aria-hidden className="hsb-path-ic"><Icon className="h-5 w-5" /></span>
              <span className="hsb-path-title">{title}</span>
              <span className="hsb-path-copy">{copy}</span>
              <span className="hsb-path-go">
                Begin here
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
