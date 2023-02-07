const filter = /[:"'-]/g

// SECTION LISTENERS

$("#search").keypress(function (e) {
    // ? If key pressed is Enter (13)
    if (e.which == 13) {
        let queryValue = 
            `${this.value[0].toUpperCase()}${this.value.slice(1)}`
            .replaceAll(filter,"")
        
            window.electronAPI.queryGenshinDB(queryValue);

        this.value = "";
    }
});

// !SECTION

// SECTION IPC

window.electronAPI.on("gdb-receiveResponse", async(event, msg) => {
    
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
        default:
            console.warn(`Unknown query response:\n[\n\ttype: {${msg[0]}}\n\tdata: {${msg[1]}}\n]`)
            break;
            
    }
    });


});

// !SECTION