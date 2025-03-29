const memoize = (func, keyGen = JSON.stringify) => {
    if (typeof func !== 'function') throw TypeError("Argument must be a function!");
    const cache = new Map();
    return function (...args) {
        const key = keyGen(...args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    }
}