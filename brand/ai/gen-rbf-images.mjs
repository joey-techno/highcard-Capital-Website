// AI photo generation for the Revenue Based Financing page (see brand/page-plans/revenue-financing.md).
// Usage: node brand/ai/gen-rbf-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-rbf');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of a real person taken by a professional photographer. Genuine warm smile, natural light, shallow depth of field, 50mm lens look, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

// Hero: wide, subject in the LEFT third with a darker warm interior behind them,
// right side open and softly blurred (page shows the top of the frame; white text
// sits over the left, qualify form over the right).
const HERO_STYLE = `Wide landscape composition, subject standing in the left third of the frame, background softly blurred, right two thirds open and uncluttered. ${STYLE}`;

const JOBS = [
  // Hero: boutique owner reviewing the day's sales on a tablet at the counter
  // (distinct scene from the loc hero, which is a boutique owner leaning w/ tablet).
  { name: 'rbf-hero-a', size: '1536x1024',
    prompt: `Candid photo of a smiling female boutique owner in her 40s standing at her shop counter reviewing the day's sales on a tablet, a small card reader and wrapped purchases on the counter, warm evening light, clothing racks softly blurred behind her. ${HERO_STYLE}` },
  { name: 'rbf-hero-b', size: '1536x1024',
    prompt: `Candid photo of a smiling male shop owner in his 30s at the counter of his design boutique looking up from a tablet showing the day's sales, warm pendant lighting, shelves of goods softly blurred behind him. ${HERO_STYLE}` },

  // Industry cards: portrait, subject in the upper two thirds so the bottom third
  // stays clean for the site's green fade + label.
  { name: 'rbf-ind-trucking-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling truck driver in his 40s holding a clipboard at a warehouse loading dock, semi trailer and dock doors softly blurred behind him, morning light, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'rbf-ind-trucking-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling female truck driver in her 30s with a clipboard standing at a loading dock beside her rig, trailer softly blurred behind her, golden hour light, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'rbf-ind-retail-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling shop owner in her 30s at her boutique counter ringing up a purchase for a customer, the customer softly blurred in the foreground edge, warm shop light, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'rbf-ind-retail-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling male store owner in his 40s handing a paper shopping bag across the counter to a customer, customer softly blurred, cozy shop interior, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'rbf-ind-farming-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling farmer in his 50s standing in a green crop field at golden hour with arms crossed, wearing a work shirt and cap, rows of crops softly blurred behind him, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'rbf-ind-farming-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling female farmer in her 30s standing in a crop field at golden hour with arms crossed, sun low behind the rows softly blurred, subject in the upper two thirds of the frame. ${STYLE}` },
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

for (const job of JOBS) {
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
