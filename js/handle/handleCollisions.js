import Enemy from "../classes/Enemy.js";
import Player from "../classes/Player.js";
import Sprayer from "../classes/Sprayer.js";
import updateCashUi from "../ui/updateCashUi.js";
import updateHealthUi from "../ui/updateHealtUi.js";
import updateScoreUi from "../ui/updateScoreUi.js";
import collision from "../utils/collision.js";
import { Game } from "../../game.js";

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
                enemy.health -= bullet.damage;
            });
        }

        // console.log(enemy instanceof Enemy);

        if (enemy instanceof Sprayer && collision(enemy, player)) {
            player.health--;
            updateHealthUi({ player });
            enemy.repelFromPlayer({ player });
        }
    }

    Game.enemies = Game.enemies.filter((enemy) => {
        if (enemy.health > 0) {
            return enemy;
        }

        player.score++;
        player.cash += enemy.cash;
        updateScoreUi(player);
        updateCashUi({ player });
    });

    Game.enemyBullets = Game.enemyBullets.filter((bullet) => {
        if (!collision(bullet, player)) {
            return bullet;
        }
        player.health--;
        updateHealthUi({ player });
    });
};

export default handleCollisions;
