# LiveTranslate — App UI Kit

The full classroom translation app, recreated as a click-through prototype.

## Run
Open `index.html`. Switch between **App** and **Onboarding** with the toggle at the top.

## Files
- `index.html` — demo host, wires everything together.
- `app.css` — component CSS (uses tokens from `/colors_and_type.css`).
- `AnimatedBackground.jsx` — drifting orbs + grain + pointer parallax.
- `MicButton.jsx` — circular mic with `idle | listening | processing | error` states.
- `Transcript.jsx` — `TranscriptPanel` + `Chunk` with slide-up animation, blinking caret, copy-on-hover, top-fade mask, auto-scroll.
- `Icons.jsx` — Lucide-style inline SVG icon set.
- `Onboarding.jsx` — 3-step setup (welcome, permission, language picker).
- `AppLayout.jsx` — Header + LangBar + dual panels + ControlsBar + StatusBar.

## What's mocked vs real
This is a **visual** kit. There is no real speech recognition or translation. When the mic is in `listening` state, the app fakes one incoming chunk: it types the source text word-by-word, shows the loading dots, then fills in the translation. Click the mic to cycle states.

## Token contract
All components inherit color, type, spacing, and motion from `/colors_and_type.css`. To reskin the app, change the variables there — do not edit `app.css` for color or scale.
