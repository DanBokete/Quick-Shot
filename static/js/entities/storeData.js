import { player } from "../../game.js";
import { updatePlayerHealth } from "../helpers/helpers.js";
import {
    updateAmmoUi,
    updateHealthUi,
    updateUpgradeWeaponUi,
    updateWeaponUi,
} from "../ui/uiElements.js";
import AK47 from "./Ak47.js";
import { game } from "../../game.js";
import Glock from "./Glock.js";
import RPG from "./RPG.js";

export const storeData = {
    weaponsOnSale: {
        1: {
            name: "Glock",
            price: 0,
            img: "",
            purchase: () => {
                for (let weapon of player.weapons) {
                    if (weapon instanceof Glock) return;
                }
                const weapon = new Glock({ image: game.assets.weapons.glock });
                player.addWeapon({ weapon });
            },
        },
        2: {
            name: "AK47",
            price: 500,
            img: "",
            purchase: () => {
                for (let weapon of player.weapons) {
                    if (weapon instanceof AK47) return;
                }
                const weapon = new AK47({ image: game.assets.weapons.ak });
                console.log("purchase weapon");

                player.addWeapon({ weapon });
            },
        },
        3: {
            name: "RPG",
            price: 900,
            img: "",
            purchase: () => {
                for (let weapon of player.weapons) {
                    if (weapon instanceof RPG) return;
                }
                const weapon = new RPG({ image: game.assets.weapons.rpg });
                player.addWeapon({ weapon });
            },
        },
    },
    upgradesOnSale: {
        1: {
            title: "+5 Ammo",
            price: 10,
            img: "",
            upgrade: () => {
                player.activeWeapon.maxAmmo += 5;
                player.activeWeapon.ammo += 5;
                // storeData.upgradesOnSale[1].price += 5;
                updateAmmoUi();
                updateUpgradeWeaponUi();
            },
            shortCut: "v",
        },
        2: {
            title: "+5% Fire Rate",
            price: 1,
            img: "",
            upgrade: () => {
                player.activeWeapon.fireDelay *= 0.95;
                updateWeaponUi();
                // storeData.upgradesOnSale[2].price += 5;
            },
            shortCut: "b",
        },
        3: {
            title: "-5% Reload Time",
            price: 500,
            img: "",
            upgrade: () => {
                player.activeWeapon.reloadTime *= 0.95;
                // storeData.upgradesOnSale[3].price += 5;
                updateWeaponUi();
            },
            shortCut: "n",
        },
        4: {
            title: "Health +1",
            price: 0,
            img: "",
            upgrade: () => {
                updatePlayerHealth({ maxHealth: 1 });
                storeData.upgradesOnSale[4].price += 5;
            },
            shortCut: "m",
        },
    },
};
