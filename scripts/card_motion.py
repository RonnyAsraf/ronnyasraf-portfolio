"""Generates hover animations for the regular project cards (UX/UI and websites).

Each card gets its own scene list built from real screens exported from Figma:
  * product cards (dashboards and apps): one device, three screens. Each screen builds in bands,
    a cursor (desktop) or tap (phone) hits a focal point, then the whole device, frame included,
    zooms into it before the next screen slides in.
  * website cards: a browser window that builds and scrolls down the page, zooms in, then a phone
    with the mobile page that scrolls too.

Writes images to public/images/motion/<id>/ and src/data/cardMotions.ts ({ html, css } per card image key).
Usage: python3 scripts/card_motion.py <dir with source PNGs named like bluex-1.png, otto-d.png>
"""
import sys, os, glob, json, hashlib, time
from PIL import Image

SRC = sys.argv[1]
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = hashlib.md5(str(time.time()).encode()).hexdigest()[:8]
CARD_H = 100 * 508 / 590  # card height in cqw (card is 590 x 508)

def src(name): return Image.open(f'{SRC}/{name}.png').convert('RGB')

def save(im, out_dir, name, width, q=82):
    if im.width != width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{out_dir}/{name}.webp', 'WEBP', quality=q, method=6)
    return f'/images/motion/{os.path.basename(out_dir)}/{name}.webp?v={V}'

def pct(a, b): return f'{a / b * 100:.3f}%'

CURSOR = '<svg class="cur" viewBox="0 0 24 24"><path d="M5 3l14 8-6.2 1.6L9.6 19z" fill="#0e0e0e" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'

# ---------------------------------------------------------------- product cards
def product(mid, screens, device, focals, bands=None):
    """screens: source names; device 'browser' or 'phone'; focals: [(x%, y%, scale)] per screen."""
    out = f'{REPO}/public/images/motion/{mid}'; os.makedirs(out, exist_ok=True)
    for f in glob.glob(out + '/*'): os.remove(f)
    n = len(screens); DUR = 4.6 * n
    first = src(screens[0]); W, H = first.size
    if device == 'browser':
        bands = 1; save_w = 1200
        dw = 88; bar = 3.2; dh = dw * H / W + bar
    else:
        bands = 1; save_w = 520
        dw = 33; bar = 0; dh = dw * H / W
    left, top = (100 - dw) / 2, (CARD_H - dh) / 2

    scenes_html, css = [], []
    P = f'.m-{mid}'
    for i, name in enumerate(screens):
        im = src(name).resize((W, H), Image.LANCZOS) if src(name).size != (W, H) else src(name)
        band_h = H / bands; tiles = []
        for j in range(bands):
            y0, y1 = round(j * band_h), min(H, round((j + 1) * band_h) + 3)  # 3px overlap hides seams
            url = save(im.crop((0, y0, W, y1)), out, f's{i}-b{j}', save_w)
            tiles.append(f'<img class="band b{i}" style="top:{pct(y0, H)};height:{pct(y1 - y0, H)};--j:{j}" data-src="{url}" alt="" />')
        scenes_html.append(f'<div class="scene sc{i}">{"".join(tiles)}</div>')
        a, b = i / n * 100, (i + 1) / n * 100  # this scene's window in % of the loop
        e = 100 / n  # window length
        if i == 0:
            vis = f'0%, {b - e * .04:.2f}% {{ opacity: 1; transform: none; }} {b:.2f}%, 100% {{ opacity: 0; transform: translateX(-6%); }}'
        elif i == n - 1:
            vis = f'0%, {a - e * .04:.2f}% {{ opacity: 0; transform: translateX(8%); }} {a + e * .04:.2f}%, 100% {{ opacity: 1; transform: none; }}'
        else:
            vis = f'0%, {a - e * .04:.2f}% {{ opacity: 0; transform: translateX(8%); }} {a + e * .04:.2f}%, {b - e * .04:.2f}% {{ opacity: 1; transform: none; }} {b:.2f}%, 100% {{ opacity: 0; transform: translateX(-6%); }}'
        css.append(f'{P}.is-on .sc{i} {{ animation: {mid}-v{i} {DUR}s cubic-bezier(.2,.7,.2,1) infinite; }} @keyframes {mid}-v{i} {{ {vis} }}')
        st = max(0, a - .01)
        build = (f'0%, {st:.2f}% {{ opacity: 0; transform: translateY(4%) scale(.98); }} {a + e * .12:.2f}%, {b - e * .03:.2f}% {{ opacity: 1; transform: none; }} '
                 f'{b:.2f}%, 100% {{ opacity: {1 if i == n - 1 else 0}; }}')
        if i == n - 1: build = build.replace(f'{b:.2f}%, 100% {{ opacity: 1; }}', f'99.5% {{ opacity: 1; }} 100% {{ opacity: 0; }}')
        css.append(f'{P}.is-on .b{i} {{ animation: {mid}-b{i} {DUR}s cubic-bezier(.2,.7,.2,1) infinite; animation-delay: calc(var(--j) * .09s); }} @keyframes {mid}-b{i} {{ {build} }}')

    # zoom of the whole device (frame included) into each screen's focal point
    zk = []
    for i, (fx, fy, s) in enumerate(focals):
        a, e = i / n * 100, 100 / n
        o = f'transform-origin: {fx}% {fy}%;'
        zk.append(f'{a + .01:.2f}%, {a + e * .40:.2f}% {{ transform: none; {o} }} {a + e * .55:.2f}%, {a + e * .86:.2f}% {{ transform: scale({s}); {o} }} {a + e * .97:.2f}% {{ transform: none; {o} }}')
    css.append(f'{P}.is-on .rig {{ animation: {mid}-z {DUR}s cubic-bezier(.45,0,.2,1) infinite; }} @keyframes {mid}-z {{ 0% {{ transform: none; }} {" ".join(zk)} 100% {{ transform: none; }} }}')
    css.append(f'{P}.is-on .dev {{ animation: cm-dev {DUR}s cubic-bezier(.2,.7,.2,1) infinite; }}')

    # pointer: cursor glides to the focal point and clicks (desktop), or a tap ripple (phone)
    pk, rk = [], []
    for i, (fx, fy, s) in enumerate(focals):
        a, e = i / n * 100, 100 / n
        if device == 'browser':
            pk.append(f'{a + e * .14:.2f}% {{ left: {min(fx + 22, 92)}%; top: {min(fy + 26, 90)}%; transform: none; }} {a + e * .34:.2f}% {{ left: {fx}%; top: {fy}%; transform: none; }} '
                      f'{a + e * .38:.2f}% {{ left: {fx}%; top: {fy}%; transform: scale(.8); }} {a + e * .42:.2f}%, {a + e * .9:.2f}% {{ left: {fx}%; top: {fy}%; transform: none; }}')
        rk.append(f'{a + e * .36:.2f}% {{ left: {fx}%; top: {fy}%; opacity: 0; transform: translate(-50%, -50%) scale(.3); }} {a + e * .37:.2f}% {{ left: {fx}%; top: {fy}%; opacity: 1; transform: translate(-50%, -50%) scale(.6); }} '
                  f'{a + e * .46:.2f}% {{ left: {fx}%; top: {fy}%; opacity: 0; transform: translate(-50%, -50%) scale(1.5); }}')
    if device == 'browser':
        css.append(f'{P}.is-on .cur {{ animation: {mid}-c {DUR}s cubic-bezier(.45,0,.2,1) infinite; }} @keyframes {mid}-c {{ 0%, 4% {{ opacity: 0; left: 80%; top: 80%; }} 7%, 95% {{ opacity: 1; }} {" ".join(pk)} 98%, 100% {{ opacity: 0; }} }}')
    css.append(f'{P}.is-on .tap {{ animation: {mid}-t {DUR}s ease-out infinite; }} @keyframes {mid}-t {{ 0% {{ opacity: 0; }} {" ".join(rk)} 100% {{ opacity: 0; }} }}')

    bar_html = '<div class="bar"><i></i><i></i><i></i></div>' if device == 'browser' else ''
    shape = 'browser' if device == 'browser' else 'phone'
    html = (f'<div class="cm m-{mid}" aria-hidden="true"><div class="rig" style="left:{left:.2f}cqw;top:{top:.2f}cqw;width:{dw:.2f}cqw;height:{dh:.2f}cqw">'
            f'<div class="dev dev--{shape}">{bar_html}<div class="scr" style="top:{bar}cqw">{"".join(scenes_html)}<span class="tap"></span></div>'
            f'{CURSOR if device == "browser" else ""}</div></div></div>')
    return html, '\n'.join(css)

# ---------------------------------------------------------------- website cards
def site(mid, desk, phone, dfocal=(50, 30, 1.35), pfocal=(50, 30, 1.3)):
    out = f'{REPO}/public/images/motion/{mid}'; os.makedirs(out, exist_ok=True)
    for f in glob.glob(out + '/*'): os.remove(f)
    DUR = 12.0
    d, p = src(desk), src(phone)
    durl, purl = save(d, out, 'desk', 1100, 80), save(p, out, 'phone', 460, 80)
    # browser window: 88cqw wide showing a 1440 x 900 viewport (or the whole page if it is shorter)
    vh = min(900 / 1440 * d.width, d.height); bar = 3.2
    dw = 88; dh = dw * vh / d.width + bar
    dscroll = min((d.height - vh) / d.height * 100, 2.2 * vh / d.height * 100)
    pw = 33; ph = pw * 844 / 390
    pvh = min(844 / 390 * p.width, p.height)
    pscroll = min((p.height - pvh) / p.height * 100, 2.4 * pvh / p.height * 100)
    P = f'.m-{mid}'
    fx, fy, fs = dfocal; gx, gy, gs = pfocal
    css = [
        f'{P} .rig--d {{ left: {(100 - dw) / 2:.2f}cqw; top: {(CARD_H - dh) / 2:.2f}cqw; width: {dw}cqw; height: {dh:.2f}cqw; }}',
        f'{P} .rig--p {{ left: {(100 - pw) / 2:.2f}cqw; top: {(CARD_H - ph) / 2:.2f}cqw; width: {pw}cqw; height: {ph:.2f}cqw; }}',
        # browser: rises in, page builds, scrolls down, back up, zooms (frame included), leaves
        f'{P}.is-on .rig--d {{ animation: {mid}-rd {DUR}s cubic-bezier(.45,0,.2,1) infinite; }}',
        f'@keyframes {mid}-rd {{ 0% {{ opacity: 0; transform: translateY(4cqw) scale(.95); transform-origin: {fx}% {fy}%; }} 4%, 30% {{ opacity: 1; transform: none; transform-origin: {fx}% {fy}%; }} '
        f'36%, 45% {{ opacity: 1; transform: scale({fs}); transform-origin: {fx}% {fy}%; }} 48% {{ opacity: 1; transform: none; transform-origin: {fx}% {fy}%; }} 51%, 100% {{ opacity: 0; transform: translateX(-6cqw); }} }}',
        f'{P}.is-on .pg--d {{ animation: {mid}-sd {DUR}s cubic-bezier(.55,0,.25,1) infinite; }}',
        f'@keyframes {mid}-sd {{ 0% {{ opacity: 0; transform: translateY(3%); }} 5%, 9% {{ opacity: 1; transform: none; }} 24% {{ opacity: 1; transform: translateY(-{dscroll:.2f}%); }} 30%, 100% {{ opacity: 1; transform: none; }} }}',
        # phone: slides in, scrolls, zooms (frame included)
        f'{P}.is-on .rig--p {{ animation: {mid}-rp {DUR}s cubic-bezier(.45,0,.2,1) infinite; }}',
        f'@keyframes {mid}-rp {{ 0%, 48% {{ opacity: 0; transform: translateX(8cqw); transform-origin: {gx}% {gy}%; }} 54%, 82% {{ opacity: 1; transform: none; transform-origin: {gx}% {gy}%; }} '
        f'88%, 95% {{ opacity: 1; transform: scale({gs}); transform-origin: {gx}% {gy}%; }} 100% {{ opacity: 0; transform: scale({gs}); transform-origin: {gx}% {gy}%; }} }}',
        f'{P}.is-on .pg--p {{ animation: {mid}-sp {DUR}s cubic-bezier(.55,0,.25,1) infinite; }}',
        f'@keyframes {mid}-sp {{ 0%, 56% {{ transform: none; }} 76% {{ transform: translateY(-{pscroll:.2f}%); }} 82%, 100% {{ transform: none; }} }}',
    ]
    html = (f'<div class="cm m-{mid}" aria-hidden="true">'
            f'<div class="rig rig--d"><div class="dev dev--browser"><div class="bar"><i></i><i></i><i></i></div>'
            f'<div class="scr" style="top:{bar}cqw"><img class="pg pg--d" data-src="{durl}" alt="" /></div></div></div>'
            f'<div class="rig rig--p"><div class="dev dev--phone"><div class="scr"><img class="pg pg--p" data-src="{purl}" alt="" /></div></div></div></div>')
    return html, '\n'.join(css)

# ---------------------------------------------------------------- the cards
M = {}
U, S = 'images/cards/ui-ux/', 'images/cards/websites/'
M[U + 'bluex-ai'] = product('bluex', ['bluex-1', 'bluex-2', 'bluex-3'], 'browser', [(32, 34, 1.45), (40, 40, 1.45), (60, 42, 1.4)])
M[U + 'lerni'] = product('lerni', ['lerni-1', 'lerni-2', 'lerni-3'], 'browser', [(36, 34, 1.45), (45, 40, 1.45), (55, 40, 1.4)])
M[U + 'greenclick'] = product('greenclick', ['greenclick-1', 'greenclick-2', 'greenclick-3'], 'browser', [(38, 32, 1.45), (45, 42, 1.45), (55, 40, 1.4)])
M[U + 'rge-onboarding'] = product('rge', ['rge-1', 'rge-2', 'rge-3'], 'browser', [(35, 34, 1.45), (50, 42, 1.45), (55, 40, 1.4)])
M[U + 'sense'] = product('sense', ['sense-1', 'sense-2', 'sense-3'], 'phone', [(50, 32, 1.35), (50, 40, 1.35), (50, 36, 1.35)])
M[U + 'oh-hi'] = product('ohhi', ['ohhi-1', 'ohhi-2', 'ohhi-3'], 'phone', [(50, 34, 1.35), (50, 40, 1.35), (50, 36, 1.35)])
M[U + 'memorit-co'] = product('memorit', ['memorit-1', 'memorit-2', 'memorit-3'], 'phone', [(50, 34, 1.35), (50, 40, 1.35), (50, 36, 1.35)])
M[U + 'wordle'] = product('wordle', ['wordle-1', 'wordle-2', 'wordle-3'], 'phone', [(50, 46, 1.35), (50, 34, 1.35), (50, 40, 1.35)])
M[U + 'granot'] = product('granot', ['granot-1', 'granot-2', 'granot-3'], 'phone', [(50, 30, 1.35), (50, 34, 1.35), (50, 34, 1.35)])
M[U + 'stork'] = product('stork', ['stork-1', 'stork-2', 'stork-3'], 'browser', [(62, 50, 1.4), (50, 42, 1.45), (40, 30, 1.45)])
M[U + 'travelouge'] = product('travelouge', ['travelouge-1', 'travelouge-2', 'travelouge-3'], 'phone', [(50, 30, 1.35), (50, 40, 1.35), (50, 34, 1.35)])
M[U + 'nftick'] = product('nftick', ['nftick-1', 'nftick-2', 'nftick-3'], 'phone', [(50, 40, 1.35), (50, 30, 1.35), (50, 40, 1.35)])
M[U + 'takecair'] = product('takecair', ['takecair-1', 'takecair-2', 'takecair-3'], 'phone', [(50, 38, 1.35), (50, 40, 1.35), (50, 34, 1.35)])
M[S + 'otto-seven-senses'] = site('otto', 'otto-d', 'otto-m')
M[S + 'ganit-park'] = site('ganit', 'ganit-d', 'ganit-m')
M[S + 'greenclick'] = site('gcsite', 'gcsite-d', 'gcsite-m', dfocal=(75, 40, 1.4))
M[S + 'go-power'] = site('gopower', 'gopower-d', 'gopower-m', dfocal=(55, 30, 1.35))
M[S + 'qombat'] = site('qombat', 'qombat-d', 'qombat-m')
M[S + 'cover-site'] = site('coversite', 'coversite-d', 'coversite-m', dfocal=(50, 70, 1.4))
M[S + 'the-morning-club'] = site('morning', 'morning-d', 'morning-m', dfocal=(50, 45, 1.35))
M[S + 'auto-fit'] = site('autofit', 'autofit-d', 'autofit-m', dfocal=(35, 20, 1.4))
M[S + 'the-code-of-creation'] = site('code', 'code-d', 'code-m', dfocal=(70, 55, 1.35))

with open(f'{REPO}/src/data/cardMotions.ts', 'w') as f:
    f.write('/** Generated by scripts/card_motion.py - hover animations for the regular project cards. Do not edit by hand. */\n')
    f.write('export const cardMotions: Record<string, { html: string; css: string }> = ')
    f.write(json.dumps({k: {'html': h, 'css': c} for k, (h, c) in M.items()}, indent=1, ensure_ascii=False))
    f.write(';\n')
print(len(M), 'cards')
