const normaliseVector = (side1, side2) => {
    const a = side1;
    const b = side2;

    const c = Math.sqrt(a ** 2 + b ** 2);

    const normalisedA = a / c;
    const normalisedB = b / c;
    const normalisedC = c / c;

    return { a: normalisedA, b: normalisedB, c: normalisedC };
};

export default normaliseVector;
