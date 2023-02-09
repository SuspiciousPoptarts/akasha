// SECTION Sectioned JSON Data
class Craft {
    constructor(data = "{}") {
        let json = JSON.parse(data);
        this["resultCount"] = json["resultCount"];
        this["recipe"] = json["recipe"];
    }
}

class Material {
    constructor(data) {
        let json = JSON.parse(data);

        // NOTE Info
        this["name"] = json["name"];
        this["description"] = json["description"];
        this["story"] = json["story"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];
        this["materialType"] = json["materialtype"];
        this["category"] = json["category"];

        this["source"] = json["source"];

        // NOTE Images
        this["icon"] = json["images"]["fandom"];
    }
}
// !SECTION Sectioned JSON Data

class MaterialPage {
    constructor(matdata, craftdata) {
        this["material"] = new Material(matdata);
        this["craft"] = new Craft(craftdata);
    }
    // SECTION Returns HTML
    async HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}
            ${this.coverInfo()}
            ${this.description()}
            ${this.source()}

            ${(this["craft"]["recipe"])? `${await this.recipe()}`:``}
            <div class="clear-float w100p h16"></div>
        </div>
        `
        return html;
    }

    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1 f24 header">${this["material"]["name"]}</div>
                <div class="flex-1 f20">${asStars(this["material"]["rarity"])}</div>
            </div>
        `;
        return header;
    }

    coverInfo() {
        let coverInfo = `
            <div class="flex-container w100p h256 margin-t16">
                <div>
                <image class="w256 h256" src="${this["material"]["icon"]}" onerror="this.src='data/qm.png'"></image>
                </div>
                <table class="flex-1 w100p h100p">
                    <tr class="t-left">
                        <td class="w50p">${asIcon("type")}Type</td>
                        <td>${this["material"]["materialType"]}</td>
                    </tr>
                    <tr class="t-left">
                        <td class="w50p">${asIcon("category")}Category</td>
                        <td>${this["material"]["category"]}</td>
                    </tr>
                </table>
            </div>
        `;
        return coverInfo;
    }

    description() {
        let description = `
            <table class="float-left w100p h100p margin-t16">
                <tr><th>Description</th></tr>
                <tr>
                    <td>${this["material"]["description"]}</td>
                </tr>
            </table>

        `;
        return description;
    }

    source() {
        let sources = `<table class="float-left w100p margin-t16"><tr class="h64"><th>Sources</th></tr>`;

        for(let source of this["material"]["source"]) {
            sources += `
            <tr class="t-left">
                <td>${source}</td>
            </tr>
            `;
        }

        sources += `</table>`;
        return sources;
    }

    async recipe() {
        let recipe = `<table class="float-left w100p margin-t16"><tr class="h64"><th colspan="2">Recipe</th></tr>`;

        for(let material of this["craft"]["recipe"]) {

            let matQuery = await window.electronAPI.queryGenshinDB(material["name"]);
            let image = JSON.parse(matQuery[1])["images"]["fandom"];

            recipe += `
            <tr class="t-left">
                <td class="w48 padding-4"><img src="${image}" class="no-shadow h48 w48" onerror="this.src='data/qm.png'"></td>
                <td>
                    ${
                        asLinkable(
                            `${material["count"]} ${material["name"]}`,
                            material["name"]
                        )
                    }
                </td>
            </tr>
            `;
        }

        recipe += `</table>`;
        return recipe;
    }

    // !SECTION Returns HTML
    // SECTION Render-Related Members
    async render() {
        $("#content-window").fadeOut(125);
        $("#content-window").html(await this.HTML()).hide();
        $("#content-window").fadeIn(125);

        this.setAccent();
    }

    setAccent() {
        switch(this["material"]["rarity"]) {
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
            default:
                $(":root").get(0).style.setProperty("--accent-color", "var(--one-star-accent)");
                break;
        }
    }
    // !SECTION Render-Related Members
}