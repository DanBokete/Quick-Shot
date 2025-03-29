const drawPlayer = ({ player, Game }) => {
    const { context } = Game;
    const PlayerSpriteImage = Game.assets.sprite.player;
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.size, player.size);
    context.drawImage(
        PlayerSpriteImage,
        player.frameX * (player.width * 16),
        player.frameY * (player.height * 16),
        player.width * 16,
        player.height * 16,
        player.x - player.width * 2.7,
        player.y - player.height * 2 - player.height * 2.4,
        player.width * 6.8,
        player.height * 6.8
    );
};

export default drawPlayer;
