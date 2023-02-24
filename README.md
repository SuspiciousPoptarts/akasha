# 📦 Neo

![electron_9TsBBL8dX3](https://user-images.githubusercontent.com/98726245/220016843-f0e8ad9c-7a2c-4ab5-9d74-0c0675c81a60.gif)

---
## Parity Checklist
* Search ✅ (Exact Match, RegEx, Fuzzy Search!)
* Characters ✅
* Weapons ✅
* Artifacts ✅
* Materials ✅
* Food ✅
* Animals ✅
* Enemies ✅
* Theme-ing ✅
* Linkables ✅
* Lists 🏗️ (30%)

## Goals
* [Genshin Optimizer](https://frzyc.github.io/genshin-optimizer/)-like G.O.O.D. db & management
* [Genshin Optimizer](https://frzyc.github.io/genshin-optimizer/)-like character optimization features
* Built-in OCR for character, weapon, and artifact scanning
---
## Differences

* "Page"-accents now apply to the sidebar
* "Page" fade-out now functions correctly
* "Pages" resize along with the viewport
* Future-HoyoLab map implementation will either open a BrowserView overlay or just a new window
* De-cluttered directory
  * CSS files reduced to `style` file, and `theme` file
  * "Pages" are JS files that append to the viewport, not an iframe, which means IPC calls are actually possible
  * `data` folder no-longer generated, now just calls genshin-db directly (Zero clue why I chose to do it the previous way
