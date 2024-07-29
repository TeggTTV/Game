"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Bullet {
    constructor(owner, damage, speed, direction, position, radius, imgPath) {
        this.owner = owner;
        this.damage = damage;
        this.speed = speed;
        this.direction = direction;
        this.position = position;
        this.radius = radius;
        this.imgPath = imgPath;
        this.img = new Image();
        this.img.src = this.imgPath;
    }
    update(deltaTime) {
        this.position.x += this.direction.x * this.speed * deltaTime;
        this.position.y += this.direction.y * this.speed * deltaTime;
        entities.forEach((entity) => {
            entity.handleProjectileCollision(this);
        });
    }
    delete() {
        let index = projectiles.indexOf(this);
        projectiles.splice(index, 1);
    }
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            let rotation = Math.atan2(this.direction.y, this.direction.x);
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(rotation);
            ctx.drawImage(this.img, 0, -2);
            ctx.restore();
        });
    }
}
//# sourceMappingURL=Bullet.js.map