import { gameLoop, Keys, player, Pointer } from "../../game.js";
import Game from "../entities/Game.js";
import Glock from "../entities/Glock.js";
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
    Game.canvas = document.querySelector("canvas");
    Game.context = Game.canvas.getContext("2d");

    player.x = 250;
    player.y = 250;

    document.addEventListener(
        "keydown",
        (e) => activate({ e, Keys, player, Game }),
        false
    );
    document.addEventListener("keyup", (e) => deactivate({ e, Keys }), false);

    document.addEventListener(
        "pointermove",
        (e) => onPointerMove({ e, Pointer, player, Game }),
        false
    );

    document.addEventListener("click", function () {
        if (Game.state) {
            player.shoot();
        }
        document.body.requestPointerLock();
        Game.state = true;
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

    initialiseUi();

    Game.assets.akCrosshair = new Image();
    Game.assets.glockCrosshair = new Image();
    Game.assets.rpgCrosshair = new Image();
    Game.assets.sprite.player = new Image();
    Game.assets.weapons.glock = new Image();
    Game.assets.weapons.ak = new Image();
    Game.assets.weapons.rpg = new Image();
    Game.assets.bullet = new Image();
    Game.assets.backgroundImage = new Image();
    Game.assets.enemies.demonImage = new Image();

    player.addWeapon({
        Game,
        weapon: new Glock({ image: Game.assets.weapons.glock }),
    });

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
            {
                var: Game.assets.backgroundImage,
                url: "assets/tileset/background.png",
            },
            {
                var: Game.assets.enemies.demonImage,
                url: "assets/sprites/enemy/demon.png",
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
