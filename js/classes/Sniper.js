import getDistance from "../utils/getDistance.js";
import normaliseVector from "../utils/normaliseVector.js";
import randomInt from "../utils/randomInt.js";
import Enemy from "./Enemy.js";

class Sniper extends Enemy {
    constructor({ x, y, speed, health, maxHealth, fireDelay, chanceOfFiring }) {
        super({ x, y, speed, health, maxHealth });
        this.lastShotAt = 0;
        this.fireDelay = fireDelay ?? 200;
        this.bulletSpeed = 1.0;
        this.damage = 1;
        this.chanceOfFiring = chanceOfFiring;
    }

    update({ player, Game }) {
        const distanceBetweenPlayerAndEnemy = getDistance(player, this);

        let attackOffset = 0;

        if (distanceBetweenPlayerAndEnemy > 200) {
            attackOffset = this.attackOffset;
        }

        const xDistanceFromPlayer = player.x - this.x + attackOffset;
        const yDistanceFromPlayer = player.y - this.y + attackOffset;

        const { a, b, c } = normaliseVector(
            xDistanceFromPlayer,
            yDistanceFromPlayer
        );

        this._shoot({ Game, player });

        this.dx = this.speed * a;
        this.dy = this.speed * b;

        this.x += this.dx;
        this.y += this.dy;

        for (let bullet of Game.enemyBullets) {
            bullet.x += bullet.dx;
            bullet.y += bullet.dy;
        }
    }

    _createBullets({ player }) {
        const side1 = player.x + player.size / 2 - (this.x + this.size / 2);
        const side2 = player.y + player.size / 2 - (this.y + this.size / 2);

        const { a, b, c } = normaliseVector(side1, side2);

        return [
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: a * this.bulletSpeed,
                dy: b * this.bulletSpeed,
                size: 10,
                speed: this.bulletSpeed,
                damage: this.damage,
            },
        ];
    }

    _shoot({ Game, player }) {
        const { elapsedFrames } = Game.meta;
        if (
            elapsedFrames > this.lastShotAt + this.fireDelay ||
            this.lastShotAt === 0
        ) {
            if (Math.random() >= this.chanceOfFiring) return;

            this.lastShotAt = elapsedFrames;
            const bullets = this._createBullets({ player });
            console.log("shot");

            if (bullets) {
                for (let bullet of bullets) {
                    Game.enemyBullets.push(bullet);
                }
            }

            // console.log(Game.enemyBullets);
        }
    }
}

export default Sniper;
