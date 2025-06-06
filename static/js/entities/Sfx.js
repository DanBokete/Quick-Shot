import { player } from "../../game.js";
import { game } from "../../game.js";

class Sfx {
    disableBackgroundMusic = false;
    constructor() {
        this.explosion = null;
        this.achievement = null;
        this.gunshot = null;
        this.playerHit = null;
        this.enemyHit = null;
        this.ak47Shot = null;
        this.rocketShot = null;
        this.backgroundMusic = null;
        this.money = null;
    }

    playAchievement() {
        this.achievement.pause();
        this.achievement.currentTime = 0;
        this.achievement.volume = 0.1;
        this.achievement.play();
    }

    playExplosion() {
        this.explosion.volume = 0.1;
        this.explosion.pause();
        this.explosion.currentTime = 0;
        this.explosion.play();
    }

    playGunshot() {
        this.gunshot.volume = 0.1;
        this.gunshot.pause();

        // gives a more low end effect
        this.gunshot.currentTime = 0.3;
        this.gunshot.play();
    }

    playAk47shot() {
        this.ak47Shot.volume = 0.1;
        this.ak47Shot.pause();

        // gives a more low end effect
        this.ak47Shot.currentTime = 0.4;
        this.ak47Shot.play();
    }

    playRpgShot() {
        this.rocketShot.volume = 1;
        this.rocketShot.pause();
        this.rocketShot.currentTime = 0.1;
        this.rocketShot.play();
    }

    playEnemyHit() {
        this.enemyHit.volume = 0.1;
        this.enemyHit.pause();
        this.enemyHit.currentTime = 0;
        this.enemyHit.play();
    }

    playPlayerHit() {
        this.playerHit.volume = 0.1;
        this.playerHit.pause();
        this.playerHit.currentTime = 0;
        this.playerHit.play();
    }

    playBackgroundMusic() {
        if (this.disableBackgroundMusic) return;
        this.backgroundMusic.volume = 0.1;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic.play();
        this.backgroundMusic.loop = true;
    }

    playMoneySound() {
        this.money.volume = 0.1;
        this.money.pause();
        this.money.currentTime = 0;
        this.money.play();
    }
}

export default Sfx;
