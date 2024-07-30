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
class TileMap {
    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.tiles = [];
    }
    addTile(tile) {
        this.tiles.push(tile);
    }
    draw() {
        this.tiles.forEach((tile) => tile.draw());
    }
    loadMap(mapPath, tileSetPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(mapPath);
            let map = yield response.json();
            let images = yield ImageLoader.tileSheetToImages(tileSetPath, map.tilewidth, map.tileheight, 5, 13);
            let zones = [];
            for (let i = 0; i < map.layers.length; i++) {
                let tempArr = [];
                for (let j = 0; j < map.layers[i].data.length; j += map.width) {
                    tempArr.push(map.layers[i].data.slice(j, j + map.width));
                }
                zones.push({ name: map.layers[i].name, data: tempArr });
            }
            let grassZone = zones[0];
            for (let i = 0; i < grassZone.data.length; i++) {
                for (let j = 0; j < grassZone.data[i].length; j++) {
                    if (images[grassZone.data[i][j] - 1] === undefined)
                        continue;
                    let tile = new Tile(new Vector(j * tileWidth, i * tileHeight), images[grassZone.data[i][j] - 1]);
                    this.addTile(tile);
                }
            }
            let waterZone = zones[1];
            for (let i = 0; i < waterZone.data.length; i++) {
                for (let j = 0; j < waterZone.data[i].length; j++) {
                    if (images[waterZone.data[i][j] - 1] === undefined)
                        continue;
                    let tile = new TileZone(new Vector(j * tileWidth, i * tileHeight), images[waterZone.data[i][j] - 1]);
                    tile.setType("water");
                    this.addTile(tile);
                }
            }
            let barrierZone = zones[2];
            for (let i = 0; i < barrierZone.data.length; i++) {
                for (let j = 0; j < barrierZone.data[i].length; j++) {
                    if (barrierZone.data[i][j] - 1 < 0)
                        continue;
                    let barrierImg = new Image();
                    barrierImg.src = "assets/images/red.png";
                    let tile = new TileZone(new Vector(j * tileWidth, i * tileHeight), barrierImg);
                    tile.setType("barrier");
                    this.addTile(tile);
                }
            }
        });
    }
}
//# sourceMappingURL=TileMap.js.map