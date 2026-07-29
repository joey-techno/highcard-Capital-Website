# Industries page (industries.html) · build workbook

STATUS: PHASE 1 IN BUILD 2026-07-29 — hero + intro only (owner: same hero/intro layout
as services, build that first). Industry cards/content = PHASE 2, not yet designed.
Page id: `industries`, nav key `industries`. Landing page like Services/About/FAQ:
shared fq-hero + ab-intro reused, `{{TOUCH}}` closes the page. New CSS = one
`body[data-page="industries"]` hook only (no new component yet).

OWNER LOCKS (2026-07-29):
- Nav spot: AFTER Services — Home · Services · Industries · About us · FAQ · Blog
  (desktop + mobile; footer Company column gets an Industries link too).
- Hero photo concept: TRADES COLLAGE SCENE — one wide scene suggesting several trades
  (contractor's truck outside a restaurant/shop street, tools and crates, warm morning
  light, NO faces). Generated (OpenAI), not stock. Centered title must read clean.
- Intro title: "Your industry, our specialty."
- Intro sub: "From the kitchen to the job site, we have funded businesses like yours
  for years. Find your industry below and see how we can help."

## Structure

C1 `.fq-hero` (reuse) — generated photo, centered "Industries." title, slim band.
C2 `.ab-intro` (reuse) — centered title + sub, no button.
C3 `.in-*` NEW (phase 2) — 10 industry cards, one per category, stacked 1 col:
   photo LEFT (main site + big burger >=701px) / photo TOP (small burger + mobile
   <=700px), title + two column bullet list of sub industries, closing bold bullet.
C4 centered View our services button -> services.html (About us button size).
C5 `.th-tst` testimonials (byte-identical shared, owner added 2026-07-29) on the mist band.
C6 `{{TOUCH}}` — unchanged.

PHASE 2 OWNER LOCKS (2026-07-29):
- Categories: 10 — Transportation + Automotive MERGED, gas station repeats deduped.
- No extra section head; cards run straight under the existing intro (services pattern).
- Every card list ends with a BOLD closing bullet: "And every specialty in between".
- Below the cards: one centered View our services button (solid green).
- Card photos: FREE STOCK (Pexels class license), owner picks each from a picker page.
- Reference: capitalquickly.com/industries (scanned 2026-07-29; their 11 categories,
  bullet dedupe + our voice applied). No dashes in copy; "Self storage" written open.

## Phase 2 · Card copy (round 1 drafts, owner to approve)

Every bullet UNIQUE across the whole grid (services rule). Titles + lists:

| # | Card | Sub industries (round 1 draft) |
|---|---|---|
| 1 | Construction | Architecture firms · Concrete services · General contractors · Electricians · HVAC · Landscapers · Lumber yards · Masonry · Painters · Plumbers · Roofers · Specialty tradespeople · Gardeners |
| 2 | Retail | Clothing stores · Convenience stores · Dry cleaners · Fitness centers · Florists · Furniture stores · Grocery stores · Hardware stores · Hospitality · Jewelry stores · Salons and spas · Self storage · Specialty stores · Real estate agencies |
| 3 | Transportation & Automotive | Commercial trucking · Ambulance services · Car and limo services · Moving services · Truck stops · Gas stations · Auto repair shops · Car washes · Service centers · Used car dealers |
| 4 | Medical | Chiropractors · Dental practices · Dermatologists · General practitioners · Healthcare facilities · Home health agencies · Medical laboratories · Nutritionists and dietitians · Optometrists · Pharmacies · Podiatrists · Psychiatrists · Senior care · Urgent care centers · Veterinarians |
| 5 | Food Services | Bakeries · Cafes and coffee shops · Casual dining · Caterers · Fast food · Fine dining · Food trucks · Juice bars · Restaurants · Restaurant franchises |
| 6 | Business Services | Accounting firms · Cleaning services · Insurance agencies · IT service companies · Marketing agencies · Staffing agencies · Warehousing |
| 7 | Manufacturing, Wholesale & Distribution | Apparel · Electronics · Food products · Industrial products · Medical products · Metal manufacturers · Textiles · Wood and paper products · Durable goods · Jewelry and precious stones · Transportation equipment |
| 8 | Law Firms | Business law · Family law · Immigration law · Personal injury law · Real estate law |
| 9 | Education & Child Care | After school programs · Day care centers · Early education centers · Specialized care centers |
| 10 | Farming | Agriculturalists · Cattle ranchers · Dairy farms · Poultry farms · Vegetable farms |

Notes vs Capital Quickly: Beauty/Nail Salons + Salons and Spas collapsed to "Salons and
spas"; Fuel & Convenience collapsed into Convenience stores; Service stations dropped
for Service centers; Business Services gains Marketing + Staffing agencies for balance
(flag to owner); "Business-to-Business Services" retitled "Business Services";
"Educational" retitled "Education & Child Care".
- DECISION copy: (pending owner)

## Phase 2 · Card photos (free stock, 3:2-ish, owner picks)

Candidates downloaded to brand/stock/ind/, picker brand/industries-card-options.html.
All Pexels free license (commercial ok, no attribution). Vetted 2026-07-29; cut for
readable branding/names (helmet logo, CREW/MRW shirt, DAF, certificate name, DIVORCE
DECREE doc), cold/gloomy grading, clutter, one duplicate of svc-equipment (12982186),
one distressed hospital scene.

Surviving candidates (file | Pexels ID | subject):
- construction-1 | 8961030 | man + woman in hard hats reviewing plans on site
- construction-3 | 8961526 | two carpenters framing a wooden house, sunny
- retail-1 | 8386662 | two women browsing a bright clothing boutique
- retail-2 | 6205772 | shop owner with generic Open sign (NOTE: similar to svc-sba)
- transport-1 | 6870332 | mechanic with diagnostic tablet beside orange car
- medical-1 | 7579831 | doctor in warm consultation with patient
- medical-3 | 8376309 | smiling doctor with stethoscope at laptop
- food-2 | 2977515 | chefs plating filet onto white plates, bright kitchen
- food-3 | 8059268 | barista pouring latte art (NOTE: adjacent to svc-rbf cafe)
- b2b-1 | 7876755 | four professionals around laptops, bright office
- b2b-2 | 8171200 | woman leading a small team meeting, sunlit curtains
- b2b-3 | 7888680 | three colleagues, warm plant-filled office
- mfg-1 | 4487361 (per batch report) | warehouse crew with tablet under pallet racks
- mfg-3 | 4487383 | two workers walking a box down a warehouse aisle
- law-1 | 5668882 | brass scales + gavel on warm wooden desk
- edu-1 | 8500630 | bright empty classroom, warm sunlight
- edu-2 | 7304419 | colorful building blocks on white floor
- farm-3 | 9799044 | tractors harvesting peanuts, warm (NOTE: John Deere livery, weak)
Gap-fill round (vetted 2026-07-29, all pass):
- construction-4 | 10410009 | bricklayer silhouette against huge sunset sun
- retail-4 | 3965548 | boutique owner arranging garments, bright plant-filled shop
- transport-4 | 8994766 | white semi on scenic mountain highway, sunny, no maker text
- transport-5 | 14797990 | friendly trucker at the wheel, door open, bright
- food-4 | 5779787 | chef at restaurant grill with dramatic flame, warm glow
- law-4 | 8439654 | attorney-client consultation over documents, warm wood, no text
- law-5 | 7841813 | attorney at desk, red law books and flag behind
- farm-4 | 4975392 | smiling farmer holding basket of fresh vegetables, green field
- farm-5 | 1198507 | red barns across pasture, golden hour sunburst
- DECISION photos (owner 2026-07-29, positional picks): construction-1 (8961030) ·
  retail-4 (3965548) · transport-1 (6870332) · medical-1 (7579831) · food-2 (2977515) ·
  b2b-1 (7876755) · mfg-1 (4487361) · law-5 (7841813) · farm-3 (9799044).
  EDUCATION: edu-1/2 rejected as too big (portrait); landscape round edu-4 (8363569
  teacher + vowels chart), edu-5 (8612992 kids' craft hands), edu-6 (8363770 sunlit
  preschool room). DECISION: owner "do edu 3" = edu-6 LOCKED (2026-07-29).
  Installed as site/assets/img/ind-<slug>.webp, 1200x800 webp q82.
- OWNER (2026-07-29): all card photos must LOOK THE SAME SIZE — uniform photo pane
  (fixed 34% width + shared fluid card min-height sized to the tallest list) on
  desktop; shared fluid photo-band height (sv recipe) on <=700px.

## Phase 2 · Dims (pool draws; POOL entry on lock)

- Cards reuse the SV card language (radius, sage hairline .35, shadow, hover lift,
  container-type inline-size, cqi internals) — "use the current pool of all services
  page" (owner). NEW: split layout — photo pane LEFT (~34% width, full height,
  object-fit cover) >=701px; photo TOP (sv photo-band recipe) <=700px.
- List: CSS columns 2 (both modes; collapses to 1 on narrow mobile if needed),
  check/dot markers per owner pick at build time.
- OWNER (mid-build 2026-07-29): correct padding sizing and fluidity across ALL pxs —
  every dim a two-ended clamp or cqi, per-pixel through all 4 modes, MODES-OK per line.
- QA: 360 / 500 / 660 / 860 / 1440; side photo fills card height; no orphan columns.

## Step 1 · C1 Hero

- Markup: Services pattern, `<h1 class="fq-hero__title" data-split>Industries<span class="dot">.</span></h1>`.
- Title slope: "Industries." is a SHORT hero title → reuses shared fq-hero__title size
  untouched (About Us. 469.2 / Services. 444.3 precedent).
- Photo: brand/ai/gen-industries-hero.mjs — 3 takes of the locked collage concept,
  1536x1024 quality high, gpt-image-2 → gpt-image-1 fallback, 13s pacing, key from .env
  (never printed). Picker: brand/industries-hero-options.html (kept in repo).
- DECISION take: (pending owner pick from picker)

## Step 2 · C2 Intro

- DECISION title: LOCKED "Your industry, our specialty." (owner 2026-07-29, pick C).
- DECISION sub: locked with title pick (draft above); owner may tweak after sample.
- REWORD ROUND (owner 2026-07-29, layout unchanged): hero title → "Industries We
  Fund." (TRUE 971.3 @100px, shared fq-hero__title still untouched — fills ~43vw);
  intro → "We like a challenge." (TRUE 978.2 → retune min(2.43rem, 6.44vw)) + sub
  "We have yet to meet an industry we did not want to dig into. Browse the
  industries we have funded already, and if you do not see yours, get in touch and
  we will walk you through your options." Supersedes the original picks below.
- Original round: "Your industry, our specialty." 1382.7 @100px (4.55vw);
  "Industries." 522.3 (shared untouched, short-title precedent).

## Step 3 · build.mjs entry (after services)

- Title draft: `Industries We Fund · Funding Shaped to Your Trade | High Card Capital`
- Desc draft: Restaurants, construction, trucking, retail, medical, and more. Funding
  shaped to how your industry actually earns. One five minute application, no cost, no obligation.
- DECISION: drafts in until owner tweaks.

## Dims

Zero new dims phase 1 — hero band, title, intro all shared pool components. Page hook
carries only the photo vars + the probed intro-title retune.
QA: 1440 / 860 / 660 / 500; title one-liners hold; headless data-split flake → rerun.
