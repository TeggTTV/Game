class Slot {
    item: Item | null;
    constructor(item: Item | null, public quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
    set(item: Item, quantity: number) {
        console.log("Setting item in slot");
        
        this.item = item;
        this.quantity = quantity;
    }
}