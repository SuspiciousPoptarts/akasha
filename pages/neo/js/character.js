// SECTION JSON Data

class Character {
    // SECTION Character
    constructor(data) {
        let json = JSON.parse(data);

        // NOTE Info
        this["name"] = json["fullname"];
        this["title"] = json["title"];
        this["description"] = json["description"];
        this["constellation"] = json["constellation"];

        this["gender"] = json["gender"];
        this["rarity"] = json["rarity"];
        this["region"] = json["region"];
        this["affiliation"] = json["affiliation"];

        this["birthday"] = json["birthday"];

        this["voiceActors"] = json["cv"];

        // NOTE Gameplay
        this["element"] = json["element"];
        this["weaponType"] = json["weapontype"];
        this["substat"] = json["substat"];

        this["ascensionCosts"] = {
            1: json["costs"]["ascend1"],
            2: json["costs"]["ascend2"],
            3: json["costs"]["ascend3"],
            4: json["costs"]["ascend4"],
            5: json["costs"]["ascend5"],
            6: json["costs"]["ascend6"]
        };

        // NOTE Images
        this["coverSquare"] = json["images"]["hoyolab-avatar"];
        this["coverWide"] = json["images"]["cover1"];
        this["coverTall"] = json["images"]["cover2"];
        this["icon"] = json["images"]["icon"];
        this["iconSide"] = json["images"]["sideicon"];
    }
    // !SECTION
}

class TalentList {
    // SECTION Talents
    constructor(data) {
        let json = JSON.parse(data);

        // NOTE Combat
        this["attack"] = json["combat1"];
        this["skill"] = json["combat2"];
        this["burst"] = json["combat3"];

        // NOTE Passives
        this["passives"] = {
            1: json["passive1"],
            2: json["passive2"],
            3: json["passive3"]
        }

        // NOTE Costs
        this["costs"] = {
            2: json["costs"]["lvl2"],
            3: json["costs"]["lvl3"],
            4: json["costs"]["lvl4"],
            5: json["costs"]["lvl5"],
            6: json["costs"]["lvl6"],
            7: json["costs"]["lvl7"],
            8: json["costs"]["lvl8"],
            9: json["costs"]["lvl9"],
            10: json["costs"]["lvl10"],
        };
    }
    // !SECTION
}

class ConstellationList {
    // SECTION Constellations
    constructor(data) {
        let json = JSON.parse(data);
        this["1"] = json["c1"];
        this["2"] = json["c2"];
        this["3"] = json["c3"];
        this["4"] = json["c4"];
        this["5"] = json["c5"];
        this["6"] = json["c6"];
    }
    // !SECTION
}

// !SECTION

// SECTION Web/Render

class CharacterPage {
    /* SECTION CharacterPage
    ** ===
    ** charjson (String) -> Character
    ** talentsjson (String) -> Talent
    ** constellationsjson (String) -> Constellations
    ** ===
    */
    constructor(charjson, talentsjson, constellatonsjson) {
        this["character"] = new Character(charjson);
        this["talents"] = new TalentList(talentsjson);
        this["constellations"] = new ConstellationList(constellatonsjson);
    };

    // SECTION Returns HTML
    // NOTE HTML -> String-formatted HTML
    HTML() {
        let total = `
            <div class="margin-16">
                ${this.header()}
                ${this.coverInfo()}

                ${button("&#xe5d7;", "Hide All", `
                    $("#description").hide();
                    $("#skill-list").hide();
                    $("#passive").hide();
                    $("#constellation").hide();
                    $("#asc").hide();
                    $("#skill-upgrade").hide();
                    $("#total").hide();
                `)}

                ${button("&#xe5d7;", "Description", `$("#description").toggle();`)}
                ${this.description()}

                ${button("&#xe5d7;", "Talents", `$("#skill-list").toggle();`)}
                ${this.skills()}

                ${button("&#xe5d7;", "Passives", `$("#passive").toggle();`)}
                ${this.passives()}

                ${button("&#xe5d7;", "Constellation", `$("#constellation").toggle();`)}
                ${this.constellationList()}

                ${button("&#xe5d7;", "Ascension", `$("#asc").toggle();`)}
                ${this.ascension()}

                ${button("&#xe5d7;", "Skill", `$("#skill-upgrade").toggle();`)}
                ${this.skillUpgrade()}

                ${button("&#xe5d7;", "Total", `$("#total").toggle();`)}
                ${this.total()}
                <div class="clear-float w100p h16"></div>
            </div>
        `;
        return total;
    }
    
    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1 f20">${asElement(this["character"]["element"])}</div>
                <div class="flex-1">
                    <div>${this["character"]["title"]}</div>
                    <div class="f24 header">${this["character"]["name"]}</div>
                </div>
                <div class="flex-1 f20">${asStars(this["character"]["rarity"])}</div>
            </div>
        `;
        return header;
    }

    coverInfo() {
        let coverInfo = `
            <div class="flex-container w100p h640 margin-t16">
                <image class="float-left w50p h100p" src="${this["character"]["coverWide"]}" onerror="this.src='data/qm.png'"></image>
                <table class="flex-1 h100p">
                    <tr>
                        <td class="t-left w50p">${asIcon("element")}Element</td>
                        <td class="t-left">${this["character"]["element"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("weapon")}Weapon</td>
                        <td class="t-left">${this["character"]["weaponType"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("substat")}Substat</td>
                        <td class="t-left">${this["character"]["substat"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("region")}Region</td>
                        <td class="t-left">${this["character"]["region"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("constellation")}Constellation</td>
                        <td class="t-left">${this["character"]["constellation"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("gender")}Gender</td>
                        <td class="t-left">${this["character"]["gender"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("birthday")}Birthday</td>
                        <td class="t-left">${this["character"]["birthday"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("voice")}CV</td>
                        <td class="t-left">${this["character"]["voiceActors"]["english"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p"></td>
                        <td class="t-left">${this["character"]["voiceActors"]["japanese"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p"></td>
                        <td class="t-left">${this["character"]["voiceActors"]["chinese"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p"></td>
                        <td class="t-left">${this["character"]["voiceActors"]["korean"]}</td>
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
                <tr><td>${this["character"]["description"]}</td></tr>
            </table>
        `;
        return description;
    }
    
    skills() {
        let talents = `
        <table class="float-left w100p margin-t16" id="skill-list">
            <tr class="h64"><th>Talent</th><th>Details</th><th class="w25p">Multipliers</th><th class="w128">Skill Level</th></tr>
            <tr class="h256">
                <td class="t-left t-top">${asIcon("attack")}${this["talents"]["attack"]["name"]}</td>
                <td class="t-left t-top">${formatParagraph(this["talents"]["attack"]["info"])}</td>
                <td class="t-left t-top" id="talent-attack">${formatSkill(this["talents"]["attack"]["attributes"])}</td>
                <td class="t-left t-top">
                    <input type="text" value="1" class="w128 buoy" id="attack-input"></input>
                    <input type="range" variant="vertical" class="buoy margin-t112" value="1" min="1" max="15" id="attack-slider">
                </td>
            </tr>
            <tr class="h256">
                <td class="t-left t-top">${asIcon("skill")}${this["talents"]["skill"]["name"]}</td>
                <td class="t-left t-top">${formatParagraph(this["talents"]["skill"]["info"])}</td>
                <td class="t-left t-top" id="talent-skill">${formatSkill(this["talents"]["skill"]["attributes"])}</td>
                <td class="t-left t-top">
                    <input type="text" value="1" class="w128 buoy" id="skill-input"></input>
                    <input type="range" variant="vertical" class="buoy margin-t112" value="1" min="1" max="15" id="skill-slider">
                </td>
            </tr>
            <tr class="h256">
                <td class="t-left t-top">${asIcon("burst")}${this["talents"]["burst"]["name"]}</td>
                <td class="t-left t-top">${formatParagraph(this["talents"]["burst"]["info"])}</td>
                <td class="t-left t-top" id="talent-burst">${formatSkill(this["talents"]["burst"]["attributes"])}</td>
                <td class="t-left t-top">
                    <input type="text" value="1" class="w128 buoy" id="burst-input"></input>
                    <input type="range" variant="vertical" class="buoy margin-t112" value="1" min="1" max="15" id="burst-slider">
                </td>
            </tr>
        </table>
        `;
        return talents;
    }

    passives() {
        let passives = `
        <table class="float-left w100p margin-t16" id="passive">
            <tr class="h64"><th class="w25p">Passive</th><th>Description</th></tr>
            <tr>
                <td>${this["talents"]["passives"]["1"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["talents"]["passives"]["1"]["info"])}</td>
            </tr>
            <tr>
                <td>${this["talents"]["passives"]["2"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["talents"]["passives"]["2"]["info"])}</td>
            </tr>
            <tr>
                <td>${this["talents"]["passives"]["3"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["talents"]["passives"]["3"]["info"])}</td>
            </tr>
        </table>
        `;
        return passives;
    }

    constellationList() {
        let constellations = `
        <table class="float-left w100p margin-t16" id="constellation">
            <tr class="h64"><th class="w25p">Constellation</th><th>Description</th></tr>
            <tr>
                <td>${this["constellations"]["1"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["1"]["effect"])}</td>
            </tr>
            <tr>
                <td>${this["constellations"]["2"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["2"]["effect"])}</td>
            </tr>
            <tr>
                <td>${this["constellations"]["3"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["3"]["effect"])}</td>
            </tr>
            <tr>
                <td>${this["constellations"]["4"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["4"]["effect"])}</td>
            </tr>
            <tr>
                <td>${this["constellations"]["5"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["5"]["effect"])}</td>
            </tr>
            <tr>
                <td>${this["constellations"]["6"]["name"]}</td>
                <td class="t-left">${formatParagraph(this["constellations"]["6"]["effect"])}</td>
            </tr>
        </table>
        `;
        return constellations;
    }

    ascension() {
        let ascensionCards = `
        <div class="float-left w100p margin-t16" id="asc"><div class="flex-container w100p">
        `;

        // ? ascension -> 1,2,3,4,5,6
        for(let ascension in this["character"]["ascensionCosts"]) {

            // * Table Created
            ascensionCards += `<table class="h384 flex-1 w100p"><tr class="h64"><th>Ascension ${ascension}</th></tr>`

            for(let material of this["character"]["ascensionCosts"][ascension]) {
                ascensionCards += `<tr class="t-left"><td>${material["count"]} ${material["name"]}</td></tr>`;
            }
            ascensionCards += `</table>`
            // * Div Created @ Iter 3
            if(ascension == 3) ascensionCards += `</div><div class="flex-container w100p margin-t16">`;

        }

        ascensionCards += `</div></div>`
        return ascensionCards;
    }
    
    skillUpgrade() {
        let skillCards = `
        <div class="float-left w100p margin-t16" id="skill-upgrade"><div class="flex-container w100p">
        `;

        // ? level -> 2,3,4,5,6,7,8,9,10
        for(let level in this["talents"]["costs"]) {

            // * Table Created
            skillCards += `<table class="h384 flex-1 w100p"><tr class="h64"><th>Skill Upgrade ${level}</th></tr>`

            for(let material of this["talents"]["costs"][level]) {
                skillCards += `<tr class="t-left"><td>${material["count"]} ${material["name"]}</td></tr>`;
            }
            skillCards += `</table>`

            // * Div Created @ Iter 3, 6
            if(level == 4 || level == 7) skillCards += `</div><div class="flex-container w100p margin-t16">`;

        }

        skillCards += `</div></div>`
        return skillCards;
    }

    total() {
        // ! Tally
        let asccount = {};
        let skillcount = {};

        for(let ascension in this["character"]["ascensionCosts"]) {
            for(let material of this["character"]["ascensionCosts"][ascension]) {
                // ? asccount["Mora"] exists? -> 
                if(!asccount[material["name"]]) { asccount[material["name"]] = material["count"]; }
                else { asccount[material["name"]] += material["count"]; }
            }
        }

        for(let level in this["talents"]["costs"]) {
            for(let material of this["talents"]["costs"][level]) {
                // ? skillcount["Mora"] exists? -> 
                if(!skillcount[material["name"]]) { skillcount[material["name"]] = material["count"]; }
                else { skillcount[material["name"]] += material["count"]; }
            }
        }
        // ! HTML
        let totalCards = `
        <div class="float-left flex-container w100p margin-t16" id="total">`;
        // * Table Created
        totalCards += `<table class="flex-1 h640"><tr class="h64"><th>Total Ascension Cost</th</tr>`

        // ? material -> "Mora", asccount["Mora"] -> 425,000
        for(let material in asccount) {
            totalCards += `<tr class="t-left"><td>${asccount[material]} ${material}</td></tr>`
        }

        // * Table Created
        totalCards += `</table><table class="flex-1 h640"><tr class="h64"><th>Total Skill Cost</th</tr>`

        // ? material -> "Mora", skillcount["Mora"] -> 1,265,000
        for(let material in skillcount) {
            totalCards += `<tr class="t-left"><td>${skillcount[material]} ${material}</td></tr>`
        }
        totalCards += `</table></div>`;
        return totalCards;
        // !SECTION
    }

    // !SECTION

    getSkillAttributes() {
        return [
            this["talents"]["attack"]["attributes"],
            this["talents"]["skill"]["attributes"],
            this["talents"]["burst"]["attributes"],
        ];
    }

    // SECTION Render-related Members
    setAccent() {
        switch(this["character"]["element"]) {
            case 'Pyro':
                $(":root").get(0).style.setProperty("--accent-color", "var(--pyro-accent)");
                break;
            case 'Hydro':
                $(":root").get(0).style.setProperty("--accent-color", "var(--hydro-accent)");
                break;
            case 'Electro':
                $(":root").get(0).style.setProperty("--accent-color", "var(--electro-accent)");
                break;
            case 'Dendro':
                $(":root").get(0).style.setProperty("--accent-color", "var(--dendro-accent)");
                break;
            case 'Cryo':
                $(":root").get(0).style.setProperty("--accent-color", "var(--cryo-accent)");
                break;
            case 'Anemo':
                $(":root").get(0).style.setProperty("--accent-color", "var(--anemo-accent)");
                break;
            case 'Geo':
                $(":root").get(0).style.setProperty("--accent-color", "var(--geo-accent)");
                break;
        }
    }

    render() {
        $("#content-window").fadeOut(125);
        $("#content-window").html(this.HTML()).hide();
        $("#content-window").fadeIn(125);

        // SUBSECTION Event Listeners
        let skillAttributes = this.getSkillAttributes();
        this.attachTalentListener("attack", skillAttributes[0]);
        this.attachTalentListener("skill", skillAttributes[1]);
        this.attachTalentListener("burst", skillAttributes[2]);
        
        // SUBSECTION Accent
        this.setAccent();
    }
    // SECTION Event Listeners/Wrapeprs
    attachTalentListener(name, skillAttributes) {
        $(`#${name}-input`).change(function() {
            $(`#talent-${name}`).html(formatSkill(skillAttributes, this.value-1));
            $(`#${name}-slider`).val(this.value);
        });
        $(`#${name}-slider`).change(function() {
            $(`#talent-${name}`).html(formatSkill(skillAttributes, this.value-1));
            $(`#${name}-input`).val(this.value);
        });
    }
    descriptionToggle() {
        
    }
    // !SECTION
    // !SECTION
    // !SECTION
}

// !SECTION