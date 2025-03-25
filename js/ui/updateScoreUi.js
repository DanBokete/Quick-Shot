const updateScoreUi = ({ score }) => {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${score}`;
};

export default updateScoreUi;
