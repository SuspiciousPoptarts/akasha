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

function capitalize(word) {
    let t = "";
    word.split("_").forEach(function (e) {
        t += e[0].toUpperCase() + e.slice(1) + " ";
    });
    return t;
}

function renderaniwikipage(name) {
    let anidata = `../../data/animals/${name}.json`;

    fetch(anidata)
        .then(response => response.json())
        .then(jsondata => {
            $("#name").append(jsondata["name"]);
            $("#description").append(jsondata["description"]);
            $("#info-ctype").append(capitalize(jsondata["counttype"].toLowerCase()));
            $("#info-categ").append(jsondata["category"]);
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch (pair[0]) {
        case 'animal':
            renderaniwikipage(pair[1]);
            break;
    }
}
