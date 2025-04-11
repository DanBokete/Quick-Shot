import getDistance from "../utils/getDistance.js";
import normaliseVector from "../utils/normaliseVector.js";
import randomInt from "../utils/randomInt.js";
import Enemy from "./Enemy.js";
import { game } from "../../game.js";

class Creeper extends Enemy {
    constructor({ x, y, speed, health, maxHealth, fireDelay, chanceOfFiring }) {
        super({ x, y, speed, health, maxHealth });
        this.lastShotAt = 0;
        this.fireDelay = fireDelay ?? 200;
        this.bulletSpeed = 4.0;
        this.damage = 1;
        this.chanceOfFiring = chanceOfFiring;
        this.angle = null;
        this.isAttached = false;

        this.health = health ?? game.round.number / 3;
        this.maxHealth = health ?? game.round.number / 3;

        this.cash = 20;

        this.width = 81;
        this.height = 71;
    }

    update({ player }) {
        const distanceBetweenPlayerAndEnemy = getDistance(player, this);

        if (!this.killedAt) {
            let attackOffset = 0;

            if (this.x > player.x) {
                this.frameY = 0;
            } else {
                this.frameY = 2;
            }

            if (game.meta.elapsedFrames % 2 === 0) {
                this.frameX = (this.frameX + 1) % 8;
            }

            // if (distanceBetweenPlayerAndEnemy > 50) {
            //     attackOffset = this.attackOffset;
            // }

            const xDistanceFromPlayer = player.x - this.x + attackOffset;
            const yDistanceFromPlayer = player.y - this.y + attackOffset;

            if (distanceBetweenPlayerAndEnemy < 150) {
                this.isAttached = true;
            }

            if (this.isAttached) {
                this.isAttached = true;
                this.frameLimit = 3;
                if (this.angle === null) {
                    if (this.x > player.x) {
                        this.angle = Math.asin(-yDistanceFromPlayer / 150);
                    } else if (this.y > player.y) {
                        this.angle = Math.acos(-xDistanceFromPlayer / 150);
                    } else {
                        this.angle = -Math.acos(-xDistanceFromPlayer / 150);
                    }
                }
                this.angle += 0.01 * this.speed;
                this.y = player.y + Math.sin(this.angle) * 150;
                this.x = player.x + Math.cos(this.angle) * 150;
            } else {
                this.frameLimit = 8;

                this.WITHIN_RANGE = false;
                const { a, b, c } = normaliseVector(
                    xDistanceFromPlayer,
                    yDistanceFromPlayer
                );

                this.dx = this.speed * a;
                this.dy = this.speed * b;

                this.x += this.dx;
                this.y += this.dy;
            }

            this._shoot({ game, player });
        } else {
            if (game.meta.elapsedFrames % 3 === 0) {
                this.frameX += 1;
            }
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
                size: 16,
                frameX: 0,
                frameY: 9,
                speed: this.bulletSpeed,
                damage: this.damage,
            },
        ];
    }

    _shoot({ game, player }) {
        const { elapsedFrames } = game.meta;
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
                    game.enemyBullets.push(bullet);
                }
            }

            // console.log(game.enemyBullets);
        }
    }

    enableDeathState() {
        this.frameY = 1;
        this.frameX = 0;
        this.killedAt = game.meta.elapsedFrames;
    }

    draw() {
        const demonImage = game.assets.enemies.demonImage;
        const context = game.context;
        context.fillStyle = "lightblue";

        context.drawImage(
            demonImage,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.frameY === 0 ? this.x - this.size / 2 : this.x - this.size,
            this.y - this.size * 0.9,
            this.width,
            this.height
        );
    }
}

export default Creeper;
