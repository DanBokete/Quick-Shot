import { Pointer } from "../../game.js";

const handlePhysics = ({ player }) => {
    player.dy *= 0.8;
    player.dx *= 0.8;
    Pointer.x += player.dx;
    Pointer.y += player.dy;
};

export default handlePhysics;
