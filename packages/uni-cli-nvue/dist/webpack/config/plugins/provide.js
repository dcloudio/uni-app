"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provide = void 0;
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const libDir = path_1.default.resolve(__dirname, '../../../../lib');
const definitions = Object.assign({ uniCloud: [
        require.resolve('@dcloudio/uni-cloud/dist/uni-cloud.es.js'),
        'default',
    ], 'uni.getCurrentSubNVue': [
        path_1.default.join(libDir, 'get-current-sub-nvue.js'),
        'default',
    ], 'uni.requireNativePlugin': [
        path_1.default.join(libDir, 'require-native-plugin.js'),
        'default',
    ] }, uni_cli_shared_1.initProvide());
exports.provide = new webpack_1.ProvidePlugin(definitions);
