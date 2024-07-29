let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let game: Game;

let res = { width: 0, height: 0 };

let imgLoad: ImageLoader = new ImageLoader();
let player: Player = new Player(new Vector(5 * tileWidth, 5 * tileHeight));
let map: TileMap = new TileMap(60, 34);

let camera: Camera = new Camera(
    new Vector(player.position.x, player.position.y),
    new Vector(width, height)
);

// let minimap = new Minimap();

let testEnemy: Monster = new Monster(
    new Vector(10 * tileWidth, 10 * tileHeight),
    new Vector(tileWidth, tileHeight),
    {
        imgPath: "assets/images/red.png",
        customs: new EntityCustoms(9999, 9999),
    }
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
                imgPath: BaseAK47.imgPath,
                customs: new GunCustoms(
                    1200,
                    1000,
                    100,
                    0.01,
                    10,
                    0,
                    2,
                    30,
                    90,
                    false,
                    10,
                    1,
                    5
                ),
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
    ctx.translate(-camera.position.x, -camera.position.y);

    // draw map
    map.draw();

    // draw al entities
    entities.forEach((entity: any) => {
        entity.draw();
        entity.update(deltaTime);
    });

    projectiles.forEach((projectile: any) => {
        projectile.draw();
        projectile.update(deltaTime);
    });
    damageTexts.forEach((damageText: any) => {
        damageText.draw();
        damageText.update(deltaTime);
    });
    // player drawn last
    player.draw();
    player.update(deltaTime);

    // update camera to follow player
    camera.update(player);

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

    ctx.translate(camera.position.x, camera.position.y);
    ctx.restore();

    camera.size.x = canvas.width;
    camera.size.y = canvas.height;

    // lastCanvasWidth = canvas.width;
    // lastCanvasHeight = canvas.height;

    // ui
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Health: " + player.health, 10, 30);
    if (player.holding instanceof Gun) {
        ctx.fillText(
            "Ammo: " +
                player.holding.gunOptions.customs.ammo +
                "/" +
                player.holding.gunOptions.customs.reserveAmmo,
            10,
            60
        );
        if(player.holding.gunOptions.customs.reloading) {
            ctx.fillStyle = "red";
            ctx.fillText("Reloading", 10, 90);
            ctx.fillStyle = "black";
        }
    }

    // minimap.draw();
    // minimap.update();

    window.requestAnimationFrame(render);
}
