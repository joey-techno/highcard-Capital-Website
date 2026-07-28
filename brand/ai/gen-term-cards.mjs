// Regenerate Term Loans' Medical + Automotive industry cards with CENTERED subjects
// (owner 2026-07-28: people centered, no head cut off; see brand/page-plans/).
// Usage: node brand/ai/gen-term-cards.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-term-cards');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo of a real person taken by a professional photographer. Genuine warm smile, natural light, shallow depth of field, 50mm lens look, true-to-life skin texture with pores and natural imperfections, realistic hands, muted natural colors, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No text, no logos, no watermarks.';

// Card framing: vertical portrait, subject HORIZONTALLY CENTERED, waist-up, head in
// the upper third with clear space above the hair (bottom third stays clean for the
// site's green fade + label; mobile crops ~10% off top and bottom, so headroom matters).
const CARD_STYLE = `Vertical portrait, subject horizontally centered in the frame, framed waist-up with generous clear space above the head, subject in the upper two thirds of the frame. ${STYLE}`;

const JOBS = [
  { name: 'term-ind-medical-a', size: '1024x1536',
    prompt: `Smiling female doctor in her 30s wearing scrubs and a stethoscope, standing centered in a bright modern clinic hallway with arms crossed, equipment softly blurred behind her. ${CARD_STYLE}` },
  { name: 'term-ind-medical-b', size: '1024x1536',
    prompt: `Smiling male physician in his 40s in a white coat holding a tablet, standing centered in a modern medical office, exam room softly blurred behind him. ${CARD_STYLE}` },
  { name: 'term-ind-auto-a', size: '1024x1536',
    prompt: `Smiling auto mechanic in his 30s in a dark work shirt, standing centered in his garage wiping his hands on a shop rag, a car on a lift softly blurred behind him. ${CARD_STYLE}` },
  { name: 'term-ind-auto-b', size: '1024x1536',
    prompt: `Smiling female mechanic in her 30s in coveralls with arms crossed holding a wrench, standing centered in a modern auto shop, toolboxes and a car softly blurred behind her. ${CARD_STYLE}` },
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
