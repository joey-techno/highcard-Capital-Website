/* High Card Capital — Apply page: product routing + JotForm embeds.
   THREE forms: Term Loan & Line of Credit SHARE one; SBA its own; HELOC its own.
   Paste the three JotForm form IDs below when they exist — nothing else changes. */
(function () {
  'use strict';

  var FORM_IDS = {
    shared: '',   // Term Loan + Line of Credit application  ← JotForm ID here
    sba: '',      // SBA application                          ← JotForm ID here
    heloc: '',    // HELOC application                        ← JotForm ID here
  };

  var PRODUCT_TO_FORM = {
    term: 'shared', loc: 'shared', sba: 'sba', heloc: 'heloc',
    business: 'shared', wc: 'shared', equipment: 'shared', rbf: 'shared',
  };
  var LABELS = {
    term: 'Term Loan', loc: 'Line of Credit', sba: 'SBA Loan', heloc: 'HELOC',
    business: 'Business Funding', wc: 'Working Capital',
    equipment: 'Equipment Financing', rbf: 'Revenue Based Financing',
  };

  var shell = document.getElementById('embedShell');
  var frameBox = document.getElementById('embedFrame');
  var title = document.getElementById('embedTitle');
  var emptyBox = document.getElementById('applyEmpty');
  var chooser = document.querySelectorAll('button[data-product]');
  if (!shell || !frameBox) return;

  function loadForm(product) {
    var formKey = PRODUCT_TO_FORM[product];
    if (!formKey) return;
    chooser.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.product === product ||
        (formKey === 'shared' && PRODUCT_TO_FORM[b.dataset.product] === 'shared' && b.dataset.product === product)));
    });
    shell.hidden = false;
    if (emptyBox) emptyBox.hidden = true;
    if (title) {
      title.innerHTML = LABELS[product] + ' Application' +
        (product === 'term' || product === 'loc' ? ' <span class="small" style="font-weight:400">&mdash; one form covers Term Loans and Lines of Credit</span>' : '') +
        '<span class="dot">.</span>';
    }

    var id = FORM_IDS[formKey];
    frameBox.innerHTML = '';
    if (!id) {
      // Wired and waiting for the JotForm ID — bare placeholder (owner 2026-07-29).
      frameBox.innerHTML =
        '<div class="embed-pending"><div class="inner">' +
        '<p class="small">jotform wiring</p>' +
        '</div></div>';
    } else {
      var shimmer = document.createElement('div');
      shimmer.className = 'shimmer';
      shimmer.style.cssText = 'position:absolute;inset:0;';
      frameBox.appendChild(shimmer);
      var iframe = document.createElement('iframe');
      iframe.src = 'https://form.jotform.com/' + id;
      iframe.title = LABELS[product] + ' application form';
      iframe.allow = 'geolocation; microphone; camera';
      iframe.addEventListener('load', function () { shimmer.remove(); });
      frameBox.appendChild(iframe);
    }
    shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hydrateIcons(scope) {
    var ICONS = window.HCC_ICONS || {};
    scope.querySelectorAll('[data-icon]').forEach(function (el) {
      var svg = ICONS[el.dataset.icon];
      if (svg) el.innerHTML = svg;
    });
  }

  // JotForm auto-resize: one listener, always targets the current iframe
  window.addEventListener('message', function (e) {
    if (typeof e.data !== 'string' || e.origin.indexOf('jotform') === -1) return;
    var args = e.data.split(':');
    var iframe = frameBox.querySelector('iframe');
    if (args[0] === 'setHeight' && iframe) iframe.style.minHeight = args[1] + 'px';
  });

  chooser.forEach(function (btn) {
    btn.addEventListener('click', function () { loadForm(btn.dataset.product); });
  });

  // deep link: apply.html?product=term|loc|sba|heloc
  var q = new URLSearchParams(location.search).get('product');
  if (q && PRODUCT_TO_FORM[q]) loadForm(q);
})();
