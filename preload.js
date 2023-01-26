const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendZoom: (msg) => ipcRenderer.send("zoom", msg),
    sendCreateChildWindow: (msg) => ipcRenderer.send("createChildWindow", msg),
    sendLoad: (q, b) => ipcRenderer.send("load", { q, b }),
    sendTheme: (msg) => ipcRenderer.send("theme", msg)
})