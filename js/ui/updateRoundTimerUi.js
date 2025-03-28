const updateRoundUpdateTimerUi = ({ Game }) => {
    const { startTime, timeLimit } = Game.round;
    const { elapsedFrames, fps } = Game.meta;
    const roundTimerElement = document.getElementById("roundTimer");

    const remainingTime = -Math.ceil(
        Game.meta.elapsedFrames / Game.meta.fps -
            (Game.round.startTime / Game.meta.fps + Game.round.timeLimit)
    );

    roundTimerElement.innerText = `Next wave: ${remainingTime}s`;
};

export default updateRoundUpdateTimerUi;
