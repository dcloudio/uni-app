"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const configResolved = (config) => {
    if (process.env.UNI_APP_CODE_SPLITING) {
        initCodeSpliting(config);
    }
    else {
        // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
        uni_cli_shared_1.removePlugins(['vite:asset', 'vite:css-post'], config);
    }
};
exports.configResolved = configResolved;
function initCodeSpliting(config) {
    uni_cli_shared_1.removePlugins('vite:import-analysis', config);
    uni_cli_shared_1.injectAssetAndCssPlugins(config);
}
