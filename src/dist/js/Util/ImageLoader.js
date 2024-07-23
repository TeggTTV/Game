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
class ImageLoader {
    constructor() {
        this.images = {};
    }
    loadImage(name, src) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = new Image();
            img.src = src;
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    this.images[name] = img;
                    resolve(this.images[name]);
                    return this.images[name];
                };
                img.onerror = () => {
                    console.log("Could not load image: " + name + " from " + src);
                    reject(false);
                    return false;
                };
            });
        });
    }
    getImage(name) {
        if (this.images[name] == undefined) {
            console.log("Image: " + name + " not found");
            return null;
        }
        return this.images[name];
    }
    loadTileSheet(name, source, tileWidth, tileHeight, rows, cols) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    let tiles = [];
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const tileX = col * tileWidth;
                            const tileY = row * tileHeight;
                            canvas.width = tileWidth;
                            canvas.height = tileHeight;
                            const context = canvas.getContext("2d");
                            context === null || context === void 0 ? void 0 : context.drawImage(image, tileX, tileY, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                            const tileImage = new Image();
                            tileImage.src = canvas.toDataURL();
                            if (tileImage.src !==
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==") {
                                tiles.push(tileImage);
                            }
                        }
                    }
                    resolve(tiles);
                    this.images[name] = tiles;
                };
                image.crossOrigin = "anonymous";
                image.src = source;
            });
        });
    }
    loadFolder(nameArr, path, prefix, ext, count) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            for (let iter = 0; iter < count; iter++) {
                promises.push(this.loadImage(nameArr[iter], path + prefix + iter + ext));
            }
            return Promise.all(promises);
        });
    }
    static tileSheetToImages(source, tileWidth, tileHeight, rows, cols) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const image = new Image();
                image.src = source;
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    let tiles = [];
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const tileX = col * tileWidth;
                            const tileY = row * tileHeight;
                            canvas.width = tileWidth;
                            canvas.height = tileHeight;
                            const context = canvas.getContext("2d");
                            context === null || context === void 0 ? void 0 : context.drawImage(image, tileX, tileY, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                            const tileImage = new Image();
                            tileImage.src = canvas.toDataURL();
                            if (tileImage.src !==
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==" &&
                                tileImage.src !==
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAB9JREFUOE9jZKAQMFKon2HUAIbRMGAYDQNQPhr4vAAAJpgAEX/anFwAAAAASUVORK5CYII=") {
                                tiles.push(tileImage);
                            }
                        }
                    }
                    resolve(tiles);
                };
                image.crossOrigin = "anonymous";
                image.src = source;
            });
        });
    }
}
//# sourceMappingURL=ImageLoader.js.map