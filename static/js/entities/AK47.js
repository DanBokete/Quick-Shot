import { game } from "../../game.js";
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

        this.ammoPrice = 80;
        this.fireRatePrice = 50;
        this.reloadTimePrice = 200;
    }

    draw() {
        const imageWidth = this.imageWidth / 12;
        const imageHeight = 48;
        const context = game.context;

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

export default AK47;
