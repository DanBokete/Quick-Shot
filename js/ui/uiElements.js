import Player from "../entities/Player.js";
import Game from "../entities/Game.js";
import Glock from "../entities/Glock.js";
import AK47 from "../entities/Ak47.js";
import RPG from "../entities/RPG.js";
import { player } from "../../game.js";
import { storeData } from "../entities/storeData.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 */
export const updateAmmoUi = () => {
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

export const updateCashUi = () => {
    const { cash } = player;
    const scoreElement = document.getElementById("cash");
    scoreElement.innerHTML = `Cash: ${player.unlimitedCash ? "&infin;" : cash}`;
};

export const updateHealthUi = () => {
    const { health, maxHealth } = player;
    const healthContainerElement = document.getElementById("healthContainer");
    const healthElement = document.getElementById("health");
    healthElement.innerHTML = `${
        player.unlimitedHealth ? "&infin;" : health
    }/${maxHealth}`;
    healthElement.style.width = `${(health / maxHealth) * 100}%`;

    if (health <= 2 && !player.unlimitedHealth) {
        healthContainerElement.classList.add("shake");
        healthElement.classList.add("shake");
        healthElement.style.backgroundColor = "darkRed";
    } else {
        healthContainerElement.classList.remove("shake");
        healthContainerElement.classList.remove("low-health");
        healthElement.classList.remove("shake");
        healthElement.classList.remove("low-health");
        healthElement.style.backgroundColor = "darkGreen";
    }
};

export const updateRoundUpdateTimerUi = ({ Game }) => {
    const { startTime, timeLimit } = Game.round;
    const { elapsedFrames, fps } = Game.meta;
    const roundTimerElement = document.getElementById("roundTimer");

    const remainingTime = -Math.ceil(
        Game.meta.elapsedFrames / Game.meta.fps -
            (Game.round.startTime / Game.meta.fps + Game.round.timeLimit)
    );

    roundTimerElement.innerText = `Next wave: ${remainingTime}s`;
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
export const updateRoundUi = ({ Game }) => {
    const { round } = Game;
    const scoreElement = document.getElementById("round");
    scoreElement.innerText = `Round: ${round.number}`;
};

export const updateScoreUi = ({ score }) => {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${score}`;
};

export const updateWeaponUi = ({ weapon }) => {
    const glockImage = document.getElementById("glock").firstElementChild;
    const ak47Image = document.getElementById("ak47").firstElementChild;
    const rpgImage = document.getElementById("rpg").firstElementChild;
    console.log(glockImage);

    const { name } = weapon;
    const activeWeaponElement = document.getElementById("activeWeapon");
    activeWeaponElement.innerText = name;

    for (weapon of player.weapons) {
        if (weapon instanceof Glock)
            glockImage.classList.add("unlocked-weapon");
        if (weapon instanceof AK47) ak47Image.classList.add("unlocked-weapon");
        if (weapon instanceof RPG) rpgImage.classList.add("unlocked-weapon");
    }

    glockImage.classList.remove("active-weapon");
    ak47Image.classList.remove("active-weapon");
    rpgImage.classList.remove("active-weapon");

    if (weapon instanceof Glock) glockImage.classList.add("active-weapon");
    if (weapon instanceof AK47) ak47Image.classList.add("active-weapon");
    if (weapon instanceof RPG) rpgImage.classList.add("active-weapon");
};

export const updateUpgradeWeaponUi = () => {
    const upgrades = document.querySelectorAll(`[data-upgrade-id]`);

    for (let i = 0; i < upgrades.length; i++) {
        upgrades[i].lastElementChild.innerText = `${
            storeData.upgradesOnSale[i + 1]["title"]
        } ${
            player.cash < storeData.upgradesOnSale[i + 1]["price"] &&
            !player.unlimitedCash
                ? ""
                : `Cost:${storeData.upgradesOnSale[i + 1]["price"]}`
        }`;

        if (
            player.cash < storeData.upgradesOnSale[i + 1]["price"] &&
            !player.unlimitedCash
        ) {
            upgrades[i].firstElementChild.innerText =
                storeData.upgradesOnSale[i + 1]["price"];

            upgrades[i].firstElementChild.disabled = true;
        } else {
            upgrades[i].firstElementChild.innerText = "";
        }
    }
};
