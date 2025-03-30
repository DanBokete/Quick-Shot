import Player from "../entities/Player.js";
import Game from "../entities/Game.js";
import { updateCashUi, updateHealthUi } from "../ui/uiElements.js";

/**
 * Assigning parameter types
 * @param {object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 * @param {number|null} param.purchasedWeaponsId
 */
export const activate = ({ e, Keys, player, Game }) => {
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

    if (Game.state.isPaused && Game.state.onUpgradeMenu) return;

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
        player.reloadWeapon({ Game });
    }

    if (key === " ") {
        player.dash({ Keys });
    }

    if (key === "h") {
        player.unlimitedHealth = !player.unlimitedHealth;
        updateHealthUi({ player });
    }
    if (key === "c") {
        player.unlimitedCash = !player.unlimitedCash;
        updateCashUi({ player });
    }

    const weapons = player.weapons;

    for (let weapon of weapons) {
        if (weapon.key === key) {
            player.changeWeapon({ weapon, Game });
        }
    }

    if (player.weapons) {
        const changeWeaponKeys = player.weapons.map((weapon) => {
            return weapon.key;
        });
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
