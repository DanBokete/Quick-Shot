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

    const text = document.createElement("small");
    text.innerText = "Please read the guide before continuing";

    menuElement.appendChild(startBtn);
    menuElement.appendChild(text);

    document.querySelector("#gameContainer").appendChild(menuElement);
};
