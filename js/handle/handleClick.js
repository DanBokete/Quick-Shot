const handleClick = ({ Pointer, player, elapsedFrames, Game }) => {
    const bullet = player.shoot({ Pointer, elapsedFrames });

    if (bullet) {
        Game.bullets.push(bullet);
    }
};

export default handleClick;
