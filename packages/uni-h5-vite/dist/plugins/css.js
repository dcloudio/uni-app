"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCssPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function isCombineBuiltInCss(config) {
    return config.command === 'build' && config.build.cssCodeSplit;
}
function uniCssPlugin() {
    let resolvedConfig;
    return {
        name: 'vite:uni-h5-css',
        apply: 'build',
        enforce: 'post',
        configResolved(config) {
            resolvedConfig = config;
        },
        generateBundle(_opts, bundle) {
            // 将内置组件样式，合并进入首页
            if (!isCombineBuiltInCss(resolvedConfig) || !uni_cli_shared_1.buildInCssSet.size) {
                return;
            }
            const chunks = Object.values(bundle);
            const entryChunk = chunks.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
            if (!entryChunk) {
                return;
            }
            const entryName = entryChunk.name;
            const entryCssAsset = chunks.find(({ name }) => name === entryName + '.css');
            if (entryCssAsset) {
                entryCssAsset.source =
                    generateBuiltInCssCode([...uni_cli_shared_1.buildInCssSet]) +
                        '\n' +
                        entryCssAsset.source;
            }
        },
    };
}
exports.uniCssPlugin = uniCssPlugin;
function generateBuiltInCssCode(cssImports) {
    return cssImports
        .map((cssImport) => fs_1.default.readFileSync(uni_cli_shared_1.resolveBuiltIn(cssImport), 'utf8'))
        .join('\n');
}
