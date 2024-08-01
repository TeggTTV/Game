"use strict";
class Ammo extends Item {
    constructor(name, caliber, quantity, imgPath) {
        super(null, caliber, quantity);
        this.name = name;
        this.caliber = caliber;
        this.quantity = quantity;
        this.imgPath = imgPath || `./assets/ammo/${this.caliber}.png`;
    }
}
//# sourceMappingURL=Ammo.js.map