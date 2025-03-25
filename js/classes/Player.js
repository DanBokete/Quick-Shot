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

        // object
        this.activeWeapon = null;

        // list of objects
        this.weapons = [];
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    changeWeapon({ weapon }) {
        this.activeWeapon = weapon;
    }

    addWeapon({ weapon }) {
        if (!this.weapons.includes(weapon)) {
            this.weapons.push(weapon);
            this.changeWeapon({ weapon });
            console.log("added", weapon);
        } else console.error("Weapon has already been added");
    }

    shoot({ Pointer, elapsedFrames }) {
        if (this.activeWeapon && this.activeWeapon.ammo) {
            const bullet = this.activeWeapon.shoot({
                Pointer,
                player: this,
                elapsedFrames,
            });

            return bullet;
        }
        console.error("Failed to shoot");
        console.log(this.activeWeapon);
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
