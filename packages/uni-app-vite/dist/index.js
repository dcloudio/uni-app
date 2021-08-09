"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const plugin_1 = require("./plugin");
const template_1 = require("./plugins/template");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const renderjs_1 = require("./plugins/renderjs");
function initUniCssScopedPluginOptions() {
    const styleIsolation = uni_cli_shared_1.getAppStyleIsolation(uni_cli_shared_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR));
    if (styleIsolation === 'shared') {
        return;
    }
    if (styleIsolation === 'isolated') {
        // isolated: 对所有非 App.vue 增加 scoped
        return {};
    }
    // apply-shared: 仅对非页面组件增加 scoped
    return { exclude: /mpType=page/ };
}
const plugins = [
    resolveId_1.uniResolveIdPlugin(),
    template_1.uniTemplatePlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    uni_cli_shared_1.uniViteInjectPlugin(uni_cli_shared_1.initProvide()),
    renderjs_1.uniRenderjsPlugin(),
    plugin_1.UniAppPlugin,
];
const uniCssScopedPluginOptions = initUniCssScopedPluginOptions();
if (uniCssScopedPluginOptions) {
    plugins.unshift(uni_cli_shared_1.uniCssScopedPlugin(uniCssScopedPluginOptions));
}
exports.default = plugins;
