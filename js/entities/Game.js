export const Game = {
    canvas: null,
    context: null,
    requestId: null,
    round: {
        number: 0,
        startTime: 0,
        timeLimit: 100,
    },
    bullets: [],
    enemyBullets: [],
    enemies: [],
    meta: {
        then: null,
        elapsed: null,
        elapsedFrames: 0,
        fpsInterval: 1000 / 30,
        fps: 30,
        now: null,
    },
    endLine: {
        width: 100,
        colour: "#828282",
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
        bullet: null,
    },
};

export default Game;
