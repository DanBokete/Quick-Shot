import { player } from "../../game.js";
import { storeData } from "../entities/storeData.js";
import { updatePlayerCash } from "../helpers/helpers.js";
import { updateUpgradeWeaponUi } from "../ui/uiElements.js";

export const makePurchase = ({ upgradeId = null, weaponId = null }) => {
    if (upgradeId) {
        const item = storeData.upgradesOnSale[upgradeId];

        if (player.cash < item.price && !player.unlimitedCash) return;

        updatePlayerCash({ cash: -item.price });
        item.upgrade();
        updateUpgradeWeaponUi();
    }

    if (weaponId) {
        const item = storeData.weaponsOnSale[weaponId];
        if (player.cash < item.price && !player.unlimitedCash) return;
        updatePlayerCash({ cash: -item.price });
        item.purchase();
    }
};
