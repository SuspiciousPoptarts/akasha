function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\" class="default-color">` + string + "</a>"
}

fetch("../../data/characters/meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((character) => {

            fetch(`../../data/characters/${character}/${character}.json`)
            .then(r => r.json())
            .then(data => {
                $("#chartable").append(
                    `
                    <tr>
                    <td><image src="${data["images"]["icon"]}" onerror="this.src='../../build/qm.png'" class="no-shadow no-margin w64 h64""></td>
                    <td>${asLinkable(data["name"],data["name"],"")}</td>
                    <td>${data["element"]}</td>
                    <td>${data["weapontype"]}</td>
                    <td>${data["substat"]}</td>
                    <td>${data["rarity"]}</td>
                    </tr>
                    `
                );
            });
        })
        
    });

