import updateAmmoUi from "../ui/updateAmmoUi.js";
import updateWeaponUi from "../ui/updateWeaponUi.js";
import AK47 from "./Ak47.js";
import Glock from "./Glock.js";
import { Game } from "../../game.js";

class Player {
    constructor() {
        this.x = null;
        this.y = null;
        this.speed = 1;
        this.dx = 0;
        this.dy = 0;
        this.size = 40;
        this.width = 40;
        this.height = 40;

        this.health = 1;
        this.maxHealth = 1;

        this.cash = 0;
        this.score = 0;

        this.dashForce = 20;

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

        /** @type {boolean} */
        this.isShooting = false;

        /** @type {boolean} */
        this.autoReload = true;

        this.safeZoneRadius = 50;
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     */
    update({ Game }) {
        const { elapsedFrames } = Game.meta;

        this.x += this.dx;
        this.y += this.dy;

        if (!this.activeWeapon) return;
        const weapon = this.activeWeapon;
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

    changeWeapon({ weapon, Game }) {
        if (this.activeWeapon) {
            this.activeWeapon.state.isReloading = false;
            this.activeWeapon.lastReloaded = 0;
        }

        this.activeWeapon = weapon;
        console.log(weapon);

        updateWeaponUi({ weapon });
        updateAmmoUi({ player: this, Game });
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     * @param {Glock | AK47 | null} param.weapon
     */
    addWeapon({ weapon, Game }) {
        if (!this.weapons.includes(weapon)) {
            this.weapons.push(weapon);
            this.changeWeapon({ weapon, Game });
            console.log("added", weapon);
        } else console.error("Weapon has already been added");
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     */
    shoot({ Pointer, Game }) {
        if (!this.activeWeapon) return;
        const { elapsedFrames } = Game.meta;

        if (this.activeWeapon && this.activeWeapon.ammo) {
            const bullet = this.activeWeapon.shoot({
                Pointer,
                player: this,
                elapsedFrames,
            });

            if (bullet) {
                this.activeWeapon.ammo--;
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
    }
}

export default Player;
