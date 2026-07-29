# Token Pool · term-loans page

The working dimension pool for building MORE containers on this page (and later the
other service pages). Not locked: every new container draws from this pool first,
and anything we refine gets written back here. Source of rendered truth: main.css.

Modes: main site >920 · big burger 701 to 920 · small burger 521 to 700 · mobile <=520
(extra tightening <=430). QA widths: 1440 / 860 / 660 / 500 (headless floor 500,
artifact simulator can do 390).

---

## Background rhythm (so far)
white (C3 intro) -> felt (C4 why) -> mist (C5 ledger) -> cream footer.
Next container picks a bg that keeps alternating light/dark or light/light-shifted.

## Section frame
| Use | Token |
|---|---|
| Compact section padding (C5) | `clamp(28px, 1.6vw + 14px, 46px)` block, and same inline on the inner wrap when the container should be framed evenly on all 4 sides |
| Roomier section padding (C4) | `clamp(40px, 2vw + 22px, 62px)` |
| Global default (avoid, too big) | `--pad-sec` = clamp(84px, 7rem + 3vw, 148px), always override in `th-*` containers |
| Column widths | 1240px shared `.container` gutter clamp(20px, 5vw, 48px); tight column 980px inner wrap |

## Head recipe (identical across C3/C4/C5)
- Eyebrow: shared `.eyebrow` `clamp(.66rem, .63rem + .12vw, .74rem)`, centered variant adds `justify-content:center`; gap under 8px (tight) or 12px (roomy)
- Title: `min(2.43rem, Xvw)` nowrap one line; slope X per headline length: 3.96 (short, C3) / 3.8 (medium, C5) / 3.69 (long, C4); relax slope under 520 (C5 uses 4.6vw)
- Title style: Poppins 700, `-.022em`, lh 1.05, `.dot` in sage
- Head to content gap: `clamp(12px, 1.4vw, 22px)` (tight, C5) or `clamp(18px, 1.9vw, 34px)` (roomy, C3)

## Text tokens
| Role | Token |
|---|---|
| Primary body / question | `clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem)` Poppins 600 racing (or Inter for prose, slate) |
| Secondary body / answer / checklist | `clamp(0.72rem, 0.56rem + 0.68vw, 0.98rem)` Inter 400 slate lh 1.6 (Poppins 500 cream on felt) |
| Ghost numeral | `clamp(1.15rem, 0.7rem + 1.9vw, 2.1rem)` Poppins 800, outlined 1.5px sage .75 (1.2px <=430), `min-width:1.35em` (Poppins subset has NO tabular figures, digits drift without it), center against its content |

## Spacing scale (proven gaps)
| Use | Token |
|---|---|
| Row padding (thin rows) | `clamp(12px, 1.8vw, 20px)` (11px <=430) |
| Small column gap | `clamp(12px, 1.8vw, 30px)` (10px <=430) |
| Wide pair column gap (text vs photo, C4) | `clamp(14px, 2.2vw, 64px)` |
| List row gap | `clamp(10px, 1.4vw, 18px)` |
| Stacked label-to-body gap | `clamp(5px, 0.9vw, 10px)` |
| Icon-to-text gap | `clamp(8px, 1.2vw, 14px)` |
| CTA top margin | `clamp(14px, 2vw, 22px)` |

## Lines, cards, media
- Hairline: 1px `rgba(143,168,152,.35)`; bookends lighter `.2`
- Card radius: `clamp(12px, 1.6vw, 24px)`; dark-bg card border `rgba(245,240,225,.13)`, shadow `0 44px 90px -34px rgba(0,18,10,.85)`
- Fluid full-form image (C4 why photo): width `max(150px, min(40vw, 129px + 19.82vw, 194.6px + 13.18vw, 251.9px + 8.18vw, 359px))`, `height:auto`, never crop — segments derived from the copy column's fluid height (4 single-line checklist rows + gaps + btn) at 3:2, caps at 988/1154/1375px viewports, `40vw` governs <=~640. DEPENDS ON exactly 4 one-line `<li>` + a 3:2 photo (cloning contract).
- Hover language: bg tint `rgba(143,168,152,.09)` or translateY lift + soft shadow; transitions ~.25s; always reduced-motion safe

## Buttons
| Use | Token |
|---|---|
| Stock `.btn` | font `clamp(.9rem, .86rem + .2vw, 1rem)`, pad `clamp(11.5px, 1vw + 8px, 16px)` x `clamp(20px, 2.2vw + 14px, 30px)`, radius 12px |
| Small capstone (C5, stock x0.8) | font `clamp(.64rem, .56rem + .4vw, .84rem)`, pad `clamp(8px, .64vw + 4.8px, 13.6px)` x `clamp(14.4px, 1.6vw + 8px, 27.2px)` |
| On felt | `.btn--cream` |

## Structure and behavior patterns
- Markup shell: `section.th-* > .container > inner wrap (max-width + optional matched inline padding)`
- Reveals: head `data-reveal`, repeated items inside a `data-stagger` parent each `data-reveal`
- Stack break: side-by-side above 700px, stacked at and below; a rail element (numeral/icon) spans stacked rows via `grid-row:1 / span 2`
- One-line titles: nowrap + tuned vw slope, verify to 360px
- Anchor to hero form: `#qualify-form`

## Complete page inventory, container by container
Every dimension live on term-loans today (source: main.css TERM-LOANS section).

### C1 · Hero (`.th-hero .th-in .th-copy .th-title .th-sub .th-micro .th-form`)
- Layout vars: form col `--th-formw:clamp(202px, 22vw + 48px, 422px)`, gap `--th-gap:clamp(16px, 0.9rem + 1.9vw, 48px)`, min-height `--th-minh:clamp(300px, 5vw + 232px, 404px)`
- Fade: to top, felt rgba stops .97 / .90 at 12% / .58 at 30% / .22 at 48% / .10 at 68% / .06 top; photo `center 13%` cover
- Padding: top `calc(var(--nav-h) + clamp(8px, 1vw, 18px))`, bottom `clamp(16px, 1rem + 0.5vw, 32px)`; copy bottom `clamp(6px, 0.7vw, 16px)`
- Title `clamp(1.9rem, 0.79rem + 3.87vw, 4.4rem)` nowrap lh 1.0, gap under `clamp(10px, 0.5rem + 0.7vw, 20px)`
- Sub `clamp(0.9rem, 0.75rem + 0.63vw, 1.32rem)` lh 1.45, max-width `clamp(300px, 23vw + 77px, 458px)` (2 lines desktop), gap under `clamp(13px, 0.65rem + 0.9vw, 24px)`
- Micro `clamp(0.7rem, 0.6rem + 0.31vw, 0.9rem)`, icon `clamp(11px, 0.44rem + 0.48vw, 15px)`, gap `clamp(5px, 0.35rem + 0.22vw, 9px)`
- Form card: pad `clamp(15px, 0.5rem + 1.3vw, 28px)` sides / `clamp(11px, 0.5rem + 0.8vw, 19px)` bottom, `container-type:inline-size`; h3 `clamp(0.64rem, 5.4cqi, 1.32rem)` one line always, gap under `clamp(8px, 0.5rem + 0.4vw, 14px)`; form gap `clamp(9px, 0.4rem + 0.5vw, 13px)`; labels `clamp(0.6rem, 0.565rem + 0.2vw, 0.72rem)`; inputs `clamp(0.63rem, 0.57rem + 0.27vw, 0.82rem)` pad `clamp(5px, 0.28rem + 0.18vw, 7px)` x `clamp(9px, 0.49rem + 0.48vw, 13px)`; submit `clamp(0.65rem, 0.59rem + 0.29vw, 0.85rem)` pad `clamp(7px, 0.6vw + 4.8px, 10px)` x `clamp(14px, 1.5vw + 9.5px, 20px)`; note `clamp(0.55rem, 0.51rem + 0.17vw, 0.65rem)`

### C2 · Trust band (`.th-seam .th-trust`)
- Zero-height `.th-seam` + `transform:translateY(-50%)` straddle (NEVER negative margin); `width:fit-content` centered
- Pill: ink bg, border cream .10, radius `clamp(12px, 8px + 0.8vw, 20px)`, pad `clamp(13px, 0.5rem + 1vw, 24px)` x `clamp(20px, 0.9rem + 1.8vw, 44px)`, item gap `clamp(16px, 0.8rem + 1.8vw, 44px)`, shadow `0 30px 70px -28px rgba(0,18,10,.75)`
- Labels `clamp(0.6rem, 0.48rem + 0.28vw, 0.8rem)` .09em caps; name `clamp(0.98rem, 0.6rem + 1.05vw, 1.6rem)`; numbers `clamp(1.05rem, 0.62rem + 1.35vw, 1.9rem)` tabular; item/body gaps `clamp(5px, 0.25rem + 0.4vw, 11px)` / `10px`
- Stars: tiles `clamp(10px, 0.34rem + 0.58vw, 15px)` sq, gap `clamp(2px, 0.3vw, 5px)`, radius `clamp(2px, 0.2vw, 4px)`, Trustpilot green #00B67A, white inline SVG at 66%; divider 1px, min-height `clamp(34px, 3.4vw, 58px)`

### C3 · Intro (`.th-intro`, on --white via .th-next)
- Seam pulls: margin-top `clamp(-58px, calc(13px - 4.95vw), -2px)`, margin-bottom `clamp(-150px, calc(-11px - 4.95vw), 0px)`, padding-bottom `clamp(24px, 2vw, 40px)`
- Title `min(2.43rem, 3.96vw)` nowrap racing + sage dot, gap under `clamp(18px, 1.9vw, 34px)`; sub `clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem)` slate lh 1.6 max-width 620px

### C4 · Why (`.th-why`, felt)
- Seam: margin-top `clamp(-72px, calc(-4px - 6.3vw), -30px)`; padding-block `clamp(40px, 2vw + 22px, 62px)`; radial sage glow `56% 68% at 80% 24%` alpha .18; overflow hidden
- Grid: `minmax(0,max-content)` x2 centered, col gap `clamp(14px, 2.2vw, 64px)`, row gap `clamp(16px, 2vw, 26px)`; eyebrow gap 12px
- Title `min(2.43rem, 3.69vw)` cream nowrap; list gap `clamp(10px, 1.4vw, 18px)`, list to btn `clamp(18px, 2.6vw, 30px)`; items `clamp(0.72rem, 0.56rem + 0.68vw, 0.98rem)` Poppins 500 cream; check icons `clamp(14px, 2.34vw, 20.7px)` sage, gap `clamp(8px, 1.2vw, 14px)`
- Photo `clamp(150px, 40vw, 560px)` full form; card radius `clamp(12px, 1.6vw, 24px)`, border cream .13, shadow `0 44px 90px -34px rgba(0,18,10,.85)`; btn--cream
- Get Started btn sized to the shared capstone tokens (owner 2026-07-27, "match the
  other containers"): `.th-why .btn` font `clamp(.64rem, .56rem + .4vw, .84rem)`, pad
  `clamp(8px, .64vw + 4.8px, 13.6px)` x `clamp(14.4px, 1.6vw + 8px, 27.2px)` (same as
  C5 More FAQs / C6 View all Industries); stays `.btn--cream` on felt
- Photo swapped 2026-07-27 to `img-why-dashboard-2.webp` (owner picked a more realistic shot):
  Pexels 7108075 (laptop w/ green trading dashboard, green+peach+tan tones), free commercial no
  attribution, 1200x800 3:2 WebP q82 ~85KB. Old `img-why-dashboard.webp` kept in /img (unused).
  CONVERSION PATH (repo has no image tool): `npx --yes sharp-cli -i src.jpg -o dir/ -f webp -q 82
  resize 1200 800 --fit cover` — sharp-cli fetched on demand via npx; source+target both 3:2 so
  no crop distortion. Reuse this for future image swaps.

### C5 · Straight answers ledger (`.th-qa`) — STAMP answers (owner picked option B, 2026-07-27)
- Section frame / head / spacing: unchanged, all in the tables above; per-round
  history in container-5-questions.md
- Copy LOCKED verbatim (owner deliberately overrode the no-dash and no-$ rules for
  these 4 answers, do not re-flag): 01 `Low Minimum FICO` · 02 `Funding in days, not
  weeks` · 03 Q `What are the payment terms?` A `Weekly and Monthly` (owner swap
  2026-07-27, replaced the what-to-apply row) · 04 `$20K – $10MM`
- Row grid: `max-content 1fr max-content`, `align-items:center` (was baseline +
  19em question column); question demoted to Poppins 500 `--slate` (size token kept)
- Answer pill (`.th-qa__a span`): Poppins 600 `--racing` on `rgba(0,66,37,.07)`,
  border `1px rgba(0,66,37,.13)`, radius 999px, tabular-nums,
  font `clamp(0.78rem, 0.661rem + 0.528vw, 1.14rem)`,
  pad `clamp(4px, 2.68px + 0.367vw, 8px)` x `clamp(11px, 8.03px + 0.826vw, 20px)`
  (slopes live to ~1450 per fluidity lock)
- Hover stamp (owner revision 2026-07-27, replaced the permanent solid row 01): ALL
  pills sit tinted by default; `.th-qa__row:hover .th-qa__a span` flips solid
  `--racing` + cream text, transition `.25s` on bg/border/color. Row 01 size/weight
  step REMOVED (owner 2026-07-28, heloc session): every row now uses the same pill
  weight and clamp — the first-child rule was deleted from main.css.
- `<=700`: pill drops under the question, `justify-self:start`, numeral spans both rows
  (the `--long` wrapped-pill variant was removed with the 03 copy swap, all answers
  are one-liners now)
- QA'd headless 1440 / 860 / 660 / 500 on 2026-07-27; headless tip: msedge needs a
  scratch `--user-data-dir` and window height <=~4200 or it silently writes nothing

### C6 · Industries we fund (`.th-ind`, on --white) — FULL POOL SCALE
(a 70% scale experiment was built then REVERTED 2026-07-25, owner: "too small,
doesn't fit the page well"; lesson: whole-container downscales below pool size
read as orphaned on the page)
- Section: compact padding-block token; standard head recipe, title "Industries we back." (owner 2026-07-27, was "Some of the industries we fund.") `min(2.43rem, 4.6vw)` (`5.6vw` slope <=520) — steeper slopes because shorter headline
- Grid (photos x0.88 in main site + big burger, owner 2026-07-27): `repeat(4, minmax(0,1fr))` `width:88%` max-width 739px centered, gap `clamp(8.8px, 1.232vw, 15.84px)`; <=700px (x0.80 small burger + mobile): `repeat(2,...)` `width:80%` max-width 352px, gap `clamp(8px, 1.12vw, 14.4px)` (cards ~172px desktop)
- Cards: `aspect-ratio:4/5` (>700px); `1/1` square <=700px (owner 2026-07-27, 4/5 read too tall in 2-col), radius `clamp(12px, 1.6vw, 24px)` (pool card radius), hairline border sage .35, emerald scrim `linear-gradient(to top, rgba(0,51,29,.92), rgba(0,51,29,.5) 34%, transparent 66%)` (NEVER black), hover img `scale(1.08)` at .3s
- Labels (scale with photos): cream Poppins 600 `clamp(0.686rem, 0.598rem + 0.37vw, 0.862rem)`, bottom `clamp(7.92px, 1.144vw, 14.08px)`; <=700px `clamp(0.624rem, 0.544rem + 0.336vw, 0.784rem)`, bottom `clamp(7.2px, 1.04vw, 12.8px)`
- Button: standard capstone size; cta margin `clamp(14px, 2vw, 22px)`
- Photos: `img-ind-construction/retail/auto/medical.webp`, 560x700 (4:5), 14 to 52 KB, Pexels IDs 8961156 / 9994733 / 3807695 / 3881817, free commercial use no attribution; `loading="lazy"` + width/height attrs
- Background rhythm now: white C3 -> felt C4 -> mist C5 -> white C6 -> cream footer
- NOTE: "View all Industries" btn points at services.html until a real industries page exists

### C7 · Let's get in touch (`.sec-touch`, felt) — PORTED from home page (owner 2026-07-27)
- Shared global container (reused from index.html); renders on term-loans via global
  `.sec-touch`/`.touch`/`.touch__*` CSS. Rhythm stays legal: C6 white -> C7 felt (dark) -> footer cream.
- Reused verbatim EXCEPT: hero already owns `qualifyForm`/`qf-*` IDs, so the touch form's
  IDs are suffixed `-touch` (`qualifyForm-touch`, `qf-name-touch`, ...) to avoid duplicate-ID
  collisions + broken `<label for>`. Any future page with a hero qualify form must do the same.
- Title tuned to THIS page's recipe (was shared `sec-title` token, read foreign next to
  "Industries we back."): scoped `body[data-page="term"] .sec-touch .touch__title` ->
  `min(2.43rem, 4.5vw)` (`5.4vw` <=520), Poppins 700, nowrap, sage dot. Scope keeps home page
  on its original shared token. Lesson: ported containers inherit the SOURCE page's title
  system; re-scope to the target page's head recipe or the title reads orphaned.
- Band padding KEPT roomy (home value `clamp(48px, 3rem + 2vw, 92px)`, not the compact C5/C6
  token) — it's the closing CTA and wants weight before the footer.
- Layout NEVER stacks on term-loans (owner 2026-07-27): reach-us left + form right at all 4
  modes. Scoped `body[data-page="term"] .sec-touch .touch` overrides the global
  `@media(max-width:700px){.touch{grid-template-columns:1fr}}` (home page still stacks). Column
  gap dropped to a single fluid `clamp(10px, 0.5rem + 1.2vw, 40px)` so 2 cols stay usable down
  to ~360px. WATCH the form fields at <=430px — two columns is tight; if fields crush, next
  lever is a narrower reach-us col or smaller field padding, not re-stacking.
- Hero form note "Soft pull only..." DELETED from C1 hero (owner 2026-07-27); the touch form
  keeps its own note.
- ENTIRE container made container-fluid per the LOCKED RULE above (owner 2026-07-27): touch
  card + info column each get `container-type:inline-size`; h3 "See how much you qualify for."
  `clamp(0.9rem, 6cqi, 1.6rem)` nowrap one line; email/phone/hours values nowrap +
  `clamp(0.72rem, 5.2cqi, 1.075rem)` (removed the `overflow-wrap:anywhere` that broke the email
  mid-word); lede, labels, inputs, select, button, note, chips, icons all re-based on cqi.
  Scoped `body[data-page="term"]` so home page touch form keeps its vw sizing.
- Form still needs a real JotForm action wired (placeholder phone/email, same as other pages).
- HOURS ROW DELETED SITEWIDE (owner 2026-07-27): the clock-chip "Hours / Mon–Fri, 8am–7pm ET"
  li removed from the touch reach-us list on ALL pages (partial + 10 built pages) and the
  `footer__hours` calendar line removed from the footer on all 15 pages + partial. Reach-us
  is now phone + email only. (`touch__reach-v` CSS kept, harmless.) Nav drawer phone link
  still says "· Mon–Fri 8–7 ET" — owner has not asked for that one.
- Icon chips re-clamped steeper (owner 2026-07-27 "icons should shrink when px is lower";
  old floors froze them at 28.8px below ~666px): global
  `width/height:clamp(20px, 15.19px + 1.336vw, 34.56px)`, glyph `clamp(8.4px, 6.42px + .55vw, 14.4px)`,
  radius `clamp(5.5px, 3.51px + .552vw, 11.52px)`; term cqi scope floors lowered to
  `clamp(18px, 13cqi, 34.56px)` chip / `clamp(7.5px, 5.4cqi, 14.4px)` glyph.
- TOUCH TREATMENT NOW SITEWIDE (owner 2026-07-27 "I dont want any stack" + "not 1 line"):
  every `body[data-page="term"] .sec-touch` rule EXCEPT the two title rules was
  de-scoped to plain `.sec-touch`, and the global `@media(max-width:700px){.touch{1fr}}`
  stack rule was DELETED. All 10 pages with the touch container now run the never-stack
  2-col + container-fluid (cqi) treatment. Title recipe stays term-scoped (home keeps
  sec-title token).
- Crush fixed with floor drops + skinnier card frame (owner "make the border skinnier"):
  card padding now `clamp(10px, 4.06px + 1.65vw, 28px)` sides/top,
  `clamp(8px, 3.2px + 1.06vw, 18px)` bottom (was 19.2..35.2 / 12..22);
  card h3 `clamp(0.56rem, 5.4cqi, 1.6rem)` (hero slope, floor fits a ~150px card);
  reach values `clamp(0.46rem, 5cqi, 1.075rem)` (email fits the 360px info column).
  Measured via DOM probe at effective 360/390/430 + shots at 500/660: 2 cols, h3 one
  line, zero horizontal overflow.
- HEADLESS QA TRAP (learned 2026-07-27): Edge headless CANNOT render a viewport
  narrower than ~492px — a `--window-size=390` screenshot is a ~500px layout cropped
  to 390, which fakes overflow that does not exist on real phones. For sub-490 QA,
  constrain `<body style="width:390px">` in a scratch page and read metrics with a
  DOM probe + `--dump-dom` instead.

### C7b · Testimonials (`.th-tst`, on --mist) — Trustpilot stars (owner 2026-07-27)
(distinct from the C7 touch container above; sits ABOVE it. Page order is now
C6 industries -> testimonials -> get-in-touch.)
- Section: mist bg, compact padding-block `clamp(28px, 1.6vw + 14px, 46px)`; no eyebrow
  (matches C5/C6). Title "What our clients are saying." page recipe `min(2.43rem, 3.7vw)`
  (`4.6vw` <=520), nowrap, sage dot; head gap `clamp(18px, 1.9vw, 34px)`.
- Grid: `repeat(3, minmax(0,1fr))` max-width 1000px, gap `clamp(12px, 1.6vw, 26px)`;
  <=700px -> 1 col max-width 440px.
- Cards (container-fluid per LOCKED RULE): white bg, pool radius, hairline sage .35, soft
  shadow `0 24px 60px -34px rgba(0,18,10,.35)`, hover translateY(-4px)+deeper shadow.
  `container-type:inline-size`; internals cqi-based (quote `clamp(0.82rem, 4.3cqi, 1.02rem)`,
  name `4cqi`, biz-type sage-deep `3.4cqi`, star tiles `4.6cqi`).
- Stars: REUSE `.th-stars` (Trustpilot green #00B67A tiles, white SVG); CENTERED in card on
  all breaks (owner 2026-07-27; quote/name stay left-aligned).
- Reviews (owner 2026-07-27): DESKTOP + big burger show only 3 (Maria/Retail, Devon/Automotive,
  Priya/Medical) like the original grid; the 4th (James/Construction, class `th-tst__card--extra`)
  is CAROUSEL-ONLY — `display:none` >700px, `display:flex` in the <=700px carousel. All PLACEHOLDER.
- INFINITE CAROUSEL <=700px (owner 2026-07-27, revised from finite+dots): 3-up grid on >700px;
  small burger + mobile = never-ending 1-at-a-time slider with a neighbor card PEEKING on both
  sides at all times, NO DOTS. Markup: `.th-tst__viewport[data-carousel]` wraps `.th-tst__grid`
  (track) + `[data-carousel-prev/next]` arrows (arrows overlay the peeks, z-index 3).
  Geometry (CSS vars on viewport, all fluid): `--tst-card:74%` (13% peek each side),
  `--tst-gap:clamp(8px,2.4vw,16px)`, `--tst-slide:card+gap`, `--tst-peek:(100%-card)/2` (exact
  center offset). JS (main.js `[data-carousel]`): clones last card before first + first after
  last; track index space 0=cloneLast,1..n=reals,n+1=cloneFirst; `translateX(calc(-index*slide
  + peek))`; on landing a clone, `transitionend` snaps (transition:none + reflow flush via
  `void offsetWidth`) to the matching real card = seamless loop. Starts at interior index
  `min(2,n)` so it loads "in the middle" with both neighbors visible. AUTO-ADVANCE 5s, paused on
  hover/focus/touch, disabled under reduced-motion. `enter()/exit()` build/teardown clones on the
  700px boundary so desktop stays a clean grid. Prev chevron = `chevron-right` flipped scaleX(-1).
  Cards keep `container-type:inline-size` so cqi fluidity holds inside the slider. Site's first
  carousel pattern; reuse for any future never-ending slider.
- Starts at track index `min(2,n)` = 2nd real card (owner "start at card 2"), neighbors peek both sides.
- ARROW-LOCK FIX (owner 2026-07-27 "arrows don't work"): the `animating` guard could deadlock when a
  transition was cancelled (a `place(false)` clone-snap interrupts an in-flight slide → fires
  `transitioncancel`, NOT `transitionend`, so the lock never cleared). Fix: `settle()` handles BOTH
  `transitionend` + `transitioncancel` (guarded to `e.target===track`), reduced-motion path settles
  synchronously, plus a 900ms self-heal timeout releases a stuck lock. NOTE: fix is reasoned +
  asset-verified but NOT browser-tested here (no headless browser); owner must confirm arrows click.
- Copy is PLACEHOLDER (Maria R./Retail, Devon M./Automotive, Priya S./Medical) — owner to
  swap real quotes + names. Quotes intentionally echo existing claims (days not weeks,
  turned down elsewhere, no paperwork).
- Background rhythm now: white C3 -> felt C4 -> mist C5 -> white C6 -> mist testimonials -> felt touch -> cream footer.

## LOCKED RULE · Container-fluid (design-form fidelity), owner 2026-07-27
The hero form is the reference: every element grows/shrinks per-pixel so it always looks
like the designed form, and key text never wraps. Any container that must read "like the
designed form" (forms AND their whole surrounding container: titles, ledes, info blocks,
chips, icons, values) MUST follow this at ALL times:

1. **Size to the CONTAINER, not the viewport.** Put `container-type:inline-size` on the box
   whose width the content should track (the form card, the info column, the section wrap as
   needed), then size text/spacing in `cqi` (1cqi = 1% of that box's width). vw sizing breaks
   when the box width stops tracking the viewport (e.g. 2-col vs stacked), so cqi is required
   for anything that must stay one line or perfectly proportioned inside a column.
2. **One-line elements get `white-space:nowrap`** AND a cqi font so they shrink to fit instead
   of wrapping. Headers like "See how much you qualify for." and long values like the email
   `hello@highcardcapital.example` must never break. (Remove any `overflow-wrap:anywhere` on
   those — it's what causes mid-word breaks.)
3. **Every element is a two-ended clamp** — `clamp(min, Xcqi|Xvw, max)`, both ends bounded, no
   fixed px that only fits one width, no shared token that plateaus early. Scale BOTH terms.
4. **Scope page-specific fluidity** to `body[data-page="..."] .sec-*` so sibling pages that
   reuse the same global container keep their own tuning.
5. **QA the whole container at 360 / 500 / 660 / 860 / 1440 (and to ~1450px):** header one line,
   no mid-word breaks, no element plateaus, no horizontal overflow. If a nowrap value can't fit
   the narrowest column, shrink the cqi slope or narrow the column — never re-wrap it.
Applies to every new container from now on. See [[hcc-container-fluid-forms]].

## LOCKED RULE · Service page cloning (carbon copies), owner 2026-07-28
The 5 other service pages (equipment-financing, revenue-financing, sba-loans, heloc,
line-of-credit) become EXACT structural copies of term-loans — only wording and photos
differ. Sizing identity is guaranteed by SHARING, not copying:

1. Byte-copy `site-src/pages/term-loans.html`; swap content slots only (text, img
   src/alt). Never edit or duplicate the shared `th-*` CSS — every clamp, break
   (520/560/700), cqi query, and animation is one shared rule set.
2. Per-page CSS = ONE `body[data-page="<id>"]` block appended after the th-* section:
   hero photo vars + retuned title slopes ONLY. Slope method (same screen fill at every
   viewport): `Y_new = Y_ref × (width_ref / width_new)` at equal font size.
   Refs: C3 3.96vw · C4 3.69vw · C5 3.8vw · C6 4.6vw; ≤520 slopes = ×1.2.
3. Hero photo is CSS-side: `.th-hero` carries `--th-hero-img` / `--th-hero-pos`
   defaults (refactor once); page block overrides the two vars. Scrim written once.
4. Byte-identical on every page (zero input): trust band · testimonials ·
   "Let's get in touch" — keep the INLINE touch section with `-touch` form ids,
   NEVER `{{TOUCH}}` (duplicate ids vs hero form break forms.js). Extend the
   term-scoped touch-title rule to each new page id.
5. Text length budgets = same line counts = same heights: hero sub ~2 lines (~85
   chars), C4 checklist exactly 4 one-line items (photo-width formula depends on it),
   C5 questions one line + short pills, C6 labels one word-ish.
6. Photos: hero landscape graded dark like term-hero (identical scrim on top) ·
   C4 3:2 1200×800 · C6 cards 560×700. Owner decision 2026-07-28: C6 industries are
   PER-PAGE (relevant to each product); all new photos generated via OpenAI API.
7. Per-page content is planned FIRST in `brand/page-plans/<page>.md` (step-by-step
   workbook, owner locks every DECISION line) — no building until the workbook and
   photos are approved. One page per chat/session.
8. QA = side by side vs term-loans at 360/520/700/1030/1440 + sweep to 1450: heights
   match, breaks fire at the same px, one-liners hold, no horizontal overflow.
9. LOCKED · Hero headroom (owner 2026-07-28, rbf incident): the subject's head must be
   FULLY CLEAR at every viewport — never touching or cut by the hero's top edge.
   a) Generation prompts must ask for clear space above the head.
   b) Convert heroes FULL-FRAME (no cover-crop to a wider aspect — that's what clipped
      the rbf hero inside the file) and pin `--th-hero-pos` vertical to `0%` when the
      head sits high, so overflow always trims from the BOTTOM.
   c) If a picked take still lacks headroom in the file, OUTPAINT it (pattern:
      `brand/ai/extend-rbf-hero.mjs` — downscale ~85%, sharp-cli `extend` transparent
      top+right, OpenAI edits endpoint fills only the transparent bands), then convert
      the extended master full-frame.
   d) QA with a screenshot at desktop width AND confirm the crop math: vertical 0% =
      photo top edge always visible, so file headroom = on-screen headroom.
9b. LOCKED · Hero framing must be WAIST-UP (owner 2026-07-29, heloc round 2/3 incident):
   heroes are a SHALLOW wide band, so a full-body wide shot puts the subject's legs at
   the band's bottom edge — below them the photo runs out and the scrim reads as flat
   green, and the title lands across their body instead of over background. Generate
   heroes WAIST-UP with the subject LARGE enough to fill the frame top to bottom
   (match sba-hero / term-hero). Do NOT try to fix a wide shot with `background-size`
   zoom: zooming past `cover` lifts the photo's bottom edge INTO the band and makes the
   dead zone worse. `background-size` stays `cover` on every page — position tune only.
   Mirroring (sharp `flop`) is also not a fix: it moves the subject under the qualify
   form. Regenerate with correct framing instead.
10. LOCKED · Card framing (owner 2026-07-28): C6 industry-card people are horizontally
   CENTERED, waist-up, ≥6% headroom in the 560×700 file. Prompts say "subject
   horizontally centered, waist-up, generous clear space above the head". Converting
   from 1024×1536 sources: pick an explicit face-centered extract region, two-pass
   sharp-cli (`extract` → `resize 560 700 -f webp -q 82`), NEVER blind `--fit cover`.
   The shared ≤700px rule `object-position:center 20%` biases the square crop to
   protect heads — never remove it. QA both 4:5 and square crops before shipping.

## Process rules (every new container)
1. clamp() needs spaces around + and - or the rule silently drops.
2. Edit site/ AND back-port to site-src/pages/ (or build clobbers); verify with
   `mkdir -p /tmp/x && OUT=/tmp/x node site-src/build.mjs` + diff.
3. Bump `?v=` on the page after CSS changes.
4. QA at 1440 / 860 / 660 / 500; artifact simulator for 390.
5. No dashes in copy. Copy stays general, hype, routes to form or FAQ.
6. Iterate in comb rounds; write refined values BACK into this pool.

## POOL · th-ledger TABLE VARIANT (heloc, owner pick B 2026-07-28 — SITE STANDARD:
## sba converted to this same language 2026-07-28; stamp variant now unused but kept)
Full term-sheet rows inside the same .th-ledger shell (white strip under C3, same seam
pull + padding). Shared with the stamp variant: label scale clamp(8.5px, 4.5px + 0.55vw,
12.5px) → ≤700 clamp(8px, 6px + 0.5vw, 11px); value scale clamp(15px, 8.5px + 1.068vw,
24px) → ≤700 clamp(14px, 12.8px + 0.88vw, 20px). New dims:
- `.th-ledger__tbl` grid: 2 columns of label|value rows >700px (max-width 900,
  column-gap clamp(28px, 1.4vw + 18px, 64px)).
- `.th-ledger__row` >700px: flex space-between, gap clamp(10px, 1.4vw, 24px),
  padding-block clamp(10px, 0.5vw + 6px, 17px), hairline rgba(0,66,37,.14) bottom;
  top hairline on :nth-child(-n+2).
- ≤700px (owner pick B 2026-07-28, "too long" fix): OPEN 2×5 GRID — cells become
  label-over-value, centered (max-width 520, column-gap 0); center divider =
  border-right on :nth-child(odd); cell gap clamp(6px, 0.8vw + 3px, 10px),
  padding-block clamp(10px, 1.4vw + 5px, 16px), padding-inline clamp(4px, 1vw, 10px).
  Half the height of stacked rows; verified one-line at 360/480/660.
All labels + values one line at every px (verified 520/701/860/1030/1440).

## POOL · TH-CALC HELOC CALCULATOR (heloc, owner pick A clean paper 2026-07-28)
White section between C4 (emerald) and C5 (mist); pad = pool section pad clamp(28px,
1.6vw + 14px, 46px); inner max 980. Head = eyebrow ONLY (owner removed the title
2026-07-28; the .th-calc__title rule stays available). Sliders only (owner), JS in
main.js `[data-heloc-calc]`; scales $100K–$10M value / $0–$10M mortgage, step $50K,
defaults $1M / $100K (owner 2026-07-28).
- Fields grid: 2 cols max-width 680, gap clamp(16px, 1.2vw + 8px, 30px) ×
  clamp(20px, 2.4vw, 44px); stacks 1 col max-width 420 at ≤560 (pool break).
- Field labels + result label: th-ledger label scale (pool reuse), margin-bottom
  clamp(8px, 0.5vw + 5px, 14px).
- Range input: hit area clamp(18px, 1.4vw + 10px, 26px); track clamp(4px, 0.3vw + 2px,
  6px) rgba(0,66,37,.15); thumb clamp(14px, 0.6vw + 10px, 20px) racing.
- Live figures: clamp(13px, 8px + 0.8vw, 19px) Poppins 700 racing tabular.
- Big line figure: clamp(26px, 12px + 2.4vw, 52px).
- Split bar: max 680, height clamp(10px, 0.55vw + 7px, 16px), radius 999; mortgage
  segment #B9B2A2 (warm stone), available line racing, rail rgba(0,66,37,.12).
- Legend clamp(0.68rem, 0.6rem + 0.3vw, 0.82rem); swatch clamp(8px, 0.3vw + 6px, 11px).
- Disclaimer: ONE LINE every px (owner 2026-07-28) — nowrap, font-size
  min(clamp(0.594rem, 0.522rem + 0.27vw, 0.72rem), 1.65vw, 1.833vw − 0.733px);
  cap = original fine-print clamp ×0.9; fit slopes from sentence TRUE width
  5344.6 @100px Inter vs container gutter clamp(20px, 5vw, 48px)/side, 2% margin.
Reusable on any page needing an estimate tool; math: line = max(value × 0.9 − mortgage, 0).

## POOL · FQ FAQ COMPONENTS (faq rebuild, owner 2026-07-28, reference capitalquickly.com/faqs)
- `.fq-hero` shallow photo band: the fixed nav overlays the band top, so BOTH
  min-height and padding-top carry `var(--nav-h)` — min-height calc(var(--nav-h) +
  clamp(170px, 96px + 16vw, 330px)), padding-top calc(var(--nav-h) + pool pad),
  padding-bottom pool pad — title centers in the VISIBLE band (owner fix 2026-07-28).
  Photo via `--fq-hero-img` (page hook body[data-page="faq"]) under a 3-stop emerald
  wash (.46/.62/.86), position center 68% (meeting visible under title).
  Title cream centered nowrap `min(2.43rem, 4.47vw)` — TRUE 1409.3 @100px, C3 fill.
- `.fq` category section: white, pool pad; `.fq + .fq { padding-top:0 }` stacks groups
  tight. `.fq__in` = th-qa inner recipe (max 980). `.fq__cat` racing left
  `var(--t-section-title)` (owner 2026-07-28: same size as the get-in-touch title),
  margin-bottom pool head clamp(12px, 1.4vw, 22px).
- `.fq__list` hairline box rgba(0,66,37,.14) + pool radius clamp(10px, 1.2vw, 16px);
  rows split by the same hairline.
- `.fq__q` row: pool th-qa question scale clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem),
  padding clamp(12px, 1.8vw, 20px) x clamp(14px, 1.6vw + 8px, 28px), gap
  clamp(10px, 1.4vw, 18px), sage hover tint, racing when open. Chevron
  clamp(12px, 0.5vw + 9px, 17px) rotates 90° open.
- `.fq__a` grid-rows 0fr→1fr .35s spring; answer clamp(0.78rem, 0.7rem + 0.35vw,
  0.95rem), left inset clamp(36px, 3.5vw + 17px, 63px) aligns under question text.
- JS `[data-faq-acc]` in main.js: one open per group, first item ships open per group.

## POOL · AB ABOUT COMPONENTS (about rebuild, spec locked 2026-07-28, build pending)
Structure: fq-hero reuse → white intro → white value-cards section → th-tst
testimonials (mist) → touch (felt) → footer cream. Rhythm stays legal.
- Hero: `.fq-hero` byte-reuse; page hook `body[data-page="about"] .fq-hero
  { --fq-hero-img:url('../img/about-hero.webp'); }` (+ per-photo position). Title
  "About Us." = fq-hero title recipe `min(2.43rem, Xvw)` — X from TRUE-EM probe at
  build (short headline → steep slope, expect ~8vw range; relax ×1.2 ≤520).
- Intro (`.ab-intro`, white): pool compact section pad clamp(28px, 1.6vw + 14px, 46px);
  inner max 980 (th-qa recipe). Title "Where funding meets family." centered nowrap
  `min(2.43rem, Xvw)` X probed at build; sage dot; head gap clamp(18px, 1.9vw, 34px)
  (roomy). Sub = C3 sub token clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem) Inter slate
  lh 1.6, centered, max-width 720px (longer paragraph than C3's 620 — L1 copy runs
  ~3 lines desktop; both fluid ends live). CTA = pool `.th-qa__cta` + `.btn`
  capstone size, "View our services" → services.html.
- Value cards (`.ab-vals` section white · `.ab-card` cards, owner grid lock
  2026-07-28): grid `repeat(4, minmax(0,1fr))` max-width 1080 centered, gap
  clamp(12px, 1.6vw, 26px) (testimonial grid language); ≤700px `repeat(2,
  minmax(0,1fr))` 2×2, max-width 520 (ledger phone width), gap
  clamp(8px, 1.12vw, 14.4px). Equal heights per row by grid stretch.
- Card box: white bg, pool card radius clamp(12px, 1.6vw, 24px), hairline sage .35,
  soft shadow 0 24px 60px -34px rgba(0,18,10,.35), inner keyline (product-card
  ::before inset clamp(6px, 0.8cqi + 4px, 10px), border rgba(0,66,37,.10)), hover
  translateY(-4px) + deeper shadow .25s, reduced-motion safe.
- Icon pip revision (owner 2026-07-29): >=701px (main site + big burger only) the
  tile curve is scaled x1.10 — clamp(48.4px, 33cqi, 96.8px), radius
  clamp(9.9px, 6.05cqi, 19.8px); small burger + mobile keep the base curve.
- Card internals (container-fluid LOCKED RULE — `container-type:inline-size` on the
  card, everything cqi so 1×4 and 2×2 both track the CARD width):
  pad clamp(12px, 9cqi, 26px); icon tile clamp(28px, 17cqi, 48px) sq, radius
  clamp(6px, 3.5cqi, 12px) (baked cream #F5F0E1 tile, generated emblem, trimmed
  192px master like homepage icons); tile-to-title gap clamp(8px, 5cqi, 16px);
  title Poppins 700 racing + sage dot, ONE LINE nowrap shrink-to-fit
  clamp(0.792rem, 7.04cqi, 1.188rem) (owner 2026-07-29: x1.10 in ALL 4 modes;
  longest "Problem solving." governs the slope); title-to-body gap clamp(5px, 3cqi, 10px); body Inter slate
  lh 1.55 clamp(0.66rem, 4.6cqi, 0.92rem) (body copy wraps freely, no line lock).
- Reveals: section head data-reveal; grid data-stagger, each card data-reveal.
- QA at build: 360 / 500 / 660 / 860 / 1030 / 1440 + sweep to 1450 — 4-up one row,
  2×2 below 700, card titles one line at every px, no plateau, no overflow.

## POOL · SV SERVICES COMPONENTS (services landing rebuild, built 2026-07-29)

Page: services.html (id `services`). NOT a th-* clone — landing page like About/FAQ:
fq-hero reused (photo hook only), ab-intro reused (title retune in page hook),
`{{TOUCH}}` partial kept. New CSS = one SV block (main.css, after the AB block) +
one `body[data-page="services"]` hook. Workbook: brand/page-plans/services.md.

- Hero: fq-hero verbatim; hook sets --fq-hero-img:services-hero.webp (generated
  advisor-team take B), --fq-hero-pos:center 30%. Title "Services." (TRUE 444.3
  @100px) reuses the shared fq-hero__title size UNTOUCHED — About Us. precedent
  (469.2): short hero titles do NOT get steep ratio slopes.
- Intro: ab-intro classes verbatim; "Find the right fit." (TRUE 793.4 @100px)
  retuned in the page hook: min(2.43rem, 7.93vw) = 3.96 x 1589.8/793.4.
- Card grid (`.sv-vals`/`.sv-vals__grid`): white bg, pool section pad, top 0 under
  the intro (ab-vals recipe); repeat(2, minmax(0,1fr)) max-width 1080, gap
  clamp(12px, 1.6vw, 26px); <=700px ONE column, max-width 520, gap
  clamp(8px, 1.12vw, 14.4px). Owner grid lock 2026-07-29: 2 cols main site + big
  burger, 1 col small burger + mobile.
- Card (`.sv-card`, container-fluid cqi): AB card box language (radius
  clamp(12px,1.6vw,24px), sage hairline .35, shadow 0 24px 60px -34px, hover lift
  .25s, reduced-motion safe) + overflow:hidden so the photo clips inside the
  radius; flex column, `.sv-card__cta { margin-top:auto; display:flex;
  justify-content:center }` pins buttons level AND centers them (owner revision
  2026-07-29, reference match). Photo (owner revision 2026-07-29, slimmed):
  height:clamp(120px, 78cqi - 115px, 300px), object-fit cover — the cqi-minus-px
  slope makes the band proportionally FLATTER as the card narrows (527px card ~
  16:9, 330px card ~ 2.5:1) so mobile gets the photo extra small, per-pixel, no
  ratio steps; <=700px (small burger + mobile) the whole curve is scaled x0.90
  (owner 2026-07-29): clamp(108px, 70.2cqi - 103.5px, 270px); hover scale(1.08)
  .3s (C6 language), lazy + w/h attrs, 1200x800 webp q82 named svc-<id>.webp.
- Card internals (all cqi, card ~527px desktop / ~330-520 stacked): pad
  clamp(16px, 5.5cqi, 30px) / clamp(16px, 6cqi, 32px) (owner revision 2026-07-29,
  roomier reference match); title one line nowrap clamp(0.92rem, 4.2cqi, 1.32rem)
  (longest "Revenue Based Financing." verified); "Best for:" label
  clamp(0.7rem, 2.7cqi, 0.88rem); 3 check bullets (check-circle sprite
  clamp(12px, 2.8cqi, 16px)) one line each clamp(0.72rem, 2.9cqi, 0.95rem) lh 1.9,
  INK #141A16 + weight 500 (owner 2026-07-29: darker than slate); button = plain
  .btn SOLID GREEN (owner 2026-07-29, outline dropped) sized with the EXACT
  th-qa__cta (About us) vw curve at every viewport (owner 2026-07-29: Learn more
  = About us button size): clamp(.64rem, .56rem + .4vw, .84rem) /
  clamp(8px, .64vw + 4.8px, 13.6px) x clamp(14.4px, 1.6vw + 8px, 27.2px).
- >=701px (main site + big burger only, owner 2026-07-29 x1.10 round): card title
  clamp(1.012rem, 4.62cqi, 1.452rem); Best for clamp(0.77rem, 2.97cqi, 0.968rem);
  bullets clamp(0.792rem, 3.19cqi, 1.045rem); check icon
  clamp(13.2px, 3.08cqi, 17.6px). Small burger + mobile keep the base curves.
- Copy rule (owner 2026-07-29): every Best-for bullet UNIQUE across the whole
  grid — no line repeats on two cards; 3 bullets per card keeps row heights equal.
- Under the grid (owner revisions 2026-07-29, two rounds): the Talk-to-us capstone
  button was removed; a testimonials band was tried and REJECTED ("No i meant");
  final: the ab-vals "What we believe in." section (4 belief cards byte-identical
  to About) sits between the cards and the touch band, on the TST MIST color with
  the pool section pad restored via the page hook (`body[data-page="services"]
  .ab-vals { background:var(--mist); padding-top:pool }` — About keeps white bg +
  top 0 under its intro), plus a centered solid .btn "About us" -> about.html
  inside the section (th-qa__cta) — the reciprocal of About's View-our-services.
- Card photos are FREE STOCK (Pexels license, commercial ok, no attribution);
  sources logged in the workbook. Heroes stay GENERATED (RULE 9b framing).
- QA 2026-07-29: 1440 / 860 / 660 / 500 + tall 860 full-page — rows equal, buttons
  level, one-liners hold, col flip at 700, no overflow. NOTE: headless Edge
  sometimes races the data-split reveal at 1440 and shoots titles mid-animation
  (flaky, affects every fq-hero page) — rerun the shot before diagnosing CSS.
