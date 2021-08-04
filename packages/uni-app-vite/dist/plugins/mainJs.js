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
    return `const __app__=createApp().app;__app__._component.mpType='app';__app__._component.render=()=>{};__app__.use(uni.__vuePlugin).mount("#app");${code.replace('createSSRApp', 'createVueApp as createSSRApp')}`;
}
function createLegacyApp(code) {
    return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';const app=createVueApp(rootComponent,rootProps).use(uni.__vuePlugin);app.render=()=>{};const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace('createApp', 'createVueApp')}`;
}
