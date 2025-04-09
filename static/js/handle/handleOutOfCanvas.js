import Game from "../entities/Game.js";
const mapWidth = 100 * 16;
const mapHeight = 100 * 16;
const offScreenMargin = 200;

const handleOutOfCanvas = ({ player }) => {
    const canvas = Game.canvas;

    const { bullets, enemyBullets } = Game;

    Game.bullets = bullets.filter((bullet) => {
        if (
            bullet.x - bullet.size > -offScreenMargin &&
            bullet.y - bullet.size > -offScreenMargin &&
            bullet.x + bullet.size < mapWidth + offScreenMargin &&
            bullet.y - bullet.size < mapHeight + offScreenMargin
        ) {
            return bullet;
        }
    });

    Game.enemyBullets = enemyBullets.filter((bullet) => {
        if (
            bullet.x > -offScreenMargin &&
            bullet.y > -offScreenMargin &&
            bullet.x + bullet.size < mapWidth + offScreenMargin &&
            bullet.y + bullet.size < mapHeight + offScreenMargin
        ) {
            return bullet;
        }
    });
};

export default handleOutOfCanvas;
