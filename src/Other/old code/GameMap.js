class GameMap {
    /**
     *
     * @param {Vector} size The size in the X direction of the map
     */
    constructor(size) {
        this.size = size;
        this.position = new Vector(0, 0);
        this.layers = [];
    }
    draw() {
        for (let layer of this.layers) {
            layer.draw();
        }
    }
    /**
     * @returns {Layer}
     */
    addLayer() {
        let layer = new Layer(this);
        this.layers.push(layer);
        return layer;
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
    setPosition(pos) {
        this.position = pos;
    }
}
