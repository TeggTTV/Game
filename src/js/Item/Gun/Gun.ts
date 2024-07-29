type GunOptions = {
    imgPath: string;
    customs: GunCustoms;
};

class Gun extends Item {
    name: string;
    type: GunType;

    gunOptions: GunOptions;

    shotFirstBullet: boolean = false;
    firing: boolean;

    fireTimer: number;

    tipOfGun: Vector;
    recoilAmount: number;

    constructor(
        owner: Player,
        name: string,
        gunType: GunType,
        gunOptions: {
            imgPath: string;
            customs: GunCustoms;
        },
        imgPath: string
    ) {
        super(owner, name, imgPath);
        this.name = name;
        this.type = gunType;

        this.gunOptions = {
            imgPath: gunOptions.imgPath,
            customs: gunOptions.customs,
        };

        this.shotFirstBullet = false;
        this.firing = false;

        this.fireTimer = 0;

        this.img = new Image();
        this.img.src = gunOptions.imgPath;

        this.tipOfGun = new Vector(0, 0);
        this.recoilAmount = 0;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }

    recoilAnimation() {
        // ex: 0.5, 0.1, 1
        let recoil = this.gunOptions.customs.recoilPower;
        let recoilSpeed = this.gunOptions.customs.recoilSpeed;
        let recoilDuration = this.gunOptions.customs.recoilDuration;

        let recoilTimer = 0;

        let recoilInterval = setInterval(() => {
            this.recoilAmount = -Math.sin(recoilTimer) * recoil;
            recoilTimer += recoilSpeed;

            if (recoilTimer >= recoilDuration) {
                clearInterval(recoilInterval);
                // reset recoil amount
                let recoilReset = setInterval(() => {
                    this.recoilAmount += 0.5;
                    if (this.recoilAmount >= 0) {
                        this.recoilAmount = 0;
                        clearInterval(recoilReset);
                    }
                }, 1000 / 60);
            }
        }, 1000 / 60);
    }

    reload() {
        if(this.gunOptions.customs.reloading || this.gunOptions.customs.reserveAmmo === 0) return;
        this.gunOptions.customs.reloading = true;

        if (
            this.gunOptions.customs.ammo < this.gunOptions.customs.magazineSize
        ) {
            new Timer(
                0,
                this.gunOptions.customs.reloadTime,
                1,
                true,
                () => {
                    // do nothing
                },
                () => {
                    if (this.owner.holding instanceof Gun) {
                        let neededAmmo =
                            this.gunOptions.customs.magazineSize -
                            this.gunOptions.customs.ammo;

                        if (this.gunOptions.customs.reserveAmmo >= neededAmmo) {
                            if (this.gunOptions.customs.ammo >= 1) {
                                this.gunOptions.customs.ammo += neededAmmo + 1;
                                this.gunOptions.customs.reserveAmmo -=
                                    neededAmmo + 1;
                            } else {
                                this.gunOptions.customs.ammo += neededAmmo;
                                this.gunOptions.customs.reserveAmmo -=
                                    neededAmmo;
                            }
                        } else {
                            this.gunOptions.customs.ammo +=
                                this.gunOptions.customs.reserveAmmo;
                            this.gunOptions.customs.reserveAmmo = 0;
                        }
                    }
                    this.gunOptions.customs.reloading = false;
                }
            );
        }
    }

    draw() {
        ctx.save();

        let direction = new Vector(
            mouse.x +
                camera.position.x -
                this.owner.position.x -
                this.owner.width / 2,
            mouse.y +
                camera.position.y -
                this.owner.position.y -
                this.owner.height / 2
        ).normalize();

        ctx.translate(
            this.owner.position.x +
                this.owner.width / 2 +
                (direction.x * this.owner.width) / 2,
            this.owner.position.y +
                this.owner.height / 2 +
                (direction.y * this.owner.height) / 2
        );

        ctx.rotate(direction.angle());

        ctx.drawImage(this.img, this.recoilAmount, 0);

        ctx.restore();

        let tipOfGun = new Vector(
            this.owner.position.x +
                this.owner.width / 2 +
                this.img.width * Math.cos(direction.angle()),
            this.owner.position.y +
                this.owner.height / 2 +
                this.img.width * Math.sin(direction.angle())
        );
        this.tipOfGun = tipOfGun;
    }

    calculateInaccuracy(direction: Vector, inaccuracy: number) {
        let angle = Math.atan2(direction.y, direction.x);
        let inaccuracyAngle = Math.random() * inaccuracy - inaccuracy / 2;

        let newAngle = angle + inaccuracyAngle;

        return new Vector(Math.cos(newAngle), Math.sin(newAngle));
    }
    async shoot(mouseX: number, mouseY: number) {
        let roundsPerMillsec =
            1 / (this.gunOptions.customs.roundsPerMinute / 60);

        let direction = new Vector(
            mouseX - this.owner.position.x - this.owner.width / 2,
            mouseY - this.owner.position.y - this.owner.height / 2
        );

        if (this.gunOptions.customs.inaccuracy !== 0) {
            direction = this.calculateInaccuracy(
                direction,
                this.gunOptions.customs.inaccuracy
            );
        } else {
            direction = direction.normalize();
        }

        let bullet = new Bullet(
            this.owner,
            10,
            this.gunOptions.customs.velocity,
            direction,
            this.tipOfGun,
            5,
            "assets/images/bullet.png"
        );

        if (!this.shotFirstBullet && !this.firing) {
            projectiles.push(bullet);
            this.gunOptions.customs.ammo--;

            this.recoilAnimation();
            await wait(roundsPerMillsec);

            this.shotFirstBullet = true;
        } else if (this.shotFirstBullet && this.type !== GunType.SemiAuto) {
            this.firing = true;
            this.fireTimer += deltaTime;

            if (this.fireTimer >= roundsPerMillsec) {
                projectiles.push(bullet);
                this.gunOptions.customs.ammo--;

                this.recoilAnimation();
                this.fireTimer = 0;
            }
        }
    }
}
