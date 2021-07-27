"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const css_1 = require("./plugins/css");
const cssScoped_1 = require("./plugins/cssScoped");
const inject_1 = require("./plugins/inject");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const setup_1 = require("./plugins/setup");
const ssr_1 = require("./plugins/ssr");
const utils_1 = require("./utils");
const handleHotUpdate_1 = require("./handleHotUpdate");
const transformIndexHtml_1 = require("./transformIndexHtml");
function initLogger({ logger, command }) {
    if (command !== 'serve') {
        return;
    }
    const { info } = logger;
    logger.info = (msg, opts) => {
        // 兼容 HBuilderX 日志输出协议（可以让 HBuilderX 读取到 server 地址，自动打开浏览器）
        if (msg && (msg.includes(' > Local:') || msg.includes(' > Network:'))) {
            msg = msg.replace('>', '-');
        }
        return info(msg, opts);
    };
}
const UniH5Plugin = {
    name: 'vite:uni-h5',
    uni: {
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
            define: utils_1.createDefine(env.command, config),
        };
    },
    configResolved(config) {
        initLogger(config);
        config.cacheDir = '';
    },
    handleHotUpdate: handleHotUpdate_1.createHandleHotUpdate(),
    transformIndexHtml: transformIndexHtml_1.createTransformIndexHtml(),
};
exports.default = [
    cssScoped_1.uniCssScopedPlugin(),
    resolveId_1.uniResolveIdPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    inject_1.uniInjectPlugin(),
    css_1.uniCssPlugin(),
    ssr_1.uniSSRPlugin(),
    setup_1.uniSetupPlugin(),
    UniH5Plugin,
];
