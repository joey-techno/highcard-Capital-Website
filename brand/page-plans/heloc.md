# Page Plan · HELOC

Page file: `heloc.html` · build id: `heloc` (already registered in site-src/build.mjs, nav: funding)
Status: **DONE — built, revised, and committed 2026-07-28 (commit 0b672fc)**

Source material: owner pasted the full old-gen HELOC page copy 2026-07-28 (hero, "What is
a HELOC" explainer, 10-row terms table, MCA-payoff section, HELOC calculator). Owner wants
"the same thing we added to SBA and maybe more" — the th-ledger numbers strip is in; the
open question is whether any MORE structure comes over (Step 0).

This workbook locks every wording + photo choice BEFORE the page is built. Work top to
bottom; a step is done when its **DECISION** line is filled. When all steps are locked:
generate photos (OpenAI API) for approval, then build per the contract below.

---

## BUILD CONTRACT (locked — any chat building this page must obey)

1. Byte-copy `site-src/pages/term-loans.html` as the base. Swap CONTENT SLOTS ONLY
   (text and img src/alt), then insert the th-ledger section between C3 and C4
   (markup pattern: sba-loans.html lines 74-84). Keep every class, id, data-reveal /
   data-stagger / data-carousel attribute, and section order exactly otherwise.
   Any FURTHER structural addition must be locked in Step 0 below first.
2. NEVER edit or duplicate the shared `th-*` rules in site/assets/css/main.css.
   All sizing, breakpoints (520/560/700px), clamps, radii, and animations are
   shared — that is what makes the copy pixel-exact.
3. Per-page CSS = ONE `body[data-page="heloc"]` block (hero vars + retuned title
   slopes). th-ledger CSS already EXISTS as a shared component (built for sba) —
   reuse it as-is; if a 6-cell variant is locked in Step 0, add ONE shared modifier
   (e.g. `.th-ledger__grid--6`), never a heloc-only fork.
   Slope method: `Y_new = Y_ref × (width_ref / width_new)` at equal font size (100px
   Poppins 700, letter-spacing -.022em). Refs: C3 3.96vw (ref width 1326.1) · C4
   3.69vw (1600.3) · C5 3.8vw · C6 4.6vw (≤520px slopes = ×1.2 ratio).
4. Hero photo lives in CSS: `body[data-page="heloc"] .th-hero { --th-hero-img:...;
   --th-hero-pos:...; }`. Scrim written once in `.th-hero` — never duplicate.
5. HERO TITLE fit: `HELOC.` is far narrower than `Term Loans.` → shared clamp
   everywhere, no fit math expected (verify with true-em probe on the built page —
   DOM Range pattern; scratch harness reads ~16% narrow). If any calc IS needed:
   PX + VW ONLY, no rem, no cqi (both failed in owner's real browser 2026-07-28).
   ≤700px column model `0.881vw - 216.4px`; big-burger column `66.1vw - 62.4px`.
6. UNCHANGED containers — byte-identical from term-loans.html, zero input needed:
   C2 trust band · testimonials · inline "Let's get in touch." with `-touch` form
   ids (NEVER `{{TOUCH}}`). Extend the `:is(body[data-page="term"], ...)` touch-title
   rule (main.css ~1664) to include `heloc` in BOTH rules (base + ≤520px).
7. TEXT LENGTH BUDGETS: hero sub ≤ ~80 chars / 2 lines desktop · C4 checklist exactly
   4 items, ONE line each · C5 questions one line, answers short pill phrases ·
   C6 labels one word-ish · ledger labels 1-3 words, values short one-liners.
8. PHOTO SPECS + RULES 9/10 (token-pool.md): hero landscape dark grade, FULL-FRAME
   conversion, head fully clear at every viewport (outpaint via
   brand/ai/extend-rbf-hero.mjs pattern if the file lacks headroom), pin vertical
   pos 0% when the head sits high · C4 = 3:2 1200×800 · C6 cards 560×700, subjects
   horizontally centered, waist-up, ≥6% headroom, explicit face-centered extract +
   two-pass sharp-cli, NEVER blind `--fit cover`. QA both 4:5 and square card crops.
9. Copy rules: no dashes anywhere (numeric range pills like `7 – 11%` are the only
   exception, and only where the owner locks them) · titles end in
   `<span class="dot">.</span>` · copy sells; nothing revealing (ranges and
   "typical" only; "up to" framing for CLTV).
10. Build: edit `site-src/pages/heloc.html`, run `node site-src/build.mjs`;
    sync build.mjs heloc title/desc to locked pills; commit site-src + site + css + img.
11. QA = SIDE BY SIDE vs term-loans + sba-loans at 360 / 520 / 700 / 1030 / 1440 +
    sweep to 1450: matching heights on shared containers, breaks fire at the same px,
    one-liners hold, ledger fluid with no plateau 360-1450, carousel works ≤700px,
    no overflow. (Headless Edge can't render <~492px — use fixed-width iframe grids.)

Full dims spec: `brand/token-pool.md` (container inventory + locked rules 1-10).
Finished examples: `brand/page-plans/sba-loans.md` (has the ledger decision trail),
`line-of-credit.md`, `revenue-financing.md`, `equipment-financing.md`.

---

## STEP 0 · Page structure (what comes over from the old-gen page)

The old-gen HELOC page has THREE blocks the carbon-copy template does not:

- **Terms table** (10 rows: Rate 7–11% APR · Term 5–30 Years · Up to 90% CLTV ·
  No Appraisal · ~5 Days · Revolving Line · Monthly Payments · Soft Pull ·
  No Prepayment Penalties · Business Use) → maps to the th-ledger strip (IN, per owner).
  Open question: 4 cells like sba, or a 6-cell variant (3×2 desktop / 2×3 mobile).
- **MCA payoff section** ("$5,000 per week → $500 per month · Payoff your MCAs with
  HELOC") → could be its OWN new section, or fold into C4 as the "why" angle
  (title + 4 checklist items), keeping structure identical.
- **HELOC calculator** (home value − mortgage balance → estimated max line at 90%
  CLTV, with a visual bar) → genuinely new interactive component if wanted.

**DECISION** (structure, owner 2026-07-28): Ledger = **Option B, the FULL 10-row table**
(brand/heloc-ledger-options.html), placed directly after the C3 intro exactly where the
SBA strip sits: white band, no eyebrow, no title, no button. Two hairline columns
desktop stacking to one column on phones; labels left uppercase sage, values right
Poppins 700 racing green, all one-liners, fluid every px. Build as a shared variant
of the ledger component (e.g. `.th-ledger--table`), never a heloc-only fork.
MCA payoff section: **SKIPPED** (owner 2026-07-28) — C4 stays a general why-HELOC section.
Calculator: **IN** (owner 2026-07-28) — interactive estimate-my-line section (home value −
mortgage balance → estimated max line at up to 90% CLTV, visual bar). Placement + design
to be locked via visual options page before build. PLACEMENT (owner 2026-07-28): after
C4 (Why, emerald) and before C5 (Straight answers).
LOCKED page order: Hero → trust band → C3 intro → LEDGER TABLE → C4 why → CALCULATOR →
C5 straight answers → C6 industries → testimonials → get in touch.
CALCULATOR DESIGN (owner 2026-07-28, brand/heloc-calc-options.html): **Option A, clean
paper** — on white, TWO SLIDERS (home value / mortgage balance, live figures), big
estimated-max-line number, split bar (mortgage stone vs available line racing green)
with legend, one-line disclaimer. Sliders only, no typed fields.
CALC REVISIONS (owner 2026-07-28, same day): NO TITLE — eyebrow "HELOC Calculator"
only · slider scales raised to $10M max both (step $50K, defaults $1M / $100K) ·
disclaimer ONE LINE at every px: nowrap + fit slopes (sentence TRUE 5344.6 @100px
Inter; min(cap, 1.65vw, 1.833vw − 0.733px)) with cap = original clamp ×0.9
(owner: shrink 10% across all).
DIM POOL REQUIREMENT (owner 2026-07-28): both NEW components (ledger table + calculator)
must be dimensioned FROM brand/token-pool.md — reuse existing tokens/clamps wherever a
matching role exists (section padding, title tokens, radii, gaps, label/value type
scales from th-ledger); any genuinely new dimension gets designed fluid (px+vw, no rem,
no cqi outside container-typed forms), verified 360-1450, and ADDED to token-pool.md
as new pool entries. Everything one-line where designed one-line, no plateau.

---

## STEP 1 · C1 Hero (title / subtitle / micro line / background photo)

**Term Loans reference**
- Title: `Term Loans.` — shared clamp, nowrap (true 5.99em)
- Sub: 85 chars, 2 lines desktop · Micro: `$15K minimum monthly revenue required.`
- Photo: dark bottom fade into felt green

**Constraints**: `HELOC.` far narrower than `Term Loans.` → shared clamp, no fit math
expected. Sub ~80 chars / 2 lines. Micro one line. No dashes. RULE 9 headroom.

**Options** (source: old-gen hero "Easy Close Business HELOC")
- Title: A) `HELOC.` (matches nav)  B) `Business HELOC.`
- Sub: A) `Turn your home equity into revolving business capital, up to 90% of its value.` (79)
       B) `Draw what you need, when you need it, and pay interest only on what you use.` (76)
       C) `Your home equity, working as a revolving line of capital for your business.` (75)
- Micro: A) `No appraisal required.`  B) `Soft credit pull to see your rate.`
         C) `650 minimum FICO required.` (confirm actual FICO floor with owner)
- Hero photo concepts (landscape, dark grade, real person, RULE 9 headroom):
       A) Owner at their kitchen table at dusk, laptop open, warm home light
       B) Owner in front of their home at golden hour, confident, keys in hand
       C) Owner in a home office, family photos, planning the next move
- OWNER INSPIRATION: _(old-gen sub: "Turn up to 90% of your home's equity into a
  revolving line of business capital. Draw what you need, when you need it, and pay
  interest only on what's out.")_

**DECISION** (locked 2026-07-28):
- Title: `HELOC.` one line everywhere (far narrower than Term Loans → shared clamp,
  verify with true-em probe at build)
- Sub: `Turn your home equity into revolving business capital, up to 90% of its value.` (79 chars)
- Micro: TWO stacked proof lines, each with its own secure icon (owner 2026-07-28):
  `620 minimum FICO.` / `No appraisal required.` — shared `.th-micro + .th-micro`
  fluid gap rule added in main.css
- Hero photo: GENERATE — owner at their kitchen table at dusk, laptop open, warm home
  light; landscape, dark moody grade like term-hero, clear space above head (RULE 9).

---

## STEP 2 · C3 Intro (centered title + subtitle)

**Constraints**: title one line (slope by width ratio vs 1326.1); sub 2 to 3 sentences;
the ledger lands DIRECTLY under this section, so the sub should hand off to the numbers.
No dashes. No broker-sounding language (locked owner rule from sba).

**Options**
- Title: A) `Your equity, on standby.`
         B) `Draw. Repay. Draw again.`
         C) `The lowest-rate line you can get.`
- Sub: draft after title lock (SBA pattern: what it is + how it feels + soft CTA hand-off).
- OWNER INSPIRATION: old-gen "What is a HELOC?" explainer paragraph.

**DECISION** (locked 2026-07-28):
- Title: `Your equity, on standby.` (one line; slope by width ratio vs 1326.1 —
  true-em probe at build)
- Sub: `A revolving line backed by your home's equity. Draw what you need, repay, and
  draw again, paying interest only on what you use. Here is what the terms look like.`
  (hands off to the ledger table directly below)

---

## STEP 3 · TH-LEDGER cells (shared component, built on sba)

Old-gen table rows to choose from: Rate `7 – 11% APR` · Term `5 – 30 Years` ·
`Up to 90% CLTV` · Appraisal `None Needed` · Speed `As Fast as 5 Days` ·
Draw `Revolving Line` · Payments `Monthly` · Credit Check `Soft Pull` ·
Prepayment `No Penalties` · Use `Business Use`.

**Constraints**: labels 1-3 words uppercase, values ONE line at every px (nowrap),
tabular numerals. 4 cells = existing 1×4 / 2×2. 6 cells = new shared `--6` modifier.

**DECISION** (locked 2026-07-28 via Step 0): FULL TABLE, Option B of
brand/heloc-ledger-options.html. 10 rows, two hairline columns desktop → one column
stacked on phones, labels left / values right, no eyebrow, no title, no button:
- Rate → `7 – 11% APR` · Term → `5 – 30 Years` · Loan to Value → `Up to 90% CLTV`
- Appraisal → `No Appraisal` · Speed → `5 Days` · Draw Structure → `Revolving Line`
- Payments → `Monthly` · Credit Check → `Soft Pull` · Prepayment → `No Penalties`
- Use of Funds → `Business Use`
Type reuses th-ledger label/value scales from the pool; row padding/dividers are new
pool entries. Every label and value one line at every px.
PHONE REVISION (owner 2026-07-28, "too long"): ≤700px the table becomes an OPEN 2×5
GRID (pick B of brand/heloc-ledger-mobile-options.html) — cells label-over-value,
centered, hairline lattice with center divider, all 10 numbers kept; half the height
of the stacked rows. Verified 360/480/660.

---

## STEP 4 · C4 Why it makes sense (title / 4 checklist items / photo)

**Constraints**: exactly 4 items, one line each. Candidate angle per Step 0: the MCA
payoff story (old-gen: "$5,000 per week → $500 per month", replace daily debits with
one monthly payment). Photo 3:2 1200×800 — keep dashboard photo or generate new.

**Options**: draft after Step 0 locks the angle.

**DECISION** (locked 2026-07-28):
- Title: `The cheapest capital you will ever tap.` (one line; slope by width ratio
  vs 1600.3 — true-em probe at build)
- Checklist (exactly 4, one line each — revised for one-line-everywhere + owner swap
  2026-07-28: Consolidating debt replaces the slow-seasons line as item 1; two lines
  shortened so nothing wraps ≤540px; final set owner-picked line by line):
  Consolidating debt · Smoothing out cash flow · Growing at the lowest rate ·
  Paying for what you use
- Photo: KEEP `img-why-dashboard-2.webp` (same as term/sba family)

---

## STEP 5 · C5 Straight answers (4 rows + stamp answers)

**Draft options** (from old-gen facts)
- 01 `Do I need an appraisal?` → `No appraisal needed`
- 02 `Will checking hurt my credit?` → `Soft pull only`
- 03 `How fast can I close?` → `As fast as 5 days`
- 04 `How much can I access?` → `Up to 90% CLTV`
- spares: prepayment (`No penalties`) · what for (`Almost any business use`)

**DECISION** (locked 2026-07-28, Set C — mixed, minimal table overlap):
- 01 `What credit score do I need?` → `620 minimum FICO`
- 02 `Do I have to draw it all?` → `Only what you need`
- 03 `How fast can I close?` → `As fast as 5 days`
- 04 `Will you handle the paperwork?` → `Yes, start to finish`

---

## STEP 6 · C6 Industries we back (4 cards)

**Options**: A) reuse all 4 (Medical / Construction / Restaurants / Retail, like sba)
B) swap in per-page picks. HELOC is owner-personal — trades/home-services could fit
(Contractors, Trucking, E-commerce...).

**DECISION** (locked 2026-07-28): REUSE all 4 — Medical / Construction / Restaurants /
Retail (OPEN sign), byte-identical card markup from sba-loans.html. No new photos.

---

## Build checklist (after all steps locked)

- [x] Hero photo generated + owner-approved (2 takes, brand/heloc-photo-options.html;
      owner picked TAKE B 2026-07-28 — her at the kitchen table, clean wall behind form;
      full-frame webp q82, --th-hero-pos:22% 0%)
- [x] site-src/pages/heloc.html written (byte-copy of sba + slots + ledger table + calc)
- [x] body[data-page="heloc"] CSS block (intro 5.24vw = 3.96×1589.8/1200.7 TRUE ·
      why 3.74vw = 3.69×1903.7/1879.2 TRUE · calc title 4.82vw = 4.6×953.4/909.9 TRUE)
      + touch-title rule extended + th-ledger table variant + th-calc component
      + calculator JS in main.js ([data-heloc-calc])
- [x] build.mjs heloc title/desc synced to locked copy
- [x] node site-src/build.mjs · true-em probes (harness deleted) · QA 520/701/860/1030/1440
- [x] token-pool.md: new POOL entries for th-ledger table variant + th-calc
- [x] Commit + push: 0b672fc, 2026-07-28 (incl. SBA ledger restyle + row-01 pill fix)
