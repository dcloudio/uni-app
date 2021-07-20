"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssUrlRE = exports.cssPostPlugin = exports.cssPlugin = exports.chunkToEmittedCssFileMap = exports.isDirectCSSRequest = exports.isCSSRequest = exports.cssLangRE = void 0;
/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/css.ts
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const utils_1 = require("../utils");
const postcss_load_config_1 = __importDefault(require("postcss-load-config"));
const pluginutils_1 = require("@rollup/pluginutils");
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("../constants");
const asset_1 = require("./asset");
const magic_string_1 = __importDefault(require("magic-string"));
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
exports.cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const directRequestRE = /(\?|&)direct\b/;
const commonjsProxyRE = /\?commonjs-proxy/;
const isCSSRequest = (request) => exports.cssLangRE.test(request) && !directRequestRE.test(request);
exports.isCSSRequest = isCSSRequest;
const isDirectCSSRequest = (request) => exports.cssLangRE.test(request) && directRequestRE.test(request);
exports.isDirectCSSRequest = isDirectCSSRequest;
const cssModulesCache = new WeakMap();
exports.chunkToEmittedCssFileMap = new WeakMap();
/**
 * Plugin applied before user plugins
 */
function cssPlugin(config) {
    let server;
    let moduleCache;
    const resolveUrl = config.createResolver({
        preferRelative: true,
        tryIndex: false,
        extensions: [],
    });
    const atImportResolvers = createCSSResolvers(config);
    return {
        name: 'vite:css',
        configureServer(_server) {
            server = _server;
        },
        buildStart() {
            // Ensure a new cache for every build (i.e. rebuilding in watch mode)
            moduleCache = new Map();
            cssModulesCache.set(config, moduleCache);
        },
        transform(raw, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!exports.cssLangRE.test(id) || commonjsProxyRE.test(id)) {
                    return;
                }
                const urlReplacer = (url, importer) => __awaiter(this, void 0, void 0, function* () {
                    if (asset_1.checkPublicFile(url, config)) {
                        return config.base + url.slice(1);
                    }
                    const resolved = yield resolveUrl(url, importer);
                    if (resolved) {
                        return asset_1.fileToUrl(resolved, config, this);
                    }
                    return url;
                });
                const { code: css, modules, deps, } = yield compileCSS(id, raw, config, urlReplacer, atImportResolvers, server);
                if (modules) {
                    moduleCache.set(id, modules);
                }
                // track deps for build watch mode
                if (config.command === 'build' && config.build.watch && deps) {
                    for (const file of deps) {
                        this.addWatchFile(file);
                    }
                }
                // dev
                if (server) {
                    // server only logic for handling CSS @import dependency hmr
                    const { moduleGraph } = server;
                    const thisModule = moduleGraph.getModuleById(id);
                    // CSS modules cannot self-accept since it exports values
                    const isSelfAccepting = !modules;
                    if (deps) {
                        // record deps in the module graph so edits to @import css can trigger
                        // main import to hot update
                        const depModules = new Set([...deps].map((file) => moduleGraph.createFileOnlyEntry(file)));
                        moduleGraph.updateModuleInfo(thisModule, depModules, 
                        // The root CSS proxy module is self-accepting and should not
                        // have an explicit accept list
                        new Set(), isSelfAccepting);
                        for (const file of deps) {
                            this.addWatchFile(file);
                        }
                    }
                    else {
                        thisModule.isSelfAccepting = isSelfAccepting;
                    }
                }
                return {
                    code: css,
                    // TODO CSS source map
                    map: { mappings: '' },
                };
            });
        },
    };
}
exports.cssPlugin = cssPlugin;
/**
 * Plugin applied after user plugins
 */
function cssPostPlugin(config) {
    // styles initialization in buildStart causes a styling loss in watch
    const styles = new Map();
    let pureCssChunks;
    // when there are multiple rollup outputs and extracting CSS, only emit once,
    // since output formats have no effect on the generated CSS.
    let outputToExtractedCSSMap;
    let hasEmitted = false;
    return {
        name: 'vite:css-post',
        buildStart() {
            // Ensure new caches for every build (i.e. rebuilding in watch mode)
            pureCssChunks = new Set();
            outputToExtractedCSSMap = new Map();
            hasEmitted = false;
        },
        transform(css, id, ssr) {
            if (!exports.cssLangRE.test(id) || commonjsProxyRE.test(id)) {
                return;
            }
            const modules = cssModulesCache.get(config).get(id);
            const modulesCode = modules && pluginutils_1.dataToEsm(modules, { namedExports: true, preferConst: true });
            if (config.command === 'serve') {
                if (exports.isDirectCSSRequest(id)) {
                    return css;
                }
                else {
                    // server only
                    if (ssr) {
                        return modulesCode || `export default ${JSON.stringify(css)}`;
                    }
                    return [
                        `import { updateStyle, removeStyle } from ${JSON.stringify(path_1.default.posix.join(config.base, constants_1.CLIENT_PUBLIC_PATH))}`,
                        `const id = ${JSON.stringify(id)}`,
                        `const css = ${JSON.stringify(css)}`,
                        `updateStyle(id, css)`,
                        // css modules exports change on edit so it can't self accept
                        `${modulesCode || `import.meta.hot.accept()\nexport default css`}`,
                        `import.meta.hot.prune(() => removeStyle(id))`,
                    ].join('\n');
                }
            }
            // build CSS handling ----------------------------------------------------
            // record css
            styles.set(id, css);
            return {
                code: '',
                map: { mappings: '' },
                // avoid the css module from being tree-shaken so that we can retrieve
                // it in renderChunk()
                moduleSideEffects: 'no-treeshake',
            };
        },
        renderChunk(code, chunk, opts) {
            return __awaiter(this, void 0, void 0, function* () {
                let chunkCSS = '';
                let isPureCssChunk = true;
                const ids = Object.keys(chunk.modules);
                for (const id of ids) {
                    if (!exports.isCSSRequest(id) ||
                        cssModuleRE.test(id) ||
                        commonjsProxyRE.test(id)) {
                        isPureCssChunk = false;
                    }
                    if (styles.has(id)) {
                        chunkCSS += styles.get(id);
                    }
                }
                if (!chunkCSS) {
                    return null;
                }
                // resolve asset URL placeholders to their built file URLs and perform
                // minification if necessary
                const processChunkCSS = (css, { inlined, minify, }) => __awaiter(this, void 0, void 0, function* () {
                    // replace asset url references with resolved url.
                    const isRelativeBase = config.base === '' || config.base.startsWith('.');
                    css = css.replace(asset_1.assetUrlRE, (_, fileHash, postfix = '') => {
                        const filename = asset_1.getAssetFilename(fileHash, config) + postfix;
                        asset_1.registerAssetToChunk(chunk, filename);
                        if (!isRelativeBase || inlined) {
                            // absolute base or relative base but inlined (injected as style tag into
                            // index.html) use the base as-is
                            return config.base + filename;
                        }
                        else {
                            // relative base + extracted CSS - asset file will be in the same dir
                            return `./${path_1.default.posix.basename(filename)}`;
                        }
                    });
                    // only external @imports should exist at this point - and they need to
                    // be hoisted to the top of the CSS chunk per spec (#1845)
                    if (css.includes('@import')) {
                        css = yield hoistAtImports(css);
                    }
                    if (minify && config.build.minify) {
                        css = yield minifyCSS(css, config);
                    }
                    return css;
                });
                if (config.build.cssCodeSplit) {
                    if (isPureCssChunk) {
                        // this is a shared CSS-only chunk that is empty.
                        pureCssChunks.add(chunk.fileName);
                    }
                    if (
                    // fixed by xxxxxx support amd
                    opts.format === 'es' ||
                        opts.format === 'cjs' ||
                        opts.format === 'amd') {
                        chunkCSS = yield processChunkCSS(chunkCSS, {
                            inlined: false,
                            minify: true,
                        });
                        const name = chunk.isDynamicEntry && chunk.fileName
                            ? chunk.fileName.replace('.js', '')
                            : chunk.name;
                        // emit corresponding css file
                        const fileHandle = this.emitFile({
                            name: name + '.css',
                            type: 'asset',
                            source: chunkCSS,
                        });
                        exports.chunkToEmittedCssFileMap.set(chunk, new Set([this.getFileName(fileHandle)]));
                    }
                    else if (!config.build.ssr) {
                        // legacy build, inline css
                        chunkCSS = yield processChunkCSS(chunkCSS, {
                            inlined: true,
                            minify: true,
                        });
                        const style = `__vite_style__`;
                        const injectCode = `var ${style} = document.createElement('style');` +
                            `${style}.innerHTML = ${JSON.stringify(chunkCSS)};` +
                            `document.head.appendChild(${style});`;
                        if (config.build.sourcemap) {
                            const s = new magic_string_1.default(code);
                            s.prepend(injectCode);
                            return {
                                code: s.toString(),
                                map: s.generateMap({ hires: true }),
                            };
                        }
                        else {
                            return { code: injectCode + code };
                        }
                    }
                }
                else {
                    // non-split extracted CSS will be minified together
                    chunkCSS = yield processChunkCSS(chunkCSS, {
                        inlined: false,
                        minify: false,
                    });
                    outputToExtractedCSSMap.set(opts, (outputToExtractedCSSMap.get(opts) || '') + chunkCSS);
                }
                return null;
            });
        },
        generateBundle(opts, bundle) {
            return __awaiter(this, void 0, void 0, function* () {
                // remove empty css chunks and their imports
                if (pureCssChunks.size) {
                    const emptyChunkFiles = [...pureCssChunks]
                        .map((file) => path_1.default.basename(file))
                        .join('|')
                        .replace(/\./g, '\\.');
                    const emptyChunkRE = new RegExp(opts.format === 'es'
                        ? `\\bimport\\s*"[^"]*(?:${emptyChunkFiles})";\n?`
                        : `\\brequire\\(\\s*"[^"]*(?:${emptyChunkFiles})"\\);\n?`, 'g');
                    for (const file in bundle) {
                        const chunk = bundle[file];
                        if (chunk.type === 'chunk') {
                            // remove pure css chunk from other chunk's imports,
                            // and also register the emitted CSS files under the importer
                            // chunks instead.
                            chunk.imports = chunk.imports.filter((file) => {
                                if (pureCssChunks.has(file)) {
                                    const css = exports.chunkToEmittedCssFileMap.get(bundle[file]);
                                    if (css) {
                                        let existing = exports.chunkToEmittedCssFileMap.get(chunk);
                                        if (!existing) {
                                            existing = new Set();
                                        }
                                        css.forEach((file) => existing.add(file));
                                        exports.chunkToEmittedCssFileMap.set(chunk, existing);
                                    }
                                    return false;
                                }
                                return true;
                            });
                            chunk.code = chunk.code.replace(emptyChunkRE, 
                            // remove css import while preserving source map location
                            (m) => `/* empty css ${''.padEnd(m.length - 15)}*/`);
                        }
                    }
                    pureCssChunks.forEach((fileName) => {
                        delete bundle[fileName];
                    });
                }
                let extractedCss = outputToExtractedCSSMap.get(opts);
                if (extractedCss && !hasEmitted) {
                    hasEmitted = true;
                    // minify css
                    if (config.build.minify) {
                        extractedCss = yield minifyCSS(extractedCss, config);
                    }
                    this.emitFile({
                        name: 'style.css',
                        type: 'asset',
                        source: extractedCss,
                    });
                }
            });
        },
    };
}
exports.cssPostPlugin = cssPostPlugin;
function createCSSResolvers(config) {
    let cssResolve;
    let sassResolve;
    let lessResolve;
    return {
        get css() {
            return (cssResolve ||
                (cssResolve = config.createResolver({
                    extensions: ['.css'],
                    mainFields: ['style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
        get sass() {
            return (sassResolve ||
                (sassResolve = config.createResolver({
                    extensions: ['.scss', '.sass', '.css'],
                    mainFields: ['sass', 'style'],
                    tryIndex: true,
                    tryPrefix: '_',
                    preferRelative: true,
                })));
        },
        get less() {
            return (lessResolve ||
                (lessResolve = config.createResolver({
                    extensions: ['.less', '.css'],
                    mainFields: ['less', 'style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
    };
}
function compileCSS(id, code, config, urlReplacer, atImportResolvers, server) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { modules: modulesOptions, preprocessorOptions } = config.css || {};
        const isModule = modulesOptions !== false && cssModuleRE.test(id);
        // although at serve time it can work without processing, we do need to
        // crawl them in order to register watch dependencies.
        const needInlineImport = code.includes('@import');
        const hasUrl = exports.cssUrlRE.test(code) || cssImageSetRE.test(code);
        const postcssConfig = yield resolvePostcssConfig(config);
        const lang = (_a = id.match(exports.cssLangRE)) === null || _a === void 0 ? void 0 : _a[1];
        // 1. plain css that needs no processing
        if (lang === 'css' &&
            !postcssConfig &&
            !isModule &&
            !needInlineImport &&
            !hasUrl) {
            return { code };
        }
        let map;
        let modules;
        const deps = new Set();
        // 2. pre-processors: sass etc.
        if (isPreProcessor(lang)) {
            const preProcessor = preProcessors[lang];
            let opts = (preprocessorOptions && preprocessorOptions[lang]) || {};
            // support @import from node dependencies by default
            switch (lang) {
                case "scss" /* scss */:
                case "sass" /* sass */:
                    opts = Object.assign({ includePaths: ['node_modules'], alias: config.resolve.alias }, opts);
                    break;
                case "less" /* less */:
                case "styl" /* styl */:
                case "stylus" /* stylus */:
                    opts = Object.assign({ paths: ['node_modules'], alias: config.resolve.alias }, opts);
            }
            // important: set this for relative import resolving
            opts.filename = utils_1.cleanUrl(id);
            const preprocessResult = yield preProcessor(code, config.root, opts, atImportResolvers);
            if (preprocessResult.errors.length) {
                throw preprocessResult.errors[0];
            }
            code = preprocessResult.code;
            map = preprocessResult.map;
            if (preprocessResult.deps) {
                preprocessResult.deps.forEach((dep) => {
                    // sometimes sass registers the file itself as a dep
                    if (utils_1.normalizePath(dep) !== utils_1.normalizePath(opts.filename)) {
                        deps.add(dep);
                    }
                });
            }
        }
        // 3. postcss
        const postcssOptions = (postcssConfig && postcssConfig.options) || {};
        const postcssPlugins = postcssConfig && postcssConfig.plugins ? postcssConfig.plugins.slice() : [];
        if (needInlineImport) {
            postcssPlugins.unshift((yield Promise.resolve().then(() => __importStar(require('postcss-import')))).default({
                resolve(id, basedir) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const resolved = yield atImportResolvers.css(id, path_1.default.join(basedir, '*'));
                        if (resolved) {
                            return path_1.default.resolve(resolved);
                        }
                        return id;
                    });
                },
            }));
        }
        postcssPlugins.push(UrlRewritePostcssPlugin({
            replacer: urlReplacer,
        }));
        if (isModule) {
            postcssPlugins.unshift((yield Promise.resolve().then(() => __importStar(require('postcss-modules')))).default(Object.assign(Object.assign({}, modulesOptions), { getJSON(cssFileName, _modules, outputFileName) {
                    modules = _modules;
                    if (modulesOptions && typeof modulesOptions.getJSON === 'function') {
                        modulesOptions.getJSON(cssFileName, _modules, outputFileName);
                    }
                } })));
        }
        if (!postcssPlugins.length) {
            return {
                code,
                map,
            };
        }
        // postcss is an unbundled dep and should be lazy imported
        const postcssResult = yield (yield Promise.resolve().then(() => __importStar(require('postcss'))))
            .default(postcssPlugins)
            .process(code, Object.assign(Object.assign({}, postcssOptions), { to: id, from: id, map: {
                inline: false,
                annotation: false,
                prev: map,
            } }));
        // record CSS dependencies from @imports
        for (const message of postcssResult.messages) {
            if (message.type === 'dependency') {
                deps.add(message.file);
            }
            else if (message.type === 'dir-dependency') {
                // https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#3-dependencies
                const { dir, glob: globPattern = '**' } = message;
                const pattern = utils_1.normalizePath(path_1.default.resolve(path_1.default.dirname(id), dir)) + `/` + globPattern;
                const files = fast_glob_1.default.sync(pattern, {
                    ignore: ['**/node_modules/**'],
                });
                for (let i = 0; i < files.length; i++) {
                    deps.add(files[i]);
                }
                if (server) {
                    // register glob importers so we can trigger updates on file add/remove
                    if (!(id in server._globImporters)) {
                        ;
                        server._globImporters[id] = {
                            module: server.moduleGraph.getModuleById(id),
                            importGlobs: [],
                        };
                    }
                    ;
                    server._globImporters[id].importGlobs.push({
                        base: config.root,
                        pattern,
                    });
                }
            }
            else if (message.type === 'warning') {
                let msg = `[vite:css] ${message.text}`;
                if (message.line && message.column) {
                    msg += `\n${utils_1.generateCodeFrame(code, {
                        line: message.line,
                        column: message.column,
                    })}`;
                }
                config.logger.warn(chalk_1.default.yellow(msg));
            }
        }
        return {
            ast: postcssResult,
            code: postcssResult.css,
            map: postcssResult.map,
            modules,
            deps,
        };
    });
}
let cachedPostcssConfig;
function resolvePostcssConfig(config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedPostcssConfig !== undefined) {
            return cachedPostcssConfig;
        }
        // inline postcss config via vite config
        const inlineOptions = (_a = config.css) === null || _a === void 0 ? void 0 : _a.postcss;
        if (utils_1.isObject(inlineOptions)) {
            const result = {
                options: Object.assign({}, inlineOptions),
                plugins: inlineOptions.plugins || [],
            };
            delete result.options.plugins;
            return (cachedPostcssConfig = result);
        }
        try {
            const searchPath = typeof inlineOptions === 'string' ? inlineOptions : config.root;
            // @ts-ignore
            return (cachedPostcssConfig = yield postcss_load_config_1.default({}, searchPath));
        }
        catch (e) {
            if (!/No PostCSS Config found/.test(e.message)) {
                throw e;
            }
            return (cachedPostcssConfig = null);
        }
    });
}
// https://drafts.csswg.org/css-syntax-3/#identifier-code-point
exports.cssUrlRE = /(?<=^|[^\w\-\u0080-\uffff])url\(\s*('[^']+'|"[^"]+"|[^'")]+)\s*\)/;
const cssImageSetRE = /image-set\(([^)]+)\)/;
const UrlRewritePostcssPlugin = (opts) => {
    if (!opts) {
        throw new Error('base or replace is required');
    }
    return {
        postcssPlugin: 'vite-url-rewrite',
        Once(root) {
            const promises = [];
            root.walkDecls((declaration) => {
                const isCssUrl = exports.cssUrlRE.test(declaration.value);
                const isCssImageSet = cssImageSetRE.test(declaration.value);
                if (isCssUrl || isCssImageSet) {
                    const replacerForDeclaration = (rawUrl) => {
                        var _a;
                        const importer = (_a = declaration.source) === null || _a === void 0 ? void 0 : _a.input.file;
                        return opts.replacer(rawUrl, importer);
                    };
                    const rewriterToUse = isCssUrl ? rewriteCssUrls : rewriteCssImageSet;
                    promises.push(rewriterToUse(declaration.value, replacerForDeclaration).then((url) => {
                        declaration.value = url;
                    }));
                }
            });
            if (promises.length) {
                return Promise.all(promises);
            }
        },
    };
};
UrlRewritePostcssPlugin.postcss = true;
function rewriteCssUrls(css, replacer) {
    return utils_1.asyncReplace(css, exports.cssUrlRE, (match) => __awaiter(this, void 0, void 0, function* () {
        const [matched, rawUrl] = match;
        return yield doUrlReplace(rawUrl, matched, replacer);
    }));
}
function rewriteCssImageSet(css, replacer) {
    return utils_1.asyncReplace(css, cssImageSetRE, (match) => __awaiter(this, void 0, void 0, function* () {
        const [matched, rawUrl] = match;
        const url = yield utils_1.processSrcSet(rawUrl, ({ url }) => doUrlReplace(url, matched, replacer));
        return `image-set(${url})`;
    }));
}
function doUrlReplace(rawUrl, matched, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        let wrap = '';
        const first = rawUrl[0];
        if (first === `"` || first === `'`) {
            wrap = first;
            rawUrl = rawUrl.slice(1, -1);
        }
        if (utils_1.isExternalUrl(rawUrl) || utils_1.isDataUrl(rawUrl) || rawUrl.startsWith('#')) {
            return matched;
        }
        return `url(${wrap}${yield replacer(rawUrl)}${wrap})`;
    });
}
let CleanCSS;
function minifyCSS(css, config) {
    return __awaiter(this, void 0, void 0, function* () {
        CleanCSS = CleanCSS || (yield Promise.resolve().then(() => __importStar(require('clean-css')))).default;
        const res = new CleanCSS(Object.assign({ rebase: false }, config.build.cleanCssOptions)).minify(css);
        if (res.errors && res.errors.length) {
            config.logger.error(chalk_1.default.red(`error when minifying css:\n${res.errors}`));
            throw res.errors[0];
        }
        // do not warn on remote @imports
        const warnings = res.warnings &&
            res.warnings.filter((m) => !m.includes('remote @import'));
        if (warnings && warnings.length) {
            config.logger.warn(chalk_1.default.yellow(`warnings when minifying css:\n${warnings.join('\n')}`));
        }
        return res.styles;
    });
}
// #1845
// CSS @import can only appear at top of the file. We need to hoist all @import
// to top when multiple files are concatenated.
function hoistAtImports(css) {
    return __awaiter(this, void 0, void 0, function* () {
        const postcss = yield Promise.resolve().then(() => __importStar(require('postcss')));
        return (yield postcss.default([AtImportHoistPlugin]).process(css)).css;
    });
}
const AtImportHoistPlugin = () => {
    return {
        postcssPlugin: 'vite-hoist-at-imports',
        Once(root) {
            const imports = [];
            root.walkAtRules((rule) => {
                if (rule.name === 'import') {
                    // record in reverse so that can simply prepend to preserve order
                    imports.unshift(rule);
                }
            });
            imports.forEach((i) => root.prepend(i));
        },
    };
};
AtImportHoistPlugin.postcss = true;
const loadedPreprocessors = {};
function loadPreprocessor(lang, root) {
    if (lang in loadedPreprocessors) {
        return loadedPreprocessors[lang];
    }
    try {
        // Search for the preprocessor in the root directory first, and fall back
        // to the default require paths.
        const fallbackPaths = require.resolve.paths(lang) || [];
        const resolved = require.resolve(lang, { paths: [root, ...fallbackPaths] });
        return (loadedPreprocessors[lang] = require(resolved));
    }
    catch (e) {
        throw new Error(`Preprocessor dependency "${lang}" not found. Did you install it?`);
    }
}
// .scss/.sass processor
const scss = (source, root, options, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const render = loadPreprocessor("sass" /* sass */, root).render;
    const internalImporter = (url, importer, done) => {
        resolvers.sass(url, importer).then((resolved) => {
            if (resolved) {
                rebaseUrls(resolved, options.filename, options.alias).then(done);
            }
            else {
                done(null);
            }
        });
    };
    const importer = [internalImporter];
    if (options.importer) {
        Array.isArray(options.importer)
            ? importer.push(...options.importer)
            : importer.push(options.importer);
    }
    const finalOptions = Object.assign(Object.assign({}, options), { data: yield getSource(source, options.filename, options.additionalData), file: options.filename, outFile: options.filename, importer });
    try {
        const result = yield new Promise((resolve, reject) => {
            render(finalOptions, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        const deps = result.stats.includedFiles;
        return {
            code: result.css.toString(),
            errors: [],
            deps,
        };
    }
    catch (e) {
        // normalize SASS error
        e.id = e.file;
        e.frame = e.formatted;
        return { code: '', errors: [e], deps: [] };
    }
});
const sass = (source, root, options, aliasResolver) => scss(source, root, Object.assign(Object.assign({}, options), { indentedSyntax: true }), aliasResolver);
/**
 * relative url() inside \@imported sass and less files must be rebased to use
 * root file as base.
 */
function rebaseUrls(file, rootFile, alias) {
    return __awaiter(this, void 0, void 0, function* () {
        file = path_1.default.resolve(file); // ensure os-specific flashes
        // in the same dir, no need to rebase
        const fileDir = path_1.default.dirname(file);
        const rootDir = path_1.default.dirname(rootFile);
        if (fileDir === rootDir) {
            return { file };
        }
        // no url()
        const content = fs_1.default.readFileSync(file, 'utf-8');
        if (!exports.cssUrlRE.test(content)) {
            return { file };
        }
        const rebased = yield rewriteCssUrls(content, (url) => {
            if (url.startsWith('/'))
                return url;
            // match alias, no need to rewrite
            for (const { find } of alias) {
                const matches = typeof find === 'string' ? url.startsWith(find) : find.test(url);
                if (matches) {
                    return url;
                }
            }
            const absolute = path_1.default.resolve(fileDir, url);
            const relative = path_1.default.relative(rootDir, absolute);
            return utils_1.normalizePath(relative);
        });
        return {
            file,
            contents: rebased,
        };
    });
}
// .less
const less = (source, root, options, resolvers) => __awaiter(void 0, void 0, void 0, function* () {
    const nodeLess = loadPreprocessor("less" /* less */, root);
    const viteResolverPlugin = createViteLessPlugin(nodeLess, options.filename, options.alias, resolvers);
    source = yield getSource(source, options.filename, options.additionalData);
    let result;
    try {
        result = yield nodeLess.render(source, Object.assign(Object.assign({}, options), { plugins: [viteResolverPlugin, ...(options.plugins || [])] }));
    }
    catch (e) {
        const error = e;
        // normalize error info
        const normalizedError = new Error(error.message || error.type);
        normalizedError.loc = {
            file: error.filename || options.filename,
            line: error.line,
            column: error.column,
        };
        return { code: '', errors: [normalizedError], deps: [] };
    }
    return {
        code: result.css.toString(),
        deps: result.imports,
        errors: [],
    };
});
/**
 * Less manager, lazy initialized
 */
let ViteLessManager;
function createViteLessPlugin(less, rootFile, alias, resolvers) {
    if (!ViteLessManager) {
        ViteLessManager = class ViteManager extends less.FileManager {
            constructor(rootFile, resolvers, alias) {
                super();
                this.rootFile = rootFile;
                this.resolvers = resolvers;
                this.alias = alias;
            }
            supports() {
                return true;
            }
            supportsSync() {
                return false;
            }
            loadFile(filename, dir, opts, env) {
                const _super = Object.create(null, {
                    loadFile: { get: () => super.loadFile }
                });
                return __awaiter(this, void 0, void 0, function* () {
                    const resolved = yield this.resolvers.less(filename, path_1.default.join(dir, '*'));
                    if (resolved) {
                        const result = yield rebaseUrls(resolved, this.rootFile, this.alias);
                        let contents;
                        if (result && 'contents' in result) {
                            contents = result.contents;
                        }
                        else {
                            contents = fs_1.default.readFileSync(resolved, 'utf-8');
                        }
                        return {
                            filename: path_1.default.resolve(resolved),
                            contents,
                        };
                    }
                    else {
                        return _super.loadFile.call(this, filename, dir, opts, env);
                    }
                });
            }
        };
    }
    return {
        install(_, pluginManager) {
            pluginManager.addFileManager(new ViteLessManager(rootFile, resolvers, alias));
        },
        minVersion: [3, 0, 0],
    };
}
// .styl
const styl = (source, root, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const nodeStylus = loadPreprocessor("stylus" /* stylus */, root);
    // Get source with preprocessor options.additionalData. Make sure a new line separator
    // is added to avoid any render error, as added stylus content may not have semi-colon separators
    source = yield getSource(source, options.filename, options.additionalData, '\n');
    // Get preprocessor options.imports dependencies as stylus
    // does not return them with its builtin `.deps()` method
    const importsDeps = ((_a = options.imports) !== null && _a !== void 0 ? _a : []).map((dep) => path_1.default.resolve(dep));
    try {
        const ref = nodeStylus(source, options);
        // if (map) ref.set('sourcemap', { inline: false, comment: false })
        const result = ref.render();
        // Concat imports deps with computed deps
        const deps = [...ref.deps(), ...importsDeps];
        return { code: result, errors: [], deps };
    }
    catch (e) {
        return { code: '', errors: [e], deps: [] };
    }
});
function getSource(source, filename, additionalData, sep = '') {
    if (!additionalData)
        return source;
    if (typeof additionalData === 'function') {
        return additionalData(source, filename);
    }
    return additionalData + sep + source;
}
const preProcessors = Object.freeze({
    ["less" /* less */]: less,
    ["sass" /* sass */]: sass,
    ["scss" /* scss */]: scss,
    ["styl" /* styl */]: styl,
    ["stylus" /* stylus */]: styl,
});
function isPreProcessor(lang) {
    return lang && lang in preProcessors;
}
