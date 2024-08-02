"use strict";
class Item {
    constructor(owner, name, quantityRange, imgPath) {
        this.quantity = 1;
        this.quantityRange = [1, 1];
        this.id = this.assignId();
        this.owner = owner;
        this.name = name;
        if (typeof quantityRange === "number")
            this.quantity = quantityRange;
        else if (quantityRange[0] && quantityRange[1])
            this.quantity =
                Math.floor(Math.random() * quantityRange[1]) + quantityRange[0];
        this.imgLoader = new ImageLoader();
        if (!imgPath)
            return;
        this.imgLoader.loadImage(name, imgPath).then((img) => {
            this.img = img;
        });
    }
    assignId() {
        return Math.floor(Math.random() * 1000000);
    }
}
//# sourceMappingURL=Item.js.map