class Hotbar {
    slots: Slot[];
    slotCount?: number = 10;
    owner: Entity;
    constructor(owner: Entity, slotCount: number = 10) {
        this.owner = owner;
        this.slots = new Array(slotCount).fill(null);
        this.slotCount = slotCount;
    }
    full() {
        return this.slots.every((slot) => slot.item !== null);
    }
    setSlot(item: Item, quantity: number, slot: number) {
        if (this.slots[slot] !== null) {
            if (this.slots[slot].item !== null)
                this.slots[slot].set(item, quantity);
        } else {
            this.slots[slot] = new Slot(item, quantity);
        }
    }
    nextAvailableSlot() {
        return this.slots.findIndex((slot) => slot === null);
    }
    changeSlot(index: number) {
        if (this.slots[index] && this.slots[index].item) {
            this.owner.setHolding(this.slots[index].item);
            
        }
    }   
}
