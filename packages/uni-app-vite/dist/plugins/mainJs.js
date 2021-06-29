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
                        code: `import './pages.json.js';` + JS_RUNTIME_CODE + code,
                        map: this.getCombinedSourcemap(),
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
const JS_RUNTIME_CODE = `import {injectHook as __injectHook__,createApp as __createApp__} from 'vue';const __RUNTIME__ = {injectHook:__injectHook__,createApp:__createApp__};`;
function createApp(code) {
    return `const __app__=createApp().app;__app__._component.render=()=>{};__app__.use(__vuePlugin,__RUNTIME__).mount("#app");${code.replace('createSSRApp', 'createVueApp as createSSRApp')}`;
}
function createLegacyApp(code) {
    return `function createApp(rootComponent,rootProps){const app=createVueApp(rootComponent,rootProps).use(__vuePlugin,__RUNTIME__);app.render=()=>{};const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace('createApp', 'createVueApp')}`;
}
