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

### C5 · Straight answers ledger (`.th-qa`)
- All current values live in the tables above (section frame, text tokens, spacing
  scale, buttons) and per-round history in container-5-questions.md

## Process rules (every new container)
1. clamp() needs spaces around + and - or the rule silently drops.
2. Edit site/ AND back-port to site-src/pages/ (or build clobbers); verify with
   `mkdir -p /tmp/x && OUT=/tmp/x node site-src/build.mjs` + diff.
3. Bump `?v=` on the page after CSS changes.
4. QA at 1440 / 860 / 660 / 500; artifact simulator for 390.
5. No dashes in copy. Copy stays general, hype, routes to form or FAQ.
6. Iterate in comb rounds; write refined values BACK into this pool.
