"use strict";
let width = window.innerWidth;
let height = window.innerHeight;
const mouse = {
    x: 0,
    y: 0,
    down: 0,
};
const keys = {};
let tilesPerRow = 16 * 2;
let tilesPerColumn = 9 * 2;
if (tilesPerColumn % 2 !== 0)
    tilesPerColumn += 1;
let tileWidth = width / tilesPerRow;
let tileHeight = height / tilesPerColumn;
const zonesVisible = true;
const entities = [];
let resolutions = [
    { width: 1920, height: 1080 },
    { width: 1680, height: 1050 },
    { width: 1600, height: 1024 },
    { width: 1600, height: 900 },
    { width: 1440, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1360, height: 768 },
    { width: 1280, height: 1024 },
    { width: 1280, height: 960 },
    { width: 1280, height: 800 },
    { width: 1280, height: 768 },
    { width: 1280, height: 720 },
    { width: 1176, height: 664 },
    { width: 1152, height: 864 },
    { width: 1024, height: 768 },
    { width: 800, height: 600 },
];
function resize() {
    res = { width: 0, height: 0 };
    for (let r of resolutions) {
        if (r.width < window.innerWidth && r.width > res.width)
            res = r;
    }
    canvas.width = res.width;
    canvas.height = res.height;
    width = res.width;
    height = res.height;
    tileWidth = width / tilesPerRow;
    tileHeight = height / tilesPerColumn;
}
function resizeCamera(camera) {
    camera.width = width;
    camera.height = height;
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
//# sourceMappingURL=global.js.map