// Oppens the windows on two separate browsers and on different screends connected through HDMI

const { app, BrowserWindow } = require('electron');

let mainWindow;
let databaseWindow;

function createWindow(url, width, height) {
  const window = new BrowserWindow({ width, height });

  window.loadURL(url);

  return window;
}

app.whenReady().then(() => {
  mainWindow = createWindow('http://localhost:5173/', 800, 600);
  databaseWindow = createWindow('http://localhost:5173/database', 800, 600);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow('http://localhost:5173/', 800, 600);
      databaseWindow = createWindow('http://localhost:5173/database', 800, 600);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});