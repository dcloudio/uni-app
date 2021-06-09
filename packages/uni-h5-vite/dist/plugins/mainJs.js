"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const path_1 = __importDefault(require("path"));
const slash_1 = __importDefault(require("slash"));
const utils_1 = require("../utils");
function uniMainJsPlugin() {
    let mainJsPath = '';
    let mainTsPath = '';
    let pagesJsonJsPath = '';
    let isSSR = false;
    return {
        name: 'vite:uni-h5-main-js',
        enforce: 'pre',
        configResolved(config) {
            const mainPath = slash_1.default(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'main'));
            mainJsPath = mainPath + '.js';
            mainTsPath = mainPath + '.ts';
            pagesJsonJsPath = slash_1.default(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'pages.json.js'));
            isSSR =
                utils_1.isSsr(config.command, config) || utils_1.isSsrManifest(config.command, config);
        },
        transform(code, id, ssr) {
            if (id === mainJsPath || id === mainTsPath) {
                if (!isSSR) {
                    code = code.includes('createSSRApp')
                        ? createApp(code)
                        : createLegacyApp(code);
                }
                else {
                    code = ssr ? createSSRServerApp(code) : createSSRClientApp(code);
                }
                code = `import '${pagesJsonJsPath}';${code}`;
                return {
                    code,
                    map: this.getCombinedSourcemap(),
                };
            }
        },
    };
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `import { plugin } from '@dcloudio/uni-h5';createApp().app.use(plugin).mount("#app");${code.replace('createSSRApp', 'createVueApp as createSSRApp')}`;
}
function createLegacyApp(code) {
    return `import { plugin } from '@dcloudio/uni-h5';function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(plugin)};${code.replace('createApp', 'createVueApp')}`;
}
function createSSRClientApp(code) {
    return `import { plugin } from '@dcloudio/uni-h5';import { UNI_SSR, UNI_SSR_STORE } from '@dcloudio/uni-shared';const { app: __app, store: __store } = createApp();__app.use(plugin);__store && window[UNI_SSR] && window[UNI_SSR][UNI_SSR_STORE] && __store.replaceState(window[UNI_SSR][UNI_SSR_STORE]);__app.router.isReady().then(() => __app.mount("#app"));${code}`;
}
function createSSRServerApp(code) {
    return code;
}
