# Email Setup — What We Built & What's Left (Aug 6, 2026)

## What was made today

### 1. Profile pictures (Gmail avatars)
- **Picked & live:** letters-only wordmark on flat green (`brand/avatar/avatar-letters.png`), set on both **joet@** and **info@** via Admin Console.
- Backups in `brand/avatar/`: `avatar-flat.png` (card mark on green), `avatar-felt.png` (card mark on AI felt texture).
- Spec: 1024×1024 PNG, content kept inside the circle crop.

### 2. Two-tier spam-safe signature system
Research-backed (Litmus/Mailgun/Google): the old Capital Quickly signature's ~7 images (badges, icons) were the spam risk. New rules: 1 hosted image max, 2–4 links, clean table HTML, no badge strips.

- **Tier 1 — Joe's branded signature** (`signature-joey.html`): card mark left, gray divider, green **Joe Tawil**, "Senior Underwriter | High Card Capital", O: 732 444 8260 / E: joet@ / W: website. **INSTALLED in joet@ Gmail and working** (defaults set, saved).
- **Tier 1 — info@ signature** (`signature-info.html`): same layout, name line **High Card Capital**, subtitle **Business Funding Solutions**, E: info@.
- **Tier 2 — plain text for ALL email marketing / mass sends** (zero images, zero HTML):
  ```
  Joe Tawil
  Senior Underwriter
  High Card Capital
  732 444 8260
  www.highcardcapital.com
  ```

### 3. Logo image hosting
- `email-mark.png` added to the Lovable project (`public/assets/logo/`) and **published — confirmed live** at:
  `https://www.highcardcapital.com/assets/logo/email-mark.png`
- Copy also committed here at `site/assets/logo/email-mark.png` to keep repo in sync.

### 4. Domain authentication (owner-confirmed)
- SPF / DKIM / DMARC **live** on highcardcapital.com **and** the 3 email-marketing domains.

## ✅ TO-DO — changes still needed on the computer

1. **Install the info@ signature** (not done yet):
   - Sign into Gmail as **info@highcardcapital.com**.
   - Open `brand/signature/signature-info.html` in a browser → Ctrl+A → Ctrl+C.
   - Gmail ⚙️ → See all settings → General → Signature → **+ Create new** ("HCC Info") → paste.
   - **Set BOTH "Signature defaults" dropdowns** to HCC Info (the step that got missed last time).
   - Scroll to bottom → **Save Changes** → test with Compose.
2. **4th marketing domain:** when it's accepted into Workspace, set up SPF/DKIM/DMARC on it **before** sending anything from it.
3. **When marketing campaigns start:** use the Tier 2 plain-text signature only; platform must add physical business address + one-click unsubscribe (CAN-SPAM).
4. Optional: send a test email from joet@ to an outside address (e.g. personal Gmail) to confirm the signature renders and lands in the inbox, not spam.

## Files in this folder
| File | What it is |
|---|---|
| `signature-joey.html` | Joe's paste-ready Gmail signature (installed) |
| `signature-info.html` | info@ paste-ready signature (**needs installing**) |
| `sig-preview.html` | local preview of Joe's signature |
| `sig-options.html` | the A/B/C layout options page (kept for reference) |
| `email-mark.png` | the hosted logo source (76×120 display, retina) |
| `email-lockup.png` | horizontal lockup PNG (unused; kept for future) |
