type PossibleDrop = {
    chance: number;
    item: Item;
}

class EntityDrops {
    possibleDrops: PossibleDrop[];
    constructor(possibleDrops: PossibleDrop[]) {
        this.possibleDrops = possibleDrops;
    }
}