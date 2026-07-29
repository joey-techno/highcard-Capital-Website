// Services landing page hero (see brand/page-plans/services.md, Step 1).
// Owner locked concept A 2026-07-29: advisor team at a bright desk, warm smiles.
// RULE 9b: WAIST-UP framing, subjects large, filling the frame top to bottom so the
// shallow hero band has no empty ground. Title is CENTERED on this page, so subjects
// sit slightly low/left with clear headroom and the middle reading calm.
// Usage: node brand/ai/gen-services-hero.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-services');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of real people taken by a professional photographer. Genuine warm smiles showing real happiness, bright natural daylight, shallow depth of field, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

const HERO_STYLE = `Wide landscape composition, waist-up framing with the subjects LARGE in the frame and filling it from top to bottom so there is no empty ground along the bottom edge. Clear space above their heads. Bright and airy exposure. ${STYLE}`;

const JOBS = [
  { name: 'services-hero-a', size: '1536x1024',
    prompt: `Waist-up candid photo of three financial advisors in smart casual clothes gathered around a bright desk in a modern office, mid-discussion over paperwork and a laptop, all with warm genuine smiles, big windows with soft daylight behind them. ${HERO_STYLE}` },
  { name: 'services-hero-b', size: '1536x1024',
    prompt: `Waist-up candid photo of two advisors, a man and a woman in their 30s, standing at a bright office desk reviewing documents together and smiling naturally, warm daylight from large windows, plants softly blurred in the background. ${HERO_STYLE}` },
  { name: 'services-hero-c', size: '1536x1024',
    prompt: `Waist-up candid photo of a small advisory team of three people laughing together during a relaxed meeting at a light wood desk, one holding a tablet, bright airy office with greenery softly blurred behind them. ${HERO_STYLE}` },
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
