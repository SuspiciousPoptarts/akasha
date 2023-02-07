// SECTION Web/Render
class WeaponPage {

    constructor(wepjson) {
        let json = JSON.parse(wepjson);

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
            mult1: json["r1"],
            mult2: json["r2"],
            mult3: json["r3"],
            mult4: json["r4"],
            mult5: json["r5"],
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

    HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}
            ${this.coverInfo()}
            <div class="clear-float w100p h16"></div>
        </div>
        `;
        return html;
    }

    // SECTION Returns HTML
    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1 f24 header">${this["name"]}</div>
                <div class="flex-1 f20">${asStars(this["rarity"])}</div>
            </div>
        `;
        return header;
    }

    coverInfo() {
        let coverInfo = `
            <div class="flex-container w100p h528 margin-t16">
                <div>
                <image class="w256 h256 block margin-b16" src="${this["icon"]}" onerror="this.src='data/qm.png'"></image>
                <image class="w256 h256 block" src="${this["iconAwakened"]}" onerror="this.src='data/qm.png'"></image>
                </div>
                <table class="flex-1 h100p">
                    <tr>
                        <td class="t-left w50p">${asIcon("weapon")}Weapon</td>
                        <td class="t-left">${this["weaponType"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("baseAttack")}Base Attack Value</td>
                        <td class="t-left">${this["baseAttack"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("substat")}Substat</td>
                        <td class="t-left">${this["substat"]}</td>
                    </tr>
                    <tr>
                        <td class="t-left w50p">${asIcon("baseSubstat")}Base Substat Value</td>
                        <td class="t-left">${this["baseSubstat"]}${(this["substat"] == "Elemental Mastery")? "":"%"}</td>
                    </tr>
                </table>
            </div>
        `;
        return coverInfo;
    }

    // !SECTION Returns HTML
    // SECTION Render-related Members
    setAccent() {
        switch(this["rarity"]) {
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

    render() {
        $("#content-window").fadeOut(125);
        $("#content-window").html(this.HTML()).hide();
        $("#content-window").fadeIn(125);

        this.setAccent();

    }
    // !SECTION Render-Related Members
}
// !SECTION Web/Render
