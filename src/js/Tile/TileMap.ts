class TileMap {
    sizeX: number;
    sizeY: number;
    tiles: Tile[];
    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.tiles = [];
    }

    addTile(tile: Tile) {
        this.tiles.push(tile);
    }

    draw() {
        this.tiles.forEach((tile) => tile.draw());
    }
    async loadMap(mapPath: string, tileSetPath: string) {
        // fetch map
        let response = await fetch(mapPath);
        let map = await response.json();
        let images: any = await ImageLoader.tileSheetToImages(
            tileSetPath,
            map.tilewidth,
            map.tileheight,
            5,
            13
        );

        // convert map data into a 2d array
        // layers[0] is grass
        // layers[1] is water map

        let zones = [];
        for (let i = 0; i < map.layers.length; i++) {
            let tempArr = [];
            for (let j = 0; j < map.layers[i].data.length; j += map.width) {
                tempArr.push(map.layers[i].data.slice(j, j + map.width));
            }
            zones.push({name: map.layers[i].name, data: tempArr});
        }

        let grassZone = zones[0];

        for (let i = 0; i < grassZone.data.length; i++) {
            for (let j = 0; j < grassZone.data[i].length; j++) {
                if (images[grassZone.data[i][j] - 1] === undefined) continue;
                let tile = new Tile(
                    j * tileWidth,
                    i * tileHeight,
                    images[grassZone.data[i][j] - 1]
                );
                // if (Math.random() > 0.9)
                //     tile.setBarrier(new Barrier(j * tileWidth, i * tileHeight));
                this.addTile(tile);
            }
        }

        let waterZone = zones[1];

        for (let i = 0; i < waterZone.data.length; i++) {
            for (let j = 0; j < waterZone.data[i].length; j++) {
                if (images[waterZone.data[i][j] - 1] === undefined) continue;
                let tile = new TileZone(j*tileWidth, i*tileHeight, images[waterZone.data[i][j] - 1]);
                tile.setType("water");
                this.addTile(tile);
            }
        }

        // for(let i = 0; i < map.length; i++) {

        // }
    }
}
