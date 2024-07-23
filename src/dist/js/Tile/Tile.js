"use strict";
class Tile {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
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
        ctx.strokeRect(this.x, this.y, tileWidth, tileHeight);
        ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
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
        if (this.x + tileWidth - camera.x > 0 &&
            this.x - camera.x < camera.width &&
            this.y + tileHeight - camera.y > 0 &&
            this.y - camera.y < camera.height) {
            let cameraX = this.x - camera.x;
            let cameraY = this.y - camera.y;
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
    constructor(x, y, img) {
        super(x, y, img);
        this.hoverHint = new HoverHint(["Zone"], 20, 0.2);
        this.type = null;
    }
    setType(type) {
        this.type = type;
    }
    draw() {
        if (!zonesVisible)
            return;
        ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        this.checkHover();
    }
}
//# sourceMappingURL=Tile.js.map