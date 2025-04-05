import { Pointer } from "../../game.js";
import { player } from "../../game.js";
import { isValidPlayerMove } from "../utils/isValidPlayerMove.js";

const physics = () => {
    player.dy *= 0.8;
    player.dx *= 0.8;
    Pointer.x += player.dx;
    Pointer.y += player.dy;
};

export default physics;
