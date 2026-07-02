import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HomeFloat — the homepage's scroll companions: a thin gold progress bar pinned to
 * the top, and a slim booking pill that fades in after the hero and retires near the
 * final invitation. While a world panel occupies the viewport (elements marked
 * data-world-panel / data-world-name / data-world-accent), the pill goes contextual —
 * "Book Princess Realm" tinted in that world's hue, deep-linking /contact?world=slug —
 * so desire is carried into the click. rAF-throttled; fades only, reduced-motion safe.
 * See ".hfl-" in styles.css.
 */
type ActiveWorld = { slug: string; name: string; accent: string } | null;

export function HomeFloat() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [world, setWorld] = useState<ActiveWorld>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const y = window.scrollY;
        const p = max > 0 ? y / max : 0;
        setProgress(p);
        setShow(y > window.innerHeight * 0.75 && p < 0.92);

        // Which world panel holds the viewport centre?
        const mid = window.innerHeight / 2;
        let hit: ActiveWorld = null;
        for (const el of document.querySelectorAll<HTMLElement>("[data-world-panel]")) {
          const r = el.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) {
            hit = {
              slug: el.dataset.worldPanel ?? "",
              name: el.dataset.worldName ?? "",
              accent: el.dataset.worldAccent ?? "#C19A3C",
            };
            break;
          }
        }
        setWorld((prev) => (prev?.slug === hit?.slug ? prev : hit));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="hfl-progress" style={{ transform: `scaleX(${progress})` }} />
      <Link
        to="/contact"
        search={world?.slug ? { world: world.slug } : undefined}
        className={cn("hfl-pill", show && "is-on")}
        tabIndex={show ? 0 : -1}
        style={world ? ({ "--acc": world.accent } as React.CSSProperties) : undefined}
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        {world?.name ? `Book ${world.name}` : "Book an Experience"}
      </Link>
    </>
  );
}
