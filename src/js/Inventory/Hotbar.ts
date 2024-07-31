class Hotbar {
    slots: Slot[];
    slotCount?: number = 10;
    constructor(slotCount: number = 10) {
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
}
