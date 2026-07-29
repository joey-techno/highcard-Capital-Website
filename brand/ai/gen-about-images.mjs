// AI generation for the About page (see brand/page-plans/about.md).
// Usage: node brand/ai/gen-about-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
// 2 hero takes (advisor on the phone, shallow wide band under emerald wash) +
// 4 value-card icons (homepage tile style: solid racing-green glyph on cream #F5F0E1,
// gpt-image cannot do transparency so the tile color is baked in).
// Paced ~13s apart to stay under the org's 5 images/min limit.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-about');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const PHOTO = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo taken by a professional photographer. Natural light, shallow depth of field, 50mm lens look, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

const ICON = 'Flat vector icon, one clean solid glyph in deep racing green #004225 centered on a plain flat warm cream background #F5F0E1 that fills the entire square edge to edge. Minimal, geometric, confident line weight, generous even margins around the glyph. Absolutely flat: no gradients, no shadows, no outlines around the tile, no 3D, no texture, no text, no letters, no numbers.';

const JOBS = [
  { name: 'about-hero-a', size: '1536x1024',
    prompt: `Wide shot of a friendly financial advisor wearing a headset, smiling mid phone call at a warm wooden desk in a bright modern office, dual monitors softly blurred, large daylight windows behind, calm professional atmosphere, subject centered low in the frame so the upper half stays visually quiet. ${PHOTO}` },
  { name: 'about-hero-b', size: '1536x1024',
    prompt: `Wide shot of a financial advisor standing by a tall office window talking warmly on a mobile phone, late afternoon golden light, green plants and warm wood tones softly blurred, relaxed genuine smile, subject small in frame and centered low so the upper half stays visually quiet. ${PHOTO}` },
  { name: 'icon-problem-solving', size: '1024x1024',
    prompt: `A glowing lightbulb whose base sits above a simple square maze with one clear open path leading to it. ${ICON}` },
  { name: 'icon-in-your-corner', size: '1024x1024',
    prompt: `A classic heraldic shield, simple and solid. ${ICON}` },
  { name: 'icon-long-game', size: '1024x1024',
    prompt: `A chess knight piece in profile, simple and solid. ${ICON}` },
  { name: 'icon-speed-with-care', size: '1024x1024',
    prompt: `A stopwatch held steady by a simple open hand beneath it. ${ICON}` },
];

async function generate(model, prompt, size) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, size, quality: 'high', n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error(json.error?.message || res.statusText), { status: res.status, code: json.error?.code });
  return Buffer.from(json.data[0].b64_json, 'base64');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [i, job] of JOBS.entries()) {
  if (i > 0) await sleep(13000);
  let buf, used = 'gpt-image-2';
  try {
    buf = await generate('gpt-image-2', job.prompt, job.size);
  } catch (e) {
    if (e.status === 404 || /model/i.test(e.message)) {
      console.log(`gpt-image-2 unavailable (${e.message}); falling back to gpt-image-1 for ${job.name}`);
      used = 'gpt-image-1';
      buf = await generate('gpt-image-1', job.prompt, job.size);
    } else throw e;
  }
  const file = join(OUT, `${job.name}.png`);
  writeFileSync(file, buf);
  console.log(`saved ${file} (${used}, ${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
}
console.log('done');
