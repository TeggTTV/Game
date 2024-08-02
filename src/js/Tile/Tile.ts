class Tile {
    position: Vector;
    img: HTMLImageElement | null;
    hoverHint: HoverHint | undefined;
    firstHover: boolean;
    hovering: boolean;
    immovable: boolean;
    barrier: boolean;

    size: Vector;

    constructor(position: Vector, img: HTMLImageElement | null) {
        this.position = position;
        this.img = img;
        this.hoverHint = undefined;
        this.firstHover = false;
        this.hovering = false;
        this.immovable = false;

        this.barrier = false;

        this.size = new Vector(tileWidth, tileHeight);
    }
    setBarrier(barrier: boolean) {
        this.barrier = barrier;
    }
    draw() {
        // ctx.strokeRect(this.x, this.y, tileWidth, tileHeight);
        if (this.img)
            ctx.drawImage(
                this.img,
                this.position.x,
                this.position.y,
                tileWidth,
                tileHeight
            );
        this.checkHover();
        // if (this.barrier) this.barrier.draw();
    }
    update() // delta: number
    {
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
            this.position.x + tileWidth - camera.position.x > 0 &&
            this.position.x - camera.position.x < camera.size.x &&
            this.position.y + tileHeight - camera.position.y > 0 &&
            this.position.y - camera.position.y < camera.size.y
        ) {
            let cameraX = this.position.x - camera.position.x;
            let cameraY = this.position.y - camera.position.y;

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
    constructor(position: Vector, img: HTMLImageElement | null) {
        super(position, img);
        this.hoverHint = new HoverHint([{ text: "Zone", centered: false}], 15, 0.2);
        this.type = null;
    }
    setType(type: string) {
        this.type = type;
    }
    draw() {
        if (!zonesVisible) return;
        if(this.img)
        ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            tileWidth,
            tileHeight
        );
        this.checkHover();
    }
}
