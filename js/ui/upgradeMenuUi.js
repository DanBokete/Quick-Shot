import Player from "../classes/Player.js";
import { Game } from "../../game.js";

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {Game} param.Game
 * @param {number|null} param.purchasedWeaponsId
 */
const upgradeMenuUi = ({ Game, player }) => {
    const { purchasedWeaponsId } = Game;
    const { isPaused, onUpgradeMenu } = Game.state;

    const upgradeMenuContainerElement = document.getElementById(
        "upgradeMenuContainer"
    );
    const purchaseWeaponsElement = document.getElementById("purchaseWeapons");
    const upgradesElement = document.getElementById("upgrades");

    if (!isPaused || !onUpgradeMenu) {
        upgradeMenuContainerElement.classList.add("hide");
        if (purchaseWeaponsElement) {
            purchaseWeaponsElement.innerHTML = "";
            upgradesElement.innerHTML = "";
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

    const upgradesOnSale = [
        {
            id: 1,
            title: "Increase Ammo Capacity +5",
            price: 10,
            img: "",
        },
        {
            id: 2,
            title: "Increase Fire Rate",
            price: 300,
            img: "",
        },
        {
            id: 3,
            title: "Reduce Reload Time",
            price: 500,
            img: "",
        },
        {
            id: 4,
            title: "Increase Health capacity +5",
            price: 5,
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
        price.dataset.weaponId = weapon.id;

        if (purchasedWeaponsId.includes(weapon.id)) price.disabled = true;
        price.dataset.price = weapon.price;

        figcaption.appendChild(weaponName);
        figcaption.appendChild(price);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        if (player.activeWeapon && player.activeWeapon.name === weapon.name) {
            figure.style.backgroundColor = "lightGray";
        }

        purchaseWeaponsElement.appendChild(figure);
    });

    upgradesOnSale.forEach((upgrade) => {
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const img = document.createElement("img");
        const title = document.createElement("p");
        const price = document.createElement("button");

        img.src = upgrade.img;
        img.alt = upgrade.title;

        title.innerText = upgrade.title;

        price.innerText = `$${upgrade.price}`;
        price.dataset.upgradeId = upgrade.id;
        price.dataset.price = upgrade.price;

        figcaption.appendChild(title);
        figcaption.appendChild(price);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        upgradesElement.appendChild(figure);
    });
};

export default upgradeMenuUi;
