"use strict";
class Entity {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.vel = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
    }
    colCheck(pos) {
        let dir = colCheck(this, pos);
        if (dir === "l" || dir === "r") {
            this.vel.x = 0;
        }
        else if (dir === "b" || dir === "t") {
            this.vel.y = 0;
        }
    }
}
//# sourceMappingURL=Entity.js.map