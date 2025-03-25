const updateHealthUi = ({ health, maxHealth }) => {
    const healthContainerElement = document.getElementById("healthContainer");
    const healthElement = document.getElementById("health");
    healthElement.innerText = `${health}/${maxHealth}`;
    healthElement.style.width = `${(health / maxHealth) * 100}%`;

    if (health <= 2) {
        healthContainerElement.classList.add("shake");
        healthElement.classList.add("shake");
        // healthElement.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    } else {
        healthContainerElement.classList.remove("shake");
        healthContainerElement.classList.remove("low-health");
        healthElement.classList.remove("shake");
        healthElement.classList.remove("low-health");
    }
};

export default updateHealthUi;
