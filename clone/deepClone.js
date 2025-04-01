const deepClone = (obj) => {
    if (obj === null || typeof obj !== "object") return obj;

    const constructors = [Date, Map, Set, RegExp];
    for (const type of constructors) {
        if (obj instanceof type) return new type(obj);
    }

    if (Array.isArray(obj)) return obj.map(deepClone);

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    );
};