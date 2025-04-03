Array.prototype.some = function (callback, thisArg) {
    if (typeof callback !== 'function') throw TypeError('callback must be a function!');
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in arr) {
            if (callback.call(thisArg, arr[i], i, arr)) {
                return true;
            }
        }
    }
    return false;
}