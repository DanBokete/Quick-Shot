import { player } from "../../game.js";
import AK47 from "../entities/Ak47.js";
import Glock from "../entities/Glock.js";
import RPG from "../entities/RPG.js";

/** Completes Animations */
export const resolveAnimations = () => {
    if (player.activeWeapon) {
        if (player.activeWeapon instanceof Glock) {
            if (player.activeWeapon.frameX >= 12) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon instanceof AK47) {
            if (player.activeWeapon.frameX >= 12) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon instanceof RPG) {
            if (player.activeWeapon.frameX >= 8) {
                player.activeWeapon.frameX = 0;
            }
        }
        if (player.activeWeapon.frameX) player.activeWeapon.frameX++;
    }
};
