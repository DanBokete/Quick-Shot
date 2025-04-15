import { Keys, player, Pointer } from "../../game.js";
import { game } from "../../game.js";
import { background } from "./background.js";

const handleActiveKeys = () => {
    // const validMoves = [562, 561, 560, 226];
    // const playerBoardX = Math.floor(
    //     (player.x + player.dx) / game.assets.tileSize
    // );
    // const playerBoardY = Math.floor(
    //     (player.y + player.height + player.dx) / game.assets.tileSize
    // );

    if (Keys.moveLeft) {
        player.dx -= player.speed;
    }
    if (Keys.moveRight) {
        player.dx += player.speed;
    }
    if (Keys.moveUp) {
        player.dy -= player.speed;
    }
    if (Keys.moveDown) {
        player.dy += player.speed;
    }
    if (game.meta.elapsedFrames % 2 > 0) return;
    if (Keys.moveLeft || Keys.moveRight || Keys.moveUp || Keys.moveDown) {
        player.frameY = 0;
        player.frameX = (player.frameX + 1) % 8;
    } else {
        player.frameY = 2;
        player.frameX = (player.frameX + 1) % 4;
    }
};

export default handleActiveKeys;
