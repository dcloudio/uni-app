"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefinePlugin = void 0;
const webpack_1 = require("webpack");
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function createDefinePlugin() {
    return new webpack_1.DefinePlugin(shared_1.extend({
        'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
        'process.env.HBX_USER_TOKEN': JSON.stringify(process.env.HBX_USER_TOKEN || ''),
    }, uni_cli_shared_1.initDefine()));
}
exports.createDefinePlugin = createDefinePlugin;
