"use strict";
class Tile {
    constructor(position, img) {
        this.position = position;
        this.img = img;
        this.hoverHint = undefined;
        this.firstHover = false;
        this.hovering = false;
        this.immovable = false;
        this.barrier = false;
    }
    setBarrier(barrier) {
        this.barrier = barrier;
    }
    draw() {
        ctx.drawImage(this.img, this.position.x, this.position.y, tileWidth, tileHeight);
        this.checkHover();
    }
    update() {
    }
    drawHoverHint() {
        if (this.hovering && this.hoverHint !== undefined) {
            this.hoverHint.draw();
        }
        else if (this.hovering === false && this.hoverHint !== undefined) {
            this.hoverHint.timerStarted = false;
            this.hoverHint.canDraw = false;
        }
    }
    checkHover() {
        if (this.position.x + tileWidth - camera.position.x > 0 &&
            this.position.x - camera.position.x < camera.size.x &&
            this.position.y + tileHeight - camera.position.y > 0 &&
            this.position.y - camera.position.y < camera.size.y) {
            let cameraX = this.position.x - camera.position.x;
            let cameraY = this.position.y - camera.position.y;
            if (mouse.x >= cameraX &&
                mouse.x < cameraX + tileWidth &&
                mouse.y >= cameraY &&
                mouse.y < cameraY + tileHeight) {
                if (!this.firstHover) {
                    this.firstHover = true;
                    if (this.hoverHint !== undefined)
                        this.hoverHint.onHover();
                }
                this.hovering = true;
            }
            else {
                this.hovering = false;
                this.firstHover = false;
            }
        }
    }
    addHoverHint(hint) {
        this.hoverHint = hint;
    }
}
class TileZone extends Tile {
    constructor(position, img) {
        super(position, img);
        this.hoverHint = new HoverHint(["Zone"], 20, 0.2);
        this.type = null;
    }
    setType(type) {
        this.type = type;
    }
    draw() {
        if (!zonesVisible)
            return;
        ctx.drawImage(this.img, this.position.x, this.position.y, tileWidth, tileHeight);
        this.checkHover();
    }
}
//# sourceMappingURL=Tile.js.map