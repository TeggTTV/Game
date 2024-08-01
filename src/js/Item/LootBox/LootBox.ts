type LootBoxItem = {
    item: Item;
    quantityRange: [number, number];
};

class LootBox {
    items: Item[];
    constructor(items: Item[]) {
        this.items = items;
    }
    open() {
        return this.items;
    }
    static randomLootBox(lootboxes: LootBoxItem[]) {
        let item = lootboxes[Math.floor(Math.random() * lootboxes.length)];
        let quantity = Math.floor(
            Math.random() *
                (item.quantityRange[1] - item.quantityRange[0] + 1) +
                item.quantityRange[0]
        );

        if (item.item instanceof Ammo) {
            return new Ammo(
                item.item.name + " (" + quantity + ")",
                item.item.name,
                quantity
            );
        } else {
            return new Item(null, item.item.name, quantity);
        }
    }
}
