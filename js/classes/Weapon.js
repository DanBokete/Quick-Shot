import normaliseVector from "../utils/normaliseVector.js";

class Weapon {
    constructor({
        name,
        ammo,
        maxAmmo,
        key,
        damage,
        fireDelay,
        lastShotAt,
        reloadTime,
        autoReloadDelay,
        bulletHealth,
        bulletSpeed,
        size = 10,
    }) {
        this.name = name;
        this.ammo = ammo;
        this.maxAmmo = maxAmmo;
        this.key = key;
        this.damage = damage;

        // frames
        this.fireDelay = fireDelay;
        this.lastShotAt = lastShotAt;
        this.reloadTime = reloadTime;
        this.autoReloadDelay = autoReloadDelay;
        this.lastReloaded = 0;

        this.state = {
            isReloading: false,
        };

        this.bullet = {
            health: bulletHealth,
            speed: bulletSpeed,
            size,
        };
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
        };
    }

    shoot({ Pointer, elapsedFrames, player }) {
        if (this.state.isReloading) return;
        if (
            elapsedFrames > this.lastShotAt + this.fireDelay ||
            this.lastShotAt === 0
        ) {
            this.lastShotAt = elapsedFrames;
            return this._createBullet({ player, Pointer });
        }
        return null;
    }
}

export default Weapon;
