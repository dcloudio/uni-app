"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniTemplatePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function genViewHtml() {
    const viewHtmlStr = fs_extra_1.default.readFileSync(path_1.default.resolve(__dirname, '../../lib/template/__uniappview.html'), 'utf8');
    const { globalStyle } = uni_cli_shared_1.parsePagesJsonOnce(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
    const __uniConfig = {
        globalStyle: {
            rpxCalcMaxDeviceWidth: globalStyle.rpxCalcMaxDeviceWidth,
            rpxCalcBaseDeviceWidth: globalStyle.rpxCalcBaseDeviceWidth,
        },
    };
    return viewHtmlStr
        .toString()
        .replace('/*__uniConfig*/', `var __uniConfig = ${JSON.stringify(__uniConfig)}`);
}
function uniTemplatePlugin() {
    return {
        name: 'vite:uni-app-template',
        configResolved() {
            const outputDir = process.env.UNI_OUTPUT_DIR;
            return Promise.all([
                fs_extra_1.default.copy(require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'), path_1.default.resolve(outputDir, 'uni-app-view.umd.js'), {
                    overwrite: true,
                }),
                fs_extra_1.default
                    .copy(path_1.default.resolve(__dirname, '../../lib/template/'), outputDir, {
                    overwrite: true,
                })
                    .then(() => fs_extra_1.default.writeFile(path_1.default.resolve(outputDir, '__uniappview.html'), genViewHtml())),
            ]).then(() => { });
        },
    };
}
exports.uniTemplatePlugin = uniTemplatePlugin;
