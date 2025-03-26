const updateWeaponUi = ({ name }) => {
    const activeWeaponElement = document.getElementById("activeWeapon");
    activeWeaponElement.innerText = name;
};

export default updateWeaponUi;
