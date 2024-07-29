"use strict";
class Entity {
    constructor(position, size, options) {
        this.position = position;
        this.size = size;
        this.options = options;
        this.image = new Image();
        this.image.src = options.imgPath;
        this.vel = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.health = 1;
        this.maxHealth = 100;
    }
    colCheck(pos) {
        let dir = colCheck(this, pos);
        if (dir === "l" || dir === "r") {
            this.vel.x = 0;
        }
        else if (dir === "b" || dir === "t") {
            this.vel.y = 0;
        }
    }
    handleProjectileCollision(projectile) {
        if (this.position.x < projectile.position.x + projectile.radius &&
            this.position.x + this.size.x > projectile.position.x &&
            this.position.y < projectile.position.y + projectile.radius &&
            this.position.y + this.size.y > projectile.position.y) {
            this.health -= projectile.damage;
            let damageText = new DamageText(this.position.copy().add(new Vector(this.size.x / 4, this.size.y / 2)), projectile.damage);
            damageTexts.push(damageText);
            projectile.delete();
        }
    }
    delete() {
        let index = entities.indexOf(this);
        entities.splice(index, 1);
    }
}
//# sourceMappingURL=Entity.js.map