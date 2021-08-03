"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCopyPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniCopyPlugin() {
    return uni_cli_shared_1.uniViteCopyPlugin({
        copyOnce: true,
        targets: [
            {
                src: uni_cli_shared_1.normalizePath(path_1.default.resolve(__dirname, '../../lib/template/*.js')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
            {
                src: uni_cli_shared_1.normalizePath(path_1.default.resolve(__dirname, '../../lib/template/*.png')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
            {
                src: uni_cli_shared_1.normalizePath(require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
            {
                src: uni_cli_shared_1.normalizePath(path_1.default.resolve(__dirname, '../../lib/template/__uniappview.html')),
                dest: process.env.UNI_OUTPUT_DIR,
                transform(content) {
                    const { globalStyle } = uni_cli_shared_1.parsePagesJsonOnce(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
                    const __uniConfig = {
                        globalStyle: {
                            rpxCalcMaxDeviceWidth: globalStyle.rpxCalcMaxDeviceWidth,
                            rpxCalcBaseDeviceWidth: globalStyle
                                .rpxCalcBaseDeviceWidth,
                        },
                    };
                    return content
                        .toString()
                        .replace('/*__uniConfig*/', `var __uniConfig = ${JSON.stringify(__uniConfig)}`);
                },
            },
        ],
        hook: 'writeBundle',
        verbose: process.env.DEBUG ? true : false,
    });
}
exports.uniCopyPlugin = uniCopyPlugin;
