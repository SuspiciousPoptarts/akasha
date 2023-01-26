function expandOperators(eq) {
    eq = eq.replaceAll("/", " / ");
    eq = eq.replaceAll("+", " + ");
    eq = eq.replaceAll("*", " * ");

    return eq;
}

function trimString(tstring) {
    return tstring.replaceAll("\n", " </br>").replaceAll(/[*]{2}(.+?)[*]{2}/g, "<b>$1</b>").replaceAll("·", " • ");
}

function renderTalents(talentdata) {
    $("#info-na").append(talentdata["combat1"]["name"]);
    $("#na-skill").append(trimString(talentdata["combat1"]["info"]));

    $("#info-skill").append(talentdata["combat2"]["name"]);
    $("#es-skill").append(trimString(talentdata["combat2"]["info"]));

    $("#info-burst").append(talentdata["combat3"]["name"]);
    $("#eb-skill").append(trimString(talentdata["combat3"]["info"]));

    $("#p1-name").append(talentdata["passive1"]["name"]);
    $("#passive-1").append(trimString(talentdata["passive1"]["info"]));

    $("#p2-name").append(talentdata["passive2"]["name"]);
    $("#passive-2").append(trimString(talentdata["passive2"]["info"]));

    $("#p3-name").append(talentdata["passive3"]["name"]);
    $("#passive-3").append(trimString(talentdata["passive3"]["info"]));
}

function renderStats(labels, parameters, renderto, level) {
    $(renderto).text("");
    if (level == undefined || level == 0) level = 1;
    labels.map(function (self, i) {
        let sentence = self;
        let replacelets = self.match(/{(param[0-9]{0,}):.+?}/gi);

        replacelets = replacelets.map(function (iself) {
            let p = iself.replaceAll(/{(.+?):.{0,}P}/gmi, "$1");
            try {
                sentence = sentence.replaceAll(iself, Math.round(parameters[p][level - 1] * 10000) / 100 + "%");
            } catch {
                let d = iself.replaceAll(/{(.+?):.+?}/gmi, "$1");
                sentence = sentence.replaceAll(iself, Math.round(parameters[d][level - 1] * 100) / 100);
            }
        });

        sentence = expandOperators(sentence);
        sentence = "<b>" + sentence.replaceAll("|", ":</b> ");
        $(renderto).append(sentence + "</br>");
    });
}

function renderTalentCost(cost, renderto, level, name) {
    $(renderto).find("#upg-mora-cost").append(
        asLinkable(
            cost["lvl" + level][0]["count"] + " " + cost["lvl" + level][0]["name"],
            cost["lvl" + level][0]["name"],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#sk-book").append(
        asLinkable(
            cost["lvl" + level][1]["count"] + " " + cost["lvl" + level][1]["name"],
            cost["lvl" + level][1]["name"],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#sk-mat").append(
        asLinkable(
            cost["lvl" + level][2]["count"] + " " + cost["lvl" + level][2]["name"],
            cost["lvl" + level][2]["name"],
            name.replaceAll("\"", ""))
    );

    try {
        $(renderto).find("#sk-dom").append(
            asLinkable(
                cost["lvl" + level][3]["count"] + " " + cost["lvl" + level][3]["name"],
                cost["lvl" + level][3]["name"],
                name.replaceAll("\"", ""))
        );
        $(renderto).find("#sk-crown").append(
            asLinkable(
                cost["lvl" + level][4]["count"] + " " + cost["lvl" + level][4]["name"],
                cost["lvl" + level][4]["name"],
                name.replaceAll("\"", ""))
        )
    } catch { }
}

function renderTalentCostMulti(cost, rendermap, levelmap, name) {
    rendermap.forEach(function (renderto, index) {
        renderTalentCost(cost, renderto, levelmap[index], name)
    });
}

function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\">` + string + "</a>"
}

function renderAscMats(parameters, renderto, asc, name) {
    $(renderto).find("#upg-mora-cost").append(
        asLinkable(
            parameters[asc][0]["count"] + " " + parameters[asc][0]["name"],
            parameters[asc][0]["name"],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#asc-crystal").append(
        asLinkable(
            parameters[asc][1]["count"] + " " + parameters[asc][1]["name"],
            parameters[asc][1]["name"],
            name.replaceAll("\"", ""))
    );

    $(renderto).find("#asc-mat-1").append(
        asLinkable(
            parameters[asc][2]["count"] + " " + parameters[asc][2]["name"],
            parameters[asc][2]["name"],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#asc-mat-2").append(
        asLinkable(
            parameters[asc][3]["count"] + " " + parameters[asc][3]["name"],
            parameters[asc][3]["name"],
            name.replaceAll("\"", ""))
    );

    try { // catches error if trying to render to asc-1
        $(renderto).find("#asc-mat-3").append(
            asLinkable(
                parameters[asc][4]["count"] + " " + parameters[asc][4]["name"],
                parameters[asc][4]["name"],
                name.replaceAll("\"", ""))
        );
    } catch { }
}

function renderAscMatsMulti(parameters, rendermap, ascmap, name) {
    rendermap.forEach(function (renderto, index) {
        renderAscMats(parameters, renderto, ascmap[index], name)
    });
}

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

function renderTotalAscensionCost(costs, renderto, name) {
    let mora = 0;

    let scrystal = 0;
    let fcrystal = 0;
    let ccrystal = 0;
    let gcrystal = 0;

    let bdrop = 0;

    let witem = 0;

    let wdrops = 0;
    let wdropm = 0;
    let wdropl = 0;

    /*
        0 -> Mora
        1 -> Sliver
        2 -> witem
        3 -> wdrops
        4 -> Fragment
        5 -> bdrop
        6 -> wdropm
        7 -> Chunk
        8 -> wdropl
        9 -> Gemstone

    */
    let names = [];

    costs["ascend1"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                names.push(self["name"]);
                break;
            case 1:
                scrystal += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                witem += self["count"];
                names.push(self["name"]);
                break;
            case 3:
                wdrops += self["count"];
                names.push(self["name"]);
                break;
        }
    });

    costs["ascend2"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                fcrystal += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                bdrop += self["count"];
                names.push(self["name"]);
                break;
            case 3:
                witem += self["count"];
                break;
            case 4:
                wdrops += self["count"];
                break;
        }
    });

    costs["ascend3"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                fcrystal += self["count"];
                break;
            case 2:
                bdrop += self["count"];
                break;
            case 3:
                witem += self["count"];
                break;
            case 4:
                wdropm += self["count"];
                names.push(self["name"]);
                break;
        }
    });

    costs["ascend4"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                ccrystal += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                bdrop += self["count"];
                break;
            case 3:
                witem += self["count"];
                break;
            case 4:
                wdropm += self["count"];
                break;
        }
    });

    costs["ascend5"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                ccrystal += self["count"];
                break;
            case 2:
                bdrop += self["count"];
                break;
            case 3:
                witem += self["count"];
                break;
            case 4:
                wdropl += self["count"];
                names.push(self["name"]);
                break;
        }
    });

    costs["ascend6"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                gcrystal += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                bdrop += self["count"];
                break;
            case 3:
                witem += self["count"];
                break;
            case 4:
                wdropl += self["count"];
                break;
        }
    });



    // Mora
    $(renderto).find("#mora").append(
        asLinkable(
            mora + " " + names[0],
            names[0],
            name.replaceAll("\"", ""))
    );

    // Crystals
    $(renderto).find("#sliver").append(
        asLinkable(
            scrystal + " " + names[1],
            names[1],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#fragment").append(
        asLinkable(
            fcrystal + " " + names[4],
            names[4],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#chunk").append(
        asLinkable(
            ccrystal + " " + names[7],
            names[7],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#gemstone").append(
        asLinkable(
            gcrystal + " " + names[9],
            names[9],
            name.replaceAll("\"", ""))
    );

    // World
    $(renderto).find("#witem").append(
        asLinkable(
            witem + " " + names[2],
            names[2],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#wdrops").append(
        asLinkable(
            wdrops + " " + names[3],
            names[3],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#wdropm").append(
        asLinkable(
            wdropm + " " + names[6],
            names[6],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#wdropl").append(
        asLinkable(
            wdropl + " " + names[8],
            names[8],
            name.replaceAll("\"", ""))
    );

    // Boss
    $(renderto).find("#bdrop").append(
        asLinkable(
            bdrop + " " + names[5],
            names[5],
            name.replaceAll("\"", ""))
    );
}

function renderTotalSkillCost(costs, renderto, name) {
    let mora = 0;

    let books = 0;
    let bookm = 0;
    let bookl = 0;

    let drops = 0;
    let dropm = 0;
    let dropl = 0;

    let bdrop = 0;


    /*
        0 -> Mora
        1 -> books
        2 -> drops
        3 -> bookm
        4 -> dropm
        5 -> bookl
        6 -> dropl
        7 -> bdrop
    */
    let names = [];

    costs["lvl2"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                names.push(self["name"]);
                break;
            case 1:
                books += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                drops += self["count"];
                names.push(self["name"]);
                break;
        }
    });
    costs["lvl3"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookm += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                dropm += self["count"];
                names.push(self["name"]);
                break;
        }
    });
    costs["lvl4"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookm += self["count"];
                break;
            case 2:
                dropm += self["count"];
                break;
        }
    });
    costs["lvl5"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookm += self["count"];
                break;
            case 2:
                dropm += self["count"];
                break;
        }
    });
    costs["lvl6"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookm += self["count"];
                break;
            case 2:
                dropm += self["count"];
                break;
        }
    });
    costs["lvl7"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookl += self["count"];
                names.push(self["name"]);
                break;
            case 2:
                dropl += self["count"];
                names.push(self["name"]);
                break;
            case 3:
                bdrop += self["count"];
                names.push(self["name"]);
                break;
        }
    });
    costs["lvl8"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookl += self["count"];
                break;
            case 2:
                dropl += self["count"];
                break;
            case 3:
                bdrop += self["count"];
                break;
        }
    });
    costs["lvl9"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookl += self["count"];
                break;
            case 2:
                dropl += self["count"];
                break;
            case 3:
                bdrop += self["count"];
                break;
        }
    });
    costs["lvl10"].forEach(function (self, index) {
        switch (index) {
            case 0:
                mora += self["count"];
                break;
            case 1:
                bookl += self["count"];
                break;
            case 2:
                dropl += self["count"];
                break;
            case 3:
                bdrop += self["count"];
                break;
        }
    });

    $(renderto).find("#mora").append(
        asLinkable(
            mora + " " + names[0],
            names[0],
            name.replaceAll("\"", ""))
    );

    $(renderto).find("#sb-1").append(
        asLinkable(
            books + " " + names[1],
            names[1],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#sb-2").append(
        asLinkable(
            bookm + " " + names[3],
            names[3],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#sb-3").append(
        asLinkable(
            bookl + " " + names[5],
            names[5],
            name.replaceAll("\"", ""))
    );

    $(renderto).find("#wd-1").append(
        asLinkable(
            drops + " " + names[2],
            names[2],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#wd-2").append(
        asLinkable(
            dropm + " " + names[4],
            names[4],
            name.replaceAll("\"", ""))
    );
    $(renderto).find("#wd-3").append(
        asLinkable(
            dropl + " " + names[6],
            names[6],
            name.replaceAll("\"", ""))
    );

    $(renderto).find("#bd").append(
        asLinkable(
            bdrop + " " + names[7],
            names[7],
            name.replaceAll("\"", ""))
    );

    $(renderto).find("#crown").append(
        asLinkable(
            1 + " Crown of Insight",
            "Crown of Insight",
            name.replaceAll("\"", ""))
    );
}

function rendercharwikipage(name) {
    let chardata = '../../data/characters/';
    chardata += name + '/';
    chardata += name + '.json';

    let talentdata = '../../data/characters/';
    talentdata += name + '/';
    talentdata += 'talents.json';

    let constdata = '../../data/characters/';
    constdata += name + '/';
    constdata += 'constellations.json';

    fetch(chardata)
        .then(response => response.json())
        .then(jsondata => {
            let charname = jsondata["name"];
            // Element
            switch (jsondata["element"]) {
                case 'Pyro':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--pyro-accent)");
                    $("#element").append("&#xf16a;");
                    break;
                case 'Hydro':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--hydro-accent)");
                    $("#element").append("&#xe798;");
                    break;
                case 'Electro':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--electro-accent)");
                    $("#element").append("&#xea0b;");
                    break;
                case 'Dendro':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--dendro-accent)");
                    $("#element").append("&#xea35;");
                    break;
                case 'Cryo':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--cryo-accent)");
                    $("#element").append("&#xeb3b;");
                    break;
                case 'Anemo':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--anemo-accent)");
                    $("#element").append("&#xefd8;");
                    break;
                case 'Geo':
                    $(":root").get(0).style.setProperty("--accent-color", "var(--geo-accent)");
                    $("#element").append("&#xe3f7;");
                    break;
            }

            // <!-- Name and Title --->
            $("#title").append(jsondata["title"]);
            $("#fullname").append(jsondata["name"]);

            // Rarity
            switch (jsondata["rarity"]) {
                case '5':
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case '4':
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
            }

            $("#cover-image").attr("src", jsondata["images"]["cover1"]);

            $("#info-element").append(jsondata["element"]);
            $("#info-weapon").append(jsondata["weapontype"]);
            $("#info-substat").append(jsondata["substat"]);
            $("#info-region").append(jsondata["region"]);
            $("#info-constellation").append(jsondata["constellation"]);
            $("#info-gender").append(jsondata["gender"]);
            $("#info-birthday").append(jsondata["birthday"]);

            $("#cv-english").append(jsondata["cv"]["english"]);
            $("#cv-chinese").append(jsondata["cv"]["chinese"]);
            $("#cv-japanese").append(jsondata["cv"]["japanese"]);
            $("#cv-korean").append(jsondata["cv"]["korean"]);

            $("#char-description").append(jsondata["description"]);

            if(jsondata["name"] == "Aether" || jsondata["name"] == "Lumine") {
                $("#title").append("<b>TRAVELER PAGES ARE BROKEN!ONLY INFO-TABLE FUNCTIONS!</b>");
                return;
            }

            renderAscMatsMulti(
                jsondata["costs"],
                ["#asc-1", "#asc-2", "#asc-3", "#asc-4", "#asc-5", "#asc-6"],
                ["ascend1", "ascend2", "ascend3", "ascend4", "ascend5", "ascend6"],
                charname.replaceAll("\"", ""));

            renderTotalAscensionCost(jsondata["costs"], "#total-ascension", charname);
        });

    fetch(talentdata)
        .then(response => response.json())
        .then(talentdata => {

            let charname = talentdata["name"]

            renderTalents(talentdata);

            renderStats(
                talentdata["combat1"]["attributes"]["labels"],
                talentdata["combat1"]["attributes"]["parameters"],
                "#na-num",
                1
            );

            renderStats(
                talentdata["combat2"]["attributes"]["labels"],
                talentdata["combat2"]["attributes"]["parameters"],
                "#es-num",
                1
            );

            renderStats(
                talentdata["combat3"]["attributes"]["labels"],
                talentdata["combat3"]["attributes"]["parameters"],
                "#eb-num",
                1
            );

            renderTotalSkillCost(talentdata["costs"], "#total-skills", charname)

            $("#na-slider").change(function () {
                $("#na-level").val(this.value);
                renderStats(
                    talentdata["combat1"]["attributes"]["labels"],
                    talentdata["combat1"]["attributes"]["parameters"],
                    "#na-num",
                    this.value
                );
            });

            $("#na-level").change(function () {
                $("#na-slider").val(this.value);
                renderStats(
                    talentdata["combat1"]["attributes"]["labels"],
                    talentdata["combat1"]["attributes"]["parameters"],
                    "#na-num",
                    this.value
                );
            });

            $("#es-slider").change(function () {
                $("#es-level").val(this.value);
                renderStats(
                    talentdata["combat2"]["attributes"]["labels"],
                    talentdata["combat2"]["attributes"]["parameters"],
                    "#es-num",
                    this.value
                );
            });

            $("#es-level").change(function () {
                $("#es-slider").val(this.value);
                renderStats(
                    talentdata["combat2"]["attributes"]["labels"],
                    talentdata["combat2"]["attributes"]["parameters"],
                    "#es-num",
                    this.value
                );
            });

            $("#eb-slider").change(function () {
                $("#eb-level").val(this.value);
                renderStats(
                    talentdata["combat3"]["attributes"]["labels"],
                    talentdata["combat3"]["attributes"]["parameters"],
                    "#eb-num",
                    this.value
                );
            });

            $("#eb-level").change(function () {
                $("#eb-slider").val(this.value);
                renderStats(
                    talentdata["combat3"]["attributes"]["labels"],
                    talentdata["combat3"]["attributes"]["parameters"],
                    "#eb-num",
                    this.value
                );
            });

            $("#invert-collapse").click(function () {
                $("#expand-skill-table").click();
                $("#expand-passive-table").click();
                $("#expand-constellation-table").click();

                $("#expand-ascension-table").click();
                $("#expand-skill-upgrade-table").click();
                $("#expand-total-table").click();
            });

            attachCollapseToggle("#character-skill-table", "#expand-skill-table");
            attachCollapseToggle("#character-passive-table", "#expand-passive-table");
            attachCollapseToggle("#character-constellation-table", "#expand-constellation-table");
            attachCollapseToggle("#character-ascension-mats", "#expand-ascension-table");
            attachCollapseToggle("#character-skill-upgrade-table", "#expand-skill-upgrade-table");
            attachCollapseToggle("#character-total-table", "#expand-total-table");

            renderTalentCostMulti(
                talentdata["costs"],
                ["#sk-2", "#sk-3", "#sk-4", "#sk-5", "#sk-6", "#sk-7", "#sk-8", "#sk-9", "#sk-10"],
                [2, 3, 4, 5, 6, 7, 8, 9, 10],
                charname.replaceAll("\"", ""));

        });

    fetch(constdata)
        .then(response => response.json())
        .then(constdata => {
            $("#const-name-1").append(constdata["c1"]["name"]);
            $("#const-name-2").append(constdata["c2"]["name"]);
            $("#const-name-3").append(constdata["c3"]["name"]);
            $("#const-name-4").append(constdata["c4"]["name"]);
            $("#const-name-5").append(constdata["c5"]["name"]);
            $("#const-name-6").append(constdata["c6"]["name"]);


            $("#const-desc-1").append(trimString(constdata["c1"]["effect"]));
            $("#const-desc-2").append(trimString(constdata["c2"]["effect"]));
            $("#const-desc-3").append(trimString(constdata["c3"]["effect"]));
            $("#const-desc-4").append(trimString(constdata["c4"]["effect"]));
            $("#const-desc-5").append(trimString(constdata["c5"]["effect"]));
            $("#const-desc-6").append(trimString(constdata["c6"]["effect"]));
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch (pair[0]) {
        case 'character':
            rendercharwikipage(pair[1]);
            break;
    }
}