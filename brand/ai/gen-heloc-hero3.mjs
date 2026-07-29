// HELOC hero round 3 (see brand/page-plans/heloc.md). Round 2 takes were bright and
// smiling but framed as FULL-BODY wide shots — the subjects' legs ran out at the band's
// bottom edge leaving flat green, and the title crossed their bodies.
// Round 3 matches the framing that works on the other service heroes (sba/term):
// WAIST-UP, subjects large, filling the frame top to bottom, positioned LEFT so the
// title column reads over background, with the right side open for the qualify form.
// Usage: node brand/ai/gen-heloc-hero3.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-heloc');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of real people taken by a professional photographer. Genuine warm smile showing real happiness, bright natural daylight, shallow depth of field, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

// Framing that matches the working service heroes: subjects WAIST-UP and LARGE so they
// fill the frame vertically (no empty ground at the bottom), grouped in the left half,
// right side open. Clear space above heads (RULE 9).
const HERO_STYLE = `Wide landscape composition, waist-up framing with the subjects LARGE in the frame and filling it from top to bottom so there is no empty ground along the bottom edge. Subjects grouped in the LEFT half, right side open and softly blurred. Clear space above their heads. Bright and airy exposure. ${STYLE}`;

const JOBS = [
  { name: 'heloc-hero-f', size: '1536x1024',
    prompt: `Waist-up candid photo of a happy couple in their 40s standing close together in front of their suburban home on a bright sunny day, both beaming genuine smiles at the camera, casual sweaters, the porch and green trees softly blurred behind them. ${HERO_STYLE}` },
  { name: 'heloc-hero-g', size: '1536x1024',
    prompt: `Waist-up candid photo of a cheerful homeowner in her 30s standing in front of her house on a bright morning, warm genuine smile toward the camera, arms relaxed, the front porch and lawn softly blurred behind her. ${HERO_STYLE}` },
  { name: 'heloc-hero-h', size: '1536x1024',
    prompt: `Waist-up candid photo of a smiling couple in their 40s standing shoulder to shoulder on the front walkway of their home in bright late morning light, both looking at the camera with easy natural smiles, the house facade softly blurred behind them. ${HERO_STYLE}` },
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
