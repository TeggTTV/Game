class PickupHint extends Hint {
    entity: Entity;
    item: Item;

    constructor(item: Item, entity: Entity, descriptionArr: string[], size: number) {
        super(descriptionArr, size);
        this.descriptionArr = descriptionArr;
        this.size = size;

        this.item = item;
        this.entity = entity;


        this.descriptions = [];
        for (let i = 0; i < descriptionArr.length; i++) {
            ctx.font = "20px Arial";
            let w = ctx.measureText(descriptionArr[i]).width;
            let h =
                ctx.measureText(descriptionArr[i]).actualBoundingBoxAscent +
                ctx.measureText(descriptionArr[i]).actualBoundingBoxDescent;
            this.descriptions.push({
                text: descriptionArr[i],
                width: w,
                height: h,
            });
        }
    }
    draw() {
        // let margin = 10;
        let first = this.descriptions[0];

        let h = first.height * this.descriptionArr.length;

        // let maxWidth = Math.max(...this.descriptions.map((d) => d.width));

        // let background = {
        //     x: this.entity.position.x - this.entity.size.x - margin,
        //     y: this.entity.position.y - margin*2 - h - margin,
        //     width: maxWidth,
        //     height: h,
        // };

        // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        // ctx.fillRect(
        //     background.x + maxWidth / 2,
        //     background.y,
        //     background.width + margin * 2,
        //     background.height + margin * 2
        // );

        ctx.fillStyle = "black";
        // // add shadow
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                this.entity.position.x - first.width/2 + this.entity.size.x/2 + 2,
                this.entity.position.y - h + (i * first.height) + (first.height) + 2 - 10
            );
        }
        // add text
        ctx.fillStyle = "white";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                this.entity.position.x -
                    first.width / 2 +
                    this.entity.size.x / 2,
                this.entity.position.y - h + i * first.height + first.height - 10
            );
        }
    }
}
