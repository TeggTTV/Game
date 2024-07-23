class Entity {
    x: number;
    y: number;
    image: CanvasImageSource;
    vel: {x: number, y: number};
    acceleration: {x: number, y: number};
    constructor(x: number, y: number, image: CanvasImageSource) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.vel = {x:0,y:0};
        this.acceleration = {x:0,y:0};
    }
    colCheck(pos: Vector) {
        let dir = colCheck(this, pos);
        if (dir === "l" || dir === "r") {
            this.vel.x = 0;
        } else if (dir === "b" || dir === "t") {
            this.vel.y = 0;
        }
    }
}
