const drawBullets = ({ bullets, context }) => {
    if (!bullets.length) return;

    for (let bullet of bullets) {
        context.fillStyle = "black";
        context.fillRect(
            bullet.x - bullet.size / 2,
            bullet.y - bullet.size / 2,
            bullet.size,
            bullet.size
        );
    }
};

export default drawBullets;
