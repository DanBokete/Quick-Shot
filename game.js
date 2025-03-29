import Enemy from "./js/classes/Enemy.js";
import Glock from "./js/classes/Glock.js";
import Player from "./js/classes/Player.js";
import drawBullets from "./js/draw/drawBullets.js";
import drawEndLine from "./js/draw/drawEndLine.js";
import drawEnemies from "./js/draw/drawEnemies.js";
import drawPlayer from "./js/draw/drawPlayer.js";
import handleClick from "./js/handle/handleClick.js";
import handleCollisions from "./js/handle/handleCollisions.js";
import handleKeyPresses from "./js/handle/handleKeyPresses.js";
import handleOutOfCanvas from "./js/handle/handleOutOfCanvas.js";
import handlePhysics from "./js/handle/handlePhysics.js";
import increaseRound from "./js/handle/increasRound.js";
import activate from "./js/helpers/keys/activate.js";
import deactivate from "./js/helpers/keys/deactivate.js";
import onMouseUp from "./js/onAction/onMouseUp.js";
import onPointerMove from "./js/onAction/onPointerMove.js";
import updateAmmoUi from "./js/ui/updateAmmoUi.js";
import updateCashUi from "./js/ui/updateCashUi.js";
import updateHealthUi from "./js/ui/updateHealtUi.js";
import updateRoundUpdateTimerUi from "./js/ui/updateRoundTimerUi.js";
import updateRoundUi from "./js/ui/updateRoundUi.js";
import updateScoreUi from "./js/ui/updateScoreUi.js";
import updateBullets from "./js/update/updateBullets.js";
import randomInt from "./js/utils/randomInt.js";
import load_assets from "./js/helpers/load_assets.js";
import drawCursor from "./js/draw/drawCursor.js";

document.addEventListener("DOMContentLoaded", init, false);

export const Game = {
    canvas: null,
    context: null,
    requestId: null,
    round: {
        number: 0,
        startTime: 0,
        timeLimit: 100,
    },
    bullets: [],
    enemyBullets: [],
    enemies: [],
    meta: {
        then: null,
        elapsed: null,
        elapsedFrames: 0,
        fpsInterval: 1000 / 30,
        fps: 30,
        now: null,
    },
    endLine: {
        width: 100,
        colour: "#828282",
    },
    state: {
        isPaused: false,
        onUpgradeMenu: true,
    },
    purchasedWeaponsId: [],
    assets: {
        akCrosshair: null,
        glockCrosshair: null,
        rpgCrosshair: null,
    },
};

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

    Game.assets.akCrosshair = new Image();
    Game.assets.glockCrosshair = new Image();
    Game.assets.rpgCrosshair = new Image();

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
            // {
            //     var: PlayerSpriteImage,
            //     url: "assets/player/player_sprite_no_hands.png",
            // },
            // {
            //     var: assaultRifleImage,
            //     url: "assets/weapons/AK47.png",
            // },
            // {
            //     var: glockImage,
            //     url: "assets/weapons/GLOCK.png",
            // },
            // {
            //     var: rpgImage,
            //     url: "assets/weapons/RPG.png",
            // },
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
    updateRoundUpdateTimerUi({ Game });
    if (player.activeWeapon && player.activeWeapon.state.isReloading) {
        updateAmmoUi({ player, Game });
    }

    Game.meta.then =
        Game.meta.now - (Game.meta.elapsed % Game.meta.fpsInterval);

    Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    Game.meta.elapsedFrames += 1;

    // drawings
    // drawBackground()
    // drawEndLine(Game);
    drawPlayer({ player, context: Game.context });
    drawEnemies({ enemies: Game.enemies, context: Game.context });
    drawBullets({ Game });
    drawCursor({ Game, Pointer, player });

    handleKeyPresses({ Keys, player });
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
    player.update({ Game });

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
};
