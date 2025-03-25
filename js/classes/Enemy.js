class Enemy {
    constructor({ x, y, canShoot, canAttack, speed, health, maxHealth }) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = speed ?? 1;

        this.health = health ?? 3;
        this.maxHealth = this.maxHealth ?? 3;

        this.cash = 10;

        this.reboundDistance = 50;

        this.settings = {
            canShoot,
            canAttack: canAttack ?? false,
        };
    }

    update({ player }) {
        const xDistanceFromPlayer =
            player.x + player.size / 2 - (this.x + this.size / 2);
        const yDistanceFromPlayer =
            player.y + player.size / 2 - (this.y + this.size / 2);

        xDistanceFromPlayer > 0
            ? (this.x += this.speed)
            : (this.x -= this.speed);

        yDistanceFromPlayer > 0
            ? (this.y += this.speed)
            : (this.y -= this.speed);
    }

    repelFromPlayer({ player }) {
        if (player.x < this.x) {
            this.x += this.reboundDistance;
        } else this.x -= this.reboundDistance;

        if (player.y > this.y) {
            this.y += this.reboundDistance;
        } else this.y -= this.reboundDistance;
    }
}

export default Enemy;
