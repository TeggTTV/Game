class Hint {
    // descriptionArr: {
    //     text: string;
    //     centered: boolean;
    // }[];
    descriptions: { text: string; width: number; height: number }[];
    size: number;

    constructor(
        public descriptionArr: {
            text: string;
            centered: boolean;
        }[],
        size: number
    ) {
        this.descriptionArr = descriptionArr;
        this.descriptions = [];

        this.size = size;
    }
    draw() {}
    delete() {
        hoverHints = hoverHints.filter((h) => h !== this);
    }
}
