# Hero video

Drop a looping highlight reel here to power the homepage hero:

- `hero.mp4` (H.264/MP4 — required, broadest support)
- `hero.webm` (VP9/WebM — optional, smaller/sharper where supported)

Recommendations:

- **Length:** 8–20s seamless loop, no audio (the hero plays muted).
- **Orientation:** landscape, 16:9; the player crops to fill (`object-cover`).
- **Resolution:** 1920×1080 is plenty; keep the file lean (ideally < 6 MB) for fast mobile load.
- **Content:** real performers and genuine guest reactions — this is the site's main emotional proof.

Until a file is added, the hero falls back to the night-sky poster image
(`src/assets/scenes/hero-night-sky.jpg`) — nothing breaks if these files are absent.

Referenced in `src/components/site/Hero.tsx`.
