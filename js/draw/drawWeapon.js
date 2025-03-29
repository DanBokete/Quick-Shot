// https://www.youtube.com/watch?v=cB6paLHebb4

import AK47 from "../classes/Ak47.js";
import Glock from "../classes/Glock.js";
import RPG from "../classes/RPG.js";

// Code can be found at 05:00
export const drawLeftWeapon = ({ player, Game, Pointer }) => {
    // let size = 96;
    // const width = 96;
    // const height = 48;
    const { context } = Game;

    const activeWeapon = player.activeWeapon;
    if (!activeWeapon) return;
    const image = activeWeapon.image;
    console.log(image);

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
    context.rotate(Pointer.rotationFromPlayer + 1.9);
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
