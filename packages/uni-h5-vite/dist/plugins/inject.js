"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniInjectPlugin = void 0;
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const apiJson = require(path_1.default.resolve(__dirname, '../../lib/api.json'));
const uniInjectPluginOptions = {
    exclude: [...uni_cli_shared_1.COMMON_EXCLUDE],
    'uni.': [
        '@dcloudio/uni-h5',
        ((method) => apiJson.includes(method)),
    ],
    getApp: ['@dcloudio/uni-h5', 'getApp'],
    getCurrentPages: ['@dcloudio/uni-h5', 'getCurrentPages'],
    UniServiceJSBridge: ['@dcloudio/uni-h5', 'UniServiceJSBridge'],
    UniViewJSBridge: ['@dcloudio/uni-h5', 'UniViewJSBridge'],
};
function uniInjectPlugin() {
    let resolvedConfig;
    const callback = function (imports, mod) {
        const styles = mod[0] === '@dcloudio/uni-h5' &&
            uni_cli_shared_1.API_DEPS_CSS[mod[1]];
        if (!styles) {
            return;
        }
        styles.forEach((style) => {
            if (uni_cli_shared_1.isCombineBuiltInCss(resolvedConfig)) {
                uni_cli_shared_1.buildInCssSet.add(style);
            }
            else {
                if (!imports.has(style)) {
                    imports.set(style, `import '${style}';`);
                }
            }
        });
    };
    const injectPlugin = uni_cli_shared_1.uniViteInjectPlugin(shared_1.extend(uniInjectPluginOptions, {
        callback,
    }));
    return {
        name: 'vite:uni-h5-inject',
        apply: 'build',
        enforce: 'post',
        configResolved(config) {
            resolvedConfig = config;
        },
        transform(code, id) {
            return injectPlugin.transform.call(this, code, id);
        },
    };
}
exports.uniInjectPlugin = uniInjectPlugin;
