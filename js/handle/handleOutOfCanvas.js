import Game from "../entities/Game.js";

const handleOutOfCanvas = ({ player }) => {
    const canvas = Game.canvas;

    const { bullets, enemyBullets } = Game;

    Game.bullets = bullets.filter((bullet) => {
        if (
            bullet.x - bullet.size > 0 &&
            bullet.y - bullet.size > 0 &&
            bullet.x + bullet.size < 100 * 16 &&
            bullet.y - bullet.size < 100 * 16
        ) {
            return bullet;
        }
    });
    Game.enemyBullets = enemyBullets.filter((bullet) => {
        if (
            bullet.x > 0 &&
            bullet.y > 0 &&
            bullet.x + bullet.size < 100 * 16 &&
            bullet.y + bullet.size < 100 * 16
        ) {
            return bullet;
        }
    });
};

export default handleOutOfCanvas;
