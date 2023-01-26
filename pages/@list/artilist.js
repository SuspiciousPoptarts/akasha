function asLinkable(string, link, src) {
    return `<a href=\"../qcb.html?q=${link}&b=${src}\" target=\"_parent\" class="font-color">` + string + "</a>"
}

fetch("../../data/artifacts/@meta.json")
    .then(response => response.json())
    .then(jsondata => {
        
        jsondata.forEach((object) => {

            fetch(`../../data/artifacts/${object}.json`)
                .then(r => r.json())
                .then(data => {
                    $("#table").append(
                        `
                        <tr>
                        <td><image src="${data["images"]["flower"]}" onerror="this.src='${data["images"]["circlet"]}'" class="no-shadow no-margin w64 h64""></td>
                        <td>${asLinkable(data["name"],data["name"],"")}</td>
                        <td>${data["2pc"]}</td>
                        <td>${data["4pc"]}</td>
                        <td>${data["rarity"][data["rarity"].length-1]}</td>
                        </tr>
                        `
                    );
                })

        })
        
    });

