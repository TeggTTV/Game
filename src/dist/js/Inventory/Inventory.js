"use strict";
class Inventory {
    constructor(owner, options) {
        this.options = options;
        this.items = [];
        this.owner = owner;
        this.hotbar = new Hotbar(this.owner);
    }
    add(item) {
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