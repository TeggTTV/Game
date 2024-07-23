class Animal extends Entity {
    constructor(x, y, image, speed) {
        super(name);
    }
    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }
    colCheck(pos) {
        let dir = colCheck(this, pos);
        if (dir === "l" || dir === "r") {
            this.vel.x = 0;
        } else if (dir === "b" || dir === "t") {
            this.vel.y = 0;
        }
    }
    moveTowardsPlayer(player) {
        if (player.x < this.x) {
            this.vel.x = -this.speed;
        } else if (player.x > this.x) {
            this.vel.x = this.speed;
        }
        if (player.y < this.y) {
            this.vel.y = -this.speed;
        } else if (player.y > this.y) {
            this.vel.y = this.speed;
        }
    }
    moveAwayFromPlayer(player) {
        if (player.x < this.x) {
            this.vel.x = this.speed;
        } else if (player.x > this.x) {
            this.vel.x = -this.speed;
        }
        if (player.y < this.y) {
            this.vel.y = this.speed;
        } else if (player.y > this.y) {
            this.vel.y = -this.speed;
        }
    }
}
