"use strict";
class DroppedItem extends Entity {
    constructor(position, size, options, itemData, autoPickup) {
        super(position, size, options);
        this.position = position;
        this.size = size;
        this.options = options;
        this.itemData = itemData;
        this.autoPickup = autoPickup;
        this.rotation = Math.random() * Math.PI * 2;
        this.img = new Image();
        this.img.src = options.imgPath;
        this.img.onload = () => {
            if (this.size.x === -1 && this.size.y === -1) {
                this.size = new Vector(this.img.width, this.img.height);
            }
        };
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.img, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        ctx.restore();
    }
    update() { }
    delete() {
        let index = droppedItems.indexOf(this);
        droppedItems.splice(index, 1);
    }
}
//# sourceMappingURL=DroppedItem.js.map