class Barrier extends Tile {
    immovable: boolean;
    constructor(x: number, y: number, img: CanvasImageSource) {
        super(x, y, img);
        this.x = x;
        this.y = y;
        this.img = img;
        this.immovable = true;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
    }
}
