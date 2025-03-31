Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') throw TypeError("call must be called on a function!");
    context = context || globalThis;
    const fnSymbol = Symbol("fn");
    context[fnSymbol] = this;
    const result = args ? context[fnSymbol](...args) : context[fnSymbol]();
    delete context[fnSymbol];
    return result;
}