import Player from "../entities/Player.js";
import { game, resetGame, sfx } from "../../game.js";
import AK47 from "../entities/ak47.js";
import Glock from "../entities/Glock.js";
import RPG from "../entities/RPG.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateDashUi,
    updateHealthUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import upgradeMenuUi from "../ui/storeUi.js";
import { makePurchase } from "./purchases.js";

/**
 * Assigning parameter types
 * @param {object} param
 * @param {Player} param.player
 * @param {number|null} param.purchasedWeaponsId
 */
export const activate = ({ e, Keys, player }) => {
    const key = e.key;

    if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight" ||
        key === " "
    ) {
        e.preventDefault();
    }

    if (game.state.isPaused && game.state.onUpgradeMenu) return;

    if (key === "w") {
        Keys.moveUp = true;
    }
    if (key === "s") {
        Keys.moveDown = true;
    }
    if (key === "a") {
        Keys.moveLeft = true;
    }
    if (key === "d") {
        Keys.moveRight = true;
    }
    if (key === "r") {
        player.reloadWeapon({ game });
    }

    if (key === " ") {
        player.dash({ Keys });
    }

    if (key === "h") {
        player.unlimitedHealth = !player.unlimitedHealth;
        player.cheated = true;
        updateHealthUi({ player });
    }
    if (key === "c") {
        player.unlimitedCash = !player.unlimitedCash;
        player.cheated = true;
        updateCashUi({ player });
    }
    if (key === "l") {
        player.unlimitedDash = !player.unlimitedDash;
        player.cheated = true;
        updateDashUi({ player });
    }
    if (key === "v") {
        makePurchase({ upgradeId: 1 });
    }
    if (key === "b") {
        makePurchase({ upgradeId: 2 });
    }
    if (key === "n") {
        makePurchase({ upgradeId: 3 });
    }
    if (key === "m") {
        makePurchase({ upgradeId: 4 });
    }

    if (key === "Enter") {
        resetGame();
    }

    if (key === "0") {
        sfx.disableBackgroundMusic = !sfx.disableBackgroundMusic;

        if (sfx.disableBackgroundMusic) {
            sfx.backgroundMusic.volume = 0;
        } else {
            sfx.playBackgroundMusic();
        }
    }

    const weapons = player.weapons;
    let HAS_WEAPON = false;

    for (let weapon of weapons) {
        if (weapon.key === key) {
            player.changeWeapon({ weapon });
            HAS_WEAPON = true;
        }
    }
    if (!HAS_WEAPON && (key === "1" || key === "2" || key === "3")) {
        makePurchase({ weaponId: key });
    }
};

export const deactivate = ({ e, Keys }) => {
    const key = e.key;

    if (key === "w") {
        Keys.moveUp = false;
    }
    if (key === "s") {
        Keys.moveDown = false;
    }
    if (key === "a") {
        Keys.moveLeft = false;
    }
    if (key === "d") {
        Keys.moveRight = false;
    }
};
