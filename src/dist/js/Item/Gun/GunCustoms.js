"use strict";
class GunCustoms {
    constructor(roundsPerMinute, range, inaccuracy, damage, penetration, reloadTime, magazineSize, reserveAmmo, reloading, recoilPower, recoilSpeed, recoilDuration) {
        this.roundsPerMinute = 600;
        this.range = 100;
        this.inaccuracy = 0.01;
        this.damage = 10;
        this.penetration = 0;
        this.reloadTime = 2;
        this.ammo = 30;
        this.magazineSize = 30;
        this.reserveAmmo = 90;
        this.reloading = false;
        this.recoilPower = 10;
        this.recoilSpeed = 1;
        this.recoilDuration = 5;
        this.roundsPerMinute = roundsPerMinute;
        this.range = range;
        this.inaccuracy = inaccuracy;
        this.damage = damage;
        this.penetration = penetration;
        this.reloadTime = reloadTime;
        this.ammo = magazineSize;
        this.magazineSize = magazineSize;
        this.reserveAmmo = reserveAmmo;
        this.reloading = reloading;
        this.recoilPower = recoilPower;
        this.recoilSpeed = recoilSpeed;
        this.recoilDuration = recoilDuration;
    }
}
//# sourceMappingURL=GunCustoms.js.map