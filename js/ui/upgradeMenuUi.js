const upgradeMenuUi = ({ state, purchasedWeaponsId }) => {
    const { isPaused, onUpgradeMenu } = state;
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
            id: 1,
            name: "Glock",
            price: 0,
            img: "",
        },
        {
            id: 2,
            name: "AK47",
            price: 20,
            img: "",
        },
        { id: 3, name: "RPG", price: 9000, img: "" },
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
        price.dataset.weaponId = weapon.id;

        if (purchasedWeaponsId.includes(weapon.id)) price.disabled = true;
        price.dataset.price = weapon.price;

        figcaption.appendChild(weaponName);
        figcaption.appendChild(price);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        purchaseWeaponsElement.appendChild(figure);
    });
};

export default upgradeMenuUi;
