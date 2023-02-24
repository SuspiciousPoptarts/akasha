const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    queryGenshinDBRender: (query) => ipcRenderer.send("gdb-query-render", query),
    queryGenshinDB: (query, asLink = false) => ipcRenderer.invoke("gdb-query", query, asLink),
    writeToTheme: (theme) => ipcRenderer.invoke("update/theme", theme),
    on: (channel, func) => { ipcRenderer.on(channel, func) },
    
    getCharList: () => ipcRenderer.invoke("get/charList"),
    getWepList: () => ipcRenderer.invoke("get/wepList"),
    getArtiList: () => ipcRenderer.invoke("get/artiList"),
    getMatList: () => ipcRenderer.invoke("get/matList"),
    getEneList: () => ipcRenderer.invoke("get/eneList"),
    getFoodList: () => ipcRenderer.invoke("get/foodList"),
    getAniList: () => ipcRenderer.invoke("get/aniList"),
});