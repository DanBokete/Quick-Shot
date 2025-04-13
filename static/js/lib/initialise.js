import { gameLoop, Keys, player, Pointer, sfx } from "../../game.js";
import { game } from "../../game.js";
import Glock from "../entities/Glock.js";
import { storeData } from "../entities/storeData.js";
import onPointerMove from "../handle/onPointerMove.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateHealthUi,
    updateRoundUi,
    updateRoundUpdateTimerUi,
    updateScoreUi,
    updateUpgradeWeaponUi,
} from "../ui/uiElements.js";
import { activate, deactivate } from "./inputs.js";
import load_assets from "./load_assets.js";

export function init() {
    game.canvas = document.querySelector("canvas");
    game.context = game.canvas.getContext("2d");

    player.x = 250;
    player.y = 250;

    Pointer.x = player.x + player.width * 2;
    Pointer.y = player.y;
    storeData.upgradesOnSale[4].price = 0;

    initialiseUi();

    game.assets.akCrosshair = new Image();
    game.assets.glockCrosshair = new Image();
    game.assets.rpgCrosshair = new Image();
    game.assets.sprite.player = new Image();
    game.assets.weapons.glock = new Image();
    game.assets.weapons.ak = new Image();
    game.assets.weapons.rpg = new Image();
    game.assets.bullet = new Image();
    game.assets.backgroundImage = new Image();
    game.assets.enemies.demonImage = new Image();
    game.assets.enemies.batImage = new Image();
    game.assets.enemies.sprayerImage = new Image();
    game.assets.fx.explosion = new Image();

    sfx.explosion = new Audio();
    sfx.achievement = new Audio();
    sfx.gunshot = new Audio();
    sfx.ak47Shot = new Audio();
    sfx.enemyHit = new Audio();
    sfx.playerHit = new Audio();
    sfx.rocketShot = new Audio();

    player.addWeapon({
        game,
        weapon: new Glock({ image: game.assets.weapons.glock }),
    });

    load_assets(
        [
            {
                var: game.assets.akCrosshair,
                url: "/static/assets/cursor/ak_crosshair.png",
            },
            {
                var: game.assets.glockCrosshair,
                url: "/static/assets/cursor/glock_crosshair.png",
            },
            {
                var: game.assets.rpgCrosshair,
                url: "/static/assets/cursor/rpg_crosshair.png",
            },
            {
                var: game.assets.sprite.player,
                url: "/static/assets/sprites/player/player_sprite_no_hands.png",
            },
            {
                var: game.assets.weapons.ak,
                url: "/static/assets/weapons/AK47.png",
            },
            {
                var: game.assets.weapons.glock,
                url: "/static/assets/weapons/GLOCK.png",
            },
            {
                var: game.assets.weapons.rpg,
                url: "/static/assets/weapons/RPG.png",
            },
            {
                var: game.assets.bullet,
                url: "/static/assets/bullets/bullets.png",
            },
            {
                var: game.assets.backgroundImage,
                url: "/static/assets/tileset/background.png",
            },
            {
                var: game.assets.enemies.demonImage,
                url: "/static/assets/sprites/enemy/demon.png",
            },
            {
                var: game.assets.enemies.batImage,
                url: "/static/assets/sprites/enemy/bat.png",
            },
            {
                var: game.assets.enemies.sprayerImage,
                url: "/static/assets/sprites/enemy/sprayer.png",
            },
            {
                var: game.assets.fx.explosion,
                url: "/static/assets/fx/explosion.png",
            },

            {
                var: sfx.explosion,
                url: "static/assets/sfx/explosion.mp3",
            },
            {
                var: sfx.achievement,
                url: "static/assets/sfx/achievement.mp3",
            },
            {
                var: sfx.gunshot,
                url: "static/assets/sfx/gunshot.mp3",
            },
            {
                var: sfx.ak47Shot,
                url: "static/assets/sfx/ak-47-shot.mp3",
            },
            {
                var: sfx.playerHit,
                url: "static/assets/sfx/player-hit.mp3",
            },
            {
                var: sfx.enemyHit,
                url: "static/assets/sfx/enemy-hit.mp3",
            },
            {
                var: sfx.rocketShot,
                url: "static/assets/sfx/rocketshot.mp3",
            },
        ],
        gameLoop
    );
}

const initialiseUi = () => {
    updateHealthUi();
    updateScoreUi();
    updateCashUi();
    updateAmmoUi();
    updateRoundUpdateTimerUi();
    updateRoundUi();
    updateUpgradeWeaponUi();
};

export function initialiseEventListeners() {
    document.addEventListener(
        "keydown",
        (e) => activate({ e, Keys, player, game }),
        false
    );
    document.addEventListener("keyup", (e) => deactivate({ e, Keys }), false);

    document.addEventListener(
        "pointermove",
        (e) => onPointerMove({ e, Pointer, player, game }),
        false
    );

    document.addEventListener("click", function () {
        if (game.meta.elapsedFrames) {
            player.shoot();
        }
        document.body.requestPointerLock();
    });

    document.addEventListener(
        "mousedown",
        () => (player.isShooting = true),
        false
    );

    window.addEventListener(
        "mouseup",
        (e) => (player.isShooting = false),
        false
    );
}
