"use strict";
class LootBox {
    constructor(items) {
        this.items = items;
    }
    open() {
        return this.items;
    }
    static randomLootBox(lootboxes) {
        let item = lootboxes[Math.floor(Math.random() * lootboxes.length)];
        let quantity = Math.floor(Math.random() *
            (item.quantityRange[1] - item.quantityRange[0] + 1) +
            item.quantityRange[0]);
        if (item.item instanceof Ammo) {
            return new Ammo(item.item.name + " (" + quantity + ")", item.item.name, quantity);
        }
        else {
            return new Item(null, item.item.name, quantity);
        }
    }
}
//# sourceMappingURL=LootBox.js.map