Array.prototype.includes = function (valueToBeFound, fromIndex = 0) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const start = Math.max(fromIndex >= 0 ? fromIndex : (len + fromIndex), 0);
    for (let i = start; i < len; i++) {
        if (arr[i] === valueToBeFound || (Number.isNaN(arr[i]) && Number.isNaN(valueToBeFound))) return true;
    }
    return false;
}
