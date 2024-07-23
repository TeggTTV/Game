"use strict";
class Barrier {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.immovable = true;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
    }
    update(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=Barrier.js.map