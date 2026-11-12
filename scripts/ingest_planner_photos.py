"""Download researched photos, convert to WebP, and write assets/planner-photos.js.

usage: python ingest.py <site_dir> <json files...>
- Saves to assets/photos/planner/<key>-<n>.webp (max 1280px wide, q=76).
- Skips images that fail to download/decode or are smaller than 500px wide.
- Keeps an image only once per key (dedupe by URL and by decoded pixel hash).
- Writes assets/planner-photos.js which extends window.GALLERY / window.PHOTO_SOURCES
  for the planner page only (proposal pages keep places.js untouched).
"""
import io, json, os, sys, hashlib, datetime, urllib.request, urllib.error, concurrent.futures as cf
from PIL import Image

site = sys.argv[1]
files = sys.argv[2:]
OUT = os.path.join(site, 'assets', 'photos', 'planner')
import shutil
shutil.rmtree(OUT, ignore_errors=True)  # regenerate from scratch so no stale numbered files remain
os.makedirs(OUT, exist_ok=True)
DROP = set(os.environ.get('PHOTO_DROP', '').split()) if os.environ.get('PHOTO_DROP') else set()  # image URLs to exclude after review
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

entries = {}
order = []
for f in files:
    for e in json.load(io.open(f, encoding='utf-8')):
        k = e['key']
        if k not in entries:
            entries[k] = {'place': e.get('place', ''), 'images': []}
            order.append(k)
        seen = {i['image_url'] for i in entries[k]['images']}
        for im in e.get('images', []):
            if im.get('image_url') and im['image_url'] not in seen and im['image_url'] not in DROP:
                entries[k]['images'].append(im)
                seen.add(im['image_url'])

CACHE = os.environ.get('PHOTO_CACHE') or os.path.join(os.path.expanduser('~'), '.cache', 'planner-photos')
os.makedirs(CACHE, exist_ok=True)
import threading, time
_wiki_lock = threading.Lock()

def fetch(url, referer):
    cp = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if os.path.exists(cp):
        return open(cp, 'rb').read()
    wiki = 'wikimedia.org' in url
    headers = {'User-Agent': 'TravelPlannerPhotoFetch/1.0 (private itinerary page)' if wiki else UA,
               'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8'}
    if not wiki:
        headers['Referer'] = referer or url
    for attempt in range(5):
        try:
            if wiki:
                _wiki_lock.acquire()
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=40) as r:
                    data = r.read()
            finally:
                if wiki:
                    time.sleep(1.2)
                    _wiki_lock.release()
            open(cp, 'wb').write(data)
            return data
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 4:
                time.sleep(5 * (attempt + 1))
                continue
            raise

def work(job):
    key, n, im = job
    try:
        raw = fetch(im['image_url'], im.get('source_page'))
        img = Image.open(io.BytesIO(raw))
        img.load()
        if img.mode not in ('RGB', 'L'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img.convert('RGBA'), mask=img.convert('RGBA').split()[-1])
            img = bg
        elif img.mode == 'L':
            img = img.convert('RGB')
        w, h = img.size
        if w < 500:
            return (key, n, im, None, 'too small %dx%d' % (w, h))
        if w > 1280:
            img = img.resize((1280, round(h * 1280 / w)), Image.LANCZOS)
        ph = hashlib.md5(img.resize((16, 16)).tobytes()).hexdigest()
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=76, method=6)
        return (key, n, im, (buf.getvalue(), img.size, ph), None)
    except Exception as ex:
        return (key, n, im, None, str(ex)[:120])

jobs = [(k, i, im) for k in order for i, im in enumerate(entries[k]['images'])]
results = {}
with cf.ThreadPoolExecutor(12) as ex:
    for key, n, im, ok, err in ex.map(work, jobs):
        results[(key, n)] = (im, ok, err)

gallery, sources, report = {}, {}, []
today = datetime.date.today().isoformat()
for k in order:
    kept, hashes = [], set()
    for n in range(len(entries[k]['images'])):
        im, ok, err = results[(k, n)]
        if not ok:
            report.append('SKIP %s #%d %s :: %s' % (k, n, err, im['image_url'][:90]))
            continue
        data, size, ph = ok
        if ph in hashes:
            report.append('DUP  %s #%d' % (k, n))
            continue
        hashes.add(ph)
        idx = len(kept) + 1
        rel = 'assets/photos/planner/%s-%d.webp' % (k, idx)
        with open(os.path.join(site, rel), 'wb') as fh:
            fh.write(data)
        kept.append(rel)
        sources[rel] = {'image_url': im['image_url'], 'source_page': im.get('source_page', ''), 'alt_ko': im.get('alt_ko', ''),
                        'credit': im.get('credit', ''), 'width': size[0], 'height': size[1], 'checked_on': today}
    if kept:
        gallery[k] = kept
    report.append('KEY  %-24s %d/%d' % (k, len(kept), len(entries[k]['images'])))

# Empress yacht: reuse the repo's own photos from the yacht selection page
alts = ['후면 데크 다이닝 테이블과 오페라하우스', '순항 중인 Empress', '항공 사진', '실내 살롱', '실내 라운지', '메인 살롱',
        '플라이브리지 바', '플라이브리지 라운지', '뱃머리 선베드', '위에서 본 후면 데크', '하버 순항', '후면 데크 항공 사진']
emp = []
for i, a in enumerate(alts, 1):
    rel = 'assets/yacht/empress-%02d.webp' % i
    if os.path.exists(os.path.join(site, rel)):
        emp.append(rel)
        sources[rel] = {'image_url': '', 'source_page': 'https://sydneyhs.com.au/', 'alt_ko': 'Empress · ' + a, 'credit': 'Sydney Harbour Specialists', 'checked_on': today}
if emp:
    gallery['empress'] = emp

js = ('/* 플래너 전용 사진. itinerary.html에서만 places.js 뒤에 불러와 GALLERY·PHOTO_SOURCES를 덮어씁니다.\n'
      '   제안 페이지(index·plan-*)는 이 파일을 쓰지 않습니다. 생성: scripts/ingest_planner_photos.py */\n'
      'window.GALLERY = Object.assign(window.GALLERY || {}, ' + json.dumps(gallery, ensure_ascii=False, indent=0) + ');\n'
      'window.PHOTO_SOURCES = Object.assign(window.PHOTO_SOURCES || {}, ' + json.dumps(sources, ensure_ascii=False, indent=0) + ');\n')
io.open(os.path.join(site, 'assets', 'planner-photos.js'), 'w', encoding='utf-8', newline='\n').write(js)
io.open(os.path.join(site, 'assets', 'photos', 'planner', 'sources.json'), 'w', encoding='utf-8').write(json.dumps(sources, ensure_ascii=False, indent=1))
print('\n'.join(report))
print('TOTAL keys %d, photos %d' % (len(gallery), sum(len(v) for v in gallery.values())))
