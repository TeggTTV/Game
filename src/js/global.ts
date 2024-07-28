let width: number = 1600;
let height: number = 900;
// let width: number = 16*18;
// let height: number = 9*18;

const mouse: {
    x: number;
    y: number;
    down: number;
} = {
    x: 0,
    y: 0,
    down: 0,
};

const keys: {
    [key: string]: boolean;
} = {};

let tilesPerRow = 16 * 2;
let tilesPerColumn = 9 * 2;

if (tilesPerColumn % 2 !== 0) tilesPerColumn += 1;

let tileWidth: number = width / tilesPerRow;
let tileHeight: number = height / tilesPerColumn;

const zonesVisible: boolean = false;

const entities: any = [];

// let resolutions: any = [];
// let resolut 

function resize() {
    // res = { width: 0, height: 0 };

    // for (let r of resolutions) {
    //     if (r.width < window.innerWidth && r.width > res.width) res = r;
    // }

    // canvas.width = res.width;
    // canvas.height = res.height;
    // width = res.width;
    // height = res.height;

    tileWidth = width / tilesPerRow;
    tileHeight = height / tilesPerColumn;
}

function resizeCamera(camera: Camera) {
    camera.width = width;
    camera.height = height;
}

function dist(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

async function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}