import Creeper from "./Creeper.js";
import Enemy from "./Enemy.js";
import Sprayer from "./Sprayer.js";

export const Game = {
    canvas: null,
    /**  @type {CanvasRenderingContext2D | null} */
    context: null,
    requestId: null,
    status: false,

    round: {
        number: 0,
        startTime: 0,
        timeLimit: 100,
    },

    /** Player bullets @type {{}[]} */
    bullets: [],
    enemyBullets: [],

    /** Enemies @type {Enemy[] | Sprayer[]| Creeper[] | []} */
    enemies: [],

    explosions: [],

    meta: {
        then: null,
        elapsed: null,
        elapsedFrames: 0,
        fpsInterval: 1000 / 30,
        fps: 30,
        now: null,
    },

    state: {
        isPaused: false,
        onUpgradeMenu: true,
    },
    purchasedWeaponsId: [],

    assets: {
        akCrosshair: null,
        glockCrosshair: null,
        rpgCrosshair: null,
        sprite: {
            player: null,
        },
        weapons: {
            glock: null,
            ak: null,
            rpg: null,
        },
        enemies: {
            demonImage: null,
            batImage: null,
            sprayerImage: null,
        },

        fx: {
            explosion: null,
        },

        bullet: null,
        backgroundImage: null,
        tileSize: 16,
    },
};

export default Game;
