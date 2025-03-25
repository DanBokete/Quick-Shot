const updateBullets = ({ bullets, context }) => {
    for (let bullet of bullets) {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
    }
};

export default updateBullets;
