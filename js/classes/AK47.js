import Weapon from "./Weapon.js";

class AK47 extends Weapon {
    constructor() {
        super({
            ammo: 5,
            maxAmmo: 5,
            key: "2",
            name: "AK47",
            damage: 1,
            fireDelay: 60,
            lastShotAt: 0,
            reloadTime: 100,
            autoReloadDelay: 40,
            bulletHealth: 2,
            bulletSpeed: 8,
        });
    }
}

export default AK47;
