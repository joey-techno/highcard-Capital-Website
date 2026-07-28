// AI photo generation for the Line of Credit page (see brand/page-plans/line-of-credit.md).
// Usage: node brand/ai/gen-loc-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-loc');
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
  { name: 'loc-hero-a', size: '1536x1024',
    prompt: `Candid photo of a smiling male shop owner in his early 40s standing behind the wooden counter of his small general store, holding a tablet, warm shop light, shelves of goods softly blurred behind him. ${HERO_STYLE}` },
  { name: 'loc-hero-b', size: '1536x1024',
    prompt: `Candid photo of a smiling female boutique owner in her late 30s leaning on her shop counter with a tablet in hand, warm afternoon light through the storefront window, racks and shelves softly blurred behind her. ${HERO_STYLE}` },
  { name: 'loc-hero-c', size: '1536x1024',
    prompt: `Candid photo of a smiling cafe owner in his 30s standing at the counter of his coffee shop reviewing numbers on a tablet, espresso machine and pastry case softly blurred behind him, warm morning light. ${HERO_STYLE}` },

  // Industry cards: portrait, subject in the upper two thirds so the bottom third
  // stays clean for the site's green fade + label.
  { name: 'loc-ind-ecommerce-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling online store owner in her 30s at a packing table taping a cardboard shipping box, shelves of packed orders softly blurred behind her, warm workshop light, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'loc-ind-ecommerce-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling male ecommerce seller in his 30s holding a stack of small shipping boxes in his home warehouse, shelving with parcels softly blurred behind him, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'loc-ind-restaurant-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling server in her 20s carrying two plated dishes through a warmly lit restaurant dining room, tables with soft candlelight blurred behind her, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'loc-ind-restaurant-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling male server in his 30s in a bistro apron carrying plates through a cozy dining room during service, warm pendant lights softly blurred behind him, subject in the upper two thirds of the frame. ${STYLE}` },
  { name: 'loc-ind-physio-a', size: '1024x1536',
    prompt: `Vertical portrait of a smiling physical therapist in her 30s in a polo shirt guiding a patient through a resistance band exercise in a clean bright therapy studio, equipment softly blurred behind them, subjects in the upper two thirds of the frame. ${STYLE}` },
  { name: 'loc-ind-physio-b', size: '1024x1536',
    prompt: `Vertical portrait of a smiling male physical therapist in his 40s helping a patient with a stretching exercise on a treatment table in a modern clinic, subjects in the upper two thirds of the frame. ${STYLE}` },
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
