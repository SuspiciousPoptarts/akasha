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

function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\">` + string + "</a>"
}

function renderEffect(jsondata, refinement, renderto) {
    $(renderto).text("");
    let t = jsondata["effect"];
    try {
        t = t.replaceAll("{0}", jsondata[refinement][0]);
        t = t.replaceAll("{1}", jsondata[refinement][1]);
        t = t.replaceAll("{2}", jsondata[refinement][2]);
        t = t.replaceAll("{3}", jsondata[refinement][3]);
        t = t.replaceAll("{4}", jsondata[refinement][4]);
        t = t.replaceAll("{5}", jsondata[refinement][5]);
        t = t.replaceAll("{6}", jsondata[refinement][6]);
        t = t.replaceAll("{7}", jsondata[refinement][7]);
    } catch { }
    $(renderto).append(t);
}

function renderAscMats(costs, renderto, asc, name) {
    try {
        $(renderto).find("#upg-mora-cost").append(
            asLinkable(
                ((costs[asc][0]["count"] == undefined) ? 0 : costs[asc][0]["count"]) + " " + costs[asc][0]["name"],
                costs[asc][0]["name"],
                name.replaceAll("\"", ""))
        );
        $(renderto).find("#asc-mat-1").append(
            asLinkable(
                costs[asc][1]["count"] + " " + costs[asc][1]["name"],
                costs[asc][1]["name"],
                name.replaceAll("\"", ""))
        );
        $(renderto).find("#asc-mat-2").append(
            asLinkable(
                costs[asc][2]["count"] + " " + costs[asc][2]["name"],
                costs[asc][2]["name"],
                name.replaceAll("\"", ""))
        );
        $(renderto).find("#asc-mat-3").append(
            asLinkable(
                costs[asc][3]["count"] + " " + costs[asc][3]["name"],
                costs[asc][3]["name"],
                name.replaceAll("\"", ""))
        );
    }
    catch { }
}

function renderAscMatsMulti(cost, rendermap, ascmap, name) {
    rendermap.forEach(function (renderto, index) {
        renderAscMats(cost, renderto, ascmap[index], name)
    });
}

function renderTotalAscensionCost(costs, renderto, name) {
    let mora = 0;

    let ddrop1 = 0;
    let ddrop2 = 0;
    let ddrop3 = 0;
    let ddrop4 = 0;

    let wdrop1 = 0;
    let wdrop2 = 0;
    let wdrop3 = 0;

    let edrop1 = 0;
    let edrop2 = 0;
    let edrop3 = 0;

    /*
        0 -> mora
        1 -> ddrop1
        2 -> wdrop1
        3 -> edrop1
        4 -> ddrop2
        5 -> wdrop2
        6 -> edrop2
        7 -> ddrop3
        8 -> wdrop3
        9 -> edrop3
        10 -> ddrop4
    */
    let names = [];

    try {
        costs["ascend1"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 1:
                    ddrop1 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 2:
                    wdrop1 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 3:
                    edrop1 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
            }
        });
        costs["ascend2"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 1:
                    ddrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 2:
                    wdrop1 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 3:
                    edrop1 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
            }
        });
        costs["ascend3"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 1:
                    ddrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 2:
                    wdrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 3:
                    edrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
            }
        });
        costs["ascend4"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 1:
                    ddrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 2:
                    wdrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 3:
                    edrop2 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
            }
        });
        costs["ascend5"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 1:
                    ddrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 2:
                    wdrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 3:
                    edrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
            }
        });
        costs["ascend5"].forEach(function (self, index) {
            switch (index) {
                case 0:
                    mora += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 1:
                    ddrop4 += (self["count"] != undefined) ? self["count"] : 0;
                    names.push(self["name"]);
                    break;
                case 2:
                    wdrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
                case 3:
                    edrop3 += (self["count"] != undefined) ? self["count"] : 0;
                    break;
            }
        });
    } catch { }
    // Mora
    $(renderto).find("#mora").append(
        asLinkable(
            mora + " " + names[0],
            names[0],
            name
        )
    );
    // Domain Drops
    $(renderto).find("#ddrop1").append(
        asLinkable(
            ddrop1 + " " + names[1],
            names[1],
            name
        )
    );
    $(renderto).find("#ddrop2").append(
        asLinkable(
            ddrop2 + " " + names[4],
            names[4],
            name
        )
    );
    $(renderto).find("#ddrop3").append(
        asLinkable(
            ddrop3 + " " + names[7],
            names[7],
            name
        )
    );
    if (ddrop4 != 0) $(renderto).find("#ddrop4").append(
        asLinkable(
            ddrop4 + " " + names[10],
            names[10],
            name
        )
    );
    // World Drops
    $(renderto).find("#wdrop1").append(
        asLinkable(
            wdrop1 + " " + names[2],
            names[2],
            name
        )
    );
    $(renderto).find("#wdrop2").append(
        asLinkable(
            wdrop2 + " " + names[5],
            names[5],
            name
        )
    );
    if (wdrop3 != 0) $(renderto).find("#wdrop3").append(
        asLinkable(
            wdrop3 + " " + names[8],
            names[8],
            name
        )
    );
    $(renderto).find("#edrop1").append(
        asLinkable(
            edrop1 + " " + names[3],
            names[3],
            name
        )
    );
    $(renderto).find("#edrop2").append(
        asLinkable(
            edrop2 + " " + names[6],
            names[6],
            name
        )
    );
    if (edrop3 != 0) $(renderto).find("#edrop3").append(
        asLinkable(
            edrop3 + " " + names[9],
            names[9],
            name
        )
    );
}

function renderwepwikipage(name) {
    let wepdata = '../../data/weapons/';
    wepdata += name + '.json';

    fetch(wepdata)
        .then(response => response.json())
        .then(jsondata => {
            let wepname = jsondata["name"];
            $("#name").append(jsondata["name"]);

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

            $("#cover-image").attr("src", jsondata["images"]["icon"])

            $("#info-type").append(jsondata["weapontype"]);
            $("#info-atk").append(jsondata["baseatk"]);
            $("#info-substat").append(jsondata["substat"]);
            $("#info-subval").append(
                jsondata["subvalue"] +
                ((jsondata["substat"] == "Elemental Mastery" || jsondata["substat"] == "") ? "" : "%")
            );

            $("#wep-description").append(jsondata["description"]);

            $("#effect-name").append(jsondata["effectname"]);
            renderEffect(jsondata, "r1", "#effect-description");

            renderAscMatsMulti(
                jsondata["costs"],
                ["#asc-1", "#asc-2", "#asc-3", "#asc-4", "#asc-5", "#asc-6"],
                ["ascend1", "ascend2", "ascend3", "ascend4", "ascend5", "ascend6"],
                wepname.replaceAll("\"", ""));

            $("#r-slider").change(function () {
                $("#r-level").val(this.value);
                renderEffect(jsondata, "r" + this.value, "#effect-description")
            });

            $("#r-level").change(function () {
                $("#r-slider").val(this.value);
                renderEffect(jsondata, "r" + this.value, "#effect-description")
            });

            renderTotalAscensionCost(jsondata["costs"], "#total-ascension");

            $("#invert-collapse").click(function () {
                $("#expand-effect-table").click();
                $("#expand-ascension-table").click();
                $("#expand-total-table").click();
            });

            attachCollapseToggle("#weapon-effect-table", "#expand-effect-table");
            attachCollapseToggle("#weapon-ascension-table", "#expand-ascension-table");
            attachCollapseToggle("#total-ascension", "#expand-total-table");
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch (pair[0]) {
        case 'weapon':
            renderwepwikipage(pair[1]);
            break;
    }
}
