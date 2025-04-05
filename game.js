import Player from "./js/entities/Player.js";
import { drawGame } from "./js/lib/draw.js";
import handleCollisions from "./js/lib/collisions.js";
import handleActiveKeys from "./js/lib/activeKeys.js";
import handleOutOfCanvas from "./js/handle/handleOutOfCanvas.js";
import physics from "./js/lib/physics.js";
import increaseRound from "./js/lib/increaseRound.js";
import { updateAmmoUi, updateRoundUpdateTimerUi } from "./js/ui/uiElements.js";
import updateBullets from "./js/lib/updateBullets.js";
import AK47 from "./js/entities/Ak47.js";
import Game from "./js/entities/Game.js";
import Camera from "./js/entities/Camera.js";
import { resolveAnimations } from "./js/lib/animations.js";
import { init } from "./js/lib/initialise.js";

document.addEventListener("DOMContentLoaded", init, false);

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

export const player = new Player();

const camera = new Camera();

export const gameLoop = () => {
    Game.requestId = window.requestAnimationFrame(gameLoop);

    Game.meta.now = Date.now();
    Game.meta.elapsed = Game.meta.now - Game.meta.then;

    if (Game.meta.elapsed <= Game.meta.fpsInterval) {
        return;
    }

    resolveAnimations();
    camera.update();
    updateRoundUpdateTimerUi({ Game });

    // To show reloading time countdown
    if (player.activeWeapon && player.activeWeapon.state.isReloading) {
        updateAmmoUi({ player, Game });
    }

    Game.meta.then =
        Game.meta.now - (Game.meta.elapsed % Game.meta.fpsInterval);

    Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    Game.meta.elapsedFrames += 1;

    Game.context.save();
    Game.context.translate(camera.x, camera.y);
    drawGame();
    Game.context.restore();

    handleActiveKeys();

    if (player.isShooting && player.activeWeapon instanceof AK47) {
        player.shoot({ Pointer, Game });
    }
    if (
        player.autoReload &&
        player.activeWeapon &&
        player.activeWeapon.ammo === 0
    ) {
        player.reloadWeapon({ Game });
    }

    player.update();

    for (let enemy of Game.enemies) {
        enemy.update({ player, Game });
    }

    updateBullets({ Game });
    physics({ player });
    handleCollisions({ player, Game });
    handleOutOfCanvas({ player, Game });

    // if round timer = 0 or there is no enemies
    if (
        -Math.ceil(
            Game.meta.elapsedFrames / Game.meta.fps -
                (Game.round.startTime / Game.meta.fps + Game.round.timeLimit)
        ) === 0 ||
        Game.enemies.length === 0
    ) {
        increaseRound({ player, Game });
    }

    // if (player.health <= 0) {
    //     endGame();
    // }
};

function endGame() {
    window.cancelAnimationFrame(Game.requestId);
    document.exitPointerLock();
    document.querySelector("canvas").style.cursor = "default";
}
