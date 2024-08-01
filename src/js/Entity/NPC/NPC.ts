class NPC extends Entity {
    position: Vector;
    image: CanvasImageSource;
    // speed: number;
    constructor(position: Vector, size: Vector, image: CanvasImageSource, options: EntityOptions) {
        super(position, size, options);
        this.position = position;
        this.image = image;

        this.vel = new Vector(0, 0);
        // this.speed = options.speed;
    }
    update() {
        this.position = this.position.add(this.vel);
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    // colCheck(pos: Vector) {
    //     let dir = colCheck(this, pos);
    //     if (dir === "l" || dir === "r") {
    //         this.vel.x = 0;
    //     } else if (dir === "b" || dir === "t") {
    //         this.vel.y = 0;
    //     }
    // }
    // moveTowardsPlayer(player) {
    //     if (player.x < this.x) {
    //         this.vel.x = -this.speed;
    //     } else if (player.x > this.x) {
    //         this.vel.x = this.speed;
    //     }
    //     if (player.y < this.y) {
    //         this.vel.y = -this.speed;
    //     } else if (player.y > this.y) {
    //         this.vel.y = this.speed;
    //     }
    // }
    // moveAwayFromPlayer(player) {
    //     if (player.x < this.x) {
    //         this.vel.x = this.speed;
    //     } else if (player.x > this.x) {
    //         this.vel.x = -this.speed;
    //     }
    //     if (player.y < this.y) {
    //         this.vel.y = this.speed;
    //     } else if (player.y > this.y) {
    //         this.vel.y = -this.speed;
    //     }
    // }
    // moveRandom() {
    //     let rand = Math.floor(Math.random() * 4);
    //     if (rand === 0) {
    //         this.vel.y = -this.speed;
    //     } else if (rand === 1) {
    //         this.vel.y = this.speed;
    //     }
    //     if (rand === 2) {
    //         this.vel.x = -this.speed;
    //     } else if (rand === 3) {
    //         this.vel.x = this.speed;
    //     }
    // }
}