![Akasha](https://i.imgur.com/Wrf8TXo.png)

No-frills [Electron](https://github.com/electron/electron)-powered local database applet for [genshin-db](https://github.com/search?q=genshin-db).
======

![electron_9WyvZcfsBp](https://user-images.githubusercontent.com/98726245/214561115-dda8d677-af13-4f29-abcb-a6935dd35b1e.gif)

___

⚠️ Versions <= 1.0.0 are very early initial builds
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
* Category-lists (i.e. Character-list, Weapon-list, etc)
___
