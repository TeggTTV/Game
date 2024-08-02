class ItemAddedToInventoryHint extends Hint {
    item: Item;
    constructor(item: Item) {
        super(
            [
                {
                    text: `${item.name}!`,
                    centered: false,
                },
            ],
            15
        );
        this.item = item;
        this.descriptions.push({
            text: this.descriptionArr[0].text,
            width: ctx.measureText(this.descriptionArr[0].text).width,
            height: this.size,
        });
    }
    draw() {
        // bottom right of the screen, black text, floats up and looses opacity
        let margin = 10;
        let first = this.descriptions[0];

        let h = first.height * this.descriptionArr.length;

        let maxWidth = Math.max(...this.descriptions.map((d) => d.width));

        let background = {
            x: canvas.width - maxWidth - margin,
            y: canvas.height - margin - h,
            width: maxWidth,
            height: h,
        };

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(
            background.x,
            background.y,
            background.width + margin * 2,
            background.height + margin * 2
        );

        ctx.fillStyle = "black";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                background.x + margin,
                background.y + margin + i * first.height + first.height
            );
        }

        ctx.fillStyle = "white";
        for (let i = 0; i < this.descriptions.length; i++) {
            ctx.fillText(
                this.descriptions[i].text,
                background.x + margin,
                background.y + margin + i * first.height + first.height
            );
        }
    }
}
