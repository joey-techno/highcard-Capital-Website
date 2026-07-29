// AI photo generation for the blog coming-soon photo (owner pick 2026-07-29:
// printing press / fresh printed pages stack, warm brand tones).
// Usage: node brand/ai/gen-blog-coming-soon.mjs
// Reads OPENAI_API_KEY from .env at repo root. Tries gpt-image-2, falls back to gpt-image-1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'brand', 'ai', 'photos-blog');
mkdirSync(OUT, { recursive: true });

const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const STYLE = 'Photorealistic editorial photograph for a business funding website, indistinguishable from a real photo taken by a professional photographer. Natural light, shallow depth of field, 50mm lens look, warm muted natural colors with deep green and cream tones, subtle film grain. Absolutely no illustration, CGI, or airbrushed look. No readable text, no logos, no watermarks.';

const JOBS = [
  { name: 'blog-coming-soon-a', size: '1536x1024',
    prompt: `Close-up of a small vintage letterpress printing press in a warm workshop, a tall stack of freshly printed cream paper pages beside it, soft window light raking across the paper texture, deep green machine body, ink rollers softly blurred in the background, calm crafted atmosphere, any type on the pages abstract and out of focus. ${STYLE}` },
  { name: 'blog-coming-soon-b', size: '1536x1024',
    prompt: `A neat stack of freshly printed cream paper sheets on a dark green worktable, the top sheet slightly lifted as if just placed, warm morning light from a window, a softly blurred printing workshop behind with paper rolls and shelves, quiet anticipation, any type on the sheets abstract and unreadable. ${STYLE}` },
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
