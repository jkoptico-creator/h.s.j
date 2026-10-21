/* 여행 플래너 화면. 데이터는 assets/trip-data.js, 사진·링크는 assets/places.js. */
(function () {
  'use strict';
  var T = window.TRIP, G = window.GALLERY || {}, L = window.LINKS || {};
  if (!T) return;
  var view = document.getElementById('view'), tabs = document.getElementById('dtabs');
  var SVG = {
    plane: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
    car: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
    walk: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>',
    ferry: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>',
    buggy: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 7h-2V5c0-1.1-.9-2-2-2H9C7.9 3 7 3.9 7 5v2H5c-1.1 0-2 .9-2 2v7h2.05A2.5 2.5 0 0 0 9.5 18.5 2.5 2.5 0 0 0 11.95 16h.1a2.5 2.5 0 0 0 4.9 0H21V9c0-1.1-.9-2-2-2zM9 5h6v2H9V5zm.5 12.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM19 14h-1.26a2.5 2.5 0 0 0-4.48 0h-.52a2.5 2.5 0 0 0-4.48 0H5V9h14v5z"/></svg>',
    hotel: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>',
    dining: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>',
    golf: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 18c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM17 5.92 9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z"/></svg>',
    show: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 16.5C2 19.54 4.46 22 7.5 22s5.5-2.46 5.5-5.5V10H2v6.5zm5.5 3.5C5.57 20 4 18.43 4 16.5V12h7v4.5c0 1.93-1.57 3.5-3.5 3.5zM4.5 14h2v2h-2zm4 0h2v2h-2zM11 2H2v6h11.5c.6-1.1 1.6-2 2.8-2.5L11 2zm-7 4V4h5l2.1 2H4zm12 4.5c-.5 0-1 .1-1.5.3V8H24v8.5c0 3.04-2.46 5.5-5.5 5.5-2.08 0-3.88-1.16-4.82-2.86.52.21 1.08.36 1.66.36 1.93 0 3.5-1.57 3.5-3.5V12h-2.66c.36-.83 1.27-1.5 2.32-1.5zM20 14h2v2h-2zm-4 0h2v2h-2z"/></svg>',
    spa: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.55 12c-1.07-.71-2.25-1.27-3.53-1.61 1.28.34 2.46.9 3.53 1.61zm10.43-1.61c-1.29.34-2.49.91-3.57 1.64 1.08-.73 2.28-1.3 3.57-1.64zm-4.12-2.17C14.04 6.79 13.03 5.07 12 3.5c-1.03 1.57-2.04 3.29-2.86 4.72.83 1.23 1.84 2.48 2.86 3.6 1.02-1.12 2.03-2.37 2.86-3.6zM12 15.45C9.85 12.17 6.18 10 2 10c0 5.32 3.36 9.82 8.03 11.49.63.23 1.29.4 1.97.51.68-.12 1.33-.29 1.97-.51C18.64 19.82 22 15.32 22 10c-4.18 0-7.85 2.17-10 5.45z"/></svg>',
    boat: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 13.5 2.25 9.5h1.5L3 13.5zM19 13V6a1 1 0 0 0-1-1h-2V3H8v2H6a1 1 0 0 0-1 1v7l-2.46.82a1 1 0 0 0-.66 1.22L3.5 20h.05c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.62-5.96a1 1 0 0 0-.66-1.22L19 13zM7 7h10v5.4l-5-1.67-5 1.67V7zm13 16c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 22.53 5.39 23 4 23H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2z"/></svg>',
    shop: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'
  };
  var STATUS = { ok: '예약 완료', need: '예약 필요', ask: '문의 중', chk: '확인 필요' };
  var VIA_MODE = { car: 'driving', walk: 'walking', ferry: 'transit', buggy: 'driving', plane: 'driving' };
  var VIA_ICON = { car: 'car', walk: 'walk', ferry: 'ferry', buggy: 'buggy', plane: 'plane' };
  var DOW = { '일': '일요일', '월': '월요일', '화': '화요일', '수': '수요일', '목': '목요일', '금': '금요일', '토': '토요일' };

  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mapUrl(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function dirUrl(a, b, mode) { return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(a) + '&destination=' + encodeURIComponent(b) + '&travelmode=' + (mode || 'driving'); }
  function telUrl(t) { return 'tel:' + String(t).replace(/[^+\d]/g, ''); }
  function minutesOf(t) { var m = /(\d{1,2}):(\d{2})/.exec(t || ''); return m ? (+m[1]) * 60 + (+m[2]) : null; }
  function nowParts(tz) {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit' });
      var p = {}; f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      var hh = p.hour === '24' ? '00' : p.hour;
      return { date: p.year + '-' + p.month + '-' + p.day, hm: hh + ':' + p.minute, min: (+hh) * 60 + (+p.minute) };
    } catch (_) { var d = new Date(); return { date: d.toISOString().slice(0, 10), hm: ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2), min: d.getHours() * 60 + d.getMinutes() }; }
  }
  function todayId() { for (var i = 0; i < T.days.length; i++) if (nowParts(T.days[i].tz).date === T.days[i].date) return T.days[i].id; return null; }
  function thumb(key, cap) {
    if (key && G[key] && G[key].length) return '<div class="th g" role="button" tabindex="0" data-g="' + h(key) + '" data-cap="' + h(cap) + '" aria-label="' + h(cap) + ' 사진 보기"><img src="' + h(G[key][0]) + '" alt="" loading="lazy" decoding="async"></div>';
    return '';
  }
  function icon(type) { return '<span class="ic ' + h(type) + '" aria-hidden="true">' + (SVG[type] || SVG.pin) + '</span>'; }
  function links(it) {
    var out = [];
    if (it.q) out.push('<a href="' + mapUrl(it.q) + '" target="_blank" rel="noopener">지도</a>');
    var site = it.site || (it.key && L[it.key] && L[it.key].site);
    if (site) out.push('<a href="' + h(site) + '" target="_blank" rel="noopener">웹사이트</a>');
    if (it.tel) out.push('<a href="' + telUrl(it.tel) + '">전화 ' + h(it.tel) + '</a>');
    return out.length ? '<div class="ln">' + out.join('') + '</div>' : '';
  }
  function badge(it) {
    var out = '';
    if (it.opt) out += '<span class="tag">선택</span>';
    if (it.alt) out += '<span class="tag alt">대안</span>';
    if (it.st && STATUS[it.st]) out += '<span class="st ' + h(it.st) + ' plan">' + STATUS[it.st] + '</span>';
    return out;
  }
  function renderItem(it, i, prev) {
    if (it.via) {
      var dir = (prev && prev.q && it.next && it.next.q && it.via !== 'plane') ? '<a href="' + dirUrl(prev.q, it.next.q, it.mode || VIA_MODE[it.via]) + '" target="_blank" rel="noopener">길찾기</a>' : '';
      return '<li class="via"><span class="vi" aria-hidden="true">' + (SVG[VIA_ICON[it.via] || 'car']) + '</span><span class="vt">' + h(it.text) + dir + '</span></li>';
    }
    var cls = 'it' + (it.opt ? ' opt' : '') + (it.alt ? ' alt' : '');
    var tm = h(it.t || '');
    var m = /^(\d{1,2}:\d{2})\s*(.*)$/.exec(it.t || '');
    if (m) tm = h(m[1]) + (m[2] ? '<small>' + h(m[2]) + '</small>' : '');
    var right = thumb(it.key, it.name) || icon(it.type || 'pin');
    return '<li class="' + cls + '" data-min="' + (minutesOf(it.t) == null ? '' : minutesOf(it.t)) + '" data-tz="' + h(it.tz || '') + '">' +
      '<div class="tm">' + tm + '</div>' +
      '<div class="bd"><div class="nm">' + h(it.name) + badge(it) + '</div>' +
      (it.sub ? '<div class="sb">' + h(it.sub) + '</div>' : '') +
      (it.addr ? '<div class="ad">' + h(it.addr) + '</div>' : '') +
      links(it) +
      (it.cost ? '<div class="pn plan"><b>비용</b>' + h(it.cost) + '</div>' : '') +
      (it.note ? '<div class="pn plan"><b>메모</b>' + h(it.note) + '</div>' : '') +
      '</div><div class="rt">' + right + '</div></li>';
  }
  function dayRoute(day) {
    var stops = day.items.filter(function (x) { return !x.via && !x.alt && x.q; }).map(function (x) { return x.q; });
    var uniq = stops.filter(function (q, i) { return i === 0 || q !== stops[i - 1]; });
    if (uniq.length < 2) return '';
    var mid = uniq.slice(1, -1).slice(0, 9);
    return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(uniq[0]) + '&destination=' + encodeURIComponent(uniq[uniq.length - 1]) + (mid.length ? '&waypoints=' + encodeURIComponent(mid.join('|')) : '') + '&travelmode=driving';
  }
  function renderDay(day) {
    var items = day.items.slice();
    // give each via row a pointer to the next stop for directions
    for (var i = 0; i < items.length; i++) if (items[i].via) { for (var j = i + 1; j < items.length; j++) if (!items[j].via) { items[i].next = items[j]; break; } }
    var prev = null, rows = [];
    items.forEach(function (it, i) { rows.push(renderItem(it, i, prev)); if (!it.via) prev = it; });
    var stay = day.stay ? '<div class="stay">' + (day.stay.key ? thumb(day.stay.key, day.stay.name) : '<span class="ic hotel" aria-hidden="true">' + SVG.hotel + '</span>') +
      '<div class="bd"><div class="lbl">숙박' + (day.stay.nights ? ' · ' + h(day.stay.nights) : '') + '</div><div class="nm">' + h(day.stay.name) + '</div>' + (day.stay.sub ? '<div class="sb">' + h(day.stay.sub) + '</div>' : '') + links(day.stay) + '</div></div>' : '';
    var route = dayRoute(day);
    var bring = day.bring && day.bring.length ? '<div class="bring"><div class="lbl">챙길 것</div><div class="chips">' + day.bring.map(function (b) { return '<span>' + h(b) + '</span>'; }).join('') + '</div></div>' : '';
    var notes = day.notes ? '<div class="pnote plan"><div class="lbl">기획 메모</div><p>' + h(day.notes) + '</p></div>' : '';
    var md = day.date.slice(5).split('-');
    return '<section class="dayv" id="' + h(day.id) + '" data-date="' + h(day.date) + '" data-tz="' + h(day.tz) + '">' +
      '<div class="dhead"><div class="eyebrow">Day ' + (day.n + 1) + ' · ' + h(DOW[day.dow] || day.dow) + ' · ' + h(day.city) + '</div>' +
      '<h1>' + (+md[0]) + '월 ' + (+md[1]) + '일 <small>' + h(day.title) + '</small></h1>' +
      '<p class="tz">' + h(day.tzLabel || '') + '</p>' +
      '<div class="now" hidden></div>' +
      (day.intro ? '<p class="dintro">' + h(day.intro) + '</p>' : '') +
      (route ? '<div class="ln top"><a href="' + route + '" target="_blank" rel="noopener">오늘 동선 지도</a></div>' : '') +
      '</div>' + stay + '<ol class="tl">' + rows.join('') + '</ol>' + bring + notes + '</section>';
  }
  function renderInfo() {
    var fl = '<div class="card"><div class="lbl">항공</div><p class="small">예약번호와 승객 정보는 이 페이지에 싣지 않습니다. 항공사 앱에서 확인하세요.</p>' + T.flights.map(function (f) {
      return '<div class="fl"><div class="fd">' + h(f.date) + '</div><div class="fc">' + h(f.code) + (f.st && STATUS[f.st] ? '<span class="st ' + h(f.st) + ' plan">' + STATUS[f.st] + '</span>' : '') + '</div><div class="fr">' + h(f.route) + '</div><div class="ft">' + h(f.time) + ' · ' + h(f.dur) + '</div><div class="fs small">' + h(f.cls) + ' · 수하물 ' + h(f.bag) + (f.alt ? ' · ' + h(f.alt) : '') + '</div></div>';
    }).join('') + '</div>';
    var ho = '<div class="card"><div class="lbl">숙소</div>' + T.hotels.map(function (x) {
      return '<div class="stay">' + thumb(x.key, x.name) + '<div class="bd"><div class="nm">' + h(x.name) + '</div><div class="sb">' + h(x.dates) + '</div><div class="ad">' + h(x.addr) + '</div>' + (x.sub ? '<div class="sb">' + h(x.sub) + '</div>' : '') + links(x) + '</div></div>';
    }).join('') + '</div>';
    var inf = T.info.map(function (sec) {
      return '<div class="card"><div class="lbl">' + h(sec.h) + '</div><dl>' + sec.rows.map(function (r) { return '<div><dt>' + h(r[0]) + '</dt><dd>' + h(r[1]) + '</dd></div>'; }).join('') + '</dl></div>';
    }).join('');
    var bk = [];
    T.days.forEach(function (d) {
      d.items.forEach(function (it) { if (!it.via && it.st && it.st !== 'ok') bk.push('<li><span class="st ' + h(it.st) + '">' + STATUS[it.st] + '</span><b>' + (+d.date.slice(8)) + '일</b> ' + h(it.t || '') + ' ' + h(it.name) + (it.note ? '<div class="sb">' + h(it.note) + '</div>' : '') + '</li>'); });
    });
    var book = '<div class="card plan"><div class="lbl">예약 현황 · 남은 일</div><ul class="bk">' + bk.join('') + '</ul></div>';
    return '<section class="dayv info" id="info"><div class="dhead"><div class="eyebrow">Essentials</div><h1>여행 정보 <small>항공 · 숙소 · 시차 · 연락처</small></h1></div>' + fl + ho + book + inf + '</section>';
  }
  var cache = {};
  function html(id) {
    if (cache[id]) return cache[id];
    if (id === 'info') return (cache[id] = renderInfo());
    var day = T.days.filter(function (d) { return d.id === id; })[0];
    return day ? (cache[id] = renderDay(day)) : '';
  }
  function current() {
    var id = (location.hash || '').replace('#', '');
    if (id === 'info' || T.days.some(function (d) { return d.id === id; })) return id;
    return todayId() || T.days[0].id;
  }
  function markNow() {
    var sec = view.querySelector('.dayv'); if (!sec || sec.id === 'info') return;
    var now = nowParts(sec.dataset.tz), box = sec.querySelector('.now');
    if (now.date !== sec.dataset.date) { box.hidden = true; return; }
    var next = null;
    sec.querySelectorAll('.it').forEach(function (li) {
      li.classList.remove('past', 'next');
      if (li.dataset.min === '' || li.classList.contains('alt')) return;
      var n = li.dataset.tz ? nowParts(li.dataset.tz) : now;
      if (+li.dataset.min <= n.min) li.classList.add('past');
      else if (!next) next = li;
    });
    if (next) { next.classList.add('next'); box.innerHTML = '지금 ' + h(now.hm) + ' · 다음 일정 <b>' + h(next.querySelector('.tm').textContent) + ' ' + h(next.querySelector('.nm').childNodes[0].textContent) + '</b>'; }
    else box.innerHTML = '지금 ' + h(now.hm) + ' · 오늘 일정이 모두 끝났습니다';
    box.hidden = false;
  }
  function paint(scroll) {
    var id = current();
    view.innerHTML = html(id);
    tabs.querySelectorAll('a').forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = (id === 'info' ? '여행 정보' : view.querySelector('h1').textContent.replace(/\s+/g, ' ')) + ' · 여행 플래너';
    view.querySelectorAll('img').forEach(function (im) { im.addEventListener('error', function () { im.closest('.th').remove(); }, { once: true }); });
    markNow();
    if (scroll) window.scrollTo(0, 0);
  }
  // day tabs
  var today = todayId();
  tabs.innerHTML = T.days.map(function (d) {
    return '<a href="#' + h(d.id) + '" class="dtab' + (d.id === today ? ' today' : '') + '" aria-label="' + h(d.date.slice(5).replace('-', '월 ')) + '일 ' + h(DOW[d.dow]) + ' · ' + h(d.city) + '"><b>' + (+d.date.slice(8)) + '</b><span>' + h(d.dow) + '</span><i>' + h(d.short || d.city) + '</i></a>';
  }).join('') + '<a href="#info" class="dtab" aria-label="여행 정보"><b>i</b><span>정보</span><i>항공·숙소</i></a>';
  // planner mode
  var mode = document.getElementById('pmode'), KEY = 'planner-mode';
  function setMode(on, save) {
    document.body.classList.toggle('plan-on', on);
    mode.setAttribute('aria-pressed', String(on));
    if (save) try { localStorage.setItem(KEY, on ? '1' : ''); } catch (_) {}
  }
  var saved = ''; try { saved = localStorage.getItem(KEY) || ''; } catch (_) {}
  setMode(saved === '1', false);
  mode.addEventListener('click', function () { setMode(!document.body.classList.contains('plan-on'), true); });
  window.addEventListener('hashchange', function () { paint(true); });
  paint(false);
  setInterval(markNow, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) markNow(); });
})();
