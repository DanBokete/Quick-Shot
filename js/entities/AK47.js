import Weapon from "./Weapon.js";

class AK47 extends Weapon {
    constructor({ image }) {
        super({
            ammo: 10,
            maxAmmo: 10,
            key: "2",
            name: "AK47",
            damage: 0.5,
            fireDelay: 30,
            lastShotAt: 0,
            reloadTime: 100,
            autoReloadDelay: 40,
            bulletHealth: 2,
            bulletSpeed: 8,
            image,
            imageWidth: 1152,
            imageHeight: 32,
        });
    }
}

export default AK47;
