"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniH5Plugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const handleHotUpdate_1 = require("./handleHotUpdate");
const transformIndexHtml_1 = require("./transformIndexHtml");
const features_1 = require("../utils/features");
exports.UniH5Plugin = {
    name: 'vite:uni-h5',
    uni: {
        copyOptions: {
            assets: ['hybrid/html'],
        },
        transformEvent: {
            tap: 'click',
        },
    },
    config(config, env) {
        if (uni_cli_shared_1.isInHBuilderX()) {
            if (!fs_1.default.existsSync(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'index.html'))) {
                console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`);
                process.exit();
            }
        }
        return {
            optimizeDeps: {
                exclude: ['@dcloudio/uni-h5', '@dcloudio/uni-h5-vue'],
            },
            define: features_1.createDefine(env.command, config),
        };
    },
    configResolved(config) {
        // TODO 禁止 optimizeDeps
        ;
        config.cacheDir = '';
    },
    handleHotUpdate: handleHotUpdate_1.createHandleHotUpdate(),
    transformIndexHtml: transformIndexHtml_1.createTransformIndexHtml(),
};
