"use strict";
class Monster extends Entity {
    constructor(position, size, options) {
        super(position, size, options);
        this.position = position;
        this.size = size;
        this.options = options;
        if (options.customs.health &&
            options.customs.maxHealth &&
            options.customs.speed) {
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
            this.checkDrops();
            this.delete();
        }
        this.pathfind(player.position);
    }
    pathfind(location) {
        let direction = new Vector(location.x - this.position.x, location.y - this.position.y).normalize();
        this.vel = this.vel.add(Vector.mul(direction, this.acceleration));
    }
    drop(item) {
        let newDroppedItem = new DroppedItem(new Vector(this.position.x + this.size.x / 2 - 15, this.position.y + this.size.y / 2 - 15), new Vector(30, 30), {
            customs: {
                health: 0,
                maxHealth: 0,
                speed: 0,
            },
            drops: null,
            imgPath: "assets/images/yellow.png",
        }, item);
        droppedItems.push(newDroppedItem);
    }
    checkDrops() {
        if (this.options.drops) {
            if (this.options.drops.possibleDrops.length === 1) {
                this.drop(this.options.drops.possibleDrops[0].item);
                return;
            }
            for (let drop of this.options.drops.possibleDrops) {
                let random = Math.random() * drop.chance;
                console.log(random);
            }
        }
    }
    delete() {
        let index = entities.indexOf(this);
        entities.splice(index, 1);
    }
}
//# sourceMappingURL=Monster.js.map