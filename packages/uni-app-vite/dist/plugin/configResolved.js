"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_cli_shared_2 = require("@dcloudio/uni-cli-shared");
const configResolved = (config) => {
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
        uni_cli_shared_1.assetPlugin(config),
        uni_cli_shared_2.cssPlugin(config),
        uni_cli_shared_2.cssPostPlugin(config),
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
