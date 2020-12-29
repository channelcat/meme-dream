// src/electron.js
import { app, BrowserWindow } from 'electron'
import { isDev } from './env'

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  if (isDev) {
    win.loadURL('http://localhost:8080/');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.setMenu(null);
    win.loadFile('dist/index.html');
  }
}

app.on('ready', createWindow);