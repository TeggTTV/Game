"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let canvas;
let ctx;
let game;
let res = { width: 0, height: 0 };
let imgLoad = new ImageLoader();
let player = new Player(new Vector(5 * tileWidth, 5 * tileHeight), {
    imgPath: "assets/images/blue.png",
    customs: {
        health: 100,
        maxHealth: 100,
        speed: 4,
    }
});
let map = new TileMap(60, 34);
let camera = new Camera(new Vector(player.position.x, player.position.y), new Vector(width, height));
let testEnemy = new Monster(new Vector(10 * tileWidth, 10 * tileHeight), new Vector(tileWidth, tileHeight), {
    imgPath: "assets/images/red.png",
    customs: new EntityCustoms(20, 20, 10),
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        tileWidth = width / tilesPerRow;
        tileHeight = height / tilesPerColumn;
        yield player.init();
        yield map.loadMap("Other/Maps/Map1.json", "assets/images/asesprite/tileset.png");
        entities.push(testEnemy);
        player.equip(new Gun(player, "AK-47", GunType.FullAuto, {
            imgPath: BaseAK47.imgPath,
            customs: new GunCustoms(1200, 100, 0.01, 10, 0, 2, 30, 90, false, 10, 1, 5),
        }, GunLores["AK-47"], "assets/images/guns/AK-47.png"));
        player.setHolding(player.items[0]);
        droppedItems.push(new DroppedItem(new Vector(10 * tileWidth, 10 * tileHeight), new Vector(30, 30), {
            imgPath: "assets/images/yellow.png",
            customs: {
                health: null,
                maxHealth: null,
                speed: null,
            }
        }, new Gun(null, "AK-47", GunType.FullAuto, {
            imgPath: BaseAK47.imgPath,
            customs: new GunCustoms(1200, 100, 0.01, 10, 0, 2, 30, 90, false, 10, 1, 5),
        }, GunLores["AK-47"], "assets/images/guns/AK-47.png")));
        game = new Game();
        window.requestAnimationFrame(render);
    });
}
let lastTime = 0;
let deltaTime = 0;
function render() {
    let currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);
    map.draw();
    entities.forEach((entity) => {
        entity.draw();
        entity.update(deltaTime);
    });
    projectiles.forEach((projectile) => {
        projectile.draw();
        projectile.update(deltaTime);
    });
    damageTexts.forEach((damageText) => {
        damageText.draw();
        damageText.update(deltaTime);
    });
    droppedItems.forEach((droppedItem) => {
        droppedItem.draw();
        droppedItem.update();
        player.colCheck(droppedItem);
    });
    player.draw();
    player.update(deltaTime);
    camera.update(player);
    for (let i = 0; i < map.tiles.length; i++) {
        if (map.tiles[i] instanceof TileZone) {
            player.colCheck(map.tiles[i]);
        }
        map.tiles[i].update();
        map.tiles[i].drawHoverHint();
    }
    ctx.translate(camera.position.x, camera.position.y);
    ctx.restore();
    camera.size.x = canvas.width;
    camera.size.y = canvas.height;
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Health: " + player.health, 10, 30);
    if (player.holding instanceof Gun) {
        ctx.fillText("Ammo: " +
            player.holding.gunOptions.customs.ammo +
            "/" +
            player.holding.gunOptions.customs.reserveAmmo, 10, 60);
        if (player.holding.gunOptions.customs.reloading) {
            ctx.fillStyle = "red";
            ctx.fillText("Reloading", 10, 90);
            ctx.fillStyle = "black";
        }
    }
    window.requestAnimationFrame(render);
}
//# sourceMappingURL=main.js.map