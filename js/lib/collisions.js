import Player from "../entities/Player.js";
import {
    updateCashUi,
    updateHealthUi,
    updateScoreUi,
    updateUpgradeWeaponUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import collision from "../utils/collision.js";
import Game from "../entities/Game.js";
import getDistance from "../utils/getDistance.js";
import RPG from "../entities/RPG.js";
import Sniper from "../entities/Sniper.js";
import Sprayer from "../entities/Sprayer.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {Player} param.player
 */
const handleCollisions = ({ player, Game }) => {
    for (let enemy of Game.enemies) {
        if (Game.bullets.length) {
            Game.bullets = Game.bullets.filter((bullet) => {
                if (!collision(bullet, enemy)) {
                    return bullet;
                }

                if (bullet.splashDamage) {
                    console.log(bullet.splashRadius);
                    for (let otherEnemy of Game.enemies) {
                        if (enemy === otherEnemy) continue;

                        const distanceBetweenEnemies = getDistance(
                            enemy,
                            otherEnemy
                        );

                        console.log(distanceBetweenEnemies);
                        console.log(bullet.splashRadius);

                        if (distanceBetweenEnemies <= bullet.splashRadius) {
                            otherEnemy.health -= bullet.splashDamage;
                            console.log("hkjdhj");
                        }
                    }
                }
                console.log(bullet.damage);

                enemy.health -= bullet.damage;
            });
        }

        // console.log(enemy instanceof Enemy);

        if (collision(enemy, player)) {
            player.health -= player.unlimitedHealth ? 0 : enemy.damage ?? 1;
            updateHealthUi({ player });
            enemy.repelFromPlayer({ player });
        }
    }

    // Game.enemies = Game.enemies.filter((enemy) => {
    //     if (enemy.health > 0) {
    //         return enemy;
    //     }
    //     player.score++;
    //     player.cash += enemy.cash;
    //     updateScoreUi(player);
    //     updateCashUi({ player });
    // });
    Game.enemies = Game.enemies.map((enemy) => {
        if (enemy.health <= 0 && !enemy.killedAt) {
            // enemy.health = 0;
            enemy.frameY = 1;
            enemy.frameX = 0;
            enemy.killedAt = Game.meta.elapsedFrames;
            player.score++;
            player.cash += enemy.cash;
            updateScoreUi(player);
            updateCashUi({ player });
        }
        // console.log(enemy);

        return enemy;
    });

    Game.enemies = Game.enemies.filter((enemy) => {
        if (
            !(enemy.killedAt && enemy.frameX === 4 && enemy.frameY === 1) ||
            enemy instanceof Sprayer
        ) {
            return enemy;
        }
    });

    Game.enemyBullets = Game.enemyBullets.filter((bullet) => {
        if (!collision(bullet, player)) {
            return bullet;
        }
        player.health -= player.unlimitedHealth ? 0 : bullet.damage ?? 1;
        updateHealthUi({ player });
    });
};

export default handleCollisions;
