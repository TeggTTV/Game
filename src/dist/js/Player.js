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
        this.holding = null;
        this.tilePlacement = new TilePlacement();
        this.placingTile = false;
        this.health = 100;
        this.maxHealth = 100;
        this.options = options;
        this.hovering = null;
        this.activPickupHint = {
            hint: null,
            original: null,
        };
        this.inventory = new Inventory(this, {
            maxSize: 50,
            size: 20,
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.imgLoader.loadImage("Player", "assets/images/red.png");
        });
    }
    equip(item) {
        console.log(item);
        if (item instanceof Ammo) {
            if (this.inventory.reserveAmmo[item.caliber] > 0) {
                this.inventory.reserveAmmo[item.caliber] += item.quantity;
            }
            else {
                this.inventory.reserveAmmo[item.caliber] = item.quantity;
            }
        }
        else if (item instanceof Gun) {
            this.inventory.hotbar.setSlot(item, item.quantity, this.inventory.hotbar.nextAvailableSlot());
            this.inventory.add(item);
        }
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
        if (this.holding instanceof Gun) {
            this.holding.draw();
        }
        if (this.activPickupHint.hint) {
            this.activPickupHint.hint.draw();
        }
    }
    update(deltaTime) {
        this.checkKeys();
        this.checkMouse();
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));
    }
    colCheck(obj) {
        let collidedWith = false;
        if (obj instanceof Tile) {
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
        }
        else if (obj instanceof Entity) {
            if (collidedWith)
                return;
            if (obj instanceof DroppedItem) {
                if (colCheck(this, obj, false)) {
                    if (obj.autoPickup && obj.itemData instanceof Item) {
                        let item = obj.itemData;
                        this.equip(item);
                        item.owner = this;
                        obj.delete();
                        return;
                    }
                    else if (obj.autoPickup &&
                        obj.itemData instanceof LootBox) {
                        let lootBox = obj.itemData;
                        let items = lootBox.open();
                        for (let item of items) {
                            this.equip(item);
                            item.owner = this;
                        }
                        obj.delete();
                        return;
                    }
                    collidedWith = true;
                    if (obj.itemData instanceof Gun) {
                        return {
                            hint: new PickupHint(obj.itemData, obj, ["F to Pickup " + obj.itemData.gunLore.name], 20),
                            original: obj,
                        };
                    }
                    else if (obj.itemData instanceof LootBox) {
                        if (obj.itemData.items.length === 1)
                            return {
                                hint: new PickupHint(obj.itemData, obj, [
                                    "F to Pickup " +
                                        obj.itemData.items[0].name,
                                ], 20),
                                original: obj,
                            };
                    }
                }
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
        for (let key of Object.keys(keys)) {
            if (parseInt(key)) {
                if (keys[key]) {
                    if (key === "0")
                        this.inventory.hotbar.changeSlot(9);
                    else
                        this.inventory.hotbar.changeSlot(parseInt(key) - 1);
                }
            }
        }
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
        if (keys["f"]) {
            if (this.activPickupHint.hint &&
                this.activPickupHint.original instanceof DroppedItem) {
                if (this.activPickupHint.hint.item instanceof Gun) {
                    let item = this.activPickupHint.hint.item;
                    this.equip(item);
                    item.owner = this;
                    this.activPickupHint.original.delete();
                    this.activPickupHint = { hint: null, original: null };
                }
                else if (this.activPickupHint.hint.item instanceof LootBox) {
                    let lootBox = this.activPickupHint.hint.item;
                    let items = lootBox.open();
                    for (let item of items) {
                        this.equip(item);
                        item.owner = this;
                    }
                    this.activPickupHint.original.delete();
                    this.activPickupHint = { hint: null, original: null };
                }
            }
            keys["f"] = false;
        }
        if (keys["r"]) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    this.holding.reload();
                }
            }
        }
        if (keys[" "]) {
            for (let monster of entities) {
                if (monster instanceof Monster) {
                    if (this.holding instanceof Gun)
                        this.holding.shoot(monster.position.x, monster.position.y);
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
    getItems() {
        return this.inventory.getItems();
    }
    getHolding() {
        return this.holding;
    }
    setHolding(item) {
        this.holding = item;
    }
    dropHolding() {
        if (this.holding) {
            let newDroppedItem = new DroppedItem(this.position, new Vector(30, 30), {
                imgPath: "assets/images/yellow.png",
                customs: {
                    health: null,
                    maxHealth: null,
                    speed: null,
                },
                drops: null,
            }, this.holding, true);
            droppedItems.push(newDroppedItem);
            this.holding = null;
        }
    }
    handleProjectileCollision() { }
    delete() { }
}
//# sourceMappingURL=Player.js.map