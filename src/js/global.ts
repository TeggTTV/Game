let width: number = window.innerWidth;
let height: number = window.innerHeight;
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

const zonesVisible: boolean = true;

const entities: any = [];

// let resolutions: any = [];
let resolutions: any = [
    { width: 1920, height: 1080 },
    { width: 1680, height: 1050 },
    { width: 1600, height: 1024 },
    { width: 1600, height: 900 },
    { width: 1440, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1360, height: 768 },
    { width: 1280, height: 1024 },
    { width: 1280, height: 960 },
    { width: 1280, height: 800 },
    { width: 1280, height: 768 },
    { width: 1280, height: 720 },
    { width: 1176, height: 664 },
    { width: 1152, height: 864 },
    { width: 1024, height: 768 },
    { width: 800, height: 600 },
];

function resize() {
    res = { width: 0, height: 0 };

    for (let r of resolutions) {
        if (r.width < window.innerWidth && r.width > res.width) res = r;
    }

    canvas.width = res.width;
    canvas.height = res.height;
    width = res.width;
    height = res.height;

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
