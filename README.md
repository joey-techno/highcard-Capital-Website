# High Card Capital — website

The complete, production-ready static site lives in **`/site`**. Upload that folder
to any static host (Netlify, Vercel, Cloudflare Pages, S3, cPanel — anything) and
it works as-is: no build step, no server, no external dependencies at runtime.
Fonts are self-hosted, all JS is hand-written vanilla, images are optimized WebP.

## The 10 pages

`index` · `term-loans` · `sba-loans` · `heloc` · `line-of-credit` ·
`how-it-works` · `about` · `faq` · `contact` · `apply`

## Before launch — the placeholder checklist

| What | Where | Currently |
|---|---|---|
| **JotForm form IDs (3)** | `site/assets/js/forms.js`, top of file | empty strings — paste the three IDs (`shared` = Term Loan + LOC, `sba`, `heloc`) and the Apply page goes live; until then it shows a warm "form goes live at launch" card with a phone fallback |
| Phone number | sitewide | `(800) 000-0000` / `tel:+18000000000` — find-and-replace both forms |
| Email | sitewide | `hello@highcardcapital.example` |
| Address | footer | `100 Placeholder Plaza, Suite 400, New York, NY 10001` |
| NMLS # | footer + About | `#000000 (placeholder pending licensure)` |
| Privacy Policy & Terms | footer | plain text "pending counsel review" — link it when the page exists |
| Sample figures | hero card, stat bands | `$100M+`, `26h`, the $150,000 wire card and the three testimonials are **marked Sample/†** and disclosed in the footer; replace with audited numbers and named stories at launch, then remove the flags |
| Contact form | `contact.html` | submits via a pre-filled email (mailto) — point it at your CRM/endpoint when you have one |
| OG image | `site-src/partials/head.html` | relative path; set an absolute URL once the domain exists |

## Editing pages later

Page sources live in **`/site-src`** (shared header/nav/footer partials + one body
file per page). Edit there, then rebuild all 10 pages with:

```
node site-src/build.mjs
```

(Any Node 18+ works. Editing `site/*.html` directly also works — just know the
nav/footer are duplicated per page.)

## Design system (locked)

- **Colors:** Racing Green `#004225` (CTAs/accents only) · flat Table Green `#00331D`
  for every dark surface (one shade — no gradients, no textures) · Card Cream `#F5F0E1` ·
  Warm White `#FBF9F3` · Sage `#8FA898` · Ink `#141A16`. No gold anywhere.
- **Type:** Poppins display + Inter body (self-hosted in `site/assets/fonts`),
  tabular figures on every number, every headline ends with a period —
  racing green on light, sage on dark.
- **Brand assets:** logos in `site/assets/logo` (copied from `brand/final` — never
  rebuild), 20-icon set injected from `site/assets/js/icons.js`.
- **Photography:** 15 brand photos in `site/assets/img` (WebP, sources in `brand/ai`),
  golden-hour documentary style with racing green living inside each scene.

## Signature moves in the build

- Felt-table hero with a 3D dealt hand (ace card, sample wire-confirmation card,
  stat chip) that tilts toward the cursor and deals in on load
- Needs-router chips in the hero that route each need to the right product
- Hand-rolled WebGL ripple on photography hover (`gl-hover.js`, zero dependencies,
  desktop-only, respects reduced motion)
- Scroll-linked card fan on How It Works; draw–repay–redraw cycle on Line of Credit
- Split-line headline reveals, count-up stats, marquee, magnetic CTAs,
  cross-document View Transitions — all in `main.js`, all `prefers-reduced-motion` aware
- Full keyboard support: dropdown disclosure, focus-trapped mobile menu, Escape everywhere

Site designed and built by Claude (Fable 5, Anthropic) from the locked brand system
in `/brand` — deck: `brand/deck.html`.
