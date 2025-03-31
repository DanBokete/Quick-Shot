import Player from "../entities/Player.js";
import Game from "../entities/Game.js";
import AK47 from "../entities/Ak47.js";
import Glock from "../entities/Glock.js";
import RPG from "../entities/RPG.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateHealthUi,
} from "../ui/uiElements.js";
import upgradeMenuUi from "../ui/storeUi.js";
import { makePurchase } from "./purchases.js";

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

/**
 *
 * @param {object} param
 * @param {Player} param.player
 * @param {MouseEvent} param.e
 * @param {Game} param.Game
 * @returns
 */
export const handleClick = ({ e, Pointer, player, Game }) => {
    const upgradeMenuBtn = document.getElementById("upgradeMenu");
    const rightElement = document.getElementById("right");
    const closeBtn = document.getElementById("close");

    // if (e.target === upgradeMenuBtn) {
    //     Game.state.isPaused = true;
    //     Game.state.onUpgradeMenu = true;
    //     upgradeMenuUi({ Game, player });
    //     return;
    // }

    // if (e.target === closeBtn) {
    //     Game.state.isPaused = false;
    //     Game.state.onUpgradeMenu = false;
    //     upgradeMenuUi({ Game, player });
    //     return;
    // }

    // handle purchases

    if (
        player.activeWeapon &&
        (e.target.closest(".upgrade") || e.target.matches(".upgrade"))
    ) {
        const upgradeId =
            e.target.dataset.upgradeId ??
            e.target.parentElement.dataset.upgradeId;
        makePurchase({ upgradeId });
        return;
        // const weaponsOnSale = document.querySelectorAll("[data-weapon-id]");

        // weaponsOnSale.forEach((weaponBtn) => {
        //     if (e.target === weaponBtn) {
        //         const price = player.unlimitedCash
        //             ? 0
        //             : weaponBtn.dataset.price;
        //         const weaponId = Number(weaponBtn.dataset.weaponId);
        //         if (
        //             player.cash >= price &&
        //             (weaponId === 1 || weaponId === 2 || weaponId === 3)
        //         ) {
        //             console.log(weaponId);

        //             if (1 === weaponId) {
        //                 const image = Game.assets.weapons.glock;

        //                 const weapon = new Glock({ image });
        //                 player.addWeapon({ weapon, Game });
        //                 Game.purchasedWeaponsId.push(weaponId);

        //                 weaponBtn.disabled = true;
        //             } else if (2 === weaponId) {
        //                 const image = Game.assets.weapons.ak;
        //                 const weapon = new AK47({ image });
        //                 player.addWeapon({ weapon, Game });
        //                 Game.purchasedWeaponsId.push(weaponId);

        //                 weaponBtn.disabled = true;
        //             } else if (3 === weaponId) {
        //                 const image = Game.assets.weapons.rpg;
        //                 const weapon = new RPG({ image });
        //                 player.addWeapon({ weapon, Game });
        //                 Game.purchasedWeaponsId.push(weaponId);

        //                 weaponBtn.disabled = true;
        //             }
        //             player.cash -= player.unlimitedCash ? 0 : price;
        //             updateCashUi({ player });
        //         }
        //     }
        // });

        // const upgradesOnSale = document.querySelectorAll("[data-upgrade-id]");

        // upgradesOnSale.forEach((upgradeBtn) => {
        //     if (e.target === upgradeBtn) {
        //         const price = player.unlimitedCash
        //             ? 0
        //             : Number(upgradeBtn.dataset.price);
        //         const upgradeId = Number(upgradeBtn.dataset.upgradeId);
        //         console.log("almost");
        //         console.log(price);

        //         if (player.cash >= price) {
        //             console.log("here");

        //             if (1 === upgradeId) {
        //                 player.activeWeapon.maxAmmo += 5;
        //                 player.activeWeapon.ammo += 5;

        //                 player.cash -= price;
        //                 updateAmmoUi({ player, Game });
        //                 updateCashUi({ player });
        //             }

        //             if (upgradeId === 2) {
        //                 player.activeWeapon.fireDelay *= 0.95;

        //                 player.cash -= price;
        //                 updateCashUi({ player });
        //             }

        //             if (upgradeId === 4) {
        //                 const healthUpgrade = 5;
        //                 player.maxHealth += healthUpgrade;
        //                 player.health += healthUpgrade;

        //                 player.cash -= price;
        //                 updateHealthUi({ player });
        //                 updateCashUi({ player });
        //             }
        //         }
        //     }
        // });

        // return;
    }

    player.isShooting = true;
    player.shoot({ Pointer, Game });
};
