const deactivate = ({ e, Keys }) => {
    const key = e.key;

    if (key === "w") {
        Keys.moveUp = false;
    }
    if (key === "s") {
        Keys.moveDown = false;
    }
    if (key === "a") {
        Keys.moveLeft = false;
    }
    if (key === "d") {
        Keys.moveRight = false;
    }
};

export default deactivate;
