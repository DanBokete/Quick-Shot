import AK47 from "../entities/ak47.js";
import Glock from "../entities/Glock.js";
import RPG from "../entities/RPG.js";
import { background } from "./background.js";
import { player, Pointer, game } from "../../game.js";

export const drawGame = () => {
    const gameContainerElement = document.getElementById("gameContainer");

    drawBackground();
    drawEnemies();

    drawBullets();

    // Gun and Player draw order
    if (player.x < Pointer.x) {
        player.draw();
        drawLeftWeapon();
    } else {
        drawRightWeapon({ player, game, Pointer });
        player.draw();
    }

    drawCursor();
    drawExplosions();

    if (player.blind > game.meta.elapsedFrames) {
        gameContainerElement.classList.add("blur");
        console.log("blurred");
    } else {
        if (gameContainerElement.classList.contains("blur")) {
            gameContainerElement.classList.remove("blur");
        }
    }
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {game} param.game
 */
const drawBullets = () => {
    const { bullets, context, enemyBullets } = game;

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
                game.assets.bullet,
                16 * bullet.frameX,
                17,
                16,
                16,
                bullet.x - bullet.size / 2,
                bullet.y - bullet.size / 2,
                bullet.size,
                bullet.size
            );

            if (game.meta.elapsedFrames % 2 === 0) {
                game.bullets.filter((bullet) => {
                    bullet.frameX > 3 ? (bullet.frameX = 0) : bullet.frameX++;
                    return { ...bullet, bullet: bullet.frameX };
                });
            }
        }
    }

    if (enemyBullets.length) {
        for (let bullet of game.enemyBullets) {
            context.drawImage(
                game.assets.bullet,
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

        if (game.meta.elapsedFrames % 2 === 0) {
            game.enemyBullets.filter((bullet) => {
                bullet.frameX > 3 ? (bullet.frameX = 0) : bullet.frameX++;
                return { ...bullet, bullet: bullet.frameX };
            });
        }
    }
};

const drawCursor = () => {
    const { context, canvas } = game;

    // cursor image size
    const imageWidth = 64;
    const imageHeight = 64;

    if (player.activeWeapon) {
        const activeWeapon = player.activeWeapon;
        let crosshair;

        if (activeWeapon instanceof Glock) {
            crosshair = game.assets.glockCrosshair;
        } else if (activeWeapon instanceof AK47) {
            crosshair = game.assets.akCrosshair;
        } else if (activeWeapon instanceof RPG) {
            crosshair = game.assets.rpgCrosshair;
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
    const { enemies, context } = game;

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
    const { context } = game;

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
    const { context } = game;

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
    const { context, canvas } = game;
    const { backgroundImage } = game.assets;
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
    if (!game.explosions.length) return;

    const explosionImg = game.assets.fx.explosion;

    const context = game.context;
    for (let explosion of game.explosions) {
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
