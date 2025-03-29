Array.prototype.groupBy = function (callBack, thisArg) {
    if (!this || typeof this[Symbol.iterator] !== 'function') {
        throw new TypeError('groupBy is not iterable!');
    }
    if (this.length === 0) return {};
    if (typeof callBack !== 'function') throw new TypeError('Callback must be a function!');
    const result = new Map();
    for (const [i, element] of this.entries()) {
        if (element == null) continue;
        const keyResult = callBack.call(thisArg, element, i, this);
        if (!result.has(keyResult)) result.set(keyResult, []);
        result.get(keyResult).push(element);
    }
    return Object.fromEntries(result);
}