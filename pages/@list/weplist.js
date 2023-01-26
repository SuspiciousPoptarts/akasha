function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\" class="default-color">` + string + "</a>"
}

fetch("../../data/weapons/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((weapon) => {

            fetch(`../../data/weapons/${weapon}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#weptable").append(
                        `
                        <tr>
                        <td><image src="${data["images"]["icon"]}" class="no-shadow no-margin w64 h64""></td>
                        <td>${asLinkable(data["name"],data["name"],"")}</td>
                        <td>${data["weapontype"]}</td>
                        <td>${data["substat"]}</td>
                        <td>${data["rarity"]}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

