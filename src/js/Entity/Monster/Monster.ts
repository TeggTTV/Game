class Monster extends Entity {
    constructor(x: number, y: number, image: CanvasImageSource) {
        super(x, y, image);

        this.vel = {
            x: 0,
            y: 0,
        };
        this.acceleration = {
            x: 4,
            y: 4,
        };
    }
    draw() {
        // until we have a monster image, we'll use a red square
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
    }
    update(deltaTime: number) {
        // random movement
        if (Math.random() < 0.02) {
            this.vel.x = (Math.random() - 0.5) * 20;
            this.vel.y = (Math.random() - 0.5) * 20;
        }

        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.x += (this.vel.x * deltaTime) / 100;
        this.y += (this.vel.y * deltaTime) / 100;    
    }
}
