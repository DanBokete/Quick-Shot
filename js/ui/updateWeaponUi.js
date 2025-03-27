const updateWeaponUi = ({ weapon }) => {
    const { name } = weapon;
    const activeWeaponElement = document.getElementById("activeWeapon");
    activeWeaponElement.innerText = name;
};

export default updateWeaponUi;
