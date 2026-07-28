# Page Plan · Line of Credit

Page file: `line-of-credit.html` · build id: `loc` (already registered in site-src/build.mjs, nav: funding)
Status: **ALL 5 STEPS LOCKED 2026-07-28 — next: generate photos (see manifest), then build per contract**

This workbook locks every wording + photo choice BEFORE the page is built. Work top to
bottom; a step is done when its **DECISION** line is filled. When all 5 steps are locked:
generate photos (OpenAI API) for approval, then build per the contract below.

---

## BUILD CONTRACT (locked — any chat building this page must obey)

1. Byte-copy `site-src/pages/term-loans.html` as the base. Swap CONTENT SLOTS ONLY
   (text and img src/alt). Keep every class, id, data-reveal/data-stagger/data-carousel
   attribute, and section order exactly.
2. NEVER edit or duplicate the shared `th-*` rules in site/assets/css/main.css
   (lines ~2164-2477). All sizing, breakpoints (520/560/700px), clamps, cqi queries,
   radii, and animations are shared — that is what makes the copy pixel-exact.
3. Per-page CSS = ONE `body[data-page="loc"]` block appended after the th-* section:
   hero photo vars + retuned title slopes ONLY. Nothing else. Slope method:
   `Y_new = Y_ref × (width_ref / width_new)` measured at equal font size, so the new
   headline fills the same screen fraction at every viewport. Refs: C3 3.96vw ·
   C4 3.69vw · C5 3.8vw · C6 4.6vw (≤520px slopes = ×1.2 ratio, e.g. 4.6 → 5.6).
4. Hero photo lives in CSS, not HTML. Prereq refactor (once, before first clone):
   `.th-hero` gets `--th-hero-img` / `--th-hero-pos` defaults; page block sets
   `body[data-page="loc"] .th-hero { --th-hero-img:url('../img/loc-hero.webp'); --th-hero-pos:center N%; }`
   The 6-stop green scrim stays written once in `.th-hero` — never duplicate it.
5. UNCHANGED containers — copy byte-identical from term-loans.html, zero input needed:
   - C2 trust band (Trustpilot / $100M+ / 2,000+ pill)
   - Testimonials "What our clients are saying." (3 cards + carousel-only 4th)
   - "Let's get in touch." touch band — keep the INLINE version with `-touch`
     suffixed form ids (`qualifyForm-touch`, `qf-*-touch`). NEVER swap in `{{TOUCH}}`:
     it duplicates the hero form's ids and breaks forms.js.
   Also extend the `body[data-page="term"] .sec-touch .touch__title` rule
   (main.css ~1662-1668) to include `loc` (same wording = same slope, no retune).
6. TEXT LENGTH BUDGETS (heights depend on line counts; same lines = same heights):
   hero sub ≈ 2 lines at desktop (~85 chars) · C4 checklist items exactly 4, ONE line
   each · C5 questions one line, answers short pill phrases · C6 labels one word-ish.
7. PHOTO SPECS: hero = landscape, graded dark/moody like term-hero.webp (text sits on
   the identical scrim), position tunable via `--th-hero-pos` · C4 = 3:2, 1200×800
   (the C4 photo-width formula assumes this + 4 single-line rows) · C6 cards = 560×700
   portrait, subjects readable under emerald scrim. Convert:
   `npx --yes sharp-cli -i src.jpg -o dir/ -f webp -q 82 resize W H --fit cover`
8. Copy rules: no dashes anywhere (C5 pill exceptions only if owner explicitly locks
   them, as on term-loans) · titles end in `<span class="dot">.</span>` · copy stays
   general and hype, routes to form or FAQ.
9. Build: edit `site-src/pages/line-of-credit.html`, run `node site-src/build.mjs`
   (regenerates all pages + fresh `?v=` — expected), commit site-src + site + css + img.
10. QA = SIDE BY SIDE vs term-loans at 360 / 520 / 700 / 1030 / 1440 + sweep to 1450:
    section heights match, breaks fire at the same px, every one-liner holds one line,
    C4 photo height tracks the checklist, carousel works ≤700px, no horizontal overflow.
    (Headless trap: Edge can't render <~492px viewports — use the DOM-probe method in
    token-pool.md.)

Full dims spec: `brand/token-pool.md` (complete container inventory + locked rules).

---

## STEP 1 · C1 Hero (title / subtitle / micro line / background photo)

**Term Loans reference**
- Title: `Term Loans.` — `clamp(1.9rem, 0.79rem + 3.87vw, 4.4rem)`, nowrap
- Sub: `Grow, expand, or seize the moment with flexible term funding built for your business.` (85 chars, 2 lines desktop)
- Micro: `$15K minimum monthly revenue required.` (secure icon)
- Photo: `term-hero.webp` in CSS (main.css ~2179), `center 13%`, dark bottom fade into felt green

**Constraints**: title one line, aim for the SAME size as Term Loans; `Line of Credit.`
is ~1.3× wider than `Term Loans.` — verify against the form column at 1440 during build;
if it collides, present rescale vs shorten options before proceeding. Sub ~85 chars / 2
lines. Micro one line. No dashes.

**Options & inspiration**
- Title: A) `Line of Credit.` (recommended, likely fits shared size) · B) `Business Line of Credit.` (much wider, will need rescale)
- Sub: A) `Flexible funds you can draw, repay, and draw again whenever your business needs it.`
       B) `Revolving access to working capital, ready the moment opportunity or expenses hit.`
       C) `Draw what you need, when you need it, and only pay for what you use.`
- Micro: A) keep `$15K minimum monthly revenue required.` · B) owner variant
- Hero photo concepts (OpenAI, landscape, moody green-friendly grade, subject upper/left so the form column and fade stay clean):
       A) Shop owner at the counter reviewing finances on a tablet, warm shop light
       B) Restaurant owner in a quiet dining room before open, morning light
       C) Small warehouse or stockroom, owner checking inventory shelves
- OWNER INSPIRATION: _(paste ideas, references, links, rewrites here)_

**DECISION** (locked 2026-07-28):
- Title: `Line of Credit.` (aim for shared Term Loans size; verify vs form column at 1440 during build)
- Sub: `Flexible funds you can draw, repay, and draw again whenever your business needs it.`
- Micro: keep `$15K minimum monthly revenue required.`
- Hero photo: generate — shop owner at the counter reviewing finances on a tablet, warm shop light; landscape, dark moody grade like term-hero.webp

---

## STEP 2 · C3 Intro (centered title + subtitle)

**Term Loans reference**
- Title: `Set your growth plans in motion.` — `min(2.43rem, 3.96vw)`, nowrap
- Sub: `Bridge a slow season or fund your next big move with a short term business loan. Our team walks you through your options and shapes a recommendation around your business, even if you've been denied elsewhere.` (~205 chars, max-width 620px)

**Constraints**: title one line (slope retuned by width ratio vs the reference headline);
sub 2 to 3 sentences, similar length. No dashes.

**Options & inspiration**
- Title: A) `Funding that flexes with your business.`
         B) `Capital on standby, whenever you need it.`
         C) `Stay ready for whatever comes next.`
- Sub: A) `Cover a gap, grab a deal, or smooth out a slow month with a revolving line of credit. Draw only what you need and pay interest only on what you use. Our team shapes the line around your business, even if you have been denied elsewhere.`
       B) `A line of credit keeps cash within reach without taking on a full loan. Tap it when you need it, repay on your schedule, and keep the rest ready. We walk you through your options and build a recommendation around your business.`
- OWNER INSPIRATION: owner draft kept as source: "Respond to uneven cash flow or seasons of growth with cash and flexible terms through a business line of credit. Here to help you navigate the murky financial waters, our team will walk you through your options and make a custom recommendation for your business even if you've been denied elsewhere." (trimmed to Term Loans length, owner picked version C)

**DECISION** (locked 2026-07-28, title revised same day after seeing the built page):
- Title: `Ready funds for whatever comes next.` (slope 3.4vw; earlier pick "Capital on standby, whenever you need it." replaced)
- Sub: `Smooth out uneven cash flow or fund a season of growth with a flexible business line of credit. We walk you through your options and shape a custom recommendation around your business, even if you've been denied elsewhere.`

---

## STEP 3 · C4 Why it makes sense (title + 4 checklist items + photo)

**Term Loans reference**
- Eyebrow: `Why it makes sense` (keep)
- Title: `The right move, right when you need it.` — `min(2.43rem, 3.69vw)`, cream, nowrap
- Checklist (4 items, one line each): `Consolidating debt` · `Making a large purchase` · `Managing cash flow` · `Investing in growth`
- Button: `Get Started` → apply.html (keep)
- Photo: `img-why-dashboard-2.webp` (laptop + funding dashboard, 1200×800, 3:2)

**Constraints**: EXACTLY 4 items, each ONE line (photo-width formula depends on it);
title one line, slope by ratio; replacement photo must be 3:2 1200×800. No dashes.

**Options & inspiration**
- Title: A) `A safety net that works as hard as you do.`
         B) `Ready capital, without the waiting.`
         C) keep `The right move, right when you need it.`
- Checklist: A) `Covering payroll gaps` · `Buying inventory in bulk` · `Smoothing seasonal dips` · `Jumping on opportunities`
             B) `Managing cash flow` · `Stocking up on inventory` · `Handling surprise expenses` · `Funding quick turnarounds`
- Photo: A) keep the dashboard photo (safe, already matched to the geometry)
         B) generate new 3:2 concept (describe below)
- OWNER INSPIRATION: owner asked for general business checklist items (manage cash flow, cover payroll); picked from round 2 options

**DECISION** (locked 2026-07-28):
- Title: `Funds on hand for the moments that matter.`
- Checklist: `Managing cash flow` · `Covering payroll` · `Restocking inventory` · `Handling surprise expenses`
- Photo: KEEP `img-why-dashboard-2.webp` (same as term-loans, zero geometry risk)

---

## STEP 4 · C5 Straight answers (4 question rows + stamp answers)

**Term Loans reference** (owner locked these verbatim on term-loans, incl. the dash and $ exceptions)
- Title: `Straight answers, before you apply.` — `min(2.43rem, 3.8vw)`
- 01 `What credit score do I need?` → `Low Minimum FICO`
- 02 `How fast can I get funded?` → `Funding in days, not weeks`
- 03 `What are the payment terms?` → `Weekly and Monthly`
- 04 `How much can I borrow?` → `$20K – $10MM`
- Button: `More FAQs` → faq.html (keep)

**Constraints**: exactly 4 rows; questions one line; answers short pill phrases (must fit
the pill at ≤700px stacked layout). If title wording stays, ZERO slope retune needed.

**Options & inspiration**
- Title: A) keep `Straight answers, before you apply.` (recommended, zero CSS) · B) owner variant
- Rows: A) keep all 4 Q&As as-is (they are product-agnostic)
        B) swap 04 to `How much can I access?` → owner sets the range pill
        C) swap 03 to `Do I pay for the full line?` → `Only on what you draw`
- OWNER INSPIRATION: _(none needed)_

**DECISION** (locked 2026-07-28, revised same day — owner set custom answers):
- Title: keep `Straight answers, before you apply.` (zero CSS retuning)
- 01 `What credit score do I need?` → `620 Minimum FICO`
- 02 `How fast can I get funded?` → `Less than 24hrs` (owner revision after build; was `Same day funding`)
- 03 `What are the payment terms?` → `Weekly and Monthly` (kept)
- 04 `How much can I access?` → `$10K – $5MM`
- Button: keep `More FAQs` → faq.html
(Pill $ and dash follow the same owner-locked exception as term-loans C5.)

---

## STEP 5 · C6 Industries we back (4 per-page industries + card photos)

**Term Loans reference**
- Title: `Industries we back.` — `min(2.43rem, 4.6vw)` (5.6vw ≤520)
- Cards: Construction · Retail · Automotive · Medical — each 560×700 portrait,
  emerald scrim `rgba(0,51,29,...)` (never black), hover zoom, label bottom-left
- Button: `View all Industries` → services.html (keep)

**Constraints**: exactly 4 cards; labels short (one word ideal); photos generated at
560×700 (4:5), subject centered-high so the bottom scrim + label read cleanly; grade
consistent with the existing 4 cards. Title keep = zero CSS.

**Options & inspiration** (industries where a revolving line fits naturally)
- Set A: Restaurants · Retail · Trucking · Contractors
- Set B: Restaurants · Salons · Landscaping · E-commerce
- Set C: keep Construction · Retail · Automotive · Medical (reuse existing photos, fastest)
- Photo concepts per chosen industry: see DECISION below
- OWNER INSPIRATION: owner supplied own 4 (Ecommerce, Contractors, Restaurants, Medical)

**DECISION** (locked 2026-07-28) — cards left to right:
1. `Ecommerce` — GENERATE: owner at a packing table taping a shipping box, shelves of orders behind, warm workshop light
2. `Contractors` — REUSE `img-ind-construction.webp` (relabeled from Construction)
3. `Restaurants` — GENERATE: server carrying plates through a warmly lit dining room
4. `Medical` — GENERATE: physical therapist guiding a patient through an exercise in a clean studio
- Title keep `Industries we back.` · button keep `View all Industries` → services.html
- Label "Ecommerce" written without a dash (site no-dash rule)

---

## PHOTO MANIFEST (fill as steps lock; generate after Step 5)

| Slot | File name | Size | Status |
|---|---|---|---|
| Hero background | `loc-hero.webp` | landscape (~1920×1080), dark grade | PICKED 2026-07-28: Hero B (boutique owner at counter w/ tablet), source brand/ai/photos-loc/loc-hero-b.png |
| C4 photo | keep `img-why-dashboard-2.webp` | 1200×800 (3:2) | LOCKED: reuse, no new photo |
| C6 card 1 | `img-ind-ecommerce.webp` | 560×700 (4:5) | PICKED A: woman taping box (loc-ind-ecommerce-a.png) |
| C6 card 2 | reuse `img-ind-construction.webp` | 560×700 (4:5) | LOCKED: reuse, label "Contractors" |
| C6 card 3 | `img-ind-restaurant.webp` | 560×700 (4:5) | PICKED B: male server, denim apron (loc-ind-restaurant-b.png) |
| C6 card 4 | `img-ind-physio.webp` | 560×700 (4:5) | PICKED A: therapist w/ resistance band (loc-ind-physio-a.png) |

All photos generated 2026-07-28 with gpt-image-2 (sources in brand/ai/photos-loc/, picker page brand/loc-photo-options.html).

## BUILD CHECKLIST — BUILT 2026-07-28 ✔

- [x] Hero `--th-hero-img`/`--th-hero-pos` refactor in `.th-hero` (scrim written once); touch-title rule extended to `:is(term, loc)` (other page ids added when THEY are rebuilt, so old-gen pages keep their current look)
- [x] Photos generated (gpt-image-2), picked, converted: `loc-hero.webp` (112KB), `img-ind-ecommerce.webp`, `img-ind-restaurant.webp`, `img-ind-physio.webp` (560×700)
- [x] `site-src/pages/line-of-credit.html` = term-loans byte-copy + locked content slots
- [x] `body[data-page="loc"]` block after th-* section: hero var + intro slope 3.4vw (revised title, 1544.7/1326.1) + why slope 3.29vw (1796.6/1600.3) — widths at 100px Poppins 700
- [x] Hero title verified at SHARED clamp — "Line of Credit." fits at cap (419px vs ~770px column), no rescale needed
- [x] Hero title ONE LINE at all px in small burger + mobile (owner revision after build, 2026-07-28): "Line of Credit." is 15% wider than "Term Loans." and wrapped below ~500px. Fix = shrink-to-fit inside `@media (max-width:700px)`, loc-scoped: title `min(clamp(30.4px, 12.64px + 3.87vw, 70.4px), calc(13.5vw - 35px))` + nowrap — PX-ONLY, no rem (owner's browser renders rem larger than 16px, which oversized rem-based clamps past the column). REVISED 2026-07-28 later the same day: originally used 16.3cqi with container-type on `.th-copy`, but container queries failed silently in the owner's real browser (worked headless) — replaced with plain vw math derived from the column model (col = 0.881vw − 216.4px; "Line of Credit." = 5.957em; 97% fill). DO NOT use cqi for hero titles on future clones. ≥~500px byte-identical to shared sizing; below, shrinks per-pixel (~16px at 360 — owner accepted the small-phone tradeoff)
- [x] build.mjs loc meta synced to the locked pill range ($10K to $5M, was $2M)
- [x] Built + side-by-side QA vs term-loans at 1440/860/660/500: sections align, breaks fire same px, one-liners hold, C5 pills stack <=700, C6 2×2 square <=700, no overflow (carousel renders mid-transition in headless shots on BOTH pages — known artifact, not a bug)
- [ ] NOT YET COMMITTED (awaiting owner); note the pre-existing uncommitted C4 width refinement in main.css rides along in the same commit
