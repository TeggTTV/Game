class Item {
    owner: Entity | null;
    name: string;
    imgLoader: ImageLoader;
    img: any;

    quantity: number = 1;
    quantityRange: number[] = [1, 1];

    id: number = this.assignId();
    constructor(
        owner: Entity | null,
        name: string,
        quantityRange: number | number[],
        imgPath?: string
    ) {
        this.owner = owner;
        this.name = name;

        if (typeof quantityRange === "number") this.quantity = quantityRange;
        else if (quantityRange[0] && quantityRange[1])
            this.quantity =
                Math.floor(Math.random() * quantityRange[1]) + quantityRange[0];

        this.imgLoader = new ImageLoader();
        if (!imgPath) return;
        this.imgLoader.loadImage(name, imgPath).then((img) => {
            this.img = img;
        });
    }
    assignId() {
        return Math.floor(Math.random() * 1000000);
    }
}
