class Item {
    owner: Player;
    name: string;
    imgLoader: ImageLoader;
    img: any;

    constructor(owner: Player, name: string, imgPath: string) {
        this.owner = owner;
        this.name = name;
        this.imgLoader = new ImageLoader();
        this.imgLoader.loadImage(name, imgPath).then((img) => {
            this.img = img;
        });
    }
}
