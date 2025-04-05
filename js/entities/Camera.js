import { player } from "../../game.js";
import Game from "./Game.js";

class Camera {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /** Moves Camera Position */
    update() {
        const canvasWidth = Game.canvas.width;
        const canvasHeight = Game.canvas.height;
        const playerWidth = player.width;
        const playerHeight = player.height;
        this.x = -player.x + canvasWidth / 2;
        this.y = -player.y + canvasHeight / 2;
    }
}

export default Camera;
