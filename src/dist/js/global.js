"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let width = 1600;
let height = 900;
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
const zonesVisible = false;
const entities = [];
const projectiles = [];
const damageTexts = [];
const droppedItems = [];
function resize() {
    tileWidth = width / tilesPerRow;
    tileHeight = height / tilesPerColumn;
}
function resizeCamera(camera) {
    camera.size.x = width;
    camera.size.y = height;
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
//# sourceMappingURL=global.js.map