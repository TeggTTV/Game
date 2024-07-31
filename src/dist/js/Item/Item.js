"use strict";
class Item {
    constructor(owner, name, imgPath) {
        this.id = this.assignId();
        this.owner = owner;
        this.name = name;
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