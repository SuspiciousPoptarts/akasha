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

fetch("../../data/enemies/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((object) => {

            fetch(`../../data/enemies/${object}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#table").append(
                        `
                        <tr>
                        <td>${asLinkable(data["name"],data["name"],"")}</td>
                        <td>${data["specialname"]}</td>
                        <td>${data["category"]}</td>
                        <td>${capitalize(data["enemytype"].toLowerCase())}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

