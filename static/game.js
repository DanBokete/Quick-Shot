import Player from "./js/entities/Player.js";
import { drawGame } from "./js/lib/draw.js";
import handleCollisions from "./js/lib/collisions.js";
import handleActiveKeys from "./js/lib/activeKeys.js";
import handleOutOfCanvas from "./js/lib/despawn.js";
import physics from "./js/lib/physics.js";
import increaseRound from "./js/lib/increaseRound.js";
import {
    updateAmmoUi,
    updateEndGameUi,
    updateRoundUpdateTimerUi,
} from "./js/ui/uiElements.js";
import updateBullets from "./js/lib/updateBullets.js";
import AK47 from "./js/entities/ak47.js";
import Game from "./js/entities/game.js";
import Camera from "./js/entities/Camera.js";
import { resolveAnimations } from "./js/lib/animations.js";
import { init, initialiseEventListeners } from "./js/lib/initialise.js";
import Sfx from "./js/entities/Sfx.js";
import { sendData } from "./js/lib/backend.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {
        initialiseEventListeners();
        resetGame();
    },
    false
);

// const startBtn = document.querySelector("#startBtn");

// startBtn.addEventListener(
//     "click",
//     () => {
//         resetGame();
//     },
//     false
// );

export const Keys = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
};

export const Pointer = {
    x: null,
    y: null,
    rotationFromPlayer: null,
};

/** @type {Player | null} */
export let player;

/** @type {Game | null} */
export let game = new Game();

export const sfx = new Sfx();

function initPlayer() {
    player = new Player();
}

function initGame() {
    game = new Game();
}

const camera = new Camera();

export const gameLoop = () => {
    game.requestId = window.requestAnimationFrame(gameLoop);

    game.meta.now = Date.now();
    game.meta.elapsed = game.meta.now - game.meta.then;

    if (game.meta.elapsed <= game.meta.fpsInterval) {
        return;
    }

    resolveAnimations();
    camera.update();
    updateRoundUpdateTimerUi({ game });

    // To show reloading time countdown
    if (player.activeWeapon && player.activeWeapon.state.isReloading) {
        updateAmmoUi({ player, game });
    }

    game.meta.then =
        game.meta.now - (game.meta.elapsed % game.meta.fpsInterval);

    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    game.meta.elapsedFrames += 1;

    game.context.save();
    game.context.translate(camera.x, camera.y);
    drawGame();
    game.context.restore();

    handleActiveKeys();

    if (player.isShooting && player.activeWeapon instanceof AK47) {
        player.shoot({ Pointer, game });
    }
    if (
        player.autoReload &&
        player.activeWeapon &&
        player.activeWeapon.ammo === 0
    ) {
        player.reloadWeapon({ game });
    }

    player.update();

    for (let enemy of game.enemies) {
        enemy.update({ player, game });
    }

    updateBullets({ game });
    physics({ player });
    handleCollisions({ player, game });
    handleOutOfCanvas({ player, game });

    // if round timer = 0 or there is no enemies
    if (
        -Math.ceil(
            game.meta.elapsedFrames / game.meta.fps -
                (game.round.startTime / game.meta.fps + game.round.timeLimit)
        ) === 0 ||
        game.enemies.length === 0
    ) {
        increaseRound({ player, game });
    }

    if (player.health <= 0) {
        endGame();
    }

    player.lastPosition = {
        x: player.x,
        y: player.y,
    };
};

function endGame() {
    window.cancelAnimationFrame(game.requestId);
    sendData();
    updateEndGameUi();
    document.exitPointerLock();
    // document.querySelector("canvas").style.cursor = "default";
    // resetGame();
}

export function resetGame() {
    initPlayer();
    initGame();
    init();
    // startBtn.disabled = true;
}

console.log(window.location.pathname);
