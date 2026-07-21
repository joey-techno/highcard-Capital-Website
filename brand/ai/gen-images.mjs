// AI photo generation for High Card Capital.
// Usage: node brand/ai/gen-images.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website. Genuine warm smile, looking at camera, natural light, shallow depth of field, 50mm lens look, true-to-life skin texture, muted natural colors. No text, no logos, no watermarks.';

const JOBS = [
  {
    name: 'img-term-hero-a',
    prompt: `Candid vertical portrait of a smiling general contractor in his early 40s standing in his woodworking workshop, canvas work jacket and tool belt, arms relaxed, sawdust and workbenches softly blurred behind him. ${STYLE}`,
  },
  {
    name: 'img-term-hero-b',
    prompt: `Candid vertical portrait of a smiling female construction business owner in her late 30s wearing a hard hat and high-visibility vest over a flannel shirt, standing on an active framing site at golden hour, lumber framing softly blurred behind her. ${STYLE}`,
  },
];

async function generate(model, prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, size: '1024x1536', quality: 'high', n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error(json.error?.message || res.statusText), { status: res.status, code: json.error?.code });
  return Buffer.from(json.data[0].b64_json, 'base64');
}

for (const job of JOBS) {
  let buf, used = 'gpt-image-2';
  try {
    buf = await generate('gpt-image-2', job.prompt);
  } catch (e) {
    if (e.status === 404 || /model/i.test(e.message)) {
      console.log(`gpt-image-2 unavailable (${e.message}); falling back to gpt-image-1 for ${job.name}`);
      used = 'gpt-image-1';
      buf = await generate('gpt-image-1', job.prompt);
    } else throw e;
  }
  const file = join(OUT, `${job.name}.png`);
  writeFileSync(file, buf);
  console.log(`saved ${file} (${used}, ${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
}
console.log('done');
