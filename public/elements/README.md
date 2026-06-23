# Preloader ingredients

`Preloader.tsx` renders floating ingredients from transparent PNGs in this folder.
**Files must live here (`public/elements/`) — the repo-root `/elements` folder is the
source/originals and is NOT served by Next.js.**

Required files (exact names, lowercase, transparent background):

- `nut.png`
- `rosebud.png`
- `jasmine.png`
- `cinnamon-stick.png`
- `star-anise.png`
- `rose-petal.png`
- `pistachio-single.png`
- `almond-single.png`
- `date-single.png`

To add or replace one, also update `INGREDIENT_IMAGES` (and `SIZE_MULTIPLIER`)
in `src/components/Preloader.tsx`. Missing images self-hide via `onError`.
