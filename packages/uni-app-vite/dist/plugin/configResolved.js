"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const asset_1 = require("../plugins/vitejs/plugins/asset");
const css_1 = require("../plugins/vitejs/plugins/css");
const configResolved = (config) => {
    const manifestJson = uni_cli_shared_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR);
    if (uni_cli_shared_1.getNVueCompiler(manifestJson) === 'uni-app') {
        process.env.UNI_USING_NVUE_COMPILER = 'uni-app';
    }
    if (uni_cli_shared_1.getNVueStyleCompiler(manifestJson) === 'uni-app') {
        process.env.UNI_USING_NVUE_STYLE_COMPILER = 'uni-app';
    }
    if (process.env.UNI_APP_CODE_SPLITING) {
        initCodeSpliting(config);
    }
    else {
        // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
        const index = config.plugins.findIndex((p) => p.name === 'vite:css-post');
        if (index > -1) {
            ;
            config.plugins.splice(index, 1);
        }
    }
};
exports.configResolved = configResolved;
function initCodeSpliting(config) {
    // 替换内置插件
    const replacedPlugins = [
        asset_1.assetPlugin(config),
        css_1.cssPlugin(config),
        css_1.cssPostPlugin(config),
    ];
    replacedPlugins.forEach((plugin) => {
        const index = config.plugins.findIndex((p) => p.name === plugin.name);
        if (index > -1) {
            ;
            config.plugins.splice(index, 1, plugin);
        }
    });
    const removedPlugins = ['vite:import-analysis'];
    removedPlugins.forEach((name) => {
        const index = config.plugins.findIndex((p) => p.name === name);
        if (index > -1) {
            ;
            config.plugins.splice(index, 1);
        }
    });
}
