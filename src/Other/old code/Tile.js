// Isometric

class Tile {
    /**
     *
     * @param {GameMap} parent The map that the tile is a part of
     * @param {Vector} position The position of the tile on the map
     * @param {Object} options
     * @param {number} options.width The width of the tile
     * @param {number} options.height The height of the tile
     * @param {Image} options.image The image of the tile
     * @param {Vector} options.ratio The size ration of the tile (normally 1:1, could be, 1:2)
     */
    constructor(parent, position, options) {
        this.parent = parent;
        this.mapX = position.x;
        this.mapY = position.y;
        for (let option in options) {
            this[option] = options[option];
        }

        if(this.height === this.width*2) {
            this.difRatio = true;
        }
    }
    draw() {
        let x = (this.mapX * 0.5 - this.mapY * 0.5) * this.width - this.width / 2;
        let y = (this.mapY * 0.25 + this.mapX * 0.25) * this.height - this.height / 2;

        if (!this.difRatio) {
            ctx.drawImage(
                this.image,
                // this.parent.position.x + ((this.mapX * .5) * this.width - this.width / 2),
                // this.parent.position.y + ((this.mapY * .5) * this.height - this.height / 2),
                this.parent.parent.position.x + x,
                this.parent.parent.position.y + y,
                this.width,
                this.height
            );
        } else {
            y = y = (this.mapY * (0.25/2) + this.mapX * (0.25/2)) * this.height - this.height / 2;
            ctx.drawImage(
                this.image,
                this.parent.parent.position.x + x,
                this.parent.parent.position.y + y - this.height / 4,
                this.width,
                this.height
            );
        }
    }
}
