"use strict";
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
}
//# sourceMappingURL=TileMap.js.map