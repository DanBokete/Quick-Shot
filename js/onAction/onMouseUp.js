import Player from "../entities/Player.js";
import Game from "../entities/Game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 * @param {Game} param.Game
 * @returns
 */
const onMouseUp = ({ e, player, Game }) => {
    player.isShooting = false;
};

export default onMouseUp;
