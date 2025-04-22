import { player } from "../../game.js";
import getDistance from "../utils/getDistance.js";
import normaliseVector from "../utils/normaliseVector.js";
import Enemy from "./Enemy.js";
import { game } from "../../game.js";

class Sprayer extends Enemy {
    constructor({ x, y, speed, health, maxHealth, fireDelay }) {
        super({ x, y, speed, health, maxHealth });
        this.lastShotAt = 0;
        this.fireDelay = fireDelay ?? 200;
        this.bulletSpeed = 3.0;
        this.damage = 0.5;

        this.health = health ?? game.round.number * 0.5;
        this.maxHealth = health ?? game.round.number * 0.5;

        this.cash = 40;
    }

    update({ player, Pointer, game }) {
        const distanceBetweenPlayerAndEnemy = getDistance(player, this);
        if (!this.killedAt) {
            let attackOffset = 0;

            if (this.x > player.x) {
                this.frameY = 1;
            } else {
                this.frameY = 0;
            }

            if (game.meta.elapsedFrames % 2 === 0) {
                this.frameX = (this.frameX + 1) % 8;
            }

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

            this._shoot({ game, player });
        } else {
            if (game.meta.elapsedFrames % 3 === 0) {
                this.frameX += 1;
            }
        }
    }

    _createBullets({ player }) {
        const side1 = player.x - (this.x + this.size / 2);
        const side2 = player.y - (this.y + this.size / 2);

        const { a, b, c } = normaliseVector(side1, side2);

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

    _shoot({ game, player }) {
        const { elapsedFrames } = game.meta;
        if (
            elapsedFrames > this.lastShotAt + this.fireDelay ||
            this.lastShotAt === 0
        ) {
            this.lastShotAt = elapsedFrames;
            const bullets = this._createBullets({ player });

            if (bullets) {
                for (let bullet of bullets) {
                    game.enemyBullets.push(bullet);
                }
            }
        }
    }

    enableDeathState() {
        this.x > player.x ? (this.frameY = 3) : (this.frameY = 2);
        this.frameX = 0;
        this.killedAt = game.meta.elapsedFrames;
    }

    draw() {
        const sprayerImage = game.assets.enemies.sprayerImage;
        const context = game.context;
        // context.fillStyle = "lightblue";

        context.drawImage(
            sprayerImage,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.width,
            this.height
        );
    }
}

export default Sprayer;
