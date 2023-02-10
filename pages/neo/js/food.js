// SECTION Sectioned JSON Data
class Food {
    constructor(data) {
        let json = JSON.parse(data);
        console.log(json);
        // NOTE Info
        this["name"] = json["name"];
        this["specialName"] = json["specialname"];
        this["enemyType"] = json["enemytype"];
        this["description"] = json["description"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];
        this["drops"] = json["rewardpreview"];
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
            ${this.description()}
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
            <table class="float-left w100p margin-t16">
            
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