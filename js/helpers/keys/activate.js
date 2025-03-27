import Player from "../../classes/Player.js";
import { Game } from "../../../game.js";
/**
 * Assigning parameter types
 * @param {object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 * @param {number|null} param.purchasedWeaponsId
 */
const activate = ({ e, Keys, player, Game }) => {
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

export default activate;
