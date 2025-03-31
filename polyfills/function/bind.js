Function.prototype.bind = function (context, ...boundArgs) {
    if (typeof this !== 'function') throw TypeError("bind must be called on a function!");
    const fn = this;
    function boundFunction(...args) {
        return fn.apply(
            this instanceof boundFunction ? this : context,
            [...boundArgs, ...args]
        );
    }
    if (fn.prototype) {
        boundFunction.prototype = Object.create(fn.prototype);
        boundFunction.prototype.constructor = boundFunction;
    }
    return boundFunction;
}