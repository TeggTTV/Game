"use strict";
class Barrier extends Tile {
    constructor(position, img) {
        super(position, img);
        this.position = position;
        this.img = img;
        this.immovable = true;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
    }
}
//# sourceMappingURL=Barrier.js.map