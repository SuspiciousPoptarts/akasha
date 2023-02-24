// SECTION Sectioned JSON Data
class Weapon {
    constructor(data) {
        let json = JSON.parse(data);

        // NOTE Info
        this["name"] = json["name"];
        this["description"] = json["description"];
        this["story"] = json["story"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];
        this["weaponType"] = json["weapontype"];
        this["substat"] = json["substat"];
        this["baseAttack"] = json["baseatk"];
        this["baseSubstat"] = json["subvalue"];

        this["effect"] = {
            name: json["effectname"],
            description: json["effect"],
            1: json["r1"],
            2: json["r2"],
            3: json["r3"],
            4: json["r4"],
            5: json["r5"],
        };

        this["ascensionCosts"] = {
            1: json["costs"]["ascend1"],
            2: json["costs"]["ascend2"],
            3: json["costs"]["ascend3"],
            4: json["costs"]["ascend4"],
            5: json["costs"]["ascend5"],
            6: json["costs"]["ascend6"]
        };

        // NOTE Images
        this["icon"] = json["images"]["icon"];
        this["iconAwakened"] = json["images"]["awakenicon"];
    }
}
// !SECTION Sectioned JSON Data
// SECTION Web/Render
class WeaponPage {

    constructor(wepjson) {
        this["weapon"] = new Weapon(wepjson);
    }

    // SECTION Returns HTML
    // NOTE HTML -> String-formatted HTML
    async HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}
            ${this.coverInfo()}

            ${button("&#xe5d7;", "Hide All", `
                    $("#description").hide();
                    $("#story").hide();
                    $("#effect").hide();
                    $("#asc").hide();
                    $("#total").hide();
            `)}

            ${button("&#xe5d7;", "Description", `$("#description").toggle();`)}
            ${this.description()}

            ${button("&#xe5d7;", "Story", `$("#story").toggle();`)}
            ${this.story()}

            ${(this["weapon"]["effect"]["name"] == "")? "":`
            ${button("&#xe5d7;", "Effect", `$("#effect").toggle();`)}`
            }
            ${(this["weapon"]["effect"]["name"] == "")? "":this.effects()}

            ${button("&#xe5d7;", "Ascension", `$("#asc").toggle();`)}
            ${await this.ascension()}

            ${button("&#xe5d7;", "Total", `$("#total").toggle();`)}
            ${await this.total()}
            <div class="clear-float w100p h16"></div>
        </div>
        `;
        return html;
    }

    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1 f24 header">${this["weapon"]["name"]}</div>
                <div class="flex-1 f20">${asStars(this["weapon"]["rarity"])}</div>
            </div>
        `;
        return header;
    }

    coverInfo() {
        let coverInfo = `
            <div class="flex-container w100p h528 margin-t16">
                <div>
                <image class="w256 h256 block margin-b16" src="${this["weapon"]["icon"]}" onerror="this.src='data/qm.png'"></image>
                <image class="w256 h256 block" src="${this["weapon"]["iconAwakened"]}" onerror="this.src='data/qm.png'"></image>
                </div>
                <table class="flex-1 h100p">
                    <tr>
                        <td class="t-left w50p">${asIcon("weapon")}Weapon</td>
                        <td class="t-left">${this["weapon"]["weaponType"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("baseAttack")}Base Attack Value</td>
                        <td class="t-left">${this["weapon"]["baseAttack"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("substat")}Substat</td>
                        <td class="t-left">${this["weapon"]["substat"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("baseSubstat")}Base Substat Value</td>
                        <td class="t-left">${this["weapon"]["baseSubstat"]}${(this["weapon"]["substat"] == "Elemental Mastery" || this["weapon"]["substat"] == "")? "":"%"}</td>
                    </tr>
                </table>
            </div>
        `;
        return coverInfo;
    }

    description() {
        let description = `
            <table class="float-left w100p margin-t16" id="description">
                <tr class="h64"><th>Description</th></tr>
                <tr><td>${this["weapon"]["description"]}</td></tr>
            </table>
        `;
        return description;
    }

    story() {
        let description = `
            <table class="float-left w100p margin-t16" id="story">
                <tr class="h64"><th>Story</th></tr>
                <tr class="t-left"><td>${this["weapon"]["story"]}</td></tr>
            </table>
        `;
        return description;
    }

    effects() {
        let effect = `
        <table class="float-left w100p margin-t16" id="effect">
        <tr class="h64"><th>Effect</th><th class="w50p">Description</th><th class="w128">Refinement</th></tr>
        <tr class="h256">
            <td class="t-left t-top">${asIcon("skill")}${this["weapon"]["effect"]["name"]}</td>
            <td class="t-left t-top" id="stat-effect">${formatEffect(this["weapon"]["effect"])}</td>
            <td class="t-left t-top">
                <input type="text" value="1" class="w128 buoy" id="effect-input"></input>
                <input type="range" variant="vertical" class="buoy margin-t112" value="1" min="1" max="5" id="effect-slider">
            </td>
        </tr>
        </table>
        `
        return effect;
    }

    async ascension() {
        let ascensionCards = `
        <div class="float-left w100p margin-t16" id="asc"><div class="flex-container w100p">
        `;

        // ? ascension -> 1,2,3,4,5,6
        for(let ascension in this["weapon"]["ascensionCosts"]) {
            // ? (i.e, 1* weapons have no asc5)
            if(this["weapon"]["ascensionCosts"][ascension] == undefined) break; 
            // * Table Created
            ascensionCards += `<table class="h384 flex-1 w100p"><tr class="h64"><th colspan="2">Ascension ${ascension}</th></tr>`

            for(let material of this["weapon"]["ascensionCosts"][ascension]) {
                
                let matQuery = await window.api.queryGenshinDB(material["name"]);
                let image = JSON.parse(matQuery[1])["images"]["fandom"];

                ascensionCards += `
                <tr class="t-left">
                    <td class="w48 padding-4"><img src="${image}" class="no-shadow h48 w48" onerror="this.src='data/qm.png'"></td>
                    <td>${material["count"]} ${material["name"]}</td>
                </tr>`;
            }
            ascensionCards += `</table>`
            // * Div Created @ Iter 3
            if(ascension == 3) ascensionCards += `</div><div class="flex-container w100p margin-t16">`;

        }

        ascensionCards += `</div></div>`
        return ascensionCards;
    }

    async total() {
        // ! Tally
        let asccount = {};

        for(let ascension in this["weapon"]["ascensionCosts"]) {
            // ? (i.e, 1* weapons have no asc5)
            if(this["weapon"]["ascensionCosts"][ascension] == undefined) break; 
            for(let material of this["weapon"]["ascensionCosts"][ascension]) {
                // ? asccount["Mora"] exists? -> 
                if(!asccount[material["name"]]) { asccount[material["name"]] = material["count"]; }
                else { asccount[material["name"]] += material["count"]; }
            }
        }

        // ! HTML
        console.log(asccount);
        // * Table Created
        let totalCards = `<table class="float-left margin-t16 h640 w100p" id="total"><tr class="h64"><th colspan="2">Total Ascension Cost</th</tr>`

        // ? material -> "Mora", asccount["Mora"] -> 425,000
        for(let material in asccount) {

            let matQuery = await window.api.queryGenshinDB(material);
            let image = JSON.parse(matQuery[1])["images"]["fandom"];

            totalCards += `
            <tr class="t-left">
                <td class="w48 padding-4"><img src="${image}" class="no-shadow h48 w48" onerror="this.src='data/qm.png'"></td>
                <td>${asccount[material]} ${material}</td>
            </tr>`
        }

        totalCards += `</table>`;
        return totalCards;
    }

    // !SECTION Returns HTML
    // SECTION Render-related Members
    setAccent() {
        switch(this["weapon"]["rarity"]) {
            case '5':
                $(":root").get(0).style.setProperty("--accent-color", "var(--five-star-accent)");
                break;
            case '4':
                $(":root").get(0).style.setProperty("--accent-color", "var(--four-star-accent)");
                break;
            case '3':
                $(":root").get(0).style.setProperty("--accent-color", "var(--three-star-accent)");
                break;
            case '2':
                $(":root").get(0).style.setProperty("--accent-color", "var(--two-star-accent)");
                break;
            case '1':
                $(":root").get(0).style.setProperty("--accent-color", "var(--one-star-accent)");
                break;
        }
    }

    async render() {
        $("#content-window").fadeOut(125);
        $("#content-window").html(await this.HTML()).hide();
        $("#content-window").fadeIn(125);

        if(this["weapon"]["effect"]["name"] != "") this.attachRefinementListener(this["weapon"]["effect"]);

        this.setAccent();

    }

    attachRefinementListener(effect) {
        $("#effect-input").change(function() {
            $("#stat-effect").html(formatEffect(effect, this.value));
            $("#effect-slider").val(this.value);
        })
        $("#effect-slider").change(function() {
            $("#stat-effect").html(formatEffect(effect, this.value));
            $("#effect-input").val(this.value);
        })
    }
    // !SECTION Render-Related Members
}
// !SECTION Web/Render
