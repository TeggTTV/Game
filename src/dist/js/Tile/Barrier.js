"use strict";
class Barrier extends Tile {
    constructor(x, y, img) {
        super(x, y, img);
        this.x = x;
        this.y = y;
        this.img = img;
        this.immovable = true;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
    }
}
//# sourceMappingURL=Barrier.js.map