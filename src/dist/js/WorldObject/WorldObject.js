"use strict";
class WorldObject {
    constructor(position, size, options) {
        this.position = position;
        this.size = size;
        this.options = options;
        this.position = position;
        this.size = size;
        this.options = options;
        if (this.options.imgPath) {
            this.img = new Image();
            this.img.src = this.options.imgPath;
            this.img.onload = () => {
                this.tile = new Tile(this.position, this.img);
            };
        }
        else {
            this.img = null;
            this.tile = new Tile(this.position, null);
        }
    }
    draw() {
        if (this.img) {
            ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }
    update(deltaTime) {
        if (this.tile) {
            this.tile.update();
        }
    }
    delete() {
        let index = worldObjects.indexOf(this);
        worldObjects.splice(index, 1);
    }
}
//# sourceMappingURL=WorldObject.js.map