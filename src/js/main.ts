let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let game: Game;

let res = { width: 0, height: 0 };

let imgLoad: ImageLoader = new ImageLoader();
let player: Player = new Player(5 * tileWidth, 5 * tileHeight);
let map: TileMap = new TileMap(60, 34);

let camera: Camera = new Camera(player.x, player.y);

let testEnemy: Monster = new Monster(
    10 * tileWidth,
    10 * tileHeight,
    new Image()
);

async function init() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = width;
    canvas.height = height;

    tileWidth = width / tilesPerRow;
    tileHeight = height / tilesPerColumn;

    await player.init();
    await map.loadMap(
        "Other/Maps/Map1.json",
        "assets/images/asesprite/tileset.png"
    );

    entities.push(testEnemy);

    player.equip(
        new Gun(
            player,
            "AK-47",
            GunType.FullAuto,
            {
                roundsPerMinute: 600,
                velocity: 1000,
                range: 100,
                inaccuracy: 0.01,
            },
            "assets/images/guns/AK-47.png"
        )
    );
    player.setHolding(player.items[0]);

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
