$("#map").click(() => {
    $("#content-window").fadeOut(125);
    $("#content-window").html(`<iframe src="https://act.hoyolab.com/ys/app/interactive-map/index.html" class="w100p h100p" style="overflow:none">`).hide();
    $("#content-window").fadeIn(125);

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");
})

$("#theme").click(async() => {
    $("#content-window").fadeOut(125);
    $("#content-window").html(`${theme()}`).hide();

    // ? Set Accent to Default
    $(":root").get(0).style.setProperty("--accent-color", "");

    let currentTheme = getComputedStyle(document.documentElement);
    const filter = (string) => { return string.replaceAll(/[\\"]/g,'').trim(); }

    $("#badge").val(filter(currentTheme.getPropertyValue('--badge')));
    $("#badge-radius").val(filter(currentTheme.getPropertyValue('--badge-radius')));

    $("#corner").val(filter(currentTheme.getPropertyValue('--corner-radius')));
    $("#border-style").val(filter(currentTheme.getPropertyValue('--border-style')));

    $("#font").val(filter(currentTheme.getPropertyValue('font-family')));
    $("#bg-color").val(filter(currentTheme.getPropertyValue('--background-color')));
    $("#border-color").val(filter(currentTheme.getPropertyValue('--border-color')));
    $("#shadow-color").val(filter(currentTheme.getPropertyValue('--shadow-color')));
    $("#accent-color").val(filter(currentTheme.getPropertyValue('--accent-color')));
    $("#font-color").val(filter(currentTheme.getPropertyValue('--font-color')));
    $("#icon-color").val(filter(currentTheme.getPropertyValue('--icon-color')));

    $("#pyro").val(filter(currentTheme.getPropertyValue('--pyro-accent')));
    $("#hydro").val(filter(currentTheme.getPropertyValue('--hydro-accent')));
    $("#electro").val(filter(currentTheme.getPropertyValue('--electro-accent')));
    $("#dendro").val(filter(currentTheme.getPropertyValue('--dendro-accent')));
    $("#cryo").val(filter(currentTheme.getPropertyValue('--cryo-accent')));
    $("#anemo").val(filter(currentTheme.getPropertyValue('--anemo-accent')));
    $("#geo").val(filter(currentTheme.getPropertyValue('--geo-accent')));
    
    $("#five-star-accent").val(filter(currentTheme.getPropertyValue('--five-star-accent')));
    $("#four-star-accent").val(filter(currentTheme.getPropertyValue('--four-star-accent')));
    $("#three-star-accent").val(filter(currentTheme.getPropertyValue('--three-star-accent')));
    $("#two-star-accent").val(filter(currentTheme.getPropertyValue('--two-star-accent')));
    $("#one-star-accent").val(filter(currentTheme.getPropertyValue('--one-star-accent')));

    $("#content-window").fadeIn(125);

    attachThemeEventListeners();
    
})

function theme() {
    let html = `
    <div class="margin-16">
        <table class="w100p">
            <tr>
                <th colspan="2">Badge</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Badge URL</td>
                <td><input type="text" class="w100p" id="badge"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Badge Radius</td>
                <td><input type="text" class="w100p" id="badge-radius"></td>
            </tr>
        </table>
        
        <table class="w100p margin-t16">
            <tr>
                <th colspan="2">Universal</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Corner Radius</td>
                <td><input type="text" class="w100p" id="corner"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Border Style</td>
                <td><input type="text" class="w100p" id="border-style"></td>
            </tr>
        </table>

        <table class="w100p margin-t16">
            <tr>
                <th colspan="2">Body</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Font</td>
                <td><input type="text" class="w100p" id="font"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Background Color</td>
                <td><input type="color" class="w100p" id="bg-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Border Color</td>
                <td><input type="color" class="w100p" id="border-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Shadow Color</td>
                <td><input type="color" class="w100p" id="shadow-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Accent Color</td>
                <td><input type="color" class="w100p" id="accent-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Font Color</td>
                <td><input type="color" class="w100p" id="font-color"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Icon Color</td>
                <td><input type="color" class="w100p" id="icon-color"></td>
            </tr>
        </table>

        <table class="w100p margin-t16">
            <tr>
                <th colspan="2">Elemental Accents</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Pyro Accent</td>
                <td><input type="color" class="w100p" id="pyro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Hydro Accent</td>
                <td><input type="color" class="w100p" id="hydro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Electro Accent</td>
                <td><input type="color" class="w100p" id="electro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Dendro Accent</td>
                <td><input type="color" class="w100p" id="dendro"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Cryo Accent</td>
                <td><input type="color" class="w100p" id="cryo"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Anemo Accent</td>
                <td><input type="color" class="w100p" id="anemo"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Geo Accent</td>
                <td><input type="color" class="w100p" id="geo"></td>
            </tr>
        </table>

        <table class="w100p margin-t16">
            <tr>
                <th colspan="2">Rarity Accents</th>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Five Star Accent</td>
                <td><input type="color" class="w100p" id="five-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Four Star Accent</td>
                <td><input type="color" class="w100p" id="four-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Three Star Accent</td>
                <td><input type="color" class="w100p" id="three-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>Two Star Accent</td>
                <td><input type="color" class="w100p" id="two-star-accent"></td>
            </tr>
            <tr>
                <td class="t-left w208"><span class="icon padding-r8">&#xe2db;</span>One Star Accent</td>
                <td><input type="color" class="w100p" id="one-star-accent"></td>
            </tr>
        </table>
        <div class="clear-float w100p h16"></div>
    </div>
    `
    return html;
}