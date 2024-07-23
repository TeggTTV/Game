class Tile {
    x: number;
    y: number;
    img: CanvasImageSource;
    hoverHint: HoverHint | undefined;
    firstHover: boolean;
    hovering: boolean;
    immovable: boolean;
    barrier: boolean;
    constructor(x: number, y: number, img: CanvasImageSource) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.hoverHint = undefined;
        this.firstHover = false;
        this.hovering = false;
        this.immovable = false;

        this.barrier = false;
    }
    setBarrier(barrier: boolean) {
        this.barrier = barrier;
    }
    draw() {
        ctx.strokeRect(this.x, this.y, tileWidth, tileHeight);
        ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        this.checkHover();
        // if (this.barrier) this.barrier.draw();
    }
    update(
        // delta: number
    ) {
        // if (this.barrier) this.barrier.update(this.x, this.y);
    }
    drawHoverHint() {
        if (this.hovering && this.hoverHint !== undefined) {
            this.hoverHint.draw();
        } else if (this.hovering === false && this.hoverHint !== undefined) {
            this.hoverHint.timerStarted = false;
            this.hoverHint.canDraw = false;
        }
    }
    checkHover() {
        // check if tile is in camera view
        if (
            this.x + tileWidth - camera.x > 0 &&
            this.x - camera.x < camera.width &&
            this.y + tileHeight - camera.y > 0 &&
            this.y - camera.y < camera.height
        ) {
            let cameraX = this.x - camera.x;
            let cameraY = this.y - camera.y;

            // if(this.x === 2 && this.y === 2) console.log(cameraX, cameraY);

            if (
                mouse.x >= cameraX &&
                mouse.x < cameraX + tileWidth &&
                mouse.y >= cameraY &&
                mouse.y < cameraY + tileHeight
            ) {
                // console.log("Hovering", this.x, this.y, mouse.x, mouse.y, tileWidth, tileHeight);
                if (!this.firstHover) {
                    this.firstHover = true;
                    if (this.hoverHint !== undefined) this.hoverHint.onHover();
                }
                this.hovering = true;
            } else {
                this.hovering = false;
                this.firstHover = false;
            }
        }
    }
    addHoverHint(hint: HoverHint) {
        this.hoverHint = hint;
    }
}

class TileZone extends Tile {
    type: string | null;
    constructor(x: number, y: number, img: CanvasImageSource) {
        super(x, y, img);
        this.hoverHint = new HoverHint(["Zone"], 20, 0.2);
        this.type = null;
    }
    setType(type: string) {
        this.type = type;
    }
    draw() {
        if (!zonesVisible) return;
        ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        this.checkHover();
    }
}
