const { app, BrowserWindow, dialog, Menu, MenuItem, ipcMain } = require('electron');
const  ElectronSettings                                   = require('electron-settings');

var mainWindow    = null,
    settingWindow = null;

var menu          = null;

var preference    = new ElectronSettings({
  "configDirPath"   : __dirname,
  "configFileName"  : 'setting'
});

app.on('ready', createWindow);

app.on('browser-window-created', (event, window) => {
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

ipcMain.on('setting_apply', (event, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
  preference.set('warning_zone_space', arg1);
  preference.set('danger_zone_space', arg2);
  preference.set('safety_zone_volume', arg3);
  preference.set('warning_zone_volume', arg4);
  preference.set('danger_zone_volume', arg5);
  preference.set('escape_zone_volume', arg6);
  preference.set('flag', arg7);

  mainWindow.reload();
});

createMenu();
createSettings();

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
    "icon"        : __dirname + '/public/images/icon/app.png'
  });

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => { mainWindow.show(); });
  mainWindow.on('closed', () => {
    if (settingWindow !== null ) settingWindow.close();

    settingWindow = null;
    mainWindow = null;
  });
}

function createSettingWindow()
{
  settingWindow = new BrowserWindow({
    "width"       : 1070,
    "height"      : 560,
    "minWidth"    : 1070,
    "minHeight"   : 560,
    "show"        : false,
    "center"      : true,
    "skipTaskbar" : false,
    "title"       : 'VirtualFence Setting',
    "icon"        : __dirname + '/public/images/icon/app.png'
  });

  settingWindow.loadURL(`file://${__dirname}/public/setting.html`);
  settingWindow.setMenu(null);

  settingWindow.once('ready-to-show', () => { settingWindow.show(); });
  settingWindow.on('closed', () => { settingWindow = null; });
}

function createMenu()
{
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Setting',
          click: () => {
            if(settingWindow === null) createSettingWindow();
          },
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

function createSettings()
{
  if (!preference.get('safety_zone_space'))   preference.set('safety_zone_space', '0');
  if (!preference.get('warning_zone_space'))  preference.set('warning_zone_space', '5');
  if (!preference.get('danger_zone_space'))   preference.set('danger_zone_space', '10');
  if (!preference.get('safety_zone_volume'))  preference.set('safety_zone_volume', '0');
  if (!preference.get('warning_zone_volume')) preference.set('warning_zone_volume', '5');
  if (!preference.get('danger_zone_volume'))  preference.set('danger_zone_volume', '10');
  if (!preference.get('escape_zone_volume'))  preference.set('escape_zone_volume', '15');
  if (!preference.get('type_of_sounds'))      preference.set('type_of_sounds', '1');
  if (!preference.get('flag'))                preference.set('flag', '0');
}
