import { player } from "../../game.js";
import {
    updateAmmoUi,
    updateHealthUi,
    updateUpgradeWeaponUi,
} from "../ui/uiElements.js";

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
    upgradesOnSale: {
        1: {
            title: "+5 Ammo",
            price: 10,
            img: "",
            upgrade: () => {
                player.activeWeapon.maxAmmo += 5;
                player.activeWeapon.ammo += 5;
                storeData.upgradesOnSale[1].price += 5;
                updateAmmoUi();
                updateUpgradeWeaponUi();
            },
        },
        2: {
            title: "+5% Fire Rate",
            price: 1,
            img: "",
            upgrade: () => {
                player.activeWeapon.fireDelay *= 0.95;
                storeData.upgradesOnSale[2].price += 5;
            },
        },
        3: {
            title: "-5% Reload Time",
            price: 500,
            img: "",
            upgrade: () => {
                player.activeWeapon.reloadTime *= 0.95;
                storeData.upgradesOnSale[3].price += 5;
            },
        },
        4: {
            title: "Health +5",
            price: 10,
            img: "",
            upgrade: () => {
                player.health += 5;
                player.maxHealth += 5;
                storeData.upgradesOnSale[4].price += 5;
                updateHealthUi();
            },
        },
    },
};
