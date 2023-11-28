const { app, BrowserWindow, screen } = require('electron');

function createWindow(url, screenIndex) {
  const displays = screen.getAllDisplays();

   // Check if screen module is available
   if (displays.length === 0) {
    console.error('No displays found. Make sure the screen module is available.');
    return;
  }

  const currScreen = displays[screenIndex];

  const { width, height } = currScreen.workAreaSize;

  const window = new BrowserWindow({
    fullscreen: true,
    x: currScreen.bounds.x,
    y: currScreen.bounds.y,
    width,
    height,
  });

  window.loadURL(url);

  return window;
}

app.whenReady().then(() => {

    // We cannot require the screen module until the app is ready.
  const { screen } = require('electron');

  mainWindow = createWindow('http://localhost:5173/', 0);
  databaseWindow = createWindow('http://localhost:5173/database', 1);

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});