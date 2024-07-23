class ImageLoader {
    constructor() {
        this.images = {};
    }
    /**
     *
     * @param {string} name The name of the image
     * @param {string} src The source of the image
     * @returns The image if it was loaded successfully, false if it was not
     */
    async loadImage(name, src) {
        let img = new Image();
        img.src = src;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.images[name] = img;
                resolve(this.images[name]);
            };
            img.onerror = () => {
                console.log("Could not load image: " + name + " from " + src);
                reject(false);
            };
        });
    }
    /**
     *
     * @param {string} name The name of the image
     * @returns The image if it was found, false if it was not
     */ 
    getImage(name) {
        if (this.images[name] == undefined) {
            console.log("Image: " + name + " not found");
            return false;
        }
        return this.images[name];
    }
}