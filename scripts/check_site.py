"""Content and structure checks for this static travel proposal (standard library)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import re
from build_combined import build, OUTPUT

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_TOTALS = [24530, 28390, 24728, 33672, 36328]
EXPECTED_DAYS = [7, 7, 7, 11, 11]
OLD_LINKS = ['margaretrestaurant.com.au', 'www.honto.com.au',
             'experiencegoldcoast.com/blog/locals-guide-10-places-to-shop',
             'destinationgoldcoast.com/places-to-go/hinterland/tamborine-mountain',
             'theboathousegroup.com.au/palmbeach']
data = (ROOT/'assets/places.js').read_text(encoding='utf-8')
gallery = json.loads(re.search(r'window.GALLERY=(.*?);\n', data, re.S)[1])
links = json.loads(re.search(r'window.LINKS=(.*?);\n', data, re.S)[1])
photo_sources = json.loads(re.search(r'window.PHOTO_SOURCES=(.*?);\n', data, re.S)[1])
photo_manifest = json.loads((ROOT/'assets/photos/sources.json').read_text(encoding='utf-8'))
for photo in photo_manifest:
    assert (ROOT/photo['file']).is_file(), ('missing photo', photo['file'])
    assert photo['width'] >= 700 and photo['height'] >= 400, ('photo too small', photo['file'])
    assert photo_sources[photo['file']]['source_page'] == photo['source_page']
    assert photo['file'] in gallery[photo['place_key']]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.rows = []
        self.row = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if tag == 'tr':
            self.row = {'class': a.get('class', ''), 'text': ''}

    def handle_endtag(self, tag):
        if tag == 'tr' and self.row is not None:
            self.rows.append(self.row)
            self.row = None

    def handle_data(self, text):
        if self.row is not None:
            self.row['text'] += text


def check_page(path):
    text = path.read_text(encoding='utf-8')
    page = Page(text)
    ids = [a['id'] for _, a in page.tags if 'id' in a]
    assert len(ids) == len(set(ids)), (path.name, 'duplicate IDs')
    assert '<title>' in text and re.search(r'<html\b[^>]*lang="ko"', text), path.name
    assert 'name="viewport"' in text, path.name
    for tag, a in page.tags:
        if tag == 'img':
            assert a.get('alt'), (path.name, 'missing image description')
            assert 'data-fb' not in a and 'data-fb2' not in a, (path.name, 'misleading image fallback')
        if 'data-g' in a:
            assert a['data-g'] in gallery, (path.name, 'unknown gallery', a['data-g'])
            assert a['data-g'] in links, (path.name, 'unknown destination', a['data-g'])
            assert gallery[a['data-g']], (path.name, 'empty gallery', a['data-g'])
            if '등대' in a.get('data-cap', ''):
                assert a['data-g'] == 'barrenjoey_lighthouse', 'Lighthouse must not show The Joey restaurant'
            if 'Gallery Walk' in a.get('data-cap', ''):
                assert a['data-g'] == 'gallery_walk', 'Gallery Walk must not show Skywalk'
        for attribute in ['href', 'src']:
            url = a.get(attribute, '')
            if not url or url.startswith(('https:', 'http:', 'data:', 'mailto:')):
                continue
            parsed = urlsplit(url)
            target = path.parent / unquote(parsed.path) if parsed.path else path
            assert target.exists(), (path.name, 'missing file', url)
            if parsed.fragment and target == path:
                assert unquote(parsed.fragment) in ids, (path.name, 'missing anchor', url)
    if path.parent.name != 'review':
        assert all('?v=' in a['src'] for tag,a in page.tags if tag == 'script' and a.get('src','').startswith('assets/')), 'Shared scripts must invalidate the previous photo cache'
        assert 'image-reference' not in ' '.join(a.get('class', '') for _, a in page.tags), path.name
        assert '사진 준비 중' not in text, (path.name, 'unfilled photo')
        assert not any('images.unsplash.com' in a.get('src','') for tag,a in page.tags if tag=='img'), path.name
        if path.name != 'itinerary.html':
            assert '2026년 10월 19일' in text and '예약 전 확인' in text, path.name
        assert not any(old in text for old in OLD_LINKS), (path.name, 'obsolete destination URL')
    return page


pages = [ROOT/'index.html', *sorted(ROOT.glob('plan-*.html')), ROOT/'itinerary.html', OUTPUT, *sorted((ROOT/'review').glob('sheet*.html'))]
for path in pages:
    page = check_page(path)
    if path.name.startswith('plan-'):
        index = int(path.name[5])-1
        days = sum(tag == 'article' and 'day' in a.get('class','').split() for tag, a in page.tags)
        toggles = sum(tag == 'button' and 'dayx' in a.get('class','').split() for tag, a in page.tags)
        assert days == toggles == EXPECTED_DAYS[index], (path.name, days, toggles)
        amounts, total = [], None
        for row in page.rows:
            match = re.search(r'A\$([\d,]+)', row['text'])
            if not match:
                continue
            amount = int(match[1].replace(',', ''))
            if 'total' in row['class'].split():
                total = amount
            elif not any(word in row['text'] for word in ['제외', '추가', '국제선 제외']):
                # Only priced rows have three cells; note rows use colspan=3.
                if re.search(r'₩|만\s*원', row['text']):
                    amounts.append(amount)
        assert total == EXPECTED_TOTALS[index], (path.name, 'incorrect displayed total', total)
        assert sum(amounts) == total, (path.name, 'item sum differs', amounts, total)

assert OUTPUT.read_text(encoding='utf-8') == build(), 'Combined edition is stale'
# Privacy: booking references, ticket numbers and passenger names never appear in the published files.
PRIVATE = ['EMP7UL', '1802251115', 'JEON/', 'HAKSOO', 'HAEUN', '전학수', '임하은']
for path in [*ROOT.glob('*.html'), *ROOT.glob('assets/*.js'), *ROOT.glob('docs/*.md'), ROOT/'README.md']:
    text = path.read_text(encoding='utf-8')
    assert not any(word in text for word in PRIVATE), (path.name, 'private booking detail must not be published')
# Daily planner data: every photo key exists, every day present, the planner is linked from the decided pages.
trip = (ROOT/'assets/trip-data.js').read_text(encoding='utf-8')
assert 'window.TRIP' in trip
for key in set(re.findall(r"key: '([a-z0-9_]+)'", trip)):
    assert key in gallery and key in links and gallery[key], ('planner photo key', key)
for day in ['d15', 'd16', 'd17', 'd18', 'd19', 'd20', 'd21']:
    assert f"id: '{day}'" in trip, ('planner day missing', day)
assert 'Eastern Pontoon' in trip and 'VA1283' in trip and 'VA1496' in trip and 'KE408' in trip
assert '발레' not in trip and 'Copland' not in trip, 'the guests do not want the ballet'
for name in ['index.html', 'plan-2-sydney-hamilton-brisbane.html']:
    assert 'href="itinerary.html"' in (ROOT/name).read_text(encoding='utf-8'), (name, 'planner link')
plan2 = (ROOT/'plan-2-sydney-hamilton-brisbane.html').read_text(encoding='utf-8')
assert 'harbour_yacht' in plan2 and 'VA1283' in plan2 and 'VA1496' in plan2 and 'qualia_charter' in plan2 and '발레' not in plan2
assert 'pickbar' in OUTPUT.read_text(encoding='utf-8') and 'itinerary.html' in OUTPUT.read_text(encoding='utf-8')
overview = (ROOT/'index.html').read_text(encoding='utf-8')
assert '1~2회 · 섬 일정 선택에 따라' in overview, 'Plan 2 golf count must reflect the boat alternative'
assert '안별 1~3라운드 제안' in overview, 'Overview golf range must include the one-round alternative'
assert not any(old in data for old in OLD_LINKS), 'Obsolete URL in shared destination data'
assert links['cleo']['site'] == 'https://cleomelbourne.com.au/'
assert 'Catseye' in links['catseye_beach']['map']
assert all('/leeward/' in u.lower() for u in gallery['qualia_leeward'])
assert not any('/windward/' in u.lower() for u in gallery['qualia'])
assert not any('ricochet' in u.lower() for u in gallery['sunset_sail'])
assert not any('Kiki-Kiosk' in u for u in gallery['goodside_cafe'])
assert '"assets/photos/' not in OUTPUT.read_text(encoding='utf-8'), 'Shared single file needs absolute hosted photo URLs'
assert not links['biz_class_a380'].get('map') and not links['biz_class_787'].get('map')
print(f'PASS: {len(pages)} HTML pages; internal files/anchors, image metadata, destination keys, day toggles, five budget totals and combined-source parity.')
