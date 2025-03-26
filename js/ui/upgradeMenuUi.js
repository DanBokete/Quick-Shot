const upgradeMenuUi = ({ isPaused, onUpgradeMenu }) => {
    const upgradeMenuContainerElement = document.getElementById(
        "upgradeMenuContainer"
    );
    const purchaseWeaponsElement = document.getElementById("purchaseWeapons");

    if (!isPaused || !onUpgradeMenu) {
        upgradeMenuContainerElement.classList.add("hide");
        if (purchaseWeaponsElement) {
            purchaseWeaponsElement.innerHTML = "";
        }
        return;
    }

    upgradeMenuContainerElement.classList.remove("hide");

    const weaponsOnSale = [
        {
            name: "Glock",
            price: 300,
            img: "",
        },
        {
            name: "AK47",
            price: 3000,
            img: "",
        },
        {
            name: "RPG",
            price: 9000,
            img: "",
        },
    ];

    weaponsOnSale.forEach((weapon) => {
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const img = document.createElement("img");
        const weaponName = document.createElement("p");
        const price = document.createElement("button");

        img.src = weapon.img;
        img.alt = weapon.name;

        weaponName.innerText = weapon.name;
        price.innerText = `$${weapon.price}`;

        figcaption.appendChild(weaponName);
        figcaption.appendChild(price);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        purchaseWeaponsElement.appendChild(figure);
    });
};

export default upgradeMenuUi;
