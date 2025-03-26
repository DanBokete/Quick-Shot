const upgradeMenuUi = ({ isPaused, onUpgradeMenu }) => {
    const upgradeMenuContainerElement = document.getElementById(
        "upgradeMenuContainer"
    );

    if (isPaused && onUpgradeMenu) {
        upgradeMenuContainerElement.classList.remove("hide");
    } else {
        upgradeMenuContainerElement.classList.add("hide");
    }
};

export default upgradeMenuUi;
