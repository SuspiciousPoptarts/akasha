function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\" class="font-color">` + string + "</a>"
}

function capitalize(word) {
    let t = "";
    word.split("_").forEach(function (e) {
        t += e[0].toUpperCase() + e.slice(1) + " ";
    });
    return t;
}

fetch("../../data/food/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((object) => {

            fetch(`../../data/food/${object}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#table").append(
                        `
                        <tr>
                        <td>${asLinkable(data["name"],data["name"],"")}</td>
                        <td>${data["effect"]}</td>
                        <td>${capitalize(data["foodtype"].toLowerCase())}</td>
                        <td>${data["rarity"]}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

