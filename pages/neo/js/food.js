// SECTION Sectioned JSON Data
class Food {
    constructor(data) {
        let json = JSON.parse(data);
        
        // NOTE Info
        this["name"] = json["name"];
        this["specialty"] = {
            character: json["character"],
            base: json["basedish"]
        }

        this["description"] = json["description"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];
        this["effect"] = json["effect"];

        this["delicious"] = json["delicious"];
        this["normal"] = json["normal"];
        this["suspicious"] = json["suspicious"];

        this["ingredients"] = json["ingredients"];
    }
}
// !SECTION Sectioned JSON Data
class FoodPage {
    // SECTION Returns HTML
    constructor(fooddata) {
        this["food"] = new Food(fooddata);
    }

    async HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}
            
            ${button("&#xe5d7;", "Description", `$("#description").toggle();`)}
            ${this.description()}
            
            ${button("&#xe5d7;", "Specialty", `$("#specialty").toggle();`)}
            ${(this["food"]["specialty"]["character"])? `${this.specialtyInfo()}`:``}

            ${button("&#xe5d7;", "Effect", `$("#effect").toggle();`)}
            ${this.effect()}

            ${button("&#xe5d7;", "Ingredients", `$("#recipe").toggle();`)}
            ${await this.recipe()}
            <div class="clear-float w100p h16"></div>
        </div>
        `;
        return html;
    }

    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1">
                    <div class="f20 header">${this["food"]["name"]}</div>
                </div>
                <div class="flex-1 f20">${asStars(this["food"]["rarity"])}</div>
            </div>
        `;
        return header;
    }

    specialtyInfo() {
        let specialtyInfo = `
            <table class="float-left w100p margin-t16" id="specialty">
                <tr class="h64"><th colspan="2">Specialty Information</th></tr>
                <tr>
                    <td>Character</td>
                    <td class="t-left">${this["food"]["specialty"]["character"]}</td>
                </tr>
                <tr>
                    <td>Original Dish</td>
                    <td class="t-left">${this["food"]["specialty"]["base"]}</td>
                </tr>
            </table>
        `;
        return specialtyInfo;
    }

    description() {
        let description = `
            <table class="float-left w100p margin-t16" id="description">
                <tr class="h64"><th>Description</th></tr>
                <tr><td>${this["food"]["description"]}</td></tr>
            </table>
        `;
        return description;
    }

    effect() {
        let effect = `
        
            ${(this["food"]["specialty"]["character"])?
                `
                <table class="float-left w100p margin-t16" id="effect">
                    <tr class="h64"><th>Effects</th></tr>
                    <tr><td class="t-left">${this["food"]["effect"]}</td></tr>
                </table>
                `
                :
                `
                <table class="float-left w100p margin-t16" id="effect">
                    <tr class="h64"><th colspan="2">Effects</th></tr>
                    <tr>
                        <td>Delicious</td>
                        <td class="t-left">${this["food"]["delicious"]["effect"]}</td>
                    </tr>
                    <tr>
                        <td>Normal</td>
                        <td class="t-left">${this["food"]["normal"]["effect"]}</td>
                    </tr>
                    <tr>
                        <td>Suspicious</td>
                        <td class="t-left">${this["food"]["suspicious"]["effect"]}</td>
                    </tr>
                </table>
                `
            }
        `;
        return effect;
    }

    async recipe() {
        let recipe = `<table class="w100p float-left margin-t16" id="recipe"><tr class="h64"><th colspan="2">Ingredients</th></tr>`;

        for(let material of this["food"]["ingredients"]) {
            
            let matQuery = await window.electronAPI.queryGenshinDB(material["name"]);
            let image = JSON.parse(matQuery[1])["images"]["fandom"];

            recipe += `
                <tr>
                    <td class="w48 padding-4"><img src="${image}" class="no-shadow h48 w48" onerror="this.src='data/qm.png'"></td>
                    <td class="t-left">
                        ${asLinkable(
                            // ? only render count if count exists, only render stars if rarity exists.
                            `${(material["count"])? `${material["count"]}`:``} ${material["name"]}`,
                            material["name"]
                        )}
                        
                        </td>
                </tr>
            `
        }

        recipe += `</table>`
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
        switch(this["food"]["rarity"]) {
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