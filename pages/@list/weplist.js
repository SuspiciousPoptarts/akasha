function asLinkable(string, link) {
    return `<a href=\"../qcb.html?q=${link}\" target=\"_parent\" class="font-color">` + string + "</a>"
}

fetch("../../data/weapons/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((object) => {

            fetch(`../../data/weapons/${object}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#table").append(
                        `
                        <tr>
                        <td><image src="${data["images"]["icon"]}" onerror="this.src='../../build/qm.png'" class="no-shadow no-margin w64 h64""></td>
                        <td>${asLinkable(data["name"],data["name"])}</td>
                        <td>${data["weapontype"]}</td>
                        <td>${data["substat"]}</td>
                        <td>${data["rarity"]}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

