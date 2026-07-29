# Page Plan · FAQ (rebuild)

Page file: `faq.html` · build id: `faq` (nav: faq)
Status: **BUILT + COMMITTED 2026-07-28 (8b8eba6) — 6 product groups' draft answers still open for owner review; full QA sweep pending**

Owner brief (2026-07-28): rebuild the FAQ page modeled on capitalquickly.com/faqs/ —
shallow photo hero with the title "Frequently Asked Questions", category headers over
SLIM dropdown (accordion) lists, then the shared "Let's get in touch" container.
Answers come from OUR home + services page info ONLY (sales-safe, nothing revealing,
no broker vibes, no dashes). Fluid per-pixel across all modes using the pool; new dims
added to the pool. Q&A locked question by question with the owner.

## Structure (locked)
Hero (fq-hero) → category sections (fq) starting with **General** → {{TOUCH}} partial
(no hero form on this page, so the partial's plain form ids are safe) → footer.
More categories can stack after General once locked (each `.fq` section; `.fq + .fq`
kills the doubled gap).

## Components (shared, in main.css after the page blocks)
- `.fq-hero` — shallow emerald band min-height clamp(170px, 96px + 16vw, 330px), pool
  section pad, photo via `--fq-hero-img` (page hook: body[data-page="faq"]) under a
  3-stop green wash (.46/.62/.86), background-position center 38%. Title cream Poppins
  700 centered nowrap, `min(2.43rem, 4.47vw)` — TRUE 1409.3 @100px (probed 2026-07-28),
  C3 screen fill.
- `.fq` — white section, pool pad; `.fq__in` max 980 + th-qa inner gutter recipe.
- `.fq__cat` — category title, racing, left, `min(2.43rem, 4.6vw)`.
- `.fq__list` — hairline box rgba(0,66,37,.14), pool radius clamp(10px,1.2vw,16px);
  rows divided by the same hairline.
- `.fq__q` — button row: pool th-qa question scale + row rhythm, sage hover tint,
  chevron (data-icon chevron-right) clamp(12px, 0.5vw + 9px, 17px) rotating 90° open.
- `.fq__a` — grid-rows 0fr→1fr spring .35s; answer text fine-print scale
  clamp(0.78rem, 0.7rem + 0.35vw, 0.95rem), left inset clamp(36px, 3.5vw + 17px, 63px)
  aligns under the question text.
- JS: `[data-faq-acc]` in main.js — one open per group (reference behavior), first
  item ships open (`is-open` + aria-expanded).

## Hero photo
Generated via brand/ai/gen-faq-images.mjs (2 takes): A = glass conference room team
meeting (closest to reference) · B = advisor + owner in open office. Owner picks via
brand/faq-photo-options.html; convert full-frame webp q82 → site/assets/img/faq-hero.webp.

## Question copy (owner review, question by question)
General (drafts v1, source: home + services copy):
1. How does funding with us work? → 2-min application, advisor prices options across
   the network ~24h, sign electronically, funds land.
2. I already have a loan or advance. Can you still help me? → usually yes; consolidate
   or fund alongside; advisor maps exits.
3. What do you look at besides my credit score? → business health (time in business,
   revenue, deposits); soft pull.
4. What does it cost to see my options? → free to apply/see/walk away; costs in
   writing before signing.
5. How much can my business qualify for? → $5K–$25M sized to revenue.
DECISIONS (owner 2026-07-28): Q1–Q4 locked as drafted (option A each). Q5 locked as the
softer credit note: "...A few of our strongest rates ask for solid credit, but plenty of
our products look at your revenue first..."

## Product categories (owner 2026-07-28: ALL 6, stacked below General)
Term Loans · SBA Loans · HELOC · Line of Credit · Equipment Financing · Revenue Based
Financing — 3 slim questions each, facts from the locked service pages (ledgers +
straight-answers), first question open per group. DRAFTS BUILT; owner review pending.

## Remaining
- [x] Hero photo: owner picked TAKE A (conference room) → faq-hero.webp full-frame q82,
      crop center 68% so the meeting shows under the title
- [x] General Q&A locked (5 questions)
- [x] All 6 product categories drafted on the page
- [x] build.mjs faq title/desc synced
- [x] Pool entries for fq-* dims in token-pool.md
- [ ] Owner reviews the 6 product groups' answers (live at localhost:8123/faq.html)
- [ ] QA sweep 360–1450 + commit
