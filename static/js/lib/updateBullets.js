const updateBullets = ({ game }) => {
    const { bullets, context, enemyBullets } = game;
    for (let bullet of bullets) {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
    }

    for (let bullet of enemyBullets) {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
    }
};

export default updateBullets;
