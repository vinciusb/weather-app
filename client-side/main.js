// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    const isDev = require('electron-is-dev');
    isDev && require('react-devtools-electron');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') app.quit();
});