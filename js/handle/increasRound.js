import { Game } from "../../game.js";
import Enemy from "../classes/Enemy.js";
import updateRoundUi from "../ui/updateRoundUi.js";
import randomInt from "../utils/randomInt.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
const increaseRound = ({ Game }) => {
    Game.round.number++;

    const { round } = Game;
    const roundNumber = round.number;

    console.log(roundNumber);

    if (roundNumber === 2) {
        createEnemies({ Game, numberOfEnemies: 6, enemySpeed: 0.5 });
    }
    if (roundNumber === 3) {
        createEnemies({
            Game,
            numberOfEnemies: 8,
            enemySpeed: 0.55,
            canAttack: true,
        });
    }

    updateRoundUi({ Game });
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {number} param.numberOfEnemies
 * @param {number} param.enemySpeed
 * @param {boolean} param.canAttack
 * @param {boolean} param.canShoot
 */
const createEnemies = ({
    Game,
    numberOfEnemies,
    enemySpeed,
    canAttack = false,
    canShoot = false,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        Game.enemies.push(
            new Enemy({
                x: randomInt(Game.canvas.width / 2, Game.canvas.width),
                y: randomInt(0, Game.canvas.height),
                speed: Math.random() + enemySpeed,
                canAttack,
                canShoot,
            })
        );
    }
    console.log();
};

export default increaseRound;
