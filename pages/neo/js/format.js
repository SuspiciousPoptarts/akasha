// SECTION HTML
function button(icon = '', text, onclick, variant = '') {
    return `
    <button class="default-color float-left margin-t16 margin-r16" onclick="${onclick.replaceAll(/["`']/g,"'")}" variant="${variant}">
        ${(icon == '')? ``:`<span class="icon padding-r8">${icon}</span>`}${text}
    </button>`;
}

function asStars(num) {
    return `<span class="icon padding-r8">${"&#xE838;".repeat(num)}</span>`
}

function asElement(element) {
    let elementLower = element.toLowerCase();
    switch(elementLower) {
        case 'pyro':
            return `<span class="icon padding-r8">&#xf16a;</span>`
        case 'hydro':
            return `<span class="icon padding-r8">"&#xe798;</span>`
        case 'electro':
            return `<span class="icon padding-r8">&#xea0b;</span>`
        case 'dendro':
            return `<span class="icon padding-r8">&#xea35;</span>`
        case 'cryo':
            return `<span class="icon padding-r8">"&#xeb3b;</span>`
        case 'anemo':
            return `<span class="icon padding-r8">&#xefd8;</span>`
        case 'geo':
            return `<span class="icon padding-r8">&#xe3f7;</span>`
    }
    return "";
}

function asIcon(string) {
    let stringLower = string.toLowerCase();
    switch(stringLower) {
        case 'element':
            return `<span class="icon padding-r8">&#xf16b;</span>`;
        case 'weapon':
            return `<span class="icon padding-r8">&#xf889;</span>`;
        case 'substat':
            return `<span class="icon padding-r8">&#xe4fc;</span>`;
        case 'region':
            return `<span class="icon padding-r8">&#xe56a;</span>`;
        case 'constellation':
            return `<span class="icon padding-r8">&#xe65f;</span>`;
        case 'gender':
            return `<span class="icon padding-r8">&#xe63d;</span>`;
        case 'birthday':
            return `<span class="icon padding-r8">&#xe7e9;</span>`;
        case 'voice':
            return `<span class="icon padding-r8">&#xef49;</span>`;
        case 'attack':
            return `<span class="icon padding-r8">&#xf84b;</span>`;
        case 'skill':
            return `<span class="icon padding-r8">&#xe1ad;</span>`;
        case 'burst':
            return `<span class="icon padding-r8">&#xe1ac;</span>`;
    }
    return "";
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
// !SECTION