class ImageLoader {
    images: { [key: string]: HTMLImageElement | HTMLImageElement[] };
    constructor() {
        this.images = {};
    }
    /**
     *
     * @param {string} name The name of the image
     * @param {string} src The source of the image
     * @returns The image if it was loaded successfully, false if it was not
     */
    async loadImage(name: string, src: string): Promise<HTMLImageElement | null> {
        let img = new Image();
        img.src = src;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.images[name] = img;
                resolve(this.images[name]);
                return this.images[name];
            };
            img.onerror = () => {
                console.log("Could not load image: " + name + " from " + src);
                reject(false);
                return false;
            };
        });
    }
    /**
     *
     * @param {string} name The name of the image
     * @returns The image if it was found, false if it was not
     */
    getImage(name: string) {
        if (this.images[name] == undefined) {
            console.log("Image: " + name + " not found");
            return null;
        }
        return this.images[name];
    }
    // load tilesheet
    /**
     *
     * @param {string} name The name of the image
     * @param {string} src The source of the image
     * @param {number} width The width of the tile
     * @param {number} height The height of the tile
     * @param {number} rows The number of rows in the tilesheet
     * @param {number} columns The number of columns in the tilesheet
     * @returns The tilesheet if it was loaded successfully, false if it was not
     */

    async loadTileSheet(
        name: string,
        source: string,
        tileWidth: number,
        tileHeight: number,
        rows: number,
        cols: number
    ) {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement("canvas");
                let tiles = [];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        // Adjusted tileX calculation to account for the full width of the source image
                        const tileX = col * tileWidth;
                        const tileY = row * tileHeight;
                        canvas.width = tileWidth;
                        canvas.height = tileHeight;
                        const context = canvas.getContext("2d");
                        context?.drawImage(
                            image,
                            tileX,
                            tileY,
                            tileWidth,
                            tileHeight,
                            0,
                            0,
                            tileWidth,
                            tileHeight
                        );
                        // Create a new image element for each tile and append it to the array
                        const tileImage = new Image();
                        tileImage.src = canvas.toDataURL();

                        // check if the image empty 64x64 image
                        if (
                            tileImage.src !==
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg=="
                        ) {
                            tiles.push(tileImage);
                        }
                    }
                }
                resolve(tiles);
                this.images[name] = tiles; // Assuming 'this.images' is defined elsewhere in your code
            };

            // Set crossOrigin attribute to avoid potential issues with CORS policy
            image.crossOrigin = "anonymous";
            image.src = source;
        });
    }
    /**
     *
     * @param {string} name The name of the tilesheet
     * @param {string[]} names The names of the tiles
     */
    // assignNames(name: string, names: string) {
    // this.images[name].forEach((tile, i) => {
    //     this.images[names[i]] = tile;
    // });
    // }

    async loadFolder(
        nameArr: string[],
        path: string,
        prefix: string,
        ext: string,
        count: number
    ) {
        let promises = [];
        for (let iter = 0; iter < count; iter++) {
            promises.push(
                this.loadImage(nameArr[iter], path + prefix + iter + ext)
            );
        }
        return Promise.all(promises);
    }
    static async tileSheetToImages(
        source: string,
        tileWidth: number,
        tileHeight: number,
        rows: number,
        cols: number,
        // name: string,
        // count: number
    ) {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = source;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                let tiles = [];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        // Adjusted tileX calculation to account for the full width of the source image
                        const tileX = col * tileWidth;
                        const tileY = row * tileHeight;

                        canvas.width = tileWidth;
                        canvas.height = tileHeight;
                        const context = canvas.getContext("2d");
                        context?.drawImage(
                            image,
                            tileX,
                            tileY,
                            tileWidth,
                            tileHeight,
                            0,
                            0,
                            tileWidth,
                            tileHeight
                        );
                        // Create a new image element for each tile and append it to the array
                        const tileImage = new Image();
                        tileImage.src = canvas.toDataURL();

                        // check if the image empty 64x64 image
                        if (
                            tileImage.src !==
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==" &&
                            tileImage.src !==
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAB9JREFUOE9jZKAQMFKon2HUAIbRMGAYDQNQPhr4vAAAJpgAEX/anFwAAAAASUVORK5CYII="
                        ) {
                            tiles.push(tileImage);
                        }
                    }
                }
                resolve(tiles);
            };
            image.crossOrigin = "anonymous";
            image.src = source;
        });
    }
}
