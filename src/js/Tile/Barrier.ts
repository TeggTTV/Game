class Barrier extends Tile {
    immovable: boolean;
    constructor(position: Vector, img: HTMLImageElement) {
        super(position, img);
        this.position = position;
        this.img = img;
        this.immovable = true;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
    }
}
