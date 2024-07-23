let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let game: Game;

let res = { width: 0, height: 0 };

let imgLoad = new ImageLoader();
let player = new Player(5 * tileWidth, 5 * tileHeight);
let map = new TileMap(tilesPerRow * 2, tilesPerColumn * 2);

let camera = new Camera(player.x, player.y);

async function init() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (let r of resolutions) {
        if (r.width < window.innerWidth && r.width > res.width) res = r;
    }

    canvas.width = width;
    canvas.height = height;
    // canvas.width = res.width;
    // canvas.height = res.height;

    // width = res.width;
    // height = res.height;

    tileWidth = width / tilesPerRow;
    tileHeight = height / tilesPerColumn;

    await player.init();
    await map.loadMap(
        "Other/Maps/Map1.json",
        "assets/images/asesprite/tileset.png"
    );

    game = new Game();

    window.requestAnimationFrame(render);
}

let lastTime: number = 0;
let deltaTime: number = 0;

function render() {
    let currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // draw map
    map.draw();

    // draw al entities
    entities.forEach((entity: any) => {
        entity.draw();
    });

    // player drawn last
    player.draw();
    player.update(deltaTime);

    // update camera to follow player
    camera.update(player);

    // update all entities
    entities.forEach((entity: any) => {
        entity.update(deltaTime);
    });

    for (let i = 0; i < map.tiles.length; i++) {
        // Check if mouse is hovering over a tile
        // player.colCheck(map.tiles[i]);

        if (map.tiles[i] instanceof TileZone) {
            player.colCheck(map.tiles[i]);
        }

        // update all tiles
        map.tiles[i].update();
        map.tiles[i].drawHoverHint();
    }

    ctx.translate(camera.x, camera.y);
    ctx.restore();

    camera.width = canvas.width;
    camera.height = canvas.height;

    // lastCanvasWidth = canvas.width;
    // lastCanvasHeight = canvas.height;

    window.requestAnimationFrame(render);
}
