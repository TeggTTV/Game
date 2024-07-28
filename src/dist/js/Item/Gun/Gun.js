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
class Gun extends Item {
    constructor(owner, name, gunType, gunOptions, imgPath) {
        super(owner, name, imgPath);
        this.shotFirstBullet = false;
        this.name = name;
        this.type = gunType;
        this.gunOptions = gunOptions;
        this.shotFirstBullet = false;
        this.firing = false;
        this.fireTimer = 0;
        this.img = new Image();
        this.img.src = imgPath;
        this.tipOfGun = new Vector(0, 0);
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    draw() {
        ctx.save();
        let direction = new Vector(mouse.x + camera.x - this.owner.x - this.owner.width / 2, mouse.y + camera.y - this.owner.y - this.owner.height / 2).normalize();
        ctx.translate(this.owner.x +
            this.owner.width / 2 +
            (direction.x * this.owner.width) / 2, this.owner.y +
            this.owner.height / 2 +
            (direction.y * this.owner.height) / 2);
        ctx.rotate(direction.angle());
        ctx.drawImage(this.img, 0, 0);
        ctx.restore();
        let tipOfGun = new Vector(this.owner.x +
            this.owner.width / 2 +
            this.img.width * Math.cos(direction.angle()), this.owner.y +
            this.owner.height / 2 +
            this.img.width * Math.sin(direction.angle()));
        this.tipOfGun = tipOfGun;
    }
    calculateInaccuracy(direction, inaccuracy) {
        let angle = Math.atan2(direction.y, direction.x);
        let inaccuracyAngle = Math.random() * inaccuracy - inaccuracy / 2;
        let newAngle = angle + inaccuracyAngle;
        return new Vector(Math.cos(newAngle), Math.sin(newAngle));
    }
    shoot(mouseX, mouseY) {
        return __awaiter(this, void 0, void 0, function* () {
            let roundsPerMillsec = 1 / (this.gunOptions.roundsPerMinute / 60);
            let direction = new Vector(mouseX - this.owner.x - this.owner.width / 2, mouseY - this.owner.y - this.owner.height / 2);
            if (this.gunOptions.inaccuracy !== 0) {
                direction = this.calculateInaccuracy(direction, this.gunOptions.inaccuracy);
            }
            else {
                direction = direction.normalize();
            }
            let bullet = new Bullet(this.owner, 10, this.gunOptions.velocity, direction, this.tipOfGun, 5, "assets/images/bullet.png");
            if (!this.shotFirstBullet && !this.firing) {
                entities.push(bullet);
                yield wait(roundsPerMillsec);
                this.shotFirstBullet = true;
            }
            else if (this.shotFirstBullet && this.type !== GunType.SemiAuto) {
                this.firing = true;
                this.fireTimer += deltaTime;
                if (this.fireTimer >= roundsPerMillsec) {
                    entities.push(bullet);
                    this.fireTimer = 0;
                }
            }
        });
    }
}
//# sourceMappingURL=Gun.js.map