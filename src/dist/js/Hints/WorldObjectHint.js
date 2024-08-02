"use strict";
class WorldObjectHint extends Hint {
    constructor(hint, tile) {
        super(hint, 15);
        this.tile = tile;
        this.tile = tile;
        this.descriptions = [];
        for (let i = 0; i < hint.length; i++) {
            ctx.font = this.size + "px Arial";
            let w = ctx.measureText(hint[i].text).width;
            let h = ctx.measureText(hint[i].text).actualBoundingBoxAscent +
                ctx.measureText(hint[i].text).actualBoundingBoxDescent;
            this.descriptions.push({
                text: hint[i].text,
                width: w,
                height: h,
            });
        }
    }
    draw() {
        let first = this.descriptions[0];
        let h = first.height * this.descriptionArr.length;
        ctx.fillStyle = "black";
        ctx.font = this.size + "px Arial";
        ctx.textAlign = "left";
        for (let i = 0; i < this.descriptions.length; i++) {
            if (this.descriptionArr[i].centered) {
                ctx.textAlign = "center";
                ctx.fillText(this.descriptions[i].text, this.tile.position.x + this.tile.size.x / 2 + 2, this.tile.position.y -
                    h +
                    i * first.height +
                    first.height * 2 +
                    this.tile.size.y / 2 +
                    2);
            }
            else {
                ctx.fillText(this.descriptions[i].text, this.tile.position.x -
                    first.width / 2 +
                    this.tile.size.x / 2 +
                    2, this.tile.position.y -
                    h +
                    i * first.height +
                    first.height * 2 +
                    this.tile.size.y / 2 +
                    2);
            }
        }
        ctx.fillStyle = "white";
        ctx.font = this.size + "px Arial";
        ctx.textAlign = "left";
        for (let i = 0; i < this.descriptions.length; i++) {
            if (this.descriptionArr[i].centered) {
                ctx.textAlign = "center";
                ctx.fillText(this.descriptions[i].text, this.tile.position.x + this.tile.size.x / 2, this.tile.position.y -
                    h +
                    i * first.height +
                    first.height * 2 +
                    this.tile.size.y / 2);
            }
            else {
                ctx.fillText(this.descriptions[i].text, this.tile.position.x -
                    first.width / 2 +
                    this.tile.size.x / 2, this.tile.position.y -
                    h +
                    i * first.height +
                    first.height * 2 +
                    this.tile.size.y / 2);
            }
        }
    }
}
//# sourceMappingURL=WorldObjectHint.js.map