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
        for (let bullet of Game.enemyBullets) {
            // context.fillStyle = "black";
            // context.fillRect(
            //     bullet.x - bullet.size / 2,
            //     bullet.y - bullet.size / 2,
            //     bullet.size,
            //     bullet.size
            // );
            context.drawImage(
                Game.assets.bullet,
                bullet.size * bullet.frameX,
                16 + 1,
                bullet.size,
                bullet.size,
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );
        }

        if (Game.meta.elapsedFrames % 2 === 0) {
            Game.enemyBullets.filter((bullet) => {
                bullet.frameX > 3 ? (bullet.frameX = 0) : bullet.frameX++;
                return { ...bullet, bullet: bullet.frameX };
            });
        }
    }
};

export default drawBullets;
