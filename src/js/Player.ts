class Player {
    x: number;
    y: number;
    width: number;
    height: number;

    imgLoader: ImageLoader;
    img: CanvasImageSource;

    maxSpeed: number;

    vel: {
        x: number;
        y: number;
    };

    acceleration: {
        x: number;
        y: number;
    };

    items: Item[];
    holding: Item | Gun | undefined;

    tilePlacement: TilePlacement;
    placingTile: boolean;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.width = tileWidth;
        this.height = tileHeight;
        // this.locationPerecentX = this.x / width;
        // this.locationPerecentY = this.y / height;

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
    async init() {
        await this.imgLoader.loadImage("Player", "assets/images/red.png");
        // this.img = this.imgLoader.getImage("Player");
    }
    equip(item: Item) {
        this.items.push(item);
    }
    draw() {
        // ctx.drawImage(this.img, this.x, this.y, tileWidth, tileHeight);
        ctx.fillRect(this.x, this.y, tileWidth, tileHeight);
        if(this.holding instanceof Gun) {
            this.holding.draw();
        }
    }
    update(deltaTime: number) {
        this.checkKeys();
        this.checkMouse();
        this.vel.x *= 0.9;
        this.vel.y *= 0.9;
        this.x += this.vel.x * deltaTime;
        this.y += this.vel.y * deltaTime;

        if (this.placingTile) {
        }
    }
    colCheck(tile: Tile) {
        if (tile instanceof TileZone) {
            // check type of tile
            let dir = colCheck(this, tile, false);
            if (tile instanceof TileZone) {
                if (dir !== null)
                    switch (tile.type) {
                        case "water":
                            // if player collides with water, player speed is reduced
                            this.vel.x *= 0.9;
                            this.vel.y *= 0.9;
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
    resizeEvent(ratioX: number, ratioY: number) {
        // this.x = this.locationPerecentX * map.sizeX * tileWidth;
        // this.y = this.locationPerecentY * map.sizeY * tileHeight;
        this.x *= ratioX;
        this.y *= ratioY;
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
