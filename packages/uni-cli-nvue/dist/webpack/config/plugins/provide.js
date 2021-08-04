"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvidePlugin = void 0;
const webpack_1 = require("webpack");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../../../utils");
function createProvidePlugin() {
    return new webpack_1.ProvidePlugin({
        uniCloud: [
            require.resolve('@dcloudio/uni-cloud/dist/uni-cloud.es.js'),
            'default',
        ],
        'uni.getCurrentSubNVue': [utils_1.resolveLib('get-current-sub-nvue.js'), 'default'],
        'uni.requireNativePlugin': [
            utils_1.resolveLib('require-native-plugin.js'),
            'default',
        ],
        ...uni_cli_shared_1.initProvide(),
    });
}
exports.createProvidePlugin = createProvidePlugin;
