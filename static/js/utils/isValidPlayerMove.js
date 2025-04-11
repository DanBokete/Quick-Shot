import { Keys, player } from "../../game.js";
import { game } from "../../game.js";
import { background } from "../lib/background.js";

/* Evaluates if player can dash */
export const isValidPlayerMove = () => {
    const validMoves = [562, 561, 560, 226];
    const playerBoardX = Math.floor(
        (player.x + player.dx) / game.assets.tileSize
    );
    const playerBoardY = Math.floor(
        (player.y + player.height + player.dx) / game.assets.tileSize
    );
    let leftCell;
    let rightCell;
    let bottomCell;
    let topCell;

    try {
        leftCell = background[playerBoardY][playerBoardX - 4];
    } catch {}
    try {
        rightCell = background[playerBoardY][playerBoardX + 6];
    } catch {}
    try {
        topCell = background[playerBoardY - 8][playerBoardX];
    } catch {}
    try {
        bottomCell = background[playerBoardY + 7][playerBoardX];
    } catch {}

    if (
        Keys.moveRight &&
        Keys.moveUp &&
        validMoves.includes(topCell) &&
        validMoves.includes(rightCell)
    ) {
        return true;
    }
    if (
        Keys.moveRight &&
        Keys.moveDown &&
        validMoves.includes(bottomCell) &&
        validMoves.includes(rightCell)
    ) {
        return true;
    }
    if (
        Keys.moveLeft &&
        Keys.moveDown &&
        validMoves.includes(leftCell) &&
        validMoves.includes(bottomCell)
    ) {
        return true;
    }
    if (
        Keys.moveLeft &&
        Keys.moveUp &&
        validMoves.includes(leftCell) &&
        validMoves.includes(topCell)
    ) {
        return true;
    }
    if (
        Keys.moveLeft &&
        !(Keys.moveUp || Keys.moveRight) &&
        validMoves.includes(leftCell)
    ) {
        return true;
    }
    if (
        Keys.moveUp &&
        !(Keys.moveLeft || Keys.moveRight) &&
        validMoves.includes(topCell)
    ) {
        return true;
    }
    if (
        Keys.moveRight &&
        !(Keys.moveUp || Keys.moveDown) &&
        validMoves.includes(rightCell)
    ) {
        return true;
    }
    if (
        Keys.moveDown &&
        !(Keys.moveLeft || Keys.moveRight) &&
        validMoves.includes(bottomCell)
    ) {
        return true;
    }
    return false;
};
