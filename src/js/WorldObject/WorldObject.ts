type WorldOpjectOptions = {
    rotation?: number;
    imgPath?: string;
    solid: boolean;
    hint?: {
        text: string;
        centered: boolean;
    }[];
    onInteract?: () => void;
};

class WorldObject {
    img: HTMLImageElement | null;

    tile: Tile | undefined;

    constructor(
        public position: Vector,
        public size: Vector,
        public options: WorldOpjectOptions
    ) {
        this.position = position;
        this.size = size;
        this.options = options;

        if (this.options.imgPath) {
            this.img = new Image();
            this.img.src = this.options.imgPath;
            this.img.onload = () => {
                this.tile = new Tile(this.position, this.img);
            };
        } else {
            this.img = null;
            this.tile = new Tile(this.position, null);
        }
    }
    draw() {
        if (this.img) {
            ctx.drawImage(
                this.img,
                this.position.x,
                this.position.y,
                this.size.x,
                this.size.y
            );
        }
    }
    update(deltaTime: number) {
        if (this.tile) {
            this.tile.update();
        }
    }
    delete() {
        let index = worldObjects.indexOf(this);
        worldObjects.splice(index, 1);
    }
}
