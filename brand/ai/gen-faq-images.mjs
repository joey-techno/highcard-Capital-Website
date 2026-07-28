// AI photo generation for the FAQ page hero (see brand/page-plans/faq.md).
// Usage: node brand/ai/gen-faq-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
// Hero is a shallow full-width strip with a centered title over a green scrim —
// composition should read well as a wide horizontal band (middle of frame matters most).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-faq');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo taken by a professional photographer. Natural light, shallow depth of field, 50mm lens look, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

const JOBS = [
  { name: 'faq-hero-a', size: '1536x1024',
    prompt: `Wide shot through the glass wall of a modern conference room, a small team of business people in a relaxed meeting, softly blurred, big windows with daylight beyond, calm professional atmosphere, subjects small in frame and centered low so the upper half stays visually quiet. ${STYLE}` },
  { name: 'faq-hero-b', size: '1536x1024',
    prompt: `Wide shot of a bright open-plan office seen slightly from above, an advisor at a desk talking with a business owner, both softly blurred, warm wood and green plants, large windows, calm and unposed, subjects small in frame and centered low so the upper half stays visually quiet. ${STYLE}` },
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
