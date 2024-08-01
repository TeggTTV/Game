class Ammo extends Item {
    name: string;
    caliber: string;
    quantity: number;
    imgPath: string;
    constructor(name: string, caliber: string, quantity: number, imgPath?: string) {
        super(null, caliber, quantity);
        this.name = name;
        this.caliber = caliber;
        this.quantity = quantity;
        this.imgPath = imgPath || `./assets/ammo/${this.caliber}.png`;
    } 
}