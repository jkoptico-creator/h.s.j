/* Shared interactions. The combined edition embeds this file at build time. */
window.imgFb = function (im) {
  im.onerror = null;
  im.classList.add('ok');
  im.hidden = true;
  var holder = im.parentElement;
  if (!holder.querySelector('.image-error')) {
    var notice = document.createElement('span');
    notice.className = 'image-error';
    notice.textContent = '사진을 불러오지 못했습니다. 공식 사이트에서 확인해 주세요.';
    holder.appendChild(notice);
  }
};
window.imgOk = function () {};
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var G = window.GALLERY || {}, L = window.LINKS || {};
  function watch(im) {
    im.classList.add('fade');
    im.addEventListener('load', function () { im.classList.add('ok'); });
    im.addEventListener('error', function () { window.imgFb(im); }, {once:true});
    if (im.complete) {
      if (im.naturalWidth) im.classList.add('ok');
      else window.imgFb(im);
    }
  }
  document.querySelectorAll('img').forEach(watch);
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
      });
    }, {threshold:0.05});
    rv.forEach(function (el) { observer.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  var lb, strip, idx = 0, opener, blocked = [], hasHistory = false;
  function count() { return strip.querySelectorAll('figure').length; }
  function paint() {
    var n = count();
    idx = Math.max(0, Math.min(idx, n - 1));
    lb.querySelector('.cnt').textContent = n ? (idx + 1) + ' / ' + n : '0 / 0';
    lb.querySelector('.prev').disabled = idx === 0 || n === 0;
    lb.querySelector('.next').disabled = idx >= n - 1;
    lb.querySelector('.fitbtn').disabled = n === 0;
    lb.querySelector('.empty').hidden = n !== 0;
    var f = strip.querySelectorAll('figure')[idx];
    var source = lb.querySelector('.source');
    source.hidden = !f;
    lb.querySelector('.cap').textContent = f ? f.querySelector('img').alt : lb.querySelector('#photo-context').textContent;
    if (f) {
      source.href = f.dataset.source;
      if (f.dataset.credit) source.title = '사진: ' + f.dataset.credit;
      else source.removeAttribute('title');
    } else {
      source.removeAttribute('href');
      source.removeAttribute('title');
    }
  }
  function go(i) {
    if (i < 0 || i >= count()) return;
    idx = i;
    strip.scrollTo({left:i * strip.clientWidth, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    paint();
  }
  function hide() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove('lb-open');
    blocked.forEach(function (el) { el.inert = false; });
    blocked = [];
    if (opener && opener.isConnected) opener.focus();
  }
  function close() {
    hide();
    if (hasHistory && history.state && history.state.travelPhoto) history.back();
    hasHistory = false;
  }
  function build() {
    lb = document.createElement('div');
    lb.className = 'lb'; lb.hidden = true;
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-labelledby', 'photo-context');
    lb.setAttribute('aria-describedby', 'photo-caption');
    lb.innerHTML = '<span id="photo-context" hidden></span><div class="bar"><span class="cap" id="photo-caption"></span><span><button type="button" class="fitbtn" aria-pressed="false">꽉 채우기</button><button type="button" class="closebtn" aria-label="사진 닫기">×</button></span></div><div class="strip"></div><p class="empty" role="status" hidden>사진을 불러오지 못했습니다. 아래 공식 사이트를 확인해 주세요.</p><div class="foot"><div class="ctl"><button type="button" class="prev" aria-label="이전 사진">‹</button><span class="cnt" aria-live="polite"></span><button type="button" class="next" aria-label="다음 사진">›</button></div><div class="links"></div><a class="source" target="_blank" rel="noopener">사진 출처</a></div>';
    document.body.appendChild(lb); strip = lb.querySelector('.strip');
    lb.querySelector('.closebtn').onclick = close;
    lb.querySelector('.prev').onclick = function () { go(idx - 1); };
    lb.querySelector('.next').onclick = function () { go(idx + 1); };
    lb.querySelector('.fitbtn').onclick = function () {
      var on = this.getAttribute('aria-pressed') !== 'true';
      this.setAttribute('aria-pressed', String(on)); this.textContent = on ? '전체 보기' : '꽉 채우기';
      strip.querySelectorAll('figure').forEach(function (f) { f.classList.toggle('fill', on); });
    };
    strip.addEventListener('scroll', function () {
      idx = Math.round(strip.scrollLeft / (strip.clientWidth || 1)); paint();
    });
    lb.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); close(); }
      if (ev.key === 'ArrowRight') { ev.preventDefault(); go(idx + 1); }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); go(idx - 1); }
      if (ev.key === 'Tab') {
        var nodes = Array.from(lb.querySelectorAll('button:not(:disabled),a[href]')).filter(function (el) { return !el.hidden && el.getClientRects().length; });
        var first = nodes[0], last = nodes[nodes.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('popstate', function () { hide(); hasHistory = false; });
  }
  function open(trigger) {
    if (!lb) build();
    opener = trigger; idx = 0;
    var key = trigger.dataset.g, caption = trigger.dataset.cap || '여행 사진';
    lb.querySelector('#photo-context').textContent = caption;
    strip.replaceChildren();
    (G[key] || []).forEach(function (url, i) {
      var figure = document.createElement('figure'), im = document.createElement('img');
      var metadata = (window.PHOTO_SOURCES || {})[url] || {};
      figure.dataset.source = metadata.source_page || url;
      figure.dataset.credit = metadata.credit || '';
      im.alt = metadata.alt_ko || caption + ' 사진 ' + (i + 1); im.loading = i < 2 ? 'eager' : 'lazy';
      im.onerror = function () {
        var current = strip.querySelectorAll('figure')[idx];
        figure.remove();
        var remaining = Array.from(strip.querySelectorAll('figure'));
        if (current !== figure && remaining.includes(current)) idx = remaining.indexOf(current);
        paint(); strip.scrollLeft = idx * strip.clientWidth;
      };
      figure.appendChild(im); strip.appendChild(figure); im.src = url;
    });
    var row = lb.querySelector('.links'); row.replaceChildren();
    var data = L[key] || {};
    [['site','공식 정보'],['instagram','인스타그램'],['youtube','유튜브 검색'],['map','지도']].forEach(function (pair) {
      if (!data[pair[0]]) return;
      var a = document.createElement('a'); a.href = data[pair[0]]; a.textContent = pair[1]; a.target = '_blank'; a.rel = 'noopener'; row.appendChild(a);
    });
    var fit = lb.querySelector('.fitbtn'); fit.setAttribute('aria-pressed','false'); fit.textContent = '꽉 채우기';
    blocked = Array.from(document.body.children).filter(function (el) { return el !== lb && !el.inert && el.tagName !== 'SCRIPT'; });
    blocked.forEach(function (el) { el.inert = true; });
    lb.hidden = false; document.body.classList.add('lb-open'); strip.scrollLeft = 0; paint();
    lb.querySelector('.closebtn').focus();
    try { history.pushState({travelPhoto:true}, '', location.href); hasHistory = true; } catch (_) { hasHistory = false; }
  }
  document.addEventListener('click', function (ev) {
    var trigger = ev.target.closest('.g');
    if (!trigger || ev.target.closest('a')) return;
    open(trigger);
  });
  document.addEventListener('keydown', function (ev) {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('.g')) { ev.preventDefault(); open(ev.target); }
  });
  document.querySelectorAll('.dayx').forEach(function (button, i) {
    var list = button.nextElementSibling;
    if (!list) return;
    list.id = 'stops-' + i; button.setAttribute('aria-controls', list.id);
    button.onclick = function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded)); list.hidden = expanded;
    };
  });
  function show() {
    var screens = document.querySelectorAll('[data-screen]');
    if (!screens.length) return;
    var hash;
    try { hash = decodeURIComponent(location.hash.slice(1)) || 'home'; } catch (_) { hash = 'home'; }
    var name = hash.split('--')[0];
    if (!Array.from(screens).some(function (s) { return s.dataset.screen === name; })) name = 'home';
    screens.forEach(function (s) { s.hidden = s.dataset.screen !== name; });
    document.documentElement.dataset.plan = name;
    document.querySelectorAll('.topbar nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + name); });
    var target = document.getElementById(hash);
    requestAnimationFrame(function () { if (target) target.scrollIntoView(); else window.scrollTo(0,0); });
  }
  window.addEventListener('hashchange', show); show();
  document.querySelectorAll('[data-print]').forEach(function (button) {
    button.onclick = async function () {
      document.body.classList.toggle('print-all', button.dataset.print === 'all');
      button.disabled = true;
      var photos = Array.from(document.querySelectorAll('img'));
      photos.forEach(function (im) { im.loading = 'eager'; });
      // Do not wait indefinitely for third-party image hosts.
      await Promise.race([
        Promise.allSettled(photos.map(function (im) { return im.decode ? im.decode() : Promise.resolve(); })),
        new Promise(function (resolve) { setTimeout(resolve, 5000); })
      ]);
      button.disabled = false;
      window.print();
    };
  });
  window.addEventListener('afterprint', function () { document.body.classList.remove('print-all'); });
})();
