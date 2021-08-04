"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const configResolved = (config) => {
    uni_cli_shared_1.removePlugins('vite:import-analysis', config);
    uni_cli_shared_1.injectCssPlugin(config);
    uni_cli_shared_1.injectCssPostPlugin(config);
    uni_cli_shared_1.injectAssetPlugin(config);
};
exports.configResolved = configResolved;
