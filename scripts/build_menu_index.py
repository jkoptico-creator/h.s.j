"""Collect assets/menus/*/menu.json into assets/menus/index.js (window.MENUS) so the planner only shows a
'메뉴' button for venues that actually have a published menu. Run after adding or updating menus."""
import io, json, os, glob

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
out = {}
for f in sorted(glob.glob(os.path.join(root, 'assets', 'menus', '*', 'menu.json'))):
    d = json.load(io.open(f, encoding='utf-8'))
    menus = [m for m in d.get('menus', []) if m.get('pages')]
    for m in menus:
        for p in m['pages']:
            for k in ('en', 'ko'):
                assert os.path.exists(os.path.join(root, p[k])), (f, p[k])
    if menus:
        out[d['key']] = {'name': d['name'], 'fine_dining': bool(d.get('fine_dining')),
                         'menus': [{'id': m['id'], 'title_ko': m['title_ko']} for m in menus]}
js = '/* 생성 파일: python scripts/build_menu_index.py */\nwindow.MENUS = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n'
io.open(os.path.join(root, 'assets', 'menus', 'index.js'), 'w', encoding='utf-8', newline='\n').write(js)
print('%d venues with menus: %s' % (len(out), ', '.join(out)))
