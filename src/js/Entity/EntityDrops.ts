type PossibleDrop = {
    chance: number;
    item: Item | LootBox;
}

class EntityDrops {
    possibleDrops: PossibleDrop[];
    constructor(possibleDrops: PossibleDrop[]) {
        this.possibleDrops = possibleDrops;
    }
}