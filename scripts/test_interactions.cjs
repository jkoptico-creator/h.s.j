#!/usr/bin/env node
'use strict';

// Runtime DOM regression checks, not a browser/layout test. No network requests.
// Run: NODE_PATH=/path/to/node_modules node scripts/test_interactions.cjs
// The development workspace's ../testdeps/node_modules is also supported.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = (() => {
  try { return require('jsdom'); }
  catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return require(path.resolve(__dirname, '../../testdeps/node_modules/jsdom'));
  }
})();
const ROOT = path.resolve(__dirname, '..');
let assertions = 0;
let groups = 0;

function check(actual, expected, message) {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
}

function load(filename, hash = '') {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => {
    // CSS parsing/rendering is outside the scope of these interaction checks.
    if (error.type !== 'css-parsing') errors.push(error);
  });
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, filename), 'utf8'), {
    url: `https://example.test/${encodeURIComponent(filename)}${hash}`,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole,
  });
  const { window } = dom;
  const { document } = window;
  const scrollCalls = [];
  window.addEventListener('error', event => errors.push(event.error || event.message));
  // jsdom does not lay out elements or implement scrolling/media queries.
  window.matchMedia = query => ({ matches: false, media: query });
  window.requestAnimationFrame = callback => { callback(0); return 1; };
  window.cancelAnimationFrame = () => {};
  window.scrollTo = (...args) => scrollCalls.push(['window', ...args]);
  window.HTMLElement.prototype.scrollIntoView = function () {
    scrollCalls.push(['element', this.id]);
  };
  window.HTMLElement.prototype.scrollTo = function (options) {
    this.scrollLeft = typeof options === 'object' ? options.left : options;
  };
  Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() { return 640; },
  });
  window.HTMLElement.prototype.getClientRects = function () {
    return this.closest('[hidden]') ? [] : [{ width: 10, height: 10 }];
  };
  // These checks verify the inert flag is applied/restored. Native inert focus
  // suppression itself must be checked in a real browser, not in jsdom.
  for (const script of document.querySelectorAll('script')) {
    const source = script.getAttribute('src');
    const code = source
      ? fs.readFileSync(path.join(ROOT, source.split('?')[0]), 'utf8')
      : script.textContent;
    window.eval(`${code}\n//# sourceURL=${source || filename + ':inline'}`);
  }
  function key(target, value, shiftKey = false) {
    const event = new window.KeyboardEvent('keydown', {
      key: value, shiftKey, bubbles: true, cancelable: true,
    });
    target.dispatchEvent(event);
    return event;
  }
  function noErrors() { check(errors.map(String), [], 'no runtime exceptions'); }
  return { dom, window, document, scrollCalls, key, noErrors };
}

async function test(name, callback) {
  await callback();
  groups += 1;
  console.log(`PASS ${name}`);
}

function fixture(page, pictures = 3) {
  const { document, window } = page;
  const trigger = document.createElement('div');
  trigger.className = 'g';
  trigger.tabIndex = 0;
  trigger.setAttribute('role', 'button');
  trigger.dataset.g = '__interaction_fixture';
  trigger.dataset.cap = '회귀검증 사진';
  document.querySelector('header').appendChild(trigger);
  window.GALLERY[trigger.dataset.g] = Array.from({ length: pictures }, (_, i) => `https://example.test/image-${i}.jpg`);
  window.LINKS[trigger.dataset.g] = { site: 'https://example.test/official', map: 'https://example.test/map' };
  return trigger;
}

function photoMetadata(page, trigger) {
  const pictures = page.window.GALLERY[trigger.dataset.g];
  const entries = pictures.map((url, index) => [url, {
    source_page: `https://example.test/photo-source-${index}`,
    image_url: url,
    alt_ko: ['하버브리지와 오페라하우스가 보이는 시드니 하버', '본다이에서 브론테로 이어지는 해안 산책로', '배런조이 등대의 사암 건물'][index],
    ...(index !== 1 ? { credit: `사진가 ${index + 1}` } : {}),
  }]);
  page.window.PHOTO_SOURCES = { ...page.window.PHOTO_SOURCES, ...Object.fromEntries(entries) };
  return entries.map(([, metadata]) => metadata);
}

async function main() {
  await test('detail toggle expands/collapses and has a matching aria-controls target', () => {
    const page = load('plan-1-sydney.html');
    try {
      const buttons = [...page.document.querySelectorAll('.dayx')];
      check(buttons.length, 7, 'seven day-detail controls');
      for (const button of buttons) {
        const list = button.nextElementSibling;
        check(page.document.getElementById(button.getAttribute('aria-controls')), list, 'aria-controls resolves to its list');
        check([button.getAttribute('aria-expanded'), list.hidden], ['false', true], 'initially collapsed');
        button.click();
        check([button.getAttribute('aria-expanded'), list.hidden], ['true', false], 'expands');
        button.click();
        check([button.getAttribute('aria-expanded'), list.hidden], ['false', true], 'collapses');
      }
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('photo dialog opens, traps edge tab movement, restores focus and inert flags', () => {
    const page = load('plan-1-sydney.html');
    try {
      const { document, key } = page;
      const trigger = fixture(page);
      const alreadyInert = document.createElement('div');
      alreadyInert.inert = true;
      document.body.appendChild(alreadyInert);
      trigger.focus();
      trigger.click();
      const dialog = document.querySelector('.lb');
      check(dialog.hidden, false, 'dialog opens');
      check(dialog.getAttribute('role'), 'dialog', 'dialog role');
      check(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent, trigger.dataset.cap, 'dialog accessible name');
      check(document.getElementById(dialog.getAttribute('aria-describedby')).textContent, trigger.dataset.cap + ' 사진 1', 'dialog description uses the active photo caption');
      check(dialog.querySelector('.strip img').alt, trigger.dataset.cap + ' 사진 1', 'legacy photo retains generated alternative text');
      check(dialog.querySelector('.source').href, page.window.GALLERY[trigger.dataset.g][0], 'legacy photo source falls back to image URL');
      check(dialog.querySelector('.source').textContent, '사진 출처', 'source link has the new label');
      check(document.activeElement, dialog.querySelector('.closebtn'), 'initial focus moves to close button');
      const background = [...document.body.children].filter(el => el !== dialog && el.tagName !== 'SCRIPT');
      check(background.every(el => el.inert === true), true, 'all background siblings inert');
      const first = dialog.querySelector('.fitbtn');
      const last = dialog.querySelector('.source');
      first.focus();
      check(key(first, 'Tab', true).defaultPrevented, true, 'backward boundary tab intercepted');
      check(document.activeElement, last, 'backward tab wraps to last');
      check(key(last, 'Tab').defaultPrevented, true, 'forward boundary tab intercepted');
      check(document.activeElement, first, 'forward tab wraps to first');
      dialog.querySelector('.closebtn').click();
      check(dialog.hidden, true, 'close button hides dialog');
      check(document.activeElement, trigger, 'focus returns to opener');
      check(background.filter(el => el !== alreadyInert).every(el => el.inert === false), true, 'inert flags restored');
      check(alreadyInert.inert, true, 'pre-existing inert state preserved');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('photo keyboard opening and Escape closing work', () => {
    const page = load('plan-1-sydney.html');
    try {
      const trigger = fixture(page);
      trigger.focus();
      check(page.key(trigger, 'Enter').defaultPrevented, true, 'Enter consumed');
      const dialog = page.document.querySelector('.lb');
      check(dialog.hidden, false, 'Enter opens');
      page.key(page.document.activeElement, 'Escape');
      check(dialog.hidden, true, 'Escape closes');
      check(page.document.activeElement, trigger, 'Escape restores opener focus');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('photo metadata follows next, previous, keyboard and scroll navigation', () => {
    const page = load('plan-1-sydney.html');
    try {
      const trigger = fixture(page);
      const metadata = photoMetadata(page, trigger);
      trigger.click();
      const dialog = page.document.querySelector('.lb');
      const strip = dialog.querySelector('.strip');
      function expectPhoto(index) {
        const photo = metadata[index];
        const image = strip.querySelectorAll('img')[index];
        check(image.src, photo.image_url, 'gallery still loads its original image URL');
        check(image.alt, photo.alt_ko, 'image alternative text matches its metadata');
        check(dialog.querySelector('.cap').textContent, photo.alt_ko, 'visible caption describes the active photo');
        check(dialog.querySelector('.source').href, photo.source_page, 'source points to the active photo source page');
        check(dialog.querySelector('.source').getAttribute('title'), photo.credit ? '사진: ' + photo.credit : null, 'credit follows the photo and clears when absent');
        check(page.document.getElementById(dialog.getAttribute('aria-labelledby')).textContent, trigger.dataset.cap, 'dialog name retains the opening itinerary context');
      }
      expectPhoto(0);
      dialog.querySelector('.next').click();
      expectPhoto(1);
      page.key(dialog.querySelector('.closebtn'), 'ArrowRight');
      expectPhoto(2);
      dialog.querySelector('.prev').click();
      expectPhoto(1);
      strip.scrollLeft = 0;
      strip.dispatchEvent(new page.window.Event('scroll'));
      expectPhoto(0);
      dialog.querySelector('.closebtn').click();
      const legacyTrigger = fixture(page, 1);
      delete page.window.PHOTO_SOURCES[page.window.GALLERY[legacyTrigger.dataset.g][0]];
      legacyTrigger.click();
      check(dialog.querySelector('.cap').textContent, legacyTrigger.dataset.cap + ' 사진 1', 'reopened legacy gallery falls back to its original caption');
      check(dialog.querySelector('.source').href, page.window.GALLERY[legacyTrigger.dataset.g][0], 'reopened legacy gallery uses the image URL');
      check(dialog.querySelector('.source').hasAttribute('title'), false, 'previous gallery credit does not leak into legacy photo');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('failed gallery images update counts, preserve the current photo and reach an empty state', () => {
    const page = load('plan-1-sydney.html');
    try {
      const trigger = fixture(page);
      const metadata = photoMetadata(page, trigger);
      trigger.click();
      const dialog = page.document.querySelector('.lb');
      const counter = () => dialog.querySelector('.cnt').textContent;
      check(counter(), '1 / 3', 'three initial photos');
      dialog.querySelector('.next').click();
      dialog.querySelector('.next').click();
      check(counter(), '3 / 3', 'navigation reaches last image');
      const currentSource = dialog.querySelector('.source').href;
      dialog.querySelector('.strip img').dispatchEvent(new page.window.Event('error'));
      check(counter(), '2 / 2', 'failure before current photo reindexes count');
      check(dialog.querySelector('.source').href, currentSource, 'current photo preserved');
      check(dialog.querySelector('.strip figure:last-child img').alt, metadata[2].alt_ko, 'surviving photo retains its actual alternative text');
      check(dialog.querySelector('.cap').textContent, metadata[2].alt_ko, 'caption stays on the current photo after an earlier failure');
      check(dialog.querySelector('.source').title, '사진: ' + metadata[2].credit, 'credit stays on the current photo after an earlier failure');
      dialog.querySelector('.strip figure:last-child img').dispatchEvent(new page.window.Event('error'));
      check(counter(), '1 / 1', 'failure of current photo selects remaining photo');
      check(dialog.querySelector('.source').href, metadata[1].source_page, 'source switches to remaining photo after current failure');
      check(dialog.querySelector('.strip img').alt, metadata[1].alt_ko, 'remaining photo alternative text is correct');
      check(dialog.querySelector('.cap').textContent, metadata[1].alt_ko, 'caption switches to the remaining photo');
      check(dialog.querySelector('.source').hasAttribute('title'), false, 'failed photo credit is cleared');
      dialog.querySelector('.strip img').dispatchEvent(new page.window.Event('error'));
      check(counter(), '0 / 0', 'all failed images removed');
      check(dialog.querySelector('.empty').hidden, false, 'empty message shown');
      check(dialog.querySelector('.source').hidden, true, 'source link hidden with no photo');
      check(dialog.querySelector('.source').hasAttribute('href'), false, 'empty gallery does not retain the failed source URL');
      check(dialog.querySelector('.source').hasAttribute('title'), false, 'empty gallery does not retain a photo credit');
      check(dialog.querySelector('.cap').textContent, trigger.dataset.cap, 'empty gallery restores its opening context');
      check(['.prev', '.next', '.fitbtn'].every(sel => dialog.querySelector(sel).disabled), true, 'photo controls disabled');
      check(dialog.querySelectorAll('.links a').length, 2, 'official links remain accessible');
      page.key(page.document.activeElement, 'Escape');
      check(dialog.hidden, true, 'empty dialog can still close');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('an initially empty gallery has a usable close control', () => {
    const page = load('plan-1-sydney.html');
    try {
      const trigger = fixture(page, 0);
      trigger.click();
      const dialog = page.document.querySelector('.lb');
      check(dialog.querySelector('.cnt').textContent, '0 / 0', 'empty count');
      check(dialog.querySelector('.empty').hidden, false, 'empty state visible');
      check(page.document.activeElement, dialog.querySelector('.closebtn'), 'close control receives focus');
      dialog.querySelector('.closebtn').click();
      check(page.document.activeElement, trigger, 'focus restored from empty gallery');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('combined edition deep-link reveals plan 4 and scrolls to November 18', () => {
    const page = load('호주여행제안.html', '#plan-4--nov-18');
    try {
      const { document } = page;
      const visible = [...document.querySelectorAll('[data-screen]')].filter(el => !el.hidden);
      check(visible.map(el => el.dataset.screen), ['plan-4'], 'only plan 4 visible');
      check(document.documentElement.dataset.plan, 'plan-4', 'selected plan recorded');
      const target = document.getElementById('plan-4--nov-18');
      check(Boolean(target), true, 'day anchor exists');
      check(target.closest('[data-screen]'), visible[0], 'day is inside visible plan');
      check(target.closest('[hidden]'), null, 'day has no hidden ancestor');
      check(page.scrollCalls.some(call => call[0] === 'element' && call[1] === target.id), true, 'scroll targets selected day');
      const controls = [...document.querySelectorAll('.dayx')].map(el => el.getAttribute('aria-controls'));
      check(new Set(controls).size, controls.length, 'combined day controls have unique target IDs');
      page.noErrors();
    } finally { page.dom.window.close(); }
  });

  await test('combined edition handles malformed and unknown hashes without exceptions', () => {
    for (const initialHash of ['#%E0%A4%A', '#%ZZ', '#unknown-plan--nov-18']) {
      const page = load('호주여행제안.html', initialHash);
      try {
        check([...page.document.querySelectorAll('[data-screen]')].filter(el => !el.hidden).map(el => el.dataset.screen), ['home'], `${initialHash}: safely falls back home`);
        page.window.history.replaceState(null, '', '#plan-4--nov-18');
        page.window.dispatchEvent(new page.window.HashChangeEvent('hashchange'));
        check(page.document.documentElement.dataset.plan, 'plan-4', 'valid hashchange selects plan');
        page.window.history.replaceState(null, '', '#%ZZ');
        page.window.dispatchEvent(new page.window.HashChangeEvent('hashchange'));
        check(page.document.documentElement.dataset.plan, 'home', 'malformed hashchange returns home');
        page.noErrors();
      } finally { page.dom.window.close(); }
    }
  });
  console.log(`PASS ${groups} jsdom regression groups, ${assertions} assertions. Layout, scrolling and native inert enforcement are not browser-tested.`);
}

main().catch(error => {
  console.error('FAIL jsdom interaction regression:', error.stack || error);
  process.exitCode = 1;
});
