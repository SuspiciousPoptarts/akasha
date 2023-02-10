// SECTION Sectioned JSON Data
class Enemy {
    constructor(data) {
        let json = JSON.parse(data);

        // NOTE Info
        this["name"] = json["name"];
        this["specialName"] = json["specialname"];
        this["enemyType"] = json["enemytype"];
        this["description"] = json["description"];

        // NOTE Gameplay
        this["drops"] = json["rewardpreview"];
    }
}
// !SECTION Sectioned JSON Data
class EnemyPage {
    // SECTION Returns HTML
    constructor(enemydata) {
        this["enemy"] = new Enemy(enemydata);
    }

    async HTML() {
        let html = `
        <div class="margin-16">
            ${this.header()}
            ${this.description()}
            ${await this.drops()}
            <div class="clear-float w100p h16"></div>
        </div>
        `;
        return html;
    }

    header() {
        let header = `
            <div class="h96 w100p accent-1 rounded relative flex-container">
                <div class="flex-1">
                    <div>
                    ${
                        (this["enemy"]["name"] == this["enemy"]["specialName"] && this["enemy"]["specialName"])? 
                        ``:
                        `${this["enemy"]["specialName"]}`
                    }
                    </div>
                    <div class="f20 header">${this["enemy"]["name"]}</div>
                </div>
                <div class="flex-1 f20">${asStars(this.enemyTypeAsRarity())}</div>
            </div>
        `;
        return header;
    }

    description() {
        let description = `
            <table class="float-left w100p margin-t16" id="description">
                <tr class="h64"><th>Description</th></tr>
                <tr><td>${this["enemy"]["description"]}</td></tr>
            </table>
        `;
        return description;
    }

    async drops() {
        let drops = `<table class="w100p float-left margin-t16"><tr class="h64"><th colspan="2">Reward Preview</th></tr>`;

        for(let material of this["enemy"]["drops"]) {
            
            let matQuery = await window.electronAPI.queryGenshinDB(material["name"]);
            let image = JSON.parse(matQuery[1])["images"]["fandom"];
            if(!image) image = JSON.parse(matQuery[1])["images"]["flower"];
            if(!image) image = JSON.parse(matQuery[1])["images"]["circlet"];

            drops += `
                <tr>
                    <td class="w48 padding-4"><img src="${image}" class="no-shadow h48 w48" onerror="this.src='data/qm.png'"></td>
                    <td class="t-left">
                        ${asLinkable(
                            // ? only render count if count exists, only render stars if rarity exists.
                            `${(material["count"])? `${material["count"]}`:``} ${material["name"]}
                            ${(material["rarity"])? `${asStars(material["rarity"])}`:``}`,
                            material["name"]
                        )}
                        
                        </td>
                </tr>
            `
        }

        drops += `</table>`
        return drops;
    }
    // !SECTION Returns HTML
    enemyTypeAsRarity() {
        switch(this["enemy"]["enemyType"]) {
            case 'BOSS': return 5;
            case 'ELITE': return 3;
            case 'COMMON': return 1;
        }
    }
    // SECTION Render-Related Members
    async render() {
        $("#content-window").fadeOut(125);
        $("#content-window").html(await this.HTML()).hide();
        $("#content-window").fadeIn(125);

        this.setAccent();
    }

    setAccent() {
        switch(this["enemy"]["enemyType"]) {
            case 'BOSS':
                $(":root").get(0).style.setProperty("--accent-color", "var(--five-star-accent)");
                break;
            case 'ELITE':
                $(":root").get(0).style.setProperty("--accent-color", "var(--three-star-accent)");
                break;
            case 'COMMON':
            default:
                $(":root").get(0).style.setProperty("--accent-color", "var(--one-star-accent)");
                break;
        }
    }
    // !SECTION Render-Related Members
}