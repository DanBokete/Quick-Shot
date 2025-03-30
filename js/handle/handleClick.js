import AK47 from "../entities/Ak47.js";
import Glock from "../entities/Glock.js";
import Player from "../entities/Player.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateHealthUi,
} from "../ui/uiElements.js";
import upgradeMenuUi from "../ui/storeUi.js";
import Game from "../entities/Game.js";
import RPG from "../entities/RPG.js";

/**
 *
 * @param {object} param
 * @param {Player} param.player
 * @param {MouseEvent} param.e
 * @param {Game} param.Game
 * @returns
 */
const handleClick = ({ e, Pointer, player, Game }) => {
    const upgradeMenuBtn = document.getElementById("upgradeMenu");
    const closeBtn = document.getElementById("close");

    if (e.target === upgradeMenuBtn) {
        Game.state.isPaused = true;
        Game.state.onUpgradeMenu = true;
        upgradeMenuUi({ Game, player });
        return;
    }

    if (e.target === closeBtn) {
        Game.state.isPaused = false;
        Game.state.onUpgradeMenu = false;
        upgradeMenuUi({ Game, player });
        return;
    }

    // handle purchases
    if (Game.state.isPaused && Game.state.onUpgradeMenu) {
        const weaponsOnSale = document.querySelectorAll("[data-weapon-id]");

        weaponsOnSale.forEach((weaponBtn) => {
            if (e.target === weaponBtn) {
                const price = player.unlimitedCash
                    ? 0
                    : weaponBtn.dataset.price;
                const weaponId = Number(weaponBtn.dataset.weaponId);
                if (
                    player.cash >= price &&
                    (weaponId === 1 || weaponId === 2 || weaponId === 3)
                ) {
                    console.log(weaponId);

                    if (1 === weaponId) {
                        const image = Game.assets.weapons.glock;

                        const weapon = new Glock({ image });
                        player.addWeapon({ weapon, Game });
                        Game.purchasedWeaponsId.push(weaponId);

                        weaponBtn.disabled = true;
                    } else if (2 === weaponId) {
                        const image = Game.assets.weapons.ak;
                        const weapon = new AK47({ image });
                        player.addWeapon({ weapon, Game });
                        Game.purchasedWeaponsId.push(weaponId);

                        weaponBtn.disabled = true;
                    } else if (3 === weaponId) {
                        const image = Game.assets.weapons.rpg;
                        const weapon = new RPG({ image });
                        player.addWeapon({ weapon, Game });
                        Game.purchasedWeaponsId.push(weaponId);

                        weaponBtn.disabled = true;
                    }
                    player.cash -= player.unlimitedCash ? 0 : price;
                    updateCashUi({ player });
                }
            }
        });

        const upgradesOnSale = document.querySelectorAll("[data-upgrade-id]");

        upgradesOnSale.forEach((upgradeBtn) => {
            if (e.target === upgradeBtn) {
                const price = player.unlimitedCash
                    ? 0
                    : Number(upgradeBtn.dataset.price);
                const upgradeId = Number(upgradeBtn.dataset.upgradeId);
                console.log("almost");
                console.log(price);

                if (player.cash >= price) {
                    console.log("here");

                    if (1 === upgradeId) {
                        player.activeWeapon.maxAmmo += 5;
                        player.activeWeapon.ammo += 5;

                        player.cash -= price;
                        updateAmmoUi({ player, Game });
                        updateCashUi({ player });
                    }

                    if (upgradeId === 2) {
                        player.activeWeapon.fireDelay *= 0.95;

                        player.cash -= price;
                        updateCashUi({ player });
                    }

                    if (upgradeId === 4) {
                        const healthUpgrade = 5;
                        player.maxHealth += healthUpgrade;
                        player.health += healthUpgrade;

                        player.cash -= price;
                        updateHealthUi({ player });
                        updateCashUi({ player });
                    }
                }
            }
        });

        return;
    }

    player.isShooting = true;
    player.shoot({ Pointer, Game });
};

export default handleClick;
