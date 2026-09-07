// Renders dist/preview.html — a browsable contact sheet of the library.
export function renderPreview({ manifest, categories, grid, strokeWidth, rootAttrs }) {
  const data = JSON.stringify(manifest.map(({ name, category, keywords, body }) => ({ name, category, keywords, body })));
  const cats = JSON.stringify(categories);
  const counts = Object.fromEntries(Object.keys(categories).map((c) => [c, manifest.filter((i) => i.category === c).length]));
  const sections = Object.entries(categories)
    .map(
      ([key, label]) => `
    <section class="cat" data-cat="${key}">
      <header class="cat-head"><h2>${label}</h2><span class="count">${counts[key]}</span></header>
      <div class="grid" id="grid-${key}"></div>
    </section>`,
    )
    .join('');

  return `<title>MBX Icons</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root {
    --bg: #F4F5F7; --surface: #FFFFFF; --ink: #171A21; --muted: #5F6672; --chrome: #C9CED6; --hair: #E1E4E9;
    --red: #C8102E; --blue: #1E3A5F; --on-accent: #FFFFFF;
    --tile: #FFFFFF; --tile-hover: #EEF1F5; --sel: #FFF3F4;
  }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
    --bg: #14171D; --surface: #1C2028; --ink: #E6E8EC; --muted: #9AA1AC; --chrome: #3A404B; --hair: #2A2F38;
    --red: #E63B52; --blue: #8FB0DA; --on-accent: #FFFFFF;
    --tile: #1C2028; --tile-hover: #262B35; --sel: #2A1D21;
  } }
  :root[data-theme="dark"] {
    --bg: #14171D; --surface: #1C2028; --ink: #E6E8EC; --muted: #9AA1AC; --chrome: #3A404B; --hair: #2A2F38;
    --red: #E63B52; --blue: #8FB0DA; --on-accent: #FFFFFF;
    --tile: #1C2028; --tile-hover: #262B35; --sel: #2A1D21;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 15px/1.5 "IBM Plex Sans", system-ui, sans-serif; }
  h1, h2 { font-family: Oswald, "Arial Narrow", sans-serif; text-transform: uppercase; letter-spacing: .02em; margin: 0; text-wrap: balance; }
  code, .mono { font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace; }
  a { color: inherit; }

  .pole { height: 8px; background: repeating-linear-gradient(-55deg, var(--red) 0 14px, var(--surface) 14px 28px, var(--blue) 28px 42px, var(--surface) 42px 56px); }
  .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

  .mast { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end; padding: 36px 0 20px; border-bottom: 1px solid var(--hair); }
  .mast h1 { font-size: 44px; line-height: 1; font-weight: 600; }
  .mast p { margin: 10px 0 0; max-width: 62ch; color: var(--muted); }
  .spec { display: grid; grid-template-columns: auto auto; gap: 4px 16px; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }
  .spec b { color: var(--ink); font-weight: 500; }

  .bar { position: sticky; top: 0; z-index: 5; background: var(--bg); border-bottom: 1px solid var(--hair); }
  .bar .wrap { display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; padding-top: 12px; padding-bottom: 12px; }
  .bar label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); }
  .bar input[type="search"] { flex: 1 1 260px; min-width: 200px; padding: 8px 12px; font: inherit; color: var(--ink); background: var(--surface); border: 1px solid var(--chrome); border-radius: 6px; }
  .bar input[type="range"] { accent-color: var(--red); width: 110px; }
  .bar input[type="color"] { width: 30px; height: 26px; border: 1px solid var(--chrome); border-radius: 4px; padding: 0; background: none; }
  .bar output { min-width: 3.5ch; color: var(--ink); font-variant-numeric: tabular-nums; }
  .bar button { font: inherit; font-size: 13px; padding: 6px 10px; border: 1px solid var(--chrome); border-radius: 6px; background: var(--surface); color: var(--ink); cursor: pointer; }
  :focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }

  .body { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 32px; padding: 24px 0 64px; }
  .cat { margin-bottom: 36px; }
  .cat[hidden] { display: none; }
  .cat-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; }
  .cat-head h2 { font-size: 20px; font-weight: 500; }
  .count { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: 8px; }
  .tile { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 6px 10px; background: var(--tile); border: 1px solid var(--hair); border-radius: 6px; cursor: pointer; color: var(--ink); font: inherit; }
  .tile:hover { background: var(--tile-hover); }
  .tile[aria-pressed="true"] { background: var(--sel); border-color: var(--red); }
  .tile .ico { display: grid; place-items: center; height: 48px; }
  .tile .ico svg { width: var(--size, 24px); height: var(--size, 24px); stroke-width: var(--sw, ${strokeWidth}); color: var(--icon-color, currentColor); }
  .tile .nm { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--muted); }
  .tile[hidden] { display: none; }
  .empty { color: var(--muted); padding: 24px 0; }

  aside { position: sticky; top: 72px; align-self: start; background: var(--surface); border: 1px solid var(--hair); border-radius: 8px; padding: 18px; }
  aside h3 { margin: 0 0 4px; font: 500 16px/1.3 "IBM Plex Mono", monospace; }
  aside .kw { color: var(--muted); font-size: 13px; margin: 0 0 14px; }
  .stage { display: grid; place-items: center; height: 120px; background: var(--bg); border-radius: 6px; margin-bottom: 14px;
    background-image: linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px); background-size: 12px 12px; background-position: center; }
  .stage svg { width: 96px; height: 96px; color: var(--icon-color, currentColor); stroke-width: var(--sw, ${strokeWidth}); }
  aside dl { margin: 0; display: grid; gap: 10px; }
  aside dt { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: 4px; }
  aside dd { margin: 0; }
  aside pre { margin: 0; padding: 8px 10px; font-size: 12px; line-height: 1.45; background: var(--bg); border-radius: 4px; overflow-x: auto; white-space: pre; }
  .actions { display: flex; gap: 8px; margin-top: 14px; }
  .actions button { flex: 1; font: inherit; font-size: 13px; padding: 8px; border: 1px solid var(--chrome); border-radius: 6px; background: var(--surface); color: var(--ink); cursor: pointer; }
  .actions button.primary { background: var(--red); border-color: var(--red); color: var(--on-accent); }

  .toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%) translateY(20px); opacity: 0; background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: 6px; font-size: 13px; transition: .2s; pointer-events: none; }
  .toast.on { opacity: 1; transform: translateX(-50%); }
  @media (prefers-reduced-motion: reduce) { .toast { transition: none; } }
  @media (max-width: 860px) { .body { grid-template-columns: 1fr; } aside { position: static; } .mast { grid-template-columns: 1fr; } }
</style>

<div class="pole" aria-hidden="true"></div>
<header class="wrap mast">
  <div>
    <h1>MBX Icons</h1>
    <p>An outline icon set drawn for the barber trade: the tools on the station, the services on the menu, and the booking and money states the MyBarber apps actually show. Click an icon to copy its SVG. Ships as <code>@mbx/icons</code> for the Expo apps and the Next.js sites.</p>
  </div>
  <div class="spec">
    <span>Icons</span><b>${manifest.length}</b>
    <span>Grid</span><b>${grid} × ${grid}</b>
    <span>Stroke</span><b>${strokeWidth}</b>
    <span>Colour</span><b>currentColor</b>
  </div>
</header>

<div class="bar"><div class="wrap">
  <input id="q" type="search" placeholder="Search by name or keyword — fade, deposit, walk in…" aria-label="Search icons">
  <label>Size <input id="size" type="range" min="16" max="64" step="4" value="24"><output id="size-out">24</output></label>
  <label>Stroke <input id="sw" type="range" min="1" max="2.5" step="0.25" value="${strokeWidth}"><output id="sw-out">${strokeWidth}</output></label>
  <label>Colour <input id="color" type="color" value="#171A21"><button id="color-reset" type="button">Reset</button></label>
</div></div>

<main class="wrap body">
  <div id="cats">${sections}<p class="empty" id="empty" hidden>No icon matches that search.</p></div>
  <aside id="panel" aria-live="polite">
    <h3 id="p-name">Pick an icon</h3>
    <p class="kw" id="p-kw">Each tile copies a standalone SVG. The panel shows how to use it on the web and in the Expo apps.</p>
    <div class="stage" id="p-stage"></div>
    <dl>
      <div><dt>React (Next.js)</dt><dd><pre id="p-web"></pre></dd></div>
      <div><dt>React Native (Expo)</dt><dd><pre id="p-rn"></pre></dd></div>
      <div><dt>Sprite / file</dt><dd><pre id="p-file"></pre></dd></div>
    </dl>
    <div class="actions"><button type="button" class="primary" id="copy-svg">Copy SVG</button><button type="button" id="copy-name">Copy name</button></div>
  </aside>
</main>
<div class="toast" id="toast" role="status"></div>

<script>
  const ICONS = ${data};
  const CATS = ${cats};
  const ROOT = ${JSON.stringify(rootAttrs)};
  const svgOf = (i) => '<svg ' + ROOT + '>' + i.body + '</svg>';
  const root = document.documentElement;
  const tiles = new Map();
  let selected = null;

  for (const i of ICONS) {
    const b = document.createElement('button');
    b.className = 'tile'; b.type = 'button'; b.dataset.name = i.name; b.setAttribute('aria-pressed', 'false');
    b.title = i.keywords.join(', ');
    b.innerHTML = '<span class="ico">' + svgOf(i) + '</span><span class="nm">' + i.name + '</span>';
    b.addEventListener('click', () => { select(i); copy(svgOf(i), 'Copied ' + i.name + '.svg'); });
    document.getElementById('grid-' + i.category).appendChild(b);
    tiles.set(i.name, b);
  }

  function select(i) {
    selected = i;
    for (const [n, t] of tiles) t.setAttribute('aria-pressed', String(n === i.name));
    document.getElementById('p-name').textContent = i.name;
    document.getElementById('p-kw').textContent = CATS[i.category] + ' · ' + i.keywords.join(', ');
    document.getElementById('p-stage').innerHTML = svgOf(i);
    const pascal = i.name.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
    document.getElementById('p-web').textContent = "import { " + pascal + " } from '@mbx/icons/react';\\n<" + pascal + " size={20} />";
    document.getElementById('p-rn').textContent = "import { " + pascal + " } from '@mbx/icons/react-native';\\n<" + pascal + " size={24} color={colors.text} />";
    document.getElementById('p-file').textContent = '<use href="sprite.svg#mbx-' + i.name + '"/>\\n@mbx/icons/svg/' + i.name + '.svg';
  }
  select(ICONS.find((i) => i.name === 'barber-pole'));

  let toastT;
  function copy(text, msg) {
    const done = () => { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1400); };
    try { navigator.clipboard.writeText(text).then(done, () => done()); } catch (e) { done(); }
  }
  document.getElementById('copy-svg').addEventListener('click', () => selected && copy(svgOf(selected), 'Copied ' + selected.name + '.svg'));
  document.getElementById('copy-name').addEventListener('click', () => selected && copy(selected.name, 'Copied "' + selected.name + '"'));

  const q = document.getElementById('q');
  q.addEventListener('input', () => {
    const s = q.value.trim().toLowerCase();
    let any = false;
    for (const key of Object.keys(CATS)) {
      let n = 0;
      for (const i of ICONS.filter((x) => x.category === key)) {
        const hit = !s || i.name.includes(s) || i.keywords.some((k) => k.includes(s));
        tiles.get(i.name).hidden = !hit; if (hit) n++;
      }
      document.querySelector('[data-cat="' + key + '"]').hidden = n === 0;
      any = any || n > 0;
    }
    document.getElementById('empty').hidden = any;
  });

  const size = document.getElementById('size'), sw = document.getElementById('sw'), color = document.getElementById('color');
  size.addEventListener('input', () => { root.style.setProperty('--size', size.value + 'px'); document.getElementById('size-out').textContent = size.value; });
  sw.addEventListener('input', () => { root.style.setProperty('--sw', sw.value); document.getElementById('sw-out').textContent = sw.value; });
  color.addEventListener('input', () => root.style.setProperty('--icon-color', color.value));
  document.getElementById('color-reset').addEventListener('click', () => { root.style.removeProperty('--icon-color'); color.value = '#171A21'; });
</script>
`;
}
