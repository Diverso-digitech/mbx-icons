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

/** Frosted face under a hairstyle: the glass plate for the hair family. */
const FACE = rr(21, 30, 22, 26, 11);
/** Hair cap sitting on the face. */
const CAP = `<path d="M14 34c0-14 8-24 18-24s18 10 18 24c-5-6-11-8-18-8s-13 2-18 8Z" fill="url(#g)"/>`;
/** A plait: alternating tilted segments down a column. */
const plait = (x, y0, y1, w = 6, fill = 'url(#g)') => { let out = ''; for (let y = y0, k = 0; y < y1; y += w * 0.95, k++) out += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${w * 1.5}" rx="${w / 2}" transform="rotate(${k % 2 ? 28 : -28} ${x} ${y + w * 0.75})" fill="${fill}"/>`; return out; };
/** A loc: rope with segment marks. */
const loc = (x, y0, y1, w = 5) => `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${w / 2}" fill="url(#g)"/>` + Array.from({ length: Math.floor((y1 - y0 - 6) / 6) }, (_, i) => `<rect x="${x - w / 2}" y="${y0 + 5 + i * 6}" width="${w}" height="1.6" fill="#fff" fill-opacity=".45"/>`).join('');
/** Scissors as solid: two blades crossing, rings at the bottom. */
const SCISSORS = `<path d="M15 8 50 46l-5 4L10 12Z" fill="url(#g)"/><path d="M49 8 14 46l5 4L54 12Z" fill="url(#g)"/><path d="M15 58a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm0-3.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="url(#g2)" fill-rule="evenodd"/><path d="M49 58a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm0-3.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="url(#g2)" fill-rule="evenodd"/><circle cx="32" cy="27" r="2.2" fill="url(#g2)"/>`;
/** Scissors as glass (plate paths), top-right, for the haircut icon. */
const SCISSORS_GLASS = ['M38 6 58 28l-3 3L35 9Z', 'M58 6 38 28l3 3L61 9Z', 'M36 38a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M60 38a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'];
/** Safety razor as glass: head + handle. */
const RAZOR_GLASS = [rr(38, 8, 20, 9, 3), rr(46, 17, 4, 32, 2)];

const scissorBladeGlass = 'M50 34 30 10l-5 4 20 24Z';
const scissorRingGlass = 'M47 46a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z';

export const frosted = [
  // ───────────── Hair ─────────────
  { name: 'hair', category: 'hair', hue: 'gold',
    back: SCISSORS,
    glass: ['M4 40a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v3H4Z', ...[7, 12, 17, 22, 27].map((x) => rr(x, 43, 3, 11, 1.5))] },
  { name: 'haircut', category: 'hair/haircut', hue: 'gold',
    back: bust(26, 28, 11),
    glass: SCISSORS_GLASS },
  { name: 'hair-styling', category: 'hair/hair-styling', hue: 'gold',
    back: `${R(8, 20, 32, 18, 9)}${R(38, 24, 14, 10, 3, 'url(#g2)')}<path d="M16 38h12l-3 18H13Z" fill="url(#g2)"/>${W('M12 26h20v3H12Z')}`,
    glass: [rr(52, 22, 10, 3.5, 1.75), rr(54, 28, 8, 3.5, 1.75), rr(52, 34, 10, 3.5, 1.75)] },
  { name: 'hair-color', category: 'hair/hair-color', hue: 'purple',
    back: `<path d="M10 32h34c0 10-7 18-17 18S10 42 10 32Z" fill="url(#g)"/>${W('M10 32h34v4H10Z')}`,
    glass: ['M30 30 50 10l5 5-20 20Z', rr(27, 29, 8, 8, 2)] },
  { name: 'braids', category: 'hair/braids', hue: 'gold',
    back: `${CAP}${plait(14, 28, 58, 7)}${plait(50, 28, 58, 7)}${plait(22, 32, 58, 6)}${plait(42, 32, 58, 6)}`,
    glass: [FACE] },
  { name: 'box-braids', category: 'hair/braids/box-braids', hue: 'gold',
    back: `${CAP}<g fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.4"><path d="M24 12v16M40 12v16M17 22h30"/></g>${plait(12, 28, 58, 6)}${plait(52, 28, 58, 6)}${plait(20, 32, 58, 5)}${plait(44, 32, 58, 5)}`,
    glass: [FACE] },
  { name: 'knotless-braids', category: 'hair/braids/knotless-braids', hue: 'gold',
    back: `${CAP}${R(11, 24, 6, 12, 3)}${R(47, 24, 6, 12, 3)}${plait(14, 36, 58, 6)}${plait(50, 36, 58, 6)}${R(19, 28, 5, 10, 2.5)}${R(40, 28, 5, 10, 2.5)}${plait(21.5, 38, 58, 5)}${plait(42.5, 38, 58, 5)}`,
    glass: [FACE] },
  { name: 'cornrows', category: 'hair/braids/cornrows', hue: 'gold',
    back: `<path d="M12 40V30c0-12 9-22 20-22s20 10 20 22v10c-4-4-6-10-6-14-4 4-9 6-14 6s-10-2-14-6c0 4-2 10-6 14Z" fill="url(#g)"/><g fill="none" stroke="url(#g2)" stroke-width="3.4" stroke-linecap="round"><path d="M16 36c0-10 4-18 10-22M25 34c0-8 3-15 7-19M39 34c0-8-3-15-7-19M48 36c0-10-4-18-10-22"/></g><g fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" stroke-dasharray="1.6 2.6"><path d="M16 36c0-10 4-18 10-22M25 34c0-8 3-15 7-19M39 34c0-8-3-15-7-19M48 36c0-10-4-18-10-22"/></g>`,
    glass: [rr(20, 28, 24, 30, 12)] },
  { name: 'locs', category: 'hair/locs', hue: 'gold',
    back: `${CAP}${loc(13, 26, 58)}${loc(51, 26, 58)}${loc(20, 30, 58)}${loc(44, 30, 58)}${loc(32, 12, 22, 6)}`,
    glass: [FACE] },
  { name: 'hair-extensions', category: 'hair/hair-extensions', hue: 'gold',
    back: `<path d="M20 14h14c4 10-2 18 2 28 2 6 0 12-5 16-4-2-7-5-9-10-3-8 2-16-2-26Z" fill="url(#g)"/><path d="M27 17c2 9-2 17 1 27 1 4 2 7 4 10" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/><path d="M27 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="url(#g2)" fill-rule="evenodd"/>${R(18, 12, 18, 5, 2.5, 'url(#g2)')}`,
    glass: ['M38 20h9c3 8-1 14 2 22 1 5 0 9-3 12-3-2-5-5-6-9-2-6 1-12-2-25Z'] },
  { name: 'hair-treatments', category: 'hair/hair-treatments', hue: 'green',
    back: `${R(18, 22, 22, 32, 5)}${R(23, 14, 12, 10, 2)}${W('M18 34h22v3H18Z')}`,
    glass: ['M34 42c0-10 8-16 18-16 0 10-8 16-18 16Z', 'M34 42l9-9'] ,
    detail: line('M36 41l8-8', 1.6) },

  // ───────────── Beard & shave ─────────────
  { name: 'beard-shave', category: 'beard-shave', hue: 'navy',
    back: `<path d="M6 8c2 3 5 5 8 6v4c0 12 6 23 14 26h4c8-3 14-14 14-26v-4c3-1 6-3 8-6-5 3-10 4-15 4-2 0-4-1-6-2h-6c-2 1-4 2-6 2-5 0-10-1-15-4Z" fill="url(#g)"/><path d="M30 20c-2-3-5-4-8-3-2 1-3 3-5 2 1 3 4 4 7 3 2-.5 4-1 6-2 2 1 4 1.5 6 2 3 1 6 0 7-3-2 1-3-1-5-2-3-1-6 0-8 3Z" fill="url(#g2)"/><path d="M24 27c2 2 10 2 12 0" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>`,
    glass: [rr(36, 6, 24, 10, 4), rr(45, 16, 6, 36, 3)],
    detail: `<rect x="39" y="10" width="18" height="2" rx="1"/>` },

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
    back: `<path d="M27 58c-8 0-13-6-13-16 0-8 3-13 5-22 2-7 9-10 15-7 6 3 11 7 11 15 0 14-7 30-18 30Z" fill="url(#g)"/><g fill="url(#g2)"><circle cx="17" cy="13" r="4.5"/><circle cx="26" cy="8" r="3.2"/><circle cx="34" cy="9" r="2.8"/><circle cx="40" cy="12" r="2.4"/><circle cx="44" cy="16" r="2.1"/></g>`,
    glass: ['M4 40h56v8a10 10 0 0 1-10 10H14A10 10 0 0 1 4 48Z'],
    detail: line('M10 44c4-2 8 2 12 0s8-2 12 0 8 2 12 0 6-2 8 0', 1.6) },
  { name: 'acrylic-nails', category: 'nails/acrylic-nails', hue: 'pink',
    back: `<path d="M14 60V46l-6-10a3 3 0 0 1 5-3l3 4V22a3 3 0 0 1 6 0v12h2V18a3 3 0 0 1 6 0v16h2V21a3 3 0 0 1 6 0v13h2V26a3 3 0 0 1 6 0v18c0 9-7 16-16 16Z" fill="url(#g)"/><path d="M19 22l3-12 3 12ZM27 18l3-12 3 12ZM35 21l3-12 3 12ZM43 26l3-10 3 10Z" fill="url(#g2)"/>`,
    glass: ['M52 8l2.2 5.8 5.8 2.2-5.8 2.2L52 24l-2.2-5.8L44 16l5.8-2.2Z'] },
  { name: 'gel-nails', category: 'nails/gel-nails', hue: 'pink',
    back: `${R(6, 10, 52, 32, 10)}${R(12, 28, 40, 14, 6, 'url(#g2)')}<rect x="16" y="31" width="32" height="2.4" rx="1.2" fill="#fff" fill-opacity=".85"/><circle cx="48" cy="18" r="2.2" fill="#fff" fill-opacity=".6"/><rect x="14" y="16" width="14" height="3" rx="1.5" fill="#fff" fill-opacity=".35"/>`,
    glass: [rr(18, 46, 28, 14, 7), rr(19, 32, 5.5, 17, 2.75), rr(25.5, 30, 5.5, 19, 2.75), rr(32, 30, 5.5, 19, 2.75), rr(38.5, 32, 5.5, 17, 2.75)] },

  // ───────────── Skin & face ─────────────
  { name: 'skin-face', category: 'skin-face', hue: 'teal',
    back: `<path d="M30 6C19 6 12 16 12 30s8 24 18 24 18-10 18-24S41 6 30 6Z" fill="url(#g)"/><g fill="#fff" fill-opacity=".7"><circle cx="23" cy="27" r="2"/><circle cx="37" cy="27" r="2"/></g><path d="M24 38c2 2.5 10 2.5 12 0" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>`,
    glass: ['M50 8l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z', 'M44 40l1.6 4.4 4.4 1.6-4.4 1.6L44 52l-1.6-4.4-4.4-1.6 4.4-1.6Z'] },
  { name: 'facials', category: 'skin-face/facials', hue: 'teal',
    back: `<path d="M32 6C21 6 14 16 14 30s8 24 18 24 18-10 18-24S43 6 32 6Z" fill="url(#g)"/><path d="M26 42c2 2 10 2 12 0" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>`,
    glass: [circ(23, 28, 7), circ(41, 28, 7)],
    detail: `<circle cx="23" cy="28" r="3.2" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="41" cy="28" r="3.2" fill="none" stroke="#fff" stroke-width="1.4"/>` },
  { name: 'waxing', category: 'skin-face/face-waxing', hue: 'teal',
    back: `<path d="M12 30h36v16a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8Z" fill="url(#g)"/><path d="M12 30c6-4 30-4 36 0-6 2-30 2-36 0Z" fill="#fff" fill-opacity=".45"/>`,
    glass: ['M30 32 44 8l6 3-13 23Z'] },

  // ───────────── Body ─────────────
  { name: 'body', category: 'body', hue: 'green',
    back: `${C(28, 9, 6)}<path d="M18 18h20a4 4 0 0 1 4 4v12l-4 1v-9l-1 1v31h-7V40h-4v18h-7V27l-1-1v9l-4-1V22a4 4 0 0 1 4-4Z" fill="url(#g)"/>`,
    glass: ['M40 52c0-12 9-20 20-20 0 12-9 20-20 20Z'],
    detail: line('M43 49l12-12', 1.6) },
  { name: 'massage', category: 'body/massage', hue: 'green',
    back: `${R(6, 40, 52, 8, 4)}${R(10, 48, 5, 10, 2)}${R(49, 48, 5, 10, 2)}`,
    glass: [circ(16, 33, 7), rr(24, 29, 34, 11, 5.5)] },
  { name: 'body-waxing', category: 'body/body-waxing', hue: 'green',
    back: `<path d="M24 4h14c-2 9-5 16-4 24 .5 6 3 10 7 14l8 7c2 2 1 5-2 5H30c-5 0-8-3-8-8V34c-1-10-2-20 2-30Z" fill="url(#g)"/><path d="M27 8c-2 8-2 16-1 24" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>`,
    glass: ['M38 8c6-4 14-4 20 2-4 1-6 4-6 8-5-4-10-6-14-4Z', 'M8 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z'],
    detail: line('M42 12c4-2 8-2 12 0', 1.4) },
  { name: 'spray-tan', category: 'body/spray-tan', hue: 'gold',
    back: `${R(14, 30, 20, 28, 6)}${R(19, 24, 10, 6, 2, 'url(#g2)')}<path d="M19 12h12l6 3-6 3h-6v6h-6Z" fill="url(#g)"/><path d="M14 18c-3 3-3 6 0 9" fill="none" stroke="url(#g2)" stroke-width="3" stroke-linecap="round"/>${W('M14 42h20v3H14Z')}`,
    glass: [circ(42, 20, 5), circ(52, 26, 4), circ(44, 32, 3.5), circ(54, 38, 3), circ(46, 42, 2.4)] },

  // ───────────── Makeup ─────────────
  { name: 'makeup', category: 'makeup', hue: 'red',
    back: `${R(22, 30, 20, 26, 4)}${W('M22 30h20v4H22Z')}`,
    glass: ['M26 30V14l12-6v22Z'] },
  { name: 'permanent-makeup', category: 'permanent-makeup', hue: 'purple',
    back: `<path d="M6 24c6-8 14-11 24-9 8 2 14 5 18 9-5-1-10 0-14 2-6 3-12 4-18 2-4-1-7-2-10-4Z" fill="url(#g)"/><path d="M12 36c6-6 14-8 22-6 6 1 10 4 13 8-4-1-8-1-12 1-6 3-12 3-17 1-2-1-4-2-6-4Z" fill="url(#g2)" opacity=".9"/>${C(31, 37, 4, '#fff')}${C(31, 37, 2.2, 'url(#g2)')}`,
    glass: ['M36 46 54 28l6 6-18 18h-6Z', 'M36 46l-5 9 9-5Z'],
    detail: `<g fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"><path d="M14 22l2-5M22 19l1-5M30 19l0-5M38 21l-1-5"/></g>` },

  // ───────────── Tattoo & piercing ─────────────
  { name: 'tattoo-piercing', category: 'tattoo-piercing', hue: 'navy',
    back: `<path d="M32 56S8 42 8 24a10 10 0 0 1 18-6l6 6 6-6a10 10 0 0 1 18 6c0 18-24 32-24 32Z" fill="url(#g)"/>`,
    glass: ['M4 30h56l-4 6 4 6H4l4-6Z'],
    detail: line('M14 36h36', 1.6) },

  // ───────────── Kids ─────────────
  { name: 'kids', category: 'kids', hue: 'teal',
    back: `${bust(30, 28, 11)}<path d="M19 26a11 11 0 0 1 22 0c-3-3-7-4.5-11-4.5S22 23 19 26Z" fill="url(#g2)"/>`,
    glass: ['M50 6l3 7 7.5 1-5.5 5 1.5 7.5-6.5-4-6.5 4 1.5-7.5-5.5-5 7.5-1Z'] },

  // ───────────── House call ─────────────
  { name: 'house-call', category: 'house-call', hue: 'red',
    back: `<path d="M10 30h44v24a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2Z" fill="url(#g)"/><path d="M4 30 32 6l28 24-5 0L32 13 9 30Z" fill="url(#g2)"/>${R(42, 10, 6, 10, 1, 'url(#g2)')}<rect x="18" y="38" width="10" height="10" rx="2" fill="#fff" fill-opacity=".45"/><path d="M44 22h8v30h-8Z" fill="url(#g2)"/><g fill="#fff" fill-opacity=".85"><path d="M44 28l8-3v3l-8 3ZM44 36l8-3v3l-8 3ZM44 44l8-3v3l-8 3Z"/></g>${R(42, 20, 12, 3, 1.5, 'url(#g2)')}${R(42, 51, 12, 3, 1.5, 'url(#g2)')}`,
    glass: ['M30 56V40a6 6 0 0 1 12 0v16Z'],
    detail: `<circle cx="39" cy="49" r="1.3"/>` },
];

/** service_categories.path → frosted icon name. Roots cover their subtrees via ancestor fallback. */
export const FROSTED_BY_CATEGORY = Object.fromEntries(frosted.map((f) => [f.category, f.name]));
