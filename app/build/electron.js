const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
/*
if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname);
}
*/
//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let mainWindow;

function createMainWindow(menu) {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,/*
    
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },*/
  });

  console.log(__dirname, isDev);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);

  //mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

function createAddWindow() {
  addWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      resizable: false,
      parent: mainWindow,
      webPreferences: {
          nodeIntegration: false,
          enableRemoteModule: true,
          preload: path.join(__dirname, 'add.js')
      }
  });

  addWindow.loadFile('views/add.html');
}

const templateMenu = [
  {
      label: 'Archivo',
      submenu: [{
          label: 'Nuevo Producto',
          accelerator: process.platform == 'darwin' ? 'command+N' : 'Ctrl+N',
          click: () => { createAddWindow() }
      }]
  },
  {
      label: 'DevTools',
      submenu: [
          {
              label: 'show/hide Dev Tools',
              accelerator: 'Ctrl+D',
              click: (item, focusedWindow) => {
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role: 'reload'
          }
      ]
  }
]

const menu = Menu.buildFromTemplate(templateMenu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createMainWindow(menu);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow(menu);
    }
  })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})