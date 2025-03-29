const updateCashUi = ({ player }) => {
    const { cash } = player;
    const scoreElement = document.getElementById("cash");
    scoreElement.innerHTML = `Cash: ${player.unlimitedCash ? "&infin;" : cash}`;
};

export default updateCashUi;
