"use strict";
class Monster extends Entity {
    constructor(position, size, options) {
        super(position, size, options);
        this.position = position;
        this.size = size;
        this.options = options;
        if (options.customs.health && options.customs.maxHealth && options.customs.speed) {
            this.health = options.customs.maxHealth;
            this.vel = new Vector(0, 0);
            this.acceleration = new Vector(options.customs.speed, options.customs.speed);
        }
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update(deltaTime) {
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));
        if (this.health <= 0) {
            this.delete();
        }
        this.pathfind(player.position);
    }
    pathfind(location) {
        let direction = new Vector(location.x - this.position.x, location.y - this.position.y).normalize();
        this.vel = this.vel.add(Vector.mul(direction, this.acceleration));
    }
}
//# sourceMappingURL=Monster.js.map