import { Game } from "../../game.js";
import Enemy from "../classes/Enemy.js";
import Sprayer from "../classes/Sprayer.js";
import updateRoundUpdateTimerUi from "../ui/updateRoundTimerUi.js";
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
    // Game.bullets = [];
    // Game.enemyBullets = [];

    // console.log(roundNumber);

    if (roundNumber === 1) {
        createEasyEnemies({ Game, numberOfEnemies: 3, enemySpeed: 0.1 });
        Game.round.timeLimit = 20;
    }

    if (roundNumber === 2) {
        createEasyEnemies({ Game, numberOfEnemies: 6, enemySpeed: 0.5 });
        Game.round.timeLimit = 40;
    }
    if (roundNumber === 3) {
        createHardEnemies({
            Game,
            numberOfEnemies: 2,
            enemySpeed: 0.55,
            canAttack: true,
        });
        Game.round.timeLimit = 15;
    }
    Game.round.startTime = Game.meta.elapsedFrames;
    updateRoundUi({ Game });
    // updateRoundUpdateTimerUi({ Game });
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

const createEasyEnemies = ({
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

const createHardEnemies = ({
    Game,
    numberOfEnemies,
    enemySpeed,
    canAttack = false,
    canShoot = false,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const hardEnemy = new Sprayer({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed: Math.random() + enemySpeed,
        });

        Game.enemies.push(hardEnemy);
    }
    console.log();
};

export default increaseRound;
