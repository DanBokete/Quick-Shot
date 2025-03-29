import { Game } from "../../game.js";
import Player from "../classes/Player.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 */
const onPointerMove = ({ e, Pointer, player, Game }) => {
    Pointer.x = e.clientX;
    Pointer.y = e.clientY;
    Pointer.rotationFromPlayer = Math.atan2(
        Pointer.x - player.x,
        -(Pointer.y - player.y)
    );
    // if (Game.assets && Game.assets.akCrosshair) {
    //     document.querySelector(
    //         "body"
    //     ).style.cursor = `url(${Game.assets.akCrosshair.src}),auto`;
    //     console.log(document.querySelector("body").style.cursor);
    // }
};

export default onPointerMove;
