# Page Plan · About Us (rebuild)

Page file: `about.html` · build id: `about` (nav: about)
Status: **BUILT + COMMITTED 2026-07-28 (0733c1b) — hero take D, icons pip-sized;
QA'd 1440/860/660/500; FAQ product-group answers + carousel arrow confirmation
still open elsewhere**

Owner brief (2026-07-28): rebuild About Us modeled on capitalquickly.com/about-us/ —
simple page. Photo hero with "About Us" centered (FAQ-hero look), intro/story section,
then a "What we believe in" card row "but make it better", using the dim pool,
perfect on every px. Map everything first; build only after all slots lock.

## Structure (locked 2026-07-28)
1. Hero — reuse `.fq-hero` pool component (shallow emerald band, photo under 3-stop
   wash, --nav-h centering fix). New page hook var for the About photo. Title:
   **"About Us."** single big centered line (owner pick; no eyebrow, no subline).
2. Intro / story — white centered section. Title: **"Where funding meets family."**
   (owner pick 2026-07-28, replaced earlier "Built different on purpose."). Subtitle
   LOCKED (L1, longer professional version, NO broker angle): "Relationships come
   first here. Before we ever talk numbers, we take the time to understand your
   business, how it earns, what it needs, and where you want to take it. Then we
   walk you through every option in plain English, answer every question without
   the jargon, and stay at your side well beyond the day the funds arrive."
   + centered pool CTA button (`.th-qa__cta` + `.btn`) "View our services"
   → services.html.
3. What we believe in — 4 value cards LOCKED set + order: Problem solving ·
   In your corner · Long game · Speed with care. Style LOCKED: playing card
   (homepage product-card language: white card, soft radius, inner keyline, icon
   tile, hover lift; 4 across desktop, 2x2, 1 col phone). Card icons = OpenAI
   generated duotone emblems via the homepage icon pipeline (gpt-image-2 bakes
   cream tile #F5F0E1, trim/re-center via scratchpad/process_icons.py, 5 img/min
   rate limit). Card body copy LOCKED (owner 2026-07-28, picks 1A 2A 3C 4C):
   1. Problem solving. — "When something stands between you and funding, we do
      the homework and get creative until there is a path."
   2. In your corner. — "We push for the strongest terms your file can earn and
      tell you honestly when an offer is not worth taking."
   3. Long game. — "We measure success in years of working together, not in
      closed deals."
   4. Speed with care. — "Hours matter when opportunity knocks. We move fast
      and still read every line."
4. Testimonials — byte-identical shared `th-testimonials` band (same as service pages).
5. {{TOUCH}} partial (no hero form on this page, plain form ids safe) → footer.

## Old page
Current about.html (split hero "We come to the table prepared.", stat band, candor
felt block, credentials) gets fully replaced; old copy stays in git history. Salvage
raw material for values/intro: candor bullets (never pay to see options, costs in
writing before signing, data never sold, named advisor owns your file).

## Hero photo
Concept LOCKED (owner 2026-07-28): B, advisor on the phone (reference-style), warm
office light, quiet upper half for the wash + title. 2 takes generating via
brand/ai/gen-about-images.mjs (gpt-image-2 → 1 fallback, 1536x1024) into
brand/ai/photos-about/; owner picks; convert full-frame webp q82 per RULE 9 →
site/assets/img/about-hero.webp.

## Card icons
Glyph set LOCKED (owner 2026-07-28, Set 1): Problem solving = lightbulb over maze
path · In your corner = shield · Long game = chess knight · Speed with care =
stopwatch with steady hand. Same gen script; homepage tile style (solid racing
glyph on baked cream #F5F0E1); trim/re-center to 192px like the homepage icons
before install.

## Components
Reuse fq-hero (new `--fq-hero-img` hook under body[data-page="about"]), pool section
pads, th-qa__cta button, th-testimonials. NEW `.ab-intro` + `.ab-vals`/`.ab-card` —
FULL DIM SPEC LOCKED in token-pool.md "POOL · AB ABOUT COMPONENTS" (2026-07-28):
every dim pool-sourced; cards are container-fluid (cqi) per the LOCKED RULE.
GRID LOCKED (owner 2026-07-28): 1×4 main site + big burger (>700px), 2×2 small
burger + mobile (≤700px), fluid everywhere. Title slopes (hero "About Us.", intro
"Where funding meets family.", card titles) get TRUE-EM probed at build.

## Open decisions
- [x] Intro title + subtitle (locked: Where funding meets family. + L1)
- [x] Value set + card copy (locked: 1A 2A 3C 4C)
- [x] Card style (locked: playing card) + icon glyphs (locked: Set 1)
- [x] Hero photo concept (locked: B advisor on phone); wide takes a/b REJECTED
      (owner 2026-07-28: wants CLOSE-UP like the reference, face large in frame,
      smiling) — round 2 takes c/d generating via gen-about-hero2.mjs
- [x] 4 icons APPROVED as generated (owner 2026-07-28, plain shield accepted)
- [x] Owner picked hero TAKE D (glasses, centered smile) → about-hero.webp full-frame
      q82; hook crop --fq-hero-pos:center 32% (fq-hero position refactored to a var,
      default center 68% = faq crop)
- [x] build.mjs about title/desc refreshed (Where Funding Meets Family)
- [x] BUILT: site-src/pages/about.html + AB css block + icons installed
      (about-*.png 192px, trimmed/re-centered via scratchpad process_about_icons.py)
- [ ] Owner review in real browser → commit

## QA (after build)
Sweep 360–1450, all 4 modes; cards one-height per row; no horizontal overflow;
hero title centered in visible band (nav overlap accounted).
