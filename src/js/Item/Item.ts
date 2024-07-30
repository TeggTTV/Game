class Item {
    owner: Entity | null;
    name: string;
    imgLoader: ImageLoader;
    img: any;

    constructor(owner: Entity | null, name: string, imgPath?: string) {
        this.owner = owner;
        this.name = name;
        this.imgLoader = new ImageLoader();
        if(!imgPath) return;
        this.imgLoader.loadImage(name, imgPath).then((img) => {
            this.img = img;
        });
    }
}
