const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    queryGenshinDBRender: (query) => ipcRenderer.send("gdb-query-render", query),
    queryGenshinDB: (query, asLink = false) => ipcRenderer.invoke("gdb-query", query, asLink),
    writeToTheme: (theme) => ipcRenderer.invoke("update/theme", theme),
    on: (channel, func) => { ipcRenderer.on(channel, func) },
    
    getCharList: () => ipcRenderer.invoke("get/charList"),
    getWepList: () => ipcRenderer.invoke("get/wepList"),
    getArtiList: () => ipcRenderer.invoke("get/artiList"),
});