// SECTION HTML

function button(icon = '', text, onclick, variant = '') {
    return `
    <button class="default-color float-left margin-t16 margin-r16" onclick="${onclick.replaceAll(/["`']/g,"'")}" variant="${variant}">
        ${(icon == '')? ``:`<span class="icon padding-r8">${icon}</span>`}${text}
    </button>`;
}

function iconTemplate(icons) {
    return `<span class="icon padding-r8">${icons}</span>`;
}

function asStars(num) {
    return iconTemplate("&#xE838".repeat(num));
}

function asElement(element) {
    let elementLower = element.toLowerCase();
    switch(elementLower) {
        case 'pyro':
            return iconTemplate("&#xf16a");
        case 'hydro':
            return iconTemplate("&#xe798");
        case 'electro':
            return iconTemplate("&#xea0b");
        case 'dendro':
            return iconTemplate("&#xea35");
        case 'cryo':
            return iconTemplate("&#xeb3b");
        case 'anemo':
            return iconTemplate("&#xefd8");
        case 'geo':
            return iconTemplate("&#xe3f7");
    }
    return "";
}

function asIcon(string) {
    let stringLower = string.toLowerCase();
    let icon = `<span class="icon padding-r8"><icon></span>`
    switch(stringLower) {
        case 'element':
            return iconTemplate("&#xf16b");
        case 'weapon':
            return iconTemplate("&#xf889");
        case 'substat':
            return iconTemplate("&#xe4fc");
        case 'region':
            return iconTemplate("&#xe56a");
        case 'constellation':
            return iconTemplate("&#xe65f");
        case 'gender':
            return iconTemplate("&#xe63d");
        case 'birthday':
            return iconTemplate("&#xe7e9");
        case 'voice':
            return iconTemplate("&#xef49");
        case 'attack':
            return iconTemplate("&#xf84b");
        case 'skill':
            return iconTemplate("&#xe1ad");
        case 'burst':
            return iconTemplate("&#xe1ac");
        case 'baseattack':
            return iconTemplate("&#xf092");
        case 'basesubstat':
            return iconTemplate("&#xe4fb");
        case 'type':
            return iconTemplate("&#xead3");
        case 'category':
            return iconTemplate("&#xe574");
    }
    return "";
}

function capitalize(string) {
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.substr(1);
}
// !SECTION
// SECTION Text as HTML
function formatParagraph(string) {
    return string
    .replaceAll("\n", "</br>")
    .replaceAll(/[*]{2}(.+?)[*]{2}/g, `<b>$1</b>`)
    .replaceAll("·","• ");
}

function formatSkill(attributes, level = 0) {
    const paramLabel = /{(.+?):(.+?)}/g;

    let sentence = "";

    // ? label -> "1-Hit DMG|{param1:F1P}"
    for(let label of attributes["labels"]) {
        let phrase = label;
        // ? paramList -> ["{param1:F1P}"]
        let paramList = label.match(paramLabel);

        for(let param of paramList) {
            // ? groups -> ["1-Hit DMG|{param1:F1P}","param1","F1P"]
            let groups = paramLabel.exec(param);

            let replaceable = groups[1];
            let percentFlag = groups[2].includes("P");

            phrase = (percentFlag)? 
                // ? 0.352783 -> 35.27%
                phrase.replace(
                    paramLabel,
                    `${(attributes["parameters"][replaceable][level] * 100).toFixed(2)}%`
                )
                :
                // ? 40 -> 40
                phrase.replace(
                    paramLabel,
                    attributes["parameters"][replaceable][level].toFixed(0)
                )
            ;
        }

        phrase = phrase.replaceAll(/(.+)\|/g,"<b>$1: </b>")
        sentence += `${phrase}<br>`
    }
    return sentence;
}

function formatEffect(effect, level = 1) {
    let effectDesc = effect["description"];
    const paramLabel = /(\{[0-9]{1,2}\})/g;
    let params = effect["description"].match(paramLabel);

    if(params == null) return effectDesc;

    for(let param of params) {
        effectDesc = effectDesc.replace(param, effect[level][param.replaceAll(/[\{\}]/g,"")]);
        //-> ${effect[level][param.replaceAll(/[\{\}]/g,"")]}
    }
    return effectDesc;
}
// !SECTION