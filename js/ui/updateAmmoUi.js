const updateAmmoUi = ({ activeWeapon }) => {
    const ammoElement = document.getElementById("ammo");
    ammoElement.innerText = `Ammo: ${activeWeapon.ammo}/${activeWeapon.maxAmmo}`;
};

export default updateAmmoUi;
