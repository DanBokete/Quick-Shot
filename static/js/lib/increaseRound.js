import Enemy from "../entities/Enemy.js";
import Creeper from "../entities/Creeper.js";
import Sprayer from "../entities/Sprayer.js";
import { updateRoundUi } from "../ui/uiElements.js";
import randomInt from "../utils/randomInt.js";
import { player, sfx, game } from "../../game.js";
/**
 * Assigning parameter types
 * @param {Object} param
 * @param {game} param.game
 */
const increaseRound = ({ game }) => {
    game.round.number++;

    const { round } = game;
    const roundNumber = round.number;
    // game.bullets = [];
    // game.enemyBullets = [];

    // console.log(roundNumber);

    sfx.playAchievement();

    if (roundNumber === 1) {
        createEasyEnemies({
            numberOfEnemies: 5,
            enemySpeed: 0.5,
        });
        game.round.timeLimit = 60;
    } else if (roundNumber === 2) {
        createMediumEnemies({
            numberOfEnemies: 3,
            enemySpeed: 0.5,
            fireDelay: 55,
            chanceOfFiring: 0.02,
        });
        game.round.timeLimit = 60;
    } else if (roundNumber === 3) {
        createHardEnemies({
            numberOfEnemies: 2,
            enemySpeed: 0.55,
        });
        game.round.timeLimit = 60;
    } else {
        let value = 2 * round.number;
        while (value > 0) {
            const randomNumber = randomInt(1, 100);

            if (randomNumber > 70 - roundNumber) {
                value -= 15;
                createHardEnemies({
                    numberOfEnemies: 2,
                    enemySpeed: 0.55,
                    fireDelay: -roundNumber * 0.5,
                });
                value -= 5;
            } else if (randomNumber > 50 - roundNumber) {
                value -= 10;
                createMediumEnemies({
                    numberOfEnemies: 3,
                    enemySpeed: 0.5,
                    fireDelay: 55 - roundNumber * 0.5,
                    chanceOfFiring: 0.02,
                });
            } else {
                value -= 5;
                createEasyEnemies({
                    numberOfEnemies: 6,
                    enemySpeed: 0.5,
                });
            }
        }
        game.round.timeLimit = 60;
    }

    game.round.startTime = game.meta.elapsedFrames;
    updateRoundUi({ game });
    // updateRoundUpdateTimerUi({ game });
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {number} param.numberOfEnemies
 * @param {number} param.enemySpeed
 */
const createEasyEnemies = ({ numberOfEnemies, enemySpeed }) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const enemy = new Enemy({
            x: 0,
            y: 0,
            speed:
                Math.random() +
                enemySpeed +
                Math.min(game.round.number / 10, 2),
        });

        enemy.setRandomSpawnLocation({ player, game });
        game.enemies.push(enemy);
    }
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {number} param.numberOfEnemies
 * @param {number} param.enemySpeed
 * @param {number} param.fireDelay
 */
const createMediumEnemies = ({
    numberOfEnemies,
    enemySpeed,
    player,
    fireDelay,
    chanceOfFiring,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const mediumEnemy = new Creeper({
            x: randomInt(game.canvas.width / 2, game.canvas.width),
            y: randomInt(0, game.canvas.height),
            speed:
                Math.random() +
                enemySpeed +
                Math.min(game.round.number / 10, 2),
            fireDelay,
            chanceOfFiring,
        });

        mediumEnemy.setRandomSpawnLocation({ player, game });
        game.enemies.push(mediumEnemy);
    }
};

const createHardEnemies = ({ numberOfEnemies, enemySpeed, fireDelay }) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const hardEnemy = new Sprayer({
            x: randomInt(game.canvas.width / 2, game.canvas.width),
            y: randomInt(0, game.canvas.height),
            speed:
                Math.random() +
                enemySpeed +
                Math.min(game.round.number / 10, 1.5),
            fireDelay: 55 - game.round.number * 0.5,
        });

        hardEnemy.setRandomSpawnLocation({ player, game });
        game.enemies.push(hardEnemy);
    }
};

export default increaseRound;
