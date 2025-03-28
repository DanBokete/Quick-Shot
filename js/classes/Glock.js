import Weapon from "./Weapon.js";

class Glock extends Weapon {
    constructor() {
        super({
            ammo: 1,
            maxAmmo: 1,
            key: "1",
            name: "Glock",
            damage: 1,
            fireDelay: 60,
            lastShotAt: 0,
            reloadTime: 60,
            autoReloadDelay: 20,
            bulletHealth: 2,
            bulletSpeed: 8,
        });
    }
}
export default Glock;
