# Apply page (apply.html) · build workbook

STATUS: REBUILT 2026-07-29 (owner directed) — page stripped to a thin felt hero + footer.
Old chooser / embed shell / what-happens-next sections REMOVED from the page source
(only in git history); their CSS (.apply-hero, .chooser, .choose, .flow, .embed-shell)
is orphaned in main.css (safe, .svc precedent). forms.js self-guards (returns when
#embedShell is absent) so it stays wired for the future form rebuild.

OWNER LOCKS (2026-07-29):
- Hero background: FELT GREEN (the page's original solid felt), no photo. fq-hero band
  reused for the thin geometry; body[data-page="apply"] hook kills the photo layers.
- Hero copy, exactly TWO LINES at every px (each line nowrap block):
  L1 "Apply to see the loans and the funding options"
  L2 "available for your business." — sage dot pick, break after "options" pick.
- Sentence grows/shrinks per-pixel across all widths.
- Everything between hero and footer deleted.

## Sizing (TRUE-EM probed 2026-07-29)

- L1 TRUE 2272.7 @100px · L2 TRUE 1355.3 @100px (Poppins 700, -.022em).
- Title font-size clamp(13.2px, 4.48px + 2.42vw, 40.9px): L1 spans ~300px @360
  -> ~900px @1450 (~79% of the 1144px container inner); cap engages ~1505px so the
  fluidity lock range (through ~1450) has no plateau. line-height 1.16.
- data-split NOT used (it would destroy the manual break) — data-reveal fade instead.
- New classes: .ap-hero__title + .ap-hero__l (block, nowrap).
- Band trim (owner 2026-07-29, top + bottom): apply hook overrides the shared fq-hero
  curve — min-height calc(nav + clamp(110px, 56px + 11vw, 220px)) (~1/3 shallower),
  pads calc(nav + clamp(16px, 1vw + 8px, 28px)) top / clamp(16px, 1vw + 8px, 28px)
  bottom (~40% off the pool pad). Fluid all 4 modes.
- Small burger + mobile round (owner 2026-07-29, <=700px block, revised same day):
  original band restored (min-height calc(nav + clamp(110px, 56px + 11vw, 220px)),
  bottom pad clamp(16px, 1vw + 8px, 28px)) with EXTRA top pad clamp(22px, 1.4vw + 11px,
  38px); title +17% = min(calc(5.24px + 2.83vw), calc(4.4vw - 1.76px)) — the second
  term is the fit guard (line 1 TRUE 2272.7 vs container pads), which also fixes a
  pre-existing hairline overflow below ~345px.

QA 2026-07-29: 1440 / 860 / 660 / 500 — 2 lines hold everywhere, no overflow.

## APX apply cards (owner locks 2026-07-29)

Reference: gold 2-card screenshot (restyled to brand — no gold, solid green buttons).
- LOCKED titles: "HELOC." / "Business Funding." (card 2 = all non-HELOC products).
- LOCKED bullets (round 3, 2026-07-29 — supersedes Draft A and the 5-product round):
  4 CHECKS PER CARD, NO SUBS. HELOC — The lowest rates · Up to 90% of your equity ·
  Revolving line · No appraisal needed. Business (owner picked from a 20-option chat
  list, own wording; 1st and 4th swapped same day) — One simple application ·
  Options in 24 hours · Flexible terms · Funding from $5K to $25M.
- LOCKED title scale (three rounds 2026-07-29: +18%/+10%, +20%, +20% — all modes):
  main site + big burger clamp(1.79rem, 7.82cqi, 2.89rem); small burger + mobile
  clamp(1.67rem, 7.28cqi, 2.69rem) in the <=700px block.
- LOCKED taller cards (owner 2026-07-29, main site + big burger ONLY — width stays):
  vertical pad up ~35% (clamp(26px, 9.5cqi, 68px)), bullets x1.18
  (clamp(0.99rem, 3.2cqi, 1.35rem)) with checks clamp(16px, 3.3cqi, 24px), list gap
  clamp(12px, 3cqi, 24px), title/list bottom margins clamp(18px, 4.6cqi, 38px);
  <=700px block restores ALL original density. Buttons = pool magnetic (data-magnetic,
  no arrow).
- LOCKED reference restyle (owner 2026-07-29, screenshot round): icon chip on top
  (existing homepage duotone tiles — HELOC card = icons/heloc.png, Business card =
  icons/term-loan.png, owner pick), centered title, thin sage divider under the title,
  then checks. Apply Now stays SOLID GREEN magnetic (offered outline like the
  reference; owner did not switch).
- LOCKED +25% spacing round (owner 2026-07-29, main site + big burger): checks gap
  x1.5 on desktop, deeper pre-button margin.
- LOCKED 2-ACROSS on small burger + mobile (owner 2026-07-29, supersedes the stacked
  flip AND the <=480 density block): cards sized off the homepage prod cards — the
  <=700px block uses the standing small-screen tokens + cqi shrink caps (title 8.8cqi
  / bullets 4.85cqi, TRUE-probed 893.4 / 1329.2) so nowrap lines fit to 320; buttons
  full width prod-recipe. Icon chips +20% round on desktop: clamp(48px, 10.8cqi, 77px).
- LOCKED empty state (owner 2026-07-29): `.apx-empty` solid-hairline card below the
  grid — application glyph + "Choose your application above." (owner picks: copy A,
  solid over dashed). forms.js hides #applyEmpty in loadForm (clicks AND ?product=
  deep links). Spec in the pool entry. GOTCHA fixed 2026-07-29: `.apx-empty`'s
  display:grid defeated the hidden attr — `.apx-empty[hidden] { display:none; }` is
  required for the box to disappear.
- LOCKED embed head (owner 2026-07-29): title "<Product> Application." (capital A) BIG
  clamp(1.7rem, 1.1rem + 2.8vw, 3rem) and CENTERED. Microcopy ("Encrypted end to
  end...") DELETED. Pending-box content DELETED down to a bare centered "jotform
  wiring" placeholder (warm launch fallback only in git history). Box height: owner
  first shortened, then +25% → min-height clamp(375px, 37.5vw + 200px, 600px); a live
  JotForm iframe still grows past it. Same shell serves BOTH forms (HELOC + Business).
- LOCKED viewport fill (owner 2026-07-29, cards must disappear at ALL px + heights):
  apply .embed-shell is a flex column with scroll-margin-top calc(nav + 10px) and
  min-height calc(100svh - nav - 20px); .embed-frame flex:1 stretches to the fill
  (clamp floor kept). scrollIntoView then shows ONLY title + box under the nav.
- LOCKED balance: short content CENTERS vertically in the shared row height
  (.apx-card__t margin-top auto pairs with the button's margin-top auto); buttons stay
  level on the shared bottom line. .apx-card__sub class deleted from CSS.
- LOCKED buttons: JotForm hookup with placeholder — solid green .btn <button
  data-product="heloc|business"> opens #embedShell below (embed-pending notice until
  the JotForm IDs land in forms.js).
- forms.js changes: selector '.choose' -> 'button[data-product]'; business/wc/
  equipment/rbf all map to the shared form (service-page deep links now resolve);
  shared-form title note only for term/loc.
- Dims: token-pool.md "POOL · APX APPLY CARDS". QA 1440/860/660/500 + deep-link
  apply.html?product=business shows the pending notice. 2 col >=701px / 1 col <=700px.
