Function.prototype.apply = function (context, args) {
    if (typeof this !== 'function') throw TypeError("apply must be called on a function!");
    context = context || globalThis;
    const fnSymbol = Symbol("fn");
    context[fnSymbol] = this;
    const result = Array.isArray(args) ? context[fnSymbol](...args) : context[fnSymbol]();
    delete context[fnSymbol];
    return result;
}