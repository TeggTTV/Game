class Camera {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        console.log(this.width, this.height);
        
    }
    update(player: Player) {
        this.x = player.x - this.width / 2;
        this.y = player.y - this.height / 2;

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x > map.sizeX * tileWidth - this.width) {
            this.x = map.sizeX * tileWidth - this.width;
        }
        if (this.y > map.sizeY * tileHeight - this.height) {
            this.y = map.sizeY * tileHeight - this.height;
        }
    }
    resizeEvent() {
        this.width = width;
        this.height = height;
    }
}