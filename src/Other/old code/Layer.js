class Layer {
    /**
     * 
     * @param {GameMap} parent The map that the layer is a part of 
     */
    constructor(parent) {
        this.parent = parent;
        this.tiles = [];
    }
    draw() {
        for (let tile of this.tiles) {
            tile.draw();
        }
    }
    /**
     * @param {Tile} tile
     */
    addTile(tile) {
        tile.parent = this;
        this.tiles.push(tile);
    }
    /**
     * @param {number} mapX
     * @param {number} mapY
     * @returns
     */
    getTile(mapX, mapY) {
        for (let tile in this.tiles) {
            if (tile.mapX == mapX && tile.mapY == mapY) {
                return tile;
            }
        }
        return false;
    }
    removeTile(tile) {
        let index = this.tiles.indexOf(tile);
        if (index > -1) {
            this.tiles.splice(index, 1);
        }
    }
}