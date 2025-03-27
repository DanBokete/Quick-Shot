import AK47 from "../classes/Ak47.js";
import Glock from "../classes/Glock.js";
import Player from "../classes/Player.js";
import updateAmmoUi from "../ui/updateAmmoUi.js";
import updateCashUi from "../ui/updateCashUi.js";
import upgradeMenuUi from "../ui/upgradeMenuUi.js";
import { Game } from "../../game.js";

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
        upgradeMenuUi(Game);
        return;
    }

    if (e.target === closeBtn) {
        Game.state.isPaused = false;
        Game.state.onUpgradeMenu = false;
        upgradeMenuUi(Game);
        return;
    }

    // handle purchases
    if (Game.state.isPaused && Game.state.onUpgradeMenu) {
        const weaponsOnSale = document.querySelectorAll("[data-weapon-id]");

        weaponsOnSale.forEach((weaponBtn) => {
            if (e.target === weaponBtn) {
                const price = weaponBtn.dataset.price;
                const weaponId = Number(weaponBtn.dataset.weaponId);
                if (player.cash >= price) {
                    console.log(weaponId);

                    if (1 === weaponId) {
                        player.addWeapon({ weapon: new Glock(), Game });
                        Game.purchasedWeaponsId.push(weaponId);

                        weaponBtn.disabled = true;

                        player.cash -= price;
                    } else if (2 === weaponId) {
                        player.addWeapon({ weapon: new AK47(), Game });
                        Game.purchasedWeaponsId.push(weaponId);

                        weaponBtn.disabled = true;

                        player.cash -= price;
                    }
                    updateCashUi({ player });
                }
            }
        });

        return;
    }

    player.isShooting = true;
    player.shoot({ Pointer, Game });
};

export default handleClick;
