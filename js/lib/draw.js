import Game from "../entities/Game.js";
import AK47 from "../entities/Ak47.js";
import Glock from "../entities/Glock.js";
import Player from "../entities/Player.js";
import RPG from "../entities/RPG.js";
import Enemy from "../entities/Enemy.js";
import Sniper from "../entities/Sniper.js";
import Sprayer from "../entities/Sprayer.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
export const drawBullets = ({ Game }) => {
    const { bullets, context, enemyBullets } = Game;

    // console.log(enemyBullets);

    if (bullets.length) {
        for (let bullet of bullets) {
            context.fillStyle = "black";
            context.fillRect(
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );
        }
    }

    if (enemyBullets.length) {
        for (let bullet of Game.enemyBullets) {
            // context.fillStyle = "black";
            // context.fillRect(
            //     bullet.x - bullet.size / 2,
            //     bullet.y - bullet.size / 2,
            //     bullet.size,
            //     bullet.size
            // );
            context.drawImage(
                Game.assets.bullet,
                bullet.size * bullet.frameX,
                16 + 1,
                bullet.size,
                bullet.size,
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );
        }

        if (Game.meta.elapsedFrames % 2 === 0) {
            Game.enemyBullets.filter((bullet) => {
                bullet.frameX > 3 ? (bullet.frameX = 0) : bullet.frameX++;
                return { ...bullet, bullet: bullet.frameX };
            });
        }
    }
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 * @param {MouseEvent} param.e
 * @param {Player} param.player
 */
export const drawCursor = ({ Game, Pointer, player }) => {
    const { context, canvas } = Game;
    // const akCrosshair = Game.assets.akCrosshair;
    const imageWidth = 64;
    const imageHeight = 64;

    if (player.activeWeapon) {
        const activeWeapon = player.activeWeapon;
        let crosshair;

        if (activeWeapon instanceof Glock) {
            crosshair = Game.assets.glockCrosshair;
        } else if (activeWeapon instanceof AK47) {
            crosshair = Game.assets.akCrosshair;
        } else if (activeWeapon instanceof RPG) {
            crosshair = Game.assets.rpgCrosshair;
        }

        context.drawImage(
            crosshair,
            0,
            0,
            imageWidth,
            imageHeight,
            Pointer.x - imageWidth / 2,
            Pointer.y - imageHeight / 2,
            imageWidth,
            imageHeight
        );
    }

    if (
        player.activeWeapon &&
        Pointer.x < canvas.width &&
        Pointer.y < canvas.height
    ) {
        document.querySelector("canvas").style.cursor = "none";
    } else {
        document.querySelector("canvas").style.cursor = "default";
    }
};

export const drawEndLine = ({ context, canvas, enemies, endLine }) => {
    if (enemies.length) return;

    console.log("huhh");

    console.log(canvas);
    console.log(endLine);
    console.log(context);

    context.fillStyle = endLine.colour;
    context.fillRect(
        canvas.width - endLine.width,
        0,
        endLine.width,
        canvas.height
    );
};

export const drawEnemies = ({ context, enemies }) => {
    if (!enemies.length) return;

    for (let enemy of enemies) {
        context.fillStyle = "lightGreen";
        context.fillRect(enemy.x, enemy.y - enemy.size / 2, enemy.size, 5);

        context.fillStyle = "darkGreen";
        context.fillRect(
            enemy.x,
            enemy.y - enemy.size / 2,
            enemy.size * (enemy.health / enemy.maxHealth),
            5
        );
        if (enemy instanceof Enemy) context.fillStyle = "orange";
        if (enemy instanceof Sprayer) context.fillStyle = "purple";
        if (enemy instanceof Sniper) context.fillStyle = "lightblue";
        context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
};

export const drawPlayer = ({ player, Game }) => {
    const { context } = Game;
    const PlayerSpriteImage = Game.assets.sprite.player;
    // context.fillStyle = "red";
    // context.fillRect(player.x, player.y, player.size, player.size);
    context.drawImage(
        PlayerSpriteImage,
        player.frameX * (player.width * 16),
        player.frameY * (player.height * 16),
        player.width * 16,
        player.height * 16,
        player.x - player.width * 2.7,
        player.y - player.height * 2 - player.height * 2.4,
        player.width * 6.8,
        player.height * 6.8
    );
};

// https://www.youtube.com/watch?v=cB6paLHebb4
// Code can be found at 05:00
export const drawLeftWeapon = ({ player, Game, Pointer }) => {
    const { context } = Game;

    const activeWeapon = player.activeWeapon;
    if (!activeWeapon) return;
    const image = activeWeapon.image;

    context.save();
    context.translate(player.x + player.size / 2, player.y + player.size);

    context.rotate(Pointer.rotationFromPlayer - 1.9);

    if (activeWeapon instanceof Glock) {
        const size = 48;
        const imageWidth = activeWeapon.imageWidth / 12;
        const imageHeight = 48;
        const frameX = context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    } else if (activeWeapon instanceof RPG) {
        const size = 48;
        const imageWidth = activeWeapon.imageWidth / 8;
        const imageHeight = 32;

        context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    } else if (activeWeapon instanceof AK47) {
        const size = 48;
        const imageWidth = activeWeapon.imageWidth / 12;
        const imageHeight = 48;

        context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    }

    context.restore();
};

export const drawRightWeapon = ({ player, Game, Pointer }) => {
    // let size = 96;
    // let imageWidth = 96;
    // let imageHeight = 96;
    const { context } = Game;

    const activeWeapon = player.activeWeapon;
    if (!activeWeapon) return;

    const image = activeWeapon.image;

    context.save();

    context.translate(player.x + player.size * 0, player.y + player.size * 0.7);
    context.rotate(Pointer.rotationFromPlayer + 1.6);
    context.scale(-1, 1);

    if (activeWeapon instanceof Glock) {
        const size = 48;
        const imageWidth = activeWeapon.imageWidth / 12;
        const imageHeight = 48;
        context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    } else if (activeWeapon instanceof RPG) {
        const size = 48;
        const imageWidth = 192;
        const imageHeight = 32;

        context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    } else if (activeWeapon instanceof AK47) {
        const size = 48;
        const imageWidth = 96;
        const imageHeight = 48;

        context.drawImage(
            image,
            activeWeapon.frameX * imageWidth,
            0,
            imageWidth,
            imageHeight,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
        );
    }

    // context.drawImage(
    //     image,
    //     0,
    //     0,
    //     imageWidth,
    //     imageHeight,
    //     -imageWidth / 2,
    //     -imageHeight / 2,
    //     player.width * 2,
    //     player.height * 2
    // );
    context.restore();
};
