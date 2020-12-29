// Babel Garbage
import "core-js/stable";
import "regenerator-runtime/runtime";

// src/electron.js
import { app, BrowserWindow, ipcMain } from "electron";
import { isDev } from "./env";

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  if (isDev) {
    win.loadURL("http://localhost:8080/");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.setMenu(null);
    win.loadFile("dist/index.html");
  }
}

app.on("ready", createWindow);

ipcMain.handle("test-message", async (event, arg) => {
  console.log(arg); // prints "ping"
  return "pongs";
});
