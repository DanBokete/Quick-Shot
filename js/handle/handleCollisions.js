import updateCashUi from "../ui/updateCashUi.js";
import updateHealthUi from "../ui/updateHealtUi.js";
import updateScoreUi from "../ui/updateScoreUi.js";
import collision from "../utils/collision.js";

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

        if (enemy.settings.canAttack && collision(player, enemy)) {
            player.health--;
            updateHealthUi(player);
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
        updateCashUi(player);
    });
};

export default handleCollisions;
