import Glock from "./js/entities/Glock.js";
import Player from "./js/entities/Player.js";
import {
    drawBullets,
    drawEnemies,
    drawCursor,
    drawPlayer,
    drawLeftWeapon,
    drawRightWeapon,
} from "./js/lib/draw.js";
import handleClick from "./js/handle/handleClick.js";
import handleCollisions from "./js/lib/collisions.js";
import handleKeyPresses from "./js/handle/handleKeyPresses.js";
import handleOutOfCanvas from "./js/handle/handleOutOfCanvas.js";
import handlePhysics from "./js/handle/handlePhysics.js";
import increaseRound from "./js/handle/increasRound.js";
import { activate, deactivate } from "./js/lib/inputs.js";
import onMouseUp from "./js/onAction/onMouseUp.js";
import onPointerMove from "./js/onAction/onPointerMove.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateHealthUi,
    updateRoundUpdateTimerUi,
    updateRoundUi,
    updateScoreUi,
} from "./js/ui/uiElements.js";
import updateBullets from "./js/update/updateBullets.js";
import load_assets from "./js/lib/load_assets.js";
import AK47 from "./js/entities/Ak47.js";
import RPG from "./js/entities/RPG.js";
import Game from "./js/entities/Game.js";

document.addEventListener("DOMContentLoaded", init, false);

const Keys = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
};

const Pointer = {
    x: null,
    y: null,
    rotationFromPlayer: null,
};

const player = new Player();

function init() {
    Game.canvas = document.querySelector("canvas");
    Game.context = Game.canvas.getContext("2d");
    Game.endLine.height = Game.canvas.height;

    player.x = 10;
    player.y = 10;

    window.addEventListener(
        "keydown",
        (e) => activate({ e, Keys, player, Game }),
        false
    );
    window.addEventListener("keyup", (e) => deactivate({ e, Keys }), false);

    window.addEventListener(
        "pointermove",
        (e) => onPointerMove({ e, Pointer, player, Game }),
        false
    );

    window.addEventListener(
        "mousedown",
        (e) =>
            handleClick({
                e,
                Pointer,
                player,
                Game,
            }),
        false
    );

    window.addEventListener(
        "mouseup",
        (e) => onMouseUp({ e, Pointer, player }),
        false
    );

    // for (let i = 0; i < 5; i++) {
    //     Game.enemies.push(
    //         new Enemy({
    //             x: randomInt(Game.canvas.width / 2, Game.canvas.width),
    //             y: randomInt(0, Game.canvas.height),
    //             speed: Math.random() + 0.5,
    //         })
    //     );
    // }

    updateHealthUi({ player });
    updateScoreUi(player);
    updateCashUi({ player });
    updateAmmoUi({ player, Game });
    updateRoundUpdateTimerUi({ Game });
    updateRoundUi({ Game });

    Game.assets.akCrosshair = new Image();
    Game.assets.glockCrosshair = new Image();
    Game.assets.rpgCrosshair = new Image();
    Game.assets.sprite.player = new Image();
    Game.assets.weapons.glock = new Image();
    Game.assets.weapons.ak = new Image();
    Game.assets.weapons.rpg = new Image();
    Game.assets.bullet = new Image();

    load_assets(
        [
            {
                var: Game.assets.akCrosshair,
                url: "assets/cursor/ak_crosshair.png",
            },
            {
                var: Game.assets.glockCrosshair,
                url: "assets/cursor/glock_crosshair.png",
            },
            {
                var: Game.assets.rpgCrosshair,
                url: "assets/cursor/rpg_crosshair.png",
            },
            {
                var: Game.assets.sprite.player,
                url: "assets/sprites/player/player_sprite_no_hands.png",
            },
            {
                var: Game.assets.weapons.ak,
                url: "assets/weapons/AK47.png",
            },
            {
                var: Game.assets.weapons.glock,
                url: "assets/weapons/GLOCK.png",
            },
            {
                var: Game.assets.weapons.rpg,
                url: "assets/weapons/RPG.png",
            },
            {
                var: Game.assets.bullet,
                url: "assets/bullets/bullets.png",
            },
            // { var: mapTileSet, url: "assets/tileset/FG_Cellar_A5.png" },
            // { var: demonImage, url: "assets/enemy/demon.png" },
        ],
        gameLoop
    );

    // gameLoop();
}

const gameLoop = () => {
    const context = Game.context;
    Game.requestId = window.requestAnimationFrame(gameLoop);
    Game.meta.now = Date.now();
    Game.meta.elapsed = Game.meta.now - Game.meta.then;

    if (Game.meta.elapsed <= Game.meta.fpsInterval) {
        return;
    }
    if (Game.state.isPaused && Game.state.onUpgradeMenu) {
        document.querySelector("canvas").style.cursor = "default";
        return;
    }
    if (player.activeWeapon) {
        if (player.activeWeapon instanceof Glock) {
            if (player.activeWeapon.frameX >= 12) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon instanceof AK47) {
            if (player.activeWeapon.frameX >= 12) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon instanceof RPG) {
            if (player.activeWeapon.frameX >= 8) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon.frameX) player.activeWeapon.frameX++;
    }

    updateRoundUpdateTimerUi({ Game });
    if (player.activeWeapon && player.activeWeapon.state.isReloading) {
        updateAmmoUi({ player, Game });
    }

    Game.meta.then =
        Game.meta.now - (Game.meta.elapsed % Game.meta.fpsInterval);

    Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    Game.meta.elapsedFrames += 1;

    // drawBackground()
    drawEnemies({ enemies: Game.enemies, context: Game.context });

    if (player.x + player.size / 2 < Pointer.x) {
        drawPlayer({ player, Game });
        drawLeftWeapon({ player, Game, Pointer });
    } else {
        drawRightWeapon({ player, Game, Pointer });
        drawPlayer({ player, Game });
    }
    drawBullets({ Game });
    drawCursor({ Game, Pointer, player });

    handleKeyPresses({ Game, Keys, player });
    if (player.isShooting) {
        player.shoot({ Pointer, Game });
    }
    if (
        player.autoReload &&
        player.activeWeapon &&
        player.activeWeapon.ammo === 0
    ) {
        player.reloadWeapon({ Game });
    }
    player.update({ Game, Pointer, Keys });

    for (let enemy of Game.enemies) {
        enemy.update({ player, Game });
    }

    updateBullets({ Game });
    handlePhysics({ player });
    handleCollisions({ player, Game });
    handleOutOfCanvas({ player, Game });

    // if (Game.enemies.length === 0) {
    //     increaseRound({ Game });
    // }
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
    document.querySelector("canvas").style.cursor = "default";
}
