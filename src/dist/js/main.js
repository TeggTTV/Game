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
    },
    drops: null,
});
let map = new TileMap(60, 34);
let camera = new Camera(new Vector(player.position.x, player.position.y), new Vector(width, height));
let testEnemy = new Monster(new Vector(10 * tileWidth, 10 * tileHeight), new Vector(tileWidth, tileHeight), {
    imgPath: "assets/images/red.png",
    customs: new EntityCustoms(20, 20, 10),
    drops: new EntityDrops([
        {
            chance: 1,
            item: new Gun(null, "AK-47", GunType.FullAuto, {
                imgPath: BaseAK47.imgPath,
                customs: new GunCustoms(1200, 100, 0.01, 10, 0, 2, 30, 90, false, 10, 1, 5),
            }, GunLores["AK-47"]),
        },
    ]),
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
            customs: new GunCustoms(1200, 100, 0.1, 10, 0, 2, 30, 90, false, 10, 1, 5),
        }, GunLores["AK-47"]));
        droppedItems.push(new DroppedItem(new Vector(10 * tileWidth, 7 * tileHeight), new Vector(-1, -1), {
            imgPath: "assets/images/guns/Beretta M9 2D.png",
            customs: {
                health: null,
                maxHealth: null,
                speed: null,
            },
            drops: null,
        }, new Gun(null, "M9", GunType.SemiAuto, {
            imgPath: BaseM9.imgPath,
            customs: new GunCustoms(2000, 100, 0.01, 10, 0, 2, 9, 40, false, 10, 1, 5),
        }, GunLores["Beretta M9"]), true));
        game = new Game();
        window.requestAnimationFrame(render);
    });
}
let lastTime = 0;
let deltaTime = 0;
function render() {
    var _a;
    let currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);
    map.draw();
    droppedItems.forEach((droppedItem) => {
        droppedItem.draw();
        droppedItem.update();
        let playerColDroppedItem = player.colCheck(droppedItem);
        if (playerColDroppedItem) {
            player.activPickupHint = playerColDroppedItem;
        }
        else if (!playerColDroppedItem && player.activPickupHint.original instanceof Entity && !player.colCheck(player.activPickupHint.original)) {
            player.activPickupHint = { hint: null, original: null };
        }
    });
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
    hoverHints.forEach((hoverHint) => {
        hoverHint.draw();
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
            player.holding.gunOptions.customs.reserveAmmo + " / caliber=" + player.holding.gunLore.caliber, 10, 60);
        if (player.holding.gunOptions.customs.reloading) {
            ctx.fillStyle = "red";
            ctx.fillText("Reloading", 10, 90);
            ctx.fillStyle = "black";
        }
    }
    let slotTxt = "";
    for (let slot of player.inventory.hotbar.slots) {
        if (slot) {
            slotTxt += ((_a = slot.item) === null || _a === void 0 ? void 0 : _a.name) + " | ";
        }
    }
    ctx.fillText(slotTxt, 10, 120);
    window.requestAnimationFrame(render);
}
//# sourceMappingURL=main.js.map