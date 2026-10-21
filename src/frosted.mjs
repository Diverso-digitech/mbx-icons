// MBX Frosted — the illustrated family (two filled layers: a saturated
// gradient object at the back, a frosted white plate in front that blurs
// what sits beneath it). Drawn on a 64×64 grid for 48 px and up: category
// roundels, empty states, onboarding, the website. The 24-grid outline set
// in icons.mjs stays the UI set.
//
// Each entry: `back` is solid markup (fills reference the hue gradient as
// url(#g)), `glass` is a list of path data forming the frosted plate, and
// `detail` is white markup drawn on top of the plate. Never hard-code a hue:
// use url(#g) for the object and url(#g2) for its darker companion.
//
// Do not edit dist/ — run `npm run build`.

export const FROSTED_GRID = 64;

/** Hue pairs: [light, saturated, darker companion]. */
export const HUES = {
  gold: ['#FFE082', '#F2A41C', '#C77D0A'],
  red: ['#FF8A96', '#C8102E', '#8E0B21'],
  navy: ['#8FB3E6', '#1E3A5F', '#132640'],
  teal: ['#8DE8E3', '#149AA0', '#0E6E73'],
  purple: ['#CDB4FF', '#6B3BE0', '#4A24A8'],
  green: ['#B2F2B8', '#2DB35A', '#1E7F3F'],
  pink: ['#FFB3D1', '#E0397E', '#A8245A'],
};

const rr = (x, y, w, h, r) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}Z`;
const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 -${2 * r} 0Z`;
const R = (x, y, w, h, r, f = 'url(#g)') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"/>`;
const C = (cx, cy, r, f = 'url(#g)') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>`;
const W = (d) => `<path d="${d}" fill="#fff" fill-opacity=".35"/>`; // light cut on the back object
const line = (d, w = 2.4) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Head + shoulders, the shared bust for people icons. */
const bust = (cx = 30, cy = 24, r = 11) => `${C(cx, cy, r)}<path d="M${cx - 18} 58c0-11 8-17 18-17s18 6 18 17Z" fill="url(#g)"/>`;
const headOnly = (cx = 32, cy = 22, r = 12) => C(cx, cy, r);
/** Three hanging strands as glass (braids/locs/twists), x centres given. */
const strands = (xs, y0 = 30, y1 = 56, w = 6) => xs.map((x) => rr(x - w / 2, y0, w, y1 - y0, w / 2));
const scissorBladeGlass = 'M50 34 30 10l-5 4 20 24Z';
const scissorRingGlass = 'M47 46a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z';

export const frosted = [
  // ───────────── Hair ─────────────
  { name: 'hair', category: 'hair', hue: 'gold',
    back: `${R(10, 26, 36, 10, 4)}<g fill="#fff" fill-opacity=".4">${[14, 20, 26, 32, 38].map((x) => `<rect x="${x}" y="36" width="3" height="14" rx="1.5"/>`).join('')}</g>${R(10, 36, 36, 3, 1.5)}`,
    glass: [scissorBladeGlass, scissorRingGlass] },
  { name: 'haircut', category: 'hair/haircut', hue: 'gold',
    back: bust(28, 26, 11),
    glass: ['M56 30 38 8l-5 4 18 22Z', 'M52 42a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z'] },
  { name: 'hair-styling', category: 'hair/hair-styling', hue: 'gold',
    back: `${R(28, 30, 8, 26, 4)}`,
    glass: [rr(20, 8, 24, 24, 12)],
    detail: [[26, 14], [32, 12], [38, 14], [26, 20], [32, 18], [38, 20], [26, 26], [32, 24], [38, 26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('') },
  { name: 'hair-color', category: 'hair/hair-color', hue: 'purple',
    back: `<path d="M10 32h34c0 10-7 18-17 18S10 42 10 32Z" fill="url(#g)"/>${W('M10 32h34v4H10Z')}`,
    glass: ['M30 30 50 10l5 5-20 20Z', rr(27, 29, 8, 8, 2)] },
  { name: 'braids', category: 'hair/braids', hue: 'gold',
    back: headOnly(32, 20, 12),
    glass: strands([20, 32, 44], 30, 56),
    detail: [20, 32, 44].flatMap((x) => [38, 46].map((y) => `<rect x="${x - 2.5}" y="${y}" width="5" height="1.6" rx=".8"/>`)).join('') },
  { name: 'box-braids', category: 'hair/braids/box-braids', hue: 'gold',
    back: `${headOnly(32, 20, 12)}<g fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.4"><path d="M26 10v18M38 10v18M21 19h22"/></g>`,
    glass: strands([20, 32, 44], 30, 56),
    detail: [20, 32, 44].flatMap((x) => [38, 46].map((y) => `<rect x="${x - 2.5}" y="${y}" width="5" height="1.6" rx=".8"/>`)).join('') },
  { name: 'knotless-braids', category: 'hair/braids/knotless-braids', hue: 'gold',
    back: headOnly(32, 20, 12),
    glass: strands([20, 32, 44], 30, 56, 5),
    detail: [20, 32, 44].map((x) => `<rect x="${x - 2}" y="48" width="4" height="1.6" rx=".8"/>`).join('') },
  { name: 'cornrows', category: 'hair/braids/cornrows', hue: 'gold',
    back: `${C(32, 30, 20)}<g fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="3 2.5"><path d="M22 14c-2 6-2 12 0 18M32 11v22M42 14c2 6 2 12 0 18"/></g>`,
    glass: ['M12 34h40c0 11-9 18-20 18S12 45 12 34Z'] },
  { name: 'locs', category: 'hair/locs', hue: 'gold',
    back: headOnly(32, 20, 12),
    glass: [20, 32, 44].map((x) => `M${x - 3} 30c-3 4 3 8 0 12s3 8 0 12h6c3-4-3-8 0-12s-3-8 0-12Z`) },
  { name: 'hair-extensions', category: 'hair/hair-extensions', hue: 'gold',
    back: `${R(16, 10, 32, 8, 4)}<g fill="#fff" fill-opacity=".5"><circle cx="22" cy="14" r="1.8"/><circle cx="32" cy="14" r="1.8"/><circle cx="42" cy="14" r="1.8"/></g>`,
    glass: ['M18 18h8c-1 12 1 26-2 38h-8c3-12 1-26 2-38Z', 'M30 18h8c0 12 0 26 0 38h-8c0-12 0-26 0-38Z', 'M42 18h8c-1 12 1 26 2 38h-8c-3-12-1-26-2-38Z'] },
  { name: 'hair-treatments', category: 'hair/hair-treatments', hue: 'green',
    back: `${R(18, 22, 22, 32, 5)}${R(23, 14, 12, 10, 2)}${W('M18 34h22v3H18Z')}`,
    glass: ['M34 42c0-10 8-16 18-16 0 10-8 16-18 16Z', 'M34 42l9-9'] ,
    detail: line('M36 41l8-8', 1.6) },

  // ───────────── Beard & shave ─────────────
  { name: 'beard-shave', category: 'beard-shave', hue: 'navy',
    back: `<path d="M10 6h7v9c1.5 2 5 3.5 9 3.5s7.5-1.5 9-3.5V6h7v16c0 13-7 24-16 24S10 35 10 22Z" fill="url(#g)"/>${W('M19 24c2 2.5 12 2.5 14 0-2 1.2-12 1.2-14 0Z')}<path d="M22 20c1.5-2 3-2 4-.8 1-1.2 2.5-1.2 4 .8-1.5.8-3 1-4 .4-1 .6-2.5.4-4-.4Z" fill="#fff" fill-opacity=".55"/>`,
    glass: ['M34 40 52 22h8v8L42 48Z', 'M36 42 22 56a5 5 0 0 0 7 7l14-14Z'] },

  // ───────────── Brows & lashes ─────────────
  { name: 'brows-lashes', category: 'brows-lashes', hue: 'purple',
    back: `<path d="M8 38c6-9 14-14 24-14s18 5 24 14c-6 9-14 14-24 14S14 47 8 38Z" fill="url(#g)"/>${C(32, 38, 7, '#fff')}${C(32, 38, 4, 'url(#g2)')}`,
    glass: ['M8 20c8-9 24-12 46-8-3 3-9 4-16 4-9 0-19 1-30 4Z'],
    detail: line('M16 28l-3-5M32 24v-6M48 28l3-5', 2) },

  // ───────────── Nails ─────────────
  { name: 'nails', category: 'nails', hue: 'pink',
    back: `${R(18, 24, 28, 32, 10)}${W('M18 38h28v4H18Z')}`,
    glass: [rr(26, 6, 12, 20, 3)] },
  { name: 'manicure', category: 'nails/manicure', hue: 'pink',
    back: `<path d="M16 58V46l-6-10a3 3 0 0 1 5-3l3 4V14a3 3 0 0 1 6 0v14h2V11a3 3 0 0 1 6 0v17h2V14a3 3 0 0 1 6 0v14h2V20a3 3 0 0 1 6 0v22c0 9-7 16-16 16Z" fill="url(#g)"/>`,
    glass: [rr(40, 34, 14, 22, 6), rr(44, 26, 6, 9, 2)] },
  { name: 'pedicure', category: 'nails/pedicure', hue: 'pink',
    back: `<path d="M30 58c-9 0-14-5-14-14 0-7 3-12 4-20 1-6 8-9 14-6 7 3 13 6 13 14 0 12-7 26-17 26Z" fill="url(#g)"/>`,
    glass: [circ(21, 14, 5), circ(30, 10, 3.6), circ(37, 11.5, 3), circ(43, 15, 2.6), circ(47, 20, 2.3)] },
  { name: 'acrylic-nails', category: 'nails/acrylic-nails', hue: 'pink',
    back: `<path d="M20 58V38a12 12 0 0 1 24 0v20Z" fill="url(#g)"/>`,
    glass: ['M25 38a7 7 0 0 1 14 0V20L32 6l-7 14Z'] },
  { name: 'gel-nails', category: 'nails/gel-nails', hue: 'pink',
    back: `<path d="M22 24a10 10 0 0 1 20 0v14a10 10 0 0 1-20 0Z" fill="url(#g)"/>${W('M22 30c7-2 13-2 20 0v4c-7-2-13-2-20 0Z')}`,
    glass: ['M8 52V40a24 24 0 0 1 48 0v12Z'] ,
    detail: line('M32 46V36M22 48l-3-9M42 48l3-9', 1.8) },

  // ───────────── Skin & face ─────────────
  { name: 'skin-face', category: 'skin-face', hue: 'teal',
    back: `<path d="M30 8C20 9 14 18 14 30s7 22 16 22 16-10 16-22" fill="url(#g)"/>${W('M24 28a2 2 0 1 0 0 .1ZM36 28a2 2 0 1 0 0 .1Z')}<path d="M25 38c2 2 8 2 10 0" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>`,
    glass: ['M48 10l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z'] },
  { name: 'facials', category: 'skin-face/facials', hue: 'teal',
    back: `<path d="M32 6C21 6 14 16 14 30s8 24 18 24 18-10 18-24S43 6 32 6Z" fill="url(#g)"/><path d="M26 42c2 2 10 2 12 0" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>`,
    glass: [circ(23, 28, 7), circ(41, 28, 7)],
    detail: `<circle cx="23" cy="28" r="3.2" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="41" cy="28" r="3.2" fill="none" stroke="#fff" stroke-width="1.4"/>` },
  { name: 'waxing', category: 'skin-face/face-waxing', hue: 'teal',
    back: `<path d="M12 30h36v16a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8Z" fill="url(#g)"/><path d="M12 30c6-4 30-4 36 0-6 2-30 2-36 0Z" fill="#fff" fill-opacity=".45"/>`,
    glass: ['M30 32 44 8l6 3-13 23Z'] },

  // ───────────── Body ─────────────
  { name: 'body', category: 'body', hue: 'green',
    back: `${C(32, 11, 6)}<path d="M23 58V40l-6-9v-7a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v7l-6 9v18Z" fill="url(#g)"/>`,
    glass: ['M38 54c0-12 9-20 20-20 0 12-9 20-20 20Z'] },
  { name: 'massage', category: 'body/massage', hue: 'green',
    back: `${R(6, 40, 52, 8, 4)}${R(10, 48, 5, 10, 2)}${R(49, 48, 5, 10, 2)}`,
    glass: [circ(16, 33, 7), rr(24, 29, 34, 11, 5.5)] },
  { name: 'body-waxing', category: 'body/body-waxing', hue: 'green',
    back: `<path d="M26 6h14c-1 10-4 20-2 30l2 10h10l1 6H28l-2-16c-1-10-3-20 0-30Z" fill="url(#g)"/>`,
    glass: ['M14 18l2.2 5.8 5.8 2.2-5.8 2.2L14 34l-2.2-5.8L6 26l5.8-2.2Z', 'M52 36l1.6 4.4 4.4 1.6-4.4 1.6L52 48l-1.6-4.4-4.4-1.6 4.4-1.6Z'] },
  { name: 'spray-tan', category: 'body/spray-tan', hue: 'gold',
    back: `${R(14, 30, 20, 28, 6)}${R(19, 24, 10, 6, 2, 'url(#g2)')}<path d="M19 12h12l6 3-6 3h-6v6h-6Z" fill="url(#g)"/><path d="M14 18c-3 3-3 6 0 9" fill="none" stroke="url(#g2)" stroke-width="3" stroke-linecap="round"/>${W('M14 42h20v3H14Z')}`,
    glass: [circ(42, 20, 5), circ(52, 26, 4), circ(44, 32, 3.5), circ(54, 38, 3), circ(46, 42, 2.4)] },

  // ───────────── Makeup ─────────────
  { name: 'makeup', category: 'makeup', hue: 'red',
    back: `${R(22, 30, 20, 26, 4)}${W('M22 30h20v4H22Z')}`,
    glass: ['M26 30V14l12-6v22Z'] },
  { name: 'permanent-makeup', category: 'permanent-makeup', hue: 'purple',
    back: `<path d="M8 30c6-8 12-12 24-12s18 4 24 12c-6 8-12 12-24 12S14 38 8 30Z" fill="url(#g)"/>${W('M8 30h48c-6-6-12-9-24-9S14 24 8 30Z')}`,
    glass: ['M36 46 52 30l6 6-16 16h-6Z'] ,
    detail: line('M40 50l-4 4', 1.6) },

  // ───────────── Tattoo & piercing ─────────────
  { name: 'tattoo-piercing', category: 'tattoo-piercing', hue: 'navy',
    back: `<path d="M32 56S8 42 8 24a10 10 0 0 1 18-6l6 6 6-6a10 10 0 0 1 18 6c0 18-24 32-24 32Z" fill="url(#g)"/>`,
    glass: ['M4 30h56l-4 6 4 6H4l4-6Z'],
    detail: line('M14 36h36', 1.6) },

  // ───────────── Kids ─────────────
  { name: 'kids', category: 'kids', hue: 'teal',
    back: `${bust(30, 28, 11)}<path d="M30 17c0-5 3-7 7-7" fill="none" stroke="url(#g2)" stroke-width="3" stroke-linecap="round"/>`,
    glass: [circ(50, 16, 9)],
    detail: line('M50 11v10M45 16h10', 2.2) },

  // ───────────── House call ─────────────
  { name: 'house-call', category: 'house-call', hue: 'red',
    back: `<path d="M8 30 32 8l24 22v26a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z" fill="url(#g)"/>${W('M8 30 32 8l24 22-4 2-20-18-20 18Z')}`,
    glass: [rr(26, 30, 12, 26, 4)],
    detail: `<g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M28 38l8-3M28 46l8-3M28 54l8-3"/></g>` },
];

/** service_categories.path → frosted icon name. Roots cover their subtrees via ancestor fallback. */
export const FROSTED_BY_CATEGORY = Object.fromEntries(frosted.map((f) => [f.category, f.name]));
