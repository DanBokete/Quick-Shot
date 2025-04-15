import { game, player, sfx } from "../../game.js";
import { storeData } from "../entities/storeData.js";
import {
    updateCashUi,
    updateHealthUi,
    updateScoreUi,
    updateUpgradeWeaponUi,
} from "../ui/uiElements.js";

// Handles updating player's stats && ui
export const handlePlayerDamage = ({ obj }) => {
    if (!obj.damage) {
        return console.error(
            "Object causing damage does not have a damage attribute"
        );
    }

    console.log(obj);

    if (obj.blind) {
        player.blind = game.meta.elapsedFrames + obj.blind;
    }

    updatePlayerHealth({ health: -obj.damage });
    updateHealthUi();

    if (!player.unlimitedHealth) sfx.playPlayerHit();
};

export const updatePlayerScore = ({ score }) => {
    player.score += score;
    updateScoreUi();
};

export const updatePlayerCash = ({ cash }) => {
    if (player.unlimitedCash) return;
    player.cash += cash;
    updateCashUi();
};

export const updateStoreData = ({ weapon }) => {
    console.log(weapon);
    console.log(weapon.ammoPrice);

    storeData.upgradesOnSale[1].price = weapon.ammoPrice;
    storeData.upgradesOnSale[2].price = weapon.fireRatePrice;
    storeData.upgradesOnSale[3].price = weapon.reloadTimePrice;
};

export const updatePlayerHealth = ({ health = null, maxHealth = null }) => {
    if (player.unlimitedHealth) return;

    if (health) {
        player.health += health;
    }

    if (maxHealth) {
        const health = maxHealth;
        player.health += Math.min(health, maxHealth);
        player.maxHealth += health;
    }

    updateHealthUi();
};
