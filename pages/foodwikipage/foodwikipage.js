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

function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\">` + string + "</a>"
}

function renderfoodwikipage(name) {
    let fooddata = '../../data/food/';
    fooddata += name + '.json';

    fetch(fooddata)
        .then(response => response.json())
        .then(jsondata => {
            $("#name").append(jsondata["name"]);
            $("#info-foodtype").append(jsondata["foodfilter"]);
            $("#info-tier").append(jsondata["rarity"]);
            $("#info-categ").append(jsondata["foodcategory"]);
            $("#description").append(jsondata["description"]);
            $("#effects").append(jsondata["effect"]);

            jsondata["ingredients"].forEach(function(self) {
                $("#recipe").append("<tr><td>" +
                 asLinkable(
                    self.count + " " + self.name,
                    self.name,
                    jsondata["name"]
                 )
                 + "</td></tr>");
            });

            if(jsondata["basedish"]) {
                $("#specialty").append(
                    `<table class="w100p">                        
                    <tr>
                        <th>Specialty</th>
                        <th>Info</th>
                    </tr>
                        <tr>
                            <td>Character</td>
                            <td>${jsondata["character"]}</td>
                        </tr>
                        <tr>
                            <td>Basedish</td>
                            <td>${jsondata["basedish"]}</td>
                        </tr>
                    </table>`
                );
            }

            switch(jsondata["rarity"]) {
                case '5':
                    $(":root").get(0).style.setProperty("--accent-color","var(--five-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case '4':
                    $(":root").get(0).style.setProperty("--accent-color","var(--four-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;&#xE838;")
                    break;
                case '3':
                    $(":root").get(0).style.setProperty("--accent-color","var(--three-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;&#xE838;")
                    break;
                case '2':
                    $(":root").get(0).style.setProperty("--accent-color","var(--two-star-accent)");
                    $("#rarity").append("&#xE838;&#xE838;")
                    break;
                case '1':
                    $(":root").get(0).style.setProperty("--accent-color","var(--one-star-accent)");
                    $("#rarity").append("&#xE838;")
                    break;
            }
            attachCollapseToggle("#sources","#expand-sources")
        });
}

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    switch(pair[0]) {
        case 'food':
            renderfoodwikipage(pair[1]);
            break;
    }
}
