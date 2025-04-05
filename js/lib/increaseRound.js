import Game from "../entities/Game.js";
import Enemy from "../entities/Enemy.js";
import Player from "../entities/Player.js";
import Creeper from "../entities/Creeper.js";
import Sprayer from "../entities/Sprayer.js";
import { updateRoundUi } from "../ui/uiElements.js";
import randomInt from "../utils/randomInt.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {Player} param.player
 */
const increaseRound = ({ Game, player }) => {
    Game.round.number++;

    const { round } = Game;
    const roundNumber = round.number;
    // Game.bullets = [];
    // Game.enemyBullets = [];

    // console.log(roundNumber);

    if (roundNumber === 1) {
        createMediumEnemies({
            Game,
            player,
            numberOfEnemies: 1,
            enemySpeed: 0.5,
            fireDelay: 55,
            chanceOfFiring: 0.02,
        });
        Game.round.timeLimit = 90;
        // createEasyEnemies({
        //     Game,
        //     player,
        //     numberOfEnemies: 3,
        //     enemySpeed: 0.5,
        // });
    } else if (roundNumber === 2) {
        createMediumEnemies({
            Game,
            player,
            numberOfEnemies: 3,
            enemySpeed: 0.5,
            fireDelay: 55,
            chanceOfFiring: 0.02,
        });
        Game.round.timeLimit = 90;
    } else if (roundNumber === 3) {
        createHardEnemies({
            Game,
            numberOfEnemies: 2,
            enemySpeed: 0.55,
            player,
        });
        Game.round.timeLimit = 90;
    } else {
        let value = 2 * round.number;
        while (value > 0) {
            const randomNumber = randomInt(1, 100);

            if (randomNumber > 70 - roundNumber) {
                value -= 15;
                createHardEnemies({
                    Game,
                    numberOfEnemies: 2,
                    enemySpeed: 0.55,
                    player,
                    fireDelay: -roundNumber * 0.5,
                });
                value -= 5;
            } else if (randomNumber > 50 - roundNumber) {
                value -= 10;
                createMediumEnemies({
                    Game,
                    player,
                    numberOfEnemies: 3,
                    enemySpeed: 0.5,
                    fireDelay: 55 - roundNumber * 0.5,
                    chanceOfFiring: 0.02,
                });
            } else {
                value -= 5;
                createEasyEnemies({
                    Game,
                    player,
                    numberOfEnemies: 6,
                    enemySpeed: 0.5,
                });
            }
        }
        Game.round.timeLimit = 60;
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
 */
const createEasyEnemies = ({ Game, numberOfEnemies, enemySpeed, player }) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const enemy = new Enemy({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed:
                Math.random() +
                enemySpeed +
                Math.min(Game.round.number / 10, 2),
        });

        enemy.setRandomSpawnLocation({ player, Game });
        Game.enemies.push(enemy);
    }
    console.log();
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {number} param.numberOfEnemies
 * @param {number} param.enemySpeed
 * @param {number} param.fireDelay
 */
const createMediumEnemies = ({
    Game,
    numberOfEnemies,
    enemySpeed,
    player,
    fireDelay,
    chanceOfFiring,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const mediumEnemy = new Creeper({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed:
                Math.random() +
                enemySpeed +
                Math.min(Game.round.number / 10, 2),
            fireDelay,
            chanceOfFiring,
        });

        mediumEnemy.setRandomSpawnLocation({ player, Game });
        Game.enemies.push(mediumEnemy);
    }
    console.log();
};

const createHardEnemies = ({
    Game,
    numberOfEnemies,
    enemySpeed,
    player,
    fireDelay,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const hardEnemy = new Sprayer({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed:
                Math.random() +
                enemySpeed +
                Math.min(Game.round.number / 10, 1.5),
            fireDelay: 55 - Game.round.number * 0.5,
        });

        hardEnemy.setRandomSpawnLocation({ player, Game });
        Game.enemies.push(hardEnemy);
    }
    console.log();
};

export default increaseRound;
