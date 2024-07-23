"use strict";
class Item {
    constructor(owner, name, imgPath) {
        this.owner = owner;
        this.name = name;
        this.imgLoader = new ImageLoader();
        this.imgLoader.loadImage(name, imgPath).then((img) => {
            this.img = img;
        });
    }
}
//# sourceMappingURL=Item.js.map