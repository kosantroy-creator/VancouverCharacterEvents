# Hero rework, storybook scroll fix, remove map

## 1. Hero — split into top + bottom layout (`src/components/site/Hero.tsx`)

Restructure the hero so the content sits at the top and bottom edges instead of all stacked near the top:

- **Top, centered**: the eyebrow ("Premium Character Entertainment · Metro Vancouver") and the headline ("One Company. / Endless Adventures.") move to the top of the hero and become center-aligned.
- **Bottom**: the subheadline ("Princesses, Heroes, Dinosaurs, ..."), the two CTA buttons (Book an Event / Explore Our Worlds), and the "Serving Vancouver, Coquitlam, ..." line move to the bottom of the hero, above the trust bar.

Implementation: change the inner container to a full-height flex column with `justify-between`; place the top block (eyebrow + headline, `text-center`, centered with `mx-auto`) at the top and the bottom block (subheadline + CTAs + serving line) at the bottom. CTAs centered on the bottom block. Trust bar strip stays at the very bottom as today.

## 2. Storybook section — make it actually animate on scroll (`src/components/site/StorybookWorlds.tsx`)

Today the book cover swings open once when the section is 35% in view. Because the homepage loads at `#worlds`, the section is already visible, so the open animation fires instantly (or before the user can see it) and nothing appears to happen on scroll.

Change the reveal to be **scroll-progress driven** instead of a one-shot:
- Track the section's scroll position relative to the viewport (scroll listener + `requestAnimationFrame`, or an `IntersectionObserver` with multiple thresholds) to compute a 0→1 progress value as the section scrolls up through the viewport.
- Drive the cover's `rotateY` (0deg → ~-172deg) and the world cards' reveal from that progress, so the book physically opens as the user scrolls and you can scrub it back and forth.
- Keep the `prefers-reduced-motion` fallback: fully open immediately, no scrub.

This makes the open/close visibly tied to scrolling so it's testable.

## 3. Remove the Metro Vancouver map (`src/routes/index.tsx`)

In the Service Area section, remove the `<ServiceAreaMap />` graphic. Convert the section from the two-column (map + text) grid to a single centered column with the heading and the `ServiceAreaChips` city list. Leave `ServiceAreaChips` in place; the `ServiceAreaMap` component file can stay unused (or be deleted) — the import for `ServiceAreaMap` will be removed from `index.tsx`.

## Technical notes
- All changes are presentation-only in `Hero.tsx`, `StorybookWorlds.tsx`, and `index.tsx`.
- No data, routing, or backend changes.
- Keep existing semantic color tokens and the gold/ink styling.
- While in `index.tsx`, also quietly fix the unrelated Footer hydration warning is out of scope here (separate file); not touched.
