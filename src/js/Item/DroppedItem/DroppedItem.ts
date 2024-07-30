class DroppedItem {
    position: Vector;
    itemData: Item;
    img: CanvasImageSource;
    constructor(position: Vector, itemData: Item, imgPath: string) {
        this.position = position;
        this.itemData = itemData;
        this.img = new Image();
        this.img.src = imgPath;
    }
    draw() {
        ctx.drawImage(this.img, this.position.x, this.position.y, tileWidth, tileHeight);
    }
    update() {

    }
}