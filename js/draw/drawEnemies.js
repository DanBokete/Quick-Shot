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

        context.fillStyle = "orange";
        context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
};

export default drawEnemies;
