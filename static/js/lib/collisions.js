import {
    updateCashUi,
    updateHealthUi,
    updateScoreUi,
} from "../ui/uiElements.js";
import collision from "../utils/collision.js";
import { game, Keys } from "../../game.js";
import getDistance from "../utils/getDistance.js";
import { player, sfx } from "../../game.js";
import {
    handlePlayerDamage,
    updatePlayerCash,
    updatePlayerScore,
} from "../helpers/helpers.js";
import { background } from "./background.js";

const handleCollisions = () => {
    for (let enemy of game.enemies) {
        if (game.bullets.length) {
            if (enemy.killedAt) continue;
            game.bullets = game.bullets.filter((bullet) => {
                if (!collision(bullet, enemy)) {
                    return bullet;
                }
                sfx.playEnemyHit();
                if (bullet.splashDamage) {
                    sfx.playExplosion();
                    game.explosions.push({
                        x: bullet.x,
                        y: bullet.y,
                        explodedAt: game.meta.elapsedFrames,
                        frameX: 1,
                        size: 64,
                    });

                    for (let otherEnemy of game.enemies) {
                        if (enemy === otherEnemy) continue;

                        const distanceBetweenEnemies = getDistance(
                            enemy,
                            otherEnemy
                        );

                        if (distanceBetweenEnemies <= bullet.splashRadius) {
                            otherEnemy.health -= bullet.splashDamage;
                        }
                    }
                }

                enemy.health -= bullet.damage;
            });
        }

        if (!enemy.killedAt && collision(enemy, player)) {
            handlePlayerDamage({ player, obj: enemy });
            enemy.repelFromPlayer({ player });
        }
    }

    game.enemies = game.enemies.map((enemy) => {
        if (enemy.health <= 0 && !enemy.killedAt) {
            enemy.enableDeathState();
            updatePlayerScore({ player, score: 1 });
            updatePlayerCash({ player, cash: enemy.cash });
        }

        return enemy;
    });

    game.enemies = game.enemies.filter((enemy) => {
        if (!enemy.canBeRemoved()) {
            return enemy;
        }
    });

    game.enemyBullets = game.enemyBullets.filter((bullet) => {
        if (!collision(bullet, player)) {
            return bullet;
        }

        handlePlayerDamage({ player, obj: bullet });
    });

    // testing

    // const validMoves = [562, 561, 560, 226];
    // const playerBoardX = Math.floor(
    //     (player.x + player.dx) / game.assets.tileSize
    // );
    // const playerBoardY = Math.floor(
    //     (player.y + player.height + player.dx) / game.assets.tileSize
    // );

    // const currentCell = background[playerBoardY][playerBoardY];

    // if (!validMoves.includes(currentCell)) {
    //     player.x = player.lastPosition.x;
    //     player.dx = 0;
    //     player.y = player.lastPosition.y;
    //     player.dy = 0;
    // }

    // if (Keys.moveLeft) {
    //     try {
    //         const leftCell = background[playerBoardY][playerBoardX - 2];
    //         if (validMoves.includes(leftCell)) {
    //         } else {
    //             player.x = player.lastPosition.x;
    //         }
    //     } catch {
    //         player.x = player.lastPosition.x;
    //         player.dx = 0;
    //     }
    // }
    // if (Keys.moveRight) {
    //     try {
    //         const leftCell = background[playerBoardY][playerBoardX + 4];
    //         if (validMoves.includes(leftCell)) {
    //         }
    //     } catch {}
    // }
    // if (Keys.moveUp) {
    //     try {
    //         const bottomCell = background[playerBoardY - 2][playerBoardX];
    //         if (validMoves.includes(bottomCell)) {
    //         }
    //     } catch {}
    // }
    // if (Keys.moveDown) {
    //     try {
    //         const bottomCell = background[playerBoardY + 3][playerBoardX];
    //         if (validMoves.includes(bottomCell)) {
    //         } else {
    //         }
    //     } catch {}
    // }
};

export default handleCollisions;
