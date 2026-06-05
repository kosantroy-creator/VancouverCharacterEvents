## Goal

Rebuild the homepage around the new "One Company. Endless Adventures." concept — establish trust and services first, then reveal the magical storybook world. Lighten the dark blue (ink) so the site feels less heavy, and add the missing sections (testimonials, styled map, animated pop-up storybook).

## 1. Lighten the ink (blue) palette

In `src/styles.css`, shift the ink scale moderately lighter toward a softer navy/twilight while keeping gold + white text accessible. Approx new values:

```text
--ink-900: #0E1C30   (was #08111F)
--ink-800: #142840   (was #0C1A2E)
--ink-700: #1B3450   (was #122339)
--ink-600: #294A6B   (was #1C3A57)
```

Also soften `--grad-night-sky` to start lighter (e.g. `#142840 → #1B3450 → #294A6B`). All ink sections (`.ink-section`, hero overlay, cards) inherit this automatically. I'll re-check contrast of `--fg-on-ink` text on the new background.

## 2. New homepage section order

Replace the current `src/routes/index.tsx` section flow with:

```text
1. Hero            "One Company. Endless Adventures."
2. Trust Bar       credibility stats
3. Storybook Worlds  animated pop-up book (signature element)
4. Featured Adventures
5. Real Event Moments (gallery)
6. Reviews & Testimonials  (NEW)
7. How It Works    4-step process
8. Service Area    styled map + city list (NEW map)
9. Final CTA       "What Story Will You Create?"
```

## 3. Section-by-section changes

- **Hero** (`Hero.tsx`): new headline "One Company. Endless Adventures." and subheadline listing all categories. CTAs: "Book an Event" (primary → /contact) and "Explore Our Worlds" (scrolls to storybook). Keep cinematic ink hero image (regenerate a lighter multi-character night scene to match the new palette).
- **Trust Bar**: update `trustItems` to the 5 credibility indicators (5,000+ Events Performed, Professional Performers, Premium Costumes & Experiences, Schools/Festivals & Corporate, Serving Metro Vancouver).
- **Storybook Worlds** (NEW `StorybookWorlds.tsx`): an open-book centerpiece where the 7 worlds "rise" from the pages with scroll-triggered + hover pop-up motion (CSS transforms, layered shadows, `prefers-reduced-motion` fallback to static). Uses homepage-only whimsical names mapped to existing chapter routes: Princess Kingdom, Hero Headquarters, Jurassic Valley, Mermaid Cove, Mascot Meadows, Holiday Village, Corporate District. Each card: medallion illustration, short description, Explore button → existing chapter page.
- **Featured Adventures**: reuse `FeatureCard`, reorder to Harvey the Dinosaur, Princess Experiences, Hero Training Academy with large imagery.
- **Real Event Moments**: keep `GalleryGrid` preview (placeholder photo tiles, replaceable).
- **Reviews & Testimonials** (NEW `Testimonials.tsx`): placeholder reviews from Parent / School / Festival / Corporate voices in gold-accented cards.
- **How It Works**: update `bookingSteps` to 4 steps — Choose Your Adventure, Select Your Package, Reserve Your Date, We Bring the Magic.
- **Service Area** (NEW styled map): a stylized Metro Vancouver map graphic (lightweight SVG/illustration) beside the city-chip list.
- **Final CTA**: "What Story Will You Create?" with "Book Your Adventure" + "Request a Quote" CTAs, returning to the storybook tone.

## 4. Data updates

In `src/lib/site-data.ts`: update `trustItems`, expand `bookingSteps` to 4, and add `storybookWorlds` (world display name + blurb mapped to chapter slug) and `testimonials` arrays. No changes to existing chapter routes/names.

## Technical notes

- All new components go in `src/components/site/`; colors only via existing semantic tokens — no hardcoded colors.
- Pop-up motion uses CSS/Tailwind transforms + IntersectionObserver for scroll reveal; honors reduced-motion.
- New/updated AI images for the hero and featured cards generated to match the lighter palette; saved under `src/assets/scenes/`.
- Keep components reusable, responsive, accessible (semantic headings, focus states), and SEO head() intact.

## Out of scope

- No backend/booking submission changes (form stays success-message only).
- Chapter/service pages keep their current names, routes, and SEO.