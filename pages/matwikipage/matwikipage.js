function attachCollapseToggle(collapseable, button) {
    $(button).click(function () {
        if ($(collapseable).css("visibility") != "collapse") {
            $(collapseable).css("visibility", "collapse");
            $(collapseable).css("position", "absolute");
            $(collapseable).css("left", "-3000");
        }
        else {
            $(collapseable).css("visibility", "initial");
            $(collapseable).css("position", "initial");
            $(collapseable).css("left", "initial");
        }
    });
}

function attachCollapseToggleMulti(list, button) {
    $(button).click(function () {

        list.forEach(collapseable => {
            if ($(collapseable).css("visibility") != "collapse") {
                $(collapseable).css("visibility", "collapse");
                $(collapseable).css("position", "absolute");
                $(collapseable).css("left", "-3000");
            }
            else {
                $(collapseable).css("visibility", "initial");
                $(collapseable).css("position", "initial");
                $(collapseable).css("left", "initial");
            }
        })
    });
}

function asLinkable(string, link) {
    return `<a href=\"../qcb.html?q=${link}\" target=\"_parent\">` + string + "</a>"
}

function capitalize(word) {
    let t = "";
    word.split("_").forEach(function (e) {
        t += e[0].toUpperCase() + e.slice(1) + " ";
    });
    return t;
}

function rendermatwikipage(name) {
    let matdata = '../../data/materials/';
    matdata += name + '.json';

    let craftdata = `../../data/crafts/${name}.json`;

    fetch(matdata)
        .then(response => response.json())
        .then(jsondata => {
            $("#name").append(jsondata["name"]);
            $("#info-type").append(jsondata["materialtype"]);
            $("#info-tier").append(jsondata["rarity"]);
            $("#info-categ").append(capitalize(jsondata["category"].toLowerCase()));
            $("#description").append(jsondata["description"]);
            $("#cover-image").attr("src", jsondata["images"]["fandom"])

            jsondata["source"].forEach(function (e) {
                $("#sources").append(`<tr><td>${e}</td></tr>`);
            });

            switch (jsondata["rarity"]) {
                case '5':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--five-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case '4':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--four-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case '3':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--three-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;")
                    break;
                case '2':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--two-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;")
                    break;
                case '1':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--one-star-accent)");
                    $("#rarity").append("&#xE838;")
                    break;
            }
            $(":root").get(0).style.setProperty("--accent-font-color", "var(--background-color)");
            attachCollapseToggle("#sources", "#expand-sources")
            attachCollapseToggle("#crafts","#expand-crafts")
        });

    // fetch crafting data if exists...
    try {
        fetch(craftdata)
            .then(response => response.json())
            .then(jsondata => {
                $("#crafts").append(
                    `
                    <table class="w100p no-right-margin" id="craft">
                        <tr class="h64">
                            <td class="accent-1"><span class="icon padding-r8">&#xea3c;</span>Crafting Recipe</td>
                        </tr>
                    </table>
                    `
                );
                jsondata["recipe"].forEach((material) => {
                    $("#craft").append(
                        `
                        <tr><td>${asLinkable(
                            material["count"] + " " + material["name"],
                            material["name"]
                        )}</td></tr>
                        `
                    )
                });
            });
    } catch (e) { }
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch (pair[0]) {
        case 'mat':
            rendermatwikipage(pair[1]);
            break;
    }
}
