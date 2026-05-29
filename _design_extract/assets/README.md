# Assets

| File | Purpose |
| --- | --- |
| `logo.svg` | LiveTranslate app icon — 96×96, rounded-square with gradient + white mic glyph. Drop into `<img>` or inline. |
| `icon-mic.svg` | Standalone mic glyph (Lucide-style, 1.6 stroke). Useful when you need the mark without the tile. |

Other icons in the app are drawn inline by `ui_kits/app/Icons.jsx` (Lucide style). If you need additional icons not yet in that file, copy them from [lucide.dev](https://lucide.dev) and add them to `Icons.jsx` so they stay consistent.

## Imagery
No raster imagery is bundled — the app's atmosphere is created entirely by the `AnimatedBackground` (drifting blurred orbs) and the dark indigo base. If a marketing surface needs a photo, prefer **classroom-warm** imagery (students in soft, even light) and tint with a 30% indigo overlay so the photo sits in the brand world.
