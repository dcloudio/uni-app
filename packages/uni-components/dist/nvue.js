const E = function () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
};
E.prototype = {
    on: function (name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx,
        });
        return this;
    },
    once: function (name, callback, ctx) {
        var self = this;
        function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function (name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
    },
    off: function (name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
                if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                    liveEvents.push(evts[i]);
            }
        }
        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
        liveEvents.length ? (e[name] = liveEvents) : delete e[name];
        return this;
    },
};
var E$1 = E;

function initBridge(subscribeNamespace) {
    const emitter = new E$1();
    return {
        on(event, callback) {
            return emitter.on(event, callback);
        },
        once(event, callback) {
            return emitter.once(event, callback);
        },
        off(event, callback) {
            return emitter.off(event, callback);
        },
        emit(event, ...args) {
            return emitter.emit(event, ...args);
        },
        subscribe(event, callback, once = false) {
            emitter[once ? 'once' : 'on'](`${subscribeNamespace}.${event}`, callback);
        },
        unsubscribe(event, callback) {
            emitter.off(`${subscribeNamespace}.${event}`, callback);
        },
        subscribeHandler(event, args, pageId) {
            emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
        },
    };
}

const UniViewJSBridge = initBridge('nvue');

export { UniViewJSBridge };
