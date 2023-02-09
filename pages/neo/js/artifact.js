// SECTION Sectioned JSON Data
class Artifact {
    constructor(data) {
        let json = JSON.parse(data);
        
        // NOTE Info
        this["name"] = json["name"];

        // NOTE Gameplay
        this["rarity"] = json["rarity"];

        this["oneSetBonus"] = json["1pc"];
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

            ${button("&#xe5d7;", "Set Bonus", `$("#effect").toggle();`)}
            ${this.effect()}

            ${(this["artifact"]["circlet"])? `
                ${button("&#xe5d7;", "Circlet", `$("#circlet").toggle();`)}
                ${this.circletBlock()}
            `:``}

            ${(this["artifact"]["flower"])? `
                ${button("&#xe5d7;", "Flower", `$("#flower").toggle();`)}
                ${this.flowerBlock()}
            `:``}

            ${(this["artifact"]["feather"])? `
                ${button("&#xe5d7;", "Feather", `$("#feather").toggle();`)}
                ${this.featherBlock()}
            `:``}

            ${(this["artifact"]["goblet"])? `
                ${button("&#xe5d7;", "Goblet", `$("#goblet").toggle();`)}
                ${this.gobletBlock()}
            `:``}

            ${(this["artifact"]["sands"])? `
                ${button("&#xe5d7;", "Sands", `$("#sands").toggle();`)}
                ${this.sandsBlock()}
            `:``}

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
        <div class="flex-container w100p margin-t16">
        <image class="flex-1 w64" src="${this["artifact"]["images"]["circlet"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 w64" src="${this["artifact"]["images"]["flower"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 w64" src="${this["artifact"]["images"]["feather"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 w64" src="${this["artifact"]["images"]["goblet"]}" onerror="this.src='data/qm.png'"></image>
        <image class="flex-1 w64" src="${this["artifact"]["images"]["sands"]}" onerror="this.src='data/qm.png'"></image>
        </div>
        `
        return images;
    }

    effect() {
        let effect = `
            <table class="float-left w100p margin-t16" id="effect">
                <tr class="h64"><th class="w64">Pieces</th><th>Set Bonus</th></tr>
                ${(this["artifact"]["oneSetBonus"])? `
                <tr>
                    <td>1</td>
                    <td class="t-left">${this["artifact"]["oneSetBonus"]}</td>
                </tr>
                `:``}
                ${(this["artifact"]["twoSetBonus"])? `
                <tr>
                    <td>2</td>
                    <td class="t-left">${this["artifact"]["twoSetBonus"]}</td>
                </tr>
                `:``}
                ${(this["artifact"]["fourSetBonus"])? `
                <tr>
                    <td>4</td>
                    <td class="t-left">${this["artifact"]["fourSetBonus"]}</td>
                </tr>
                `:``}
            </table>
        `;
        return effect;
    }

    circletBlock() {
        let part = `
        <table class="float-left w100p margin-t16" id="circlet">
            <tr>
                <th class="w160">${this["artifact"]["circlet"]["relictype"]}</th>
                <th>${this["artifact"]["circlet"]["name"]}</th>
            </tr>
            <tr>
                <td>Description</td>
                <td class="t-left">${this["artifact"]["circlet"]["description"]}</td>
            </tr>
            <tr>
                <td>Story</td>
                <td class="t-left">${this["artifact"]["circlet"]["story"]}</td>
            </tr>
        </table>
        `;
        return part;
    }
    
    flowerBlock() {
        let part = `
        <table class="float-left w100p margin-t16" id="flower">
            <tr>
                <th class="w160">${this["artifact"]["flower"]["relictype"]}</th>
                <th>${this["artifact"]["flower"]["name"]}</th>
            </tr>
            <tr>
                <td>Description</td>
                <td class="t-left">${this["artifact"]["flower"]["description"]}</td>
            </tr>
            <tr>
                <td>Story</td>
                <td class="t-left">${this["artifact"]["flower"]["story"]}</td>
            </tr>
        </table>
        `;
        return part;
    }

    featherBlock() {
        let part = `
        <table class="float-left w100p margin-t16" id="feather">
            <tr>
                <th class="w160">${this["artifact"]["feather"]["relictype"]}</th>
                <th>${this["artifact"]["feather"]["name"]}</th>
            </tr>
            <tr>
                <td>Description</td>
                <td class="t-left">${this["artifact"]["feather"]["description"]}</td>
            </tr>
            <tr>
                <td>Story</td>
                <td class="t-left">${this["artifact"]["feather"]["story"]}</td>
            </tr>
        </table>
        `;
        return part;
    }

    gobletBlock() {
        let part = `
        <table class="float-left w100p margin-t16" id="goblet">
            <tr>
                <th class="w160">${this["artifact"]["goblet"]["relictype"]}</th>
                <th>${this["artifact"]["goblet"]["name"]}</th>
            </tr>
            <tr>
                <td>Description</td>
                <td class="t-left">${this["artifact"]["goblet"]["description"]}</td>
            </tr>
            <tr>
                <td>Story</td>
                <td class="t-left">${this["artifact"]["goblet"]["story"]}</td>
            </tr>
        </table>
        `;
        return part;
    }
    
    sandsBlock() {
        let part = `
        <table class="float-left w100p margin-t16" id="sands">
            <tr>
                <th class="w160">${this["artifact"]["sands"]["relictype"]}</th>
                <th>${this["artifact"]["sands"]["name"]}</th>
            </tr>
            <tr>
                <td>Description</td>
                <td class="t-left">${this["artifact"]["sands"]["description"]}</td>
            </tr>
            <tr>
                <td>Story</td>
                <td class="t-left">${this["artifact"]["sands"]["story"]}</td>
            </tr>
        </table>
        `;
        return part;
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