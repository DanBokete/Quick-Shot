import { Pointer } from "../../game.js";
import { background } from "../lib/background.js";

const handleKeyPresses = ({ Keys, player, Game }) => {
    const playerBoardX = Math.floor(player.x / Game.assets.tileSize);
    const playerBoardY = Math.floor(player.y / Game.assets.tileSize);
    console.log(playerBoardX, playerBoardY);

    if (Keys.moveLeft) {
        try {
            const leftCell = background[playerBoardX - 1][playerBoardY];

            if (leftCell >= 0) {
                player.dx -= player.speed;
            }
        } catch {}
    }
    if (Keys.moveRight) {
        player.dx += player.speed;
    }
    if (Keys.moveUp) {
        player.dy -= player.speed;
    }
    if (Keys.moveDown) {
        try {
            const bottomCell = background[playerBoardX][playerBoardY];

            if (bottomCell >= 0) {
                player.dy += player.speed;
            }
        } catch {}
    }

    if (Game.meta.elapsedFrames % 2 > 0) return;
    if (Keys.moveLeft || Keys.moveRight || Keys.moveUp || Keys.moveDown) {
        player.frameY = 0;
        player.frameX = (player.frameX + 1) % 8;
    } else {
        player.frameY = 2;
        player.frameX = (player.frameX + 1) % 4;
    }
};

export default handleKeyPresses;
