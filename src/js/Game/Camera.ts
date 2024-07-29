class Camera {
    position: Vector;
    size: Vector;
    constructor(position: Vector, size: Vector = new Vector(width, height)) {
        this.position = position;
        this.size = size;
        console.log(this.size.x, this.size.y);
        
    }
    update(player: Player) {
        this.position.x = player.position.x - this.size.x / 2;
        this.position.y = player.position.y - this.size.y / 2;

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.x > map.sizeX * tileWidth - this.size.x) {
            this.position.x = map.sizeX * tileWidth - this.size.x;
        }
        if (this.position.y > map.sizeY * tileHeight - this.size.y) {
            this.position.y = map.sizeY * tileHeight - this.size.y;
        }
    }
    resizeEvent() {
        this.size.x = width;
        this.size.y = height;
    }
}