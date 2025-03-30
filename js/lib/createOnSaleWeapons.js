/**
 * Creates Weapons on sale
 * @param {object} param
 * @param {number} param.purchasedWeaponsId
 * @param {} param.weaponOnSale
 */
const createOnSaleWeapons = ({
    weaponsOnSale,
    purchaseWeaponsElement,
    purchasedWeaponsId,
    player,
}) => {
    weaponsOnSale.forEach((weapon) => {
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const img = document.createElement("img");
        const weaponName = document.createElement("p");
        const price = document.createElement("button");

        img.src = weapon.img;
        img.alt = weapon.name;

        weaponName.innerText = weapon.name;

        price.innerText = `$${weapon.price}`;
        price.dataset.weaponId = weapon.id;

        if (purchasedWeaponsId.includes(weapon.id)) price.disabled = true;
        price.dataset.price = weapon.price;

        figcaption.appendChild(weaponName);
        figcaption.appendChild(price);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        if (player.activeWeapon && player.activeWeapon.name === weapon.name) {
            figure.style.backgroundColor = "lightGray";
        }

        purchaseWeaponsElement.appendChild(figure);
    });
};

export default createOnSaleWeapons;
