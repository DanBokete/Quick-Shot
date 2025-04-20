import { game, player, Pointer } from "../../game.js";
import Player from "../entities/Player.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {MouseEvent} param.e
 */
const onPointerMove = ({ e }) => {
    if (document.pointerLockElement !== document.querySelector("canvas")) {
        return;
    }
    Pointer.x += e.movementX;
    Pointer.y += e.movementY;
    Pointer.rotationFromPlayer = Math.atan2(
        Pointer.x - player.x,
        -(Pointer.y - player.y)
    );

    adjustPointer();
};

/** keep pointer within game screen at all times */
const adjustPointer = () => {
    const canvasWidth = game.canvas.width;
    const canvasHeight = game.canvas.height;

    if (player.x - canvasWidth / 2 > Pointer.x) {
        Pointer.x = player.x - canvasWidth / 2;
    }
    if (Pointer.x > player.x + canvasWidth / 2) {
        Pointer.x = player.x + canvasWidth / 2;
    }

    if (Pointer.y > player.y + canvasHeight / 2) {
        Pointer.y = player.y + canvasHeight / 2;
    }
    if (player.y - canvasHeight / 2 > Pointer.y) {
        Pointer.y = player.y - canvasHeight / 2;
    }
};

export default onPointerMove;
