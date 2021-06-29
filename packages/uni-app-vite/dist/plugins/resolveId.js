"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniResolveIdPlugin = void 0;
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugResolve = debug_1.default('vite:uni:resolve');
function uniResolveIdPlugin() {
    const resolveCache = {};
    return {
        name: 'vite:uni-app-resolve-id',
        enforce: 'pre',
        configResolved() {
            resolveCache['@dcloudio/uni-app-vue'] = uni_cli_shared_1.resolveBuiltIn('@dcloudio/uni-app-vue');
        },
        resolveId(id) {
            if (id === 'vue') {
                id = '@dcloudio/uni-app-vue';
            }
            const cache = resolveCache[id];
            if (cache) {
                debugResolve('cache', id, cache);
                return cache;
            }
        },
    };
}
exports.uniResolveIdPlugin = uniResolveIdPlugin;
