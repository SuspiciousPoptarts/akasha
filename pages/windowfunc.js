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

function pushToHistory(element) {
    if(history.length >= 50) history.shift();
    history.push(element);
}

function pushToWindow(href) {
    $("#info-panel").attr("src", href);
}

function filterToPush(term) {
    let matches = search(base, term);

    if(matches == [] || matches == "") return;
    if(matches[0] == "@componentcreator") { pushToWindow("styler/componentcreator.html"); }

    // CHARACTERS
    if(matches[0][1] < ranges[0]) { pushToWindow("charwikipage/charwikipage.html?character=" + matches[0][0]); }
    // WEAPONS
    else if(matches[0][1] < ranges[1]) { pushToWindow("wepwikipage/wepwikipage.html?weapon=" + matches[0][0]); }
    // ARTIFACTS
    else if(matches[0][1] < ranges[2]) { pushToWindow("artiwikipage/artiwikipage.html?artifact=" + matches[0][0]); }

    pushToHistory(matches[0][0]);
}

var base = compileSearchOptions();

$("#search").keypress(function(e) {
    if(e.which == 13) {
        filterToPush(this.value);
    }
});

$("#zoom-in").click(function() {
    window.electronAPI.sendZoom("in");
});

$("#zoom-out").click(function() {
    window.electronAPI.sendZoom("out");
});

$("#map").click(function() {
    $("#info-panel").attr("src", "https://act.hoyolab.com/ys/app/interactive-map/index.html");
});

$("#history").click(function() {
    if(history.length <= 1) return;

    history.pop();
    filterToPush(history[history.length-1]);
    history.pop();
});

