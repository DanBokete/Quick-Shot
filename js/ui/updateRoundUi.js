import { Game } from "../../game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
const updateRoundUi = ({ Game }) => {
    const { round } = Game;
    const scoreElement = document.getElementById("round");
    scoreElement.innerText = `Round: ${round.number}`;
};

export default updateRoundUi;
