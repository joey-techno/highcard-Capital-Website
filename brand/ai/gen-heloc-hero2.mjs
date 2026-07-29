// HELOC hero round 2 (see brand/page-plans/heloc.md): owner 2026-07-29 — the dusk
// kitchen shot reads too dark and the subject is not really smiling. New direction:
// clearly SMILING homeowner standing in front of their house, bright daylight.
// Usage: node brand/ai/gen-heloc-hero2.mjs
// RULE 9 (token-pool): generous clear space above the head; hero text sits LEFT,
// qualify form sits RIGHT, so keep the right two thirds open and softly blurred.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-heloc');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of real people taken by a professional photographer. Genuine warm smile showing real happiness, bright natural daylight, shallow depth of field, 50mm lens look, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

const HERO_STYLE = `Wide landscape composition, subject standing in the LEFT third of the frame with generous clear space above their head, the house softly blurred behind, right two thirds open and uncluttered. Bright and airy exposure, not dark. ${STYLE}`;

const JOBS = [
  { name: 'heloc-hero-c', size: '1536x1024',
    prompt: `Candid photo of a happy homeowner in her 30s standing on the front walkway of her suburban home on a bright sunny morning, arms relaxed, beaming genuine smile toward the camera, the front porch and green lawn softly blurred behind her. ${HERO_STYLE}` },
  { name: 'heloc-hero-d', size: '1536x1024',
    prompt: `Candid photo of a happy couple in their 40s standing together in front of their suburban house in bright late morning sunshine, both smiling warmly at the camera, relaxed casual clothes, the porch and trees softly blurred behind them, subjects grouped in the left third. ${HERO_STYLE}` },
  { name: 'heloc-hero-e', size: '1536x1024',
    prompt: `Candid photo of a cheerful homeowner in his 40s standing in his front yard in front of his house on a clear bright day, hands in pockets, big genuine smile toward the camera, the home's front door and porch softly blurred behind him. ${HERO_STYLE}` },
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
