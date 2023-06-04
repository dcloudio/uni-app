"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniH5Plugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const handleHotUpdate_1 = require("./handleHotUpdate");
const transformIndexHtml_1 = require("./transformIndexHtml");
const configureServer_1 = require("./configureServer");
const uni_1 = require("./uni");
const config_1 = require("./config");
const shared_1 = require("@vue/shared");
function uniH5Plugin() {
    const configOptions = {
        resolvedConfig: null,
    };
    rewriteReadFileSync();
    return {
        name: 'uni:h5',
        uni: (0, uni_1.createUni)(),
        config: (0, config_1.createConfig)(configOptions),
        configResolved(config) {
            configOptions.resolvedConfig = config;
        },
        configureServer: (0, configureServer_1.createConfigureServer)(),
        handleHotUpdate: (0, handleHotUpdate_1.createHandleHotUpdate)(),
        transformIndexHtml: (0, transformIndexHtml_1.createTransformIndexHtml)(),
    };
}
exports.uniH5Plugin = uniH5Plugin;
/**
 * 重写 readFileSync
 * 目前主要解决 scss 文件被 @import 的条件编译
 */
function rewriteReadFileSync() {
    const { readFileSync } = fs_1.default;
    fs_1.default.readFileSync = ((filepath, options) => {
        const content = readFileSync(filepath, options);
        if ((0, shared_1.isString)(filepath) &&
            (0, shared_1.isString)(content) &&
            path_1.default.extname(filepath) === '.scss' &&
            content.includes('#endif')) {
            return (0, uni_cli_shared_1.preCss)(content);
        }
        return content;
    });
}
