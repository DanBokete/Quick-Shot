export const displayMenu = () => {
    const previousMenuElement = document.getElementById("menu");
    if (previousMenuElement) {
        previousMenuElement.remove();
    }

    const menuElement = document.createElement("div");
    menuElement.id = "menu";

    const startBtn = document.createElement("button");
    startBtn.innerText = "Start Game";
    startBtn.id = "startBtn";

    menuElement.appendChild(startBtn);

    document.querySelector("#gameContainer").appendChild(menuElement);
};
