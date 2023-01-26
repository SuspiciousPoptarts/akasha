import charlist from '../data/characters/meta.json' assert { type: 'json' };
import weplist from '../data/weapons/@meta.json' assert { type: 'json' };
import artilist from '../data/artifacts/@meta.json' assert { type: 'json' };
import matlist from '../data/materials/@meta.json' assert { type: 'json' };
import enelist from '../data/enemies/@meta.json' assert { type: 'json' };
import foodlist from '../data/food/@meta.json' assert { type: 'json' };
import anilist from '../data/animals/@meta.json' assert { type: 'json' };

const ranges = [
    charlist.length,
    charlist.length + weplist.length,
    charlist.length + weplist.length + artilist.length,
    charlist.length + weplist.length + artilist.length + matlist.length,
    charlist.length + weplist.length + artilist.length + matlist.length + enelist.length,
    charlist.length + weplist.length + artilist.length + matlist.length + enelist.length + foodlist.length,
    charlist.length + weplist.length + artilist.length + matlist.length + enelist.length + foodlist.length + anilist.length,
];

var history = [];

function compileSearchOptions() {
    let options = [].concat(charlist, weplist, artilist, matlist, enelist, foodlist, anilist);

    return options;
}

function search(list, query) {
    if (query == "") return [];
    if (query == "@styler") { return ["@componentcreator"]; };
    let matches = []

    const q = new RegExp(query.toLowerCase());
    list.forEach(function (element, index) {
        if (element.toLowerCase().match(q)) matches.push([element, index]);
    });

    return matches;
}

function levDistance(comparator, comparatee) {
    if (comparator == comparatee) return 0;
    let tM = [];

    let coL = comparator.length;
    let ceL = comparatee.length;

    // INIT 2D ARRAY
    for (let i = 0; i < coL; ++i) { tM[i] = new Array(ceL) };

    for (let i = 0; i < coL; ++i) tM[i][0] = i;
    for (let j = 0; j < ceL; ++j) tM[0][j] = j;

    for (let i = 1; i < coL; ++i) {
        for (let j = 1; j < ceL; ++j) {
            tM[i][j] = Math.min(
                tM[i - 1][j] + 1, // Element Above, +1
                tM[i][j - 1] + 1, // Element Adjacent, +1
                tM[i - 1][j - 1] + (comparator[i - 1] === comparatee[j - 1] ? 0 : 1), // Diagonal Element, +1 Whether or not char at indeces match.
            );
        }
    }

    return tM[coL - 1][ceL - 1];
}

function pushToHistory(element) {
    if (history.length >= 50) history.shift();
    history.push(element);
}

function pushToWindow(href) {
    $("#info-panel").attr("src", href);
}

function filterToPush(term) {
    try {
        let matches = search(base, term);

        if (matches == [] || matches == "") return;
        if (matches[0] == "@componentcreator") { pushToWindow("styler/componentcreator.html"); }

        let closestMatch = matches[0];

        matches.forEach(function (e) {
            if (levDistance(closestMatch[0], term) > levDistance(e[0], term)) { closestMatch = e; }
        });


        // CHARACTERS
        if (closestMatch[1] < ranges[0]) { pushToWindow("charwikipage/charwikipage.html?character=" + closestMatch[0]); }
        // WEAPONS
        else if (closestMatch[1] < ranges[1]) { pushToWindow("wepwikipage/wepwikipage.html?weapon=" + closestMatch[0]); }
        // ARTIFACTS
        else if (closestMatch[1] < ranges[2]) { pushToWindow("artiwikipage/artiwikipage.html?artifact=" + closestMatch[0]); }
        // MATERIALS
        else if (closestMatch[1] < ranges[3]) { pushToWindow("matwikipage/matwikipage.html?mat=" + closestMatch[0]); }
        // ENEMIES
        else if (closestMatch[1] < ranges[4]) { pushToWindow("enewikipage/enewikipage.html?enemy=" + closestMatch[0]); }
        // FOOD
        else if (closestMatch[1] < ranges[5]) { pushToWindow("foodwikipage/foodwikipage.html?food=" + closestMatch[0]); }
        // ANIMALS
        else if (closestMatch[1] < ranges[6]) { pushToWindow("aniwikipage/aniwikipage.html?animal=" + closestMatch[0]); }

        pushToHistory(closestMatch[0]);
    } catch (e) { }
}

var base = compileSearchOptions();

$("#search").keypress(function (e) {
    if (e.which == 13) {
        filterToPush(this.value);
    }
});

$("#zoom-in").click(function () {
    window.electronAPI.sendZoom("in");
});

$("#zoom-out").click(function () {
    window.electronAPI.sendZoom("out");
});

$("#theme").click(function () {
    window.electronAPI.sendCreateChildWindow("theme");
});

$("#map").click(function () {
    $("#info-panel").attr("src", "https://act.hoyolab.com/ys/app/interactive-map/index.html");
});

$("#history").click(function () {
    console.log(history);
    if (history.length <= 1) return;

    history.pop();
    filterToPush(history[history.length - 1]);
    history.pop();
});

let paramString = document.URL.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
    ;
    switch (pair[0]) {
        case 'q':
            $("#info-panel").attr("src", filterToPush(pair[1]));
            break;
        case 'b':
            let matches = search(base, pair[1]);
            history.shift();
            pushToHistory(matches[0][0]);
            pushToHistory(matches[0][0]);
    }
}