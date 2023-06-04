"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetFileNamesToFileName = exports.uniCssPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const shared_1 = require("@vue/shared");
function isCombineBuiltInCss(config) {
    return config.command === 'build' && config.build.cssCodeSplit;
}
function uniCssPlugin() {
    let resolvedConfig;
    let file = '';
    let fileName = '';
    return {
        name: 'uni:h5-css',
        apply: 'build',
        enforce: 'pre',
        configResolved(config) {
            resolvedConfig = config;
            file = path_1.default.join(process.env.UNI_INPUT_DIR, 'uni.css');
        },
        async generateBundle() {
            if (!isCombineBuiltInCss(resolvedConfig) || !uni_cli_shared_1.buildInCssSet.size) {
                return;
            }
            // 生成框架css(需要排序，避免生成不一样的内容)
            const content = await (0, uni_cli_shared_1.minifyCSS)(generateBuiltInCssCode([...uni_cli_shared_1.buildInCssSet].sort()), resolvedConfig);
            // @ts-ignore 'Buffer' only refers to a type, but is being used as a value here
            const contentHash = (0, uni_cli_shared_1.getAssetHash)(Buffer.from(content, 'utf-8'));
            const assetFileNames = path_1.default.posix.join(resolvedConfig.build.assetsDir, '[name].[hash][extname]');
            fileName = assetFileNamesToFileName(assetFileNames, file, contentHash, content);
            const name = (0, vite_1.normalizePath)(path_1.default.relative(resolvedConfig.root, file));
            this.emitFile({
                name,
                fileName,
                type: 'asset',
                source: content,
            });
        },
        transformIndexHtml: {
            enforce: 'post',
            transform() {
                if (!fileName) {
                    return;
                }
                // 追加框架css
                return [
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'stylesheet',
                            href: toPublicPath(fileName, resolvedConfig),
                        },
                        injectTo: 'head-prepend',
                    },
                ];
            },
        },
    };
}
exports.uniCssPlugin = uniCssPlugin;
function toPublicPath(filename, config) {
    return (0, uni_cli_shared_1.isExternalUrl)(filename) ? filename : config.base + filename;
}
function generateBuiltInCssCode(cssImports) {
    return cssImports
        .map((cssImport) => fs_1.default.readFileSync((0, uni_cli_shared_1.resolveBuiltIn)(cssImport), 'utf8'))
        .join('\n');
}
/**
 * converts the source filepath of the asset to the output filename based on the assetFileNames option. \
 * this function imitates the behavior of rollup.js. \
 * https://rollupjs.org/guide/en/#outputassetfilenames
 *
 * @example
 * ```ts
 * const content = Buffer.from('text');
 * const fileName = assetFileNamesToFileName(
 *   'assets/[name].[hash][extname]',
 *   '/path/to/file.txt',
 *   getAssetHash(content),
 *   content
 * )
 * // fileName: 'assets/file.982d9e3e.txt'
 * ```
 *
 * @param assetFileNames filename pattern. e.g. `'assets/[name].[hash][extname]'`
 * @param file filepath of the asset
 * @param contentHash hash of the asset. used for `'[hash]'` placeholder
 * @param content content of the asset. passed to `assetFileNames` if `assetFileNames` is a function
 * @returns output filename
 */
function assetFileNamesToFileName(assetFileNames, file, contentHash, content) {
    const basename = path_1.default.basename(file);
    // placeholders for `assetFileNames`
    // `hash` is slightly different from the rollup's one
    const extname = path_1.default.extname(basename);
    const ext = extname.slice(1);
    const name = basename.slice(0, -extname.length);
    const hash = contentHash;
    if ((0, shared_1.isFunction)(assetFileNames)) {
        assetFileNames = assetFileNames({
            name: file,
            source: content,
            type: 'asset',
        });
        if (!(0, shared_1.isString)(assetFileNames)) {
            throw new TypeError('assetFileNames must return a string');
        }
    }
    else if (!(0, shared_1.isString)(assetFileNames)) {
        throw new TypeError('assetFileNames must be a string or a function');
    }
    const fileName = assetFileNames.replace(/\[\w+\]/g, (placeholder) => {
        switch (placeholder) {
            case '[ext]':
                return ext;
            case '[extname]':
                return extname;
            case '[hash]':
                return hash;
            case '[name]':
                return name;
        }
        throw new Error(`invalid placeholder ${placeholder} in assetFileNames "${assetFileNames}"`);
    });
    return fileName;
}
exports.assetFileNamesToFileName = assetFileNamesToFileName;
