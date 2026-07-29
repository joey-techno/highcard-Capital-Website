// Industries page hero (see brand/page-plans/industries.md, Step 1).
// Owner locked concept 2026-07-29: TRADES COLLAGE SCENE — one wide scene suggesting
// several trades (contractor's truck outside a restaurant/shop street, tools and
// crates), warm morning light, NO people/faces. Title is CENTERED on this page, so
// the middle of the frame must read calm with detail toward the edges.
// Usage: node brand/ai/gen-industries-hero.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-industries');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo taken by a professional photographer on a real main street. Warm golden morning light, true-to-life textures, muted natural colors, subtle film grain, shallow depth of field. Absolutely no people, no faces, no illustration, no CGI. No readable text, no signage lettering, no logos, no watermarks.';

const HERO_STYLE = `Wide landscape composition with detail along the left and right edges and a calmer, more open middle so a centered headline reads clearly over it. ${STYLE}`;

const JOBS = [
  { name: 'industries-hero-a', size: '1536x1024',
    prompt: `A contractor's work pickup truck with ladders parked at the curb of a warm small-town main street, outside a row of varied small businesses: a cafe with bistro tables, a workshop with wooden crates and a toolbox by the door, morning light raking down the street. ${HERO_STYLE}` },
  { name: 'industries-hero-b', size: '1536x1024',
    prompt: `Early morning small-business street scene suggesting many trades at once: stacked produce crates outside a corner restaurant, a work van and a hand truck by a shop door, a mechanic's garage with its roller door half open down the block, warm sunlight and long shadows. ${HERO_STYLE}` },
  { name: 'industries-hero-c', size: '1536x1024',
    prompt: `Looking down a warm brick-paved commercial street at golden hour: a delivery truck parked to the left, cafe awning and flower buckets to the right, toolboxes and lumber stacked by an open workshop, the street center open and softly lit. ${HERO_STYLE}` },
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
