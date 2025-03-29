import { Game } from "../../game.js";
import AK47 from "../classes/Ak47.js";
import Glock from "../classes/Glock.js";
import Player from "../classes/Player.js";
import RPG from "../classes/RPG.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 */
const drawCursor = ({ Game, Pointer, player }) => {
    const { context, canvas } = Game;
    // const akCrosshair = Game.assets.akCrosshair;
    const imageWidth = 64;
    const imageHeight = 64;

    if (player.activeWeapon) {
        const activeWeapon = player.activeWeapon;
        let crosshair;

        if (activeWeapon instanceof Glock) {
            crosshair = Game.assets.glockCrosshair;
        } else if (activeWeapon instanceof AK47) {
            crosshair = Game.assets.akCrosshair;
        } else if (activeWeapon instanceof RPG) {
            crosshair = Game.assets.rpgCrosshair;
        }

        context.drawImage(
            crosshair,
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
        document.querySelector("canvas").style.cursor = "none";
    } else {
        document.querySelector("canvas").style.cursor = "default";
    }
};

export default drawCursor;
