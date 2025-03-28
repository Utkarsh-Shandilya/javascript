export const debounce = (func, delay) => {
    if (typeof func !== 'function') return TypeError(`First argument must be a function`);
    if (typeof delay !== 'number') return TypeError(`Delay must be a number`);
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(this, ...args);
        }, delay);
    }
}