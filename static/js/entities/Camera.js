import { player } from "../../game.js";
import { game } from "../../game.js";

class Camera {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /** Moves Camera Position */
    update() {
        const canvasWidth = game.canvas.width;
        const canvasHeight = game.canvas.height;
        const playerWidth = player.width;
        const playerHeight = player.height;
        this.x = -player.x + canvasWidth / 2;
        this.y = -player.y + canvasHeight / 2;
    }
}

export default Camera;
