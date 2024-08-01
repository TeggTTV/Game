type InventoryOptions = {
    maxSize: number,
    size: number,
}

class Inventory {
    options: InventoryOptions;
    items: Item[];
    hotbar: Hotbar;
    owner: Entity;
    constructor(owner: Entity, options: InventoryOptions) {
        this.options = options;
        this.items = [];
        this.owner = owner;
        this.hotbar = new Hotbar(this.owner);
    }
    add(item: Item) {
        this.items.push(item);
    }
    remove(item: Item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getItems() {
        return this.items;
    }
}