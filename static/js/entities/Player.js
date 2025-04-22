import {
    updateAmmoUi,
    updateHealthUi,
    updateUpgradeWeaponUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import AK47 from "./ak47.js";
import Glock from "./Glock.js";
import RPG from "./RPG.js";
import { game } from "../../game.js";
import { Keys, player, Pointer, sfx } from "../../game.js";
// import { isValidPlayerMove } from "../utils/isValidPlayerMove.js";
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
    lastDashed = null;

    cheated = false;
    unlimitedHealth = false;
    unlimitedDash = false;

    continuedPlaying = false;

    blind = null;

    dashForce = 12;
    maxDashForce = 12;

    lastPosition = {
        x: null,
        y: null,
    };

    x = 250;
    y = 250;
    constructor() {
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
        const { elapsedFrames } = game.meta;

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
            this.dashForce = Math.min(this.dashForce + 0.1, 8);
            this.maxDashForce = 8;
        } else if (weapon && weapon instanceof AK47) {
            this.speed = 0.8;
            this.dashForce = Math.min(this.dashForce + 0.3, 10);
            this.maxDashForce = 10;
        } else {
            this.speed = 1;
            this.dashForce = Math.min(this.dashForce + 0.5, 12);
            this.maxDashForce = 12;
        }

        if (weapon.state.isReloading) {
            if (
                !this.autoReload &&
                elapsedFrames - weapon.lastReloaded > weapon.reloadTime
            ) {
                weapon.state.isReloading = false;
                weapon.ammo = weapon.maxAmmo;
                updateAmmoUi({ player: this, game });
            } else if (
                this.autoReload &&
                elapsedFrames - weapon.lastReloaded >
                    weapon.reloadTime + weapon.autoReloadDelay
            ) {
                weapon.state.isReloading = false;
                weapon.ammo = weapon.maxAmmo;
                updateAmmoUi({ player: this, game });
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
        updateAmmoUi({ player: this, game });
    }

    /**
     * @param {object} param
     * @param {game} param.game
     * @param {Glock | AK47 | null} param.weapon
     */
    addWeapon({ weapon }) {
        if (!this.weapons.includes(weapon)) {
            this.weapons.push(weapon);
            this.changeWeapon({ weapon, game });
        } else console.error("Weapon has already been added");
    }

    shoot() {
        if (!this.activeWeapon) return;
        // prevents shots during the game end screen
        if (this.health <= 0) return;
        // prevents shots before pointer is locked
        if (!document.pointerLockElement) return;

        const { elapsedFrames } = game.meta;

        if (this.activeWeapon && this.activeWeapon.ammo) {
            const bullet = this.activeWeapon.shoot({
                Pointer,
                player: this,
                elapsedFrames,
            });

            if (bullet) {
                const activeWeapon = this.activeWeapon;

                if (!this.unlimitedAmmo) this.activeWeapon.ammo--;
                updateAmmoUi({ player: this, game });
                game.bullets.push(bullet);

                if (activeWeapon instanceof Glock) sfx.playGunshot();
                else if (activeWeapon instanceof AK47) sfx.playAk47shot();
                else if (activeWeapon instanceof RPG) sfx.playRpgShot();

                // additional recoil if constantly shooting before weapon animation is resolved
                Pointer.y -=
                    activeWeapon.recoilForce * activeWeapon.frameX ? 10 : 1;

                this.activeWeapon.frameX = 1;
                this._recoil();
                updateAmmoUi({ player: this, game });
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

    reloadWeapon({ game }) {
        const { elapsedFrames } = game.meta;
        const weapon = this.activeWeapon;
        if (weapon.maxAmmo === weapon.ammo) return;
        if (weapon.state.isReloading) return;
        weapon.state.isReloading = true;
        weapon.lastReloaded = elapsedFrames;
        updateAmmoUi({ player: this, game });
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

        game.enemies = game.enemies.map((enemy) => {
            enemy.isAttached = false;
            enemy.angle = null;
            return enemy;
        });

        if (!this.unlimitedDash) this.dashForce = 0;

        this.lastDashed = game.meta.elapsedFrames;
    }

    draw() {
        const { context } = game;
        const PlayerSpriteImage = game.assets.sprite.player;
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
