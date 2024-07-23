let imgLoad = new ImageLoader();
let map = new GameMap(new Vector(10, 10));
let player = new Player(new Vector(0, 0));
async function init() {
    let grassImg = await imgLoad.loadImage("grass", "assets/images/grass.png");
    let grassWithGrassImg = await imgLoad.loadImage(
        "grass",
        "assets/images/grass with grass.png"
    );
    let treeImg = await imgLoad.loadImage("tree", "assets/images/tree.png");

    map.setPosition(new Vector(width / 2, height / 2 - 250));
    player.pos = new Vector(width / 2, height / 2);
    let layer0 = map.addLayer();

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grass = new Tile(layer0, new Vector(i, j), {
                width: 128,
                height: 128,
                image: grassImg,
            });
            let tree = new Tile(layer0, new Vector(i, j), {
                width: 128,
                height: 256,
                image: treeImg,
            });
            let grassWithGrass = new Tile(layer0, new Vector(i, j), {
                width: 128,
                height: 128,
                image: grassWithGrassImg,
            });

            if (Math.random() > 0.2) {
                layer0.addTile(grass);
            } else if (Math.random() > 0.3) {
                layer0.addTile(grassWithGrass);
            } else layer0.addTile(tree);
        }
    }

    render();
}

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, width, height);
    map.draw();
    player.draw();
    player.update();
    // ctx.fillRect(width / 2, height / 2, 3, 3);
}
