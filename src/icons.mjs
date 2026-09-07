// MBX Icons — source of truth.
//
// Every icon is drawn on a 24×24 grid as an outline: no fill, stroke 1,
// round caps and joins, stroke = currentColor. `body` is the inner SVG markup
// and may only use <path>, <circle>, <rect>, <line>. Attributes other than the
// geometry (fill="currentColor", stroke-dasharray) are allowed per element
// when an icon needs them — keep that rare, and never hard-code a colour.
//
// Shared primitives below keep the set consistent: every person shares one
// head and one pair of shoulders, every calendar shares one frame, every
// bottle shares one body. Reuse them before drawing a new one.
//
// Do not edit files under dist/ — run `npm run build`.

export const GRID = 24;
export const STROKE_WIDTH = 1;

export const CATEGORIES = {
  tools: 'Tools of the trade',
  services: 'Services',
  booking: 'Booking & schedule',
  money: 'Money',
  programs: 'MBX programs & people',
};

// ── primitives ──────────────────────────────────────────────────────
/** Head for a full bust: centred, top at y=4. */
const HEAD = `<circle cx="12" cy="9" r="5"/>`;
/** Shoulders for a full bust, baseline y=21. */
const SHOULDERS = `<path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5"/>`;
const BUST = HEAD + SHOULDERS;
/** Bust shifted left, leaving the top-right corner free for a badge. */
const BUST_LEFT = `<circle cx="10" cy="9" r="5"/><path d="M2 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5"/>`;
/** Head only, higher on the grid, for hairstyles that hang below it. */
const HEAD_HIGH = `<circle cx="12" cy="7" r="5"/>`;
/** Calendar frame with binding pins and a header rule; content area y 12…19. */
const CALENDAR = `<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/>`;
/** Round status badge; content area 6…18. */
const RING = `<circle cx="12" cy="12" r="9"/>`;
/** Bottle body 8 wide with a 2-unit foot radius; shoulders at y=10. */
const BOTTLE = `<path d="M8 10h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/>`;
/** Product can/jar body 10 wide; top edge at y=8. */
const CAN = `<path d="M7 8h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z"/>`;

export const icons = [
  // ───────────────────────────── Tools ─────────────────────────────
  { name: 'scissors', category: 'tools', keywords: ['cut', 'shears', 'haircut'],
    body: `<circle cx="5" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><path d="M7 7.5 19 17.5M7 16.5 19 6.5"/>` },
  { name: 'razor', category: 'tools', keywords: ['straight razor', 'cut-throat', 'shave', 'blade'],
    body: `<path d="M10 14 18.5 5.5H21.5V8.5L13 17Z"/><path d="M11.5 12.5 4.2 19.8a1.6 1.6 0 0 0 2.3 2.3l5-5"/>` },
  { name: 'clipper', category: 'tools', keywords: ['clippers', 'trimmer', 'buzz', 'fade'],
    body: `<path d="M8 9v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9"/><path d="M6 9h12V6H6Z"/><path d="M7.5 6V3.5M10.5 6V3.5M13.5 6V3.5M16.5 6V3.5"/><path d="M12 13v3"/>` },
  { name: 'comb', category: 'tools', keywords: ['hair', 'style', 'detangle'],
    body: `<path d="M3 11V9a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 9v2Z"/><path d="M5 11v6M7.7 11v6M10.3 11v6M13 11v6M15.7 11v6M18.3 11v6"/>` },
  { name: 'neck-brush', category: 'tools', keywords: ['duster', 'brush', 'talc', 'neck'],
    body: `<rect x="10.5" y="2" width="3" height="7" rx="1.5"/><path d="M8 9h8v2H8Z"/><path d="M8.5 11 6.5 21M10.3 11l-.3 10M12 11v10M13.7 11l.3 10M15.5 11l2 10"/>` },
  { name: 'hair-dryer', category: 'tools', keywords: ['blow dry', 'dryer', 'style'],
    body: `<path d="M6 8h8a4 4 0 0 1 0 8H6a4 4 0 0 1 0-8Z"/><path d="M14 9.5h4l3-1.5v8l-3-1.5h-4"/><path d="M7.5 16 6 21h4l1-5"/><path d="M6 12h4"/>` },
  { name: 'spray-bottle', category: 'tools', keywords: ['water', 'mist', 'spritz'],
    body: `<path d="M9 4h7l3 1.5L16 7H9Z"/><path d="M11 7v3M14 7v3"/><path d="M8 10h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/><path d="M10 7.5c-1.5 1-1.8 2-1 3.2"/><path d="M21 3l1-1M22 5.5h1.5M21 8l1 1"/>` },
  { name: 'shaving-brush', category: 'tools', keywords: ['badger', 'lather', 'shave', 'brush'],
    body: `<path d="M7 10.5C7 6 9.2 3 12 3s5 3 5 7.5"/><path d="M9 10.5c.3-3 1.3-5 3-6.5M15 10.5c-.3-3-1.3-5-3-6.5M12 10.5V3.5M10.3 10.5c.2-2 .8-3.5 1.7-4.8M13.7 10.5c-.2-2-.8-3.5-1.7-4.8"/><path d="M7.5 10.5h9v1.5H7.5Z"/><path d="M8.5 12v1c0 2 1 3 1.5 4.5.3 1 0 2 0 3a2 2 0 0 0 4 0c0-1-.3-2 0-3 .5-1.5 1.5-2.5 1.5-4.5v-1"/>` },
  { name: 'shave-cream', category: 'tools', keywords: ['foam', 'lather', 'can', 'gel'],
    body: CAN + `<path d="M9 8V4.5h6V8"/><path d="M9 4.5c0-2.5 2-2.5 3-1.5 1-1 3-1 3 1.5"/><path d="M9.5 13h5"/>` },
  { name: 'towel', category: 'tools', keywords: ['cloth', 'linen', 'hanging'],
    body: `<path d="M6 3h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M6 8h12M6 11h12"/><path d="M8 19v2M16 19v2"/>` },
  { name: 'cape', category: 'tools', keywords: ['gown', 'apron', 'cutting cape'],
    body: `<path d="M4 20l3-9c1-1.5 3-2.5 5-2.5s4 1 5 2.5l3 9Z"/><path d="M9.5 9.5a2.5 2.5 0 0 0 5 0"/><path d="M12 12v2.5"/>` },
  { name: 'mirror', category: 'tools', keywords: ['hand mirror', 'reflection', 'check'],
    body: `<circle cx="12" cy="9" r="6"/><circle cx="12" cy="9" r="3"/><path d="M10.5 15.5 10 20a2 2 0 0 0 4 0l-.5-4.5"/>` },
  { name: 'barber-pole', category: 'tools', keywords: ['pole', 'sign', 'shop', 'stripes'],
    body: `<path d="M7 4h10a1 1 0 0 1 1 1v1H6V5a1 1 0 0 1 1-1Z"/><path d="M6 18h12v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z"/><path d="M7 6v12M17 6v12"/><path d="M7 9.5l10-3.5M7 14l10-3.5M7 18l10-3.5"/><path d="M12 4V2"/>` },
  { name: 'barber-chair', category: 'tools', keywords: ['chair', 'seat', 'station', 'hydraulic'],
    body: `<path d="M7 3h10a1 1 0 0 1 1 1v6H6V4a1 1 0 0 1 1-1Z"/><path d="M4 10h16v3H4Z"/><path d="M10.5 13v2h3v-2M12 15v3"/><path d="M6 21a6 3 0 0 1 12 0Z"/>` },
  { name: 'wash-basin', category: 'tools', keywords: ['sink', 'shampoo bowl', 'backwash', 'wash'],
    body: `<path d="M3 12h18c0 4-3 7-9 7s-9-3-9-7Z"/><path d="M12 12V7a2 2 0 0 1 2-2h2v3"/><circle cx="12" cy="15" r=".9" fill="currentColor"/>` },
  { name: 'pomade', category: 'tools', keywords: ['jar', 'wax', 'clay', 'product', 'styling'],
    body: `<path d="M5 5h14v3H5Z"/><path d="M6 8h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M9 13.5h6"/>` },
  { name: 'beard-oil', category: 'tools', keywords: ['dropper', 'bottle', 'oil', 'beard', 'serum'],
    body: BOTTLE + `<path d="M9 10V8h6v2"/><path d="M10 8V5h4v3"/><path d="M10.5 5a1.5 1.5 0 0 1 3 0"/><path d="M12 13l-1.5 2.5a1.5 1.5 0 0 0 3 0Z"/>` },
  { name: 'aftershave', category: 'tools', keywords: ['cologne', 'fragrance', 'bottle', 'splash'],
    body: `<path d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M10 10V8h4v2"/><path d="M9 8V4h6v4"/><path d="M15 6h3M20 3.5l1.5-1M20 8.5l1.5 1"/>` },

  // ─────────────────────────── Services ────────────────────────────
  { name: 'haircut', category: 'services', keywords: ['cut', 'trim', 'service', 'head'],
    body: BUST_LEFT + `<path d="M16 4l5 5M21 4l-5 5"/><circle cx="15" cy="3" r="1.2"/><circle cx="15" cy="10" r="1.2"/>` },
  { name: 'beard', category: 'services', keywords: ['beard trim', 'beard', 'shape', 'facial hair', 'beard & shave'],
    body: `<path d="M5 4h2.5v5C7.5 9 9 9.5 12 9.5s4.5-.5 4.5-.5V4H19v7c0 5.5-3 9.5-7 9.5S5 16.5 5 11Z"/><path d="M9.2 11.2c.9-1.1 1.9-1.1 2.8-.3.9-.8 1.9-.8 2.8.3-.9.6-1.9.8-2.8.4-.9.4-1.9.2-2.8-.4Z" fill="currentColor"/><path d="M10 14c1 1 3 1 4 0"/><path d="M8 13l-.5 3M16 13l.5 3M12 16.5v2.5"/>` },
  { name: 'shave', category: 'services', keywords: ['safety razor', 'wet shave', 'clean shave'],
    body: `<path d="M5 5h14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M8 7.5h8"/><path d="M10.5 10v9a1.5 1.5 0 0 0 3 0v-9"/>` },
  { name: 'fade', category: 'services', keywords: ['taper', 'skin fade', 'blend', 'gradient'],
    body: BUST + `<path d="M7.1 9h2.4M7.4 11h1.6M8.2 12.8h.8"/><path d="M14.5 9h2.4M15 11h1.6M15 12.8h.8"/>` },
  { name: 'kids-cut', category: 'services', keywords: ['child', 'kid', 'junior', 'cowlick'],
    body: BUST_LEFT + `<path d="M10 4c0-2 1.5-2.5 2.5-2.5"/><path d="M19 3v4M17 5h4"/>` },
  { name: 'braids', category: 'services', keywords: ['box braids', 'cornrows', 'plaits', 'protective style'],
    body: HEAD_HIGH + `<path d="M8 10.5V19M12 12v7M16 10.5V19"/><path d="M6.8 13.5h2.4M6.8 16.5h2.4M10.8 15h2.4M10.8 18h2.4M14.8 13.5h2.4M14.8 16.5h2.4"/>` },
  { name: 'locs', category: 'services', keywords: ['dreadlocks', 'dreads', 'retwist', 'loc maintenance'],
    body: HEAD_HIGH + `<path d="M8 10.5c-1.2 1.5 1.2 3 0 4.5s1.2 3 0 4.5M12 12c-1.2 1.5 1.2 3 0 4.5s1.2 2 0 3M16 10.5c1.2 1.5-1.2 3 0 4.5s-1.2 3 0 4.5"/>` },
  { name: 'twists', category: 'services', keywords: ['two-strand twists', 'senegalese', 'passion twists', 'coils'],
    body: HEAD_HIGH + `<path d="M8 10.5a1.3 1.3 0 0 1 0 2.6 1.3 1.3 0 0 0 0 2.6 1.3 1.3 0 0 1 0 2.6M12 12a1.3 1.3 0 0 1 0 2.6 1.3 1.3 0 0 0 0 2.6 1.3 1.3 0 0 1 0 2.6M16 10.5a1.3 1.3 0 0 0 0 2.6 1.3 1.3 0 0 1 0 2.6 1.3 1.3 0 0 0 0 2.6"/>` },
  { name: 'hair-wash', category: 'services', keywords: ['shampoo', 'wash', 'rinse', 'water'],
    body: `<circle cx="12" cy="13" r="5"/><path d="M4 22c0-3 3.5-4.5 8-4.5s8 1.5 8 4.5"/><path d="M8 2c-1.2 1.6-1.6 2.3-1.6 3a1.6 1.6 0 0 0 3.2 0c0-.7-.4-1.4-1.6-3ZM12 1.5c-1.2 1.6-1.6 2.3-1.6 3a1.6 1.6 0 0 0 3.2 0c0-.7-.4-1.4-1.6-3ZM16 2c-1.2 1.6-1.6 2.3-1.6 3a1.6 1.6 0 0 0 3.2 0c0-.7-.4-1.4-1.6-3Z"/>` },
  { name: 'hair-color', category: 'services', keywords: ['dye', 'tint', 'colour', 'bleach', 'bowl'],
    body: `<path d="M3 12h13c0 4-2.5 7-6.5 7S3 16 3 12Z"/><path d="M12.5 10.5 19 4l1.5 1.5-6.5 6.5Z"/><path d="M3 15.5h13"/>` },
  { name: 'line-up', category: 'services', keywords: ['edge up', 'shape up', 'hairline', 'edges'],
    body: `<path d="M6 10c0-4 2.5-6.5 6-6.5S18 6 18 10"/><path d="M3 10h18"/><path d="M6 10v5a6 6 0 0 0 12 0v-5"/><circle cx="9.5" cy="14" r=".9" fill="currentColor"/><circle cx="14.5" cy="14" r=".9" fill="currentColor"/>` },
  { name: 'mustache', category: 'services', keywords: ['moustache', 'handlebar', 'facial hair'],
    body: `<path d="M12 13.5c-1.2-2.5-3.5-3.5-5.8-2.8C4.8 11.1 4 12.3 2.5 11.8c.6 2 2.6 3 5 2.6 2-.3 3.2-1.2 4.5-.9 1.3-.3 2.5.6 4.5.9 2.4.4 4.4-.6 5-2.6-1.5.5-2.3-.7-3.7-1.1-2.3-.7-4.6.3-5.8 2.8Z" fill="currentColor"/>` },
  { name: 'eyebrows', category: 'services', keywords: ['brows', 'threading', 'shaping', 'grooming', 'eyebrow'],
    body: `<path d="M4.5 9c2.5-3 8-4 15-2.5-1 .8-2.8 1-5 1-3 0-6 .5-10 1.5Z" fill="currentColor"/><path d="M5 15c2.2-3 5-4.5 7-4.5s4.8 1.5 7 4.5c-2.2 3-5 4.5-7 4.5S7.2 18 5 15Z"/><circle cx="12" cy="15" r="2"/>` },
  { name: 'hot-towel', category: 'services', keywords: ['steam', 'towel', 'hot', 'facial', 'shave'],
    body: `<path d="M4 10h13a3.5 3.5 0 0 1 0 7H4"/><circle cx="4" cy="13.5" r="3.5"/><circle cx="4" cy="13.5" r="1.25"/><path d="M9 7c0-1.5 1-1.5 1-3M13 7c0-1.5 1-1.5 1-3M17 7c0-1.5 1-1.5 1-3"/>` },
  { name: 'add-on', category: 'services', keywords: ['extra', 'upsell', 'tag', 'plus'],
    body: `<path d="M3 3h7l9 9-7 7-9-9Z"/><circle cx="7" cy="7" r=".9" fill="currentColor"/><path d="M18 15v6M15 18h6"/>` },

  { name: 'hair', category: 'services', keywords: ['hair category', 'comb and scissors', 'salon', 'root'],
    body: `<path d="M3 3h2v18H3Z"/><path d="M5 5h4M5 8h4M5 11h4M5 14h4M5 17h4"/><path d="M14 3l6 12M20 3l-6 12"/><circle cx="14.5" cy="18" r="2.5"/><circle cx="19.5" cy="18" r="2.5"/>` },
  { name: 'hair-styling', category: 'services', keywords: ['styling', 'round brush', 'blow out', 'style'],
    body: `<rect x="8" y="3" width="8" height="11" rx="4"/><path d="M8 6H6M8 9H6M8 12H6M16 6h2M16 9h2M16 12h2"/><path d="M10.5 14v6a1.5 1.5 0 0 0 3 0v-6"/><circle cx="10.5" cy="7" r=".7" fill="currentColor"/><circle cx="13.5" cy="7" r=".7" fill="currentColor"/><circle cx="10.5" cy="10.5" r=".7" fill="currentColor"/><circle cx="13.5" cy="10.5" r=".7" fill="currentColor"/>` },
  { name: 'hair-treatments', category: 'services', keywords: ['treatment', 'conditioning', 'mask', 'perm', 'keratin'],
    body: BOTTLE + `<path d="M10 10V7h4v3"/><path d="M12 7V4h3"/><path d="M10 17c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4Z"/><path d="M10 17l3-3"/>` },
  { name: 'hair-extensions', category: 'services', keywords: ['extensions', 'weave', 'weft', 'clip-in'],
    body: `<path d="M7 4h10v2.5H7Z"/><path d="M9.5 4V2.5M12 4V2.5M14.5 4V2.5"/><path d="M8.5 6.5c-.5 5 .5 10-.5 14M12 6.5v14M15.5 6.5c.5 5-.5 10 .5 14"/>` },
  { name: 'cornrows', category: 'services', keywords: ['cornrows', 'canerows', 'rows', 'braids', 'scalp'],
    body: `<circle cx="12" cy="13" r="7.5"/><path d="M8.5 7.5c-.6 1.8-.6 3.5 0 5.5M12 6.5v6.5M15.5 7.5c.6 1.8.6 3.5 0 5.5" stroke-dasharray="1.6 1.6"/><path d="M5.5 14c1.5-1 4-1.5 6.5-1.5s5 .5 6.5 1.5"/>` },
  { name: 'box-braids', category: 'services', keywords: ['box braids', 'braids', 'parting', 'protective style'],
    body: HEAD_HIGH + `<path d="M9.5 3v5M14.5 3v5M8 5.5h8"/><path d="M8 10.5V19M12 12v7M16 10.5V19"/><path d="M6.8 14h2.4M6.8 17h2.4M10.8 15.5h2.4M10.8 18h2.4M14.8 14h2.4M14.8 17h2.4"/>` },
  { name: 'knotless-braids', category: 'services', keywords: ['knotless', 'braids', 'protective style', 'smooth root'],
    body: HEAD_HIGH + `<path d="M8 10.5V19M12 12v7M16 10.5V19"/><path d="M6.8 16h2.4M6.8 18.5h2.4M10.8 17h2.4M10.8 19h2.4M14.8 16h2.4M14.8 18.5h2.4"/>` },
  { name: 'perm', category: 'services', keywords: ['perm', 'curls', 'curly', 'texture', 'wave'],
    body: `<path d="M6 9a2 2 0 1 1 3 1.7A2 2 0 1 1 12 9a2 2 0 1 1 3 1.7A2 2 0 1 1 18 9"/><path d="M6 9v3a6 6 0 0 0 12 0V9"/><circle cx="9.5" cy="12.5" r=".9" fill="currentColor"/><circle cx="14.5" cy="12.5" r=".9" fill="currentColor"/>` },
  { name: 'head-shave', category: 'services', keywords: ['bald', 'head shave', 'razor', 'skin'],
    body: BUST_LEFT + `<path d="M7.5 7.5a3 3 0 0 1 2-1.5"/><path d="M16 3h5v2h-5Z"/><path d="M18.5 5v5"/>` },
  { name: 'hair-design', category: 'services', keywords: ['design', 'hair art', 'razor design', 'lines', 'lightning'],
    body: BUST_LEFT + `<path d="M18 2.5l-2 4h3l-2 4"/>` },
  { name: 'scalp-micropigmentation', category: 'services', keywords: ['smp', 'scalp', 'micropigmentation', 'hairline tattoo'],
    body: BUST + `<circle cx="9.5" cy="6.5" r=".9" fill="currentColor"/><circle cx="12" cy="5.5" r=".9" fill="currentColor"/><circle cx="14.5" cy="6.5" r=".9" fill="currentColor"/><circle cx="10.5" cy="8.5" r=".9" fill="currentColor"/><circle cx="13.5" cy="8.5" r=".9" fill="currentColor"/>` },
  { name: 'house-call', category: 'services', keywords: ['house call', 'mobile', 'home visit', 'on location'],
    body: `<path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 12h5v1.5h-5ZM9.5 19.5h5V21h-5Z"/><path d="M10 13.5v6M14 13.5v6"/><path d="M10 16l4-1.5M10 19l4-1.5"/>` },
  { name: 'lashes', category: 'services', keywords: ['eyelashes', 'lash extensions', 'lash lift'],
    body: `<path d="M5 15c2.2-3 5-4.5 7-4.5s4.8 1.5 7 4.5c-2.2 3-5 4.5-7 4.5S7.2 18 5 15Z"/><circle cx="12" cy="15" r="2"/><path d="M7.5 10.5l-1.5-2M12 9.5V7M16.5 10.5l1.5-2"/>` },
  { name: 'brows-lashes', category: 'services', keywords: ['brows & lashes', 'brows', 'lashes', 'eye'],
    body: `<path d="M4.5 6c2.5-3 8-4 15-2.5-1 .8-2.8 1-5 1-3 0-6 .5-10 1.5Z" fill="currentColor"/><path d="M5 16c2.2-3 5-4.5 7-4.5s4.8 1.5 7 4.5c-2.2 3-5 4.5-7 4.5S7.2 19 5 16Z"/><circle cx="12" cy="16" r="2"/><path d="M8 11.5l-1-2M12 10.5V8.5M16 11.5l1-2"/>` },
  { name: 'nails', category: 'services', keywords: ['nail polish', 'nails', 'manicure', 'bottle'],
    body: `<path d="M10.5 3h3v5h-3Z"/><path d="M8 12a4 4 0 0 1 8 0v5a4 4 0 0 1-8 0Z"/><path d="M10 8h4"/><path d="M8.5 14h7"/>` },
  { name: 'manicure', category: 'services', keywords: ['manicure', 'hand', 'nails', 'cuticle'],
    body: `<path d="M7 21v-4.5L4.6 12a1.3 1.3 0 0 1 2.3-1.2L8 12.5V4.5a1.3 1.3 0 0 1 2.6 0V10M10.6 10V3.5a1.3 1.3 0 0 1 2.6 0V10M13.2 10V4.5a1.3 1.3 0 0 1 2.6 0V10M15.8 10V7a1.3 1.3 0 0 1 2.6 0v8c0 3.5-2.5 6-6 6H7"/>` },
  { name: 'pedicure', category: 'services', keywords: ['pedicure', 'foot', 'foot spa', 'toes'],
    body: `<path d="M9.5 13V7.5a3 3 0 0 1 6 0v2l3.5 2.5"/><path d="M3 13h18l-1.5 5.5a2.5 2.5 0 0 1-2.4 1.5H6.9a2.5 2.5 0 0 1-2.4-1.5Z"/><path d="M5 15.5c2-1 3.5 1 5.5 0s3.5 1 5.5 0 3 1 4 0"/><circle cx="6" cy="8.5" r="1"/><circle cx="19" cy="6" r="1.3"/><circle cx="4.5" cy="4.5" r=".7"/>` },
  { name: 'acrylic-nails', category: 'services', keywords: ['acrylic', 'nail set', 'stiletto', 'full set', 'mags'],
    body: `<path d="M8 21v-7a4 4 0 0 1 8 0v7"/><path d="M9.5 13.5a2.5 2.5 0 0 1 5 0V7L12 2.5 9.5 7Z"/><path d="M19 5v3M17.5 6.5h3"/>` },
  { name: 'gel-nails', category: 'services', keywords: ['gel', 'shellac', 'polish brush', 'cure'],
    body: `<path d="M7 7a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0Z"/><path d="M7 9.5c2.5-1 5.5-1 8 0"/><path d="M14 21l4.8-6.8"/><path d="M18.8 14.2l1.5-2.1a1.2 1.2 0 0 0-2-1.4l-1.5 2.1"/><path d="M4 4l1 1M3 8h1.5"/>` },
  { name: 'skin-face', category: 'services', keywords: ['skin', 'face', 'skincare', 'glow'],
    body: `<path d="M11 3.5C7.5 4 5.5 7.5 5.5 11.5s2.5 8.5 6.5 8.5 6.5-4.5 6.5-8.5"/><circle cx="9.5" cy="11" r=".9" fill="currentColor"/><circle cx="14.5" cy="11" r=".9" fill="currentColor"/><path d="M10.5 15c.8.6 2.2.6 3 0"/><path d="M19 3v4M17 5h4"/>` },
  { name: 'facials', category: 'services', keywords: ['facial', 'spa', 'cucumber', 'mask', 'barber facial'],
    body: `<path d="M12 3c-4 0-6.5 3.5-6.5 8.5S8 20 12 20s6.5-3.5 6.5-8.5S16 3 12 3Z"/><circle cx="9.5" cy="11" r="1.9"/><circle cx="14.5" cy="11" r="1.9"/><path d="M10.5 15.5c.8.6 2.2.6 3 0"/>` },
  { name: 'waxing', category: 'services', keywords: ['face waxing', 'wax pot', 'spatula', 'hair removal', 'wax'],
    body: `<path d="M6 11h12v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"/><path d="M6 11c2-1.2 10-1.2 12 0"/><path d="M12.5 12L17 3.5l1.8.9L14.5 13"/><path d="M13 13.5c.2 1.2-.4 2-1 2.8"/><path d="M4 21h16"/>` },
  { name: 'body-waxing', category: 'services', keywords: ['body waxing', 'leg', 'wax strip', 'hair removal'],
    body: `<path d="M8.5 3h6c-.5 4-1.5 8-1 12l1 3.5h4l.5 2.5H10l-.6-6c-.4-4-1.3-8-.9-12Z"/><path d="M19 4v4M17 6h4"/><path d="M5 13v2.5M3.75 14.25h2.5"/>` },
  { name: 'body', category: 'services', keywords: ['body', 'figure', 'wellness', 'torso'],
    body: `<circle cx="12" cy="4" r="2"/><path d="M9 21v-7l-2.5-3.5V8.5A1.5 1.5 0 0 1 8 7h8a1.5 1.5 0 0 1 1.5 1.5v2L15 14v7"/><path d="M9 21h6"/>` },
  { name: 'massage', category: 'services', keywords: ['massage', 'spa', 'table', 'relax', 'therapy'],
    body: `<path d="M2 19h20"/><path d="M4 19v2M20 19v2"/><circle cx="6" cy="15" r="2.5"/><path d="M9.5 17.5V16a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5v1.5"/><path d="M13 6c0 2 1 3.2 2.5 3.8M18 6c0 2-1 3.2-2.5 3.8M15.5 10v1.5"/>` },
  { name: 'makeup', category: 'services', keywords: ['makeup', 'lipstick', 'beauty', 'glam'],
    body: `<path d="M9 11h6v10H9Z"/><path d="M10.5 11V6l3-2v7"/><path d="M8 21h8"/>` },
  { name: 'tattoo', category: 'services', keywords: ['tattoo', 'flash', 'heart', 'ink', 'tattoo & piercing'],
    body: `<path d="M12 20.5S4.5 16 4.5 10A3.75 3.75 0 0 1 12 7.5a3.75 3.75 0 0 1 7.5 2.5C19.5 16 12 20.5 12 20.5Z"/><path d="M2.5 12.5h19l-1.6 2.3 1.6 2.2h-19l1.6-2.2Z"/><path d="M8 14.8h8" stroke-dasharray="1 1.4"/>` },
  { name: 'piercing', category: 'services', keywords: ['piercing', 'ear', 'earring', 'stud', 'hoop'],
    body: `<path d="M7 9a5 5 0 0 1 10 0c0 3.5-2.5 4.5-2.5 7a3 3 0 0 1-6 0"/><path d="M10 9a2 2 0 0 1 4 0c0 1.5-1.5 2-1.5 3.5"/><circle cx="11.5" cy="19" r="2"/>` },

  // ───────────────────────────── Booking ───────────────────────────
  { name: 'booking', category: 'booking', keywords: ['appointment', 'calendar', 'booked', 'check'],
    body: CALENDAR + `<path d="M9 15.5l2 2 4-4"/>` },
  { name: 'reschedule', category: 'booking', keywords: ['move', 'change time', 'calendar', 'rebook'],
    body: CALENDAR + `<path d="M8 14h8l-2-2M16 18H8l2 2"/>` },
  { name: 'cancel', category: 'booking', keywords: ['cancelled', 'calendar', 'remove', 'x'],
    body: CALENDAR + `<path d="M9.5 13.5l5 5M14.5 13.5l-5 5"/>` },
  { name: 'walk-in', category: 'booking', keywords: ['walk in', 'door', 'enter', 'no appointment'],
    body: `<path d="M13 3h7v18h-7"/><circle cx="16.5" cy="12" r=".9" fill="currentColor"/><path d="M3 12h8M8.5 9l3 3-3 3"/>` },
  { name: 'no-show', category: 'booking', keywords: ['absent', 'missed', 'did not arrive', 'ghost'],
    body: `<circle cx="12" cy="9" r="5" stroke-dasharray="2.2 2.4"/><path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" stroke-dasharray="2.2 2.4"/>` },
  { name: 'confirmed', category: 'booking', keywords: ['accepted', 'approved', 'check', 'barber confirmed'],
    body: RING + `<path d="M8 12.5l2.5 2.5 5.5-6"/>` },
  { name: 'pending', category: 'booking', keywords: ['awaiting', 'hourglass', 'waiting', 'confirmation'],
    body: `<path d="M7 3h10M7 21h10"/><path d="M8 3c0 5 4 6 4 9s-4 4-4 9M16 3c0 5-4 6-4 9s4 4 4 9"/>` },
  { name: 'schedule', category: 'booking', keywords: ['clock', 'time', 'hours', 'availability'],
    body: RING + `<path d="M12 7v5l3 2"/>` },
  { name: 'reminder', category: 'booking', keywords: ['bell', 'notification', 'alert', 'push'],
    body: `<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.5 2h-15Z"/><path d="M10 21a2 2 0 0 0 4 0"/>` },
  { name: 'review', category: 'booking', keywords: ['star', 'rating', 'feedback'],
    body: `<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>` },
  { name: 'favorite', category: 'booking', keywords: ['heart', 'saved', 'like', 'favourite'],
    body: `<path d="M12 20s-8-4.5-8-10.5a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8C20 15.5 12 20 12 20Z"/>` },
  { name: 'portfolio', category: 'booking', keywords: ['gallery', 'photos', 'work', 'images'],
    body: `<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.5"/>` },
  { name: 'message', category: 'booking', keywords: ['chat', 'text', 'conversation', 'support'],
    body: `<path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4Z"/>` },
  { name: 'location', category: 'booking', keywords: ['pin', 'map', 'address', 'shop location'],
    body: `<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>` },
  { name: 'shop', category: 'booking', keywords: ['barbershop', 'storefront', 'awning', 'store'],
    body: `<path d="M3 8l2-4h14l2 4"/><path d="M3 8v1a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0V8"/><path d="M5 12v9h14v-9"/><path d="M10 21v-5h4v5"/>` },
  { name: 'qr-code', category: 'booking', keywords: ['qr', 'scan', 'referral code', 'pay link'],
    body: `<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><circle cx="6" cy="6" r=".9" fill="currentColor"/><circle cx="18" cy="6" r=".9" fill="currentColor"/><circle cx="6" cy="18" r=".9" fill="currentColor"/><path d="M18 15h3M15 21h3"/><circle cx="15" cy="15" r=".9" fill="currentColor"/><circle cx="15" cy="18" r=".9" fill="currentColor"/><circle cx="21" cy="18" r=".9" fill="currentColor"/><circle cx="21" cy="21" r=".9" fill="currentColor"/>` },

  // ───────────────────────────── Money ─────────────────────────────
  { name: 'wallet', category: 'money', keywords: ['balance', 'funds', 'ledger'],
    body: `<path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h12v3"/><path d="M15 12h6v4h-6a2 2 0 0 1 0-4Z"/>` },
  { name: 'tip', category: 'money', keywords: ['gratuity', 'hand', 'coin', 'give'],
    body: `<circle cx="15.5" cy="6.5" r="3.5"/><circle cx="15.5" cy="6.5" r=".9" fill="currentColor"/><path d="M3 14h3v7H3Z"/><path d="M6 15l5 1h4a1.5 1.5 0 0 1 0 3H9"/><path d="M15 17.5l4-1.5a1.5 1.5 0 0 1 1.5 2.5L13 21H6"/>` },
  { name: 'deposit', category: 'money', keywords: ['partial payment', 'part paid', 'down payment', 'pie'],
    body: RING + `<path d="M12 12V3a9 9 0 0 1 9 9Z" fill="currentColor"/>` },
  { name: 'cash', category: 'money', keywords: ['banknote', 'bill', 'paper money', 'offline'],
    body: `<rect x="2" y="7" width="20" height="10" rx="1.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="5.5" cy="12" r=".9" fill="currentColor"/><circle cx="18.5" cy="12" r=".9" fill="currentColor"/>` },
  { name: 'card', category: 'money', keywords: ['credit card', 'debit', 'stripe', 'payment'],
    body: `<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M2 10h20M5.5 14.5h4"/>` },
  { name: 'tap-to-pay', category: 'money', keywords: ['contactless', 'nfc', 'terminal', 'tap'],
    body: `<rect x="2" y="8" width="14" height="11" rx="1.5"/><path d="M2 12h14"/><path d="M17.5 3a7 7 0 0 1 4 4.5M17.5 6.5a3.5 3.5 0 0 1 2 2.2"/>` },
  { name: 'receipt', category: 'money', keywords: ['invoice', 'bill', 'breakdown', 'summary'],
    body: `<path d="M5 3h14v18l-2.33-1.5L14.33 21 12 19.5 9.67 21 7.33 19.5 5 21Z"/><path d="M9 8h6M9 12h6M9 16h3"/>` },
  { name: 'refund', category: 'money', keywords: ['return', 'money back', 'reverse', 'chargeback'],
    body: `<path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 3v5h5"/><path d="M12 7.5v9"/><path d="M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3"/>` },
  { name: 'earnings', category: 'money', keywords: ['revenue', 'growth', 'chart', 'income'],
    body: `<path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/>` },
  { name: 'bank', category: 'money', keywords: ['withdraw', 'payout', 'transfer', 'institution'],
    body: `<path d="M12 3l9 5H3Z"/><path d="M4 10h16"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8"/><path d="M3 21h18"/>` },
  { name: 'alert', category: 'money', keywords: ['dispute', 'warning', 'attention', 'issue'],
    body: `<path d="M12 3l10 17H2Z"/><path d="M12 10v4"/><circle cx="12" cy="17.5" r=".9" fill="currentColor"/>` },
  { name: 'ticket', category: 'money', keywords: ['expo', 'event', 'admission', 'pass'],
    body: `<path d="M2 6h20v4a2 2 0 0 0 0 4v4H2v-4a2 2 0 0 0 0-4Z"/><path d="M9 6v12" stroke-dasharray="2 2.5"/>` },

  // ────────────────────── MBX programs & people ────────────────────
  { name: 'extra-saver', category: 'programs', keywords: ['savings', 'piggy bank', 'saver', 'goal'],
    body: `<path d="M4 12c0-4 3.5-7 8-7 3 0 5.5 1.5 6.7 4H21v4h-1.6c-.4 1-1 1.8-1.7 2.5V19h-3v-1.5h-3.5V19H8v-3c-2.5-1-4-2.5-4-4Z"/><path d="M4 12H2.5c0 1 .5 1.5 1.5 1.5"/><circle cx="15.5" cy="11" r=".9" fill="currentColor"/><path d="M10.5 6h3"/>` },
  { name: 'shield', category: 'programs', keywords: ['mbx shield', 'protection', 'insurance', 'cover'],
    body: `<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6Z"/><path d="M9 12l2 2 4-4"/>` },
  { name: 'pto', category: 'programs', keywords: ['paid time off', 'umbrella', 'holiday', 'benefit'],
    body: `<path d="M2 12a10 10 0 0 1 20 0Z"/><path d="M7 12c0-4 2-7 5-9M17 12c0-4-2-7-5-9"/><path d="M12 12v7a2 2 0 0 0 4 0"/>` },
  { name: 'referral', category: 'programs', keywords: ['invite', 'refer', 'friend', 'lifetime income'],
    body: BUST_LEFT + `<path d="M19 6v6M16 9h6"/>` },
  { name: 'barber', category: 'programs', keywords: ['stylist', 'professional', 'pro', 'person', 'bow tie'],
    body: BUST + `<path d="M9.5 11.3c.6-.9 1.4-.9 2.5-.2 1.1-.7 1.9-.7 2.5.2-.8.4-1.7.6-2.5.3-.8.3-1.7.1-2.5-.3Z" fill="currentColor"/><path d="M9 15.5l3 1.3 3-1.3v3l-3-1.3-3 1.3Z"/>` },
  { name: 'client', category: 'programs', keywords: ['customer', 'user', 'person', 'guest'],
    body: BUST },
  { name: 'block', category: 'programs', keywords: ['blocked', 'ban', 'prohibit', 'restrict'],
    body: RING + `<path d="M5.6 5.6l12.8 12.8"/>` },
  { name: 'report', category: 'programs', keywords: ['flag', 'report user', 'moderation', 'abuse'],
    body: `<path d="M5 21V4h11l-2 4 2 4H5"/>` },
];

/**
 * Service taxonomy → icon. Keys are `service_categories.path` values from the
 * MyBarber API (admin-curated, 3 levels). Apps resolve a category's icon with
 * `categoryIcon(path)`, which falls back to the nearest ancestor so a new
 * level-3 node an admin adds tomorrow still gets its parent's icon.
 */
export const CATEGORY_ICONS = {
  'hair': 'hair',
  'hair/haircut': 'haircut',
  'hair/hair-styling': 'hair-styling',
  'hair/hair-color': 'hair-color',
  'hair/braids': 'braids',
  'hair/braids/box-braids': 'box-braids',
  'hair/braids/knotless-braids': 'knotless-braids',
  'hair/braids/cornrows': 'cornrows',
  'hair/locs': 'locs',
  'hair/hair-extensions': 'hair-extensions',
  'hair/hair-treatments': 'hair-treatments',
  'beard-shave': 'beard',
  'brows-lashes': 'brows-lashes',
  'nails': 'nails',
  'nails/manicure': 'manicure',
  'nails/pedicure': 'pedicure',
  'nails/acrylic-nails': 'acrylic-nails',
  'nails/gel-nails': 'gel-nails',
  'skin-face': 'skin-face',
  'skin-face/facials': 'facials',
  'skin-face/face-waxing': 'waxing',
  'body': 'body',
  'body/massage': 'massage',
  'body/body-waxing': 'body-waxing',
  'makeup': 'makeup',
  'tattoo-piercing': 'tattoo',
  'kids': 'kids-cut',
};
