const { create } = require('domain');
const { app, BrowserWindow, ipcMain, ipcRenderer, webFrame, BrowserView} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      webPreferences: {
        // nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      width: 1640,
      height: 960,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: '#000000',
      autoHideMenuBar: true,
      show: false
    })
  
    win.loadFile('pages/wikiwrapper.html')

    win.once('ready-to-show', () => {
      win.show()
    })

    ipcMain.on("zoom", (event, msg) => {
      switch(msg) {
        case "in":
          win.webContents.setZoomLevel(win.webContents.getZoomLevel()+0.25);
          break;
        case "out":
          win.webContents.setZoomLevel(win.webContents.getZoomLevel()-0.25);
          break;
      }
    })
};

const createChildWindow = (src) => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    width: 1640,
    height: 960,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    show: false
  })

  win.loadFile(src)

  win.once('ready-to-show', () => {
    win.show()
  })
};

app.whenReady().then(() => {
    mainWindow = createWindow()
});

ipcMain.on("createChildWindow", (event, msg) => {
})