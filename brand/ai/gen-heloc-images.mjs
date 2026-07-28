// AI photo generation for the HELOC page (see brand/page-plans/heloc.md).
// Usage: node brand/ai/gen-heloc-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
// Only the hero is generated — C4 dashboard photo and all C6 card photos are reused.
// RULE 9 (token-pool): heads must have generous clear space above them in frame.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-heloc');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of real people taken by a professional photographer. Genuine warm expressions, natural light, shallow depth of field, 50mm lens look, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

// Hero: wide, subject in the LEFT third with the home interior behind them, right side
// open and softly blurred (white text sits over the left, qualify form over the right).
// Generous clear space above the head (RULE 9 — heads must never touch the top).
const HERO_STYLE = `Wide landscape composition, subject seated in the left third of the frame with generous clear space above their head, background softly blurred, right two thirds open and uncluttered. ${STYLE}`;

const JOBS = [
  // Hero: owner at their kitchen table at dusk, laptop open, warm home light
  { name: 'heloc-hero-a', size: '1536x1024',
    prompt: `Candid photo of a small business owner in his 40s seated at his warm kitchen table at dusk, laptop open in front of him, soft pendant light over the counter, evening blue light through the window behind, relaxed confident expression while he plans. ${HERO_STYLE}` },
  { name: 'heloc-hero-b', size: '1536x1024',
    prompt: `Candid photo of a small business owner in her 30s at her kitchen table in the evening, laptop open and a mug beside it, warm under-cabinet lighting in the softly blurred kitchen behind her, calm confident smile as she reviews her plans. ${HERO_STYLE}` },
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
