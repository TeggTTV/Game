class Bullet {
    owner: Entity;
    damage: number;
    speed: number;
    direction: Vector;
    position: Vector;
    radius: number;
    imgPath: string;
    img: HTMLImageElement;
    constructor(
        owner: Entity,
        damage: number,
        speed: number,
        direction: Vector,
        position: Vector,
        radius: number,
        imgPath: string
    ) {
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
    update(deltaTime: number) {
        this.position.x += this.direction.x * this.speed * deltaTime;
        this.position.y += this.direction.y * this.speed * deltaTime;

        entities.forEach((entity: Entity) => {
            entity.handleProjectileCollision(this);            
        });
    }
    delete() {
        let index = projectiles.indexOf(this);
        projectiles.splice(index, 1);
    }
    async draw() {
        let rotation = Math.atan2(this.direction.y, this.direction.x);
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(rotation);
        ctx.drawImage(this.img, 0, -2);
        ctx.restore();
    }
    colCheck(pos: Thing) {
        let dir = colCheck({
            position: new Vector(this.position.x + this.img.width / 2, this.position.y + this.img.height / 2),
            size: new Vector(this.img.width, this.img.height)
        }, pos);
        if (dir) {
            this.delete();
        }
    }
}
