import {
    updateCashUi,
    updateHealthUi,
    updateScoreUi,
} from "../ui/uiElements.js";
import collision from "../utils/collision.js";
import Game from "../entities/Game.js";
import getDistance from "../utils/getDistance.js";
import { player } from "../../game.js";

const handleCollisions = () => {
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
        player.health -= player.unlimitedHealth ? 0 : bullet.damage ?? 1;
        updateHealthUi({ player });
    });
};

export default handleCollisions;
