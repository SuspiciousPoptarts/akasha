![Akasha](https://i.imgur.com/Wrf8TXo.png)

No-frills [Electron](https://github.com/electron/electron)-powered local database applet for [genshin-db](https://github.com/search?q=genshin-db).
======

![Akasha_AvPuzorgRR](https://user-images.githubusercontent.com/98726245/215025411-3502b2db-1865-4d9b-9495-14a1112382d8.gif)

___

* Rewrite In-Progress
* ⚠️ Versions <= 1.0.0 are very early initial builds
* ⚠️ Fuzzy-search only kicks in if your query returns zero initial matches, and makes the assumption that [as a human you are more likely to accurately remember the first (and last) letter of a term](https://en.wikipedia.org/wiki/Recency_bias), so fuzzy-search results almost always match *at least* the first letter of your search query (But it can, though unlikely, match with some substring later into the matched result)
___

# Building Akasha:

First, clone the repo
```bash
git clone https://github.com/SuspiciousPoptarts/akasha <your\dir>
cd <your\dir>
```
Then, install [NodeJS](https://nodejs.org/en/) dependencies with npm:
```bash
npm install
```
or [Yarn](https://yarnpkg.com/):
```bash
yarn
```

Then, generate the necessary JSON files:
```bash
node syncdata
```

Finally, build with [electron-builder](https://github.com/electron-userland/electron-builder):
```bash
electron-builder
```
⚠️ if electron-builder is not a recognized command-line argument, install it via `npm i electron-builder --save-dev`

Inside `<your/dir>/dist` an `Akasha Setup <ver>.exe` will have been built, and *that* is your installer.

___

# 📝 TO-DO:
* Theming Support ✅
* Enemy Pages ✅
* Material Pages ✅
* Food Pages ✅
* Animal/Creature Pages ✅
* Category-lists (i.e. Character-list, Weapon-list, etc) ✅
___
