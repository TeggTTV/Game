"use strict";
class Inventory {
    constructor(owner, options) {
        this.options = options;
        this.items = [];
        this.owner = owner;
        this.hotbar = new Hotbar(this.owner);
        this.reserveAmmo = {};
    }
    add(item) {
        if (item instanceof Gun) {
            if (!this.reserveAmmo[item.gunLore.caliber]) {
                this.reserveAmmo[item.gunLore.caliber] = 0;
            }
            this.reserveAmmo[item.gunLore.caliber] += item.gunOptions.customs.ammo;
        }
        this.items.push(item);
    }
    remove(item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getItems() {
        return this.items;
    }
}
//# sourceMappingURL=Inventory.js.map