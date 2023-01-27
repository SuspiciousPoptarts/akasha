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

function renderartiwikipage(name) {
    let artidata = `../../data/artifacts/${name}.json`;

    fetch(artidata)
        .then(response => response.json())
        .then(jsondata => {
            $("#name").append(jsondata["name"]);

            switch (jsondata["rarity"][jsondata["rarity"].length - 1]) {
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

            $("#flower").attr("src", jsondata["images"]["flower"]);
            $("#plume").attr("src", jsondata["images"]["plume"]);
            $("#sands").attr("src", jsondata["images"]["sands"]);
            $("#goblet").attr("src", jsondata["images"]["goblet"]);
            $("#circlet").attr("src", jsondata["images"]["circlet"]);

            $("#arti-2pc").append(jsondata["2pc"]);
            $("#arti-4pc").append(jsondata["4pc"]);

            $("#flower-detail-name").append(jsondata["flower"]["name"]);
            $("#flower-description").append(jsondata["flower"]["description"]);
            $("#flower-story").append(jsondata["flower"]["story"]);

            $("#feather-detail-name").append(jsondata["plume"]["name"]);
            $("#feather-description").append(jsondata["plume"]["description"]);
            $("#feather-story").append(jsondata["plume"]["story"]);

            $("#sands-detail-name").append(jsondata["sands"]["name"]);
            $("#sands-description").append(jsondata["sands"]["description"]);
            $("#sands-story").append(jsondata["sands"]["story"]);

            $("#goblet-detail-name").append(jsondata["goblet"]["name"]);
            $("#goblet-description").append(jsondata["goblet"]["description"]);
            $("#goblet-story").append(jsondata["goblet"]["story"]);

            $("#circlet-detail-name").append(jsondata["circlet"]["name"]);
            $("#circlet-description").append(jsondata["circlet"]["description"]);
            $("#circlet-story").append(jsondata["circlet"]["story"]);

            attachCollapseToggle("#set-bonus", "#expand-set-bonus");
            attachCollapseToggleMulti(["#flower-dn", "#flower-dd", "#flower-ds"], "#expand-flower");
            attachCollapseToggleMulti(["#feather-dn", "#feather-dd", "#feather-ds"], "#expand-feather");
            attachCollapseToggleMulti(["#sands-dn", "#sands-dd", "#sands-ds"], "#expand-sands");
            attachCollapseToggleMulti(["#goblet-dn", "#goblet-dd", "#goblet-ds"], "#expand-goblet");
            attachCollapseToggleMulti(["#circlet-dn", "#circlet-dd", "#circlet-ds"], "#expand-circlet");

            $("#invert-collapse").click(function () {
                $("#expand-set-bonus").click();
                $("#expand-flower").click();
                $("#expand-feather").click();
                $("#expand-sands").click();
                $("#expand-goblet").click();
                $("#expand-circlet").click();
            });
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch (pair[0]) {
        case 'artifact':
            renderartiwikipage(pair[1]);
            break;
    }
}
