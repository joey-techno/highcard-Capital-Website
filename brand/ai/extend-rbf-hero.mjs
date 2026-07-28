// Outpaint headroom above the RBF hero subject (owner 2026-07-28: head must be fully
// clear). Input: padded PNG (original at bottom-left, transparent top+right bands);
// the edits API fills only the transparent areas, keeping the man untouched.
// Usage: node brand/ai/extend-rbf-hero.mjs <padded.png>
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const env = readFileSync(join(ROOT, '.env'), 'utf8');
const KEY = env.match(/OPENAI_API_KEY\s*=\s*"?([^"\r\n]+)"?/)?.[1];
if (!KEY) { console.error('OPENAI_API_KEY not found in .env'); process.exit(1); }

const padded = process.argv[2];
if (!padded) { console.error('usage: node extend-rbf-hero.mjs <padded.png>'); process.exit(1); }

const PROMPT = 'Seamlessly extend the photograph into the empty areas: continue the softly blurred artisan shop interior with warm pendant lighting upward above the man\'s head and to the right, matching the existing lighting, grain, and shallow depth of field exactly. Do not change the man or any existing part of the photo.';

async function edit(model) {
  const form = new FormData();
  form.append('model', model);
  form.append('prompt', PROMPT);
  form.append('size', '1536x1024');
  form.append('quality', 'high');
  form.append('image', new Blob([readFileSync(padded)], { type: 'image/png' }), 'padded.png');
  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST', headers: { 'Authorization': `Bearer ${KEY}` }, body: form,
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error(json.error?.message || res.statusText), { status: res.status });
  return Buffer.from(json.data[0].b64_json, 'base64');
}

let buf, used = 'gpt-image-2';
try { buf = await edit('gpt-image-2'); }
catch (e) {
  if (e.status === 404 || /model/i.test(e.message)) {
    console.log(`gpt-image-2 unavailable (${e.message}); falling back to gpt-image-1`);
    used = 'gpt-image-1';
    buf = await edit('gpt-image-1');
  } else throw e;
}
const out = join(ROOT, 'brand', 'ai', 'photos-rbf', 'rbf-hero-b-extended.png');
writeFileSync(out, buf);
console.log(`saved ${out} (${used}, ${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
