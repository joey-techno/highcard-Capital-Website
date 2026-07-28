# Page Plan · Equipment Financing

Page file: `equipment-financing.html` · build id: `equipment` (already registered in site-src/build.mjs, nav: funding)
Status: **All 5 steps LOCKED 2026-07-28 — page BUILT + gap-probe QA passed; hero photo pick pending (A/B in brand/equipment-photo-options.html); NOT committed**

**MEASUREMENT CALIBRATION (discovered on this build, applies to ALL future clones):**
the scratch measure harness (100px Poppins spans) reads ~16% NARROW — its @font-face
URL fell back to a narrower font. TRUE rendered ems, probed with a DOM Range on the
live page: `Term Loans.` = 5.99em (not 5.166) · `Equipment Financing.` = 10.84em ·
`Equipment` = 5.31em. RATIO-based slope retunes (new/ref from the same harness) stay
valid — both sides share the error — but ABSOLUTE fit calcs (hero title vs column)
MUST use true ems. Calibrate: probe `document.createRange().selectNodeContents(title)`
width ÷ computed font-size on the built page, or multiply harness ems by 1.16.
At the shared clamp, `Equipment Financing.` overflowed the copy column at 701-760px
(caught by gap probe, -2.2px at 735) → big-burger fit cap added, see CSS.

This workbook locks every wording + photo choice BEFORE the page is built. Work top to
bottom; a step is done when its **DECISION** line is filled. When all 5 steps are locked:
generate photos (OpenAI API) for approval, then build per the contract below.

---

## BUILD CONTRACT (locked — any chat building this page must obey)

1. Byte-copy `site-src/pages/term-loans.html` as the base. Swap CONTENT SLOTS ONLY
   (text and img src/alt). Keep every class, id, data-reveal/data-stagger/data-carousel
   attribute, and section order exactly.
2. NEVER edit or duplicate the shared `th-*` rules in site/assets/css/main.css
   (~2164 onward). All sizing, breakpoints (520/560/700px), clamps, radii, and
   animations are shared — that is what makes the copy pixel-exact.
3. Per-page CSS = ONE `body[data-page="equipment"]` block appended after the existing
   rbf block: hero photo vars + retuned title slopes ONLY. Nothing else. Slope method:
   `Y_new = Y_ref × (width_ref / width_new)` measured at equal font size (100px
   Poppins 700, letter-spacing -.022em), so the new headline fills the same screen
   fraction at every viewport. Refs: C3 3.96vw (ref width 1326.1) · C4 3.69vw
   (1600.3) · C5 3.8vw · C6 4.6vw (≤520px slopes = ×1.2 ratio, e.g. 4.6 → 5.6).
4. Hero photo lives in CSS, not HTML (already refactored):
   `body[data-page="equipment"] .th-hero { --th-hero-img:url('../img/equipment-hero.webp'); --th-hero-pos:center N%; }`
   The 6-stop green scrim stays written once in `.th-hero` — never duplicate it.
5. HERO TITLE fit recipe for titles wider than `Term Loans.` (516.6 @100px), inside
   `@media (max-width:700px)`: `white-space:nowrap` + `font-size:min(clamp(30.4px,
   12.64px + 3.87vw, 70.4px), calc(Avw - Bpx))` where the calc ≈ 0.92 × column /
   title-em: column model is `0.881vw - 216.4px` (5vw pad ×2 + 202px form + gap),
   title-em = width@100px / 100. PX + VW ONLY — NO rem (owner's browser renders rem
   larger than 16px and blew rem-based clamps past the column, 2026-07-28) and NO
   cqi/container queries (failed silently in the owner's real browser same day).
   Owner may also choose a STACKED two-line title ≤700px via toggle spans
   (`.th-title__l1`/`.th-title__l2`, pattern in revenue-financing.html) — then size
   to the LONGEST line's em; if that line is ≤ Term Loans' width the shared px clamp
   alone is enough (no calc needed).
6. UNCHANGED containers — copy byte-identical from term-loans.html, zero input needed:
   - C2 trust band (Trustpilot / $100M+ / 2,000+ pill)
   - Testimonials "What our clients are saying." (3 cards + carousel-only 4th)
   - "Let's get in touch." touch band — keep the INLINE version with `-touch`
     suffixed form ids (`qualifyForm-touch`, `qf-*-touch`). NEVER swap in `{{TOUCH}}`:
     it duplicates the hero form's ids and breaks forms.js.
   Also extend the `:is(body[data-page="term"], ...)` touch-title rule (main.css
   ~1662) to include `equipment` (same wording = same slope, no retune).
7. TEXT LENGTH BUDGETS (heights depend on line counts; same lines = same heights):
   hero sub ≈ 2 lines at desktop (~85 chars, prefer shorter words — rbf's 85 chars
   wrapped to 3 lines) · C4 checklist items exactly 4, ONE line each · C5 questions
   one line, answers short pill phrases · C6 labels one word-ish.
8. PHOTO SPECS: hero = landscape, graded dark/moody like term-hero.webp (text sits on
   the identical scrim), position tunable via `--th-hero-pos` · C4 = 3:2, 1200×800
   (the C4 photo-width formula assumes this + 4 single-line rows) · C6 cards = 560×700
   portrait, subjects readable under emerald scrim. Convert:
   `npx --yes sharp-cli -i src.png -o out.webp -f webp -q 82 resize W H --fit cover`
   (`-o` writes the FILE at that path — give it the final name). Generation:
   brand/ai/gen-rbf-images.mjs pattern (gpt-image-2, fallback gpt-image-1, quality
   high, key from repo-root .env), photorealistic real-person STYLE block.
9. Copy rules: no dashes anywhere (C5 pill exceptions only if owner explicitly locks
   them, as on term-loans) · titles end in `<span class="dot">.</span>` · copy stays
   general and hype, routes to form or FAQ.
10. Build: edit `site-src/pages/equipment-financing.html`, run `node site-src/build.mjs`
    (regenerates all pages + fresh `?v=` — expected); sync build.mjs equipment
    title/desc to the locked C5 range; commit site-src + site + css + img.
11. QA = SIDE BY SIDE vs term-loans at 360 / 520 / 700 / 1030 / 1440 + sweep to 1450:
    section heights match, breaks fire at the same px, every one-liner holds one line,
    C4 photo height tracks the checklist, carousel works ≤700px, no horizontal overflow.
    (Headless trap: Edge can't render <~492px viewports — use fixed-width iframes,
    e.g. scratchpad rbf-grid3.html pattern.)

Full dims spec: `brand/token-pool.md` (complete container inventory + locked rules).
Finished examples: `brand/page-plans/line-of-credit.md`, `brand/page-plans/revenue-financing.md`.

---

## STEP 1 · C1 Hero (title / subtitle / micro line / background photo)

**Term Loans reference**
- Title: `Term Loans.` — `clamp(1.9rem, 0.79rem + 3.87vw, 4.4rem)`, nowrap (516.6 @100px)
- Sub: `Grow, expand, or seize the moment with flexible term funding built for your business.` (85 chars, 2 lines desktop)
- Micro: `$15K minimum monthly revenue required.` (secure icon)
- Photo: `term-hero.webp` in CSS, `center 13%`, dark bottom fade into felt green

**Constraints**: title ONE line at every px, or stacked 2 lines ≤700px (contract item 5).
Measured widths @100px: `Equipment Financing.` = 911.8 (1.77× Term Loans — fits shared
size at desktop, auto-fit calc kicks in ≤700px) · `Equipment Loans.` = 754.0 ·
`Equipment Funding.` = 849.7 · stacked lines: `Equipment` = 458.1 / `Financing.` = 430.9
(both NARROWER than Term Loans — stacked needs zero shrink math, shared clamp just works).
Sub ~85 chars / 2 lines. Micro one line. No dashes.

**Options & inspiration**
- Title: A) `Equipment Financing.` one line everywhere (shrinks to fit ≤700px like rbf did pre-stack)
         B) `Equipment Financing.` one line on desktop, STACKED `Equipment` / `Financing.` ≤700px (same pattern as rbf; safest smalls — both lines narrower than Term Loans)
         C) `Equipment Loans.` (shortest; closest behavior to Term Loans)
- Sub: A) `Finance the truck, the oven, or the lift and let the machine pay for itself.` (76)
       B) `Get the gear working for you now and spread the cost over its working life.` (75)
       C) `New or used, the equipment backs the funding, so approvals lean on the asset.` (77)
- Micro: A) keep `$15K minimum monthly revenue required.` · B) owner variant
- Hero photo concepts (OpenAI, landscape, moody green-friendly grade, real-person
  photorealism, subject placed so the form column and bottom fade stay clean):
       A) Owner beside their work truck at sunrise in the yard, keys in hand
       B) Shop owner in the bay with a vehicle up on a new lift behind them
       C) Restaurant owner in the kitchen with a gleaming new oven line
       D) Operator in a warehouse next to a forklift, first light through the doors
- OWNER INSPIRATION: _(paste ideas, references, links, rewrites here)_

**DECISION** (locked 2026-07-28):
- Title: `Equipment Financing.` one line >700px; STACKED `Equipment` / `Financing.`
  ≤700px via toggle spans (rbf pattern). Both stacked lines < Term Loans width →
  shared px clamp alone, no shrink calc needed.
- Sub: `Get the gear working for you now and spread the cost over its working life.` (75 chars)
- Micro: keep `$15K minimum monthly revenue required.`
- Hero photo: generate — operator in a warehouse next to a forklift, first light
  through the doors; landscape, dark moody grade like term-hero.webp

---

## STEP 2 · C3 Intro (centered title + subtitle)

**Term Loans reference**
- Title: `Set your growth plans in motion.` — `min(2.43rem, 3.96vw)`, nowrap (1326.1 @100px)
- Sub: `Bridge a slow season or fund your next big move with a short term business loan. Our team walks you through your options and shapes a recommendation around your business, even if you've been denied elsewhere.` (~205 chars, max-width 620px)

**Constraints**: title one line (slope retuned by width ratio vs 1326.1); sub 2 to 3
sentences, similar length. No dashes.

**Options & inspiration**
- Title: A) `The machine pays for itself.`
         B) `Get the equipment. Keep your cash.`
         C) `New gear, without the giant check.`
- Sub: A) `Finance new or used equipment, from trucks and trailers to ovens and lifts. The machine itself secures the funding, so approvals lean on the asset. Our team walks you through your options and finds the right fit.`
       B) `Spread the cost of the equipment over its working life instead of draining your account the week you buy it. Get options in as little as 24 hours, with a real advisor walking you through every choice.`
- OWNER INSPIRATION: owner cut the advisor sentence from sub B (round 2 pick A)

**DECISION** (locked 2026-07-28):
- Title: `The machine pays for itself.` (measure width vs ref 1326.1 for slope at build)
- Sub: `Spread the cost of the equipment over its working life instead of draining your account the week you buy it. New or used qualifies, and you can see your options in as little as 24 hours.`

---

## STEP 3 · C4 Why it makes sense (title + 4 checklist items + photo)

**Term Loans reference**
- Eyebrow: `Why it makes sense` (keep)
- Title: `The right move, right when you need it.` — `min(2.43rem, 3.69vw)`, cream, nowrap (1600.3 @100px)
- Checklist (4 items, one line each): `Consolidating debt` · `Making a large purchase` · `Managing cash flow` · `Investing in growth`
- Button: `Get Started` → apply.html (keep)
- Photo: `img-why-dashboard-2.webp` (laptop + funding dashboard, 1200×800, 3:2)

**Constraints**: EXACTLY 4 items, each ONE line (photo-width formula depends on it);
title one line, slope by ratio vs 1600.3; replacement photo must be 3:2 1200×800. No dashes.

**Options & inspiration**
- Title: A) `Buy the machine. Keep your cash.`
         B) `Built for work that runs on real iron.`
         C) keep `The right move, right when you need it.`
- Checklist: A) `Replacing aging equipment` · `Expanding your fleet` · `Upgrading your shop` · `Keeping cash in the business`
             B) `Buying new or used gear` · `Growing your capacity` · `Winning bigger jobs` · `Preserving cash flow`
- Photo: A) keep the dashboard photo (safe, already matched to the geometry)
         B) generate new 3:2 concept (describe below)
- OWNER INSPIRATION: _(none)_

**DECISION** (locked 2026-07-28):
- Title: KEEP `The right move, right when you need it.` (zero CSS retuning — same slope as term)
- Checklist: `Buying new or used gear` · `Growing your capacity` · `Winning bigger jobs` · `Preserving cash flow`
- Photo: KEEP `img-why-dashboard-2.webp` (same as term + loc + rbf, zero geometry risk)

---

## STEP 4 · C5 Straight answers (4 question rows + stamp answers)

**Term / Loc / Rbf reference**
- Title: `Straight answers, before you apply.` — `min(2.43rem, 3.8vw)` (keep = zero CSS)
- Term rows: 01 credit score → `Low Minimum FICO` · 02 speed → `Funding in days, not weeks` · 03 terms → `Weekly and Monthly` · 04 `How much can I borrow?` → `$20K – $10MM`
- Loc rows: 01 → `620 Minimum FICO` · 02 → `Less than 24hrs` · 03 → `Weekly and Monthly` · 04 `How much can I access?` → `$10K – $5MM`
- Rbf rows: 01 → `No minimum FICO` · 02 → `Less than 24hrs` · 03 `Can I pay it off early?` → `Yes, with discounts` · 04 `How much can I get?` → `1 to 3x monthly revenue`
- Button: `More FAQs` → faq.html (keep)

**Constraints**: exactly 4 rows; questions one line; answers short pill phrases (must fit
the pill at ≤700px stacked layout). Keep title = zero slope retune.
build.mjs equipment desc currently says: new or used, the machine is the collateral,
approvals lean on the asset, options in as little as 24 hours — good pill raw material;
sync desc to whatever locks here.

**Options & inspiration**
- Title: A) keep `Straight answers, before you apply.` (recommended, zero CSS) · B) owner variant
- Row drafts (owner sets final pills):
  01 `What credit score do I need?` → e.g. `The asset does the talking` / `Challenged credit OK`
  02 `How fast can I get funded?` → e.g. `Less than 24hrs` (matches loc/rbf)
  03 `Does used equipment qualify?` → e.g. `Yes, new and used`
  04 `How much can I finance?` → e.g. `Up to 100% of the cost` / `$ range pill`
- OWNER INSPIRATION: owner typed row 01 pill themselves ("No Minimium Fico" → styled `No minimum FICO` to match rbf)

**DECISION** (locked 2026-07-28):
- Title: keep `Straight answers, before you apply.` (zero CSS retuning)
- 01 `What credit score do I need?` → `No minimum FICO` (same pill as rbf)
- 02 `How fast can I get funded?` → `Less than 24hrs`
- 03 `Does used equipment qualify?` → `Yes, new and used`
- 04 `How much can I finance?` → `Up to 100% of the cost`
- Button: keep `More FAQs` → faq.html

---

## STEP 5 · C6 Industries we back (4 per-page industries + card photos)

**Reference**
- Title: `Industries we back.` — `min(2.43rem, 4.6vw)` (5.6vw ≤520) (keep = zero CSS)
- Term cards: Construction · Retail · Automotive · Medical — 560×700 portrait,
  emerald scrim `rgba(0,51,29,...)` (never black), hover zoom, label bottom-left
- Loc cards: Ecommerce · Contractors · Restaurants · Medical
- Rbf cards: Transportation · Contractors · Retail · Farming
- Button: `View all Industries` → services.html (keep)

**Constraints**: exactly 4 cards; labels short (one word ideal); photos generated at
560×700 (4:5), subject centered-high so the bottom scrim + label read cleanly; grade
consistent with existing cards; reuse existing card photos where the industry repeats.
Title keep = zero CSS.

**Options & inspiration** (equipment financing suits machine-heavy businesses)
- Reusable existing photos: Construction/Contractors, Retail, Automotive, Medical,
  Ecommerce, Restaurants, Transportation (trucking), Farming
- Set A: Transportation · Construction · Restaurants · Farming (all reusable — zero new photos)
- Set B: Transportation · Construction · Manufacturing (NEW) · Medical
- Set C: Automotive · Construction · Restaurants · Landscaping (NEW)
- OWNER INSPIRATION: _(none — picked all-reuse set)_

**DECISION** (locked 2026-07-28) — cards left to right:
1. `Transportation` — REUSE `img-ind-trucking.webp` (from rbf)
2. `Construction` — REUSE `img-ind-construction.webp` (from term)
3. `Restaurants` — REUSE `img-ind-restaurant.webp` (from loc)
4. `Farming` — REUSE `img-ind-farming.webp` (from rbf)
- Title keep `Industries we back.` · button keep `View all Industries` → services.html
- ZERO new card photos needed.

---

## PHOTO MANIFEST (fill as steps lock; generate after Step 5)

| Slot | File name | Size | Status |
|---|---|---|---|
| Hero background | `equipment-hero.webp` | landscape (~1536×1024), dark grade | GENERATE: warehouse operator next to forklift, first light through the doors |
| C4 photo | keep `img-why-dashboard-2.webp` | 1200×800 (3:2) | LOCKED: reuse, no new photo |
| C6 cards 1-4 | reuse trucking / construction / restaurant / farming | 560×700 (4:5) | LOCKED: all reuse, zero new photos |

## BUILD CHECKLIST — BUILT 2026-07-28 ✔

- [x] Hero photo generated (gpt-image-2, 2 takes), owner picked B (female owner w/ clipboard by forklift, dock light) via brand/equipment-photo-options.html; converted `equipment-hero.webp` (77KB); sources in brand/ai/photos-equipment/. All other photos reused — zero new card photos.
- [x] `site-src/pages/equipment-financing.html` = term-loans byte-copy + locked content slots (old-gen page replaced)
- [x] `body[data-page="equipment"]` block after the loc/rbf blocks: hero var + `--th-hero-pos:22% 13%` (subject in left third) + intro slope 4.7vw (1326.1/1117.1 harness ratio) + C4 title kept (no retune)
- [x] Hero title: >700px one line at min(shared px clamp, calc(5.79vw - 5.5px)) — the TRUE 10.84em width overflowed the column at 701-760px at the bare clamp (probe caught -2.2px gap at 735) · ≤700px STACKED `Equipment` / `Financing.` via toggle spans, font min(shared px clamp, calc(15.7vw - 39px)) from TRUE 5.31em. Px-only, no rem, no cqi.
- [x] Touch-title `:is()` rule extended to include `equipment`
- [x] build.mjs equipment title/desc synced to locked pills (100% of cost, new and used, no minimum FICO, <24hrs)
- [x] Built + QA: DOM gap-probe at 360/400/430/520/660/701/735/860/1200 all positive (7.6px worst at 360, ~40px through the 701-760 danger zone) + loc/rbf regression probes positive + eyeball grid 360/430/520/660 vs term + full page 1440 with photo — stacked title correct, one-liners hold, C6 4-up, no overflow.
- [ ] NOT YET COMMITTED (awaiting owner) — rides with the loc + rbf builds, all still uncommitted
