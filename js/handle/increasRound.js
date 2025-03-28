import { Game } from "../../game.js";
import Enemy from "../classes/Enemy.js";
import Player from "../classes/Player.js";
import Sprayer from "../classes/Sprayer.js";
import updateRoundUpdateTimerUi from "../ui/updateRoundTimerUi.js";
import updateRoundUi from "../ui/updateRoundUi.js";
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
        createEasyEnemies({
            Game,
            player,
            numberOfEnemies: 3,
            enemySpeed: 0.1,
        });
        Game.round.timeLimit = 20;
    } else if (roundNumber === 2) {
        createEasyEnemies({
            Game,
            player,
            numberOfEnemies: 6,
            enemySpeed: 0.5,
        });
        Game.round.timeLimit = 40;
    } else if (roundNumber === 3) {
        createHardEnemies({
            Game,
            numberOfEnemies: 2,
            enemySpeed: 0.55,
            canAttack: true,
            player,
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
    player,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const enemy = new Enemy({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed: Math.random() + enemySpeed,
            canAttack,
            canShoot,
        });

        enemy.setRandomSpawnLocation({ player, Game });
        Game.enemies.push(enemy);
    }
    console.log();
};

const createHardEnemies = ({
    Game,
    numberOfEnemies,
    enemySpeed,
    canAttack = false,
    canShoot = false,
    player,
}) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        const hardEnemy = new Sprayer({
            x: randomInt(Game.canvas.width / 2, Game.canvas.width),
            y: randomInt(0, Game.canvas.height),
            speed: Math.random() + enemySpeed,
        });

        hardEnemy.setRandomSpawnLocation({ player, Game });
        Game.enemies.push(hardEnemy);
    }
    console.log();
};

export default increaseRound;
