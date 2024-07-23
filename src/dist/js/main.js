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
let player = new Player(5 * tileWidth, 5 * tileHeight);
let map = new TileMap(tilesPerRow * 2, tilesPerColumn * 2);
let camera = new Camera(player.x, player.y);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        for (let r of resolutions) {
            if (r.width < window.innerWidth && r.width > res.width)
                res = r;
        }
        canvas.width = width;
        canvas.height = height;
        tileWidth = width / tilesPerRow;
        tileHeight = height / tilesPerColumn;
        yield player.init();
        yield map.loadMap("Other/Maps/Map1.json", "assets/images/asesprite/tileset.png");
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
    ctx.translate(-camera.x, -camera.y);
    map.draw();
    entities.forEach((entity) => {
        entity.draw();
    });
    player.draw();
    player.update(deltaTime);
    camera.update(player);
    entities.forEach((entity) => {
        entity.update(deltaTime);
    });
    for (let i = 0; i < map.tiles.length; i++) {
        if (map.tiles[i] instanceof TileZone) {
            player.colCheck(map.tiles[i]);
        }
        map.tiles[i].update();
        map.tiles[i].drawHoverHint();
    }
    ctx.translate(camera.x, camera.y);
    ctx.restore();
    camera.width = canvas.width;
    camera.height = canvas.height;
    window.requestAnimationFrame(render);
}
//# sourceMappingURL=main.js.map