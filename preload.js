const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    queryGenshinDB: (query) => ipcRenderer.send("gdb-query", query),
    on: (channel, func) => { ipcRenderer.on(channel, func) },
});