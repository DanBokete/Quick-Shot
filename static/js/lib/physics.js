import { game, Pointer } from "../../game.js";
import { player } from "../../game.js";
// import { isValidPlayerMove } from "../utils/isValidPlayerMove.js";
import { background } from "./background.js";

const physics = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const validMoves = new Set([562, 560, 226]);
    const playerBoardX = Math.floor(
        (player.x + player.dx) / game.assets.tileSize
    );
    const playerBoardY = Math.floor(
        (player.y + player.height + player.dy) / game.assets.tileSize
    );

    let currentCell;
    let rightCell;
    let bottomCell;

    try {
        currentCell = background[playerBoardY][playerBoardX];
    } catch {}
    try {
        rightCell = background[playerBoardY][playerBoardX + 2];
    } catch {}
    try {
        bottomCell = background[playerBoardY + 1][playerBoardX];
    } catch {}

    if (
        !validMoves.has(currentCell) ||
        !validMoves.has(rightCell) ||
        !validMoves.has(bottomCell)
    ) {
        player.x = player.lastPosition.x;
        player.dx = 0;
        player.y = player.lastPosition.y;
        player.dy = 0;

        console.log("aesas");
    }

    player.dy *= 0.8;
    player.dx *= 0.8;
    Pointer.x += player.dx * 1.25;
    Pointer.y += player.dy * 1.25;
};

export default physics;
