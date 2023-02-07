// SECTION Sectioned JSON Data
class Artifact {
    constructor(data) {
        let json = JSON.parse(data);
        
        // NOTE Info
        this["name"] = json["name"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];
        this["twoSetBonus"] = json["2pc"];
        this["fourSetBonus"] = json["4pc"];

        this["circlet"] = json["circlet"];
        this["flower"] = json["flower"];
        this["feather"] = json["plume"];
        this["goblet"] = json["goblet"];
        this["sands"] = json["sands"];

        // NOTE Images
        this["images"] = {
            circlet: json["images"]["circlet"],
            flower: json["images"]["flower"],
            feather: json["images"]["plume"],
            goblet: json["images"]["goblet"],
            sands: json["images"]["sands"]
        }
    }
}
// !SECTION Sectioned JSON Data
// SECTION Web/Render
class ArtifactPage {
    constructor(artidata) {
        this["artifact"] = new Artifact(artidata);
    }

    // SECTION Returns HTML
    // NOTE HTML -> String-formatted HTML
    HTML() {
        let html = `
        <div class="margin-16">
        ${this.header()}
        ${this.images()}
            <div class="clear-float w100p h16"></div>
        </div>
        `
        return html;
    }

    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1 f24 header">${this["artifact"]["name"]}</div>
                <div class="flex-1 f20">${asStars(this.getMaxRarity())}</div>
            </div>
        `;
        return header;
    }

    images() {
        // TODO Fix Images..
        let images = `
        <div class="flex-container w100p h256 margin-t16">
        <image class="flex-1 h100p block" src="${this["artifact"]["images"]["circlet"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 h100p block" src="${this["artifact"]["images"]["flower"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 h100p block" src="${this["artifact"]["images"]["feather"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 h100p block" src="${this["artifact"]["images"]["goblet"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 h100p block" src="${this["artifact"]["images"]["sands"]}" onerror="this.src='data/qm.png'"></image>
        </div>
        `
        return images;
    }

    // !SECTION Returns HTML

    getMaxRarity() {
        return this["artifact"]["rarity"][this["artifact"]["rarity"].length-1];
    }

    // SECTION Render-related Members
    setAccent() {
        let rarity = this.getMaxRarity();
        switch(rarity) {
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