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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = tileWidth;
        this.height = tileHeight;
        this.imgLoader = new ImageLoader();
        this.img = new Image();
        this.maxSpeed = 4;
        this.vel = {
            x: 0,
            y: 0,
        };
        this.acceleration = {
            x: height * 0.05,
            y: height * 0.05,
        };
        this.items = [];
        this.holding = undefined;
        this.tilePlacement = new TilePlacement();
        this.placingTile = false;
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
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
        if (this.holding instanceof Gun) {
            this.holding.draw();
        }
    }
    update(deltaTime) {
        this.checkKeys();
        this.checkMouse();
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.x += this.vel.x * deltaTime;
        this.y += this.vel.y * deltaTime;
        if (this.placingTile) {
        }
    }
    colCheck(tile) {
        if (tile instanceof TileZone) {
            let dir = colCheck(this, tile, false);
            if (tile instanceof TileZone) {
                if (dir !== null)
                    switch (tile.type) {
                        case "water":
                            this.vel.x *= 0.9;
                            this.vel.y *= 0.9;
                            break;
                        default:
                            break;
                    }
            }
        }
        else {
            let dir = colCheck(this, tile, true);
            if (dir === "l" || dir === "r") {
                this.vel.x = 0;
            }
            else if (dir === "b" || dir === "t") {
                this.vel.y = 0;
            }
        }
    }
    checkMouse() {
        if (mouse.down) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    this.holding.shoot(mouse.x + camera.x, mouse.y + camera.y);
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
        if (this.vel.x < 0.1 && this.vel.x > -0.1) {
            this.vel.x = 0;
        }
        if (this.vel.y < 0.1 && this.vel.y > -0.1) {
            this.vel.y = 0;
        }
    }
    resizeEvent(ratioX, ratioY) {
        this.x *= ratioX;
        this.y *= ratioY;
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
        this.holding = undefined;
    }
}
//# sourceMappingURL=Player.js.map