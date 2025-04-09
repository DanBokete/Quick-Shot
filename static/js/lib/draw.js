import Game from "../entities/Game.js";
import AK47 from "../entities/Ak47.js";
import Glock from "../entities/Glock.js";
import RPG from "../entities/RPG.js";
import Enemy from "../entities/Enemy.js";
import Creeper from "../entities/Creeper.js";
import Sprayer from "../entities/Sprayer.js";
import { background } from "./background.js";
import { player, Pointer } from "../../game.js";

export const drawGame = () => {
    drawBackground();
    drawEnemies();

    drawBullets();

    // Gun and Player draw order
    if (player.x < Pointer.x) {
        player.draw();
        drawLeftWeapon();
    } else {
        drawRightWeapon({ player, Game, Pointer });
        player.draw();
    }

    drawCursor();
    drawExplosions();
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Game} param.Game
 */
const drawBullets = () => {
    const { bullets, context, enemyBullets } = Game;

    if (bullets.length) {
        for (let bullet of bullets) {
            // context.fillStyle = "black";
            // context.fillRect(
            //     bullet.x - bullet.size / 2,
            //     bullet.y - bullet.size / 2,
            //     bullet.size,
            //     bullet.size
            // );

            context.drawImage(
                Game.assets.bullet,
                16 * bullet.frameX,
                17,
                16,
                16,
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );

            if (Game.meta.elapsedFrames % 2 === 0) {
                Game.bullets.filter((bullet) => {
                    bullet.frameX > 3 ? (bullet.frameX = 0) : bullet.frameX++;
                    return { ...bullet, bullet: bullet.frameX };
                });
            }
        }
    }

    if (enemyBullets.length) {
        for (let bullet of Game.enemyBullets) {
            context.drawImage(
                Game.assets.bullet,
                bullet.size * bullet.frameX,
                bullet.frameY ? bullet.frameY * bullet.size : 17,
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

const drawCursor = () => {
    const { context, canvas } = Game;

    // cursor image size
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
};

const drawEnemies = () => {
    const { enemies, context } = Game;

    if (!enemies.length) return;

    for (let enemy of enemies) {
        context.fillStyle = "lightGreen";
        context.fillRect(enemy.x, enemy.y - enemy.size, enemy.size, 5);

        context.fillStyle = "darkGreen";
        context.fillRect(
            enemy.x,
            enemy.y - enemy.size,
            enemy.health > 0
                ? enemy.size * (enemy.health / enemy.maxHealth)
                : 0,
            5
        );
        // context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        enemy.draw();
    }
};

// https://www.youtube.com/watch?v=cB6paLHebb4
// Code can be found at 05:00
const drawLeftWeapon = () => {
    const { context } = Game;

    const activeWeapon = player.activeWeapon;
    if (!activeWeapon) return;

    // To rotate image based on pointer position
    context.save();
    context.translate(player.x + player.size / 2, player.y + player.size);
    context.rotate(Pointer.rotationFromPlayer - 1.9);

    activeWeapon.draw();

    context.restore();
};

const drawRightWeapon = () => {
    // let size = 96;
    // let imageWidth = 96;
    // let imageHeight = 96;
    const { context } = Game;

    const activeWeapon = player.activeWeapon;
    if (!activeWeapon) return;

    const image = activeWeapon.image;

    context.save();

    // To rotate image based on pointer position
    context.translate(player.x + player.size * 0, player.y + player.size * 0.7);
    context.rotate(Pointer.rotationFromPlayer + 1.6);
    context.scale(-1, 1);

    activeWeapon.draw();

    context.restore();
};

const drawBackground = () => {
    const { context, canvas } = Game;
    const { backgroundImage } = Game.assets;
    const tilesPerRow = 28;
    const tilesPerCol = 28;
    const tileSize = 16;
    background.forEach((row, r) => {
        row.forEach((square, c) => {
            const tile = background[r][c];
            if (tile >= 0) {
                const tileRow = Math.floor(tile / tilesPerRow);
                const tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(
                    backgroundImage,
                    tileCol * tileSize,
                    tileRow * tileSize,
                    tileSize,
                    tileSize,
                    c * tileSize,
                    r * tileSize,
                    tileSize,
                    tileSize
                );
            }
        });
    });
};

const drawExplosions = () => {
    if (!Game.explosions.length) return;

    const explosionImg = Game.assets.fx.explosion;

    const context = Game.context;
    for (let explosion of Game.explosions) {
        context.drawImage(
            explosionImg,
            explosion.frameX * explosion.size,
            0 * explosion.size,
            explosion.size,
            explosion.size,
            explosion.x - (explosion.size * 5) / 2,
            explosion.y - (explosion.size * 5) / 2,
            explosion.size * 5,
            explosion.size * 5
        );
    }
};
