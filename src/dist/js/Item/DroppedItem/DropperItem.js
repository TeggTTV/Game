"use strict";
class DroppedItem {
    constructor(position, itemData, imgPath) {
        this.position = position;
        this.itemData = itemData;
        this.img = new Image();
        this.img.src = imgPath;
    }
    draw() {
        ctx.drawImage(this.img, this.position.x, this.position.y, tileWidth, tileHeight);
    }
    update() {
    }
}
//# sourceMappingURL=DropperItem.js.map