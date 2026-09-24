/* BotanicExtract — site scripts (v11) */
(function () {
  'use strict';

  /* ---- SOCIAL LINKS -----------------------------------------------
     Fill in the URLs after registering each account, save, refresh.
     Any entry left as '' stays hidden automatically (no dead links).
     Icons render into every [data-social] host (topbar + footer). */
  var SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/share/1DpXmEJhbu/',
    x:        'https://x.com/Hunterliu888',
    linkedin: 'https://www.linkedin.com/in/hunter-liu-487416437',
    youtube:  ''
  };

  function renderSocial() {
    var hosts = document.querySelectorAll('[data-social]');
    if (!hosts.length) { return; }
    var icons = {
      linkedin:  'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z',
      youtube:   'M23 12s0-3.3-.4-4.8c-.2-.8-.9-1.5-1.7-1.7C19.4 5 12 5 12 5s-7.4 0-8.9.5c-.8.2-1.5.9-1.7 1.7C1 8.7 1 12 1 12s0 3.3.4 4.8c.2.8.9 1.5 1.7 1.7 1.5.5 8.9.5 8.9.5s7.4 0 8.9-.5c.8.2 1.5.9 1.7 1.7.4-1.5.4-4.8.4-4.8zM9.8 15.5v-7l6.2 3.5z',
      facebook:  'M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.7-1.6h1.6V3.1C16.5 3 15.5 3 14.4 3c-2.4 0-4 1.4-4 4.1v2.5H7.6v3.2h2.8V21z',
      x:         'M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9zm-1.1 16.1h1.7L6.9 4.7H5.1z'
    };
    var labels = { linkedin: 'LinkedIn', youtube: 'YouTube', facebook: 'Facebook', x: 'X (Twitter)' };
    var html = '';
    Object.keys(SOCIAL_LINKS).forEach(function (k) {
      if (!SOCIAL_LINKS[k]) { return; }
      html += '<a href="' + SOCIAL_LINKS[k] + '" target="_blank" rel="noopener" aria-label="' + labels[k] + '" title="' + labels[k] + '">'
        + '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="' + icons[k] + '"/></svg></a>';
    });
    if (!html) { return; }
    Array.prototype.forEach.call(hosts, function (host) {
      if (host.querySelector('a')) { return; }
      var box = document.createElement('div');
      box.className = host.classList.contains('tb-social') ? '' : 'social-row';
      if (!host.classList.contains('tb-social')) {
        box.innerHTML = '<span class="social-label">Follow us</span>' + html;
      } else {
        box.innerHTML = html;
      }
      host.appendChild(box);
    });
  }
  renderSocial();

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); }
    });
  }

  // Current year in footer
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  // Highlight the active nav item based on current path
  var path = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('#site-nav a');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      links[i].classList.add('active');
    }
  }

  /* ---- Feedback modal (v11) ---- */
  var fbModal = document.getElementById('fb-modal');
  function fbOpen(e) {
    if (e) { e.preventDefault(); }
    if (!fbModal) { location.hash = '#contact'; return; }
    fbModal.hidden = false;
    document.body.style.overflow = 'hidden';
    var first = fbModal.querySelector('input[name="name"]');
    if (first) { first.focus(); }
  }
  function fbClose() {
    if (!fbModal) { return; }
    fbModal.hidden = true;
    document.body.style.overflow = '';
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-fb-open]'), function (b) {
    b.addEventListener('click', fbOpen);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-fb-close]'), function (b) {
    b.addEventListener('click', fbClose);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && fbModal && !fbModal.hidden) { fbClose(); }
  });

  /* ---- Header search bar (v11) ---- */
  var searchBtn = document.querySelector('[data-search-toggle]');
  var searchBar = document.getElementById('search-bar');
  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', function () {
      searchBar.hidden = !searchBar.hidden;
      if (!searchBar.hidden) {
        var inp = searchBar.querySelector('input');
        if (inp) { inp.focus(); }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !searchBar.hidden) { searchBar.hidden = true; }
    });
  }

  /* ---- Collapsible float contact (v11) ---- */
  var fpanel = document.getElementById('float-contact');
  if (fpanel) {
    Array.prototype.forEach.call(fpanel.querySelectorAll('[data-fc-toggle]'), function (b) {
      b.addEventListener('click', function () {
        var folded = fpanel.classList.toggle('folded');
        sessionStorage.setItem('fc-folded', folded ? '1' : '0');
      });
    });
  }

  // Enquiry form — submit with AJAX so the visitor gets feedback on the page
  document.querySelectorAll('form.enquiry').forEach(function (form) {
    var status = document.createElement('p');
    status.className = 'form-status';
    form.appendChild(status);

    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';

      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        status.className = 'form-status err';
        status.innerHTML = 'This form is not connected yet. Please email '
          + '<a href="mailto:hunter@botanicextract.com">hunter@botanicextract.com</a>'
          + ' or message us on WhatsApp instead.';
        return;
      }

      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      status.className = 'form-status';
      status.textContent = '';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, data: data }; });
      }).then(function (r) {
        if (!r.ok) {
          var msg = 'Submission failed';
          if (r.data && r.data.errors && r.data.errors.length) {
            msg = r.data.errors.map(function (x) { return x.message; }).join(' ');
          }
          throw new Error(msg);
        }
        form.reset();
        status.className = 'form-status ok';
        var okMsg = form.getAttribute('data-success');
        status.innerHTML = okMsg ? okMsg : 'Thank you &mdash; your enquiry has been sent. We reply from '
          + '<strong>hunter@botanicextract.com</strong> within one business day. '
          + 'If you do not see the reply, please check your spam folder.';
        if (btn) { btn.disabled = false; btn.textContent = label; }
        if (status.scrollIntoView) { status.scrollIntoView({ block: 'center' }); }
      }).catch(function (err) {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        status.className = 'form-status err';
        status.innerHTML = 'Sorry, the message could not be sent'
          + (err && err.message ? ' (' + err.message + ')' : '')
          + '. Please email <a href="mailto:hunter@botanicextract.com">hunter@botanicextract.com</a>'
          + ' or message us on WhatsApp.';
      });
    });
  });

  // Copy-email button in the floating contact stack
  document.querySelectorAll('.fc-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var txt = btn.getAttribute('data-copy');
      var done = function () {
        var label = btn.querySelector('.fc-txt');
        if (label) {
          var old = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(function () { label.textContent = old; }, 1800);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  // Product search + category filter (products listing page)
  var search = document.getElementById('prod-search');
  if (search) {
    // Prefill from ?q= (header search sends buyers here)
    try {
      var qp = new URLSearchParams(location.search).get('q');
      if (qp) { search.value = qp; }
    } catch (e) {}

    var cards = Array.prototype.slice.call(document.querySelectorAll('.pcard[data-name],.hot-card[data-name]'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('#prod-filters .chip'));
    var empty = document.getElementById('prod-empty');
    var activeFilter = 'all';
    function applyFilters() {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var okQ = !q || (card.getAttribute('data-name') + ' ' + card.textContent.toLowerCase()).indexOf(q) !== -1;
        var okF = activeFilter === 'all' || card.getAttribute('data-cat') === activeFilter;
        var show = okQ && okF;
        card.classList.toggle('hidden', !show);
        if (show) { shown++; }
      });
      if (empty) { empty.hidden = shown !== 0; }
    }
    search.addEventListener('input', applyFilters);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeFilter = chip.getAttribute('data-filter');
        applyFilters();
      });
    });
    applyFilters();

    // Arrived with ?q= (header search fallback): jump to the first matching card
    try {
      if (new URLSearchParams(location.search).get('q') && search.value.trim()) {
        var first = cards.filter(function (c) { return !c.classList.contains('hidden'); })[0];
        if (first) {
          setTimeout(function () {
            first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            first.style.boxShadow = '0 0 0 3px #2e7d32';
            first.style.borderRadius = '10px';
            setTimeout(function () { first.style.boxShadow = ''; }, 2600);
          }, 350);
        }
      }
    } catch (e) {}
  }

  // v8/v11 hero swiper (index only)
  var heroSw = document.getElementById('hero-swiper');
  if (heroSw) {
    var hsSlides = heroSw.querySelectorAll('.hs-slide');
    var hsDots = heroSw.querySelectorAll('.hs-dot');
    var hsIdx = 0, hsTimer = null;
    var hsShow = function (n) {
      hsIdx = (n + hsSlides.length) % hsSlides.length;
      hsSlides.forEach(function (el, i) { el.classList.toggle('active', i === hsIdx); });
      hsDots.forEach(function (d, i) { d.classList.toggle('active', i === hsIdx); });
    };
    var hsPlay = function () { hsTimer = setInterval(function () { hsShow(hsIdx + 1); }, 5200); };
    var hsReset = function () { clearInterval(hsTimer); hsPlay(); };
    var hsPrev = heroSw.querySelector('.hs-prev');
    var hsNext = heroSw.querySelector('.hs-next');
    if (hsPrev) { hsPrev.addEventListener('click', function () { hsShow(hsIdx - 1); hsReset(); }); }
    if (hsNext) { hsNext.addEventListener('click', function () { hsShow(hsIdx + 1); hsReset(); }); }
    hsDots.forEach(function (d, i) {
      d.addEventListener('click', function () { hsShow(i); hsReset(); });
    });
    hsPlay();
  }
})();

/* ---- v12: sticky header shrink + product quick search ---- */
(function () {
  'use strict';
  var onScroll = function () {
    document.body.classList.toggle('hdr-shrink', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var PRODUCT_INDEX = [
    { n: 'Blueberry Powder', k: 'blueberry|蓝莓|蓝莓粉', u: 'products/blueberry-powder.html' },
    { n: 'Cranberry Powder', k: 'cranberry|蔓越莓|蔓越莓粉', u: 'products/cranberry-powder.html' },
    { n: 'Wolfberry Powder', k: 'wolfberry|goji|枸杞|枸杞粉', u: 'products/goji-extract.html' },
    { n: 'Strawberry Powder', k: 'strawberry|草莓|草莓粉', u: 'products/strawberry-powder.html' },
    { n: 'Rose Powder', k: 'rose powder|rose flower|玫瑰|玫瑰花', u: 'products/rose-powder.html' },
    { n: 'Mango Powder', k: 'mango|芒果|芒果粉', u: 'products/mango-powder.html' },
    { n: 'Hawthorn Powder', k: 'hawthorn|山楂粉', u: 'products/hawthorn-extract.html' },
    { n: 'Roxburgh Rose Powder', k: 'roxburgh|cili|刺梨|刺梨粉', u: 'products/cili-fruit-powder.html' },
    { n: 'Sea Buckthorn Fruit Powder', k: 'sea buckthorn|沙棘果粉', u: 'products/sea-buckthorn-powder.html' },
    { n: 'Osmanthus Powder', k: 'osmanthus|桂花粉', u: 'products/osmanthus-powder.html' },
    { n: 'Jasmine Pollen', k: 'jasmine|茉莉|茉莉花粉|茶花粉', u: 'products/jasmine-pollen.html' },
    { n: 'Monk Fruit Powder', k: 'monk fruit|luo han guo|mogroside|罗汉果粉', u: 'products/monk-fruit-extract.html' },
    { n: 'Chrysanthemum Powder', k: 'chrysanthemum|菊花粉', u: 'products/chrysanthemum-extract.html' },
    { n: 'Green Tea Powder', k: 'green tea|绿茶粉', u: 'products/green-tea-extract.html' },
    { n: 'Passion Fruit Powder', k: 'passion fruit|百香果|鸡蛋果', u: 'products/passion-fruit-powder.html' },
    { n: 'Roselle Powder', k: 'roselle|hibiscus|洛神花|玫瑰茄', u: 'products/roselle-powder.html' },
    { n: 'Snow Lotus Fruit Powder', k: 'yacon|snow lotus|雪莲果粉', u: 'products/yacon-powder.html' },
    { n: 'Coffee Powder', k: 'coffee|咖啡', u: 'products/coffee-powder.html' },
    { n: 'Senna Leaf Extract', k: 'senna|番泻叶', u: 'products/senna-leaf-extract.html' },
    { n: 'Garcinia Cambogia Extract', k: 'garcinia|藤黄果|hca', u: 'products/garcinia-cambogia-extract.html' },
    { n: 'Salidroside', k: 'salidroside|rhodiola|红景天苷', u: 'products/rhodiola-rosea-extract.html' },
    { n: 'Creatine Monohydrate', k: 'creatine|肌酸', u: 'products/creatine-monohydrate.html' },
    { n: 'Tongkat Ali Extract', k: 'tongkat|eurycomanone|东革阿里', u: 'products/tongkat-ali-extract.html' },
    { n: 'Epimedium Extract', k: 'epimedium|icariin|淫羊藿', u: 'products/epimedium-extract.html' },
    { n: 'White Kidney Bean Extract', k: 'white kidney bean|白芸豆|amylase inhibitor', u: 'products/white-kidney-bean-extract.html' },
    { n: 'Lotus Leaf Extract', k: 'lotus leaf|nuciferine|荷叶', u: 'products/lotus-leaf-extract.html' },
    { n: 'Ginsenoside', k: 'ginsenoside|ginseng|人参皂甙', u: 'products/ginseng-extract.html' },
    { n: 'Polygonatum Polysaccharide', k: 'polygonatum|huangjing|黄精|黄精多糖', u: 'products/polygonatum-polysaccharide.html' },
    { n: 'Macamide', k: 'macamide|maca|玛卡酰胺|玛咖酰胺', u: 'products/macamide.html' },
    { n: 'Cistanche Extract', k: 'cistanche|echinacoside|肉苁蓉|沙漠人参', u: 'products/cistanche-extract.html' },
    { n: 'Cassia Seed Extract', k: 'cassia seed|决明子', u: 'products/cassia-seed-extract.html' },
    { n: 'Psyllium Husk Powder', k: 'psyllium|洋车前子|车前子壳|膳食纤维', u: 'products/psyllium-husk-powder.html' },
    { n: 'CLA Glyceride Powder', k: 'cla|conjugated linoleic|共轭亚油酸甘油酯', u: 'products/cla-powder.html' },
    { n: 'Tea Polyphenols', k: 'tea polyphenol|茶多酚', u: 'products/tea-polyphenols.html' },
    { n: 'Oyster Peptide Powder', k: 'oyster|牡蛎肽粉|牡蛎', u: 'products/oyster-peptide.html' },
    { n: 'Eucommia Male Flower Extract', k: 'eucommia|杜仲|杜仲雄花', u: 'products/eucommia-male-flower-extract.html' },
    { n: 'Bitter Melon Peptide', k: 'bitter melon|苦瓜|苦瓜肽', u: 'products/bitter-melon-peptide.html' },
    { n: 'Mulberry Leaf Extract', k: 'mulberry|桑叶|dnj', u: 'products/mulberry-leaf-extract.html' },
    { n: 'Gamma-Aminobutyric Acid (GABA)', k: 'gaba|aminobutyric|氨基丁酸', u: 'products/gaba-powder.html' },
    { n: 'Spine Date Seed Extract', k: 'spine date seed|jujube seed|suan zao ren|酸枣仁', u: 'products/jujube-seed-extract.html' },
    { n: 'Milk Thistle Extract', k: 'milk thistle|silymarin|silybin|水飞蓟', u: 'products/milk-thistle-extract.html' },
    { n: 'Hovenia Dulcis Seed Extract', k: 'hovenia|枳棋子|枳椇子|解酒', u: 'products/hovenia-extract.html' },
    { n: 'Loquat Leaf Extract', k: 'loquat|corosolic|枇杷叶', u: 'products/loquat-leaf-extract.html' },
    { n: 'Tartary Buckwheat Extract', k: 'tartary buckwheat|苦荞|荞麦', u: 'products/tartary-buckwheat-extract.html' },
    { n: 'Poria Cocos Extract', k: 'poria|茯苓提取物|pachymic', u: 'products/poria-extract.html' },
    { n: 'Tea L-Theanine', k: 'theanine|茶氨酸|l-theanine', u: 'products/l-theanine.html' },
    { n: 'Dihydromyricetin', k: 'dihydromyricetin|dhm|二氢杨梅素|藤茶', u: 'products/dihydromyricetin.html' },
    { n: 'Corn Peptide', k: 'corn peptide|玉米肽|玉米低聚肽', u: 'products/corn-peptide.html' },
    { n: 'Astragalus Polysaccharides (APS)', k: 'astragalus|huangqi|黄芪|黄芪多糖', u: 'products/astragalus-extract.html' },
    { n: 'Gypenoside', k: 'gypenoside|jiaogulan|绞股蓝|七叶胆', u: 'products/gypenosides.html' },
    { n: 'Phosphatidylserine', k: 'phosphatidylserine|磷脂酰丝氨酸|ps powder', u: 'products/phosphatidylserine.html' },
    { n: 'Lily Bulb Extract', k: 'lily|百合|百合多糖', u: 'products/lily-extract.html' },
    { n: 'Pueraria Root Extract', k: 'pueraria|kudzu|puerarin|葛根提取物', u: 'products/kudzu-root-extract.html' },
    { n: 'Prepared Rehmannia Extract', k: 'rehmannia|熟地|熟地黄|地黄', u: 'products/rehmannia-extract.html' },
  ];

  document.querySelectorAll('form[data-product-search]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var inp = form.querySelector('input[name="q"]');
      var q = (inp && inp.value ? inp.value : '').trim().toLowerCase();
      if (!q) { e.preventDefault(); return; }
      e.preventDefault();
      var P = (location.pathname.indexOf('/products/') > -1 || location.pathname.indexOf('/blog/') > -1) ? '../' : '';
      var best = null, bestScore = 0;
      PRODUCT_INDEX.forEach(function (p) {
        var score = 0;
        var name = p.n.toLowerCase();
        if (name === q) { score = 1000; }
        else if (name.indexOf(q) === 0) { score = 500 + q.length; }
        else if (name.indexOf(q) > -1) { score = 400 + q.length; }
        p.k.split('|').forEach(function (kw) {
          kw = kw.trim().toLowerCase();
          if (!kw) { return; }
          if (kw === q) { score = Math.max(score, 900); }
          else if (kw.indexOf(q) === 0 && q.length >= 2) { score = Math.max(score, 600 + kw.length); }
          else if (q.indexOf(kw) > -1 && kw.length >= 2) { score = Math.max(score, 300 + kw.length); }
          else if (kw.indexOf(q) > -1 && q.length >= 3) { score = Math.max(score, 200 + kw.length); }
        });
        if (score > bestScore) { best = p; bestScore = score; }
      });
      if (best) { location.href = P + best.u; }
      else { location.href = P + 'products/index.html?q=' + encodeURIComponent(q); }
    });
  });

  // keep the search dropdown right under the sticky header
  var sBtn = document.querySelector('[data-search-toggle]');
  var sBar = document.getElementById('search-bar');
  var sHdr = document.querySelector('.site-header');
  if (sBtn && sBar && sHdr) {
    sBtn.addEventListener('click', function () {
      if (!sBar.hidden) { sBar.style.top = sHdr.getBoundingClientRect().bottom + 'px'; }
    });
  }
})();
