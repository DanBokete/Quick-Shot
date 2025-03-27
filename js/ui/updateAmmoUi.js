import Player from "../classes/Player.js";
import { Game } from "../../game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 */
const updateAmmoUi = ({ player, Game }) => {
    const ammoElement = document.getElementById("ammo");
    const { elapsedFrames } = Game.meta;
    const { activeWeapon } = player;
    if (!activeWeapon) return;
    if (activeWeapon.state.isReloading) {
        if (player.autoReload) {
            ammoElement.innerText = `reloading....${-(
                elapsedFrames -
                activeWeapon.lastReloaded -
                (activeWeapon.reloadTime + activeWeapon.autoReloadDelay)
            )}`;
        } else {
            ammoElement.innerText = `reloading....${-(
                elapsedFrames -
                activeWeapon.lastReloaded -
                activeWeapon.reloadTime
            )}`;
        }
    } else {
        ammoElement.innerText = `${activeWeapon.ammo}/${activeWeapon.maxAmmo}`;
    }
};

export default updateAmmoUi;
