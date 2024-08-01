"use strict";
class NPC extends Entity {
    constructor(position, size, image, options) {
        super(position, size, options);
        this.position = position;
        this.image = image;
        this.vel = new Vector(0, 0);
    }
    update() {
        this.position = this.position.add(this.vel);
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
//# sourceMappingURL=NPC.js.map