import { cn } from "@/lib/utils";
import kelp from "@/assets/mermaid/decor/kelp.webp";
import coral from "@/assets/mermaid/decor/coral.webp";
import fish from "@/assets/mermaid/decor/fish.webp";

/**
 * OceanDecor — gentle drifting ocean life layered behind a section's background,
 * the aquatic answer to the dinosaur-page foliage. A softly swaying kelp frond in
 * one bottom corner, a coral cluster in the other, and a slow fish drifting
 * across. Purely decorative (empty alt, aria-hidden), sits below the z-10 content,
 * and is reduced-motion safe (the global guard freezes the sway + drift). Alternate
 * `variant` per section so adjacent sections mirror rather than repeat. See the
 * ".ocean-decor" block in styles.css.
 */
export function OceanDecor({ variant = "a" }: { variant?: "a" | "b" }) {
  const flip = variant === "b";
  return (
    <div aria-hidden className="ocean-decor pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={kelp}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("od-kelp", flip ? "od-kelp-r" : "od-kelp-l")}
      />
      <img
        src={coral}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("od-coral", flip ? "od-coral-bl" : "od-coral-br")}
      />
      <img
        src={fish}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("od-fish", flip && "od-fish--b")}
      />
    </div>
  );
}
