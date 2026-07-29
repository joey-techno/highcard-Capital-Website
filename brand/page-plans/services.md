# Services landing page (services.html) · build workbook

STATUS: BUILT 2026-07-29, all 6 cards live — hero take B, round 2 unique bullets,
photos locked (term B / sba / heloc 3 couple-at-home / loc A / equipment A / rbf A),
build.mjs retitled to Six Ways. QA'd 1440/860/660/500 + tall 860 full page.
Awaiting owner sign-off, then commit. Pool entry: token-pool.md
"POOL · SV SERVICES COMPONENTS".
NOTE (QA): headless Edge at 1440 sometimes races the data-split reveal and shoots titles
mid-animation (affects About/FAQ too, byte-flaky) — rerun the shot; real browsers fine.
TRUE widths probed 2026-07-29: "Services." 444.3 @100px (shared fq-hero__title reused,
About Us. precedent) · "Find the right fit." 793.4 → intro retune 7.93vw in page hook.
REWORD ROUND (owner 2026-07-29, layout unchanged): hero → "Loans & Financing."
(TRUE 925.5, shared size untouched); intro → "Find the best option for you."
(TRUE 1355.0 → retune min(2.43rem, 4.65vw)) + sub "With six ways to fund, we make
it simple to see which one fits your business. Feeling lost? Reach out and we will
chart the top choices around your goals." Supersedes the C1/C2 picks below.
Same round: th-tst testimonials ADDED between the card grid and the believe-in band.
Page id: `services` (build.mjs:15-17, nav key `funding`). NOT a th-* service-page clone;
this is a landing page like About/FAQ, so `{{TOUCH}}` stays and shared fq-/ab- components
are reused. New CSS = one `.sv-*` card component + one `body[data-page="services"]` hook.

OWNER LOCKS (2026-07-29):
- Card copy = "Best for:" with 3 one-line check bullets (Capital Quickly style).
- Card photos = FREE STOCK from online (Pexels/Pixabay class license, commercial ok,
  no attribution required). Source URL + license recorded per photo below.
- Below the grid = one centered CTA button (About pattern), NO 7th help card.
- Grid: 2 columns in main site + big burger (>=701px), 1 column small burger + mobile (<=700px).
- Page hero photo is GENERATED (OpenAI), not stock.

## Structure

C1 `.fq-hero` (reuse) — generated photo, centered "Services." title, slim band.
C2 `.ab-intro` (reuse) — centered title + sub, no button.
C3 `.sv-vals` NEW — 6 photo cards (term, sba, heloc, loc, equipment, rbf),
   each: photo 3:2 top, title, "Best for:" + 3 check bullets, Learn more (btn--sm btn--outline).
C4 `.th-tst` testimonials (byte-identical shared) — owner ADDED 2026-07-29 (second
   thought after the earlier rejection), directly above the believe-in section.
C5 `.ab-vals` What we believe in (4 belief cards byte-identical to About) on the
   TST MIST bg + centered About us button (owner 2026-07-29; Talk-to-us button
   removed earlier). Sits flush under the testimonials on the same mist color.
C6 `{{TOUCH}}` — unchanged.

## Step 1 · C1 Hero

- Markup: About pattern, `<h1 class="fq-hero__title" data-split>Services<span class="dot">.</span></h1>`.
- Title slope: "Services." is far narrower than the FAQ ref (TRUE 1409.3 @100px @4.47vw);
  probe TRUE width of "Services." and retune in the page hook so visual weight matches About Us.
- Photo concepts (1536x1024, RULE 9b waist-up if people, subjects LEFT-of-center or centered
  low so the centered title reads over background):
  - A: Our advisor team, two or three people at a bright desk, mid-discussion, warm smiles.
  - B: Handshake across a table between advisor and owner, bright office, waist-up.
  - C: Row of small business storefronts, warm morning light, no people (title reads clean).
- DECISION concept: LOCKED A (owner 2026-07-29) — advisor team at a bright desk, warm
  smiles, waist-up. Takes via brand/ai/gen-services-hero.mjs, picker
  brand/services-hero-options.html. Final take: (pending)

## Step 2 · C2 Intro

Title one-liner (nowrap, TRUE-EM probed) + sub (2-3 lines at desktop).
- Title A: Every play in the deck.
- Title B: Six ways to fund the next move.
- Title C: Find the right fit.
- Sub draft: One five minute application prices every option below. Tell us what you are
  planning and we will chart the best fit for your business, no cost and no obligation.
- DECISION title: LOCKED C (owner 2026-07-29) — "Find the right fit."
- DECISION sub: draft accepted with title pick; owner may still tweak after sample.

## Step 3 · C3 Cards — copy

Bullets drawn from each service page's own C4 checklist (already owner approved); 3 per card,
one line each. Card order = nav dropdown order.

Round 1 drafts (from the pages' C4 checklists) were rejected 2026-07-29: owner disliked
that lines repeated across cards (Managing cash flow x2, Consolidating debt x2) and all
read the same. Round 2 rule: every bullet UNIQUE across the whole grid, each says
something only that product can say, still ONE LINE.

| Card | Title | Best for bullets (round 2 draft) | Link |
|---|---|---|---|
| 1 | Term Loans. | Making a large purchase · One fixed monthly payment · Investing in growth | term-loans.html |
| 2 | SBA Loans. | Buying or expanding a business · Refinancing expensive debt · The lowest payments in lending | sba-loans.html |
| 3 | HELOC. | Unlocking your home equity · Borrowing at the lowest rate · Paying only for what you use | heloc.html |
| 4 | Line of Credit. | Smoothing out cash flow · Covering payroll and inventory · Drawing again as you repay | line-of-credit.html |
| 5 | Equipment Financing. | Buying new or used gear · Letting the machine pay for itself · Preserving cash on hand | equipment-financing.html |
| 6 | Revenue Based Financing. | Funding in as little as 24 hours · Payments that flex with sales · Growing without perfect credit | revenue-financing.html |

- DECISION bullets: round 2 LOCKED (owner approved by proceeding, 2026-07-29) — built as tabled.

## Step 4 · C3 Cards — stock photos

3:2 crop to 1200x800 webp q82 → site/assets/img/svc-<id>.webp. Warm, people-forward,
close to our grading. Record per pick: source URL + license.

| Card | DECISION (owner 2026-07-29) | Source (Pexels, free commercial, no attribution) |
|---|---|---|
| Term Loans | LOCKED B · bright office handshake | pexels.com/photo/7691709 → svc-term.webp |
| SBA Loans | LOCKED · owner with open sign | pexels.com/photo/36729529 → svc-sba.webp |
| HELOC | LOCKED 3 (round 2) · couple arm in arm looking at their home, golden light | pexels.com/photo/7579042 → svc-heloc.webp |
| Line of Credit | LOCKED A · POS touchscreen | pexels.com/photo/12935048 → svc-loc.webp |
| Equipment Financing | LOCKED A · harvester in golden field | pexels.com/photo/12982186 → svc-equipment.webp |
| Revenue Based Financing | LOCKED A · busy cafe counter | pexels.com/photo/4921263 → svc-rbf.webp |

## Step 5 · C4 CTA under grid

- Button draft: "Not sure which fits? Talk to us" → contact.html
- DECISION: REMOVED (owner revision 2026-07-29) — no button under the grid; cards run
  straight into the touch band. Same revision round: photos slimmed (fluid
  78cqi - 115px height, extra flat on mobile), Learn more buttons centered, check
  bullets ink #141A16 weight 500, card padding roomier. All in the pool entry.

## Step 6 · build.mjs retitle

- Draft: `Services · Six Ways to Fund the Next Move | High Card Capital`
- Desc draft: Term Loans, SBA Loans, HELOC, Line of Credit, Equipment Financing, and
  Revenue Based Financing. One five minute application prices every option. No cost, no obligation.
- DECISION: (pending)

## Dims (pool draws — POOL · SV SERVICES CARDS to be written back on lock)

- Section: white bg, pool section pad clamp(28px, 1.6vw + 14px, 46px); intro doubles as head.
- Grid: repeat(2, minmax(0,1fr)) max-width 1080 centered, gap clamp(12px, 1.6vw, 26px);
  <=700px 1 col, max-width 520, gap clamp(8px, 1.12vw, 14.4px).
- Card: container-type inline-size; AB card box language (radius clamp(12px,1.6vw,24px),
  sage hairline .35, shadow 0 24px 60px -34px, hover lift .25s, reduced-motion safe);
  overflow hidden so the photo sits inside the radius.
- Photo: aspect-ratio 3/2, object-fit cover, hover scale(1.08) .3s (C6 language), lazy + w/h attrs.
- Internals all cqi (card ~520px desktop): pad, title nowrap Poppins 700 racing + sage dot,
  Best for label, bullets w/ check-circle sprite one line each, btn--sm btn--outline CTA.
- QA: 360 / 500 / 660 / 860 / 1440 + col flip at 700, equal row heights, no overflow.
