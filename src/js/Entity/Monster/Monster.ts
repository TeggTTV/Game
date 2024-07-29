class Monster extends Entity {
    constructor(position: Vector, size: Vector, options: EntityOptions) {
        super(position, size, options);
        this.position = position;
        this.size = size;
        this.options = options;

        this.health = options.customs.maxHealth;

        this.vel = new Vector(0, 0);
        this.acceleration = new Vector(4, 4);
    }
    draw() {
        // until we have a monster image, we'll use a red square
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }
    update(deltaTime: number) {
        this.vel = this.vel.mul(0.9);
        this.position = this.position.add(this.vel.mul(deltaTime));

        if (this.health <= 0) {
            this.delete();
        }
    }
}
