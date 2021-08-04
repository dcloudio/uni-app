"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const configResolved = (config) => {
    // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
    uni_cli_shared_1.removePlugins(['vite:css-post'], config);
    // removePlugins('vite:import-analysis', config)
    // injectCssPlugin(config)
    // injectCssPostPlugin(config)
    // injectAssetPlugin(config)
};
exports.configResolved = configResolved;
