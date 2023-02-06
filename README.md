# 📦 Neo - Akasha Rewrite
![image](https://user-images.githubusercontent.com/98726245/216891610-6acbfb88-6da3-44c1-aadd-35a80f14009b.png)
Why? A rewrite was required to correct some serious project issues that made it extremely unwieldy to call ipc functions from inside a "page" due to being inside an <iframe>
---
## Parity Checklist
* Search ✅ (Exact Match, RegEx, Fuzzy Search!)
* Characters 🏗️ (90%)
* Weapons
* Artifacts
* Materials
* Food
* Animals
* Enemies
* Theme-ing
* Linkables

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
  * `data` folder no-longer generated, now just calls genshin-db directly (Zero clue why I chose to do it the previous way)
