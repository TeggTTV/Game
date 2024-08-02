class HoverHint extends Hint {
    delay: number;
    canDraw: boolean;
    timerStarted: boolean;
    constructor(
        descriptionArr: {
            text: string;
            centered: boolean;
        }[],
        size: number,
        delay: number = 0
    ) {
        super(descriptionArr, size);
        this.descriptionArr = descriptionArr;
        this.descriptions = [];

        for (let i = 0; i < descriptionArr.length; i++) {
            ctx.font = this.size + "px Arial";
            let w = ctx.measureText(descriptionArr[i].text).width;
            let h =
                ctx.measureText(descriptionArr[i].text)
                    .actualBoundingBoxAscent +
                ctx.measureText(descriptionArr[i].text)
                    .actualBoundingBoxDescent;
            this.descriptions.push({
                text: descriptionArr[i].text,
                width: w,
                height: h,
            });
        }
        this.size = size;
        this.delay = delay;
        this.canDraw = false;
        this.timerStarted = false;
        if (delay === 0) this.canDraw = true;
    }
    onHover() {
        if (this.delay > 0 && !this.timerStarted) {
            new Timer(0, this.delay, this.delay, true, null, () => {
                this.canDraw = true;
            });
            this.timerStarted = true;
        }
    }
    draw() {
        if (!this.canDraw) return;

        let margin = 10;
        let first = this.descriptions[0];

        let h = first.height * this.descriptionArr.length;

        let maxWidth = Math.max(...this.descriptions.map((d) => d.width));

        let background = {
            x: mouse.x,
            y: mouse.y - margin,
            width: maxWidth,
            height: h,
        };

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(
            camera.position.x + background.x,
            camera.position.y + background.y,
            background.width + margin * 2,
            background.height + margin * 2
        );

        ctx.fillStyle = "white";
        ctx.font = this.size + "px Arial";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                camera.position.x + mouse.x + margin,
                camera.position.y +
                    mouse.y +
                    this.descriptions[i].height +
                    i * this.descriptions[i].height
            );
        }
    }
}
