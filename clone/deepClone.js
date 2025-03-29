const deepClone = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = deepClone(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}