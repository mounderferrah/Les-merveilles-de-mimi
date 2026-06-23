# Critical User Journeys

These journeys must never break. A change touching a CUJ requires verifying that journey before claiming done. New user-visible features should extend this table.

All rows are `[inferred — confirm]` until the product owner reviews them.

---

| ID | Journey | Steps (user's words) | Code location | Test coverage |
|---|---|---|---|---|
| CUJ-01 | Home page loads and impresses | 1. Open `/`. 2. Preloader animation plays. 3. "Enter" reveals the hero video playing. 4. Headline and CTAs are visible. | `page.tsx`, `Preloader.tsx`, `Hero.tsx` | None — untested |
| CUJ-02 | Browse collection and open a product | 1. Click "Découvrir la Collection" in hero. 2. `/collection` loads. 3. All 8 products appear in the grid. 4. Click a product card. 5. Lightbox opens with photo, description, price, and CTAs. | `collection/page.tsx`, `CreationLightbox.tsx` | None — untested |
| CUJ-03 | Filter collection by category | 1. On `/collection`, click a category (e.g. "Prestige"). 2. Grid animates and shows only Prestige products. 3. Click "Tous" to reset. | `collection/page.tsx` | None — untested |
| CUJ-04 | Reach WhatsApp from lightbox | 1. Open any product lightbox (home or collection). 2. Click the "WhatsApp" button. 3. WhatsApp opens with the correct number. | `CreationLightbox.tsx` — `wa.me/` href | None — untested. **BLOCKED by placeholder phone number.** |
| CUJ-05 | Scroll the full home page | 1. After hero, scroll through Story → Numbers → RibbonGallery → Signature → Testimonials → Instagram → Footer. 2. All sections animate in without layout shift or JS error. | All home page section components | None — untested |
| CUJ-06 | Open and close ribbon gallery lightbox | 1. On home page, click any product card in the ribbon strips. 2. Lightbox opens. 3. Press Escape or click outside. 4. Lightbox closes, ribbon continues scrolling. | `RibbonGallery.tsx`, `CreationLightbox.tsx` | None — untested |

---

## How to Verify a CUJ Before Claiming Done

```bash
npm run build        # must exit 0
npx tsc --noEmit     # must exit 0
npm run dev          # start dev server
# Then manually walk the journey steps in a browser
# For CUJ-04: confirm the wa.me/ link opens the correct number
```

For layout-sensitive journeys (CUJ-01, CUJ-05), also check at mobile width (375px) and tablet (768px).
