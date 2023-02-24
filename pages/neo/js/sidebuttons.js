
// SECTION Lists

$("#char").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await charList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function charList() {
    let charList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th class="w64">Image</th>
                <th>Name</th>
                <th>Element</th>
                <th>Weapon</th>
                <th>Substat</th>
                <th>Stars</th>
            </tr>`;
    for(let character of await window.api.getCharList()) {
        let charInfo = JSON.parse((await window.api.queryGenshinDB(character))[1]);
        charList += `
        <tr>
            <td>
                <image src="${charInfo["images"]["icon"]}" class="h64 w64 no-shadow">
            </td>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${charInfo["name"]}')">${charInfo["fullname"]}</a>
            </td>
            <td>${charInfo["element"]}</td>
            <td>${charInfo["weapontype"]}</td>
            <td>${charInfo["substat"]}</td>
            <td>${charInfo["rarity"]}</td>
        </tr>
        `;
    }
    charList += `</table><div class="clear-float w100p h16"></div></div>`;
    return charList;
}

$("#wep").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await wepList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function wepList() {
    let wepList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th class="w64">Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Substat</th>
                <th>Stars</th>
            </tr>`;
    for(let weapon of await window.api.getWepList()) {
        // ?  'filter' is defined in query.js
        let wepInfo = JSON.parse((await window.api.queryGenshinDB(weapon))[1]);
        wepList += `
        <tr>
            <td>
                <image src="${wepInfo["images"]["icon"]}" class="h64 w64 no-shadow">
            </td>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${wepInfo["name"].replaceAll(filter, '')}')">${wepInfo["name"]}</a>
            </td>
            <td>${wepInfo["weapontype"]}</td>
            <td>${wepInfo["substat"]}</td>
            <td>${wepInfo["rarity"]}</td>
        </tr>
        `;
    }
    wepList += `</table><div class="clear-float w100p h16"></div></div>`;
    return wepList;
}

$("#arti").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await artiList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function artiList() {
    let artiList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th class="w64">Image</th>
                <th>Name</th>
                <th colspan="2">Set Bonus</th>
                <th>Stars</th>
            </tr>`;
    for(let artifact of await window.api.getArtiList()) {
        // ?  'filter' is defined in query.js
        let artiInfo = JSON.parse((await window.api.queryGenshinDB(artifact))[1]);
        artiList += `
        <tr>
            <td>
                <image src="${(artiInfo["images"]["flower"])? artiInfo["images"]["flower"]:artiInfo["images"]["circlet"]}" class="h64 w64 no-shadow">
            </td>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${artiInfo["name"].replaceAll(filter, '')}')">${artiInfo["name"]}</a>
            </td>
            <td class="t-left">${(artiInfo["2pc"])? artiInfo["2pc"]:artiInfo["1pc"]}</td>
            <td class="t-left">${(artiInfo["4pc"])? artiInfo["4pc"]:""}</td>
            <td>${(artiInfo["rarity"][artiInfo["rarity"].length-1])}</td>
        </tr>
        `;
    }
    artiList += `</table><div class="clear-float w100p h16"></div></div>`;
    return artiList;
}

$("#mats").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await materialList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function materialList() {
    let matList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th class="w64">Image</th>
                <th>Name</th>
                <th>Set Bonus</th>
                <th>Stars</th>
            </tr>`;
    for(let material of await window.api.getMatList()) {
        // ?  'filter' is defined in query.js
        let matInfo = JSON.parse((await window.api.queryGenshinDB(material))[1]);
        matList += `
        <tr>
            <td>
                <image src="${matInfo["images"]["fandom"]}" class="h64 w64 no-shadow" onerror="this.src='data/qm.png'">
            </td>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${matInfo["name"].replaceAll(filter, '')}')">${matInfo["name"]}</a>
            </td>
            <td class="t-left">${matInfo["materialtype"]}</td>
            <td>${(matInfo["rarity"])? matInfo["rarity"]:``}</td>
        </tr>
        `;
    }
    matList += `</table><div class="clear-float w100p h16"></div></div>`;
    return matList;
}

$("#ene").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await enemyList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function enemyList() {
    let enemyList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th>Name</th>
                <th>Special Name</th>
                <th>Category</th>
                <th>Type</th>
            </tr>`;
    for(let enemy of await window.api.getEneList()) {
        // ?  'filter' is defined in query.js
        let eneInfo = JSON.parse((await window.api.queryGenshinDB(enemy))[1]);
        enemyList += `
        <tr>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${eneInfo["name"].replaceAll(filter, '')}')">${eneInfo["name"]}</a>
            </td>
            <td class="t-left">${eneInfo["specialname"]}</td>
            <td class="t-left">${eneInfo["category"]}</td>
            <td class="t-left">${capitalize(eneInfo["enemytype"])}</td>
        </tr>
        `;
    }
    enemyList += `</table><div class="clear-float w100p h16"></div></div>`;
    return enemyList;
}

$("#food").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await foodList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function foodList() {
    let foodList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th>Name</th>
                <th>Effect</th>
                <th>Category</th>
                <th>Type</th>
            </tr>`;
    for(let food of await window.api.getFoodList()) {
        // ?  'filter' is defined in query.js
        let foodInfo = JSON.parse((await window.api.queryGenshinDB(food))[1]);
        foodList += `
        <tr>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${foodInfo["name"].replaceAll(filter, '')}')">${foodInfo["name"]}</a>
            </td>
            <td class="t-left">${foodInfo["effect"]}</td>
            <td class="t-left">${capitalize(foodInfo["foodtype"])}</td>
            <td class="t-left">${foodInfo["rarity"]}</td>
        </tr>
        `;
    }
    foodList += `</table><div class="clear-float w100p h16"></div></div>`;
    return foodList;
}

$("#ani").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${await animalList()}`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

async function animalList() {
    let aniList = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th>Name</th>
                <th>Effect</th>
                <th>Category</th>
            </tr>`;
    for(let animal of await window.api.getAniList()) {
        // ?  'filter' is defined in query.js
        let aniInfo = JSON.parse((await window.api.queryGenshinDB(animal))[1]);
        aniList += `
        <tr>
            <td class="t-left">
                <a onclick="window.api.queryGenshinDBRender('${aniInfo["name"].replaceAll(filter, '')}')">${aniInfo["name"]}</a>
            </td>
            <td class="t-left">${aniInfo["description"]}</td>
            <td class="t-left">${
                (aniInfo["category"])? capitalize(aniInfo["category"]):``
            }</td>
        </tr>
        `;
    }
    aniList += `</table><div class="clear-float w100p h16"></div></div>`;
    return aniList;
}

// !SECTION Lists

$("#map").click(() => {
    $("#content-window").fadeOut(125);
    $("#content-window").html(`<iframe src="https://act.hoyolab.com/ys/app/interactive-map/index.html" class="w100p h100p" style="overflow:none">`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})