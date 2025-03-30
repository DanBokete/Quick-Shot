import Player from "../entities/Player.js";
import Game from "../entities/Game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 */
export const updateAmmoUi = ({ player, Game }) => {
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

export const updateCashUi = ({ player }) => {
    const { cash } = player;
    const scoreElement = document.getElementById("cash");
    scoreElement.innerHTML = `Cash: ${player.unlimitedCash ? "&infin;" : cash}`;
};

export const updateHealthUi = ({ player }) => {
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
    const { name } = weapon;
    const activeWeaponElement = document.getElementById("activeWeapon");
    activeWeaponElement.innerText = name;
};
