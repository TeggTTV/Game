class Player {
    position: Vector;
    size: Vector;

    imgLoader: ImageLoader;
    image: CanvasImageSource;

    maxSpeed: number;

    vel: Vector;

    acceleration: Vector;

    holding: Item | Gun | null;

    tilePlacement: TilePlacement;
    placingTile: boolean;

    health: number;
    maxHealth: number;

    options: EntityOptions;

    hovering: DroppedItem | null;
    activPickupHint: PickupHint | null;

    inventory: Inventory;
    hotbar: Hotbar;

    constructor(position: Vector, options: EntityOptions) {
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
        this.activPickupHint = null;

        this.inventory = new Inventory({
            maxSize: 50,
            size: 20,
        });

        this.hotbar = new Hotbar();
    }
    async init() {
        await this.imgLoader.loadImage("Player", "assets/images/red.png");
        // this.img = this.imgLoader.getImage("Player");
    }
    equip(item: Item) {
        this.inventory.add(item);
    }
    draw() {
        // ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
        if (this.holding instanceof Gun) {
            this.holding.draw();
        }

        if (this.activPickupHint) {
            this.activPickupHint.draw();
        }
    }
    update(deltaTime: number) {
        this.checkKeys();
        this.checkMouse();
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));

        // if (this.placingTile) {
        // }
    }
    colCheck(obj: Entity | Tile) {
        if (obj instanceof Tile) {
            if (obj instanceof TileZone) {
                // check type of tile
                if (obj instanceof TileZone) {
                    switch (obj.type) {
                        case "water":
                            // if player collides with water, player speed is reduced
                            var dir = colCheck(this, obj, false);
                            if (dir) {
                                this.vel.x *= 0.9;
                                this.vel.y *= 0.9;
                            }
                            break;
                        case "barrier":
                            // if player collides with barrier, player is stopped
                            var dir = colCheck(this, obj, true);

                            break;
                        default:
                            break;
                    }
                }
            } else {
                let dir = colCheck(this, obj, true);
                if (dir === "l" || dir === "r") {
                    this.vel.x = 0;
                } else if (dir === "b" || dir === "t") {
                    this.vel.y = 0;
                }
            }
        } else if (obj instanceof Entity) {
            if (obj instanceof DroppedItem) {
                // let anyCollisions = false;
                if (colCheck(this, obj, false)) {
                    // anyCollisions = true;
                    if (obj.itemData instanceof Gun) {
                        let keyHoverHint = new PickupHint(
                            obj.itemData,
                            obj,
                            ["F to Pickup " + obj.itemData.gunLore.name],
                            20
                        );
                        this.activPickupHint = keyHoverHint;
                        // keyHoverHint.draw();
                        // let inArr = false;
                        // for (let hint of hoverHints) {
                        //     if (hint instanceof PickupHint) {
                        //         if (hint.item.id === obj.itemData.id) {
                        //             inArr = true;
                        //         }
                        //     }
                        // }
                        // if (!inArr) hoverHints.push(keyHoverHint);
                        this.hovering = obj;
                    }
                } else {
                    this.hovering = null;
                }
            }
        }

        if (!this.hovering) {
            // for (let hint of hoverHints) {
            //     if (hint instanceof PickupHint) {
            //         hint.delete();
            //     }
            // }
            this.activPickupHint = null;
        }
    }
    checkMouse() {
        if (mouse.down) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    if (this.holding.gunOptions.customs.ammo > 0)
                        this.holding.shoot(
                            mouse.x + camera.position.x,
                            mouse.y + camera.position.y
                        );
                    else {
                        console.log("Out of ammo");

                        this.holding.reload();
                    }
                }
            }
        } else {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    this.holding.firing = false;
                    this.holding.shotFirstBullet = false;
                }
            }
        }
    }
    checkKeys() {
        if (keys["0"]) {
        }
        if (keys["1"]) {
        }
        if (keys["2"]) {
        }
        if (keys["3"]) {
        }
        if (keys["4"]) {
        }
        if (keys["5"]) {
        }
        if (keys["6"]) {
        }
        if (keys["7"]) {
        }
        if (keys["8"]) {
        }
        if (keys["9"]) {
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
            if (this.hovering instanceof DroppedItem) {
                let item = this.hovering.itemData;
                this.inventory.add(item);
                item.owner = this;

                this.hovering.delete();
                this.hovering = null;
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
                        this.holding.shoot(
                            monster.position.x,
                            monster.position.y
                        );
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
    resizeEvent(ratio: Vector) {
        // this.x = this.locationPerecentX * map.sizeX * tileWidth;
        // this.y = this.locationPerecentY * map.sizeY * tileHeight;
        this.position = Vector.mul(this.position, ratio);
    }
    getItems() {
        return this.inventory.getItems();
    }
    getHolding() {
        return this.holding;
    }
    setHolding(item: Item) {
        this.holding = item;
    }
    dropHolding() {
        this.holding = null;
        // drop logic
    }
    handleProjectileCollision() {}
    delete() {}
}
