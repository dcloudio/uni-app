"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniMainJsPlugin() {
    return uni_cli_shared_1.defineUniMainJsPlugin((opts) => {
        return {
            name: 'vite:uni-app-main-js',
            enforce: 'pre',
            transform(code, id) {
                if (opts.filter(id)) {
                    code = code.includes('createSSRApp')
                        ? createApp(code)
                        : createLegacyApp(code);
                    return {
                        code: `import './pages.json.js';` + code,
                        map: this.getCombinedSourcemap(),
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `createApp().app.mount("#app");${code.replace('createSSRApp', 'createVueApp as createSSRApp')}`;
}
function createLegacyApp(code) {
    return `function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps)};${code.replace('createApp', 'createVueApp')}`;
}
