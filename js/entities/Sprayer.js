import getDistance from "../utils/getDistance.js";
import normaliseVector from "../utils/normaliseVector.js";
import Enemy from "./Enemy.js";
import Game from "./Game.js";

class Sprayer extends Enemy {
    constructor({ x, y, speed, health, maxHealth, fireDelay }) {
        super({ x, y, speed, health, maxHealth });
        this.lastShotAt = 0;
        this.fireDelay = fireDelay ?? 200;
        this.bulletSpeed = 3.0;
        this.damage = 0.5;
    }

    update({ player, Pointer, Game }) {
        const distanceBetweenPlayerAndEnemy = getDistance(player, this);

        let attackOffset = 0;

        if (distanceBetweenPlayerAndEnemy > 150) {
            attackOffset = this.attackOffset;
        }

        const xDistanceFromPlayer = player.x - this.x + attackOffset;
        const yDistanceFromPlayer = player.y - this.y + attackOffset;

        const { a, b, c } = normaliseVector(
            xDistanceFromPlayer,
            yDistanceFromPlayer
        );

        this.dx = this.speed * a;
        this.dy = this.speed * b;

        this.x += this.dx;
        this.y += this.dy;

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
                size: 16,
                speed: this.bulletSpeed,
                damage: this.damage,
                frameX: 0,
            },
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: -(a * this.bulletSpeed),
                dy: -(b * this.bulletSpeed),
                size: 16,
                speed: this.bulletSpeed,
                damage: this.damage,
                frameX: 0,
            },
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: -(b * this.bulletSpeed),
                dy: -(a * this.bulletSpeed),
                size: 16,
                speed: this.bulletSpeed,
                damage: this.damage,
                frameX: 0,
            },
            {
                x: this.x + this.size / 2,
                y: this.y + this.size / 2,
                dx: b * this.bulletSpeed,
                dy: a * this.bulletSpeed,
                size: 16,
                speed: this.bulletSpeed,
                damage: this.damage,
                frameX: 0,
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

    enableDeathState() {
        this.killedAt = Game.meta.elapsedFrames;
    }
}

export default Sprayer;
