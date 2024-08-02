let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let game: Game;

let res = { width: 0, height: 0 };

let imgLoad: ImageLoader = new ImageLoader();
let player: Player = new Player(new Vector(5 * tileWidth, 5 * tileHeight), {
    imgPath: "assets/images/blue.png",
    customs: {
        health: 100,
        maxHealth: 100,
        speed: 4,
    },
    drops: null,
});
let map: TileMap = new TileMap(60, 34);

let camera: Camera = new Camera(
    new Vector(player.position.x, player.position.y),
    new Vector(width, height)
);

let testEnemy: Monster = new Monster(
    new Vector(10 * tileWidth, 10 * tileHeight),
    new Vector(tileWidth, tileHeight),
    {
        imgPath: "assets/images/red.png",
        customs: new EntityCustoms(20, 20, 10),
        drops: new EntityDrops([
            {
                chance: 0,
                item: new LootBox([
                    LootBox.randomLootBox([
                        {
                            item: new Ammo(
                                GunLores["AK-47"].caliber,
                                GunLores["AK-47"].caliber,
                                1,
                                "assets/images/green.png"
                            ),
                            quantityRange: [30, 60],
                        },
                    ]),
                ]),
            },
        ]),
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
                    100,
                    0.1,
                    10,
                    0,
                    2,
                    30,
                    false,
                    10,
                    1,
                    5
                ),
            },
            GunLores["AK-47"]
        )
    );

    worldObjects.push(
        new WorldObject(
            new Vector(10 * tileWidth, 10 * tileHeight),
            new Vector(tileWidth, tileHeight),
            {
                imgPath: "assets/images/blue.png",
                solid: true,
            }
        )
    );
    worldObjects.push(
        new WorldObject(
            new Vector(11 * tileWidth, 10 * tileHeight),
            new Vector(tileWidth, tileHeight),
            {
                imgPath: "assets/images/blue.png",
                solid: false,
                hint: [
                    { text: "Harvest Leaves", centered: true },
                    { text: "F", centered: true },
                ],
                onInteract: () => {
                    player.inventory.add(
                        new Item(
                            player,
                            "Leaves",
                            [5, 10],
                            "assets/images/asesprite/leaves.png"
                        )
                    );
                },
            }
        )
    );
    worldObjects.push(
        new Tree(
            new Vector(5 * tileWidth, 5 * tileHeight),
            new Vector(tileWidth, tileHeight),
            { solid: false }
        )
    );

    // for(let i = 0; i < 5; i++) {
    //     for(let j = 0; j < 5; j++) {
    //         worldObjects.push(
    //             new Tree(
    //                 new Vector((i + 15) * tileWidth, (j + 15) * tileHeight),
    //                 new Vector(tileWidth, tileHeight),
    //                 {solid: false}
    //             )
    //         );
    //     }
    // }

    droppedItems.push(
        new DroppedItem(
            new Vector(10 * tileWidth, 7 * tileHeight),
            new Vector(-1, -1),
            {
                imgPath: "assets/images/guns/Beretta M9 2D.png",
                customs: {
                    health: null,
                    maxHealth: null,
                    speed: null,
                },
                drops: null,
            },
            new Gun(
                null,
                "M9",
                GunType.SemiAuto,
                {
                    imgPath: BaseM9.imgPath,
                    customs: new GunCustoms(
                        200,
                        100,
                        0.05,
                        10,
                        0,
                        2,
                        9,
                        false,
                        10,
                        1,
                        5
                    ),
                },
                GunLores["Beretta M9"]
            ),
            true
        )
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
    ctx.translate(-camera.position.x, -camera.position.y);

    // draw map
    map.draw();

    /* ------------------------------------------------------------------------------------------------------------------ */
    /*                                                 draw al entities                                                   */
    /* ------------------------------------------------------------------------------------------------------------------ */
    droppedItems.forEach((droppedItem: DroppedItem) => {
        droppedItem.draw();
        droppedItem.update();

        let playerColDroppedItem = player.colCheck(droppedItem);
        if (playerColDroppedItem) {
            player.activPickupHint = playerColDroppedItem;
        } else if (
            !playerColDroppedItem &&
            player.activPickupHint.original instanceof Entity &&
            !player.colCheck(player.activPickupHint.original)
        ) {
            player.activPickupHint = { hint: null, original: null };
        }
    });

    worldObjects.forEach((worldObject: WorldObject) => {
        worldObject.draw();
        worldObject.update(deltaTime);

        let playerColWorldObject = player.colCheck(worldObject);
        if (playerColWorldObject) {
            player.activPickupHint = playerColWorldObject;
        } else if (
            !playerColWorldObject &&
            player.activPickupHint.original instanceof WorldObject &&
            !player.colCheck(player.activPickupHint.original)
        ) {
            player.activPickupHint = { hint: null, original: null };
        }

        if (worldObject.tile) player.colCheck(worldObject);
    });

    entities.forEach((entity: Entity) => {
        entity.draw();
        entity.update(deltaTime);

        for (let wo of worldObjects) {
            if (wo.options.solid) entity.colCheck(wo);
        }
    });

    projectiles.forEach((projectile: Bullet) => {
        projectile.draw();
        projectile.update(deltaTime);

        for (let wo of worldObjects) {
            if (wo.options.solid) projectile.colCheck(wo);
        }
    });
    damageTexts.forEach((damageText: any) => {
        damageText.draw();
        damageText.update(deltaTime);
    });

    hoverHints.forEach((hoverHint: Hint) => {
        hoverHint.draw();
    });
    // player drawn last
    player.draw();
    player.update(deltaTime);

    // update camera to follow player
    camera.update(player);

    /* ------------------------------------------------------------------------------------------------------------------ */
    /*                                                      Draw Map                                                      */
    /* ------------------------------------------------------------------------------------------------------------------ */

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
    /* ------------------------------------------------------------------------------------------------------------------ */
    /*                                                         UI                                                         */
    /* ------------------------------------------------------------------------------------------------------------------ */
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Health: " + player.health, 10, 30);

    if (player.holding instanceof Gun) {
        ctx.fillText(
            "Ammo: " +
                player.holding.gunOptions.customs.ammo +
                "/" +
                player.inventory.reserveAmmo[player.holding.gunLore.caliber] +
                " / caliber=" +
                player.holding.gunLore.caliber,
            10,
            60
        );
        if (player.holding.gunOptions.customs.reloading) {
            ctx.fillStyle = "red";
            ctx.fillText("Reloading", 10, 90);
            ctx.fillStyle = "black";
        }
    }

    let slotTxt = "";
    for (let slot of player.inventory.hotbar.slots) {
        if (slot) {
            slotTxt += slot.item?.name + " | ";
        }
    }
    ctx.fillText(slotTxt, 10, 120);

    // minimap.draw();
    // minimap.update();

    window.requestAnimationFrame(render);
}
