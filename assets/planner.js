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
    if (key && G[key] && G[key].length) return '<div class="th g" role="button" tabindex="0" data-g="' + h(key) + '" data-cap="' + h(cap) + '" aria-label="' + h(cap) + ' 사진 보기"><img src="' + h(G[key][0]) + '" alt="" loading="lazy" decoding="async">' + (G[key].length > 1 ? '<span class="tn">' + G[key].length + '</span>' : '') + '</div>';
    return '';
  }
  function icon(type) { return '<span class="ic ' + h(type) + '" aria-hidden="true">' + (SVG[type] || SVG.pin) + '</span>'; }
  function links(it) {
    var out = [], MN = window.MENUS || {};
    if (it.menu && MN[it.menu]) out.push('<a class="mbtn" href="menu.html?k=' + encodeURIComponent(it.menu) + (it.menuId ? '&m=' + encodeURIComponent(it.menuId) : '') + '">메뉴</a>');
    if (it.q) out.push('<a href="' + mapUrl(it.q) + '" target="_blank" rel="noopener">지도</a>');
    var site = it.site || (it.key && L[it.key] && L[it.key].site);
    if (site) out.push('<a href="' + h(site) + '" target="_blank" rel="noopener">웹사이트</a>');
    if (it.ig) out.push('<a href="' + h(it.ig) + '" target="_blank" rel="noopener">인스타</a>');
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
  function renderPickRow(it, day) {
    var set = T.picks && T.picks[it.pick]; if (!set) return '';
    var n = set.items.filter(function (x) { return !(x.hours && /휴무/.test(x.hours[day.dow] || '')); }).length;
    var city = set.title.split(' · ')[0];
    return '<li class="pickrow"><button type="button" class="pickgo" data-pickset="' + h(it.pick) + '">' +
      '<span class="pgi" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>' +
      '<span class="pgt"><b>둘이서 골라 가기</b><span>' + h(it.when) + '</span></span>' +
      '<span class="pgn">' + h(city) + ' ' + n + '곳</span></button></li>';
  }
  function renderAlt(a) {
    return '<details class="altbox"><summary><span class="tag alt">대안</span><span class="altn">' + h(a.name) + '</span></summary><div class="altbody">' +
      (a.sub ? '<div class="sb">' + h(a.sub) + '</div>' : '') + (a.addr ? '<div class="ad">' + h(a.addr) + '</div>' : '') + links(a) +
      (a.note ? '<div class="pn plan"><b>메모</b>' + h(a.note) + '</div>' : '') + '</div></details>';
  }
  function renderItem(it, i, prev, alts) {
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
      (it.note ? '<div class="pn plan"><b>메모</b>' + h(it.note) + '</div>' : '') +
      (alts && alts.length ? alts.map(renderAlt).join('') : '') +
      '</div><div class="rt">' + right + '</div></li>';
  }
  // ── weather card ─────────────────────────────────────────────
  var WXI = {
    sun: '<svg viewBox="0 0 48 48" class="wsun"><g class="ray" stroke="#E9A93A" stroke-width="3" stroke-linecap="round"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2"/></g><circle cx="24" cy="24" r="9" fill="#F5C04E"/></svg>',
    msun: '<svg viewBox="0 0 48 48"><g class="ray" stroke="#E9A93A" stroke-width="2.6" stroke-linecap="round"><path d="M18 3v5M18 30v4M3 18h5M28 18h3M7.4 7.4l3.4 3.4M28.6 7.4l-3.4 3.4M7.4 28.6l3.4-3.4"/></g><circle cx="18" cy="18" r="7.5" fill="#F5C04E"/><path class="cl" d="M20 40h17a7 7 0 0 0 0-14 9 9 0 0 0-17 3 5.5 5.5 0 0 0 0 11z" fill="#fff" stroke="#B9C6D2" stroke-width="1.6"/></svg>',
    cloud: '<svg viewBox="0 0 48 48"><path class="cl2" d="M14 30h18a6 6 0 0 0 0-12 8 8 0 0 0-15 2.5 4.8 4.8 0 0 0-3 9.5z" fill="#DCE3EA"/><path class="cl" d="M10 40h22a8 8 0 0 0 0-16 10.5 10.5 0 0 0-20 3.5 6.3 6.3 0 0 0-2 12.5z" fill="#fff" stroke="#9FB0C0" stroke-width="1.8"/></svg>',
    rain: '<svg viewBox="0 0 48 48"><path class="cl" d="M10 30h22a8 8 0 0 0 0-16 10.5 10.5 0 0 0-20 3.5 6.3 6.3 0 0 0-2 12.5z" fill="#fff" stroke="#8FA2B5" stroke-width="1.8"/><g class="drop" stroke="#4F86B7" stroke-width="2.6" stroke-linecap="round"><path d="M15 35l-2 5"/><path d="M23 35l-2 5"/><path d="M31 35l-2 5"/></g></svg>',
    shower: '<svg viewBox="0 0 48 48"><g class="ray" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M17 3v4M5 15h4M8.5 6.5l2.8 2.8M25.5 6.5l-2.8 2.8"/></g><circle cx="17" cy="15" r="6.5" fill="#F5C04E"/><path class="cl" d="M13 33h21a7.5 7.5 0 0 0 0-15 10 10 0 0 0-19 3.3A6 6 0 0 0 13 33z" fill="#fff" stroke="#8FA2B5" stroke-width="1.8"/><g class="drop" stroke="#4F86B7" stroke-width="2.6" stroke-linecap="round"><path d="M19 37l-1.8 4.5"/><path d="M27 37l-1.8 4.5"/></g></svg>',
    storm: '<svg viewBox="0 0 48 48"><path class="cl" d="M10 30h22a8 8 0 0 0 0-16 10.5 10.5 0 0 0-20 3.5 6.3 6.3 0 0 0-2 12.5z" fill="#EEF1F4" stroke="#7D8FA2" stroke-width="1.8"/><path class="bolt" d="M24 31l-5 8h5l-3 7 8-10h-5l3-5z" fill="#F2B23E"/></svg>'
  };
  function wxKind(sky) {
    if (/뇌우|천둥/.test(sky)) return 'storm';
    if (/소나기|비/.test(sky)) return /맑|구름 조금|덥/.test(sky) ? 'shower' : 'rain';
    if (/흐/.test(sky)) return 'cloud';
    if (/구름|대체로/.test(sky)) return 'msun';
    return 'sun';
  }
  function rainMax(r) { var n = String(r || '').match(/\d+/g); return n ? Math.max.apply(null, n.map(Number)) : 0; }
  function wxCard(w) {
    var kind = wxKind(w.sky || ''), rm = rainMax(w.rain);
    var lo = +w.lo, hi = +w.hi, a = Math.max(0, Math.min(100, (lo - 10) / 25 * 100)), b = Math.max(a + 6, Math.min(100, (hi - 10) / 25 * 100));
    var drops = '';
    for (var i = 1; i <= 5; i++) drops += '<i class="' + (rm >= i * 20 - 10 ? 'on' : '') + '"></i>';
    var feel = hi >= 27 ? '반팔 날씨' : hi >= 22 ? '가벼운 옷차림' : hi >= 18 ? '얇은 겉옷' : '따뜻한 겉옷';
    return '<div class="wxc wx-' + kind + '">' +
      '<div class="wxi" aria-hidden="true">' + WXI[kind] + '</div>' +
      '<div class="wxm">' + (w.city ? '<div class="wcity">' + h(w.city) + '</div>' : '') +
        '<div class="wt"><b>' + h(hi) + '°</b><span>/ ' + h(lo) + '°</span></div>' +
        '<div class="wsky">' + h(w.sky || '') + '</div></div>' +
      '<div class="wbar" aria-hidden="true"><span style="left:' + a.toFixed(0) + '%;width:' + (b - a).toFixed(0) + '%"></span></div>' +
      '<div class="wfoot"><span class="wrain" aria-label="비 올 확률 ' + h(w.rain || '0%') + '"><span class="wdrops" aria-hidden="true">' + drops + '</span>비 ' + h(w.rain || '0%') + '</span><span class="wfeel">' + feel + '</span></div>' +
    '</div>';
  }
  // two-city days: start on the arrival city, except on the day itself before noon
  function defaultCity(day, count) {
    if (count < 2) return 0;
    var now = nowParts(day.tz);
    return (now.date === day.date && now.min < 12 * 60) ? 0 : count - 1;
  }
  function seg(group, names, sel) {
    return '<div class="seg" role="group" aria-label="도시 선택" data-seg="' + group + '">' + names.map(function (nm, i) {
      return '<button type="button" data-i="' + i + '" aria-pressed="' + (i === sel) + '">' + h(nm) + '</button>';
    }).join('') + '</div>';
  }
  function renderWx(day) {
    if (!day.wx) return '';
    var note = '<p class="wxnote">' + h(T.wxNote || '') + '</p>';
    if (day.wx.length < 2) return '<div class="wxs">' + day.wx.map(wxCard).join('') + '</div>' + note;
    var sel = defaultCity(day, day.wx.length);
    return '<div class="wxhead"><span class="lbl">날씨</span>' + seg('wx', day.wx.map(function (w) { return w.city || ''; }), sel) + '</div>' +
      '<div class="wxs">' + day.wx.map(function (w, i) { return '<div data-segp="wx" data-i="' + i + '"' + (i === sel ? '' : ' hidden') + '>' + wxCard(w) + '</div>'; }).join('') + '</div>' + note;
  }
  function renderCover(day) {
    var k = day.cover; if (!k || !G[k] || !G[k].length) return '';
    var cap = day.coverCap || day.title;
    return '<div class="cover g" role="button" tabindex="0" data-g="' + h(k) + '" data-cap="' + h(cap) + '" aria-label="' + h(cap) + ' 사진 ' + G[k].length + '장 보기">' +
      '<img src="' + h(G[k][0]) + '" alt="" decoding="async" fetchpriority="high">' +
      '<span class="ccap">' + h(cap) + '</span>' + (G[k].length > 1 ? '<span class="ccount">사진 ' + G[k].length + '장</span>' : '') + '</div>';
  }
  function photoCount(key) { return key && G[key] ? G[key].length : 0; }
  var PCAT = { cafe: ['카페·디저트', 'dining'], bar: ['바·라운지', 'dining'], food: ['맛집', 'dining'], sight: ['명소·산책', 'walk'], shop: ['쇼핑', 'shop'] };
  var PORDER = ['cafe', 'bar', 'food', 'sight', 'shop'];
  function renderPack(day) {
    if (!day.pack) return '';
    var n = 0;
    return '<section class="pack" aria-label="짐 쌀 때 챙길 것"><div class="lbl">짐 쌀 때 체크리스트</div><h2>챙길 물건</h2>' +
      day.pack.map(function (g) {
        return '<div class="pg"><h3>' + h(g.t) + '</h3><ul>' + g.items.map(function (x) {
          var id = 'pk-' + (n++);
          return '<li><label><input type="checkbox" data-pk="' + id + '"><span>' + h(x) + '</span></label></li>';
        }).join('') + '</ul></div>';
      }).join('') + '<p class="small pnote2">체크한 항목은 이 휴대폰에만 저장됩니다.</p></section>';
  }
  function renderPicks(day) {
    if (!day.picks || !T.picks) return '';
    var multi = day.picks.length > 1, psel = defaultCity(day, day.picks.length);
    var pnames = day.picks.map(function (p) { var s = T.picks[p.set]; return s ? s.title.split(' · ')[0] : ''; });
    return day.picks.map(function (p, n) {
      var set = T.picks[p.set]; if (!set) return '';
      var cats = PORDER.filter(function (c) { return set.items.some(function (x) { return x.cat === c; }); });
      var chips = '<button type="button" class="pf" data-pf="all" aria-pressed="true">전체</button>' +
        cats.map(function (c) { return '<button type="button" class="pf" data-pf="' + c + '" aria-pressed="false">' + h(PCAT[c][0]) + '</button>'; }).join('') +
        '<button type="button" class="pf" data-pf="date" aria-pressed="false">♥ 데이트</button>';
      var dow = day.dow;
      var items = set.items.filter(function (x) { return !(x.hours && /휴무/.test(x.hours[dow] || '')); }).sort(function (a, b) { return PORDER.indexOf(a.cat) - PORDER.indexOf(b.cat); }).map(function (x) {
        var c = PCAT[x.cat] || ['', 'pin'];
        return '<li class="pk" data-cat="' + h(x.cat) + '"' + (x.date ? ' data-date="1"' : '') + '>' +
          (thumb(x.key, x.name) || '<span class="ic ' + h(c[1]) + '" aria-hidden="true">' + (SVG[c[1]] || SVG.pin) + '</span>') +
          '<div class="bd"><div class="nm">' + h(x.name) + (x.date ? '<span class="tag love">데이트</span>' : '') + '</div>' +
          '<div class="pm">' + h(c[0]) + ' · ' + h(x.walk) + '</div>' +
          (x.hours && x.hours[dow] ? '<div class="phr' + (/휴무/.test(x.hours[dow]) ? ' off' : '') + '">' + h(dow) + '요일 ' + h(x.hours[dow]) + '</div>' : '') +
          (x.sub ? '<div class="sb">' + h(x.sub) + '</div>' : '') +
          (x.tip ? '<div class="ptip">' + h(x.tip) + '</div>' : '') +
          links(x) + '</div></li>';
      }).join('');
      return '<section class="picks" data-set="' + h(p.set) + '" aria-label="' + h(set.title) + ' 골라 가기"' + (multi ? ' data-segp="pk" data-i="' + n + '"' + (n === psel ? '' : ' hidden') : '') + '>' +
        '<div class="lbl">둘이서 골라 가기</div>' + (multi ? seg('pk', pnames, n) : '') +
        '<h2>' + h(set.title) + '</h2>' +
        '<p class="pwhen">' + (p.when ? '<b>언제</b>' + h(p.when) + ' · ' : '') + h(set.base) + ' · 함께 가도, 두 분만 다녀와도 좋은 곳</p>' +
        '<div class="pfs" role="group" aria-label="종류별 보기">' + chips + '</div>' +
        '<ul class="pks">' + items + '</ul>' +
        '<p class="small pnote2">운영 시간은 가기 전에 지도 링크에서 확인하세요.</p></section>';
    }).join('');
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
    function stop(x) { return !x.via && !x.pick && !(x.alt && x.under); }
    for (var i = 0; i < items.length; i++) if (items[i].via) { for (var j = i + 1; j < items.length; j++) if (stop(items[j])) { items[i].next = items[j]; break; } }
    var nested = items.filter(function (x) { return x.alt && x.under; });
    var prev = null, rows = [];
    items.forEach(function (it, i) {
      if (it.alt && it.under) return;  // shown folded under the item it replaces
      if (it.pick) { rows.push(renderPickRow(it, day)); return; }
      rows.push(renderItem(it, i, prev, it.via ? null : nested.filter(function (a) { return a.under === it.t; })));
      if (!it.via) prev = it;
    });
    var stay = day.stay ? '<div class="stay">' + (day.stay.key ? thumb(day.stay.key, day.stay.name) : '<span class="ic hotel" aria-hidden="true">' + SVG.hotel + '</span>') +
      '<div class="bd"><div class="lbl">숙박' + (day.stay.nights ? ' · ' + h(day.stay.nights) : '') + '</div><div class="nm">' + h(day.stay.name) + '</div>' + (day.stay.sub ? '<div class="sb">' + h(day.stay.sub) + '</div>' : '') + links(day.stay) + '</div></div>' : '';
    var route = dayRoute(day);
    var bring = day.bring && day.bring.length ? '<details class="bring"><summary><span class="bsum">오늘 챙길 것</span><span class="bcnt">' + day.bring.length + '가지</span></summary><ul class="blist">' + day.bring.map(function (b) { return '<li>' + h(b) + '</li>'; }).join('') + '</ul></details>' : '';
    var notes = day.notes ? '<div class="pnote plan"><div class="lbl">기획 메모</div><p>' + h(day.notes) + '</p></div>' : '';
    var md = day.date.slice(5).split('-');
    return '<section class="dayv" id="' + h(day.id) + '" data-date="' + h(day.date) + '" data-tz="' + h(day.tz) + '">' +
      renderCover(day) + '<div class="dhead"><div class="eyebrow">Day ' + (day.n + 1) + ' · ' + h(DOW[day.dow] || day.dow) + ' · ' + h(day.city) + '</div>' +
      '<h1>' + (+md[0]) + '월 ' + (+md[1]) + '일 <small>' + h(day.title) + '</small></h1>' +
      '<p class="tz">' + h(day.tzLabel || '') + '</p>' +
      renderWx(day) + bring +
      '<div class="now" hidden></div>' +
      (day.intro ? '<p class="dintro">' + h(day.intro) + '</p>' : '') +
      (route ? '<div class="ln top"><a href="' + route + '" target="_blank" rel="noopener">오늘 동선 지도</a></div>' : '') +
      '</div>' + stay + '<ol class="tl">' + rows.join('') + '</ol>' + renderPicks(day) + notes + '</section>';
  }
  function renderInfo() {
    var fl = '<div class="card"><div class="lbl">항공</div><p class="small">예약번호와 승객 정보는 이 페이지에 싣지 않습니다. 항공사 앱에서 확인하세요.</p>' + T.flights.map(function (f) {
      return '<div class="fl"><div class="fd">' + h(f.date) + '</div><div class="fc">' + h(f.code) + (f.st && STATUS[f.st] ? '<span class="st ' + h(f.st) + ' plan">' + STATUS[f.st] + '</span>' : '') + '</div><div class="fr">' + h(f.route) + '</div><div class="ft">' + h(f.time) + ' · ' + h(f.dur) + '</div><div class="fs small">' + h(f.cls) + ' · 수하물 ' + h(f.bag) + (f.alt ? ' · ' + h(f.alt) : '') + '</div></div>';
    }).join('') + '</div>';
    var ho = '<div class="card"><div class="lbl">숙소</div>' + T.hotels.map(function (x) {
      return '<div class="stay">' + (x.key ? thumb(x.key, x.name) : '<span class="ic hotel" aria-hidden="true">' + SVG.hotel + '</span>') + '<div class="bd"><div class="nm">' + h(x.name) + '</div><div class="sb">' + h(x.dates) + '</div><div class="ad">' + h(x.addr) + '</div>' + (x.sub ? '<div class="sb">' + h(x.sub) + '</div>' : '') + links(x) + '</div></div>';
    }).join('') + '</div>';
    var inf = T.info.map(function (sec) {
      return '<div class="card"><div class="lbl">' + h(sec.h) + '</div><dl>' + sec.rows.map(function (r) { return '<div><dt>' + h(r[0]) + '</dt><dd>' + h(r[1]) + '</dd></div>'; }).join('') + '</dl></div>';
    }).join('');
    var bk = [];
    T.days.forEach(function (d) {
      d.items.forEach(function (it) { if (!it.via && it.st && it.st !== 'ok') bk.push('<li><span class="st ' + h(it.st) + '">' + STATUS[it.st] + '</span><b>' + (+d.date.slice(8)) + '일</b> ' + h(it.t || '') + ' ' + h(it.name) + (it.note ? '<div class="sb">' + h(it.note) + '</div>' : '') + '</li>'); });
    });
    var book = '<div class="card plan"><div class="lbl">예약 현황 · 남은 일</div><ul class="bk">' + bk.join('') + '</ul></div>';
    var packDay = T.days.filter(function (d) { return d.pack; })[0];
    return '<section class="dayv info" id="info"><div class="dhead"><div class="eyebrow">Essentials</div><h1>여행 정보 <small>짐 · 항공 · 숙소 · 시차 · 연락처</small></h1></div>' + (packDay ? renderPack(packDay) : '') + fl + ho + book + inf + '</section>';
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
    return todayId() || 'info';
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
    view.innerHTML = html(id); if (typeof restorePack === "function") restorePack();
    tabs.querySelectorAll('a').forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = (id === 'info' ? '여행 정보' : view.querySelector('h1').textContent.replace(/\s+/g, ' ')) + ' · 여행 플래너';
    view.querySelectorAll('img').forEach(function (im) { im.addEventListener('error', function () { (im.closest('.th, .cover') || im).remove(); }, { once: true }); });
    markNow();
    if (scroll) window.scrollTo(0, 0);
  }
  // day tabs
  var today = todayId();
  tabs.innerHTML = '<a href="#info" class="dtab" aria-label="여행 정보 · 짐 체크리스트"><b>i</b><span>정보</span><i>짐·항공</i></a>' + T.days.map(function (d) {
    return '<a href="#' + h(d.id) + '" class="dtab' + (d.id === today ? ' today' : '') + '" aria-label="' + h(d.date.slice(5).replace('-', '월 ')) + '일 ' + h(DOW[d.dow]) + ' · ' + h(d.city) + '"><b>' + (+d.date.slice(8)) + '</b><span>' + h(d.dow) + '</span><i>' + h(d.short || d.city) + '</i></a>';
  }).join('');
  // planner mode — host only. Guests never see the 기획 button or notes.
  // Open itinerary.html?host=<HOST_KEY> once on the host's phone to unlock it there; ?host=off locks it again.
  var mode = document.getElementById('pmode'), KEY = 'planner-mode', HOST = 'planner-host', HOST_KEY = 'jk988dfa';
  var hostParam = new URLSearchParams(location.search).get('host');
  try {
    if (hostParam === HOST_KEY) localStorage.setItem(HOST, '1');
    else if (hostParam === 'off') { localStorage.removeItem(HOST); localStorage.removeItem(KEY); }
  } catch (_) {}
  var isHost = hostParam === HOST_KEY;
  if (!isHost && hostParam !== 'off') try { isHost = localStorage.getItem(HOST) === '1'; } catch (_) {}
  if (hostParam !== null && history.replaceState) history.replaceState(null, '', location.pathname + location.hash);
  mode.hidden = !isHost;
  function setMode(on, save) {
    on = on && isHost;
    document.body.classList.toggle('plan-on', on);
    mode.setAttribute('aria-pressed', String(on));
    if (save) try { localStorage.setItem(KEY, on ? '1' : ''); } catch (_) {}
  }
  var saved = ''; try { saved = localStorage.getItem(KEY) || ''; } catch (_) {}
  setMode(saved === '1', false);
  mode.addEventListener('click', function () { setMode(!document.body.classList.contains('plan-on'), true); });
  view.addEventListener('change', function (e) {
    var c = e.target.closest('input[data-pk]'); if (!c) return;
    try { var st = JSON.parse(localStorage.getItem('hsj-pack') || '{}'); st[c.dataset.pk] = c.checked; localStorage.setItem('hsj-pack', JSON.stringify(st)); } catch (x) {}
  });
  function restorePack() {
    try { var st = JSON.parse(localStorage.getItem('hsj-pack') || '{}'); view.querySelectorAll('input[data-pk]').forEach(function (c) { c.checked = !!st[c.dataset.pk]; }); } catch (x) {}
  }
  view.addEventListener('click', function (e) {
    var pg = e.target.closest('.pickgo');
    if (pg) {
      var dayEl = pg.closest('.dayv'), sec = dayEl.querySelector('section.picks[data-set="' + pg.dataset.pickset + '"]');
      if (!sec) return;
      if (sec.hidden && sec.dataset.i != null) { var b2 = dayEl.querySelector('[data-seg="pk"] button[data-i="' + sec.dataset.i + '"]'); if (b2) b2.click(); }
      var top = sec.getBoundingClientRect().top + window.scrollY - (document.querySelector('.pbar').offsetHeight + document.querySelector('.dtabs').offsetHeight + 8);
      window.scrollTo({ top: top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      return;
    }
    var sb = e.target.closest('.seg button');
    if (sb) {
      var group = sb.parentNode.dataset.seg, i = sb.dataset.i, day = sb.closest('.dayv');
      day.querySelectorAll('[data-segp="' + group + '"]').forEach(function (p) { p.hidden = p.dataset.i !== i; });
      day.querySelectorAll('[data-seg="' + group + '"] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.i === i)); });
      return;
    }
    var b = e.target.closest('.pf'); if (!b) return;
    var sec = b.closest('.picks'), f = b.dataset.pf;
    sec.querySelectorAll('.pf').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    sec.querySelectorAll('.pk').forEach(function (li) {
      li.hidden = !(f === 'all' || (f === 'date' ? li.dataset.date === '1' : li.dataset.cat === f));
    });
  });
  // Photo viewer (site.js) closes with history.back(); the browser then jumps to the #day anchor.
  // Remember where the guest was when they opened a photo and put them back there.
  var photoY = null;
  function rememberY(e) { if (e.target.closest && e.target.closest('.g') && !e.target.closest('a')) photoY = window.scrollY; }
  document.addEventListener('click', rememberY, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') rememberY(e); }, true);
  window.addEventListener('popstate', function () {
    if (photoY == null) return;
    var y = photoY; photoY = null;
    window.scrollTo(0, y);
    requestAnimationFrame(function () { window.scrollTo(0, y); });
    setTimeout(function () { window.scrollTo(0, y); }, 60);
  });
  window.addEventListener('hashchange', function () { paint(true); });
  paint(false);
  setInterval(markNow, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) markNow(); });
})();
