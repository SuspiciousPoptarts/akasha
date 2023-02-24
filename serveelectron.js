const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const genshindb = require('genshin-db');
const $ = require('jquery');

// SECTION LISTS
/*
    REMOVE ALL WHITESPACE, :, ", AND ' CHARACTERS TO MATCH G.O.O.D. KEYS
*/
const filter = /[:'"-]/g;

const charList = genshindb.characters("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });

const weaponList = genshindb.weapons("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });
const artifactList = genshindb.artifacts("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });

const foodList = genshindb.foods("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });
const materialList = genshindb.materials("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });

const animalList = genshindb.animals("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });
const enemyList = genshindb.enemies("names", { matchCategories: true }).map((element) => { return element.replaceAll(filter, "").toLowerCase(); });

const searchableList = [].concat(charList, weaponList, artifactList, foodList, materialList, animalList, enemyList);

// !SECTION

// SECTION QUERY

function aliasForQuery(string) {
  // ADD SEARCH ALIASES HERE...
  if (string == "thewanderer") return "wanderer";

  return string;
}

function levDistance(comparator, comparatee) {
  if (comparator == comparatee) return 0;
  let tM = [];

  let coL = comparator.length;
  let ceL = comparatee.length;

  // INIT 2D ARRAY
  for (let i = 0; i < coL; ++i) { tM[i] = new Array(ceL) };

  for (let i = 0; i < coL; ++i) tM[i][0] = i;
  for (let j = 0; j < ceL; ++j) tM[0][j] = j;

  for (let i = 1; i < coL; ++i) {
    for (let j = 1; j < ceL; ++j) {
      tM[i][j] = Math.min(
        tM[i - 1][j] + 1, // Element Above, +1
        tM[i][j - 1] + 1, // Element Adjacent, +1
        tM[i - 1][j - 1] + (comparator[i - 1] === comparatee[j - 1] ? 0 : 1), // Diagonal Element, +1 Whether or not char at indeces match.
      );
    }
  }

  return tM[coL - 1][ceL - 1];
}

function gdbQuery(query) {
  let lowerQuery = aliasForQuery(query.toLowerCase());

  // ? EXACT MATCHES
  if (charList.includes(lowerQuery)) {
    return [
      "character",
      JSON.stringify(genshindb.characters(lowerQuery)),
      JSON.stringify(genshindb.talents(lowerQuery)),
      JSON.stringify(genshindb.constellations(lowerQuery))
    ];
  }
  else if (weaponList.includes(lowerQuery)) {
    return ["weapon", JSON.stringify(genshindb.weapons(lowerQuery))]
  }
  else if (foodList.includes(lowerQuery)) {
    return ["food", JSON.stringify(genshindb.foods(lowerQuery))]
  }
  else if (artifactList.includes(lowerQuery)) {
    return ["artifact", JSON.stringify(genshindb.artifacts(lowerQuery))]
  }
  else if (enemyList.includes(lowerQuery)) {
    return ["enemy", JSON.stringify(genshindb.enemies(lowerQuery))]
  }
  else if (materialList.includes(lowerQuery)) {
    return [
      "material",
      JSON.stringify(genshindb.materials(lowerQuery)),
      JSON.stringify(genshindb.crafts(lowerQuery))
    ]
  }
  else if (animalList.includes(lowerQuery)) {
    return ["animal", JSON.stringify(genshindb.animals(lowerQuery))]
  }

  // ? NON-EXACT MATCHES
  let matches = [];

  // ? REGEX LAYER
  const regEx = new RegExp(lowerQuery);
  
  for(let term of searchableList) {
    if (term.match(regEx)) matches.push([term, levDistance(term, lowerQuery)]);
  }

  // ? FUZZY SEARCH LAYER (ONLY ACTIVE IF 0 REGEX MATCHES, ASSUMES FIRST CHARACTER CORRECT)
  if (matches.length == 0) {
    for(let term of searchableList) {
      if (lowerQuery[0] == term[0]) matches.push([term, levDistance(term, lowerQuery)]);
    }
  }

  if (matches.length == 0) return undefined;

  matches.sort((a, b) => { return (a[1] >= b[1]) ? 1 : -1 });

  return gdbQuery(matches[0][0]);
}

// !SECTION

// SECTION ELECTRON

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    width: 976,
    height: 540,
    minHeight: 540,
    minWidth: 976,
    autoHideMenuBar: true,
  });

  win.loadFile('pages/neo/neo.html');

  win.on("close", () => {
    app.quit();
  });

  // LISTENERS
  ipcMain.on("gdb-query-render", (event, msg) => {

    win.webContents.send(
      "gdb-receiveResponse-render",
      gdbQuery(msg)
    );

  });

  ipcMain.handle("gdb-query", async (event, msg) => {
    return gdbQuery(msg);
  });

};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("get/charList", async (event, msg) => {
  return charList;
});
ipcMain.handle("get/wepList", async (event, msg) => {
  return weaponList;
});
ipcMain.handle("get/artiList", async (event, msg) => {
  return artifactList;
});
ipcMain.handle("get/matList", async (event, msg) => {
  return materialList;
});
ipcMain.handle("get/eneList", async (event, msg) => {
  return enemyList;
});
ipcMain.handle("get/foodList", async (event, msg) => {
  return foodList;
});
ipcMain.handle("get/aniList", async (event, msg) => {
  return animalList;
});

// !SECTION