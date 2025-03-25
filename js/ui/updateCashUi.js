const updateCashUi = ({ cash }) => {
    const scoreElement = document.getElementById("cash");
    scoreElement.innerText = `Cash: ${cash}`;
};

export default updateCashUi;
