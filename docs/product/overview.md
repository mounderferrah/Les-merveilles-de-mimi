# Product Overview

**Les Merveilles de Mimi** is a luxury brand showcase website for a 13-year-old Algerian artisan pastry atelier. It is a static marketing site with no backend, no checkout, and no user accounts. The primary call-to-action is to contact the business via WhatsApp or follow on Instagram.

---

## Main User Flows

### 1. Arrival & Impression (Home Page)
The visitor lands on a preloader animation that fades into a full-screen video hero. The video plays forward then reverses in a loop, establishing the premium brand feel. A headline ("Les Merveilles / de Mimi") and two CTAs appear — "Découvrir la Collection" (links to `/collection`) and "Nous Contacter" (links to `/contact`, which currently returns 404).

### 2. Brand Story Scroll (Home Page)
Scrolling through the home page reveals five stacked sections in sequence:
- **Story** — brand history copy, "13 Ans de Douce Tradition"
- **Numbers** — animated counters: 13+ years, 1000+ clients, 3000+ boxes, 100% handmade
- **Ribbon Gallery** — three infinite-scroll strips of product photos; clicking any card opens the lightbox
- **Signature** — large decorative quote in Arabic-inspired typography
- **Testimonials** — auto-rotating carousel of 5 customer reviews
- **Instagram section** — CTA to follow on social media
- **Footer** — contact details, navigation, social links

### 3. Browse the Collection (`/collection`)
Dedicated gallery page with a sticky category filter bar (Tous / Classique / Tradition / Prestige / Assortiment / Ramadan). 8 products are listed in a responsive grid. Filtering animates the grid. Clicking any product opens the shared lightbox showing an image carousel, description, indicative price, and WhatsApp/Instagram contact buttons.

### 4. Contact via Lightbox
The lightbox on both pages surfaces two direct-contact actions: WhatsApp deep-link (`wa.me/`) and Instagram profile link. This is the conversion endpoint for the entire site.

---

## Shipped Capabilities

| Capability | Component(s) |
|---|---|
| Preloader entrance animation | `Preloader.tsx` |
| Full-screen looping video hero | `Hero.tsx` |
| Smooth scroll (Lenis) | `SmoothScroll.tsx` |
| Brand story copy | `Story.tsx` |
| Animated social-proof counters | `Numbers.tsx` |
| Infinite-scroll product ribbons | `RibbonGallery.tsx` |
| Decorative signature quote | `Signature.tsx` |
| Auto-rotating testimonials | `Testimonials.tsx` |
| Instagram follower CTA | `Instagram.tsx` |
| Category-filtered product gallery | `collection/page.tsx` |
| Product lightbox (image carousel, keyboard nav, swipe, CTAs) | `CreationLightbox.tsx` |
| Global nav + footer | `Navbar.tsx`, `Footer.tsx` |

---

## Integrations

| Integration | Purpose | Status |
|---|---|---|
| Google Fonts | Cormorant Garamond, Playfair Display, Inter, Poppins | Live |
| WhatsApp `wa.me/` deep-link | Primary contact channel | Placeholder number |
| Instagram `@les_merveilles_de_mimi_` | Social presence + follower CTA | Real handle |
| Facebook | Footer social link | Placeholder (`href="#"`) |
| Email `contact@lesmerveillesdmimi.dz` | Footer contact info | Unverified |
