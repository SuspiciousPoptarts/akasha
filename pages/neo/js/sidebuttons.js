
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
    charList += `</table></div>`;
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
    wepList += `</table></div>`;
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
    artiList += `</table></div>`;
    return artiList;
}

// !SECTION Lists
// SECTION Theme

$("#theme").click(async() => {
    $("#content-window").fadeOut(125);
    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    $("#content-window").html(`${theme()}`).hide();

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    let currentTheme = getComputedStyle(document.documentElement);
    const filter = (string) => { return string.replaceAll(/[\\"]/g,'').trim(); }

    $("#badge").val(filter(currentTheme.getPropertyValue('--badge')));
    $("#badge-radius").val(filter(currentTheme.getPropertyValue('--badge-radius')));

    $("#corner").val(filter(currentTheme.getPropertyValue('--corner-radius')));
    $("#border-style").val(filter(currentTheme.getPropertyValue('--border-style')));

    $("#font").val(filter(currentTheme.getPropertyValue('font-family')));
    $("#bg-color").val(filter(currentTheme.getPropertyValue('--background-color')));
    $("#border-color").val(filter(currentTheme.getPropertyValue('--border-color')));
    $("#shadow-color").val(filter(currentTheme.getPropertyValue('--shadow-color')));
    $("#accent-color").val(filter(currentTheme.getPropertyValue('--accent-color')));
    $("#font-color").val(filter(currentTheme.getPropertyValue('--font-color')));
    $("#icon-color").val(filter(currentTheme.getPropertyValue('--icon-color')));

    $("#pyro").val(filter(currentTheme.getPropertyValue('--pyro-accent')));
    $("#hydro").val(filter(currentTheme.getPropertyValue('--hydro-accent')));
    $("#electro").val(filter(currentTheme.getPropertyValue('--electro-accent')));
    $("#dendro").val(filter(currentTheme.getPropertyValue('--dendro-accent')));
    $("#cryo").val(filter(currentTheme.getPropertyValue('--cryo-accent')));
    $("#anemo").val(filter(currentTheme.getPropertyValue('--anemo-accent')));
    $("#geo").val(filter(currentTheme.getPropertyValue('--geo-accent')));
    
    $("#five-star-accent").val(filter(currentTheme.getPropertyValue('--five-star-accent')));
    $("#four-star-accent").val(filter(currentTheme.getPropertyValue('--four-star-accent')));
    $("#three-star-accent").val(filter(currentTheme.getPropertyValue('--three-star-accent')));
    $("#two-star-accent").val(filter(currentTheme.getPropertyValue('--two-star-accent')));
    $("#one-star-accent").val(filter(currentTheme.getPropertyValue('--one-star-accent')));

    $("#content-window").fadeIn(125);

    $("#save").click(async() => {
        await compileTheme();
    })
    $("#reset").click(async() => {
        window.api.writeToTheme(`@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap');:root{--badge:url("https://static.wikia.nocookie.net/gensin-impact/images/b/b5/Icon_Emoji_Paimon%27s_Paintings_19_Nahida_1.png/revision/latest?cb=20221124043001");--badge-radius:32px;--corner-radius:8px;--border-style:solid;--font-family:'Roboto Flex';--background-color:#3b4255;--border-color:#5c6284;--shadow-color:#242632;--accent-color:#ede5d8;--font-color:#f6f3ec;--icon-color:#e0e0e0;--pyro-accent:#d24646;--hydro-accent:#4487d5;--electro-accent:#9f79d7;--dendro-accent:#cfda72;--cryo-accent:#a1cee2;--anemo-accent:#79cda9;--geo-accent:#e4ca86;--five-star-accent:#d3a15a;--four-star-accent:#a083d2;--three-star-accent:#5594dd;--two-star-accent:#98aab3;--one-star-accent:#ababab;--card-shadow:var(--shadow-color) 0px 0px 6px;--accent-font-color:var(--background-color);--universal-transition-time:all 0.5s;--hover-brightness:brightness(110%);--click-brightness:brightness(90%);--highlight-color:#7381d1;--body-margin:16px;--universal-padding:16px;--component-margin:16px;--font-size:14px;--slider-height:6px;--slider-knob-radius:50%;--slider-knob-height:13px;font-family:var(--font-family);background-color:var(--background-color);color:var(--font-color);font-size:var(--font-size);transition:var(--universal-transition-time);--inset-shadow:inset var(--shadow-color) 0px 0px 6px;}::selection{background-color:var(--highlight-color);color:white;}html{height:100%;width:100%;overflow:hidden;}`);
    })
    
})

function attachChangeListenerMulti(list, func) {
    for(let element of list) {
        $(element).change(func);
    }
}

function theme() {
    let html = `
    <div class="margin-16">
        <button class="float-left" id="save"><span class="icon padding-r8">&#xe161;</span>Save</button>
        <button class="float-left margin-l16" id="reset"><span class="icon padding-r8">&#xe28e;</span>Reset</button>
        <table class="w100p margin-t16 float-left">
            <tr>
                <th colspan="2">Badge</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Badge URL</td>
                <td><input type="text" class="w100p" id="badge"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Badge Radius</td>
                <td><input type="text" class="w100p" id="badge-radius"></td>
            </tr>
        </table>
        
        <table class="w100p margin-t16 float-left">
            <tr>
                <th colspan="2">Universal</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Corner Radius</td>
                <td><input type="text" class="w100p" id="corner"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Border Style</td>
                <td><input type="text" class="w100p" id="border-style"></td>
            </tr>
        </table>

        <table class="w100p margin-t16 float-left">
            <tr>
                <th colspan="2">Body</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Font</td>
                <td><input type="text" class="w100p" id="font"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Background Color</td>
                <td><input type="color" class="w100p" id="bg-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Border Color</td>
                <td><input type="color" class="w100p" id="border-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Shadow Color</td>
                <td><input type="color" class="w100p" id="shadow-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Accent Color</td>
                <td><input type="color" class="w100p" id="accent-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Font Color</td>
                <td><input type="color" class="w100p" id="font-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Icon Color</td>
                <td><input type="color" class="w100p" id="icon-color"></td>
            </tr>
        </table>

        <table class="w100p margin-t16 float-left">
            <tr>
                <th colspan="2">Elemental Accents</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Pyro Accent</td>
                <td><input type="color" class="w100p" id="pyro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Hydro Accent</td>
                <td><input type="color" class="w100p" id="hydro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Electro Accent</td>
                <td><input type="color" class="w100p" id="electro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Dendro Accent</td>
                <td><input type="color" class="w100p" id="dendro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Cryo Accent</td>
                <td><input type="color" class="w100p" id="cryo"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Anemo Accent</td>
                <td><input type="color" class="w100p" id="anemo"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Geo Accent</td>
                <td><input type="color" class="w100p" id="geo"></td>
            </tr>
        </table>

        <table class="w100p margin-t16 float-left">
            <tr>
                <th colspan="2">Rarity Accents</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Five Star Accent</td>
                <td><input type="color" class="w100p" id="five-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Four Star Accent</td>
                <td><input type="color" class="w100p" id="four-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Three Star Accent</td>
                <td><input type="color" class="w100p" id="three-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Two Star Accent</td>
                <td><input type="color" class="w100p" id="two-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>One Star Accent</td>
                <td><input type="color" class="w100p" id="one-star-accent"></td>
            </tr>
        </table>
        <div class="clear-float w100p h16"></div>
    </div>
    `
    return html;
}

async function compileTheme() {
    // ? Write to file
    $("#content-window").fadeOut(125);

    let newTheme = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap');

    :root {

        --badge: ${$("#badge").val()};
        --badge-radius: ${$("#badge-radius").val()};

        --corner-radius: ${$("#corner").val()};
        --border-style: ${$("#border-style").val()};

        --font-family: '${$("#font").val()}';
        --background-color: ${$("#bg-color").val()};
        --border-color: ${$("#border-color").val()};
        --shadow-color: ${$("#shadow-color").val()};
        --accent-color: ${$("#accent-color").val()};
        --font-color: ${$("#font-color").val()};
        --icon-color: ${$("#icon-color").val()};

        --pyro-accent: ${$("#pyro").val()};
        --hydro-accent: ${$("#hydro").val()};
        --electro-accent: ${$("#electro").val()};
        --dendro-accent: ${$("#dendro").val()};
        --cryo-accent: ${$("#cryo").val()};
        --anemo-accent: ${$("#anemo").val()};
        --geo-accent: ${$("#geo").val()};

        --five-star-accent: ${$("#five-star-accent").val()};
        --four-star-accent: ${$("#four-star-accent").val()};
        --three-star-accent: ${$("#three-star-accent").val()};
        --two-star-accent: ${$("#two-star-accent").val()};
        --one-star-accent: ${$("#one-star-accent").val()};

        --card-shadow: var(--shadow-color) 0px 0px 6px;

        --accent-font-color: var(--background-color);

        --universal-transition-time: all 0.5s;
        --hover-brightness: brightness(110%);
        --click-brightness: brightness(90%);
        --highlight-color: #7381d1;

        --body-margin: 16px;
        --universal-padding: 16px;
        --component-margin: 16px;
        --font-size: 12;

        --slider-height: 6px;
        --slider-knob-radius: 50%;
        --slider-knob-height: 14px;

        font-family: var(--font-family);
        background-color: var(--background-color);
        color: var(--font-color);
        font-size: var(--font-size);
        transition: var(--universal-transition-time);
        --inset-shadow: inset var(--shadow-color) 0px 0px 6px;
    }

    ::selection {
        background-color: var(--highlight-color);
        color: white;
    }

    html {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    `;
    await window.api.writeToTheme(newTheme);
}

// !SECTION Theme

$("#map").click(() => {
    $("#content-window").fadeOut(125);
    $("#content-window").html(`<iframe src="https://act.hoyolab.com/ys/app/interactive-map/index.html" class="w100p h100p" style="overflow:none">`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})