# LiveTranslate Design System

> Professional design system for **LiveTranslate** — a real-time translation app used by teachers and students during class, viewed on classroom projectors and laptop screens.

This document and its sibling files define the visual, motion, and component foundations of LiveTranslate. The system is **dark-theme-first** because the primary surface is a projected classroom display where a deep indigo (#1E1E3F) background reads comfortably from the back of the room.

## Sources

This design system was **authored from a written brief** (no codebase or Figma file was attached). The brief was provided in five sequential prompts covering:

1. Color palette, typography, motion primitives, and the animated background
2. Microphone button states (idle / listening / processing / error)
3. Dual-panel transcript area (original ↔ translation)
4. 3-step onboarding (welcome → permission → language setup)
5. Full app layout (header, language bar, transcript, controls, status bar)

Because there is no upstream code, **every component here is original**. If you later attach the production codebase or Figma file, this system should be reconciled against it.

---

## Index — files in this design system

| File / Folder | Purpose |
| --- | --- |
| `README.md` | This document — brand, voice, visual foundations, iconography. |
| `SKILL.md` | Agent-skill manifest. Read first when invoked as a skill. |
| `colors_and_type.css` | All design tokens (color, type, spacing, radius, shadow, motion) as CSS variables + semantic classes. |
| `fonts/` | Inter (sans) + JetBrains Mono (mono) webfonts. |
| `assets/` | Logos, illustrations, animated-background sprites, language flags. |
| `preview/` | Static HTML cards that populate the Design System tab. |
| `ui_kits/app/` | The LiveTranslate web/desktop app — interactive JSX components + `index.html` demo. |

---

## Product context

LiveTranslate is a **single-product** offering: a real-time speech-to-text translator. The teacher speaks in a source language, the app transcribes and translates live, and both panels are visible to students on a shared screen.

Primary use cases:

- Teacher giving a lecture in English while non-native students follow along in Uzbek (or vice versa).
- A guest speaker presenting; LiveTranslate runs on the projector beside them.
- Office-hours or one-on-one tutoring on a laptop, side-by-side translation.

Design constraints that flow from this:

- **Distance legibility.** Body text 16px minimum on laptops, 20px+ in projector mode. Line-height 1.6 for comfortable reading.
- **Calm in motion.** Anything that moves (orbs, ripples, chunk slides) must not pull focus from the words. Low opacity, soft easing, no bouncing UI chrome.
- **Status at a glance.** Recording / processing / error states are visible from across a room.
- **Zero-chrome reading.** When the teacher is presenting, the app should feel like floating text on a calm background, not "an app."

---

## Content fundamentals

**Voice.** Calm, direct, classroom-friendly. The product is an assistant in a learning space — not a hype machine and not a corporate tool. Sentences are short. Verbs do the work.

**Person & tone.**
- Address the user as **"you"** (informal) — speaker is the app, listener is the teacher or student.
- Avoid "we" except in marketing surfaces — inside the product, the app speaks as a single helpful presence.
- Never sycophantic ("Great!", "Awesome!"). Never apologetic ("Sorry, but…").

**Localisation.** The product ships with Uzbek as a first-class language alongside English. UI strings are designed to swell ~30% when translated — buttons must accommodate. Examples:
- EN: "Start"  →  UZ: "Boshlash"
- EN: "Save"   →  UZ: "Saqlash"
- EN: "Allow microphone access"  →  UZ: "Mikrofon ruxsatini berish"

**Casing.**
- Sentence case for buttons, menu items, headings: "Start translating", not "Start Translating".
- Uppercase reserved for tiny semantic labels with `--ls-mega` letter-spacing (e.g. `ORIGINAL`, `TRANSLATION`).
- Timestamps in monospace (`14:23`).

**Emoji.** Used **only** for language flags in the language picker (🇬🇧 🇺🇿 🇪🇸 …). Never in body copy, button labels, status messages, or marketing. Flags are a navigation affordance, not decoration.

**Microcopy examples (do):**
- `Recording…` `Translating…` `Ready` `Save transcript` `Microphone needed`
- `LiveTranslate listens to your microphone so it can translate live. Nothing is sent without your permission.`

**Microcopy examples (don't):**
- ❌ "🎉 Awesome! Let's get you set up!"
- ❌ "We're so excited to translate for you!"
- ❌ "Oops! Something went wrong 😬"

**Error tone.** Errors name the problem and the next action, in that order: `Microphone blocked. Open browser settings to allow.`

---

## Visual foundations

### Colors

The palette is a **deep-indigo dark scheme** with a single bright accent (`#7F77DD` violet) and two semantic colors (teal-green `#1D9E75` for ready/success, warm red `#E24B4A` for errors). The background is intentionally not pure black — `#1E1E3F` has just enough blue to feel like a classroom evening sky rather than a void, and it reads comfortably under projector light.

- **Background `#1E1E3F`** — the canvas. Always the base of every screen.
- **Card `#2A2A4A`** — transcript panels, control bar, modals. Sits ~6% above background.
- **Accent `#7F77DD`** — every interactive element (buttons, focus rings, active language). Used sparingly so it always means "this is what you tap."
- **Success `#1D9E75`** — translation ready indicator, save confirmation, "Recording" dot when stable.
- **Error `#E24B4A`** — mic-button error state, permission failures.

Soft variants (`*-soft`) at ~16% alpha are reserved for tinted backgrounds, badges, and focus halos.

### Typography

**Inter** for everything UI, **JetBrains Mono** for timestamps and any short technical readout (e.g. `~1.2s` latency). Inter is chosen for its hinted readability at small sizes and its excellent Cyrillic + extended Latin coverage (essential for Uzbek). Scale is 1.125 modular: `11, 12, 14, 16, 18, 20, 24, 30, 38, 48, 64`.

Line-height for transcript bodies is locked at **1.6** — a notch looser than typical UI text, because students are reading paragraph-level content, not skimming UI.

### Spacing & radius

4-px base. The most common rhythm is `--sp-4` (16px) inside cards and `--sp-6` (24px) between sections. Corner radii ladder: `--r-sm` (8) for chips, `--r-md` (12) for cards, `--r-lg` (16) for modals, `--r-pill` for buttons, `--r-circle` for the mic and language flags.

### Backgrounds

Every full-screen surface sits on **`AnimatedBackground`** — three SVG orbs (violet, teal, blue) drifting on staggered keyframes, blurred to 80px, at 15–25% opacity. They respond to mouse position with a subtle parallax (~12px max drift). The intent is "calm aurora behind glass" — present but never distracting. No gradients in the foreground; no patterns; no textures. The orbs do all the atmospheric work.

### Motion

Everything animated uses one of three easings:
- `--ease-out` `cubic-bezier(0.16, 1, 0.30, 1)` — UI entry (chunks, panels, modals)
- `--ease-in-out` — looped animations (pulse, orb drift, wave bars)
- `--ease-bounce` — reserved; only for celebratory moments (rare)

Durations: `--dur-fast` (150ms) for hovers, `--dur-base` (240ms) for state changes, `--dur-chunk` (300ms) for transcript chunks sliding in.

### Hover & press states

- **Hover** on cards: background lifts `--color-card` → `--color-card-hover`, no scale.
- **Hover** on buttons (filled): background lifts to `--color-accent-hover`, optional `--glow-accent` if the button is the primary CTA on its surface.
- **Hover** on transcript chunks: a thin `--color-accent-soft` halo appears + a copy icon fades in on the right.
- **Press**: `transform: scale(0.97)` on circular icon buttons; filled buttons drop to `--color-accent-press` (no scale). Mic button: scale(0.95).
- **Focus**: 2px `--color-accent` outline with 2px offset + `--color-accent-soft` halo.

### Borders, shadows, blur

- Borders are almost always `1px solid var(--color-border)` (12% accent alpha). Borders get stronger (`--color-border-strong`) only when something is focused or selected.
- Shadows are a two-layer system: a soft outer drop + an inset top highlight (`--shadow-card`) — gives the cards a sense of being lit from above without looking glassy.
- Blur is used in three places: (1) the animated background orbs, (2) the top of scrolling transcript panes (a 32px linear fade from `--color-bg` to transparent — "smoke clearing"), and (3) modal scrims.

### Transparency

Transparency is a feature. Borders, dividers, secondary text, and soft variants are all `rgba(245,245,247,…)` or `rgba(127,119,221,…)` — never opaque grey. This keeps the orbs faintly visible everywhere and ties surfaces together.

### Layout

- **Header**: fixed, 64px, contains logo + settings + history.
- **Language bar**: 56px, just below header — source on the left, target on the right, swap arrow in the middle.
- **Main**: flex-1, split 50/50 horizontally on desktop; tabs on mobile.
- **Controls**: auto height, sticky bottom, contains mic + device selectors + voice toggle.
- **Status bar**: 40px, recording dot + latency readout + save action.

The whole app is contained in a `--content-max: 1440px` flex column with safe-area padding.

### Cards

A LiveTranslate card is: `background var(--color-card)`, `border 1px solid var(--color-border)`, `border-radius var(--r-md)`, `box-shadow var(--shadow-card)`, `padding var(--sp-5)`. There is no card variant without a border. Transcript chunks are *not* cards — they're text blocks with hover-only chrome.

---

## Iconography

The brand uses **[Lucide Icons](https://lucide.dev)** at 1.5px stroke weight via CDN. Lucide was chosen because:

- It has a complete set of A/V symbols (`mic`, `mic-off`, `volume-2`, `headphones`, `wave-sine`) — central to LiveTranslate.
- Its 1.5px stroke matches the soft, calm visual register of the app.
- It's MIT-licensed and CDN-deliverable, so the system stays light.

**Rules:**

- Default size 20px; 24px in headers; 18px in dense controls; 16px inline with body text.
- Stroke is always `currentColor` so icons inherit text color.
- Never recolor an icon directly; change the surrounding text color.
- Icons inside circular buttons use the same color as the button's label.

**SVG.** The logo and the animated background orbs are SVG. Both live in `assets/`.

**Emoji.** Used only for country/language flags in pickers. Nowhere else.

**Unicode glyphs.** A short list is allowed for typographic accents: `↔` (swap), `…` (ellipsis), `·` (mid-dot separator), `•` (status dot). These are inline glyphs, not icons.

---

## Substitutions flagged

- **Inter** and **JetBrains Mono** are loaded from Google Fonts CDN rather than self-hosted, because no font files were provided. If you have a hosted-font preference, drop `.woff2` files into `fonts/` and update the `@font-face` block in `colors_and_type.css`.
- **Lucide Icons** is a substitution choice (no icon set was specified). If LiveTranslate has a different icon library in production, replace the CDN link and the `<i data-lucide="…">` usages.

---

## A clear ask

This system is built from a written spec — there is no upstream truth to verify against. **Please review the Design System tab and tell me where the visual interpretation drifts from what you have in mind.** Specifically:

1. Is the deep indigo `#1E1E3F` the right base, or do you want something darker / warmer / cooler?
2. The mic button uses a tri-ring ripple. Is that the texture you want, or something quieter?
3. The orbs in `AnimatedBackground` are pretty literal "soft blobs." Want them more abstract — beams, particles, drifting lines instead?
4. Onboarding tone — is "Mikrofon kerak" the right register, or should it lean more or less formal?
