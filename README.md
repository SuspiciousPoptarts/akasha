![Akasha](https://i.imgur.com/Wrf8TXo.png)

No-frills [Electron](https://github.com/electron/electron)-powered local database applet for [genshin-db](https://github.com/search?q=genshin-db).
======
___

⚠️ 0.1.0 is a very early initial build: only characters, weapons, artifacts, and very basic search functionality are currently implemented.
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
* Theming Support
* Enemy Pages
* Material Pages
* Food Pages
* Animal/Creature Pages
___
