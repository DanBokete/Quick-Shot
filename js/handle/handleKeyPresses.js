const handleKeyPresses = ({ Keys, player }) => {
    if (Keys.moveLeft) {
        player.dx -= player.speed;
    }
    if (Keys.moveRight) {
        player.dx += player.speed;
    }
    if (Keys.moveUp) {
        player.dy -= player.speed;
    }
    if (Keys.moveDown) {
        player.dy += player.speed;
    }
};

export default handleKeyPresses;
