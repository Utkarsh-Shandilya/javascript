Function.prototype.customBind = function (context, ...boundArgs) {
    if (typeof this !== 'function') throw TypeError("fn must be a function");
    const fn = this;
    return function (...args) {
        return fn.apply(context, [...boundArgs, ...args]);
    }
}