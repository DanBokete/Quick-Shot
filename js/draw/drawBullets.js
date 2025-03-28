import { Game } from "../../game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
const drawBullets = ({ Game }) => {
    const { bullets, context, enemyBullets } = Game;

    // console.log(enemyBullets);

    if (bullets.length) {
        for (let bullet of bullets) {
            context.fillStyle = "black";
            context.fillRect(
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );
        }
    }

    if (enemyBullets.length) {
        for (let bullet of enemyBullets) {
            context.fillStyle = "black";
            context.fillRect(
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );
        }
    }
};

export default drawBullets;
