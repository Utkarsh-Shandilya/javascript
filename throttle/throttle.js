const throttle = (func, delay) => {
    if (typeof func !== 'function') return TypeError(`First argument must be a function`);
    if (typeof delay !== 'number') return TypeError(`Delay must be a number`);
    let isThrottled = false;
    return function (...args) {
        if (!isThrottled) {
            func.call(this, ...args);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    }
}