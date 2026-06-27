# Preloader ingredients

`Preloader.tsx` renders floating ingredients from transparent images in this folder.
**Files must live here (`public/elements/`) — the repo-root `/elements` folder is the
source/originals and is NOT served by Next.js.**

Files are served as **WebP** (transparent, ~700px, optimized for fast first paint —
the original PNGs were ~2 MB each / 20 MB total, which made the preloader slow):

- `nut.webp`
- `rosebud.webp`
- `jasmine.webp`
- `cinnamon-stick.webp`
- `star-anise.webp`
- `rose-petal.webp`
- `pistachio-single.webp`
- `almond-single.webp`
- `date-single.webp`

To add or replace one: drop a transparent image here, re-export to WebP (~700px wide),
and update `INGREDIENT_IMAGES` (and `SIZE_MULTIPLIER`) in `src/components/Preloader.tsx`.
Missing images self-hide via `onError`.
