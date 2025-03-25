const handleOutOfCanvas = ({ Game, player }) => {
    const canvas = Game.canvas;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y < 0) {
        player.y = 0;
    }

    const bullets = Game.bullets;

    Game.bullets = bullets.filter((bullet) => {
        if (
            bullet.x > 0 &&
            bullet.y > 0 &&
            bullet.x + bullet.size < Game.canvas.width &&
            bullet.y + bullet.size < Game.canvas.height
        ) {
            return bullet;
        }
    });
};

export default handleOutOfCanvas;
