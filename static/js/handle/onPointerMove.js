import Player from "../entities/Player.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 */
const onPointerMove = ({ e, Pointer, player }) => {
    if (document.pointerLockElement !== document.body) return;
    Pointer.x += e.movementX;
    Pointer.y += e.movementY;
    Pointer.rotationFromPlayer = Math.atan2(
        Pointer.x - player.x,
        -(Pointer.y - player.y)
    );
};

export default onPointerMove;
