class PickupHint extends Hint {
    entity: Entity;
    item: Item | LootBox;

    constructor(item: Item | LootBox, entity: Entity, descriptionArr: {
        text: string;
        centered: boolean;
    }[], size: number) {
        super(descriptionArr, size);
        this.descriptionArr = descriptionArr;
        this.size = size;

        this.item = item;
        this.entity = entity;


        this.descriptions = [];
        for (let i = 0; i < descriptionArr.length; i++) {
            ctx.font = this.size + "px Arial";
            let w = ctx.measureText(descriptionArr[i].text).width;
            let h =
                ctx.measureText(descriptionArr[i].text).actualBoundingBoxAscent +
                ctx.measureText(descriptionArr[i].text).actualBoundingBoxDescent;
            this.descriptions.push({
                text: descriptionArr[i].text,
                width: w,
                height: h,
            });
        }
    }
    draw() {
        // let margin = 10;
        let first = this.descriptions[0];

        let h = first.height * this.descriptionArr.length;

        ctx.fillStyle = "black";
        ctx.font = this.size + "px Arial";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                this.entity.position.x -
                    first.width / 2 +
                    this.entity.size.x / 2 +
                    2,
                this.entity.position.y -
                    h +
                    i * first.height +
                    first.height +
                    2 -
                    10
            );
        }
        // add text
        ctx.fillStyle = "white";
        ctx.font = this.size + "px Arial";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                this.entity.position.x -
                    first.width / 2 +
                    this.entity.size.x / 2,
                this.entity.position.y -
                    h +
                    i * first.height +
                    first.height -
                    10
            );
        }
    }
}
