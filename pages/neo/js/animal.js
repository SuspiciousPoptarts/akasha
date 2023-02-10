// SECTION Sectioned JSON Data
class Animal {
    constructor(data) {
        let json = JSON.parse(data);
        
        // NOTE Info
        this["name"] = json["name"];
        this["category"] = json["category"];
        this["description"] = json["description"];
    }
}
// !SECTION Sectioned JSON Data
class AnimalPage {
    // SECTION Returns HTML
    constructor(animaldata) {
        this["animal"] = new Animal(animaldata);
    }

    async HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}

            ${button("&#xe5d7;", "Description", `$("#description").toggle();`)}
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
                    <div class="f20 header">${this["animal"]["name"]}</div>
                </div>
                <div class="flex-1 f16">${this["animal"]["category"]}</div>
            </div>
        `;
        return header;
    }

    description() {
        let description = `
            <table class="float-left w100p margin-t16" id="description">
                <tr class="h64"><th>Description</th></tr>
                <tr><td>${this["animal"]["description"]}</td></tr>
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
        $(":root").get(0).style.setProperty("--accent-color", "");
    }
    // !SECTION Render-Related Members
}