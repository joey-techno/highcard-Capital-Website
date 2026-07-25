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
- Fluid full-form image: width `clamp(150px, 40vw, 560px)`, `height:auto`, never crop
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

## Process rules (every new container)
1. clamp() needs spaces around + and - or the rule silently drops.
2. Edit site/ AND back-port to site-src/pages/ (or build clobbers); verify with
   `mkdir -p /tmp/x && OUT=/tmp/x node site-src/build.mjs` + diff.
3. Bump `?v=` on the page after CSS changes.
4. QA at 1440 / 860 / 660 / 500; artifact simulator for 390.
5. No dashes in copy. Copy stays general, hype, routes to form or FAQ.
6. Iterate in comb rounds; write refined values BACK into this pool.
