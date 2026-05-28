# Live Translator

A real-time multilingual translator built with plain HTML/CSS/JS — no frameworks, no build step, one file.

**Live demo:** https://abdusalom0v.github.io/live-translator/

## Features

- 🎤 **Speech-to-text** via Aisha API (Uzbek + other languages)
- ✨ **Translation** via Claude AI or your own backend
- 🔊 **Text-to-speech** via Aisha API (Uzbek) / browser Web Speech API
- 🌐 Languages: Uzbek, Russian, English, Turkish, Arabic
- ⇄ Swap languages + swap text
- 📋 Copy & clear on each panel
- ⌨️ `Ctrl+Enter` keyboard shortcut to translate

## Setup

Open the app and click **⚙️ Settings** to configure:

| Setting | Purpose |
|---|---|
| **Aisha API Key** | Speech recognition & Uzbek TTS (pre-filled with default key) |
| **Backend URL** | Your deployed backend with `/api/translate` endpoint (e.g. Railway) |
| **Claude API Key** | Direct translation if no backend (stored in browser only) |

You only need **one** of: Backend URL **or** Claude API key.

## Tech

- Plain HTML + CSS + JS (zero dependencies)
- [Aisha API](https://aisha.group) — Uzbek STT & TTS
- [Anthropic Claude](https://anthropic.com) — translation
- GitHub Pages — hosting
