type InventoryOptions = {
    maxSize: number,
    size: number,
}

class Inventory {
    options: InventoryOptions;
    items: Item[];
    hotbar: Hotbar;
    owner: Entity;

    reserveAmmo: {
        [key: string]: number
    }

    constructor(owner: Entity, options: InventoryOptions) {
        this.options = options;
        this.items = [];
        this.owner = owner;
        this.hotbar = new Hotbar(this.owner);

        this.reserveAmmo = {};
    }
    add(item: Item) {
        if(item instanceof Gun) {
            if(!this.reserveAmmo[item.gunLore.caliber]) {
                this.reserveAmmo[item.gunLore.caliber] = 0;
            }
            this.reserveAmmo[item.gunLore.caliber] += item.gunOptions.customs.ammo;
        }
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