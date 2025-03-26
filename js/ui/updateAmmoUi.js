const updateAmmoUi = ({ player, Game }) => {
    const ammoElement = document.getElementById("ammo");
    const { elapsedFrames } = Game.meta;
    const { activeWeapon } = player;
    if (!activeWeapon) return;
    if (activeWeapon.state.isReloading) {
        ammoElement.innerText = `reloading....${-(
            elapsedFrames -
            activeWeapon.lastReloaded -
            activeWeapon.reloadTime
        )}`;
    } else {
        ammoElement.innerText = `${activeWeapon.ammo}/${activeWeapon.maxAmmo}`;
    }
};

export default updateAmmoUi;
