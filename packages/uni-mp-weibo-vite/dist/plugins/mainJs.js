"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
function uniMainJsPlugin() {
    return (0, uni_cli_shared_1.defineUniMainJsPlugin)((opts) => {
        let runSSR = false;
        return {
            name: 'uni:h5-main-js',
            enforce: 'pre',
            configResolved(config) {
                runSSR =
                    (0, uni_cli_shared_1.isSsr)(config.command, config) || (0, utils_1.isSsrManifest)(config.command, config);
            },
            transform(code, id, options) {
                if (opts.filter(id)) {
                    if (!runSSR) {
                        code = code.includes('createSSRApp')
                            ? createApp(code)
                            : createLegacyApp(code);
                    }
                    else {
                        code = (0, utils_1.isSSR)(options)
                            ? createSSRServerApp(code)
                            : createSSRClientApp(code);
                    }
                    code = `import './${uni_cli_shared_1.PAGES_JSON_JS}';${code}`;
                    return {
                        code,
                        map: this.getCombinedSourcemap(),
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-mp-weibo';${code.replace('createSSRApp', 'createVueApp as createSSRApp')};createApp().app.use(__plugin).mount("#app");`;
}
function createLegacyApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-mp-weibo';function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(__plugin)};${code.replace('createApp', 'createVueApp')}`;
}
function createSSRClientApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-mp-weibo';import { UNI_SSR, UNI_SSR_STORE } from '@dcloudio/uni-shared';${code};const { app: __app, store: __store } = createApp();__app.use(__plugin);__store && window[UNI_SSR] && window[UNI_SSR][UNI_SSR_STORE] && __store.replaceState(window[UNI_SSR][UNI_SSR_STORE]);__app.router.isReady().then(() => __app.mount("#app"));`;
}
function createSSRServerApp(code) {
    return code;
}
