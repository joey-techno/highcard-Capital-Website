# Page Plan · Revenue Based Financing

Page file: `revenue-financing.html` · build id: `rbf` (already registered in site-src/build.mjs, nav: funding)
Status: **BUILT 2026-07-28 — photos picked (hero B, trucking A, retail A, farming A), page live; NOT committed**

**PAGE-WIDE COPY RULE (owner 2026-07-28): do NOT describe this product as revenue
share / a share of sales. Frame it as an advance/funding sized to or built around
monthly revenue. Applies to every container incl. C3 sub and C5 pills.**

This workbook locks every wording + photo choice BEFORE the page is built. Work top to
bottom; a step is done when its **DECISION** line is filled. When all 5 steps are locked:
generate photos (OpenAI API) for approval, then build per the contract below.

---

## BUILD CONTRACT (locked — any chat building this page must obey)

1. Byte-copy `site-src/pages/term-loans.html` as the base. Swap CONTENT SLOTS ONLY
   (text and img src/alt). Keep every class, id, data-reveal/data-stagger/data-carousel
   attribute, and section order exactly.
2. NEVER edit or duplicate the shared `th-*` rules in site/assets/css/main.css
   (~2164 onward). All sizing, breakpoints (520/560/700px), clamps, cqi queries,
   radii, and animations are shared — that is what makes the copy pixel-exact.
3. Per-page CSS = ONE `body[data-page="rbf"]` block appended after the existing loc
   block: hero photo vars + retuned title slopes ONLY. Nothing else. Slope method:
   `Y_new = Y_ref × (width_ref / width_new)` measured at equal font size (100px
   Poppins 700, letter-spacing -.022em), so the new headline fills the same screen
   fraction at every viewport. Refs: C3 3.96vw (ref width 1326.1) · C4 3.69vw
   (1600.3) · C5 3.8vw · C6 4.6vw (≤520px slopes = ×1.2 ratio, e.g. 4.6 → 5.6).
4. Hero photo lives in CSS, not HTML (already refactored):
   `body[data-page="rbf"] .th-hero { --th-hero-img:url('../img/rbf-hero.webp'); --th-hero-pos:center N%; }`
   The 6-stop green scrim stays written once in `.th-hero` — never duplicate it.
5. HERO TITLE fit recipe for titles wider than `Term Loans.` (516.6 @100px), inside
   `@media (max-width:700px)`: `white-space:nowrap` + `font-size:min(shared clamp,
   calc(Avw - Bpx))` where the calc = 0.97 × column / title-em: column model is
   `0.881vw - 216.4px` (5vw pad ×2 + 202px form + gap), title-em = width@100px / 100.
   DO NOT use cqi/container queries — they failed silently in the owner's real
   browser (2026-07-28). Owner may also choose a STACKED two-line title ≤700px via
   toggle spans (see this page's build notes) — then size to the LONGEST line's em.
6. UNCHANGED containers — copy byte-identical from term-loans.html, zero input needed:
   - C2 trust band (Trustpilot / $100M+ / 2,000+ pill)
   - Testimonials "What our clients are saying." (3 cards + carousel-only 4th)
   - "Let's get in touch." touch band — keep the INLINE version with `-touch`
     suffixed form ids (`qualifyForm-touch`, `qf-*-touch`). NEVER swap in `{{TOUCH}}`:
     it duplicates the hero form's ids and breaks forms.js.
   Also extend the `:is(body[data-page="term"], body[data-page="loc"]) .sec-touch .touch__title`
   rule (main.css ~1662) to include `rbf` (same wording = same slope, no retune).
7. TEXT LENGTH BUDGETS (heights depend on line counts; same lines = same heights):
   hero sub ≈ 2 lines at desktop (~85 chars) · C4 checklist items exactly 4, ONE line
   each · C5 questions one line, answers short pill phrases · C6 labels one word-ish.
8. PHOTO SPECS: hero = landscape, graded dark/moody like term-hero.webp (text sits on
   the identical scrim), position tunable via `--th-hero-pos` · C4 = 3:2, 1200×800
   (the C4 photo-width formula assumes this + 4 single-line rows) · C6 cards = 560×700
   portrait, subjects readable under emerald scrim. Convert:
   `npx --yes sharp-cli -i src.jpg -o dir/ -f webp -q 82 resize W H --fit cover`
   Generation: brand/ai/ pattern (gpt-image-2, fallback gpt-image-1, quality high,
   key from repo-root .env), photorealistic real-person style string as in
   brand/ai/gen-loc-images.mjs.
9. Copy rules: no dashes anywhere (C5 pill exceptions only if owner explicitly locks
   them, as on term-loans) · titles end in `<span class="dot">.</span>` · copy stays
   general and hype, routes to form or FAQ. Page name is written WITHOUT a hyphen in
   on-page copy: "Revenue Based Financing".
10. Build: edit `site-src/pages/revenue-financing.html`, run `node site-src/build.mjs`
    (regenerates all pages + fresh `?v=` — expected); sync build.mjs rbf title/desc to
    the locked C5 range; commit site-src + site + css + img.
11. QA = SIDE BY SIDE vs term-loans at 360 / 520 / 700 / 1030 / 1440 + sweep to 1450:
    section heights match, breaks fire at the same px, every one-liner holds one line,
    C4 photo height tracks the checklist, carousel works ≤700px, no horizontal overflow.
    (Headless trap: Edge can't render <~492px viewports — use fixed-width iframes or
    the DOM-probe method in token-pool.md.)

Full dims spec: `brand/token-pool.md` (complete container inventory + locked rules).
Finished example of this workbook: `brand/page-plans/line-of-credit.md`.

---

## STEP 1 · C1 Hero (title / subtitle / micro line / background photo)

**Term Loans reference**
- Title: `Term Loans.` — `clamp(1.9rem, 0.79rem + 3.87vw, 4.4rem)`, nowrap (516.6 @100px)
- Sub: `Grow, expand, or seize the moment with flexible term funding built for your business.` (85 chars, 2 lines desktop)
- Micro: `$15K minimum monthly revenue required.` (secure icon)
- Photo: `term-hero.webp` in CSS, `center 13%`, dark bottom fade into felt green

**Constraints**: title ONE line at every px (contract item 5). Measured widths @100px:
`Revenue Based Financing.` = 1072.3 (2.08× Term Loans — needs all-widths auto-fit; at
1440 it fills the whole text column at roughly the shared cap size, then scales down
per-pixel) · `Revenue Financing.` = 804.9 (1.56× — fits shared size on desktop, auto-fit
kicks in ≤700px) · `Revenue Based Funding.` = 1010.2. Sub ~85 chars / 2 lines. Micro one
line. No dashes ("Revenue Based", not "Revenue-Based").

**Options & inspiration**
- Title: A) `Revenue Based Financing.` (full product name; big one-liner that spans the
           column on desktop, shrinks to fit on phones)
         B) `Revenue Financing.` (shorter; behaves closest to Term Loans/Line of Credit)
         C) `Revenue Based Funding.`
- Sub: A) `An advance sized to your monthly sales, repaid as a small share of what you earn.` (81)
       B) `Funding that moves with your sales. Slow month, smaller payment. Simple as that.` (80)
       C) `Turn steady sales into working capital today, repaid as a small share of revenue.` (81)
- Micro: A) keep `$15K minimum monthly revenue required.` · B) owner variant
- Hero photo concepts (OpenAI, landscape, moody green-friendly grade, real-person
  photorealism, subject placed so the form column and bottom fade stay clean):
       A) Café owner at the register during a busy morning, warm light, customers blurred behind
       B) Boutique owner reviewing the day's sales on a tablet at the counter (sister energy to the loc hero but distinct scene)
       C) Barber or salon owner mid-service in a styled shop, warm tones
- OWNER INSPIRATION: _(paste ideas, references, links, rewrites here)_

**DECISION** (locked 2026-07-28):
- Title: `Revenue Financing.` (804.9 @100px = 1.56× Term Loans; fits shared size on
  desktop; apply the ≤700px auto-fit per contract item 5, X ≈ 12.0cqi)
- Sub: `Turn your sales into working capital and grow without waiting on the next busy month.` (85 chars; owner rejected revenue-share framing — see page-wide copy rule)
- Micro: keep `$15K minimum monthly revenue required.`
- Hero photo: generate — boutique owner reviewing the day's sales on a tablet at the
  counter, warm light; landscape, dark moody grade like term-hero.webp

---

## STEP 2 · C3 Intro (centered title + subtitle)

**Term Loans reference**
- Title: `Set your growth plans in motion.` — `min(2.43rem, 3.96vw)`, nowrap (1326.1 @100px)
- Sub: `Bridge a slow season or fund your next big move with a short term business loan. Our team walks you through your options and shapes a recommendation around your business, even if you've been denied elsewhere.` (~205 chars, max-width 620px)

**Constraints**: title one line (slope retuned by width ratio vs 1326.1); sub 2 to 3
sentences, similar length. No dashes.

**Options & inspiration**
- Title: A) `Funding that keeps pace with your sales.`
         B) `Your revenue can unlock more than you think.`
         C) `Put your monthly revenue to work.`
- Sub: A) `Get an advance sized 1 to 3 times your monthly revenue and put it to work right away. Approvals lean on your sales, not just your credit score. We shape the offer around your business, even if you've been denied elsewhere.`
       B) `Revenue financing turns steady sales into fast, flexible capital. Qualify on the strength of your revenue, get options in as little as 24 hours, and let our team build a custom recommendation around your business.`
- OWNER INSPIRATION: owner asked for non-revenue titles + different subs (round 2)

**DECISION** (locked 2026-07-28):
- Title: `Capital that moves at your speed.` (measure width vs ref 1326.1 for slope at build)
- Sub: `Keep growing through busy seasons and slow ones alike. Get funding built around how your business actually runs, with options in as little as 24 hours. Our team walks you through every choice and finds the right fit.`

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
- Title: A) `More fuel for what's already working.`
         B) `Built for businesses with real momentum.`
         C) keep `The right move, right when you need it.`
- Checklist: A) `Riding out slow seasons` · `Stocking up for busy ones` · `Covering payroll` · `Marketing that converts`
             B) `Managing cash flow` · `Buying inventory in bulk` · `Launching a new location` · `Covering surprise expenses`
- Photo: A) keep the dashboard photo (safe, already matched to the geometry)
         B) generate new 3:2 concept (describe below)
- OWNER INSPIRATION: owner supplied the 4 (Managing cash flow, Covering payroll, Surprise expenses, Nimble); polished round picked A

**DECISION** (locked 2026-07-28):
- Title: `Built for businesses with real momentum.` (measure width vs ref 1600.3 for slope at build)
- Checklist: `Managing cash flow` · `Covering payroll` · `Handling surprise expenses` · `Staying nimble`
- Photo: KEEP `img-why-dashboard-2.webp` (same as term-loans + loc, zero geometry risk)

---

## STEP 4 · C5 Straight answers (4 question rows + stamp answers)

**Term Loans / Line of Credit reference**
- Title: `Straight answers, before you apply.` — `min(2.43rem, 3.8vw)` (keep = zero CSS)
- Term rows: 01 credit score → `Low Minimum FICO` · 02 speed → `Funding in days, not weeks` · 03 terms → `Weekly and Monthly` · 04 `How much can I borrow?` → `$20K – $10MM`
- Loc rows: 01 → `620 Minimum FICO` · 02 → `Less than 24hrs` · 03 → `Weekly and Monthly` · 04 `How much can I access?` → `$10K – $5MM`
- Button: `More FAQs` → faq.html (keep)

**Constraints**: exactly 4 rows; questions one line; answers short pill phrases (must fit
the pill at ≤700px stacked layout). Keep title = zero slope retune.
build.mjs rbf desc currently says: sized 1–3× monthly revenue, options in as little as
24 hours, soft credit pull — good pill raw material; sync desc to whatever locks here.

**Options & inspiration**
- Title: A) keep `Straight answers, before you apply.` (recommended, zero CSS) · B) owner variant
- Row drafts (owner sets final pills):
  01 `What credit score do I need?` → e.g. `No minimum FICO` / `Revenue matters, not FICO`
  02 `How fast can I get funded?` → e.g. `Less than 24hrs` (matches loc)
  03 `How do payments work?` → e.g. `A small share of sales` / `Slow month, smaller payment`
  04 `How much can I get?` → e.g. `1 to 3x monthly revenue` or a $ range pill
- OWNER INSPIRATION: owner set row 03 to an early payoff angle (round 2 pick A)

**DECISION** (locked 2026-07-28):
- Title: keep `Straight answers, before you apply.` (zero CSS retuning)
- 01 `What credit score do I need?` → `No minimum FICO`
- 02 `How fast can I get funded?` → `Less than 24hrs`
- 03 `Can I pay it off early?` → `Yes, with discounts`
- 04 `How much can I get?` → `1 to 3x monthly revenue`
- Button: keep `More FAQs` → faq.html

---

## STEP 5 · C6 Industries we back (4 per-page industries + card photos)

**Term Loans reference**
- Title: `Industries we back.` — `min(2.43rem, 4.6vw)` (5.6vw ≤520) (keep = zero CSS)
- Term cards: Construction · Retail · Automotive · Medical — 560×700 portrait,
  emerald scrim `rgba(0,51,29,...)` (never black), hover zoom, label bottom-left
- Loc cards: Ecommerce · Contractors · Restaurants · Medical
- Button: `View all Industries` → services.html (keep)

**Constraints**: exactly 4 cards; labels short (one word ideal); photos generated at
560×700 (4:5), subject centered-high so the bottom scrim + label read cleanly; grade
consistent with existing cards; reuse existing card photos where the industry repeats.
Title keep = zero CSS.

**Options & inspiration** (revenue based financing suits sales-heavy businesses)
- Set A: Restaurants · Retail · Salons · Ecommerce
- Set B: Restaurants · Trucking · Retail · Gyms
- Set C: Cafes · Ecommerce · Salons · Auto Shops
- Reusable existing photos: Construction/Contractors, Retail, Automotive, Medical,
  Ecommerce, Restaurants (from term + loc builds)
- OWNER INSPIRATION: owner supplied own 4 (Transportation/trucking NEW, Contractors reuse, Retail NEW photo, Farming NEW) after reviewing brand/rbf-industry-inventory.html

**DECISION** (locked 2026-07-28) — cards left to right:
1. `Transportation` — GENERATE: driver with a clipboard at a loading dock, trailer behind
2. `Contractors` — REUSE `img-ind-construction.webp` (same as loc)
3. `Retail` — GENERATE NEW (replaces term's retail look on this page): shop owner smiling at the counter ringing up a customer, customer softly blurred
4. `Farming` — GENERATE: farmer standing in a crop field at golden hour, arms crossed, looking at camera
- Title keep `Industries we back.` · button keep `View all Industries` → services.html

---

## PHOTO MANIFEST (fill as steps lock; generate after Step 5)

| Slot | File name | Size | Status |
|---|---|---|---|
| Hero background | `rbf-hero.webp` | landscape (~1920×1080), dark grade | GENERATE: boutique owner reviewing day's sales on tablet at counter |
| C4 photo | keep `img-why-dashboard-2.webp` | 1200×800 (3:2) | LOCKED: reuse, no new photo |
| C6 card 1 | `img-ind-trucking.webp` | 560×700 (4:5) | GENERATE: driver w/ clipboard at loading dock, label "Transportation" |
| C6 card 2 | reuse `img-ind-construction.webp` | 560×700 (4:5) | LOCKED: reuse, label "Contractors" |
| C6 card 3 | `img-ind-retail-2.webp` | 560×700 (4:5) | GENERATE: owner at counter w/ customer (page-specific retail) |
| C6 card 4 | `img-ind-farming.webp` | 560×700 (4:5) | GENERATE: farmer in field, golden hour |

## BUILD CHECKLIST — BUILT 2026-07-28 ✔

- [x] Photos generated (gpt-image-2, all 8), owner picked B/A/A/A via brand/rbf-photo-options.html, converted: `rbf-hero.webp` (80KB), `img-ind-trucking.webp`, `img-ind-retail-2.webp`, `img-ind-farming.webp` (560×700); sources in brand/ai/photos-rbf/
- [x] `site-src/pages/revenue-financing.html` = term-loans byte-copy + locked content slots (old-gen page replaced)
- [x] `body[data-page="rbf"]` block after the loc block: hero var + `--th-hero-pos:22% 13%` (subject sits in the left third of rbf-hero; keeps him visible in narrow crops) + intro slope 3.88vw (1353.3/1326.1) + why slope 3.51vw (1680.6/1600.3)
- [x] Hero title STACKS in small burger + mobile (owner revision after build, 2026-07-28): "Revenue Based" line 1 / "Financing." line 2 via toggle spans in the markup (`.th-title__l1`/`.th-title__l2`/`.th-title__based`); >700px hides " Based" → one-line "Revenue Financing." at the shared clamp. ≤700px font = `min(clamp(30.4px, 12.64px + 3.87vw, 70.4px), calc(13vw - 35px))` — PX-ONLY, no rem (owner's browser renders rem larger than 16px — enlarged browser/OS text setting — which blew the rem-based shared clamp past the column and overlapped the form; px-only + ~92% fill also absorbs scrollbar-inclusive vw). Longest line "Revenue Based" = 6.186em, column model 0.881vw − 216.4px. NOTE: cqi auto-fit was tried first and also failed in the owner's browser — for hero titles use px+vw math ONLY (no rem, no cqi)
- [x] Touch-title rule extended to `:is(term, loc, rbf)`
- [x] build.mjs rbf title/desc synced (no-dash name, no revenue-share framing, locked pills)
- [x] Built + side-by-side QA vs term-loans at 360/480/560/660 (iframe grid) + full page 1030/1440: sections align, hero title one line at every px, one-liners hold, C6 4-up → 2×2, no overflow. Hero sub renders 3 lines at desktop (85 chars but longer words than term's 2-liner) — hero height is fixed by --th-minh so geometry is unaffected; owner to confirm visually.
- [ ] NOT YET COMMITTED (awaiting owner) — rides with the loc build + C4 width refinement, all still uncommitted
