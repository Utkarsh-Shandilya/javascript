Array.prototype.fill = function (value, start = 0, end = this.length) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    const e = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
    for (let i = s; i < e; i++) {
        arr[i] = value;
    }
    return arr;
}