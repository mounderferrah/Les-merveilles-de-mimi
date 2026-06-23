# Product Requirements Document

**Status:** Reverse-engineered from codebase on 2026-06-20. Pending product-owner review.

---

## Problem & Opportunity

Les Merveilles de Mimi is a 13-year-old Algerian artisan pastry atelier with no prior digital presence beyond social media. Potential customers discover the brand on Instagram but have no destination to explore the full product range, understand the brand story, or reach out directly. The opportunity is to convert Instagram discovery into WhatsApp orders through a premium showcase site.

---

## Goals

- **Primary:** Establish a premium digital presence that communicates the brand's luxury positioning and 13-year heritage. [observed: site copy, typography choices, animation quality]
- **Secondary:** Drive Instagram follower growth by creating shareable visual content and a destination worth linking to. [inferred from stated success metric]
- **Tertiary:** Make it easy for interested customers to initiate contact via WhatsApp or Instagram DM. [observed: WhatsApp CTAs in `CreationLightbox`, `Footer`, `collection/page.tsx`]

## Non-Goals (inferred)

- Online payment / e-commerce checkout — not in current scope. [inferred]
- User accounts, order tracking, loyalty program. [inferred]
- Delivery logistics or inventory management. [inferred]
- Arabic-language version (all UI copy is French). [observed]

---

## Users & Jobs

**Primary user:** Algerian families planning a celebration (wedding, Eid, Ramadan, engagement). [confirmed]

| Job to be done | Where handled in product |
|---|---|
| "Show me what you make" | RibbonGallery (3 strips, 6 photos) + Collection page (8 creations, category filter) |
| "Convince me this is premium" | Hero video, brand story, testimonials, animated counters |
| "Let me reach you easily" | WhatsApp CTA in lightbox, footer, collection page |
| "Learn about the brand" | Story section ("13 Ans de Douce Tradition"), Signature quote |

---

## Current Scope — Shipped Capabilities

Ranked by centrality to the brand goal:

1. **Full-screen video hero** — sets premium tone on arrival. Forward-reverse loop. [observed: `Hero.tsx`]
2. **Preloader entrance animation** — reinforces luxury feel; gates content reveal. [observed: `Preloader.tsx`, `page.tsx`]
3. **Infinite-scroll ribbon gallery** — 3 rows of product photos; lightbox on click with WhatsApp/IG CTAs. [observed: `RibbonGallery.tsx`, `CreationLightbox.tsx`]
4. **Collection page** — full product catalog, category filter (Classique / Tradition / Prestige / Assortiment / Ramadan), individual lightbox. [observed: `collection/page.tsx`]
5. **Brand story section** — "13 Ans de Douce Tradition", two-column copy. [observed: `Story.tsx`]
6. **Social proof** — animated counters (13+ yrs, 1000+ clients, 3000+ boxes), 5 testimonials. [observed: `Numbers.tsx`, `Testimonials.tsx`]
7. **Signature quote** — "Façonné avec élégance, inspiré par la tradition." CSS ornament. [observed: `Signature.tsx`]
8. **Instagram section** — CTA to follow `@les_merveilles_de_mimi_`. [observed: `Instagram.tsx`]
9. **Footer with contact info** — WhatsApp, Instagram, Facebook (placeholder), email (placeholder). [observed: `Footer.tsx`]
10. **Smooth scroll** — Lenis-powered smooth scrolling across all sections. [observed: `SmoothScroll.tsx`]

---

## Constraints

- No backend, no database, no CMS — all changes require a code deploy.
- Contact is entirely through WhatsApp and Instagram; no server-side form submission.
- Product photos are stored in `public/` — not hosted on a CDN.
- Phone number, Facebook URL, and email address are currently placeholders. [observed: `docs/quality/debt-map.md`]

---

## Success Metrics

- Instagram follower count for `@les_merveilles_de_mimi_`. [confirmed]
- Volume of WhatsApp/Instagram DM inquiries. [inferred — not yet tracked digitally]

---

## Open Questions

1. What is the real WhatsApp number, email, and Facebook URL? (Needed before publishing to real customers.)
2. Does `/contact` need to be a real route, or is WhatsApp the permanent contact channel?
3. Are there plans for online ordering (cart + payment) in the 12-month horizon?
4. Who manages content updates (adding new products, new photos)? Is a CMS needed?
5. Should the collection catalog be the same on both `RibbonGallery` and `collection/page.tsx`, or intentionally different?

---

## Decision Log

- **2026-06-20:** PRD reverse-engineered from codebase; pending product-owner review.
