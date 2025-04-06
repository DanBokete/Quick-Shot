export const getDistance = (p, q) => {
    return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
};

export default getDistance;
