class PickupHint extends Hint {
    entity: Entity;

    constructor(item: Entity, descriptionArr: string[], size: number) {
        super(descriptionArr, size);
        this.descriptionArr = descriptionArr;
        this.size = size;

        this.entity = item;


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
        let margin = 10;
        let first = this.descriptions[0];

        let h = first.height * this.descriptionArr.length;

        let maxWidth = Math.max(...this.descriptions.map((d) => d.width));

        let background = {
            x: this.entity.position.x - this.entity.size.x - margin,
            y: this.entity.position.y - margin*2 - h - margin,
            width: maxWidth,
            height: h,
        };

        // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        // ctx.fillRect(
        //     camera.position.x + background.x,
        //     camera.position.y + background.y,
        //     background.width + margin * 2,
        //     background.height + margin * 2
        // );

        ctx.fillStyle = "black";
        // add shadow
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                background.x + margin + 2,
                background.y + margin + (i * first.height) + (first.height) + 2
            );
        }
        // add text
        ctx.fillStyle = "white";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                background.x + margin,
                background.y + margin + (i * first.height) + (first.height)
            );
        }
    }
}
