class AK47 {
    constructor() {
        this.name = "AK47";
        this.ammo = 1;
        this.maxAmmo = 1;
        this.key = "2";
        this.speed = 8;
        this.damage = 1;

        // frames
        this.fireDelay = 60;
        this.lastShotAt = 0;

        this.bullet = {
            health: 2,
        };
    }

    #createBullet({ player, Pointer }) {
        const side1 = Pointer.x - (player.x + player.size / 2);
        const side2 = Pointer.y - (player.y + player.size / 2);

        const { a, b, c } = normaliseVector(side1, side2);

        return {
            x: player.x + player.size / 2,
            y: player.y + player.size / 2,
            dx: a * this.bullet.speed,
            dy: b * this.bullet.speed,
            size: 10,
            speed: this.bullet.speed,
            damage: this.damage,
            health: this.bullet.health,
        };
    }

    shoot({ Pointer, elapsedFrames, player }) {
        if (
            elapsedFrames > this.lastShotAt + this.fireDelay ||
            this.lastShotAt === 0
        ) {
            this.lastShotAt = elapsedFrames;
            return this.#createBullet({ player, Pointer });
        }
        return null;
    }
}
