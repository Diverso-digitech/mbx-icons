# @mbx/icons

Outline icons drawn for the barber trade, shared by the MyBarber barber app,
client app, My Shop app, admin dashboard and website.

- 24 × 24 grid, stroke 1, round caps and joins, `currentColor`.
- 97 icons in five groups: tools of the trade, services, booking & schedule,
  money, MBX programs & people.
- Preview: [`docs/preview.html`](docs/preview.html) — search, size/stroke/colour
  controls, click to copy.

## Licence

Source-available, not open source. MBX's own apps use these icons freely;
**anyone else needs MBX's explicit written approval** before using, copying,
modifying or redistributing them. See [LICENSE](LICENSE) for the terms and
how to ask.

## Install

```bash
npm install github:Diverso-digitech/mbx-icons#v0.3.1
```

`dist/` is committed, so a git install needs no build step. Pin a tag; bump
the tag when icons change.

## Use

**Next.js (admin dashboard, website)** — same shape as lucide-react:

```tsx
import { Scissors, Deposit, MbxIcon } from '@mbx/icons/react';

<Scissors size={20} />                       // inherits CSS color
<Deposit size={16} color="var(--red)" />
<MbxIcon name={booking.statusIcon} size={18} />   // name is typed: MbxIconName
```

**Expo (barber, client, shop apps)** — needs `react-native-svg`, which all
three already have:

```tsx
import { Fade, MbxIcon } from '@mbx/icons/react-native';

<Fade size={24} color={colors.text} />       // pass color explicitly; there is no CSS to inherit
<MbxIcon name="walk-in" size={20} color={colors.muted} strokeWidth={2} />
```

Props on both: `name` (generic component only), `size`, `color`,
`strokeWidth` (grid units, default 1), `absoluteStrokeWidth` (keep the
stroke at N px whatever the size), plus any SVG prop.

**Service categories** — every node of the admin taxonomy maps to an icon:

```tsx
import { categoryIcon, CATEGORY_ICONS } from '@mbx/icons';        // also re-exported from /react and /react-native

<MbxIcon name={categoryIcon(service.category.path)} />            // 'hair/braids/box-braids' → 'box-braids'
categoryIcon('hair/braids/some-new-node')                         // → 'braids' (nearest ancestor)
categoryIcon(null)                                                // → 'haircut' (fallback, overridable)
```

The map lives in `src/icons.mjs` next to the drawings and is checked at
build time, so a typo'd icon name fails the build rather than the app.

**Anything else** — raw assets:

```html
<svg width="24" height="24"><use href="/sprite.svg#mbx-barber-pole"/></svg>
```

```js
import { svg, names, META } from '@mbx/icons';   // markup strings, e.g. for email or S3
import icons from '@mbx/icons/icons.json';        // manifest for a picker UI
```

Files: `@mbx/icons/svg/<name>.svg`, `@mbx/icons/sprite.svg`.

## Adding or changing an icon

1. Edit [`src/icons.mjs`](src/icons.mjs). Reuse the primitives at the top
   (`BUST`, `HEAD_HIGH`, `CALENDAR`, `RING`, `BOTTLE`, `CAN`) so people,
   calendars and bottles stay one family.
2. Draw inside 2…22 on the 24 grid. Only `<path>`, `<circle>`, `<rect>`,
   `<line>`. Never set a colour; `fill="currentColor"` marks a deliberately
   solid piece (see `deposit`). A dot is a solid circle, r .9.
3. `npm run build`. It refuses duplicates, unknown categories, disallowed
   elements, hard-coded colours and coordinates off the grid.
4. Check `docs/preview.html` at 16 px and 48 px. It must still read at 16.
5. Commit `src/`, `dist/` and `docs/` together (`npm run check` fails if
   `dist/` is stale), tag a new version, bump the tag in each consumer.

## Naming

Names say what the icon *means* in the product, not what it draws:
`deposit` (a part-paid pie), `walk-in` (arrow into a door), `no-show`
(a dashed person). Tools are named after the tool.
