class PubSub {
    constructor() {
        this.events = [];
    }

    subscribe(callback) {
        this.events.push(callback);
    }

    next(newValue) {
        this.events.forEach(func => {
            func(newValue);
        })
    }
}