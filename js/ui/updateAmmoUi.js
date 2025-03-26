const updateAmmoUi = ({ activeWeapon }) => {
    const ammoElement = document.getElementById("ammo");
    if (!activeWeapon) return;
    ammoElement.innerText = `Ammo: ${activeWeapon.ammo}/${activeWeapon.maxAmmo}`;
};

export default updateAmmoUi;
