import Game from "./Game.js";
import Weapon from "./Weapon.js";

class Glock extends Weapon {
    ammoPrice = 10;
    fireRatePrice = 80;
    reloadTimePrice = 30;

    constructor({ image }) {
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
            image,
            imageWidth: 768,
            imageHeight: 32,
        });
    }

    draw() {
        const imageWidth = this.imageWidth / 12;
        const imageHeight = 48;
        const context = Game.context;

        context.drawImage(
            this.image,
            this.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    }
}
export default Glock;
