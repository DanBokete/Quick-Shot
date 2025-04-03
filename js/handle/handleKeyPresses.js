import { Pointer } from "../../game.js";
import { background } from "../lib/background.js";

const handleKeyPresses = ({ Keys, player, Game }) => {
    const validMoves = [562, 561, 560, 226];
    const playerBoardX = Math.floor(
        (player.x + player.dx) / Game.assets.tileSize
    );
    const playerBoardY = Math.floor(
        (player.y + player.height + player.dx) / Game.assets.tileSize
    );

    if (Keys.moveLeft) {
        try {
            const leftCell = background[playerBoardY][playerBoardX - 2];

            if (validMoves.includes(leftCell)) {
                player.dx -= player.speed;
            } else {
                // Keys.moveLeft = false;
            }
        } catch {
            // Keys.moveLeft = false;
        }
    }
    if (Keys.moveRight) {
        try {
            const leftCell = background[playerBoardY][playerBoardX + 4];

            if (validMoves.includes(leftCell)) {
                player.dx += player.speed;
            } else {
                // Keys.moveRight = false;
            }
        } catch {
            // Keys.moveRight = false;
        }
    }
    if (Keys.moveUp) {
        try {
            const bottomCell = background[playerBoardY - 2][playerBoardX];

            if (validMoves.includes(bottomCell)) {
                player.dy -= player.speed;
            } else {
                // Keys.moveUp = false;
            }
        } catch {
            // Keys.moveUp = false;
        }
    }
    if (Keys.moveDown) {
        try {
            const bottomCell = background[playerBoardY + 3][playerBoardX];

            if (validMoves.includes(bottomCell)) {
                player.dy += player.speed;
            } else {
                // Keys.moveDown = false;
            }
        } catch {
            // Keys.moveDown = false;
        }
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
