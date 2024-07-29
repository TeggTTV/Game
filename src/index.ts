import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { app, BrowserWindow, ipcMain } from "electron";
import { getAvailableResolution } from "win-screen-resolution";

const ipc = ipcMain;

let resolutions: any = [];

class Main {
    mainWindow: BrowserWindow | null = null;

    init() {
        app.on("ready", this.createWindow);
        app.on("window-all-closed", this.onWindowAllClosed);
        // ipc.on("minimizeApp", () => {
        //     this.mainWindow?.minimize();
        // });
        // ipc.on("maximizeApp", () => {
        //     if (this.mainWindow?.isMaximized()) {
        //         this.mainWindow?.unmaximize();
        //     } else {
        //         this.mainWindow?.maximize();
        //     }
        // });
        // ipc.on("closeApp", () => {
        //     app.quit();
        // });

        ipc.on("changeResolution", (_, res) => {
            this.mainWindow!.resizable = true;
            this.mainWindow?.setSize(res.width, res.height);
            this.mainWindow?.center();
            this.mainWindow!.resizable = false;
        });
        ipc.on("fullscreen", () => {
            this.fullscreen();
        });
    }

    createWindow = () => {
        this.mainWindow = new BrowserWindow({
            // width: 640,
            // height: 480,
            width: 1600,
            height: 900 + 40,
            // frame: false,
            center: true,
            resizable: false,

            minWidth: 640,
            minHeight: 480,

            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: __dirname + "\\preload.cjs",
            },
        });
        this.mainWindow.setMenuBarVisibility(false);
        this.mainWindow.loadURL("http://127.0.0.1:5500/src/index.html");
        // this.mainWindow.loadFile("src/index.html");
        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });

        resolutions = getAvailableResolution();

        for (let res of resolutions) {
            if (res.width / res.height !== 16 / 9) {
                resolutions.splice(resolutions.indexOf(res), 1);
            }
        }

        console.log(resolutions);

        ipc.on("getResolutions", (event) => {
            event.sender.send("resolutions", resolutions);
        });
    };

    onWindowAllClosed = () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    };

    fullscreen() {
        if (this.mainWindow?.isFullScreen()) {
            this.mainWindow?.setFullScreen(false);
        } else {
            this.mainWindow?.setFullScreen(true);
        }
    }
}
const main = new Main();
main.init();
