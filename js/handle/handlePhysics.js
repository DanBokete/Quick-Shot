const handlePhysics = ({ player }) => {
    player.dy *= 0.8;
    player.dx *= 0.8;
};

export default handlePhysics;
