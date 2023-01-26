const { create } = require('domain');
const { app, BrowserWindow, ipcMain, ipcRenderer, webFrame, BrowserView } = require('electron');
const fs = require('fs');
const path = require('path');
const { electron } = require('process');

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
    minHeight: 742,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    show: false
  })

  const createChildWindow = (src, name) => {
    const winChild = new BrowserWindow({
      parent: win,
      webPreferences: {
        // nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      title: name,
      width: 864,
      height: 600,
      resizable: false,
      backgroundColor: '#000000',
      autoHideMenuBar: true,
      show: false
    })
    winChild.loadFile(src)

    winChild.once('ready-to-show', () => {
      winChild.show()
    })

    winChild.on("close", event => {
      event.preventDefault();
      winChild.hide();
    })

    ipcMain.on("theme", (event, msg) => {
      winChild.webContents.reloadIgnoringCache();
    })
  };

  win.loadFile('pages/wikiwrapper.html')

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on("close", () => {
    app.quit();
  });

  ipcMain.on("zoom", (event, msg) => {
    switch (msg) {
      case "in":
        win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.25);
        break;
      case "out":
        win.webContents.setZoomLevel(win.webContents.getZoomLevel() - 0.25);
        break;
    }
  })

  ipcMain.on("load", (event, msg) => {
    win.loadFile('pages/wikiwrapper.html', { query: { q: msg["q"], b: msg["b"] } })
  });

  ipcMain.on("createChildWindow", (event, msg) => {
    switch (msg) {
      case 'theme':
        createChildWindow("pages/themeeditor.html", "Theme")
        break;
    }
  });

  ipcMain.on("theme", (event, msg) => {
    win.webContents.reloadIgnoringCache();
  })
};

ipcMain.on("theme", (event, msg) => {
  fs.writeFileSync(path.join(__dirname, "pages", "theme.css"), msg);
})

app.whenReady().then(() => {
  mainWindow = createWindow()
});