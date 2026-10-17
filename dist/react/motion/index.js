// MBX brand-motion layer for the web (React DOM) — the in-house answer to a
// premium Lottie pack: pure CSS + inline SVG, no lottie-web runtime, no .json
// payloads, nothing to licence.
//
//   import { BarberPoleMotion, ScissorsSnip, ClipperBuzz } from '@mbx/icons/react/motion'
//
// Each component has NO hooks and NO event handlers, so it renders on the server
// (React Server Component-safe) and the animation runs entirely in CSS once the
// markup is in the DOM — effectively zero shipped JavaScript. A single shared
// stylesheet is hoisted and de-duped by React 19's <style href precedence>, so
// any number of instances inject it once (older React degrades to a harmless
// inline <style>). Every animation pauses under prefers-reduced-motion.
//
// Colours come from CSS custom properties with brand defaults, so a consumer can
// retheme by setting --mbx-gold / --mbx-gold-2 / --mbx-gold-deep / --mbx-cream
// on any ancestor. Speed is tunable per instance via the `speed` prop.

import { createElement as h, forwardRef, Fragment } from 'react';

const CSS = `
/* 1 — barber pole: a glass cylinder of climbing two-tone stripes, between two
   chrome-gold finial caps. The stripe tile and the scroll distance are both one
   45deg period (6+6px → 16.97px), so the climb loops seamlessly. */
.mbx-pole{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;
  filter:drop-shadow(0 6px 12px rgba(0,0,0,.45))}
.mbx-pole__tube{position:relative;flex:1;width:82%;border-radius:999px;overflow:hidden}
.mbx-pole__stripes{position:absolute;inset:0;
  background:repeating-linear-gradient(45deg,var(--mbx-gold,#e8b54a) 0 6px,var(--mbx-cream,#efe7d7) 6px 12px);
  background-size:16.97px 16.97px;animation:mbx-pole-climb var(--mbx-pole-speed,.8s) linear infinite}
.mbx-pole__glass{position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(90deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.14) 16%,rgba(255,255,255,0) 40%,
    rgba(255,255,255,.55) 50%,rgba(255,255,255,0) 60%,rgba(0,0,0,.14) 84%,rgba(0,0,0,.5) 100%);
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.28)}
.mbx-pole__cap{position:relative;flex:none;width:100%;height:10%;border-radius:999px;
  background:linear-gradient(180deg,var(--mbx-gold-2,#f2ce84),var(--mbx-gold,#e8b54a) 55%,var(--mbx-gold-deep,#6b561f));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 2px 5px rgba(0,0,0,.4)}
.mbx-pole__cap::after{content:"";position:absolute;left:50%;transform:translateX(-50%);
  height:100%;aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 36% 30%,var(--mbx-gold-2,#f2ce84),var(--mbx-gold,#e8b54a) 45%,var(--mbx-gold-deep,#6b561f));
  box-shadow:0 1px 3px rgba(0,0,0,.4)}
.mbx-pole__cap--t::after{top:-70%}
.mbx-pole__cap--b::after{bottom:-70%}
@keyframes mbx-pole-climb{to{background-position:0 -16.97px}}

/* 2 — scissors: both blades pivot on the SHARED joint (13,12 in the viewBox),
   so they open and close instead of each spinning on its own box. */
.mbx-scissors{display:inline-block;vertical-align:middle;color:var(--mbx-gold,#e8b54a)}
.mbx-scissors .mbx-blade{transform-box:view-box;transform-origin:13px 12px}
.mbx-scissors .mbx-blade--a{animation:mbx-snip-a var(--mbx-snip-speed,1.4s) ease-in-out infinite}
.mbx-scissors .mbx-blade--b{animation:mbx-snip-b var(--mbx-snip-speed,1.4s) ease-in-out infinite}
@keyframes mbx-snip-a{0%,100%{transform:rotate(0)}50%{transform:rotate(-11deg)}}
@keyframes mbx-snip-b{0%,100%{transform:rotate(0)}50%{transform:rotate(11deg)}}

/* 3 — clipper: a fast buzz, with two vibration ticks flanking the blade. */
.mbx-clipper{display:inline-block;vertical-align:middle;color:var(--mbx-gold,#e8b54a);
  animation:mbx-buzz var(--mbx-buzz-speed,.1s) linear infinite}
.mbx-clipper .mbx-vib{transform-box:view-box;transform-origin:center;
  animation:mbx-vib 1s ease-in-out infinite}
.mbx-clipper .mbx-vib--2{animation-delay:.18s}
@keyframes mbx-buzz{0%,100%{transform:translate(0,0) rotate(0)}
  25%{transform:translate(.35px,-.25px) rotate(.8deg)}
  50%{transform:translate(-.3px,.25px) rotate(-.8deg)}
  75%{transform:translate(.25px,.2px) rotate(.5deg)}}
@keyframes mbx-vib{0%,100%{opacity:0}50%{opacity:.9}}

@media (prefers-reduced-motion:reduce){
  .mbx-pole__stripes,
  .mbx-scissors .mbx-blade--a,.mbx-scissors .mbx-blade--b,
  .mbx-clipper,.mbx-clipper .mbx-vib{animation:none!important}
  .mbx-clipper .mbx-vib{opacity:0}
}`;

// One shared, de-duped stylesheet (see header note).
const Style = () => h('style', { href: 'mbx-motion', precedence: 'default' }, CSS);

// aria-hidden unless the caller gave the mark an accessible label.
const a11y = (rest) => ({ 'aria-hidden': rest['aria-label'] ? undefined : true });

const cx = (base, extra) => (extra ? base + ' ' + extra : base);
const vars = (obj) => {
  const out = {};
  for (const k in obj) if (obj[k] != null) out[k] = obj[k];
  return out;
};

/**
 * Spinning barber pole — a brand accent for page / route loading states.
 * `size` is the pole's height in px (width follows the ~0.4 aspect ratio).
 */
export const BarberPoleMotion = forwardRef(function BarberPoleMotion(
  { size = 96, speed, className, style, ...rest }, ref) {
  const height = typeof size === 'number' ? size : parseFloat(size) || 96;
  const width = Math.round(height * 40) / 100;
  return h(Fragment, null,
    h(Style),
    h('span', {
      ref,
      className: cx('mbx-pole', className),
      style: { width, height, ...vars({ '--mbx-pole-speed': speed }), ...style },
      ...a11y(rest),
      ...rest,
    },
      h('span', { className: 'mbx-pole__cap mbx-pole__cap--t' }),
      h('span', { className: 'mbx-pole__tube' },
        h('span', { className: 'mbx-pole__stripes' }),
        h('span', { className: 'mbx-pole__glass' })),
      h('span', { className: 'mbx-pole__cap mbx-pole__cap--b' }),
    ),
  );
});
BarberPoleMotion.displayName = 'BarberPoleMotion';

/** Snipping scissors — a hover micro-interaction for Book buttons. */
export const ScissorsSnip = forwardRef(function ScissorsSnip(
  { size = 32, speed, className, style, ...rest }, ref) {
  return h(Fragment, null,
    h(Style),
    h('svg', {
      ref,
      className: cx('mbx-scissors', className),
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
      style: { ...vars({ '--mbx-snip-speed': speed }), ...style },
      ...a11y(rest),
      ...rest,
    },
      h('g', { className: 'mbx-blade mbx-blade--a' },
        h('circle', { cx: 5, cy: 8, r: 2.4 }),
        h('line', { x1: 6.8, y1: 8.9, x2: 21, y2: 16 })),
      h('g', { className: 'mbx-blade mbx-blade--b' },
        h('circle', { cx: 5, cy: 16, r: 2.4 }),
        h('line', { x1: 6.8, y1: 15.1, x2: 21, y2: 8 })),
      h('circle', { cx: 13, cy: 12, r: 1, fill: 'currentColor', stroke: 'none' }),
    ),
  );
});
ScissorsSnip.displayName = 'ScissorsSnip';

/** Buzzing hair clipper — icon liveliness for empty / tool states. */
export const ClipperBuzz = forwardRef(function ClipperBuzz(
  { size = 32, speed, className, style, ...rest }, ref) {
  return h(Fragment, null,
    h(Style),
    h('svg', {
      ref,
      className: cx('mbx-clipper', className),
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
      style: { ...vars({ '--mbx-buzz-speed': speed }), ...style },
      ...a11y(rest),
      ...rest,
    },
      h('line', { className: 'mbx-vib', x1: 3.5, y1: 5, x2: 5.2, y2: 5 }),
      h('line', { className: 'mbx-vib mbx-vib--2', x1: 18.8, y1: 5, x2: 20.5, y2: 5 }),
      h('path', { d: 'M8 9v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9' }),
      h('path', { d: 'M6 9h12V6H6Z' }),
      h('path', { d: 'M7.5 6V3.5M10.5 6V3.5M13.5 6V3.5M16.5 6V3.5' }),
      h('path', { d: 'M12 13v3' }),
    ),
  );
});
ClipperBuzz.displayName = 'ClipperBuzz';
