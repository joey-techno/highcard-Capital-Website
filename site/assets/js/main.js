/* High Card Capital — motion engine & UI. Zero dependencies. */
(function () {
  'use strict';
  const doc = document;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const page = doc.body.dataset.page || '';

  /* ---------- icon injection ---------- */
  const ICONS = window.HCC_ICONS || {};
  doc.querySelectorAll('[data-icon]').forEach(el => {
    const svg = ICONS[el.dataset.icon];
    if (svg) el.innerHTML = svg;
  });

  /* ---------- nav ---------- */
  const nav = doc.querySelector('.nav');
  if (nav) {
    const cur = doc.body.dataset.nav;
    if (cur) { const el = nav.querySelector('[data-nav-item="' + cur + '"]'); if (el) el.classList.add('is-current'); }
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Funding dropdown: real disclosure semantics on top of the CSS hover
    const dropBtn = nav.querySelector('[data-nav-item="funding"]');
    const drop = nav.querySelector('.drop');
    if (dropBtn && drop) {
      dropBtn.setAttribute('aria-expanded', 'false');
      const setDrop = (open) => {
        drop.classList.toggle('is-open', open);
        dropBtn.setAttribute('aria-expanded', String(open));
      };
      /* Services is a real link now: click navigates, hover/focus opens the panel.
         Only wire click-to-toggle when the trigger is a non-navigating button. */
      if (dropBtn.tagName !== 'A') {
        dropBtn.addEventListener('click', () => setDrop(!drop.classList.contains('is-open')));
      }
      dropBtn.parentElement.addEventListener('mouseenter', () => dropBtn.setAttribute('aria-expanded', 'true'));
      dropBtn.parentElement.addEventListener('mouseleave', () => { if (!drop.classList.contains('is-open')) dropBtn.setAttribute('aria-expanded', 'false'); });
      doc.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drop.classList.contains('is-open')) { setDrop(false); dropBtn.focus(); }
      });
      doc.addEventListener('click', e => {
        if (drop.classList.contains('is-open') && !dropBtn.parentElement.contains(e.target)) setDrop(false);
      });
    }

    const burger = doc.querySelector('.nav__burger');
    const menu = doc.querySelector('.menu');
    if (burger && menu) {
      const mainEl = doc.querySelector('main');
      const footEl = doc.querySelector('.footer');
      const setMenu = (open) => {
        menu.classList.toggle('is-open', open);
        doc.body.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        doc.documentElement.style.overflow = open ? 'hidden' : '';
        [mainEl, footEl].forEach(el => { if (el) el.toggleAttribute('inert', open); });
        if (open) {
          menu.querySelectorAll('.menu__links a').forEach((a, i) => {
            a.style.transitionDelay = (0.08 + i * 0.045) + 's';
          });
          const first = menu.querySelector('a');
          if (first) setTimeout(() => first.focus(), 350);
        }
      };
      burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
      doc.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); burger.focus(); }
        // keep Tab inside the open menu (burger stays reachable above it)
        if (e.key === 'Tab' && menu.classList.contains('is-open')) {
          const focusables = [burger, ...menu.querySelectorAll('a')];
          const idx = focusables.indexOf(doc.activeElement);
          if (e.shiftKey && idx === 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
          else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
        }
      });
    }
  }

  /* ---------- mobile sticky bar ---------- */
  const mbar = doc.querySelector('.mobilebar');
  if (mbar) {
    let footerInView = false;
    const footer = doc.querySelector('.footer');
    if (footer) {
      new IntersectionObserver(entries => {
        footerInView = entries[0].isIntersecting;
        update();
      }, { threshold: 0.05 }).observe(footer);
    }
    const update = () => mbar.classList.toggle('is-visible', window.scrollY > 560 && !footerInView);
    window.addEventListener('scroll', update, { passive: true });
    update();
    // product pages deep-link their sticky Apply button
    const P2Q = { term: 'term', loc: 'loc', sba: 'sba', heloc: 'heloc', wc: 'wc', equipment: 'equipment', rbf: 'rbf' };
    if (P2Q[page]) {
      const applyBtn = mbar.querySelector('.btn');
      if (applyBtn) applyBtn.href = 'apply.html?product=' + P2Q[page];
    }
  }

  /* ---------- split-line headlines ---------- */
  function splitLines(el) {
    /* Tokenize from a cached copy of the original text (keep an existing trailing
       .dot span glued to the last word). Never read live textContent on re-splits:
       the rebuilt DOM has no whitespace between .sl-line siblings, so a second
       pass would glue words together at every line boundary. */
    if (!el.dataset.splitText) {
      const dot = el.querySelector('.dot');
      el.dataset.splitDot = dot ? dot.outerHTML : '';
      if (dot) dot.remove();
      el.dataset.splitText = el.textContent.trim();
    }
    const dotHTML = el.dataset.splitDot || '';
    const words = el.dataset.splitText.split(/\s+/);
    el.textContent = '';
    const spans = words.map((w, i) => {
      const s = doc.createElement('span');
      s.style.display = 'inline-block';
      s.innerHTML = (i === words.length - 1 && dotHTML) ? w + dotHTML : w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(doc.createTextNode(' '));
      return s;
    });
    // Group by rendered line
    const lines = [];
    let top = null;
    spans.forEach(s => {
      if (top === null || Math.abs(s.offsetTop - top) > 4) { lines.push([]); top = s.offsetTop; }
      lines[lines.length - 1].push(s);
    });
    el.textContent = '';
    lines.forEach((line, li) => {
      const outer = doc.createElement('span');
      outer.className = 'sl-line';
      const inner = doc.createElement('span');
      inner.className = 'sl-inner';
      inner.style.setProperty('--d', (li * 0.09) + 's');
      inner.innerHTML = line.map(s => s.innerHTML).join(' ');
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    el.classList.add('sl-ready');
  }

  const splitEls = Array.from(doc.querySelectorAll('[data-split]'));
  if (!reduced && splitEls.length) {
    splitEls.forEach(el => { el.style.opacity = '0'; });
    const doSplit = () => splitEls.forEach(el => {
      splitLines(el);
      el.style.opacity = '';
      io.observe(el);
    });
    /* always defer to a microtask: doSplit touches `io`, declared below — a
       synchronous call here crashes the whole script when fonts are cached */
    if (doc.fonts) doc.fonts.ready.then(doSplit);
    else setTimeout(doSplit, 0);
    /* re-split on real width changes so line breaks never freeze at a stale layout */
    let lastW = window.innerWidth, rsT;
    window.addEventListener('resize', () => {
      if (window.innerWidth === lastW) return;
      clearTimeout(rsT);
      rsT = setTimeout(() => { lastW = window.innerWidth; splitEls.forEach(splitLines); }, 150);
    });
    /* bfcache restore: layout may differ from when the page was frozen — re-split */
    window.addEventListener('pageshow', e => { if (e.persisted) splitEls.forEach(splitLines); });
  }

  /* ---------- reveal engine ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  doc.querySelectorAll('[data-reveal], .curtain, [data-draw]').forEach(el => {
    if (reduced) { el.classList.add('is-inview'); return; }
    io.observe(el);
  });
  // auto-stagger: parents with data-stagger get incremental delays on direct [data-reveal] children
  doc.querySelectorAll('[data-stagger]').forEach(parent => {
    const step = parseFloat(parent.dataset.stagger) || 0.08;
    parent.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', (i * step) + 's');
    });
  });
  if (reduced) splitEls.forEach(el => el.classList.add('is-inview'));

  /* ---------- home: hold the product cards until the first scroll ---------- */
  if (page === 'home' && !reduced) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    scrollTo(0, 0);
    const held = [...doc.querySelectorAll('.prod-grid .prod')];
    const prodHead = doc.querySelector('.sec-products .sec-head');
    if (held.length) {
      const hold = () => held.forEach(c => c.classList.remove('is-inview'));
      hold();
      const iv = setInterval(hold, 100); /* outlast the observer's async delivery */
      if (prodHead) prodHead.classList.add('presettle');
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        clearInterval(iv);
        held.forEach(c => c.classList.add('is-inview'));
        if (prodHead) prodHead.classList.remove('presettle');
      };
      addEventListener('wheel', release, { passive: true });
      addEventListener('touchmove', release, { passive: true });
      addEventListener('scroll', () => { if (scrollY > 8) release(); }, { passive: true });
    }
  }

  /* ---------- counters ---------- */
  const fmt = new Intl.NumberFormat('en-US');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target;
      const to = parseFloat(el.dataset.countTo);
      const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = prefix + fmt.format(to) + suffix; return; }
      const dur = 1900, t0 = performance.now();
      (function tick(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = prefix + fmt.format(Math.round(to * eased)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  doc.querySelectorAll('[data-count-to]').forEach(el => cio.observe(el));

  /* ---------- hero hand: deal-in + group tilt ---------- */
  const hand = doc.querySelector('.hand');
  if (hand) {
    const group = hand.querySelector('.hand__group');
    requestAnimationFrame(() => {
      hand.classList.add('is-dealt');
      if (!reduced) setTimeout(() => hand.classList.add('is-idle'), 1500);
    });
    if (group && finePointer && !reduced) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      const host = hand.closest('.hero') || hand;
      host.addEventListener('pointermove', ev => {
        const r = hand.getBoundingClientRect();
        tx = ((ev.clientX - r.left) / r.width - 0.5);
        ty = ((ev.clientY - r.top) / r.height - 0.5);
        if (!raf) loop();
      });
      host.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) loop(); });
      function loop() {
        raf = requestAnimationFrame(() => {
          cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
          group.style.transform = `rotateY(${cx * 9}deg) rotateX(${cy * -7}deg)`;
          if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) loop();
          else raf = null;
        });
      }
    }
  }

  /* ---------- card tilt (subtle, product cards) ---------- */
  if (finePointer && !reduced) {
    doc.querySelectorAll('[data-tilt]').forEach(card => {
      const max = parseFloat(card.dataset.tilt) || 3;
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('pointermove', ev => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${y * -max}deg) translateY(-5px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- stat count-up (bridge cards) ---------- */
  const counters = doc.querySelectorAll('[data-count]');
  if (counters.length) {
    const fmt = n => n.toLocaleString('en-US');
    const cio = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        if (reduced) { el.textContent = pre + fmt(target) + suf; return; }
        const t0 = performance.now(), dur = 1200;
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + fmt(Math.round(target * eased)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: .4 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- card spotlight (product cards) ---------- */
  if (finePointer && !reduced) {
    doc.querySelectorAll('[data-spotlight]').forEach(card => {
      card.addEventListener('pointermove', ev => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((ev.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((ev.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduced) {
    doc.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('pointermove', ev => {
        const r = btn.getBoundingClientRect();
        const x = ev.clientX - r.left - r.width / 2;
        const y = ev.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.14}px, ${y * 0.22}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- needs-router ---------- */
  const router = doc.querySelector('.router');
  if (router) {
    const chips = router.querySelectorAll('.router__chip');
    const cta = doc.getElementById('heroCta');
    const line = doc.getElementById('routerLine');
    const M = {
      term:  { name: 'a Term Loan',       range: '$5K – $25M',   href: 'term-loans.html' },
      sba:   { name: 'an SBA Loan',       range: '$25K – $15M',  href: 'sba-loans.html' },
      heloc: { name: 'a HELOC',           range: 'up to 90% CLTV', href: 'heloc.html' },
      loc:   { name: 'a Line of Credit',  range: '$10K – $2M',   href: 'line-of-credit.html' },
    };
    chips.forEach(chip => chip.addEventListener('click', () => {
      const on = chip.getAttribute('aria-pressed') === 'true';
      chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      if (on) {
        if (cta) cta.href = 'apply.html';
        if (line) line.hidden = true;
        return;
      }
      chip.setAttribute('aria-pressed', 'true');
      const p = M[chip.dataset.product];
      if (cta) cta.href = 'apply.html?product=' + chip.dataset.product;
      if (line && p) {
        line.hidden = false;
        line.innerHTML = `That&rsquo;s usually <a href="${p.href}">${p.name}</a> &mdash; <b class="num">${p.range}</b>. Your advisor confirms the fit.`;
      }
    }));
  }

  /* ---------- how-it-works: scroll-linked card fan ---------- */
  const fanScene = doc.querySelector('[data-fan]');
  if (fanScene && !reduced) {
    const cards = fanScene.querySelectorAll('.fan__card');
    const steps = fanScene.querySelectorAll('.fan-step');
    const update = () => {
      const r = fanScene.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / total));
      const ease = t => Math.min(1, Math.max(0, t));
      const p2 = ease((p - 0.18) / 0.3), p3 = ease((p - 0.55) / 0.3);
      if (cards[1]) cards[1].style.transform = `rotate(${p2 * -16}deg) translateX(${p2 * -26}px)`;
      if (cards[2]) cards[2].style.transform = `rotate(${p3 * 16}deg) translateX(${p3 * 26}px)`;
      const active = p3 > 0.5 ? 2 : p2 > 0.5 ? 1 : 0;
      steps.forEach((s, i) => s.style.opacity = (i === active ? '1' : '0.45'));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- home: deal panel — steps synced to the 3D phone ---------- */
  const dealScene = doc.querySelector('[data-deal-scene]');
  if (dealScene) {
    const steps = Array.from(doc.querySelectorAll('.deal-step'));
    const screens = Array.from(dealScene.querySelectorAll('.dscreen'));
    const dots = Array.from(dealScene.querySelectorAll('.dphone__dots i'));
    const HOLD = 4400; /* keep in step with --hold in main.css */
    let cur = 0, timer = null;
    const show = (i) => {
      cur = i;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      screens.forEach((s, k) => s.classList.toggle('is-on', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
    };
    const arm = () => {
      clearInterval(timer);
      if (!reduced) timer = setInterval(() => show((cur + 1) % screens.length), HOLD);
    };
    steps.forEach((s, i) => {
      s.addEventListener('click', () => { show(i); arm(); });
      if (finePointer) s.addEventListener('pointerenter', () => { if (i !== cur) { show(i); arm(); } });
    });
    /* cycle only while the panel is on screen */
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) arm(); else clearInterval(timer); });
    }, { threshold: 0.25 }).observe(dealScene);

    /* pointer parallax on the phone */
    const tilt = dealScene.querySelector('.deal-tilt');
    if (tilt && finePointer && !reduced) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      const host = dealScene.closest('.sec-deal') || dealScene;
      host.addEventListener('pointermove', ev => {
        const r = dealScene.getBoundingClientRect();
        tx = Math.max(-0.6, Math.min(0.6, (ev.clientX - r.left) / r.width - 0.5));
        ty = Math.max(-0.6, Math.min(0.6, (ev.clientY - r.top) / r.height - 0.5));
        if (!raf) loop();
      });
      host.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) loop(); });
      function loop() {
        raf = requestAnimationFrame(() => {
          cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
          tilt.style.transform = `rotateY(${-12 + cx * 10}deg) rotateX(${4 + cy * -8}deg)`;
          if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) loop();
          else raf = null;
        });
      }
    }
  }

  /* ---------- home: FAQ card — strictly one answer open at a time ----------
     Manage state on the summary click (not the toggle event): the browser's
     default toggles THIS item, and we close every sibling in the same tick, so
     no toggle-cascade race can leave two panels open. */
  const faqCard = doc.querySelector('[data-faqcard]');
  if (faqCard) {
    const items = Array.from(faqCard.querySelectorAll('.faqq'));
    items.forEach(item => {
      const summary = item.querySelector('summary');
      if (!summary) return;
      summary.addEventListener('click', () => {
        // read state BEFORE the browser flips it: if it's closed now, it's about to open
        const willOpen = !item.open;
        if (willOpen) items.forEach(o => { if (o !== item) o.open = false; });
      });
    });
  }

  /* ---------- FAQ scrollspy ---------- */
  const toc = doc.querySelector('.toc');
  if (toc) {
    const links = toc.querySelectorAll('a');
    const targets = Array.from(links).map(a => doc.querySelector(a.getAttribute('href')));
    const spy = () => {
      let current = 0;
      targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < 160) current = i; });
      links.forEach((a, i) => a.classList.toggle('active', i === current));
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------- footer year ---------- */
  const yr = doc.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
