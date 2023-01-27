const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendZoom: (msg) => ipcRenderer.send("zoom", msg),
    sendCreateChildWindow: (msg) => ipcRenderer.send("createChildWindow", msg),
    sendLoad: (q, b) => ipcRenderer.send("load", { q, b }),
    sendTheme: (msg) => ipcRenderer.send("theme", msg),
    pushToHistory: (src) => ipcRenderer.send("historyPush", src),
    popFromHistory: () => ipcRenderer.send("historyPop")
})

ipcRenderer.on("receiveHistory", (event, msg) => {
    let popped = msg[Math.max(msg.length-1,0)];
    if(popped != undefined && popped != null && popped != "") document.getElementById("info-panel").src = popped;
})