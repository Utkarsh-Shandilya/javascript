class PubSub {
    constructor() {
        this.events = [];
        this.isCompleted = false;
        this.hasError = false;
    }

    subscribe(callback, onError = null, onComplete = null, ...operators) {
        if (this.isCompleted || this.hasError)
            return;
        const subscriber = {
            callback,
            onError,
            onComplete,
            operators
        };
        this.events.push(subscriber);
        return () => this.unSubscribe(subscriber);
    }

    next(newValue) {
        if (this.isCompleted || this.hasError)
            return;
        this.events.forEach(({ callback, operators }) => {
            try {
                const processedValue = (operators || []).reduce((val, op) => op(val), newValue);
                callback(processedValue);
            } catch (error) {
                this.error(error);
            }
        }
        );
    }

    error(err) {
        if (this.isCompleted || this.hasError)
            return;
        this.hasError = true;
        this.events.forEach(({ onError }) => {
            if (onError)
                onError(err);
        }
        );
        this.clearSubscriptions();
    }

    complete() {
        if (this.isCompleted || this.hasError)
            return;
        this.isCompleted = true;
        this.events.forEach(({ onComplete }) => {
            if (onComplete)
                onComplete();
        }
        );
        this.clearSubscriptions();
    }

    unSubscribe(callback) {
        this.events = this.events.filter(event => event.callback !== callback);
    }

    clearSubscriptions() {
        this.events = [];
    }
}