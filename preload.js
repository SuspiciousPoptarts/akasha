const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    queryGenshinDBRender: (query) => ipcRenderer.send("gdb-query-render", query),
    queryGenshinDB: (query, asLink = false) => ipcRenderer.invoke("gdb-query", query, asLink),
    on: (channel, func) => { ipcRenderer.on(channel, func) },
});