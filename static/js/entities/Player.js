import {
    updateAmmoUi,
    updateUpgradeWeaponUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import AK47 from "./Ak47.js";
import Glock from "./Glock.js";
import RPG from "./RPG.js";
import Game from "./Game.js";
import { Keys, player, Pointer, sfx } from "../../game.js";
import { isValidPlayerMove } from "../utils/isValidPlayerMove.js";
import normaliseVector from "../utils/normaliseVector.js";
import { updateStoreData } from "../helpers/helpers.js";

class Player {
    health = 1;
    maxHealth = 1;
    cash = 0;
    score = 0;
    size = 40;
    height = 32;
    width = 32;
    frameX = 0;
    frameY = 0;
    dy = 0;
    dx = 0;
    speed = 1;
    safeZoneRadius = 50;

    unlimitedHealth = false;
    constructor() {
        this.dashForce = 12;
        /**
         * Equipped Weapon
         * @type {AK47 | Glock | RPG | null}
         */
        this.activeWeapon = null;

        /**
         * Weapons owned
         * @type {Glock[] | AK47[] | RPG[] | [] }
         */
        this.weapons = [];

        this.isShooting = false;
        this.autoReload = true;

        this.unlimitedAmmo = false;
        this.noFireDelay = false;
        this.unlimitedCash = false;
    }

    update() {
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
        /** Cancel reload */
        if (this.activeWeapon) {
            this.activeWeapon.state.isReloading = false;
            this.activeWeapon.lastReloaded = 0;
        }

        this.activeWeapon = weapon;

        updateStoreData({ weapon: this.activeWeapon });
        updateUpgradeWeaponUi();
        updateWeaponUi({ weapon });
        updateAmmoUi({ player: this, Game });
    }

    /**
     * @param {object} param
     * @param {Game} param.Game
     * @param {Glock | AK47 | null} param.weapon
     */
    addWeapon({ weapon }) {
        if (!this.weapons.includes(weapon)) {
            this.weapons.push(weapon);
            this.changeWeapon({ weapon, Game });
        } else console.error("Weapon has already been added");
    }

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

                if (this.activeWeapon instanceof Glock) sfx.playGunshot();
                else if (this.activeWeapon instanceof AK47) sfx.playAk47shot();
                else if (this.activeWeapon instanceof RPG) sfx.playRpgShot();

                this._recoil();
                updateAmmoUi({ player: this, Game });
            }
        }
    }

    _recoil() {
        const recoilForce = this.activeWeapon.recoilForce;
        const side1 = Pointer.x - (this.x + this.size / 2);
        const side2 = Pointer.y - (this.y + this.size / 2);

        const { a, b } = normaliseVector(side1, side2);

        this.dx += -a * recoilForce;
        this.dy += -b * recoilForce;
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
        if (isValidPlayerMove()) {
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

        Game.enemies = Game.enemies.map((enemy) => {
            enemy.isAttached = false;
            enemy.angle = null;
            return enemy;
        });
    }

    draw() {
        const { context } = Game;
        const PlayerSpriteImage = Game.assets.sprite.player;
        // context.fillStyle = "red";
        // context.fillRect(player.x, player.y, player.size, player.size);
        context.drawImage(
            PlayerSpriteImage,
            this.frameX * (this.width * 16),
            this.frameY * (this.height * 16),
            this.width * 16,
            this.height * 16,
            this.x - this.width * 2.7,
            this.y - this.height * 2 - this.height * 2.4,
            this.width * 6.8,
            this.height * 6.8
        );
    }
}

export default Player;
