import {
    updateCashUi,
    updateHealthUi,
    updateScoreUi,
} from "../ui/uiElements.js";
import collision from "../utils/collision.js";
import Game from "../entities/Game.js";
import getDistance from "../utils/getDistance.js";
import { player, sfx } from "../../game.js";

const handleCollisions = () => {
    for (let enemy of Game.enemies) {
        if (Game.bullets.length) {
            if (enemy.killedAt) continue;
            Game.bullets = Game.bullets.filter((bullet) => {
                if (!collision(bullet, enemy)) {
                    return bullet;
                }
                sfx.playEnemyHit();
                if (bullet.splashDamage) {
                    sfx.playExplosion();
                    Game.explosions.push({
                        x: bullet.x,
                        y: bullet.y,
                        explodedAt: Game.meta.elapsedFrames,
                        frameX: 1,
                        size: 64,
                    });

                    for (let otherEnemy of Game.enemies) {
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

        // console.log(enemy instanceof Enemy);

        if (!enemy.killedAt && collision(enemy, player)) {
            sfx.playPlayerHit();
            player.health -= player.unlimitedHealth ? 0 : enemy.damage ?? 1;
            updateHealthUi({ player });
            enemy.repelFromPlayer({ player });
        }
    }

    Game.enemies = Game.enemies.map((enemy) => {
        if (enemy.health <= 0 && !enemy.killedAt) {
            // enemy.health = 0;
            enemy.enableDeathState();
            player.score++;
            player.cash += enemy.cash;
            updateScoreUi(player);
            updateCashUi({ player });
        }
        // console.log(enemy);

        return enemy;
    });

    Game.enemies = Game.enemies.filter((enemy) => {
        if (!enemy.canBeRemoved()) {
            return enemy;
        }
    });

    Game.enemyBullets = Game.enemyBullets.filter((bullet) => {
        if (!collision(bullet, player)) {
            return bullet;
        }
        sfx.playPlayerHit();
        player.health -= player.unlimitedHealth ? 0 : bullet.damage ?? 1;
        updateHealthUi({ player });
    });
};

export default handleCollisions;
