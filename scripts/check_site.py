"""Content and structure checks for this static travel proposal (standard library)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import re
from build_combined import build, OUTPUT

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_TOTALS = [24530, 28390, 24728, 33672, 35948]
EXPECTED_DAYS = [7, 7, 7, 11, 11]
OLD_LINKS = ['margaretrestaurant.com.au', 'www.honto.com.au',
             'experiencegoldcoast.com/blog/locals-guide-10-places-to-shop',
             'destinationgoldcoast.com/places-to-go/hinterland/tamborine-mountain',
             'theboathousegroup.com.au/palmbeach']
data = (ROOT/'assets/places.js').read_text(encoding='utf-8')
gallery = json.loads(re.search(r'window.GALLERY=(.*?);\n', data, re.S)[1])
links = json.loads(re.search(r'window.LINKS=(.*?);\n', data, re.S)[1])


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
        assert '2026년 10월 19일' in text and '예약 전 확인' in text, path.name
        assert not any(old in text for old in OLD_LINKS), (path.name, 'obsolete destination URL')
    return page


pages = [ROOT/'index.html', *sorted(ROOT.glob('plan-*.html')), OUTPUT, *sorted((ROOT/'review').glob('sheet*.html'))]
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
assert not any(old in data for old in OLD_LINKS), 'Obsolete URL in shared destination data'
assert links['cleo']['site'] == 'https://cleomelbourne.com.au/'
assert 'Catseye' in links['catseye_beach']['map']
assert all('/leeward/' in u.lower() for u in gallery['qualia_leeward'])
assert not links['biz_class_a380'].get('map') and not links['biz_class_787'].get('map')
print(f'PASS: {len(pages)} HTML pages; internal files/anchors, image metadata, destination keys, day toggles, five budget totals and combined-source parity.')
