"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteSsrRenderStyle = exports.rewriteSsrNativeTag = exports.rewriteSsrResolve = exports.rewriteSsrVue = exports.generateSsrEntryServerCode = exports.generateSsrDefineCode = exports.initSsrDefine = exports.isSsrManifest = exports.isSsr = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function isSsr(command, config) {
    if (command === 'serve') {
        return !!(config.server && config.server.middlewareMode);
    }
    if (command === 'build') {
        return !!(config.build && config.build.ssr);
    }
    return false;
}
exports.isSsr = isSsr;
function isSsrManifest(command, config) {
    if (command === 'build') {
        return !!(config.build && config.build.ssrManifest);
    }
    return false;
}
exports.isSsrManifest = isSsrManifest;
function initSsrDefine(config) {
    return shared_1.extend(globalThis, {
        __IMPORT_META_ENV_BASE_URL__: config.env.BASE_URL,
    });
}
exports.initSsrDefine = initSsrDefine;
function serializeDefine(define) {
    let res = `{`;
    for (const key in define) {
        const val = define[key];
        res += `${JSON.stringify(key)}: ${typeof val === 'string' ? `(${val})` : JSON.stringify(val)}, `;
    }
    return res + `}`;
}
function normalizeSsrDefine(config) {
    const defines = shared_1.extend({
        __IMPORT_META_ENV_BASE_URL__: JSON.stringify(config.env.BASE_URL),
    }, config.define);
    delete defines['import.meta.env.LEGACY'];
    return defines;
}
function generateSsrDefineCode(config, { unit, unitRatio, unitPrecision }) {
    return fs_extra_1.default
        .readFileSync(path_1.default.join(__dirname, '../../lib/ssr/define.js'), 'utf8')
        .replace('__DEFINES__', serializeDefine(normalizeSsrDefine(config)))
        .replace('__UNIT__', JSON.stringify(unit))
        .replace('__UNIT_RATIO__', JSON.stringify(unitRatio))
        .replace('__UNIT_PRECISION__', JSON.stringify(unitPrecision));
}
exports.generateSsrDefineCode = generateSsrDefineCode;
function generateSsrEntryServerCode() {
    return fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '../../lib/ssr/entry-server.js'), 'utf8');
}
exports.generateSsrEntryServerCode = generateSsrEntryServerCode;
function rewriteSsrVue(mode) {
    // 解决 @vue/server-renderer 中引入 vue 的映射
    let vuePath;
    if (mode === 2) {
        vuePath = uni_cli_shared_1.resolveBuiltIn('@dcloudio/uni-h5-vue/dist/vue.runtime.compat.cjs.js');
    }
    else {
        vuePath = uni_cli_shared_1.resolveBuiltIn('@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js');
    }
    require('module-alias').addAlias('vue', vuePath);
}
exports.rewriteSsrVue = rewriteSsrVue;
function initResolveSyncOpts(opts) {
    if (!opts) {
        opts = {};
    }
    if (!opts.paths) {
        opts.paths = [];
    }
    if (shared_1.isString(opts.paths)) {
        opts.paths = [opts.paths];
    }
    if (shared_1.isArray(opts.paths)) {
        opts.paths.push(path_1.default.join(process.env.UNI_CLI_CONTEXT, 'node_modules'));
    }
    return opts;
}
function rewriteSsrResolve(mode) {
    // 解决 ssr 时 __vite_ssr_import__("vue") 的映射
    const resolve = require('resolve');
    const oldSync = resolve.sync;
    resolve.sync = (id, opts) => {
        if (id === 'vue') {
            return uni_cli_shared_1.resolveBuiltIn(`@dcloudio/uni-h5-vue/dist/vue.runtime.${mode === 2 ? 'compat.' : ''}cjs.js`);
        }
        return oldSync(id, initResolveSyncOpts(opts));
    };
}
exports.rewriteSsrResolve = rewriteSsrResolve;
function rewriteSsrNativeTag() {
    const { parserOptions } = require('@vue/compiler-dom');
    // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
    // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
    parserOptions.isNativeTag = uni_shared_1.isNativeTag;
}
exports.rewriteSsrNativeTag = rewriteSsrNativeTag;
function rewriteSsrRenderStyle(inputDir) {
    const { unit, unitRatio, unitPrecision } = uni_cli_shared_1.parseRpx2UnitOnce(inputDir);
    const rpx2unit = uni_shared_1.createRpx2Unit(unit, unitRatio, unitPrecision);
    const shared = require('@vue/shared');
    const oldStringifyStyle = shared.stringifyStyle;
    shared.stringifyStyle = (styles) => rpx2unit(oldStringifyStyle(styles));
    const serverRender = require('@vue/server-renderer');
    const oldSsrRenderStyle = serverRender.ssrRenderStyle;
    // 仅对字符串类型做转换，非字符串类型，通过 stringifyStyle 转换
    serverRender.ssrRenderStyle = (raw) => shared_1.isString(raw) ? rpx2unit(oldSsrRenderStyle(raw)) : oldSsrRenderStyle(raw);
}
exports.rewriteSsrRenderStyle = rewriteSsrRenderStyle;
