const updateRoundUpdateTimerUi = (Game) => {
    const { startTime, timeLimit } = Game.round;
    const { elapsedFrames, fps } = Game.meta;
    const roundTimerElement = document.getElementById("roundTimer");

    const seconds = Math.floor(elapsedFrames / fps);
    const minutes = Math.floor(seconds / 100);

    const remainingTime = timeLimit - seconds;

    roundTimerElement.innerText = `Timer: ${remainingTime}`;
};

export default updateRoundUpdateTimerUi;
