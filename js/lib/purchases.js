import { player } from "../../game.js";
import { storeData } from "../entities/storeData.js";
import {
    updateAmmoUi,
    updateCashUi,
    updateHealthUi,
    updateUpgradeWeaponUi,
} from "../ui/uiElements.js";

export const makePurchase = ({ upgradeId = null, weaponId = null }) => {
    if (upgradeId) {
        const item = storeData.upgradesOnSale[upgradeId];
        console.log(player);

        if (player.cash < item.price && !player.unlimitedCash) return;

        console.log("purchase price:", item.price);
        player.cash -= player.unlimitedCash ? 0 : item.price;
        item.upgrade();
        updateCashUi();
    }

    if (weaponId) {
        const item = storeData.weaponsOnSale[weaponId];
        console.log(player);

        if (player.cash < item.price && !player.unlimitedCash) return;

        console.log("purchase price:", item.price);
        player.cash -= player.unlimitedCash ? 0 : item.price;
        item.purchase();
        updateCashUi();
    }
};
