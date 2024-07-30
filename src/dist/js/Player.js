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
class Player {
    constructor(position, options) {
        this.position = position;
        this.size = new Vector(tileWidth, tileHeight);
        this.imgLoader = new ImageLoader();
        this.image = new Image();
        this.maxSpeed = 4;
        this.vel = new Vector(0, 0);
        this.acceleration = new Vector(height * 0.05, height * 0.05);
        this.items = [];
        this.holding = null;
        this.tilePlacement = new TilePlacement();
        this.placingTile = false;
        this.health = 100;
        this.maxHealth = 100;
        this.options = options;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.imgLoader.loadImage("Player", "assets/images/red.png");
        });
    }
    equip(item) {
        this.items.push(item);
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
        if (this.holding instanceof Gun) {
            this.holding.draw();
        }
    }
    update(deltaTime) {
        this.checkKeys();
        this.checkMouse();
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));
        if (this.placingTile) {
        }
    }
    colCheck(obj) {
        if (obj instanceof Tile)
            if (obj instanceof TileZone) {
                if (obj instanceof TileZone) {
                    switch (obj.type) {
                        case "water":
                            var dir = colCheck(this, obj, false);
                            if (dir) {
                                this.vel.x *= 0.9;
                                this.vel.y *= 0.9;
                            }
                            break;
                        case "barrier":
                            var dir = colCheck(this, obj, true);
                            break;
                        default:
                            break;
                    }
                }
            }
            else {
                let dir = colCheck(this, obj, true);
                if (dir === "l" || dir === "r") {
                    this.vel.x = 0;
                }
                else if (dir === "b" || dir === "t") {
                    this.vel.y = 0;
                }
            }
        else if (obj instanceof Entity) {
            if (colCheck(this, obj, false)) {
                console.log(obj);
            }
        }
    }
    checkMouse() {
        if (mouse.down) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    if (this.holding.gunOptions.customs.ammo > 0)
                        this.holding.shoot(mouse.x + camera.position.x, mouse.y + camera.position.y);
                    else {
                        console.log("Out of ammo");
                        this.holding.reload();
                    }
                }
            }
        }
        else {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    this.holding.firing = false;
                    this.holding.shotFirstBullet = false;
                }
            }
        }
    }
    checkKeys() {
        if (keys["w"]) {
            this.vel.y -= this.acceleration.y;
        }
        if (keys["s"]) {
            this.vel.y += this.acceleration.y;
        }
        if (keys["a"]) {
            this.vel.x -= this.acceleration.x;
        }
        if (keys["d"]) {
            this.vel.x += this.acceleration.x;
        }
        if (keys["r"]) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    this.holding.reload();
                }
            }
        }
        if (this.vel.x < 0.1 && this.vel.x > -0.1) {
            this.vel.x = 0;
        }
        if (this.vel.y < 0.1 && this.vel.y > -0.1) {
            this.vel.y = 0;
        }
    }
    resizeEvent(ratio) {
        this.position = Vector.mul(this.position, ratio);
    }
    addItemToInventory(item) {
        this.items.push(item);
    }
    removeItemFromInventory(item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getItems() {
        return this.items;
    }
    getHolding() {
        return this.holding;
    }
    setHolding(item) {
        this.holding = item;
    }
    dropHolding() {
        this.holding = null;
    }
    handleProjectileCollision() { }
    delete() { }
}
//# sourceMappingURL=Player.js.map