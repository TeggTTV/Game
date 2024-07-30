type InventoryOptions = {
    maxSize: number,
    size: number,
}

class Inventory {
    options: InventoryOptions;
    items: Item[];
    constructor(options: InventoryOptions) {
        this.options = options;
        this.items = [];
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