class DroppedItem extends Entity {
    position: Vector;
    size: Vector;
    options: EntityOptions;
    itemData: Item;
    img: CanvasImageSource;
    constructor(position: Vector, size: Vector, options: EntityOptions, itemData: Item) {
        super(position, size, options)
        this.position = position;
        this.size = size;
        this.options = options;
        this.itemData = itemData;

        this.img = new Image();
        this.img.src = options.imgPath;
    }
    draw() {
        ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y)
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update() {

    }
    delete(): void {
        let index = droppedItems.indexOf(this);
        droppedItems.splice(index, 1);
    }
}