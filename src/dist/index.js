import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { app, BrowserWindow, ipcMain } from "electron";
import { getAvailableResolution } from "win-screen-resolution";
const ipc = ipcMain;
let resolutions = [];
class Main {
    constructor() {
        this.mainWindow = null;
        this.createWindow = () => {
            this.mainWindow = new BrowserWindow({
                width: 640,
                height: 480,
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
            this.mainWindow.on("closed", () => {
                this.mainWindow = null;
            });
            resolutions = getAvailableResolution();
            console.log(resolutions);
            ipc.on("getResolutions", (event) => {
                event.sender.send("resolutions", resolutions);
            });
        };
        this.onWindowAllClosed = () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        };
    }
    init() {
        app.on("ready", this.createWindow);
        app.on("window-all-closed", this.onWindowAllClosed);
        ipc.on("changeResolution", (_, res) => {
            var _a, _b;
            this.mainWindow.resizable = true;
            (_a = this.mainWindow) === null || _a === void 0 ? void 0 : _a.setSize(res.width, res.height);
            (_b = this.mainWindow) === null || _b === void 0 ? void 0 : _b.center();
            this.mainWindow.resizable = false;
        });
        ipc.on("fullscreen", () => {
            this.fullscreen();
        });
    }
    fullscreen() {
        var _a, _b, _c;
        if ((_a = this.mainWindow) === null || _a === void 0 ? void 0 : _a.isFullScreen()) {
            (_b = this.mainWindow) === null || _b === void 0 ? void 0 : _b.setFullScreen(false);
        }
        else {
            (_c = this.mainWindow) === null || _c === void 0 ? void 0 : _c.setFullScreen(true);
        }
    }
}
const main = new Main();
main.init();
//# sourceMappingURL=index.js.map