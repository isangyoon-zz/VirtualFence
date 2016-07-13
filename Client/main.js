const { app, BrowserWindow, dialog, Menu, MenuItem, ipc } = require('electron');

var mainWindow    = null,
    settingWindow = null;

var menu          = null;

app.on('ready', createWindow);

app.on('browser-window-created', (event, window) => {
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if(mainWindow === null) createWindow();
});

createMenu();

function createWindow()
{
  mainWindow = new BrowserWindow({
    "width"       : 1280,
    "height"      : 960,
    "minWidth"    : 1280,
    "minHeight"   : 960,
    "show"        : false,
    "center"      : true,
    "skipTaskbar" : false,
    "title"       : 'VirtualFence',
  });

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => { mainWindow.show(); });
  mainWindow.on('closed', () => { mainWindow = null; });
}

function createMenu()
{
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Setting',
          click: () => {},
          accelerator: 'CommandOrControl+,'
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          role: 'quit'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Refresh',
          click: (item, focusedWindow) => {
            if(focusedWindow) focusedWindow.reload();
          },
          accelerator: 'F5'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'View Term of Use'
        },
        {
          label: 'View License'
        },
        {
          label: 'Version ' + app.getVersion(),
          enabled: false
        },
        {
          type: 'separator'
        },
        {
          label: 'About VirtualFence',
          click: () => {}
        }
      ]
    }
  ];

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
