"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDevtoolsPlugin = void 0;
const env_1 = require("./env");
const const_1 = require("./const");
__exportStar(require("./api"), exports);
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const hook = env_1.getDevtoolsGlobalHook();
    if (hook) {
        hook.emit(const_1.HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const target = env_1.getTarget();
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn
        });
    }
}
exports.setupDevtoolsPlugin = setupDevtoolsPlugin;
