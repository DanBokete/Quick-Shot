import {
    updateAmmoUi,
    updateUpgradeWeaponUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import AK47 from "./Ak47.js";
import Glock from "./Glock.js";
import RPG from "./RPG.js";
import Game from "./Game.js";
import { Pointer } from "../../game.js";
import Sniper from "./Sniper.js";
import { storeData } from "./storeData.js";

class Player {
    constructor() {
        this.x = null;
        this.y = null;
        this.speed = 1;
        this.dx = 0;
        this.dy = 0;
        this.size = 40;

        this.width = 32;
        this.height = 32;
        this.frameX = 0;
        this.frameY = 0;

        this.health = 1;
        this.maxHealth = 1;

        this.cash = 0;
        this.score = 0;

        this.dashForce = 12;

        /**
         * Weapon that is equipped
         * @type {AK47 | Glock | null}
         */
        this.activeWeapon = null;

        /**
         * Weapons owned
         * @type {Glock[] | AK47[] | []}
         */
        this.weapons = [];

        this.isShooting = false;

        this.autoReload = true;

        this.unlimitedHealth = false;
        this.unlimitedAmmo = false;
        this.noFireDelay = false;
        this.unlimitedCash = false;

        this.safeZoneRadius = 50;
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     */

    update({ Game, Pointer, Keys }) {
        const { elapsedFrames } = Game.meta;

        this.x += this.dx;
        this.y += this.dy;

        if (Keys.moveLeft || Keys.moveRight || Keys.moveUp || Keys.moveDown) {
            if (this.x > Pointer.x) {
                this.frameY = 1;
            } else {
                this.frameY = 0;
            }
        } else {
            if (this.x > Pointer.x) {
                this.frameY = 3;
            } else {
                this.frameY = 2;
            }
        }

        if (!this.activeWeapon) return;
        const weapon = this.activeWeapon;

        if (weapon && weapon instanceof RPG) {
            this.speed = 0.5;
            this.dashForce = 8;
        } else if (weapon && weapon instanceof AK47) {
            this.speed = 0.8;
            this.dashForce = 10;
        } else {
            this.speed = 1;
            this.dashForce = 12;
        }

        if (weapon.state.isReloading) {
            if (
                !this.autoReload &&
                elapsedFrames - weapon.lastReloaded > weapon.reloadTime
            ) {
                weapon.state.isReloading = false;
                weapon.ammo = weapon.maxAmmo;
                updateAmmoUi({ player: this, Game });
            } else if (
                this.autoReload &&
                elapsedFrames - weapon.lastReloaded >
                    weapon.reloadTime + weapon.autoReloadDelay
            ) {
                weapon.state.isReloading = false;
                weapon.ammo = weapon.maxAmmo;
                updateAmmoUi({ player: this, Game });
            }
        }
    }

    changeWeapon({ weapon }) {
        if (this.activeWeapon) {
            this.activeWeapon.state.isReloading = false;
            this.activeWeapon.lastReloaded = 0;
        }

        this.activeWeapon = weapon;
        console.log(weapon);

        if (this.activeWeapon instanceof Glock) {
            storeData.upgradesOnSale[1].price = 10;
            storeData.upgradesOnSale[2].price = 20;
            storeData.upgradesOnSale[3].price = 10;
        } else if (this.activeWeapon instanceof AK47) {
            storeData.upgradesOnSale[1].price = 15;
            storeData.upgradesOnSale[2].price = 10;
            storeData.upgradesOnSale[3].price = 10;
        } else if (this.activeWeapon instanceof RPG) {
            storeData.upgradesOnSale[1].price = 100;
            storeData.upgradesOnSale[2].price = 100;
            storeData.upgradesOnSale[3].price = 20;
        }

        updateWeaponUi({ weapon });
        updateAmmoUi({ player: this, Game });
        updateUpgradeWeaponUi();
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     * @param {Glock | AK47 | null} param.weapon
     */
    addWeapon({ weapon }) {
        if (!this.weapons.includes(weapon)) {
            this.weapons.push(weapon);
            console.log("added", weapon);
            this.changeWeapon({ weapon, Game });
        } else console.error("Weapon has already been added");
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     */
    shoot() {
        if (!this.activeWeapon) return;

        const { elapsedFrames } = Game.meta;

        if (this.activeWeapon && this.activeWeapon.ammo) {
            const bullet = this.activeWeapon.shoot({
                Pointer,
                player: this,
                elapsedFrames,
            });

            if (bullet) {
                this.activeWeapon.frameX = 1;
                if (!this.unlimitedAmmo) this.activeWeapon.ammo--;
                updateAmmoUi({ player: this, Game });
                Game.bullets.push(bullet);
                updateAmmoUi({ player: this, Game });
            }
        }
    }

    reloadWeapon({ Game }) {
        const { elapsedFrames } = Game.meta;
        const weapon = this.activeWeapon;
        if (weapon.maxAmmo === weapon.ammo) return;
        if (weapon.state.isReloading) return;
        weapon.state.isReloading = true;
        weapon.lastReloaded = elapsedFrames;
        updateAmmoUi({ player: this, Game });
    }

    dash({ Keys }) {
        if (Keys.moveLeft) {
            this.dx -= this.speed * this.dashForce;
        }
        if (Keys.moveRight) {
            this.dx += this.speed * this.dashForce;
        }
        if (Keys.moveUp) {
            this.dy -= this.speed * this.dashForce;
        }
        if (Keys.moveDown) {
            this.dy += this.speed * this.dashForce;
        }

        Game.enemies = Game.enemies.map((enemy) => {
            enemy.isAttached = false;
            enemy.angle = null;
            return enemy;
        });
    }
}

export default Player;
