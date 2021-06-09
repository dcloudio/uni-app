"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniResolveIdPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugResolve = debug_1.default('vite:uni:resolve');
function uniResolveIdPlugin() {
    const resolveCache = {};
    return {
        name: 'vite:uni-h5-resolve-id',
        enforce: 'pre',
        configResolved() {
            const { MODE } = uni_cli_shared_1.parseCompatConfigOnce(process.env.UNI_INPUT_DIR);
            resolveCache['@dcloudio/uni-h5'] = uni_cli_shared_1.resolveBuiltIn(path_1.default.join('@dcloudio/uni-h5', 'dist/uni-h5.es.js'));
            resolveCache['@dcloudio/uni-h5-vue'] = uni_cli_shared_1.resolveBuiltIn(path_1.default.join('@dcloudio/uni-h5-vue', `dist/vue.runtime.${MODE === 2 ? 'compat.' : ''}esm.js`));
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
            if (id.startsWith('@dcloudio/uni-h5/style') ||
                id.startsWith('@dcloudio/uni-components/style')) {
                return (resolveCache[id] = uni_cli_shared_1.resolveBuiltIn(id));
            }
        },
    };
}
exports.uniResolveIdPlugin = uniResolveIdPlugin;
