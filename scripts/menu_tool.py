"""Menu tool: keep a restaurant's original menu design, swap food text for Korean.

  python scripts/menu_tool.py html2pdf <url> <out.pdf>          # print an HTML menu page to PDF (headless Chrome)
  python scripts/menu_tool.py extract <menu.pdf> <blocks.json>   # text blocks with ids, boxes, sizes, colours
  python scripts/menu_tool.py render <menu.pdf> <ko.json> <out_ko.pdf>
        ko.json = {"<block id>": "한국어 문장", ...}  (only the blocks to translate; others stay original)
  python scripts/menu_tool.py images <menu.pdf> <out_dir> <prefix>   # pages -> WebP for the phone viewer
  python scripts/menu_tool.py pair <en.pdf> <ko.pdf> <out_dir> <menu> # EN+KO WebPs with the same margin crop (use this)
  python scripts/menu_tool.py img2pdf <out.pdf> <img1> [img2 ...]       # image-only menus -> PDF (then use "custom" boxes)

Rendering: each translated block is covered with the background colour sampled around it, then the Korean text
is placed in the same box with the same size, colour and weight (serif menus get a serif Korean face). If the
Korean is longer it shrinks to fit the box (down to 70%) instead of spilling onto other items.
"""
import json, os, subprocess, sys, io
import pymupdf as fitz

FONTS = {
    'sans': 'C:/Windows/Fonts/malgun.ttf',
    'sans-bold': 'C:/Windows/Fonts/malgunbd.ttf',
    'serif': 'C:/Windows/Fonts/batang.ttc',
}
CHROME = [p for p in ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                      'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'] if os.path.exists(p)]


def html2pdf(url, out):
    subprocess.run([CHROME[0], '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--hide-scrollbars',
                    '--virtual-time-budget=15000', '--print-to-pdf=' + os.path.abspath(out), url], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    print('saved', out)


def _hex(c):
    return '#%06x' % c


def _bg(page, rect):
    """Most common colour on a thin ring just outside the box (the paper behind the text)."""
    r = fitz.Rect(rect) + (-3, -3, 3, 3)
    pix = page.get_pixmap(clip=r, dpi=72)
    counts = {}
    w, h = pix.width, pix.height
    for y in range(h):
        for x in range(w):
            if 1 < x < w - 2 and 1 < y < h - 2:
                continue
            px = pix.pixel(x, y)[:3]
            counts[px] = counts.get(px, 0) + 1
    if not counts:
        return (1, 1, 1)
    c = max(counts, key=counts.get)
    return tuple(v / 255 for v in c)


def extract(pdf, out):
    doc = fitz.open(pdf)
    blocks = []
    for pno, page in enumerate(doc):
        d = page.get_text('dict')
        for bi, b in enumerate(d['blocks']):
            if b.get('type') != 0:
                continue
            lines, sizes, fonts, colors, flags = [], {}, {}, {}, {}
            ink = None  # box around glyphs actually drawn (blank lines/paragraph spacing excluded)
            for ln in b['lines']:
                t = ''.join(s['text'] for s in ln['spans']).strip()
                if t:
                    lines.append(t)
                for s in ln['spans']:
                    n = len(s['text'].strip())
                    if not n:
                        continue
                    ink = fitz.Rect(s['bbox']) if ink is None else ink | fitz.Rect(s['bbox'])
                    sizes[round(s['size'], 1)] = sizes.get(round(s['size'], 1), 0) + n
                    fonts[s['font']] = fonts.get(s['font'], 0) + n
                    colors[s['color']] = colors.get(s['color'], 0) + n
                    flags[s['flags']] = flags.get(s['flags'], 0) + n
            if not lines:
                continue
            font = max(fonts, key=fonts.get)
            fl = max(flags, key=flags.get)
            blocks.append({'id': 'p%d-b%d' % (pno, bi), 'page': pno, 'bbox': [round(v, 1) for v in (ink or b['bbox'])],
                           'size': max(sizes, key=sizes.get), 'font': font,
                           'bold': bool(fl & 16) or 'bold' in font.lower() or 'black' in font.lower() or 'semibold' in font.lower(),
                           'serif': any(k in font.lower() for k in ['serif', 'garamond', 'times', 'baskerville', 'caslon', 'didot', 'playfair', 'georgia', 'bodoni', 'minion', 'antiqua', 'cormorant', 'libre', 'lora', 'canela', 'tiempos', 'freight', 'ogg', 'recoleta']),
                           'italic': bool(fl & 2) or 'italic' in font.lower(),
                           'upper': all(not c.isalpha() or c.isupper() for c in ' '.join(lines)),
                           'color': _hex(max(colors, key=colors.get)), 'text': '\n'.join(lines)})
    json.dump(blocks, io.open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('%d blocks on %d pages -> %s' % (len(blocks), len(doc), out))


def render(pdf, ko_json, out):
    doc = fitz.open(pdf)
    ko = json.load(io.open(ko_json, encoding='utf-8'))
    tmp = os.path.splitext(out)[0] + '.blocks.tmp.json'
    extract(pdf, tmp)
    blocks = {b['id']: b for b in json.load(io.open(tmp, encoding='utf-8'))}
    os.remove(tmp)
    missing = [k for k in ko if k not in blocks]
    if missing:
        print('WARNING unknown block ids:', missing)
    by_page = {}
    for k, val in ko.items():
        if k == 'custom':
            # image menus (no text layer): [{"page":0,"bbox":[x0,y0,x1,y1],"text":"..","size":9,"color":"#222222",
            #   "bold":false,"serif":false,"align":"left","bg":"#ffffff"(optional)}]
            for i, c in enumerate(val):
                b = {'id': 'custom-%d' % i, 'page': c.get('page', 0), 'bbox': c['bbox'], 'size': c.get('size', 9),
                     'color': c.get('color', '#222222'), 'bold': c.get('bold', False), 'serif': c.get('serif', False),
                     'italic': c.get('italic', False), 'align': c.get('align', 'left'), 'bg': c.get('bg')}
                by_page.setdefault(b['page'], []).append((b, c['text']))
            continue
        if k not in blocks:
            continue
        b = dict(blocks[k])
        if isinstance(val, dict):  # {"text": "...", "align": "center", "size": 8} overrides
            text = val.get('text', '')
            b.update({x: val[x] for x in ('align', 'size', 'bold', 'serif', 'color', 'bbox') if x in val})
        else:
            text = val
        if str(text).strip():
            by_page.setdefault(b['page'], []).append((b, str(text)))
    arch = fitz.Archive()
    for p in set(os.path.dirname(f) for f in FONTS.values()):
        arch.add(p)
    css = ('@font-face{font-family:ks;src:url(malgun.ttf)} @font-face{font-family:ks;font-weight:bold;src:url(malgunbd.ttf)}'
           '@font-face{font-family:kr;src:url(batang.ttc)} * {margin:0;padding:0}')
    for pno, items in by_page.items():
        page = doc[pno]
        fills = []
        for b, _ in items:
            r = fitz.Rect(b['bbox'])
            if b.get('bg'):
                hx = b['bg'].lstrip('#')
                fill = tuple(int(hx[i:i + 2], 16) / 255 for i in (0, 2, 4))
            else:
                fill = _bg(page, r)
            fills.append(fill)
            if b['id'].startswith('custom'):
                page.draw_rect(r, color=None, fill=fill, overlay=True)  # image menus: paint over the picture
            else:
                page.add_redact_annot(r, fill=fill)
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_NONE)
        for (b, text), fill in zip(items, fills):
            r = fitz.Rect(b['bbox'])
            align = b.get('align', 'left')
            if align == 'left':
                r.x1 += max(4, r.width * 0.06)  # a little room on the right; Hangul runs wider than Latin
            fam = 'kr' if (b['serif'] and not b['bold']) else 'ks'  # Batang has no bold face: bold serif -> Malgun Bold
            weight = 'bold' if b['bold'] else 'normal'
            style = 'italic' if b['italic'] else 'normal'
            body = '<br>'.join(line.replace('&', '&amp;').replace('<', '&lt;') for line in text.split('\n'))
            html = ('<div style="font-family:%s;font-weight:%s;font-style:%s;font-size:%.1fpt;line-height:1.22;color:%s;text-align:%s">%s</div>'
                    % (fam, weight, style, b['size'], b['color'], align, body))
            rc = page.insert_htmlbox(r, html, css=css, archive=arch, scale_low=0.7)
            if rc[0] < 0:
                print('OVERFLOW %s: %s' % (b['id'], text[:40]))
    doc.subset_fonts()  # embed only the glyphs used (otherwise every box carries a full CJK font)
    doc.save(out, garbage=3, deflate=True)
    print('saved', out)


def img2pdf(out, *imgs):
    """Wrap menu photos/JPGs (no text layer) into a PDF so `render` can paint Korean over them with 'custom' boxes."""
    doc = fitz.open()
    for p in imgs:
        im = fitz.open(p)
        rect = im[0].rect
        pdfbytes = im.convert_to_pdf()
        doc.insert_pdf(fitz.open('pdf', pdfbytes))
    doc.save(out)
    print('saved', out, len(doc), 'pages')


def images(pdf, out_dir, prefix, width=1700):
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf)
    from PIL import Image
    outs = []
    for i, page in enumerate(doc):
        zoom = width / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        p = os.path.join(out_dir, '%s-%d.webp' % (prefix, i + 1))
        img.save(p, 'WEBP', quality=82, method=6)
        outs.append(p)
    print('\n'.join(outs))


def pair(en_pdf, ko_pdf, out_dir, menu, width=1700):
    """Render EN and KO pages with the SAME whitespace crop, so text is as large as possible on a phone and
    flipping languages keeps every dish in the same spot. Writes <menu>-en-N.webp / <menu>-ko-N.webp."""
    from PIL import Image, ImageChops
    os.makedirs(out_dir, exist_ok=True)
    de, dk = fitz.open(en_pdf), fitz.open(ko_pdf)
    assert len(de) == len(dk), 'page count differs'
    outs = []
    for i in range(len(de)):
        ims = []
        for d in (de, dk):
            pg = d[i]
            z = width / pg.rect.width
            pix = pg.get_pixmap(matrix=fitz.Matrix(z, z), alpha=False)
            ims.append(Image.frombytes('RGB', (pix.width, pix.height), pix.samples))
        en, ko = ims
        bg = en.getpixel((2, 2))
        box = None
        for im in (en, ko):
            diff = ImageChops.difference(im, Image.new('RGB', im.size, bg)).convert('L').point(lambda v: 255 if v > 18 else 0)
            b = diff.getbbox()
            if b:
                box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
        if box:
            pad = int(width * 0.035)
            box = (max(0, box[0] - pad), max(0, box[1] - pad), min(en.width, box[2] + pad), min(en.height, box[3] + pad))
            en, ko = en.crop(box), ko.crop(box)
        for lang, im in (('en', en), ('ko', ko)):
            if im.width > width:
                im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            p = os.path.join(out_dir, '%s-%s-%d.webp' % (menu, lang, i + 1))
            im.save(p, 'WEBP', quality=82, method=6)
            outs.append(p)
    print(chr(10).join(outs))


if __name__ == '__main__':
    cmd = sys.argv[1]
    {'html2pdf': html2pdf, 'extract': extract, 'render': render, 'images': images, 'img2pdf': img2pdf, 'pair': pair}[cmd](*sys.argv[2:])
