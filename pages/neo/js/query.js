const filter = /[:"'-]/g

// SECTION LISTENERS

$("#search").keypress(function (e) {
    // ? If key pressed is Enter (13)
    if (e.which == 13) {
        let queryValue = 
            `${this.value[0].toUpperCase()}${this.value.slice(1)}`
            .replaceAll(filter,"")
        
            window.electronAPI.queryGenshinDBRender(queryValue);

        this.value = "";
    }
});

// !SECTION

// SECTION IPC

window.electronAPI.on("gdb-receiveResponse-render", async(event, msg) => {
    
    $("#content-window").fadeOut(125, function () {
    switch(msg[0]) {
        case 'character':
            let character = new CharacterPage(msg[1],msg[2],msg[3]);
            if(!character["character"]) { console.warn(`Query responded with Traveler (Aether, Lumine), not defined!`) }
            else { character.render(); }
            break;
        case 'weapon':
            let weapon = new WeaponPage(msg[1]);
            weapon.render()
            break;
        case 'artifact':
            let artifact = new ArtifactPage(msg[1]);
            artifact.render()
            break;
        case 'material':
            let material = new MaterialPage(msg[1],msg[2]);
            material.render()
            break;
        default:
            console.warn(`Unknown query response:\n[\n\ttype: {${msg[0]}}\n\tdata: {${msg[1]}}\n]`)
            break;
            
    }
    });


});

// !SECTION

// SECTION asLinkable (HTML)
    function asLinkable(display, query) {
        return `<a onclick="window.electronAPI.queryGenshinDBRender('${query.replaceAll(filter,'')}')">${display}</a>`;
    }
// !SECTION asLinkable