import updateAmmoUi from "../ui/updateAmmoUi.js";

const handleClick = ({ e, Pointer, player, elapsedFrames, Game }) => {
    const bullet = player.shoot({ Pointer, elapsedFrames });

    if (bullet) {
        player.activeWeapon.ammo--;
        updateAmmoUi(player);
        Game.bullets.push(bullet);
        updateAmmoUi(player);
    }
};

export default handleClick;
