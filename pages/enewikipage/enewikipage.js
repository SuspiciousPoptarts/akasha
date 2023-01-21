function attachCollapseToggle(collapseable, button) {
    $(button).click(function() {
        if($(collapseable).css("visibility") != "collapse") {
            $(collapseable).css("visibility","collapse");
            $(collapseable).css("position","absolute");
            $(collapseable).css("left","-3000");
        }
        else {
            $(collapseable).css("visibility","initial");
            $(collapseable).css("position","initial");
            $(collapseable).css("left","initial");
        }
    });
}

function attachCollapseToggleMulti(list, button) {
    $(button).click(function() {

        list.forEach(collapseable => {
            if($(collapseable).css("visibility") != "collapse") {
                $(collapseable).css("visibility","collapse");
                $(collapseable).css("position","absolute");
                $(collapseable).css("left","-3000");
            }
            else {
                $(collapseable).css("visibility","initial");
                $(collapseable).css("position","initial");
                $(collapseable).css("left","initial");
            }
        })   
    });
}

function capitalize(word) {
    let t = "";
    word.split("_").forEach(function(e) {
        t += e[0].toUpperCase() + e.slice(1) + " ";
    });
    return t;
}

function rendermatwikipage(name) {
    let enedata = '../../data/enemies/';
    enedata += name + '.json';

    fetch(enedata)
        .then(response => response.json())
        .then(jsondata => {
            $("#name").append(jsondata["name"]);
            $("#info-spname").append(jsondata["specialname"]);
            $("#info-tier").append(capitalize(jsondata["enemytype"].toLowerCase()));
            $("#info-categ").append(jsondata["category"]);
            $("#description").append(jsondata["description"]);
            try{
                $("#i-description").append(jsondata["investigation"]["description"].replaceAll("\\n"," "));
            } catch { $("#i-description").append("...") }


            jsondata["rewardpreview"].forEach(function(e) {
                let r = (e["rarity"] != null || e["rarity"] != undefined)? e["rarity"] + "<span class=\"default-color icon padding-8\">&#xe838;</span>":"";
                $("#drops").append(`<tr><td>${e["name"]} ${r}</td></tr>`);
            });

            switch(jsondata["enemytype"]) {
                case 'BOSS':
                    $(":root").get(0).style.setProperty("--accent-color","var(--five-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case 'ELITE':
                    $(":root").get(0).style.setProperty("--accent-color","var(--four-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case 'COMMON':
                    $(":root").get(0).style.setProperty("--accent-color","var(--one-star-accent)");
                    $("#rarity").append("&#xE838;")
                    break;
            }

            attachCollapseToggle("#drops","#expand-drops")
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch(pair[0]) {
        case 'enemy':
            rendermatwikipage(pair[1]);
            break;
    }
}
