import { Game } from "../../game.js";
import Glock from "../classes/Glock.js";
import Player from "../classes/Player.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 */
const drawCursor = ({ Game, Pointer, player }) => {
    const { context, canvas } = Game;
    const image = Game.assets.akCrosshair;
    const imageWidth = 64;
    const imageHeight = 64;
    if (player.activeWeapon instanceof Glock) {
        context.drawImage(
            image,
            0,
            0,
            imageWidth,
            imageHeight,
            Pointer.x - imageWidth / 2,
            Pointer.y - imageHeight / 2,
            imageWidth,
            imageHeight
        );
    }

    if (
        player.activeWeapon &&
        Pointer.x < canvas.width &&
        Pointer.y < canvas.height
    ) {
        document.body.style.cursor = "none";
    } else {
        document.body.style.cursor = "default";
    }
};

export default drawCursor;
