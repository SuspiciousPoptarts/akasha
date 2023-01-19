const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendZoom: (msg) => ipcRenderer.send("zoom", msg),
    sendCreateChildWindow: (msg) => ipcRenderer.send("createChildWindow", msg)
})