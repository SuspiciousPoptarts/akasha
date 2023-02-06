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
        let character = new CharacterPage(msg[1],msg[2],msg[3]);
        character.render();
    });


});

// !SECTION