# Container 5 · Straight Answers (4 questions)

Page: term-loans.html (template for all service pages)
Status: BUILT through 3 comb rounds (commits fec4f60, 8389ed5, 91c95ac, d2ab375,
cea24b3 on main; classes th-qa*). No dashes in copy.

---

## CURRENT DIMENSIONS after 3 comb rounds (NOT locked — these feed the shared
## token pool in brand/token-pool.md, which is the go-to for building the next containers)

Live CSS: main.css, CONTAINER 5 section. Rendered px shown at the 4 modes
(main 1440 / big burger 860 / small burger 660 / mobile 500; real phones below 430
get the extra tightening).

| Token | Value | 1440 / 860 / 660 / 500 px |
|---|---|---|
| Section padding, all 4 sides | block AND `.th-qa__in` inline: `clamp(28px, 1.6vw + 14px, 46px)` | 37 / 27.8 / 24.6 / 22 -> min 28 clamps: 37 / 28 / 28 / 28 |
| Head margin-bottom | `clamp(12px, 1.4vw, 22px)` | 20 / 12 / 12 / 12 |
| Eyebrow gap under | `8px` fixed | 8 |
| Title | `min(2.43rem, 3.8vw)` nowrap, `min(2.43rem, 4.6vw)` under 520 | 38.9 / 32.7 / 25 / 23 |
| Row padding-block | `clamp(12px, 1.8vw, 20px)`; 11px under 430 | 20 / 15.5 / 12 / 12 |
| Row column-gap | `clamp(12px, 1.8vw, 30px)`; 10px under 430 | 25.9 / 15.5 / 12 / 12 |
| Stacked Q to A row-gap | `clamp(5px, 0.9vw, 10px)` | n/a / n/a / 5.9 / 5 |
| Ghost numeral | `clamp(1.15rem, 0.7rem + 1.9vw, 2.1rem)`, Poppins 800 outlined 1.5px (1.2px under 430), `min-width:1.35em`, `align-self:center`, spans Q+A rows when stacked | 33.6 / 27.5 / 23.7 / 20.7 |
| Question | `clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem)` Poppins 600 racing | 17.4 / 16.5 / 15.6 / 14.8 |
| Answer | `clamp(0.72rem, 0.56rem + 0.68vw, 0.98rem)` Inter 400 slate lh 1.6 | 15.7 / 14.8 / 13.5 / 12.4 |
| Hairlines | inner `1px rgba(143,168,152,.35)`, bookends `.2` | 1 |
| Hover | row bg `rgba(143,168,152,.09)`, numeral fills sage-deep | |
| CTA margin-top | `clamp(14px, 2vw, 22px)` | 22 / 17.2 / 14 / 14 |
| Button font | `clamp(.64rem, .56rem + .4vw, .84rem)` | 13.4 / 12.5 / 11.6 / 10.2 |
| Button padding | `clamp(8px, .64vw + 4.8px, 13.6px)` x `clamp(14.4px, 1.6vw + 8px, 27.2px)` | 13.6x27.2 / 10.3x21.8 / 9x18.6 / 8x14.4 |
| Column | `.th-qa__in` max-width 980px inside shared `.container` | |
| Stack break | Q/A side by side above 700px, stacked at and below; numeral spans both when stacked | |
| Markup pattern | section.th-qa > .container > .th-qa__in > (head data-reveal, list data-stagger > 4x row data-reveal, cta data-reveal > a.btn) | |

**OWNER PICK 2026-07-24: THIN LEDGER (direction C, thin variant).** The Dealt Hand
concept below is kept for reference only, NOT being built. Ledger spec follows in
the "Thin Ledger" section.

---

## Thin Ledger (CHOSEN)

Four compact full-width rows stacked like ledger lines, centered column, on `--mist`.
Each row: ghost numeral at left, question, answer. Thin = tight row padding, hairline
separators, no heavy card chrome. Desktop: question and answer side by side inside
the row (question ~38%, answer ~62%). Small burger and mobile: answer wraps under
question, numeral stays left. Hover (desktop): restrained single effect per
iteration, chosen from the research addendum.

### Ledger token map (round 3 values, 2026-07-24: owner asked for centered smaller
### numerals and a thinner more compact ledger + container)
| Element | Token | Same as |
|---|---|---|
| Section bg + padding | `--mist`, `padding-block:clamp(28px, 1.6vw + 14px, 46px)` | tightened round 3 |
| Inner inline padding | `.th-qa__in` `padding-inline:clamp(28px, 1.6vw + 14px, 46px)` (same token as padding-block, owner wanted all 4 sides matched; adds to the shared .container gutter) | round 3 |
| Head (eyebrow/title) | identical recipe to C3/C4, title `min(2.43rem, ~3.8vw)`; head margin-bottom `clamp(12px, 1.4vw, 22px)`, eyebrow gap 8px | C3/C4 head, tightened |
| Column max-width | 980px (`.container--tight` value) inside shared `.container` | existing token |
| Row padding-block | `clamp(12px, 1.8vw, 20px)` (11px at <=430) | tightened round 3 |
| Row internal column gap | `clamp(12px, 1.8vw, 30px)` (10px at <=430) | tightened round 3 |
| Question | `clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem)`, Poppins 600, `--racing` | C3 subtitle token |
| Answer | `clamp(0.72rem, 0.56rem + 0.68vw, 0.98rem)`, Inter 400, `--slate`, lh 1.6 | C4 checklist token |
| Q to A gap when stacked | `clamp(5px, 0.9vw, 10px)` | tightened round 3 |
| Ghost numeral | outlined Poppins 800, `clamp(1.15rem, 0.7rem + 1.9vw, 2.1rem)` (steeper shrink per break), `align-self:center`, spans Q+A rows when stacked (`grid-row:1 / span 2`), `min-width:1.35em` | round 3 |
| CTA margin-top | `clamp(14px, 2vw, 22px)` | tightened round 3 |
| Hairline separators | 1px, sage at low alpha; lighter bookend rules | 1px border rule |
| Accent bar (iter 2, unused) | 3px `--racing`, expands on hover | new token |

### Breakpoints (site nav modes, from main.css media queries)
| Mode | Range | QA width (headless) |
|---|---|---|
| Main site | >920px | 1440 |
| Big burger | 701 to 920px | 860 |
| Small burger | 521 to 700px | 660 |
| Mobile | <=520px | 500 (headless floor; real phones narrower, see viewport quirk) |
Other breaks that exist nearby: 640, 560, 520.

### 3 iterations to mock (artifact, owner picks one)
1. **Hairline** — rows split by 1px sage hairlines only, outlined numeral left,
   Q and A side by side. Hover: row tints sage at ~4%, numeral fills solid.
2. **Accent bar** — same rows plus a 3px emerald left bar that thickens on hover,
   content nudges right 4px. The classic ledger read.
3. **Thin card** — each row a slim white card, radius `clamp(12px, 1.6vw, 24px)`,
   hairline sage border, 2px hover lift with sibling dim (spotlight from research).

---

## Concept: "The Dealt Hand" (NOT CHOSEN, reference only)

Four white answer cards on a mist background, laid out 2x2 like cards dealt onto the table.
The right column sits slightly lower than the left (a subtle stagger), so the grid reads as
dealt cards instead of a boring FAQ box. Restrained, on brand, no casino kitsch.

- Background: `--mist` (page rhythm so far: white C3, felt C4, mist C5)
- Cards: `--white`, thin sage keyline across the top edge, soft shadow
- Each card: a large ghost numeral (01 to 04) in sage at low opacity, top right,
  behind the text. Question in racing green, answer in slate.
- Hover (desktop only): card lifts 4px, ghost numeral deepens, keyline brightens.
  Same restrained motion language as `.btn` (translateY + shadow).
- Head: centered eyebrow + one line title with sage dot, exactly like C3/C4.
- Below grid: one centered microcopy line that routes to the form
  ("Still wondering about your situation? The form above takes two minutes.")

### Layout sketch

```
              STRAIGHT ANSWERS                (eyebrow, sage-deep on mist)
     Straight answers, before you apply.      (one line title, racing + sage dot)

   +----------------------+   +----------------------+
   | 01        (ghost)    |   |                      |
   | What credit score    |   | 02                   |
   | do I need?           |   | How fast can I       |
   | We look at the whole |   | get funded?          |   <- right col offset down
   | business, not just...|   | Fast decisions...    |
   +----------------------+   |                      |
                              +----------------------+
   +----------------------+
   | 03                   |   +----------------------+
   | What do I need       |   | 04                   |
   | to apply?            |   | How much can         |
   | A short application..|   | I borrow?            |
   +----------------------+   | Funding scales...    |
                              +----------------------+

        Still wondering about your situation? ...
```

Mobile and small burger: same 2x2 grid shrunk fluidly (like the C4 photo, never stacks
to 1 column unless it truly breaks; if it must stack below ~380px, stagger turns off).
Decision at build time with the mock.

---

## Copy (final short versions, no dashes)

Eyebrow: `Straight answers`
Title: `Straight answers, before you apply.` (dot in sage)
  - ALT title if the repeat of the eyebrow feels off: `Know before you owe.`

| # | Question | Answer |
|---|----------|--------|
| 01 | What credit score do I need? | We look at the whole business, not just a score. Strong revenue can outweigh an imperfect credit history. |
| 02 | How fast can I get funded? | Decisions come back fast, and funding can land in your account in days, not weeks. |
| 03 | What do I need to apply? | A short application and a few recent bank statements. No mountains of paperwork, just the basics to start. |
| 04 | How much can I borrow? | Funding scales with your business. We lay out what you qualify for before you commit to anything. |

Closing element (ROUND 2, owner call 2026-07-24): the microcopy line is DELETED.
Replaced by a centered `More FAQs` button linking to `faq.html` (`.th-qa__cta`),
standard `.btn` style with its own wider fluid range so it visibly steps down at
every break, smallest on mobile:
- font `clamp(.64rem, .56rem + .4vw, .84rem)`
- padding `clamp(8px, .64vw + 4.8px, 13.6px)` by `clamp(14.4px, 1.6vw + 8px, 27.2px)`
- (round 3 tweak: all three values scaled by 0.8, owner wanted the button 20% smaller at every break)
The hero form anchor id `qualify-form` stays (harmless, other links may use it).

---

## Token map (locked values reused from C3/C4)

Source of truth for these numbers: main.css 2200 to 2238 (C3 `.th-intro`, C4 `.th-why`)
plus shared `.eyebrow` / `.btn` / `.container`.

### Head (identical recipe to C3/C4)
| Element | Token | Same as |
|---|---|---|
| Eyebrow | `clamp(.66rem, .63rem + .12vw, .74rem)`, Poppins 700, .3em tracking, uppercase | shared `.eyebrow` |
| Eyebrow color | `--sage-deep` (light bg) | C3 side of the system |
| Title | `min(2.43rem, Xvw)` where X is tuned so THIS headline stays one line (C3 used 3.96, C4 used 3.69; this title is between them, expect ~3.8) | C3/C4 title recipe |
| Title style | Poppins 700, `-.022em`, `line-height:1.05`, `white-space:nowrap`, `--racing`, `.dot` in `--sage` | C3 title |
| Eyebrow to title gap | `margin-bottom:12px` | C4 head |
| Title to grid gap | `clamp(18px, 1.9vw, 34px)` | C3 title to sub gap |

### Grid
| Element | Token | Same as |
|---|---|---|
| Grid columns | `minmax(0,max-content) minmax(0,max-content)`, `justify-content:center` | C4 `.th-why__in` |
| Column gap | `clamp(14px, 2.2vw, 64px)` | C4 column gap |
| Row gap | `clamp(16px, 2vw, 26px)` | C4 row gap |
| Card width | `clamp(150px, 40vw, 560px)` per card, full form scaling | C4 photo width recipe |
| Stagger offset | right column `translateY(clamp(10px, 1.4vw, 18px))` | C4 list gap token reused |

### Cards
| Element | Token | Same as |
|---|---|---|
| Card radius | `clamp(12px, 1.6vw, 24px)` | C4 photo card |
| Card padding | `clamp(18px, 2.6vw, 30px)` | C4 list to button gap token reused |
| Card border | `1px solid` sage at low alpha (light bg flip of C4 card border) | C4 card border idea |
| Card shadow | soft, pulled from C4 card shadow but lighter for light bg | C4 card shadow idea |
| Question text | `clamp(0.89rem, 0.78rem + 0.47vw, 1.09rem)`, Poppins 600, `--racing` | C3 subtitle token |
| Answer text | `clamp(0.72rem, 0.56rem + 0.68vw, 0.98rem)`, Inter 400, `--slate`, `line-height:1.6` | C4 checklist token |
| Question to answer gap | `clamp(8px, 1.2vw, 14px)` | C4 icon gap token reused |
| Ghost numeral | fluid, roughly 3x question size, `--sage` at ~.14 alpha, Poppins 800 | new (only new token in the container) |

### Section spacing
| Element | Token | Same as |
|---|---|---|
| Section padding | `padding-block:clamp(40px, 2vw + 22px, 62px)` overriding the global 148px | C4 section padding |
| Seam into C4 above | small or zero pull; C4 has no bottom reserve. Tune with the mock. | per seam rule |
| Closing microcopy | eyebrow size token, Inter 500, `--slate`, centered, `margin-top: clamp(18px, 2.6vw, 30px)` | shared tokens |

### Container
`max-width:1240px`, `padding-inline:clamp(20px, 5vw, 48px)` (shared `.container`).

---

## Build rules (do not skip)

1. Mock first in `site/_preview-term.html`, get approval, then edit real files
   (mobile preview workflow).
2. Edit `site-src/pages/term-loans.html` AND `site/term-loans.html` together,
   or back-port immediately. build.mjs clobbers site/ otherwise.
3. CSS goes in main.css under the TERM-LOANS section, classes `th-qa*`
   (`.th-qa, .th-qa__in, .th-qa__head, .th-qa__title, .th-qa__grid, .th-qa__card,
   .th-qa__num, .th-qa__q, .th-qa__a, .th-qa__note`).
4. Every value fluid: clamp() with spaces around + and -, or min(). No fixed px
   except 1px borders and the 12px eyebrow gap already locked.
5. clamp() slopes must be verified at 4 widths: mobile, small burger, big burger,
   main site. Headless QA per the viewport quirk (right edge crop is the harness,
   not the site).

---

## Research addendum (3 agent sweep, 2026-07-24)

Competitor finding: nearly all lenders/fintechs bury this in accordions; visible
numbered cards are a differentiator. OnDeck publishes hard cutoffs (625 FICO,
$100K rev, 1yr); our general copy is the friendly contrast on purpose.

Shortlist (owner to pick):
- **A. Dealt Hand, sharpened (recommended):** approved stagger concept plus
  (1) ghost numerals as OUTLINED digits via -webkit-text-stroke (solid fill
  fallback for Firefox), (2) hover spotlight: hovered card lifts, siblings dim
  (`.grid:hover .card:not(:hover) { opacity:.55 }`), desktop only,
  (3) top keyline warms sage to an emerald/sage gradient on hover,
  (4) staggered entrance via nth-child transition-delay on the existing
  data-reveal system. All broad-support CSS; respect prefers-reduced-motion.
- **B. Living Keyline:** flat grid, continuously drifting emerald/sage gradient
  border (background-position sweep, 6s) + inner glow. More alive, less
  restrained; steal the animated border as a hover-only state in A.
- **C. The Ledger:** 4 horizontal editorial strips, 3px emerald left bar expands
  on hover, inline ghost numeral. Most conservative, loses the dealt-cards moment.

---

## Round 4 · Stamp answers (owner picked option B "The Stamp", 2026-07-27)

Answers rewritten to 4 short LOCKED lines (owner override of no-dash / no-$ rules:
en dash + $ range in 04 are intentional) and turned into pills so the answer is the
standout of every row; question demoted to Poppins 500 slate. Row grid now
`max-content 1fr max-content` center-aligned, pill hugs the right edge; stacks under
the question at <=700px. Row 01 = solid racing pill with cream text (approval stamp,
carries the most weight). Exact tokens live in token-pool.md C5 entry. Alternatives
shown and rejected: A term-sheet value column, C headline answers; a 3-new-container
round (term sheet card / stat tile board / felt panel) was also shown and rejected,
owner returned to the ledger. QA'd 1440/860/660/500.

## Round 5 · Stamp revisions (owner, 2026-07-27, same day)

1. Solid green row 01 dropped: ALL pills tinted at rest, EVERY row's pill flips solid
   racing + cream on row hover (.25s transition). Row 01 keeps only its size/weight step.
2. Row 03 copy swapped: Q "What are the payment terms?" A "Weekly and Monthly"
   (replaced the what-do-I-need-to-apply row; --long wrapped-pill variant removed,
   every answer is a one-liner now).
3. Related same-round fix: C4 Get Started resized to the shared capstone button tokens.
QA'd 1440/500, v=mstampb2.
