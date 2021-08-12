"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniTemplatePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const renderjs_1 = require("./renderjs");
function genViewHtml(bundle) {
    const viewHtmlStr = fs_extra_1.default.readFileSync(path_1.default.resolve(__dirname, '../../lib/template/__uniappview.html'), 'utf8');
    const { globalStyle } = uni_cli_shared_1.parsePagesJsonOnce(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
    const __uniConfig = {
        globalStyle: {
            rpxCalcMaxDeviceWidth: globalStyle.rpxCalcMaxDeviceWidth,
            rpxCalcBaseDeviceWidth: globalStyle.rpxCalcBaseDeviceWidth,
        },
    };
    const wxsCode = bundle[renderjs_1.APP_WXS_JS]
        ? `<script src="${renderjs_1.APP_WXS_JS}"></script>`
        : '';
    const renderjsCode = bundle[renderjs_1.APP_RENDERJS_JS]
        ? `<script src="${renderjs_1.APP_RENDERJS_JS}"></script>`
        : '';
    return viewHtmlStr
        .toString()
        .replace('<!--wxsCode-->', wxsCode)
        .replace('<!--renderjsCode-->', renderjsCode)
        .replace('/*__uniConfig*/', `var __uniConfig = ${JSON.stringify(__uniConfig)}`);
}
function uniTemplatePlugin() {
    let outputDir;
    return {
        name: 'vite:uni-app-template',
        enforce: 'post',
        configResolved() {
            outputDir = process.env.UNI_OUTPUT_DIR;
            fs_extra_1.default.copySync(require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'), path_1.default.resolve(outputDir, 'uni-app-view.umd.js'), {
                overwrite: true,
            });
            fs_extra_1.default.copySync(path_1.default.resolve(__dirname, '../../lib/template/'), outputDir, {
                overwrite: true,
                filter(src) {
                    return !src.includes('__uniappview.html');
                },
            });
        },
        generateBundle(_, bundle) {
            this.emitFile({
                fileName: '__uniappview.html',
                source: genViewHtml(bundle),
                type: 'asset',
            });
        },
    };
}
exports.uniTemplatePlugin = uniTemplatePlugin;
