# Heaven Furniture Mart — Landing Page

A single conversion-focused landing page for **Heaven Furniture Mart**, one of Chattogram's
leading bespoke furniture brands. Built for the **[Racdox Hackathon](https://www.racdox.com/hackathon)**.

> **The one rule:** design for a real customer who has never heard of Heaven Furniture Mart.
> They must understand exactly what this brand is within 30 seconds of landing.

**Tagline:** *Designed. Crafted. Customized.*
**Live goal:** turn visitors into a free design consultation over WhatsApp — one CTA,
repeated everywhere, never competing.

---

## Table of Contents

- [About the Client](#about-the-client)
- [What This Page Is](#what-this-page-is)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Page Sections](#page-sections)
- [Design System](#design-system)
- [Animation & Motion](#animation--motion)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Imagery & Content Rules](#imagery--content-rules)
- [Configuration & Customization](#configuration--customization)
- [Build & Deployment](#build--deployment)
- [Hard Rules (Do Not Break)](#hard-rules-do-not-break)
- [Contact](#contact)

---

## About the Client

| Field | Value |
|---|---|
| Brand | Heaven Furniture Mart |
| Category | Luxury / bespoke furniture & interior styling |
| Location | Agrabad Access Road, Chattogram, Bangladesh |
| Founded | 2020, by Managing Director Abul Kalam Bhuiyan |
| Event | [Racdox Hackathon](https://www.racdox.com/hackathon) — this landing page is the team's hackathon entry |
| Phone | +880 1960-481983 |
| Email | heavenfurnituremart@gmail.com |
| Facebook | <https://www.facebook.com/HeavenFurnitureMart> |
| Instagram | <https://www.instagram.com/heaven_furniture_ltd> |
| YouTube | <https://www.youtube.com/@HeavenFurnitureMart> |

**What they sell:**

- **Living Room** — sofas, coffee tables, TV units, consoles
- **Bedroom** — beds, wardrobes, dressing tables, bedside tables
- **Dining** — dining tables, chairs, cabinets
- **Office & Study** — executive tables, bookshelves, workstations
- **Bespoke / Custom** — anything built to the customer's own space, size, and taste

**Why customers choose them** (the 7 trust points rendered on the page):

1. Free design consultation
2. Fully bespoke — built to your space, not mass-produced
3. Premium wood & materials, skilled in-house craftsmanship
4. Large physical showroom in Chattogram (Agrabad)
5. Delivery & installation included
6. Easy payment options
7. Trusted by hundreds of happy homeowners

---

## What This Page Is

One static landing page (not a full website) with a single job: convince the visitor that
Heaven is a luxury interior studio — not an online furniture shop — and get them to tap
**"WhatsApp Us"**.

The visitor journey is strictly linear:

> **Hero** (brand in 5 seconds) → **Brand Intro** (who they are) → **Why Choose**
> (7 trust cards) → **Collections** (5 categories) → **Bespoke Highlight** (the #1
> differentiator) → **Process** (how bespoke works) → **Social Proof** (MD quote +
> milestone timeline + 500+ trust number) → **Showroom** → **Final CTA** → **Footer**

There is exactly **one action** on the page — **WhatsApp Us** — linking to:

```
https://wa.me/8801960481983?text=Hello%2C%20I%27d%20like%20a%20free%20design%20consultation.
```

The button label is always "WhatsApp Us" (never "Contact Us", "Get a Quote", etc.),
and a sticky WhatsApp float button is visible on all screen sizes at all times.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.4** (App Router) | Static export (`output: 'export'`), all pages Server Components by default |
| UI | **React 19.2**, TypeScript 5 | `"use client"` only for animated/interactive components |
| Animation | **GSAP 3.15** + **@gsap/react 2.1** | Plugins: `ScrollTrigger`, `SplitText` (+ `DrawSVGPlugin`, `ScrambleTextPlugin` registered in `lib/gsap.ts`). Always via the `useGSAP()` hook — never raw `useEffect` |
| Smooth scroll | **Lenis 1.3** | Imported from `lenis/react`, synced with the GSAP ticker, reset on route change |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` in `globals.css`, design tokens via `@theme`. No `tailwind.config.js` |
| Fonts | `next/font/google` | Cormorant Garamond (serif) + DM Sans (sans-serif), self-hosted at build time |
| Images | `next/image` | Hero uses `priority`; everything below the fold lazy-loads |
| Lint | ESLint 9 + `eslint-config-next` | `npm run lint` |
| 3D (spec'd, currently static) | Real photography fallbacks | The original plan described React Three Fiber v9 showcases; the current build ships **static `next/image` fallbacks** instead so the page stays fast and works on low-end devices. No `three`/`@react-three/*` runtime dependency is installed |

Install dependencies with:

```bash
npm install
```

---

## Getting Started

**Prerequisites:** Node.js 18.18+ (20 LTS recommended), npm.

```bash
# 1. Install
npm install

# 2. Run the dev server (webpack — NOT Turbopack; Turbopack has HMR issues with Tailwind v4)
npm run dev
# → npx-equivalent: next dev --webpack
```

Open [http://localhost:3000](http://localhost:3000). Edits to `app/page.tsx` hot-reload.

```bash
npm run lint   # ESLint
npm run build  # static production build → out/
npm run start  # serve the production build (requires a non-export server setup; Vercel serves out/ directly)
```

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx      # root layout: fonts, Lenis provider, metadata, JSON-LD, skip link
│   ├── page.tsx        # section composition (Server Component, no logic)
│   ├── globals.css     # Tailwind import, @theme tokens, reduced-motion reset, utilities
│   ├── robots.ts       # robots.txt generation
│   ├── sitemap.ts      # sitemap.xml generation (single entry)
│   └── favicon.ico
├── components/
│   ├── nav/
│   │   └── Navbar.tsx
│   ├── providers/
│   │   └── LenisProvider.tsx   # "use client": ReactLenis root + GSAP ticker sync
│   ├── sections/
│   │   ├── Hero.tsx            # "use client": SplitText reveal, WhatsApp CTA, scroll cue
│   │   ├── BrandIntro.tsx      # eyebrow, headline mask reveal, MD quote block
│   │   ├── WhyChoose.tsx       # 7 trust cards, stagger fade, CTA
│   │   ├── Collections.tsx     # "use client": 5 category cards
│   │   ├── Bespoke.tsx         # "use client": bespoke highlight + CTA
│   │   ├── Process.tsx         # bespoke process steps
│   │   ├── SocialProof.tsx     # MD quote, milestone timeline, 500+ counter
│   │   ├── Showroom.tsx        # showroom imagery
│   │   ├── CTASection.tsx      # final push: headline, WhatsApp button, phone + email
│   │   └── Footer.tsx          # address, contact, socials, legal
│   ├── ui/
│   │   ├── WhatsAppButton.tsx  # inline + sticky variants (single source of the CTA)
│   │   ├── SectionHeading.tsx  # GSAP SplitText heading wrapper
│   │   ├── TrustCard.tsx       # trust-point card
│   │   ├── CollectionCard.tsx  # collection category card
│   │   ├── Counter.tsx         # animated trust-number counter
│   │   ├── Marquee.tsx         # brand marquee strip
│   │   └── icons.tsx           # 7 gold SVG line icons for the trust cards
│   └── v2/                     # (empty) reserved for next design iteration
├── lib/
│   ├── gsap.ts                 # plugin registration (ScrollTrigger, SplitText, …)
│   ├── useReveal.ts            # shared scroll-reveal hook
│   └── useSplitLines.ts        # shared split-lines hook
├── public/
│   └── images/                 # 12 real Heaven product photos (sofas, beds, dining, showcase…)
└── next.config.ts              # output: 'export', images.unoptimized (static hosting)
```

`app/page.tsx` assembles the page in order:

`Navbar → Hero → Marquee → BrandIntro → WhyChoose → Collections → Bespoke → Process → SocialProof → Showroom → CTASection → Footer + sticky WhatsAppButton`

---

## Page Sections

| # | Section | Purpose & key details |
|---|---|---|
| 0 | **Navbar** | Fixed top; transparent → `rgba(28,37,38,.95)` + `blur(12px)` past 80px scroll. Wordmark left, single "WhatsApp Us" button right. No nav links, no hamburger |
| 1 | **Hero** | Full viewport. Headline `Furniture, Crafted Around You.` (SplitText char reveal), gold italic tagline `Designed. Crafted. Customized.`, sub-copy, WhatsApp CTA, animated scroll chevron. Showroom photo background with dark overlay |
| 2 | **Marquee** | Brand strip divider |
| 3 | **Brand Intro** | Centered, max 720px. Eyebrow `Est. 2020, Chattogram`, headline mask reveal, body copy + MD quote block (gold left border, italic serif) |
| 4 | **Why Choose Heaven** | All 7 trust bullets as cards (2-col desktop / 1-col mobile), stagger-fade on scroll, WhatsApp CTA below |
| 5 | **Collections** | `Our Collections` — 5 cards: Living Room, Bedroom, Dining, Office & Study, Bespoke/Custom (gold shimmer card linking to the bespoke section). "Explore →" links scroll to the CTA |
| 6 | **Bespoke Highlight** | Full-height editorial layout. Eyebrow `Bespoke & Custom`, headline `Built Around Your Space.`, body, WhatsApp CTA |
| 7 | **Process** | Bespoke process steps (measure → design → craft → deliver) |
| 8 | **Social Proof** | MD quote on showroom photo → milestone timeline (2020 founded · 2021 Agrabad showroom · 2024–25 International Furniture Fair · 2025 Chamber of Commerce · 2026 BFIOA recognition) → `500+` trust number + WhatsApp CTA |
| 9 | **Showroom** | Showroom imagery section |
| 10 | **CTA Section** | `Ready to Design Your Space?` + free-consultation sub-copy, large WhatsApp button, phone + email lines |
| 11 | **Footer** | Wordmark, tagline, address, phone, email, FB/IG/YT SVG icons (ivory → gold on hover), `© 2026 Heaven Furniture Mart` |
| — | **Sticky WhatsApp float** | Fixed bottom-right, always visible; icon-only on mobile, `aria-label="Chat with us on WhatsApp"`, opens in a new tab |

---

## Design System

**Voice:** warm, editorial, confident — a luxury interior studio, not an online shop.
Spacious, never crowded; real photography does the talking.

**Palette** (defined as `@theme` tokens in `app/globals.css` — never use raw hex in components):

```css
--color-bg:        #1C2526;  /* Deep Charcoal-Teal — primary background */
--color-surface:   #22302F;  /* Card surfaces */
--color-ivory:     #F5F0E8;  /* Warm Ivory — headings, content */
--color-ivory-dim: #C8BFA8;  /* Body text, captions */
--color-gold:      #B8973A;  /* Accent ONLY: borders, dividers, dots — never large fills */
--color-brown:     #4A2E1A;
--color-wood:      #8B5E3C;
```

No pure white (`#fff`), no pure black (`#000`).

**Typography** (via `next/font/google`, variables on `<html>`):

| Role | Font | Notes |
|---|---|---|
| Display / hero | Cormorant Garamond 300 | `clamp(3.5rem, 7vw, 6rem)`, `-0.02em` tracking |
| Section headline | Cormorant Garamond 400 | `clamp(2rem, 4vw, 3.5rem)` |
| Tagline | Cormorant Garamond 300 italic, gold | `1.25rem` |
| Body / buttons | DM Sans 300–500 | body ≤ 70ch, serif LH 1.7 / sans LH 1.6, sentence case everywhere |

**Spacing:** 8px base grid; section padding `clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)`.

**Motion principles:** one orchestrated entrance per section; SplitText character reveal on the
hero; clip-path mask reveals on headings; hover is subtle only (scale ≤ 1.02, opacity shifts,
no bounces).

---

## Animation & Motion

- **Pattern:** every animated component is `"use client"`, registers plugins once at module
  level (`gsap.registerPlugin(ScrollTrigger, SplitText)`), and drives animation through
  `useGSAP()` from `@gsap/react` with `{ scope: container }` — never raw `useEffect`.
- **Shared helpers:** `lib/gsap.ts` (plugin registration), `lib/useReveal.ts`,
  `lib/useSplitLines.ts`.
- **Smooth scroll:** `components/providers/LenisProvider.tsx` wraps the app in
  `<ReactLenis root>`, syncs Lenis with the GSAP ticker, and resets scroll on route change.
- **Reduced motion is mandatory:** a CSS reset in `globals.css` collapses durations, and all
  GSAP work branches on `gsap.matchMedia()` — full animation under
  `(prefers-reduced-motion: no-preference)`, instant reveal under `reduce`.
- Canonical per-section pattern: entrance cascade (headline → tagline → sub-copy → CTA),
  scroll cue, staggered card entrances — see the `useGSAP()` blocks in each section component.

---

## SEO

- `generateMetadata` in `app/layout.tsx`: title, description, Open Graph + Twitter cards,
  `metadataBase`, robots directives, `locale: en_BD`.
- JSON-LD `LocalBusiness` schema (name, phone, email, Agrabad address, founder, founding
  date, socials) injected in the root layout.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` / `sitemap.xml` (single-entry
  sitemap for this one-pager).
- OG image slot: `public/og-image.jpg` (1200×630 hero-worthy showroom shot).

---

## Accessibility

Target: **WCAG 2.2 AA** throughout.

- Semantic landmarks: `<header>`, `<main id="main-content">`, `<section>`, `<footer>`, `<nav>`
- Skip-to-content link, visible gold focus rings, ≥ 44px touch targets
- Descriptive `alt` text on every `next/image`; `aria-label` + `role="img"` on visual showcases
- WhatsApp controls carry `aria-label="Chat with us on WhatsApp"`
- Full `prefers-reduced-motion` support (CSS + GSAP layers)
- `lang="en"`, dark-mode-only palette with AA-checked ivory-on-charcoal contrast

---

## Performance

- Fully static: `output: 'export'` → pre-rendered HTML, no server required
- Hero LCP image uses `priority`; all below-fold images lazy-load with explicit
  `width`/`height` (no CLS) and responsive `sizes`
- Collection/section visuals mount lazily via `IntersectionObserver`
- Reduced-motion and low-end fallbacks avoid heavy runtimes; no stock-image CDNs,
  no external font requests (self-hosted via `next/font`)
- Target: Lighthouse > 90; verify on slow-3G and 375px mobile width

---

## Imagery & Content Rules

- **Real Heaven photos only.** Finished slots use the 12 product/showroom photos in
  `public/images/` (sourced from the brand's socials).
  During development, unfinished slots use clearly labelled placeholders (`REPLACE: …`) —
  never `picsum`, `unsplash`, or any generic stock URL.
- **Copy of record:** the MD quote, milestones, trust points, and contact details come from
  the company brief. No invented metrics or testimonials.

---

## Configuration & Customization

| Need | Where |
|---|---|
| Change the CTA number/message | `components/ui/WhatsAppButton.tsx` (single source — keep label "WhatsApp Us") |
| Swap photos | `public/images/` + the section component using them |
| Edit copy | `components/sections/*.tsx` |
| Change palette/type scale | `@theme` tokens in `app/globals.css` |
| Change SEO / social preview | `metadata` in `app/layout.tsx`, `public/og-image.jpg` |
| Structured data | JSON-LD block in `app/layout.tsx` |
| Smooth-scroll behavior | `components/providers/LenisProvider.tsx` |
| Animation curves/timing | `lib/gsap.ts`, `lib/useReveal.ts`, section `useGSAP()` blocks |

---

## Build & Deployment

```bash
npm run build   # next build → static site in out/
```

Because `output: 'export'` is set (with `images.unoptimized`), the build emits plain static
files to `out/` — deployable to **Vercel** (recommended), Netlify, or any static host.
`robots.txt` and `sitemap.xml` are generated at build time from `app/robots.ts` / `app/sitemap.ts`.

Pre-ship checklist: luxury feel, brand clear in the
first viewport, tagline visible without scrolling, polished 375px mobile, exactly one CTA
with the correct `wa.me` link, no layout shift, working scroll animations + Lenis, all 7
trust bullets, all 5 collections, 2020–2026 timeline, attributed MD quote, OG tags +
JSON-LD present, reduced-motion respected, sticky WhatsApp always visible, footer
address/phone/socials correct.

---

## Hard Rules (Do Not Break)

1. One CTA only: **"WhatsApp Us"** — never rename it, never add competing buttons
2. No raw `<img>` — always `next/image`
3. No Google Fonts `<link>` — always `next/font/google`
4. GSAP only — no Anime.js; animations via `useGSAP()`, never raw `useEffect`
5. No stock image URLs — real Heaven photos or labelled placeholders
6. All motion handles `prefers-reduced-motion`
7. No pure white / pure black anywhere
8. Dev server runs `next dev --webpack` (no Turbopack)
9. Tailwind v4 patterns only — no `tailwind.config.js`, no v3 `@tailwind` directives
10. Lenis comes from `lenis/react` (never `@studio-freight/lenis`)

---

## Contact

**Heaven Furniture Mart** — Agrabad Access Road, Chattogram, Bangladesh
📞 +880 1960-481983 · ✉️ heavenfurnituremart@gmail.com
[Facebook](https://www.facebook.com/HeavenFurnitureMart) ·
[Instagram](https://www.instagram.com/heaven_furniture_ltd) ·
[YouTube](https://www.youtube.com/@HeavenFurnitureMart)

_Built with Next.js 16 · GSAP · Lenis · Tailwind CSS v4 as an entry to the [Racdox Hackathon](https://www.racdox.com/hackathon)._
