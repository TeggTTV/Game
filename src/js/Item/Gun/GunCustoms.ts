class GunCustoms {
    roundsPerMinute: number = 600;
    range: number = 100;
    inaccuracy: number = 0.01;
    damage: number = 10;
    penetration: number = 0;

    reloadTime: number = 2;
    ammo: number = 30;
    magazineSize: number = 30;
    reloading: boolean = false;

    recoilPower: number = 10;
    recoilSpeed: number = 1;
    recoilDuration: number = 5;
    constructor(
        roundsPerMinute: number,
        range: number,
        inaccuracy: number,
        damage: number,
        penetration: number,

        reloadTime: number,
        // ammo not present since it is set to magazineSize
        magazineSize: number,
        reloading: boolean,

        recoilPower: number,
        recoilSpeed: number,
        recoilDuration: number
    ) {
        this.roundsPerMinute = roundsPerMinute;
        this.range = range;
        this.inaccuracy = inaccuracy;
        this.damage = damage;
        this.penetration = penetration;

        this.reloadTime = reloadTime;
        this.ammo = magazineSize;
        this.magazineSize = magazineSize;
        this.reloading = reloading;

        this.recoilPower = recoilPower;
        this.recoilSpeed = recoilSpeed;
        this.recoilDuration = recoilDuration;
    }
}
