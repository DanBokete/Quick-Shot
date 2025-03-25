const drawPlayer = ({ player, context }) => {
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.size, player.size);
};

export default drawPlayer;
