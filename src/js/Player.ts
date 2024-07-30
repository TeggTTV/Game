class Player {
    position: Vector;
    width: number;
    height: number;

    imgLoader: ImageLoader;
    img: CanvasImageSource;

    maxSpeed: number;

    vel: Vector;

    acceleration: Vector;

    items: Item[];
    holding: Item | Gun | undefined;

    tilePlacement: TilePlacement;
    placingTile: boolean;

    health: number;
    maxHealth: number;

    constructor(position: Vector) {
        this.position = position;

        this.width = tileWidth;
        this.height = tileHeight;
        // this.locationPerecentX = this.x / width;
        // this.locationPerecentY = this.y / height;

        this.imgLoader = new ImageLoader();
        this.img = new Image();

        this.maxSpeed = 4;

        this.vel = new Vector(0, 0);

        this.acceleration = new Vector(height * 0.05, height * 0.05);

        this.items = [];
        this.holding = undefined;

        this.tilePlacement = new TilePlacement();
        this.placingTile = false;

        this.health = 100;
        this.maxHealth = 100;

    }
    async init() {
        await this.imgLoader.loadImage("Player", "assets/images/red.png");
        // this.img = this.imgLoader.getImage("Player");
    }
    equip(item: Item) {
        this.items.push(item);
    }
    draw() {
        // ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, tileWidth, tileHeight);
        if (this.holding instanceof Gun) {
            this.holding.draw();
        }
    }
    update(deltaTime: number) {
        this.checkKeys();
        this.checkMouse();
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));

        if (this.placingTile) {
        }
    }
    colCheck(tile: Tile) {
        if (tile instanceof TileZone) {
            // check type of tile
            if (tile instanceof TileZone) {
                switch (tile.type) {
                    case "water":
                    // if player collides with water, player speed is reduced
                            var dir = colCheck(this, tile, false);
                            if(dir) {
                                this.vel.x *= 0.9;
                                this.vel.y *= 0.9;
                            }
                            break;
                        case "barrier":
                            // if player collides with barrier, player is stopped
                            var dir = colCheck(this, tile, true);

                            break;
                        default:
                            break;
                    }
            }
        } else {
            let dir = colCheck(this, tile, true);
            if (dir === "l" || dir === "r") {
                this.vel.x = 0;
            } else if (dir === "b" || dir === "t") {
                this.vel.y = 0;
            }
        }
    }
    checkMouse() {
        if (mouse.down) {
            if (this.holding) {
                if (this.holding instanceof Gun) {
                    if(this.holding.gunOptions.customs.ammo > 0)
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
        if(keys["r"]) {
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
    resizeEvent(ratio: Vector) {
        // this.x = this.locationPerecentX * map.sizeX * tileWidth;
        // this.y = this.locationPerecentY * map.sizeY * tileHeight;
        this.position = Vector.mul(this.position, ratio);
    }
    addItemToInventory(item: Item) {
        this.items.push(item);
    }
    removeItemFromInventory(item: Item) {
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
    setHolding(item: Item) {
        this.holding = item;
    }
    dropHolding() {
        this.holding = undefined;
        // drop logic
    }
}
