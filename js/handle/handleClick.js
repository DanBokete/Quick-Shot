import updateAmmoUi from "../ui/updateAmmoUi.js";
import upgradeMenuUi from "../ui/upgradeMenuUi.js";

const handleClick = ({ e, Pointer, player, elapsedFrames, Game }) => {
    const upgradeMenuBtn = document.getElementById("upgradeMenu");
    const closeBtn = document.getElementById("close");

    if (e.target === upgradeMenuBtn) {
        Game.state.isPaused = true;
        Game.state.onUpgradeMenu = true;
        upgradeMenuUi(Game.state);
        return;
    }

    if (e.target === closeBtn) {
        Game.state.isPaused = false;
        Game.state.onUpgradeMenu = false;
        upgradeMenuUi(Game.state);
        return;
    }

    if (Game.state.isPaused && Game.state.onUpgradeMenu) return;

    const bullet = player.shoot({ Pointer, elapsedFrames });

    if (bullet) {
        player.activeWeapon.ammo--;
        updateAmmoUi(player);
        Game.bullets.push(bullet);
        updateAmmoUi(player);
    }
};

export default handleClick;
