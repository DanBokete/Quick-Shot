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
    const gameContainerElement = document.getElementById("gameContainer");
    if (!obj.damage) {
        return console.error(
            "Object causing damage does not have a damage attribute"
        );
    }

    const temp = () => {
        gameContainerElement.removeEventListener("animationend", temp, false);
        gameContainerElement.classList.remove("flash");
    };

    // gameContainerElement.classList.remove("flash");
    if (!gameContainerElement.classList.contains("flash")) {
        gameContainerElement.classList.add("flash");

        gameContainerElement.addEventListener("animationend", temp, false);
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

    if (maxHealth) {
        const health = maxHealth;
        player.health += Math.min(health, maxHealth);
        player.maxHealth += health;
    }
    if (health) {
        player.health = Math.min(health + player.health, player.maxHealth);
    }

    updateHealthUi();
};
