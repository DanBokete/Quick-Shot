const collision = (obj1, obj2) => {
    if (
        obj1.x + obj1.size < obj2.x ||
        obj2.x + obj2.size < obj1.x ||
        obj1.y > obj2.y + obj2.size ||
        obj2.y > obj1.y + obj1.size
    ) {
        return false;
    }
    return true;
};

export default collision;
