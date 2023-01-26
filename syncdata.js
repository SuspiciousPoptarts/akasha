const genshindb = require('genshin-db');
const fs = require('fs');
const path = require('path');

/*

    CHARACTERS

*/

// <!-- Without { recursive: true }, mkdirSync errors if a folder already exists! --->
function rmkdirSync(path) {
    fs.mkdirSync(path, { recursive: true });
}

function makeRoot() {
    rmkdirSync("./data/animals/");
    rmkdirSync("./data/artifacts/");
    rmkdirSync("./data/characters/");
    rmkdirSync("./data/domains/");
    rmkdirSync("./data/enemies/");
    rmkdirSync("./data/food/");
    rmkdirSync("./data/materials/");
    rmkdirSync("./data/outfits/");
    rmkdirSync("./data/weapons/");
    rmkdirSync("./data/windgliders/");

    makeCharacterFolders();
}

function makeCharacterFolders() {
    var characterlist = genshindb.characters("names", { matchCategories: true });

    fs.writeFileSync('./data/characters/meta.json', JSON.stringify(characterlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    characterlist.forEach((name) => {
        rmkdirSync('./data/characters/' + name.toLowerCase().replaceAll(/[":]/g, ""), { recursive: true });
    });
}

function updateCharacterList() {
    var characterlist = genshindb.characters("names", { matchCategories: true });

    characterlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/characters/' + name.toLowerCase().replaceAll(/[":]/g, "") + '/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.characters(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

function updateTalentList() {
    var characterlist = genshindb.talents("names", { matchCategories: true });

    characterlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/characters/' + name.toLowerCase().replaceAll(/[":]/g, "") + '/talents.json',
                JSON.stringify(genshindb.talents(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

function updateConstellationList() {
    var characterlist = genshindb.constellations("names", { matchCategories: true });

    characterlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/characters/' + name.toLowerCase().replaceAll(/[":]/g, "") + '/constellations.json',
                JSON.stringify(genshindb.constellations(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// WEAPONS
function updateWeaponList() {
    var weaponlist = genshindb.weapons("names", { matchCategories: true });


    fs.writeFileSync("./data/weapons/@meta.json", JSON.stringify(weaponlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        }
    )));

    weaponlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/weapons/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.weapons(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// ARTIFACTS
function updateArtifactList() {
    var artifactlist = genshindb.artifacts("names", { matchCategories: true });
    fs.writeFileSync("./data/artifacts/@meta.json", JSON.stringify(artifactlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    artifactlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/artifacts/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.artifacts(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// MATERIALS
function updateMaterialList() {
    var materiallist = genshindb.materials("names", { matchCategories: true });
    fs.writeFileSync("./data/materials/@meta.json", JSON.stringify(materiallist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    materiallist.forEach((name) => {
        try {
            fs.writeFileSync('./data/materials/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.materials(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// FOODS
function updateFoodList() {
    var foodlist = genshindb.foods("names", { matchCategories: true });
    fs.writeFileSync("./data/food/@meta.json", JSON.stringify(foodlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    foodlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/food/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.foods(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// DOMAINS
function updateDomainList() {
    var domainlist = genshindb.domains("names", { matchCategories: true });
    fs.writeFileSync("./data/domains/@meta.json", JSON.stringify(domainlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    domainlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/domains/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.domains(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// ENEMIES
function updateEnemyList() {
    var enemylist = genshindb.enemies("names", { matchCategories: true });
    fs.writeFileSync("./data/enemies/@meta.json", JSON.stringify(enemylist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    enemylist.forEach((name) => {
        try {
            fs.writeFileSync('./data/enemies/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.enemies(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { console.log(name + " not found!") }
    });
}

// OUTFITS
function updateOutfitList() {
    var outfitlist = genshindb.outfits("names", { matchCategories: true });
    fs.writeFileSync("./data/outfits/@meta.json", JSON.stringify(outfitlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    outfitlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/outfits/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.outfits(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// WINDGLIDERS
function updateWindgliderList() {
    var windgliderlist = genshindb.windgliders("names", { matchCategories: true });
    fs.writeFileSync("./data/windgliders/@meta.json", JSON.stringify(windgliderlist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    windgliderlist.forEach((name) => {
        try {
            fs.writeFileSync('./data/windgliders/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.windgliders(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

// ANIMALS
function updateAnimalList() {
    var animallist = genshindb.animals("names", { matchCategories: true });
    fs.writeFileSync("./data/animals/@meta.json", JSON.stringify(animallist.map(
        name => {
            return name.toLowerCase().replaceAll(/[":]/g, "");
        })));

    animallist.forEach((name) => {
        try {
            fs.writeFileSync('./data/animals/' + name.toLowerCase().replaceAll(/[":]/g, "") + '.json',
                JSON.stringify(genshindb.animals(name)),
                (error) => { if (error) throw error; });
        }
        catch (e) { }
    });
}

/*
    MASTER
*/

function updateCharacterMaster() {
    updateCharacterList();
    updateTalentList();
    updateConstellationList();
}

function updateMaster() {
    updateCharacterMaster(),

        updateWeaponList(),
        updateArtifactList(),
        updateMaterialList(),
        updateFoodList(),
        updateDomainList(),
        updateEnemyList(),
        updateOutfitList(),
        updateWindgliderList(),
        updateAnimalList(),

        fs.writeFileSync("./data/ready", "");
}

makeRoot();
updateMaster();