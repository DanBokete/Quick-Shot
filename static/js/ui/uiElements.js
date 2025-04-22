import Player from "../entities/Player.js";
import { game } from "../../game.js";
import Glock from "../entities/Glock.js";
import AK47 from "../entities/ak47.js";
import RPG from "../entities/RPG.js";
import { player } from "../../game.js";
import { storeData } from "../entities/storeData.js";
import Creeper from "../entities/Creeper.js";
import Sprayer from "../entities/Sprayer.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {game} param.game
 */
export const updateAmmoUi = () => {
    const ammoElement = document.getElementById("ammo");
    const { elapsedFrames } = game.meta;
    const { activeWeapon } = player;

    if (!activeWeapon) return;
    if (activeWeapon.state.isReloading) {
        if (player.autoReload) {
            ammoElement.innerText = `reloading....${-(
                Math.ceil(
                    ((elapsedFrames -
                        activeWeapon.lastReloaded -
                        (activeWeapon.reloadTime +
                            activeWeapon.autoReloadDelay)) /
                        game.meta.fps) *
                        100
                ) / 100
            )}s`;
        } else {
            ammoElement.innerText = `reloading....${-(
                (Math.floor(
                    (elapsedFrames -
                        activeWeapon.lastReloaded -
                        activeWeapon.reloadTime) /
                        game.meta.fps
                ) *
                    100) /
                100
            )}s`;
        }
    } else {
        ammoElement.innerText = `${activeWeapon.ammo}/${activeWeapon.maxAmmo}`;
    }
};

export const updateCashUi = () => {
    const { cash } = player;
    const scoreElement = document.getElementById("cash");
    scoreElement.innerHTML = `Cash: ${player.unlimitedCash ? "&infin;" : cash}`;
    updateWeaponUi();
    updateUpgradeWeaponUi();
};

export const updateHealthUi = () => {
    const { health, maxHealth } = player;
    const healthContainerElement = document.getElementById("healthContainer");
    const healthElement = document.getElementById("health");
    healthElement.innerHTML = `${
        player.unlimitedHealth ? "&infin;" : health
    }/${maxHealth}`;
    healthElement.style.width = `${(health / maxHealth) * 100}%`;

    if (
        health <= 2 &&
        !player.unlimitedHealth &&
        player.health !== player.maxHealth
    ) {
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

export const updateRoundUpdateTimerUi = () => {
    const { startTime, timeLimit } = game.round;
    const { elapsedFrames, fps } = game.meta;
    const roundTimerElement = document.getElementById("roundTimer");

    const remainingTime = -Math.ceil(
        game.meta.elapsedFrames / game.meta.fps -
            (game.round.startTime / game.meta.fps + game.round.timeLimit)
    );

    roundTimerElement.innerText = `Next wave: ${remainingTime}s`;
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {game} param.game
 */
export const updateRoundUi = () => {
    const { round } = game;
    const scoreElement = document.getElementById("round");
    scoreElement.innerText = `Round: ${round.number}`;
};

export const updateScoreUi = () => {
    const { score } = player;
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${score}`;
};

export const updateWeaponUi = () => {
    const glockBtn = document.getElementById("glock");
    const ak47Btn = document.getElementById("ak47");
    const rpgBtn = document.getElementById("rpg");

    // const { name } = weapon;
    const activeWeaponElement = document.getElementById("activeWeapon");

    const activeWeapon = player.activeWeapon ?? null;
    const { elapsedFrames } = game.meta;

    if (activeWeapon) {
        const reloadTime =
            Math.ceil((activeWeapon.reloadTime / game.meta.fps) * 100) / 100;
        activeWeaponElement.innerText = `Reload Time:${reloadTime}s Fire Rate:${
            Math.ceil((activeWeapon.fireDelay / game.meta.fps) * 100) / 100
        }bullets/s`;
    }

    glockBtn.firstElementChild.innerText = storeData.weaponsOnSale[1].price;
    ak47Btn.firstElementChild.innerText = storeData.weaponsOnSale[2].price;
    rpgBtn.firstElementChild.innerText = storeData.weaponsOnSale[3].price;

    glockBtn.firstElementChild.classList.remove("can-purchase");
    ak47Btn.firstElementChild.classList.remove("can-purchase");
    rpgBtn.firstElementChild.classList.remove("can-purchase");

    if (
        player.cash >= storeData.weaponsOnSale[1].price ||
        player.unlimitedCash
    ) {
        glockBtn.firstElementChild.classList.add("can-purchase");
    }
    if (
        player.cash >= storeData.weaponsOnSale[2].price ||
        player.unlimitedCash
    ) {
        ak47Btn.firstElementChild.classList.add("can-purchase");
    }
    if (
        player.cash >= storeData.weaponsOnSale[3].price ||
        player.unlimitedCash
    ) {
        rpgBtn.firstElementChild.classList.add("can-purchase");
    }

    glockBtn.classList.remove("unlocked-weapon");
    ak47Btn.classList.remove("unlocked-weapon");
    rpgBtn.classList.remove("unlocked-weapon");

    glockBtn.firstElementChild.classList.remove("hide");
    ak47Btn.firstElementChild.classList.remove("hide");
    rpgBtn.firstElementChild.classList.remove("hide");

    for (let weapon of player.weapons) {
        if (weapon instanceof Glock) {
            glockBtn.classList.add("unlocked-weapon");
            glockBtn.firstElementChild.classList.add("hide");
        } else if (weapon instanceof AK47) {
            ak47Btn.classList.add("unlocked-weapon");
            ak47Btn.firstElementChild.classList.add("hide");
        } else if (weapon instanceof RPG) {
            rpgBtn.classList.add("unlocked-weapon");
            rpgBtn.firstElementChild.classList.add("hide");
        }
    }

    glockBtn.classList.remove("active-weapon");
    ak47Btn.classList.remove("active-weapon");
    rpgBtn.classList.remove("active-weapon");

    if (player.activeWeapon instanceof Glock)
        glockBtn.classList.add("active-weapon");
    else if (player.activeWeapon instanceof AK47)
        ak47Btn.classList.add("active-weapon");
    else if (player.activeWeapon instanceof RPG)
        rpgBtn.classList.add("active-weapon");
};

export const updateUpgradeWeaponUi = () => {
    const rightElement = document.querySelector("#right");
    let html = ``;
    const itemsIdOnSale = Object.keys(storeData.upgradesOnSale);
    const weapon = player.activeWeapon;
    itemsIdOnSale.forEach((id) => {
        const item = storeData.upgradesOnSale[id];

        const isPriceVisible =
            item.price > player.cash && !player.unlimitedCash;
        html += `
        <button class="upgrade ${
            isPriceVisible ? "disable-purchase" : ""
        }" data-upgrade-id="${id}">
            <div>$${item.price}</div>
            <div class="upgrade-shortcut">${item.shortCut}</div>
            <div class="upgrade-title">${item.title}</div>
        </button>`;
    });
    rightElement.innerHTML = html;
};

export const updateEndGameUi = () => {
    const endGameElement = document.getElementById("endGameContainer");

    if (player.health > 0) {
        endGameElement.style.display = "none";
    } else {
        endGameElement.innerHTML = `
            <p>Click "Enter" to play new game.</p> 
            <p>You scored: ${player.score}</p> 
            <p>Click "y" to continue playing the game, but progress made will not be saved</p>`;
        endGameElement.style.display = "flex";
    }
};

export const updatePauseGameUi = () => {
    const pauseGameElement = document.getElementById("pauseGameContainer");

    if (!game.state.isPaused) {
        pauseGameElement.style.display = "none";
    } else {
        pauseGameElement.innerHTML = `
            
            <p>The game is currently paused.</p> 
            <p>Current Score: ${player.score}</p> 
            <p>Current Cash: ${player.cash}</p> 
            <p>Click "p" to unpause the game</p>
            <p>Cheated: ${player.cheated ? "Yes" : "No"}</p>
            <p>Click "Enter" to play new game.</p> 
            `;
        pauseGameElement.style.display = "flex";
    }
};

export const updateDashUi = () => {
    const dashForceElement = document.getElementById("dashForce");

    if (!player.unlimitedDash) {
        dashForceElement.style.backgroundColor = "blue";
        dashForceElement.style.height = `${
            (player.dashForce / player.maxDashForce) * 100
        }%`;
    } else {
        dashForceElement.style.backgroundColor = "orange";
        dashForceElement.style.height = "100%";
    }

    if (!player.unlimitedDash && player.dashForce === player.maxDashForce) {
        dashForceElement.style.backgroundColor = "purple";
    }
};
