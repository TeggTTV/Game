"use strict";
class Monster extends Entity {
    constructor(x, y, image) {
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
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
    }
    update(deltaTime) {
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
//# sourceMappingURL=Monster.js.map