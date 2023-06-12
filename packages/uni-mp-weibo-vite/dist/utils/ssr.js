"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteSsrRenderStyle = exports.rewriteSsrNativeTag = exports.rewriteSsrResolve = exports.rewriteSsrVue = exports.generateSsrEntryServerCode = exports.generateSsrDefineCode = exports.initSsrDefine = exports.initSsrAliasOnce = exports.isSsrManifest = exports.isSSR = void 0;
/* eslint-disable no-restricted-globals */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const transformPageHead_1 = require("../plugin/transforms/transformPageHead");
// Temporal handling for 2.7 breaking change
const isSSR = (opt) => opt === undefined ? false : typeof opt === 'boolean' ? opt : opt?.ssr === true;
exports.isSSR = isSSR;
function isSsrManifest(command, config) {
    if (command === 'build') {
        return !!(config.build && config.build.ssrManifest);
    }
    return false;
}
exports.isSsrManifest = isSsrManifest;
const SSR_ALIAS = {
    vue: '@dcloudio/uni-h5-vue',
    'vue/server-renderer': 'vue/server-renderer',
    '@vue/server-renderer': '@vue/server-renderer',
    '@dcloudio/uni-cloud': '@dcloudio/uni-cloud',
    '@dcloudio/uni-mp-weibo': '@dcloudio/uni-mp-weibo',
    '@dcloudio/uni-i18n': '@dcloudio/uni-i18n',
    '@dcloudio/uni-shared': '@dcloudio/uni-shared',
};
exports.initSsrAliasOnce = (0, uni_shared_1.once)(() => {
    // 重写 package.json 的读取
    const oldJoin = path_1.default.join;
    const alias = Object.keys(SSR_ALIAS).reduce((alias, key) => {
        const newKey = oldJoin('node_modules', key, 'package.json');
        if (key.endsWith('vue/server-renderer')) {
            alias[newKey] = path_1.default.join(path_1.default.dirname((0, uni_cli_shared_1.resolveBuiltIn)(SSR_ALIAS[key])), 'package.json');
        }
        else {
            alias[newKey] = (0, uni_cli_shared_1.resolveBuiltIn)(SSR_ALIAS[key] + '/package.json');
        }
        return alias;
    }, {});
    // console.log(alias)
    path_1.default.join = (...paths) => {
        let res = oldJoin.apply(path_1.default, paths);
        if (res.endsWith('package.json')) {
            const key = Object.keys(alias).find((key) => res.endsWith(key));
            if (key) {
                res = alias[key];
            }
        }
        return res;
    };
});
function initSsrDefine(config) {
    return (0, shared_1.extend)(globalThis, {
        __IMPORT_META_ENV_BASE_URL__: config.env.BASE_URL,
    });
}
exports.initSsrDefine = initSsrDefine;
function serializeDefine(define) {
    let res = `{`;
    for (const key in define) {
        const val = define[key];
        res += `${JSON.stringify(key)}: ${(0, shared_1.isString)(val) ? `(${val})` : JSON.stringify(val)}, `;
    }
    return res + `}`;
}
function normalizeSsrDefine(config) {
    const defines = (0, shared_1.extend)({
        __IMPORT_META_ENV_BASE_URL__: JSON.stringify(config.env.BASE_URL),
    }, config.define);
    delete defines['import.meta.env.LEGACY'];
    return defines;
}
function generateSsrDefineCode(config, { unit, unitRatio, unitPrecision }) {
    return fs_1.default
        .readFileSync(path_1.default.join(__dirname, '../../lib/ssr/define.js'), 'utf8')
        .replace('__DEFINES__', serializeDefine(normalizeSsrDefine(config)))
        .replace('__UNIT__', JSON.stringify(unit))
        .replace('__UNIT_RATIO__', JSON.stringify(unitRatio))
        .replace('__UNIT_PRECISION__', JSON.stringify(unitPrecision));
}
exports.generateSsrDefineCode = generateSsrDefineCode;
function generateSsrEntryServerCode() {
    return fs_1.default.readFileSync(path_1.default.join(__dirname, '../../lib/ssr/entry-server.js'), 'utf8');
}
exports.generateSsrEntryServerCode = generateSsrEntryServerCode;
function rewriteSsrVue() {
    // 解决 @vue/server-renderer 中引入 vue 的映射
    require('module-alias').addAliases({
        vue: (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js'),
        'vue/package.json': (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-h5-vue/package.json'),
    });
    // TODO vite 2.7.0 版本会定制 require 的解析，解析后缓存的文件路径会被格式化，导致 windows 平台路径不一致，导致 cache 不生效
    if (require('os').platform() === 'win32') {
        require('vue');
        const vuePath = require.resolve('vue');
        require.cache[(0, uni_cli_shared_1.normalizePath)(vuePath)] = require.cache[vuePath];
    }
}
exports.rewriteSsrVue = rewriteSsrVue;
function initResolveSyncOpts(opts) {
    if (!opts) {
        opts = {};
    }
    if (!opts.paths) {
        opts.paths = [];
    }
    if ((0, shared_1.isString)(opts.paths)) {
        opts.paths = [opts.paths];
    }
    if ((0, shared_1.isArray)(opts.paths)) {
        opts.paths.push(...(0, uni_cli_shared_1.getBuiltInPaths)());
    }
    return opts;
}
function rewriteSsrResolve() {
    // 解决 ssr 时 __vite_ssr_import__("vue") 的映射
    const resolve = require(require.resolve('resolve', {
        paths: [
            path_1.default.resolve(require.resolve('vite/package.json'), '../node_modules'),
        ],
    }));
    const oldSync = resolve.sync;
    resolve.sync = (id, opts) => {
        if (id === 'vue') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js`);
        }
        else if (id === 'vue/package.json') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-h5-vue/package.json`);
        }
        else if (id === 'vue/server-renderer/package.json') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@vue/server-renderer/package.json`);
        }
        return oldSync(id, initResolveSyncOpts(opts));
    };
}
exports.rewriteSsrResolve = rewriteSsrResolve;
function rewriteSsrNativeTag() {
    // @ts-ignore
    const compilerDom = require((0, uni_cli_shared_1.resolveBuiltIn)('@vue/compiler-dom'));
    // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
    // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
    compilerDom.parserOptions.isNativeTag = uni_shared_1.isH5NativeTag;
    // ssr 时，ssrTransformComponent 执行时机很早，导致无法正确重写 tag，故通过 resolveComponentType 解决重写
    const oldResolveComponentType = compilerDom.resolveComponentType;
    const newResolveComponentType = function (node, context, ssr) {
        (0, transformPageHead_1.transformPageHead)(node, context);
        (0, uni_cli_shared_1.transformMatchMedia)(node, context);
        (0, uni_cli_shared_1.transformH5BuiltInComponents)(node, context);
        return oldResolveComponentType(node, context, ssr);
    };
    compilerDom.resolveComponentType = newResolveComponentType;
}
exports.rewriteSsrNativeTag = rewriteSsrNativeTag;
function rewriteSsrRenderStyle(inputDir) {
    const { unit, unitRatio, unitPrecision } = (0, uni_cli_shared_1.parseRpx2UnitOnce)(inputDir, 'h5');
    const rpx2unit = (0, uni_shared_1.createRpx2Unit)(unit, unitRatio, unitPrecision);
    const shared = require('@vue/shared');
    const oldStringifyStyle = shared.stringifyStyle;
    shared.stringifyStyle = (styles) => rpx2unit(oldStringifyStyle(styles));
    const serverRender = require('@vue/server-renderer');
    const oldSsrRenderStyle = serverRender.ssrRenderStyle;
    // 仅对字符串类型做转换，非字符串类型，通过 stringifyStyle 转换
    serverRender.ssrRenderStyle = (raw) => (0, shared_1.isString)(raw) ? rpx2unit(oldSsrRenderStyle(raw)) : oldSsrRenderStyle(raw);
}
exports.rewriteSsrRenderStyle = rewriteSsrRenderStyle;
