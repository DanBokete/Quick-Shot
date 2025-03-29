import normaliseVector from "../utils/normaliseVector.js";
import Enemy from "./Enemy.js";

class Sprayer extends Enemy {
    constructor({ x, y, speed, health, maxHealth }) {
        super({ x, y, speed, health, maxHealth });
        this.lastShotAt = 0;
        this.fireDelay = 200;
        this.bulletSpeed = 3.0;
        this.damage = 0.5;
    }

    update({ player, Pointer, Game }) {
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

        this._shoot({ Game, player });
    }

    _createBullets({ player }) {
        const side1 = player.x - (this.x + this.size / 2);
        const side2 = player.y - (this.y + this.size / 2);

        const { a, b, c } = normaliseVector(side1, side2);

        console.log(this.damage);

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
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: -(a * this.bulletSpeed),
                dy: -(b * this.bulletSpeed),
                size: 10,
                speed: this.bulletSpeed,
                damage: this.damage,
            },
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: -(b * this.bulletSpeed),
                dy: -(a * this.bulletSpeed),
                size: 10,
                speed: this.bulletSpeed,
                damage: this.damage,
            },
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: b * this.bulletSpeed,
                dy: a * this.bulletSpeed,
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

export default Sprayer;
