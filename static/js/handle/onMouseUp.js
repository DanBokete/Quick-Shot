import Player from "../entities/Player.js";
import game from "../entities/game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 * @param {game} param.game
 * @returns
 */
const onMouseUp = ({ e, player, game }) => {
    player.isShooting = false;
};

export default onMouseUp;
