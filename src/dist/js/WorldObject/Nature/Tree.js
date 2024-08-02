"use strict";
class Tree extends WorldObject {
    constructor(position, size, options) {
        super(position, size, options);
        this.options.imgPath = "assets/images/nature/tree.png";
        this.img = new Image();
        this.img.src = this.options.imgPath;
        this.img.onload = () => {
            if (this.img) {
                this.size = new Vector(this.img.width, this.img.height);
                let randomOffsetX = Math.random() * (tileWidth / 2);
                let randomOffsetY = Math.random() * (tileHeight / 2);
                this.position = new Vector(this.position.x -
                    this.size.x / 2 +
                    tileWidth / 2 +
                    randomOffsetX, this.position.y -
                    this.size.y +
                    tileHeight -
                    tileHeight / 2 +
                    randomOffsetY);
            }
        };
        this.hitbox = {
            position: new Vector(this.position.x + this.size.x / 2 - tileWidth / 2, this.position.y + this.size.y - tileHeight),
            size: new Vector(tileWidth, tileHeight)
        };
    }
    draw() {
        if (this.img) {
            ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }
}
//# sourceMappingURL=Tree.js.map