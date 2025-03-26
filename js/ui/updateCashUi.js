const updateCashUi = ({ player }) => {
    const { cash } = player;
    const scoreElement = document.getElementById("cash");
    scoreElement.innerText = `Cash: ${cash}`;
};

export default updateCashUi;
