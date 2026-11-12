/* 메뉴 보기: menu.html?k=<key>[&m=<menu id>] — assets/menus/<key>/menu.json 을 읽어 한글/영어 메뉴판 이미지를 보여 줍니다.
   이미지는 화면 폭에 맞춰 나오고, 두 손가락으로 확대할 수 있습니다(페이지 확대를 막지 않음). */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search), key = q.get('k') || '', want = q.get('m');
  var view = document.getElementById('mview'), langBox = document.getElementById('mlang');
  var LKEY = 'menu-lang', lang = 'ko';
  try { lang = localStorage.getItem(LKEY) === 'en' ? 'en' : 'ko'; } catch (_) {}
  if (q.get('lang') === 'en' || q.get('lang') === 'ko') lang = q.get('lang');
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var back = document.getElementById('mback');
  back.addEventListener('click', function (e) {
    if (document.referrer && document.referrer.indexOf(location.origin) === 0 && /itinerary\.html/.test(document.referrer) && history.length > 1) { e.preventDefault(); history.back(); }
  });

  if (!/^[a-z0-9_]+$/.test(key)) { view.innerHTML = '<p class="mempty">메뉴를 찾을 수 없습니다.</p>'; return; }
  fetch('assets/menus/' + key + '/menu.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(render).catch(function () {
    view.innerHTML = '<p class="mempty">메뉴를 불러오지 못했습니다. 잠시 뒤 다시 열어 주세요.</p>';
  });

  var data, cur;
  function render(d) {
    data = d;
    document.getElementById('mname').textContent = d.name;
    document.title = d.name + ' 메뉴 · 여행 플래너';
    if (!d.menus || !d.menus.length) {
      view.innerHTML = '<p class="mempty">' + h(d.note_ko || '이 가게는 온라인에 공개된 메뉴가 없습니다. 현장에서 메뉴판을 확인해 주세요.') + '</p>';
      langBox.hidden = true; return;
    }
    cur = d.menus.filter(function (m) { return m.id === want; })[0] || d.menus[0];
    paint();
  }
  function paint() {
    var d = data, m = cur;
    document.getElementById('msub').textContent = m.title_ko + (m.title_en ? ' · ' + m.title_en : '');
    langBox.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    var tabs = d.menus.length > 1 ? '<div class="mtabs" role="group" aria-label="메뉴 종류">' + d.menus.map(function (x) {
      return '<button type="button" class="pf" data-m="' + h(x.id) + '" aria-pressed="' + (x === m) + '">' + h(x.title_ko) + '</button>';
    }).join('') + '</div>' : '';
    var warn = '';
    if (m.sample) warn += '<p class="mwarn">예전에 공개된 메뉴입니다(' + h(m.updated || '') + '). 지금 메뉴와 다를 수 있어요.</p>';
    else if (d.fine_dining) warn += '<p class="mwarn">코스 요리 중심이라 메뉴가 자주 바뀝니다. 실제 메뉴와 다를 수 있어요.</p>';
    var meta = '<p class="mmeta">' + (m.updated ? '메뉴 기준 ' + h(m.updated) : '') +
      (m.source_file || m.source_page ? (m.updated ? ' · ' : '') + '<a href="' + h(m.source_file || m.source_page) + '" target="_blank" rel="noopener">원본 메뉴</a>' : '') + '</p>';
    var tip = '<p class="mtip">' + (lang === 'ko'
      ? '두 손가락으로 벌려 확대해 보세요. 주문할 때는 위에서 <b>English</b>로 바꿔 직원에게 보여 주시면 됩니다.'
      : 'Showing the original menu. Point at the dish to order. <b>한글</b>로 바꾸면 한국어 메뉴가 보입니다.') + '</p>';
    var pages = m.pages.map(function (p, i) {
      return '<figure class="mpage"><img src="' + h(lang === 'en' ? p.en : p.ko) + '" data-ko="' + h(p.ko) + '" data-en="' + h(p.en) + '" alt="' + h(d.name + ' ' + m.title_ko + ' ' + (i + 1) + '쪽 (' + (lang === 'en' ? '영어' : '한글') + ')') + '"' + (i ? ' loading="lazy"' : '') + ' decoding="async"></figure>';
    }).join('');
    view.innerHTML = tabs + warn + (d.note_ko ? '<p class="mnote">' + h(d.note_ko) + '</p>' : '') + tip + '<div class="mpages">' + pages + '</div>' + meta;
    // warm the other language so flipping is instant
    m.pages.forEach(function (p) { var im = new Image(); im.src = lang === 'en' ? p.ko : p.en; });
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem(LKEY, l); } catch (_) {}
    var y = window.scrollY;
    paint();
    window.scrollTo(0, y);
  }
  langBox.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && data) setLang(b.dataset.lang); });
  view.addEventListener('click', function (e) {
    var b = e.target.closest('.mtabs .pf'); if (!b) return;
    cur = data.menus.filter(function (x) { return x.id === b.dataset.m; })[0] || cur;
    try { history.replaceState(null, '', '?k=' + encodeURIComponent(key) + '&m=' + encodeURIComponent(cur.id)); } catch (_) {}
    paint(); window.scrollTo(0, 0);
  });
})();
