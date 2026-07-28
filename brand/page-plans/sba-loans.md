# Page Plan · SBA Loans

Page file: `sba-loans.html` · build id: `sba` (already registered in site-src/build.mjs, nav: funding)
Status: **ALL STEPS LOCKED + PAGE BUILT 2026-07-28 — QA passed at 520/701/860/1030/1440 + hero verified with photo; NOT yet committed**

**NEW ON THIS PAGE (owner 2026-07-28): a TERMS LEDGER container** sits between C3 (intro)
and C4 (why it makes sense). This is an owner-approved extension of the carbon-copy
contract — the only structural difference vs term-loans. Everything else stays a byte-copy.

This workbook locks every wording + photo choice BEFORE the page is built. Work top to
bottom; a step is done when its **DECISION** line is filled. When all steps are locked:
generate photos (OpenAI API) for approval, then build per the contract below.

---

## BUILD CONTRACT (locked — any chat building this page must obey)

1. Byte-copy `site-src/pages/term-loans.html` as the base. Swap CONTENT SLOTS ONLY
   (text and img src/alt), then insert the NEW ledger section between C3 and C4.
   Keep every class, id, data-reveal/data-stagger/data-carousel attribute, and
   section order exactly otherwise.
2. NEVER edit or duplicate the shared `th-*` rules in site/assets/css/main.css
   (~2164 onward). All sizing, breakpoints (520/560/700px), clamps, radii, and
   animations are shared — that is what makes the copy pixel-exact.
3. Per-page CSS = ONE `body[data-page="sba"]` block (hero vars + retuned title slopes),
   PLUS one new SHARED `th-ledger` component block (write it once, shared-style, so
   heloc or others can reuse it later — it is a new component, not a page override).
   Slope method: `Y_new = Y_ref × (width_ref / width_new)` at equal font size (100px
   Poppins 700, letter-spacing -.022em). Refs: C3 3.96vw (ref width 1326.1) · C4
   3.69vw (1600.3) · C5 3.8vw · C6 4.6vw (≤520px slopes = ×1.2 ratio).
4. Hero photo lives in CSS: `body[data-page="sba"] .th-hero { --th-hero-img:...;
   --th-hero-pos:...; }`. Scrim written once in `.th-hero` — never duplicate.
5. HERO TITLE fit: `SBA Loans.` — measure true em at build (expect ≈ Term Loans.'
   5.99em or narrower → shared clamp alone, no fit calc). If any calc IS needed:
   PX + VW ONLY, no rem, no cqi (both failed in owner's real browser 2026-07-28).
   ≤700px column model `0.881vw - 216.4px`; big-burger column `66.1vw - 62.4px`.
   TRUE ems only for absolute fit (scratch harness reads ~16% narrow).
6. UNCHANGED containers — byte-identical from term-loans.html, zero input needed:
   C2 trust band · testimonials · inline "Let's get in touch." with `-touch` form
   ids (NEVER `{{TOUCH}}`). Extend the `:is(body[data-page="term"], ...)` touch-title
   rule (main.css ~1662) to include `sba`.
7. TEXT LENGTH BUDGETS: hero sub ≤ ~80 chars / 2 lines desktop · C4 checklist exactly
   4 items, ONE line each · C5 questions one line, answers short pill phrases ·
   C6 labels one word-ish · ledger labels 1-3 words, values short (see Step 3).
8. PHOTO SPECS + RULES 9/10 (token-pool.md): hero landscape dark grade, FULL-FRAME
   conversion, head fully clear at every viewport (outpaint via
   brand/ai/extend-rbf-hero.mjs pattern if the file lacks headroom), pin vertical
   pos 0% when the head sits high · C4 = 3:2 1200×800 · C6 cards 560×700, subjects
   horizontally centered, waist-up, ≥6% headroom, explicit face-centered extract +
   two-pass sharp-cli, NEVER blind `--fit cover`. QA both 4:5 and square card crops.
9. Copy rules: no dashes anywhere (numeric range pills like `$25K – $15M` are the
   only exception, and only where the owner locks them) · titles end in
   `<span class="dot">.</span>` · copy sells; nothing revealing (no exact spreads,
   no fees, no guaranty-fee math — ranges and "typical" only).
10. Build: edit `site-src/pages/sba-loans.html`, run `node site-src/build.mjs`;
    sync build.mjs sba title/desc to locked pills; commit site-src + site + css + img.
11. QA = SIDE BY SIDE vs term-loans at 360 / 520 / 700 / 1030 / 1440 + sweep to 1450:
    matching heights on the shared containers, breaks fire at the same px, one-liners
    hold, ledger fluid with no plateau 360-1450, carousel works ≤700px, no overflow.
    (Headless Edge can't render <~492px — use fixed-width iframe grids.)

Full dims spec: `brand/token-pool.md` (container inventory + locked rules 1-10).
Finished examples: `brand/page-plans/line-of-credit.md`, `revenue-financing.md`,
`equipment-financing.md`.

---

## STEP 1 · C1 Hero (title / subtitle / micro line / background photo)

**Term Loans reference**
- Title: `Term Loans.` — shared clamp, nowrap (true 5.99em)
- Sub: `Grow, expand, or seize the moment with flexible term funding built for your business.` (85 chars, 2 lines desktop)
- Micro: `$15K minimum monthly revenue required.` (secure icon)
- Photo: `term-hero.webp` in CSS, dark bottom fade into felt green

**Constraints**: `SBA Loans.` is narrower than `Term Loans.` → shared clamp everywhere,
no fit math expected (verify with true-em probe at build). Sub ~80 chars / 2 lines.
Micro one line. No dashes. Hero photo obeys RULE 9 headroom.

**Options & inspiration** (source: old-gen sba page copy, owner-supplied 2026-07-28)
- Title: `SBA Loans.` (locked-in-spirit — matches nav + old page; confirm below)
- Sub: A) `The lowest payments in small business lending, backed by a government guarantee.` (79)
       B) `Government backed funding up to $15M with terms up to 25 years.` (63)
       C) `Patient capital for big moves: buyouts, buildings, and expansion.` (65)
- Micro: A) `650 minimum FICO required.`
         B) `650 minimum FICO. Soft pull to see options.`
         C) keep `$15K minimum monthly revenue required.`
- Hero photo concepts (landscape, dark moody grade, real-person photorealism, clear
  space above the head per RULE 9):
       A) Owner unlocking the front door of their newly purchased building at dawn
       B) Owner and advisor reviewing plans at a desk, blueprints and laptop
       C) Owner standing proud in front of their storefront, keys in hand
       D) Two partners shaking hands inside the shop they just acquired
- OWNER INSPIRATION: _(none)_

**DECISION** (locked 2026-07-28):
- Title: `SBA Loans.` one line everywhere (narrower than Term Loans → shared clamp,
  verify with true-em probe at build)
- Sub: `The lowest payments in small business lending, backed by a government guarantee.` (79 chars)
- Micro: `650 minimum FICO required.`
- Hero photo: GENERATE — two partners shaking hands inside the shop they just
  acquired; landscape, dark moody grade like term-hero, clear space above heads
  (RULE 9), subjects placed so the form column and bottom fade stay clean.

---

## STEP 2 · C3 Intro (centered title + subtitle)

**Term Loans reference**
- Title: `Set your growth plans in motion.` — `min(2.43rem, 3.96vw)`, nowrap (1326.1 @100px)
- Sub: ~205 chars, max-width 620px

**Constraints**: title one line (slope by width ratio vs 1326.1); sub 2 to 3 sentences.
No dashes. The ledger lands DIRECTLY under this section, so the sub should hand off
to the numbers ("here is what it looks like").

**Options & inspiration**
- Title: A) `The cheapest patient capital there is.`
         B) `Small payments. Big moves.`
         C) `Built for the big, deliberate move.`
- Sub rounds: owner rejected info-dense drafts ("too much info") and any broker-
  sounding language ("don't come off as broker" — no packaging files / shopping
  lenders wording anywhere on this page)
- OWNER INSPIRATION: same length as other pages, direct voice

**DECISION** (locked 2026-07-28):
- Title: `Small payments. Big moves.` (measure width vs ref 1326.1 for slope at build)
- Sub: `The lowest payments in business funding, built for your biggest moves. Tell us what you are planning and see what you qualify for, with real guidance from application to closing.`

---

## STEP 3 · NEW LEDGER (the numbers, between C3 and C4)

**What it is**: a compact terms ledger selling the SBA headline numbers. Range-based
and sales-safe only — no exact spreads, no fees.

**LOCKED (owner 2026-07-28, via brand/sba-ledger-options.html rounds)**
- Placement: between C3 intro and C4 why-it-makes-sense.
- Design (FINAL, owner picked "A · Stamp cards" from 3 boxed treatments 2026-07-28,
  after their hand-drawn boxed-cells sketch; earlier felt band + open strip both
  rejected in context): FOUR SEPARATE STAMP CARDS on the white, directly under the
  C3 intro text. NO eyebrow, NO title, NO button. Each cell: faint green fill
  rgba(0,66,37,.05) + hairline border rgba(0,66,37,.14) + radius
  clamp(10px,1.2vw,16px) — the C5 answer-stamp language as rounded rectangles.
  Card gap clamp(10px, 0.5rem + 0.6vw, 16px). Labels sage-deep small caps,
  values racing green.
- Cells (Set 2 "The Timeline", term edited by owner):
  1. `FUNDING RANGE` → `$25K – $15M`
  2. `RATE` → `Prime + 2 to 3%` (researched 2026-07-28: WSJ Prime 6.75%, typical
     7(a) spread 2.25 to 2.75% — honest, sales-safe)
  3. `TERM` → `10 – 25 Years`
  4. `TIMELINE` → `1 to 4 Weeks`
- CTA: `See my SBA options →` (cream button, route to apply.html unless owner
  redirects it to the hero form).

**Constraints**: fully fluid 360-1450 like every other container (no plateau);
built as a SHARED `th-ledger` component block so heloc can reuse; label small-caps
letter-spaced ~.26em; values one line at every viewport (nowrap + fluid size);
row collapses 4 → 2×2 → stack on phones, breakpoints aligned to the shared
520/700px system.

**DECISION (design)**: LOCKED as above 2026-07-28.

**BUILT 2026-07-28 (white-strip revision)** — shared `th-ledger` CSS block is LIVE
in main.css (between the `.th-intro` and CONTAINER 4 blocks):
- `.th-ledger` white bg, `margin-top:clamp(-72px, calc(-4px - 6.3vw), -30px)` (same
  seam pull as `.th-why` — it lands where the felt used to, keeping term-loans'
  exact rhythm), padding-top clamp(10px,1.2vw,22px), padding-bottom
  `calc(compact pad + seam)` so C4's own negative margin eats the seam back.
- Grid max-width 980, 1×4 >700px (main + big burger) · 2×2 ≤700px (small burger +
  mobile, plus row-gap clamp(2px,0.6vw,6px)); dividers ONLY between cells,
  hairline rgba(143,168,152,.35); labels sage-deep .26em small caps
  `clamp(8.5px, 4.5px + 0.55vw, 12.5px)` (>700) / `clamp(8px, 6px + 0.5vw, 11px)`;
  values racing `clamp(15px, 8.5px + 1.068vw, 24px)` (>700) /
  `clamp(14px, 12.8px + 0.88vw, 20px)` — "Prime + 2 to 3%" = 7.26em TRUE em
  (on-page probe 2026-07-28), fits the 701px worst case. Px+vw only.
QA'd on harness `site/_ledgercheck.html` (term-loans + ledger inserted between
C3 and C4) at 360/400/430/520/700/701/860/920/1030/1240/1440 — one-liners hold,
seam rhythm matches term-loans. Section markup = copy the `th-ledger` section out
of that harness (DELETE the harness before commit). Owner confirmed the felt-band
version looked bad in context; verify this one in the owner's real browser too.

---

## STEP 4 · C4 Why it makes sense (title + 4 checklist items + photo)

**Term Loans reference**
- Eyebrow: `Why it makes sense` (keep)
- Title: `The right move, right when you need it.` — nowrap (1600.3 @100px)
- Checklist: 4 items, one line each
- Button: `Get Started` → apply.html (keep)
- Photo: `img-why-dashboard-2.webp` (1200×800, 3:2)

**Constraints**: EXACTLY 4 items, ONE line each; title one line (ratio vs 1600.3);
replacement photo must be 3:2 1200×800. No dashes.

**Options & inspiration** (from old-gen page: acquisitions, buyouts, real estate, refi)
- Title: A) keep `The right move, right when you need it.` (zero CSS retune)
         B) `Big plans deserve small payments.`
         C) `Patient money for permanent moves.`
- Checklist: A) `Buying a business or a building` · `Refinancing expensive debt` · `Funding a major expansion` · `Keeping payments small`
             B) `Acquiring a business` · `Buying your building` · `Refinancing short term debt` · `Expanding with patient capital`
- Photo: A) keep the dashboard photo (matches term/loc/rbf/equipment, zero geometry risk)
         B) generate new 3:2 concept
- OWNER INSPIRATION: no acquisition/building line — owner swapped it for expansion

**DECISION** (locked 2026-07-28):
- Title: `Big plans deserve small payments.` (retune slope by width ratio vs 1600.3)
- Checklist: `Expanding your business` · `Refinancing expensive debt` · `Making a major purchase` · `Keeping payments small`
- Photo: KEEP `img-why-dashboard-2.webp` (same as all other service pages)

---

## STEP 5 · C5 Straight answers (4 question rows + stamp answers)

**Reference pills across pages**: term `Low Minimum FICO` / `$20K – $10MM` · loc `620
Minimum FICO` / `$10K – $5MM` · rbf `No minimum FICO` / `1 to 3x monthly revenue` ·
equipment `No minimum FICO` / `Up to 100% of the cost`

**Constraints**: exactly 4 rows; questions one line; answers short pill phrases that
fit the ≤700px stacked pill. Keep title `Straight answers, before you apply.` = zero
CSS. Sync build.mjs sba desc to locked pills. Don't duplicate the ledger verbatim —
the ledger states the numbers, C5 answers the worries.

**Options & inspiration**
- Row drafts (owner sets final pills):
  01 `What credit score do I need?` → `650 minimum FICO`
  02 `How fast can I get funded?` → `1 to 4 weeks`
  03 `What can I use it for?` → `Buyouts, buildings, refi` / `Almost any business use`
  04 `How much can I get?` → `$25K – $15M`
  Alt rows if owner prefers less ledger overlap:
  05 `Will you handle the paperwork?` → `Yes, start to finish`
  06 `What if SBA isn't the fit?` → `Bridge options ready`
- OWNER INSPIRATION: picked the low-overlap set (option B)

**DECISION** (locked 2026-07-28):
- Title: keep `Straight answers, before you apply.` (zero CSS retuning)
- 01 `What credit score do I need?` → `650 minimum FICO`
- 02 `Will you handle the paperwork?` → `Yes, start to finish`
- 03 `What can I use it for?` → `Almost any business use`
- 04 `How much can I get?` → `$25K – $15M`
- Button: keep `More FAQs` → faq.html

---

## STEP 6 · C6 Industries we back (4 per-page industries + card photos)

**Reference**: title `Industries we back.` (keep = zero CSS) · button `View all
Industries` → services.html (keep) · cards 560×700, emerald scrim, RULE 10 framing.

**Reusable existing photos**: Construction/Contractors · Retail · Automotive ·
Medical · Ecommerce · Restaurants · Transportation (trucking) · Farming

**Options & inspiration** (SBA suits acquisition/real-estate-heavy businesses)
- Set A (all reuse, zero new photos): Medical · Construction · Restaurants · Retail
- Set B: Restaurants · Medical · Franchises (NEW photo) · Construction
- Set C: Hospitality (NEW) · Medical · Retail · Manufacturing (NEW)
- OWNER INSPIRATION: _(none — picked all-reuse set)_

**DECISION** (locked 2026-07-28) — cards left to right:
1. `Medical` — REUSE `img-ind-medical.webp`
2. `Construction` — REUSE `img-ind-construction.webp`
3. `Restaurants` — REUSE `img-ind-restaurant.webp`
4. `Retail` — REUSE `img-ind-retail.webp` (term's OPEN-sign card, owner-approved)
- Title keep `Industries we back.` · button keep `View all Industries` → services.html
- ZERO new card photos needed.

---

## PHOTO MANIFEST (fill as steps lock; generate after Step 6)

| Slot | File name | Size | Status |
|---|---|---|---|
| Hero background | `sba-hero.webp` | landscape ~1536×1024, dark grade, RULE 9 headroom | pending Step 1 |
| C4 photo | tbd | 1200×800 (3:2) | pending Step 4 |
| C6 cards 1-4 | tbd | 560×700 (4:5), RULE 10 framing | pending Step 6 |

## BUILD CHECKLIST — BUILT 2026-07-28 ✔

- [x] Ledger: shared `th-ledger` CSS live (stamp cards, owner-picked design A)
- [x] Hero photo generated (gpt-image-2, 2 takes), owner picked A (two partners
      handshake in artisan shop) via brand/sba-photo-options.html; converted
      FULL-FRAME `sba-hero.webp` (107KB, resize 1536 1024, no crop — RULE 9);
      sources in brand/ai/photos-sba/. All C6 cards reused — zero new card photos.
- [x] `site-src/pages/sba-loans.html` = term-loans byte-copy + locked slots +
      th-ledger section between C3 and C4 (old-gen page replaced)
- [x] `body[data-page="sba"]` block after equipment: hero var + `--th-hero-pos:22% 0%`
      + intro slope 4.5vw (1589.8/1400.3 true ratio) + C4 slope 4.07vw
      (1903.7/1725.0 true ratio). Hero title "SBA Loans." = 531.0 true @100px,
      narrower than "Term Loans." → shared clamp, zero fit math.
- [x] Touch-title `:is()` rule extended to include `sba`
- [x] build.mjs sba title/desc synced to locked copy
- [x] Built + QA: screenshots at 520/701/860/1030/1440 — ledger 1×4 / 2×2 at the
      700px break, all one-liners hold, C5 stamps fit stacked, industries 4-up/2×2,
      hero heads fully clear with photo live at 520 + 1440
- [ ] NOT YET COMMITTED (awaiting owner)

---

## REVISION · 2026-07-28 (heloc session): ledger restyled to the table language

Owner decision after the heloc build: SBA's numbers strip now uses the SAME hairline
ledger language as heloc ("full HELOC match") — stamp cards retired on this page.
Markup swapped to `.th-ledger__tbl` / `.th-ledger__row` (4 rows): desktop = two
hairline columns × 2 rows; ≤700px = open 2×2 grid, label over value, center divider.
All shared CSS (no sba-specific rules); recipe in token-pool.md POOL · th-ledger
TABLE VARIANT. Verified 520 / 1440. The stamp-card variant (`.th-ledger__grid` /
`__cell`) remains in main.css as an available shared style, currently unused.
