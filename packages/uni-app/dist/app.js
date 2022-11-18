"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var Vue = require("vue");
function init() {
    var vueConstructor = (Vue.default ? Vue.default : Vue);
    var defaultMergeHook = vueConstructor.config.optionMergeStrategies.mounted;
    var onReadyFn;
    vueConstructor.config.optionMergeStrategies.mounted = function Le(parentVal, childVal) {
        var res = defaultMergeHook.call(this, parentVal, childVal);
        if (Array.isArray(res)) {
            var index = void 0;
            if (onReadyFn) {
                index = res.indexOf(onReadyFn);
            }
            else {
                index = res.findIndex(function (fn) { return fn.toString().includes('onReady'); });
                onReadyFn = res[index];
            }
            if (index !== -1) {
                res.splice(index, 1);
                res.push(onReadyFn);
            }
        }
        return res;
    };
}
exports.init = init;
