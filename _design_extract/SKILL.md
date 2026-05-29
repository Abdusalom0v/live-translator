# LiveTranslate Design System — Skill

A complete visual + component system for **LiveTranslate**, a real-time translation app used by teachers and students during class on classroom projectors and laptop screens.

## When to use
Invoke this skill when the user wants to design **anything that lives inside LiveTranslate** — a new screen, a marketing page that needs to feel like the product, a settings panel, an empty state, a notification, a printed transcript layout, or a variation of an existing component. The system is dark-theme-first (deep indigo `#1E1E3F`) and tuned for distance legibility.

Don't use this skill for unrelated translation products, generic dashboards, or apps for which the user wants a different visual identity.

## What's here
- `README.md` — full brand guide: voice, color, type, spacing, motion, iconography.
- `colors_and_type.css` — single source of truth for all design tokens (CSS variables) plus semantic typography classes (`.lt-display`, `.lt-h1` … `.lt-transcript`, `.lt-timestamp`, `.lt-label`).
- `fonts/fonts.css` — webfont imports (Inter + JetBrains Mono).
- `ui_kits/app/` — the working app prototype, broken into composable JSX:
  - `AnimatedBackground.jsx` — drifting orbs with pointer parallax.
  - `MicButton.jsx` — `idle | listening | processing | error`.
  - `Transcript.jsx` — dual-panel chunks with slide-in, blinking caret, auto-scroll, top fade.
  - `Onboarding.jsx` — 3-step welcome → permission → language picker.
  - `AppLayout.jsx` — header, language bar, panels, controls, status bar.
  - `Icons.jsx` — Lucide-style inline SVG icon set.
  - `app.css` — component styles (consumes tokens, never redefines them).
- `preview/` — static cards that populate the Design System tab.

## How to use it

1. **Read `README.md` first.** It explains tone, color usage, motion, and iconography rules.
2. **Link the tokens.** Any new page in this system MUST include both stylesheets at the top:
   ```html
   <link rel="stylesheet" href="fonts/fonts.css">
   <link rel="stylesheet" href="colors_and_type.css">
   ```
   …and if you're using app components, also `ui_kits/app/app.css`.
3. **Never hardcode color or font size.** Use the CSS variables (`var(--color-accent)`, `var(--fs-md)`) and the semantic type classes. If a value isn't in the tokens, propose adding it.
4. **Reuse before re-building.** Need a button? It's `.lt-btn` / `.lt-btn--ghost`. Need a chunk? `.lt-chunk` (+`--active`, +`--translating`). Need a panel? `.lt-panel`. Don't reinvent.
5. **Match the voice.** Sentence case, "you", no emoji except language flags, no exclamation marks, errors name the problem then the next action. See README → *Content fundamentals*.
6. **Respect motion.** Use `var(--ease-out)` for entries, `var(--ease-in-out)` for loops, `var(--dur-base)` (240ms) as default. Anything new must respect `prefers-reduced-motion`.

## Substitutions in this kit
- **Inter** and **JetBrains Mono** are loaded from Google Fonts; swap for self-hosted .woff2 in `fonts/` if you have them.
- **Lucide-style icons** are inlined as SVG in `Icons.jsx`. If the real product uses a different icon set, replace that file.
- No real speech recognition / translation. The app demo fakes one incoming chunk when in `listening` state so the animations are visible.

## Reviewer checklist (what to flag before delivering)
- Background: is the deep-indigo `#1E1E3F` the intended base?
- Mic button: do the tri-ring ripples and rotating processing arc match the desired texture?
- Orbs: literal soft-blob aesthetic, or do you want something more abstract?
- Onboarding copy is in Uzbek; confirm tone / register.
