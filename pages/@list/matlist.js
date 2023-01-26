function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\" class="default-color">` + string + "</a>"
}

function capitalize(word) {
    let t = "";
    word.split("_").forEach(function (e) {
        t += e[0].toUpperCase() + e.slice(1) + " ";
    });
    return t;
}

fetch("../../data/materials/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((object) => {

            fetch(`../../data/materials/${object}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#table").append(
                        `
                        <tr>
                        <td><image src="${data["images"]["fandom"]}" onerror="this.src='../../build/qm.png'" class="no-shadow no-margin w64 h64"></td>
                        <td>${asLinkable(data["name"],data["name"],"")}</td>
                        <td>${data["materialtype"]}</td>
                        <td>${capitalize(data["category"].toLowerCase())}</td>
                        <td>${data["rarity"][data["rarity"].length-1]}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

