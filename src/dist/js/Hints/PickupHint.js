"use strict";
class PickupHint extends Hint {
    constructor(item, entity, descriptionArr, size) {
        super(descriptionArr, size);
        this.descriptionArr = descriptionArr;
        this.size = size;
        this.item = item;
        this.entity = entity;
        this.descriptions = [];
        for (let i = 0; i < descriptionArr.length; i++) {
            ctx.font = "20px Arial";
            let w = ctx.measureText(descriptionArr[i]).width;
            let h = ctx.measureText(descriptionArr[i]).actualBoundingBoxAscent +
                ctx.measureText(descriptionArr[i]).actualBoundingBoxDescent;
            this.descriptions.push({
                text: descriptionArr[i],
                width: w,
                height: h,
            });
        }
    }
    draw() {
        let first = this.descriptions[0];
        let h = first.height * this.descriptionArr.length;
        ctx.fillStyle = "black";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(this.descriptions[i].text, this.entity.position.x - first.width / 2 + this.entity.size.x / 2 + 2, this.entity.position.y - h + (i * first.height) + (first.height) + 2 - 10);
        }
        ctx.fillStyle = "white";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(this.descriptions[i].text, this.entity.position.x -
                first.width / 2 +
                this.entity.size.x / 2, this.entity.position.y - h + i * first.height + first.height - 10);
        }
    }
}
//# sourceMappingURL=PickupHint.js.map