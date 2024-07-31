class Hint {
    descriptionArr: string[];
    descriptions: { text: string; width: number; height: number }[];
    size: number;


    constructor(descriptionArr: string[], size: number) {
        this.descriptionArr = descriptionArr;
        this.descriptions = [];

        this.size = size;
    }
    draw() {}
    delete() {
        hoverHints = hoverHints.filter((h) => h !== this);
    }
}
