"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var vue_1 = require("vue");
function updateLifeCycle(lifecycles, setupLifecycles, fn) {
    if (fn) {
        if (fn.lifecycles) {
            fn.lifecycles.forEach(function (item) {
                if (!setupLifecycles.includes(item)) {
                    setupLifecycles.push(item);
                }
            });
        }
        else {
            var fnString_1 = fn.toString();
            lifecycles.forEach(function (item) {
                if (!setupLifecycles.includes(item) && (new RegExp("\\b(".concat(item, ")\\b"))).test(fnString_1)) {
                    setupLifecycles.push(item);
                }
            });
        }
    }
}
function init(lifecycles) {
    var setup = vue_1.default.config.optionMergeStrategies.setup;
    var extend = vue_1.default.extend;
    vue_1.default.extend = function () {
        var extendedVue = extend.apply(this, arguments);
        var newOptions = extendedVue.options;
        var setup = newOptions.setup;
        if (setup && setup.lifecycles) {
            setup.lifecycles.forEach(function (item) {
                newOptions[item] = newOptions[item] || [function noop() { }];
            });
        }
        return extendedVue;
    };
    Object.defineProperty(vue_1.default.config.optionMergeStrategies, 'setup', {
        set: function (fn) {
            setup = fn;
        },
        get: function () {
            return function (to, from) {
                if (typeof setup === 'function') {
                    var newSetup = setup.apply(this, arguments);
                    newSetup.lifecycles = newSetup.lifecycles || [];
                    updateLifeCycle(lifecycles, newSetup.lifecycles, from);
                    updateLifeCycle(lifecycles, newSetup.lifecycles, to);
                    return newSetup;
                }
            };
        }
    });
}
exports.init = init;
