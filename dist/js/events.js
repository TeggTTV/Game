"use strict";
const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
let minBtn;
let maxMin;
let closeBtn;
window.onload = function () {
    minBtn = document.getElementById("minBtn");
    minBtn === null || minBtn === void 0 ? void 0 : minBtn.addEventListener("click", () => {
        ipc.send("minimizeApp");
    });
    maxMin = document.getElementById("maxMinBtn");
    maxMin === null || maxMin === void 0 ? void 0 : maxMin.addEventListener("click", () => {
        ipc.send("maximizeApp");
    });
    closeBtn = document.getElementById("closeBtn");
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
        ipc.send("closeApp");
    });
};
//# sourceMappingURL=events.js.map