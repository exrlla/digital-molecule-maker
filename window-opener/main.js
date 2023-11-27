const { app, BrowserWindow, screen } = require('electron');

let mainWindow;
let databaseWindow;

function createWindow(url, screenIndex) {
  const displays = screen.getAllDisplays();

   // Check if screen module is available
   if (displays.length === 0) {
    console.error('No displays found. Make sure the screen module is available.');
    return;
  }

  const mainScreen = displays[screenIndex || 0];

  const { width, height } = mainScreen.workAreaSize;

  const window = new BrowserWindow({
    x: mainScreen.bounds.x,
    y: mainScreen.bounds.y,
    width,
    height,
  });

  window.loadURL(url);

  return window;
}

app.whenReady().then(() => {

    // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')

  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  mainWindow = createWindow('http://localhost:5173/', 0);
  databaseWindow = createWindow('http://localhost:5173/database', 0);

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     mainWindow = createWindow('http://localhost:5173/', 0);
  //     databaseWindow = createWindow('http://localhost:5173/database', 1);
  //   }
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// NOKDSKJFSDKLJ:FSDKLJF:LSD
// const { app, BrowserWindow } = require('electron')

// let mainWindow = null

// app.disableHardwareAcceleration();
// app.whenReady().then(() => {
//     app.commandLine.appendSwitch('in-process-gpu');
//   // We cannot require the screen module until the app is ready.
//   const { screen } = require('electron')

//   // Create a window that fills the screen's available work area.
//   const primaryDisplay = screen.getPrimaryDisplay()
//   const { width, height } = primaryDisplay.workAreaSize

//   mainWindow = new BrowserWindow({ width, height })
//   mainWindow.loadURL('https://electronjs.org')
// })

// const { app, BrowserWindow } = require('electron')

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()
// })