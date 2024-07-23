// const { ipcRenderer } = require("electron");
// const ipc = ipcRenderer;

// let minBtn;
// let maxMin;
// let closeBtn;

// ipc.on("resolutions", (_, res) => {
//     resolutions = res;
// });
// ipc.send("getResolutions");

// document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//         ipc.send("window-all-closed");
//     }
//     if (e.key === "F11") {
//         ipc.send("fullscreen");
//     }
// });

window.onload = () => {
    init();
    canvas.addEventListener("mousemove", (e) => {
        mouse.x =
            (canvas.width * (e.clientX - canvas.getBoundingClientRect().left)) /
            canvas.width;
        mouse.y =
            (canvas.height * (e.clientY - canvas.getBoundingClientRect().top)) /
            canvas.height;
    });                                                                                 
};
// window.onresize = resize;

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = false;
});