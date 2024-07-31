"use strict";
class Hotbar {
    constructor(slotCount = 10) {
        this.slotCount = 10;
        this.slots = new Array(slotCount).fill(null);
        this.slotCount = slotCount;
    }
    full() {
        return this.slots.every((slot) => slot.item !== null);
    }
    setSlot(item, quantity, slot) {
        if (this.slots[slot] !== null) {
            if (this.slots[slot].item !== null)
                this.slots[slot].set(item, quantity);
        }
        else {
            this.slots[slot] = new Slot(item, quantity);
        }
    }
    nextAvailableSlot() {
        return this.slots.findIndex((slot) => slot === null);
    }
}
//# sourceMappingURL=Hotbar.js.map