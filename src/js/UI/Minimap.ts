class Minimap {
    minimap: HTMLCanvasElement;
    minimapCtx: CanvasRenderingContext2D;
    zoom: number;
    camera: Camera;
    tileWidth: number;
    tileHeight: number;
    constructor() {
        this.minimap = document.createElement("canvas") as HTMLCanvasElement;
        this.minimap.id = "minimap";
        this.minimap.style.position = "absolute";
        this.minimap.style.right = "0";
        this.minimap.style.top = "0";
        this.minimap.style.border = "1px solid black";
        this.minimap.style.backgroundColor = "white";
        document.body.appendChild(this.minimap);

        this.minimapCtx = this.minimap.getContext(
            "2d"
        ) as CanvasRenderingContext2D;
        this.minimap.width = 200;
        this.minimap.height = 200;

        this.zoom = 1;
        this.camera = new Camera(new Vector(0, 0), new Vector(400, 400));

        this.tileWidth = this.minimap.width / tilesPerRow;
        this.tileHeight = this.minimap.height / tilesPerColumn;
    }
    draw() {
        this.minimapCtx.save();
        this.minimapCtx.scale(this.zoom, this.zoom);
        this.minimapCtx.fillRect(0, 0, this.minimap.width, this.minimap.height);

        this.minimapCtx.translate(
            this.camera.position.x,
            this.camera.position.y
        );

        this.minimapCtx.drawImage(
            canvas,
            this.camera.position.x,
            this.camera.position.y,
            this.minimap.width,
            this.minimap.height,
            0,
            0,
            width,
            height
        );
        entities.forEach((entity: Entity) => {
            this.minimapCtx.fillStyle = "red";
            this.minimapCtx.fillRect(
                entity.position.x,
                entity.position.y,
                entity.size.x,
                entity.size.y
            );
        });
        this.minimapCtx.restore();
    }
    update() {
        // this.camera.position.x = player.position.x - this.minimap.width / 2;
        // this.camera.position.y = player.position.y - this.minimap.height / 2;

        this.camera.position.x = player.position.x - this.minimap.width / 2;
        this.camera.position.y = player.position.y - this.minimap.height / 2;
        // this.camera.size.x = 400;
        // this.camera.size.y = 400;

        // if (this.camera.position.x < 0) {
        //     this.camera.position.x = 0;
        // }
        // if (this.camera.position.y < 0) {
        //     this.camera.position.y = 0;
        // }
    }
}
