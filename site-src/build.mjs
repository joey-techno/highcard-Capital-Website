// Assembles static pages: head + nav + page body + footer + scripts → /site/*.html
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.OUT || join(ROOT, '..', 'site');
const P = (f) => readFileSync(join(ROOT, 'partials', f), 'utf8');
const B = (f) => readFileSync(join(ROOT, 'pages', f), 'utf8');

const PAGES = [
  { file: 'index.html',          body: 'home.html',    id: 'home',    nav: 'home',
    title: 'High Card Capital · Business Funding with a Human Advisor. Options by Tomorrow.',
    desc: 'Apply in two minutes. A real advisor matches you to the right Term Loan, SBA Loan, HELOC, or Line of Credit: $5K to $25M, options in as little as 24 hours. No cost to apply.' },
  { file: 'term-loans.html',     body: 'term-loans.html', id: 'term',  nav: 'funding',
    title: 'Business Term Loans · $5K to $25M, Funded in as Little as 24 Hours | High Card Capital',
    desc: 'One lump sum, one predictable payment. Term loans from $5K to $25M with funding in as little as 24 hours. Soft credit pull to see your options. No cost, no obligation.' },
  { file: 'sba-loans.html',      body: 'sba-loans.html', id: 'sba',   nav: 'funding',
    title: 'SBA · Government-Backed Funding, Terms up to 25 Years | High Card Capital',
    desc: 'SBA 7(a) and 504 loans from $25K to $15M with the lowest payments in small-business lending. We handle the paperwork; you keep the low rate. See your options with a soft pull.' },
  { file: 'heloc.html',          body: 'heloc.html',   id: 'heloc',   nav: 'funding',
    title: 'HELOC for Business Owners · Up to 90% CLTV | High Card Capital',
    desc: 'Put the equity in your home to work for your business. A revolving line up to 90% CLTV. Draw what you need, when you need it. See your rate without a hard credit pull.' },
  { file: 'line-of-credit.html', body: 'line-of-credit.html', id: 'loc', nav: 'funding',
    title: 'Business Line of Credit · $10K to $2M, Draw · Repay · Redraw | High Card Capital',
    desc: 'A revolving business line of credit from $10K to $2M. Draw, repay, redraw, and only pay for what you use. Options in as little as 24 hours with a soft credit pull.' },
  // how-it-works kept in /pages but intentionally excluded from the built site (owner's call 2026-07)
  { file: 'about.html',          body: 'about.html',   id: 'about',   nav: 'about',
    title: 'About Us · A Brokerage That Comes to the Table Prepared | High Card Capital',
    desc: 'High Card Capital is a commercial-financing brokerage: one application, a network of lenders, and a human advisor who does the homework. The numbers and credentials, up front.' },
  { file: 'faq.html',            body: 'faq.html',     id: 'faq',     nav: 'faq',
    title: 'FAQ · Asked by Businesses. Answered Straight. | High Card Capital',
    desc: 'How fast is funding, really? Will checking options hurt my credit? What does a broker cost? The ten questions businesses actually ask, answered in full, in plain language.' },
  { file: 'blog.html',           body: 'blog.html',    id: 'blog',    nav: 'blog',
    title: 'Blog · Notes on Funding Your Business | High Card Capital',
    desc: 'Straight talk on business funding: rates, timing, and the choices behind every funding decision. New posts on the way from the High Card Capital advisory team.' },
  { file: 'contact.html',        body: 'contact.html', id: 'contact', nav: 'contact',
    title: 'Contact · Talk to a Funding Advisor | High Card Capital',
    desc: 'Call, email, or send four fields and we respond within one business hour, Mon–Fri 8am–7pm ET. New funding and current clients each have a direct line.' },
  { file: 'apply.html',          body: 'apply.html',   id: 'apply',   nav: '',
    title: 'Apply · Two Minutes to See Your Options | High Card Capital',
    desc: 'Tell us what you are applying for and finish in about two minutes. Soft credit pull, encrypted, no cost and no obligation. A real advisor calls you the same business day.' },
];

const head = P('head.html'), nav = P('nav.html'), footer = P('footer.html'), scripts = P('scripts.html');
const V = Date.now().toString(36); // cache-buster: new value every build so browsers refetch CSS/JS

for (const pg of PAGES) {
  let html = head + nav + B(pg.body) + footer + scripts;
  html = html
    .replaceAll('{{TITLE}}', pg.title)
    .replaceAll('{{DESC}}', pg.desc)
    .replaceAll('{{ID}}', pg.id)
    .replaceAll('{{NAV}}', pg.nav)
    .replaceAll('{{V}}', V);
  writeFileSync(join(OUT, pg.file), html);
  console.log('built', pg.file);
}
