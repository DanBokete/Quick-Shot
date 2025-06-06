import Player from "../entities/Player.js";
import { game } from "../../game.js";
import createOnSaleWeapons from "../lib/createOnSaleWeapons.js";

export const storeData = {
    weaponsOnSale: [
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
        { id: 3, name: "RPG", price: 0, img: "" },
    ],
    upgradesOnSale: [
        {
            id: 1,
            title: "Increase Ammo Capacity +5",
            price: 10,
            img: "",
        },
        {
            id: 2,
            title: "Increase Fire Rate by 5%",
            price: 1,
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
            price: 10,
            img: "",
        },
    ],
};

/**
 * Assigning parameter types
 * @param {Object} param
 * @param {Player} param.player
 * @param {number|null} param.purchasedWeaponsId
 */
const upgradeMenuUi = ({ player }) => {
    const { weaponsOnSale, upgradesOnSale } = storeData;
    const { purchasedWeaponsId } = game;
    const { isPaused, onUpgradeMenu } = game.state;

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

    createOnSaleWeapons({
        purchasedWeaponsId,
        purchaseWeaponsElement,
        weaponsOnSale,
        player,
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
