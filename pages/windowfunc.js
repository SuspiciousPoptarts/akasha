import charlist from '../data/characters/meta.json' assert { type: 'json' };
import weplist from '../data/weapons/@meta.json' assert { type: 'json' };
import artilist from '../data/artifacts/@meta.json' assert { type: 'json' };

const ranges = [
    charlist.length,
    charlist.length + weplist.length,
    charlist.length + weplist.length + artilist.length,
];

var history = [];

function compileSearchOptions() {
    let options = [].concat(charlist, weplist, artilist);
    
    return options;
}

function search(list, query) {
    if (query == "") return [];
    if (query == "@styler") { return ["@componentcreator"];};
    let matches = []
    const q = new RegExp(query.toLowerCase());
    list.forEach(function(element, index) {
        if (element.toLowerCase().match(q)) matches.push([element, index]);
    });
    return matches;
}

var base = compileSearchOptions();

$("#search").keypress(function(e) {
    if(e.which == 13) {
        let matches = search(base, this.value);

        if(matches == []) return;
        if(matches[0] == "@componentcreator") {
            $("#info-panel").attr("src", "styler/componentcreator.html");
        }
        // CHARACTERS
        if(matches[0][1] < ranges[0]) {
            $("#info-panel").attr("src", "charwikipage/charwikipage.html?character=" + matches[0][0]);
            $("#info-panel").attr("opacity","0");
            
        }
        // WEAPONS
        else if(matches[0][1] < ranges[1]) {
            $("#info-panel").attr("src", "wepwikipage/wepwikipage.html?weapon=" + matches[0][0]);
            $("#info-panel").attr("opacity","0");
        }
        // ARTIFACTS
        else if(matches[0][1] < ranges[2]) {
            $("#info-panel").attr("src", "artiwikipage/artiwikipage.html?artifact=" + matches[0][0]);
            $("#info-panel").attr("opacity","0");
        }
        if(history.length >= 5) history.shift();
        history.push(matches[0][0]);
        console.log(history);
    }
});

$("#zoom-in").click(function() {
    window.electronAPI.sendZoom("in");
}) ;

$("#zoom-out").click(function() {
    window.electronAPI.sendZoom("out");
});

$("#map").click(function() {
    $("#info-panel").attr("src", "https://act.hoyolab.com/ys/app/interactive-map/index.html");
});

