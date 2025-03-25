class AK47 {
    constructor() {
        this.name = "AK47";
        this.ammo = 1;
        this.maxAmmo = 1;
        this.key = "2";
        this.speed = 8;
        this.damage = 1;

        // frames
        this.fireDelay = 60;
        this.lastShotAt = 0;

        this.bullet = {
            health: 2,
        };
    }

    cr;
}
