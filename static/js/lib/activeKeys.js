import { Keys, player, Pointer } from "../../game.js";
import { game } from "../../game.js";
import { background } from "./background.js";

const handleActiveKeys = () => {
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
