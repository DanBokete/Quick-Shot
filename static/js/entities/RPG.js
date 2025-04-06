import Weapon from "./Weapon.js";
import normaliseVector from "../utils/normaliseVector.js";
import Game from "./Game.js";

class RPG extends Weapon {
    constructor({ image }) {
        const damage = 5;
        const splashDamage = damage / 2;
        super({
            ammo: 1,
            maxAmmo: 1,
            key: "3",
            name: "RPG",
            damage,
            fireDelay: 100,
            lastShotAt: 0,
            reloadTime: 100,
            autoReloadDelay: 40,
            bulletHealth: 2,
            bulletSpeed: 8,
            size: 32,
            image,
            imageWidth: 1536,
            imageHeight: 32,
            image,
        });

        this.splashDamage = splashDamage;
        this.splashRadius = 200;

        this.ammoPrice = 500;
        this.fireRatePrice = 500;
        this.reloadTimePrice = 400;
    }

    _createBullet({ player, Pointer }) {
        const side1 = Pointer.x - (player.x + player.size / 2);
        const side2 = Pointer.y - (player.y + player.size / 2);

        const { a, b, c } = normaliseVector(side1, side2);

        return {
            x: player.x + player.size / 2,
            y: player.y + player.size / 2,
            dx: a * this.bullet.speed,
            dy: b * this.bullet.speed,
            size: this.bullet.size,
            speed: this.bullet.speed,
            damage: this.damage,
            health: this.bullet.health,
            splashDamage: this.splashDamage,
            splashRadius: this.splashRadius,
            shotAt: Game.meta.elapsedFrames,
            frameX: 0,
        };
    }

    draw() {
        const context = Game.context;
        const imageWidth = this.imageWidth / 8;
        const imageHeight = 32;

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

export default RPG;
