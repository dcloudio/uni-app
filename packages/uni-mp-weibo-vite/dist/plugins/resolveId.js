"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniResolveIdPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const debugResolve = (0, debug_1.default)('uni:resolve');
function uniResolveIdPlugin() {
    const resolveCache = {};
    return {
        name: 'uni:h5-resolve-id',
        enforce: 'pre',
        config() {
            resolveCache[utils_1.ownerModuleName] = (0, uni_cli_shared_1.resolveBuiltIn)(path_1.default.join(utils_1.ownerModuleName, 'dist/uni-mp-weibo.es.js'));
            resolveCache['@dcloudio/uni-h5-vue'] = (0, uni_cli_shared_1.resolveBuiltIn)(path_1.default.join('@dcloudio/uni-h5-vue', `dist/vue.runtime.${process.env.VITEST ? 'cjs' : 'esm'}.js`));
        },
        resolveId(id) {
            if (id === 'vue') {
                id = '@dcloudio/uni-h5-vue';
            }
            const cache = resolveCache[id];
            if (cache) {
                debugResolve('cache', id, cache);
                return cache;
            }
            if (id.startsWith('@dcloudio/uni-mp-weibo/style')) {
                return (resolveCache[id] = (0, uni_cli_shared_1.resolveBuiltIn)(id));
            }
            if (id.startsWith('@dcloudio/uni-components/style')) {
                return (resolveCache[id] = (0, uni_cli_shared_1.resolveBuiltIn)(id));
            }
        },
    };
}
exports.uniResolveIdPlugin = uniResolveIdPlugin;
