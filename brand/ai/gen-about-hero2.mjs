// About hero round 2 (see brand/page-plans/about.md): owner wants a CLOSE-UP
// like the reference (face large in frame, smiling, headset), not a wide shot.
// Usage: node brand/ai/gen-about-hero2.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-about');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const PHOTO = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo taken by a professional photographer. Natural light, shallow depth of field, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

const JOBS = [
  { name: 'about-hero-c', size: '1536x1024',
    prompt: `Close-up of a friendly financial advisor wearing a headset, laughing warmly mid phone call, head and shoulders filling the left-center of the frame, hand touching the headset earpiece, a desktop monitor softly blurred on the right, bright office windows with daylight bokeh behind, genuine joyful smile, 85mm portrait look, clear space above the head. ${PHOTO}` },
  { name: 'about-hero-d', size: '1536x1024',
    prompt: `Close-up of a smiling financial advisor with glasses wearing a headset on a call, head and shoulders large in the center of the frame, tilted slightly toward a blurred monitor, warm daylight office with big windows softly blurred behind, relaxed genuine grin, 85mm portrait look, clear space above the head. ${PHOTO}` },
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
