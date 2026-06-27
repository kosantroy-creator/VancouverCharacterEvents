import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BazaarFloat — two scroll-driven helpers for the long Enchanted Bazaar page:
 * a thin gold scroll-progress bar pinned to the top, and a slim "Request a Quote"
 * pill that fades in after the hero and links straight to the request form. The pill
 * retires near the bottom (the form is already on screen there). rAF-throttled; the
 * pill is a fade, not motion-critical, so it stays useful under reduced-motion.
 * See ".bzfl-" in styles.css.
 */
export function BazaarFloat() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

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
        setShow(y > window.innerHeight * 0.75 && p < 0.9);
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
      <div aria-hidden className="bzfl-progress" style={{ transform: `scaleX(${progress})` }} />
      <a href="#bazaar-book" className={cn("bzfl-pill", show && "is-on")} tabIndex={show ? 0 : -1}>
        <Sparkles className="h-4 w-4" aria-hidden />
        Request a Quote
      </a>
    </>
  );
}
