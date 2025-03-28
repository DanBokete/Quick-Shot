import Enemy from "../classes/Enemy.js";
import Sprayer from "../classes/Sprayer.js";

const drawEnemies = ({ context, enemies }) => {
    if (!enemies.length) return;

    for (let enemy of enemies) {
        context.fillStyle = "lightGreen";
        context.fillRect(enemy.x, enemy.y - enemy.size / 2, enemy.size, 5);

        context.fillStyle = "darkGreen";
        context.fillRect(
            enemy.x,
            enemy.y - enemy.size / 2,
            enemy.size * (enemy.health / enemy.maxHealth),
            5
        );
        if (enemy instanceof Enemy) context.fillStyle = "orange";
        if (enemy instanceof Sprayer) context.fillStyle = "purple";
        context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
};

export default drawEnemies;
