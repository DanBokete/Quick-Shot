import randomInt from "../utils/randomInt.js";
import Player from "./Player.js";
import { Game } from "../../game.js";
import getDistance from "../utils/getDistance.js";
import normaliseVector from "../utils/normaliseVector.js";

class Enemy {
    constructor({ x, y, canShoot, canAttack, speed, health, maxHealth }) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = 30;
        this.speed = speed ?? 1;
        this.health = health ?? 3;
        this.maxHealth = this.maxHealth ?? 3;
        this.cash = 10;
        this.reboundDistance = 50;

        this.attackOffset = randomInt(-100, 100);
    }

    update({ player }) {
        const distanceBetweenPlayerAndEnemy = getDistance(player, this);

        let attackOffset = 0;

        if (distanceBetweenPlayerAndEnemy > 100) {
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
    }

    repelFromPlayer({ player }) {
        if (player.x + player.size / 2 < this.x + this.size / 2) {
            this.x += randomInt(
                this.reboundDistance - 40,
                this.reboundDistance
            );
        } else
            this.x -= randomInt(
                this.reboundDistance - 40,
                this.reboundDistance
            );

        if (player.y + player.size / 2 > this.y + this.size / 2) {
            this.y -= randomInt(
                this.reboundDistance - 40,
                this.reboundDistance
            );
        } else
            this.y += randomInt(
                this.reboundDistance - 40,
                this.reboundDistance
            );
    }

    /**
     * @param {object} param
     * @param {Player} param.player
     * @param {Game} param.Game
     */
    setRandomSpawnLocation({ player, Game }) {
        const lowerXSpawnLocation = randomInt(
            0,
            player.x - player.safeZoneRadius
        );

        const higherXSpawnLocation = randomInt(
            player.x + player.safeZoneRadius,
            Game.canvas.width - this.size
        );

        if (player.x - player.safeZoneRadius < 0) {
            this.x = higherXSpawnLocation;
        } else {
            this.x = lowerXSpawnLocation;
        }

        const lowerYSpawnLocation = randomInt(
            0,
            player.y - player.safeZoneRadius
        );

        const higherYSpawnLocation = randomInt(
            player.x + player.safeZoneRadius,
            Game.canvas.height - this.size
        );

        if (player.y - player.safeZoneRadius < 0) {
            this.y = higherYSpawnLocation;
            console.log(this.x, this.y);
        } else {
            this.y = lowerYSpawnLocation;
            console.log(this.x, this.y);
        }
    }
}

export default Enemy;
