![Akasha](https://i.imgur.com/Wrf8TXo.png)

No-frills [Electron](https://github.com/electron/electron)-powered local database applet for [genshin-db](https://github.com/search?q=genshin-db).
======

![electron_MpHvPjrRib](https://user-images.githubusercontent.com/98726245/213424256-416360e3-463f-4595-9c12-a5b4d15ca679.gif)

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
* Theming Support
* Enemy Pages ✅
* Material Pages ✅
* Food Pages
* Animal/Creature Pages
___

# Screenshots

![electron_T3HyP1Kl3M](https://user-images.githubusercontent.com/98726245/213595882-ccab3b46-8636-484f-b764-7a57ee38b2fd.png)
![electron_UasfZEhi1p](https://user-images.githubusercontent.com/98726245/213595890-5836fb06-d239-4a48-9988-7c120d81cd18.png)
