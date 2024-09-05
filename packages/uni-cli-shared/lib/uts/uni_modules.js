"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUTSModuleDeps = exports.capitalize = exports.camelize = exports.parseInjects = exports.parseUniExtApi = exports.parseUniExtApis = exports.getUniExtApiProviderRegisters = exports.formatExtApiProviderName = exports.getUniExtApiPlugins = exports.getUniExtApiProviders = void 0;
// 重要：此文件编译后的js，需同步至 vue2 编译器中 uni-cli-shared/lib/uts/uni_modules.js
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const extApiProviders = [];
const extApiPlugins = new Set();
function getUniExtApiProviders() {
    return extApiProviders;
}
exports.getUniExtApiProviders = getUniExtApiProviders;
function getUniExtApiPlugins() {
    return [...extApiPlugins].map((plugin) => {
        return { plugin };
    });
}
exports.getUniExtApiPlugins = getUniExtApiPlugins;
function formatExtApiProviderName(service, name) {
    if (service === 'oauth') {
        service = 'OAuth';
    }
    return `Uni${(0, exports.capitalize)((0, exports.camelize)(service))}${(0, exports.capitalize)((0, exports.camelize)(name))}ProviderImpl`;
}
exports.formatExtApiProviderName = formatExtApiProviderName;
function getUniExtApiProviderRegisters() {
    const result = [];
    extApiProviders.forEach((provider) => {
        if (provider.name && provider.service) {
            result.push({
                name: provider.name,
                plugin: provider.plugin,
                service: provider.service,
                class: `uts.sdk.modules.${(0, exports.camelize)(provider.plugin)}.${formatExtApiProviderName(provider.service, provider.name)}`,
            });
        }
    });
    return result;
}
exports.getUniExtApiProviderRegisters = getUniExtApiProviderRegisters;
function parseUniExtApis(vite = true, platform, language = 'javascript') {
    if (!process.env.UNI_INPUT_DIR) {
        return {};
    }
    const uniModulesDir = path_1.default.resolve(process.env.UNI_INPUT_DIR, 'uni_modules');
    if (!fs_extra_1.default.existsSync(uniModulesDir)) {
        return {};
    }
    const injects = {};
    extApiProviders.length = 0;
    extApiPlugins.clear();
    fs_extra_1.default.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
        // 必须以 uni- 开头
        if (!uniModuleDir.startsWith('uni-')) {
            return;
        }
        const uniModuleRootDir = path_1.default.resolve(uniModulesDir, uniModuleDir);
        const pkgPath = path_1.default.resolve(uniModuleRootDir, 'package.json');
        if (!fs_extra_1.default.existsSync(pkgPath)) {
            return;
        }
        try {
            let exports;
            const pkg = JSON.parse(fs_extra_1.default.readFileSync(pkgPath, 'utf8'));
            if (pkg && pkg.uni_modules && pkg.uni_modules['uni-ext-api']) {
                exports = pkg.uni_modules['uni-ext-api'];
            }
            if (exports) {
                const provider = exports.provider;
                if (provider && provider.service) {
                    provider.plugin = uniModuleDir;
                    extApiProviders.push(provider);
                }
                extApiPlugins.add(uniModuleDir);
                const curInjects = parseInjects(vite, platform, language, `@/uni_modules/${uniModuleDir}`, uniModuleRootDir, exports);
                Object.assign(injects, curInjects);
            }
        }
        catch (e) { }
    });
    return injects;
}
exports.parseUniExtApis = parseUniExtApis;
function parseUniExtApi(pluginDir, pluginId, vite = true, platform, language = 'javascript') {
    const pkgPath = path_1.default.resolve(pluginDir, 'package.json');
    if (!fs_extra_1.default.existsSync(pkgPath)) {
        return;
    }
    let exports;
    const pkg = JSON.parse(fs_extra_1.default.readFileSync(pkgPath, 'utf8'));
    if (pkg && pkg.uni_modules && pkg.uni_modules['uni-ext-api']) {
        exports = pkg.uni_modules['uni-ext-api'];
    }
    if (exports) {
        return parseInjects(vite, platform, language, `@/uni_modules/${pluginId}`, pluginDir, exports);
    }
}
exports.parseUniExtApi = parseUniExtApi;
/**
 *  uni:'getBatteryInfo'
 * import getBatteryInfo from '..'
 *
 * uni:['getBatteryInfo']
 * import { getBatteryInfo } from '..'
 *
 * uni:['openLocation','chooseLocation']
 * import { openLocation, chooseLocation } from '..'
 *
 * uni:{
 *  onUserCaptureScreen: "onCaptureScreen"
 *  offUserCaptureScreen: "offCaptureScreen"
 * }
 *
 * uni.getBatteryInfo = getBatteryInfo
 * @param source
 * @param globalObject
 * @param define
 * @returns
 */
function parseInjects(vite = true, platform, language, source, uniModuleRootDir, exports = {}) {
    if (platform === 'app-plus') {
        platform = 'app';
    }
    let rootDefines = {};
    Object.keys(exports).forEach((name) => {
        if (name.startsWith('uni')) {
            rootDefines[name] = exports[name];
        }
    });
    const injects = {};
    if (Object.keys(rootDefines).length) {
        const platformIndexFileName = path_1.default.resolve(uniModuleRootDir, 'utssdk', platform);
        const rootIndexFileName = path_1.default.resolve(uniModuleRootDir, 'utssdk', 'index.uts');
        let hasPlatformFile = uniModuleRootDir
            ? fs_extra_1.default.existsSync(rootIndexFileName) || fs_extra_1.default.existsSync(platformIndexFileName)
            : true;
        if (!hasPlatformFile) {
            if (platform === 'app') {
                hasPlatformFile =
                    fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', 'app-android')) ||
                        fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', 'app-ios')) ||
                        fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', 'app-harmony'));
            }
        }
        // 其他平台修改source，直接指向目标文件，否则 uts2js 找不到类型信息
        if (platform !== 'app' &&
            platform !== 'app-android' &&
            platform !== 'app-ios' &&
            platform !== 'app-harmony') {
            if (fs_extra_1.default.existsSync(platformIndexFileName)) {
                source = `${source}/utssdk/${platform}/index.uts`;
            }
            else if (fs_extra_1.default.existsSync(rootIndexFileName)) {
                source = `${source}/utssdk/index.uts`;
            }
        }
        else if (process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js') {
            if (fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', 'app-js', 'index.uts'))) {
                source = `${source}/utssdk/app-js/index.uts`;
            }
        }
        for (const key in rootDefines) {
            Object.assign(injects, parseInject(vite, platform, language, source, 'uni', rootDefines[key], hasPlatformFile));
        }
    }
    return injects;
}
exports.parseInjects = parseInjects;
function parseInject(vite = true, platform, language, source, globalObject, define, hasPlatformFile) {
    const injects = {};
    if (define === false) {
    }
    else if (typeof define === 'string') {
        // {'uni.getBatteryInfo' : '@dcloudio/uni-getbatteryinfo'}
        if (hasPlatformFile) {
            injects[globalObject + '.' + define] = vite ? source : [source, 'default'];
        }
    }
    else if (Array.isArray(define)) {
        // {'uni.getBatteryInfo' : ['@dcloudio/uni-getbatteryinfo','getBatteryInfo]}
        if (hasPlatformFile) {
            define.forEach((d) => {
                injects[globalObject + '.' + d] = [source, d];
            });
        }
    }
    else {
        const keys = Object.keys(define);
        keys.forEach((d) => {
            if (typeof define[d] === 'string') {
                if (hasPlatformFile) {
                    injects[globalObject + '.' + d] = [source, define[d]];
                }
            }
            else {
                const defineOptions = define[d];
                const p = platform === 'app-android' ||
                    platform === 'app-ios' ||
                    platform === 'app-harmony'
                    ? 'app'
                    : platform;
                if (!(p in defineOptions)) {
                    if (hasPlatformFile) {
                        injects[globalObject + '.' + d] = [source, defineOptions.name || d];
                    }
                }
                else {
                    if (defineOptions[p] !== false) {
                        if (p === 'app') {
                            const appOptions = defineOptions.app;
                            if (isPlainObject(appOptions)) {
                                // js engine 下且存在 app-js，不检查
                                const skipCheck = process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js' &&
                                    source.includes('app-js');
                                if (!skipCheck) {
                                    const targetLanguage = language === 'javascript' ? 'js' : language;
                                    if (targetLanguage && appOptions[targetLanguage] === false) {
                                        return;
                                    }
                                }
                            }
                            injects[globalObject + '.' + d] = [
                                source,
                                defineOptions.name || d,
                                defineOptions.app,
                            ];
                        }
                        else {
                            injects[globalObject + '.' + d] = [
                                source,
                                defineOptions.name || d,
                            ];
                        }
                    }
                }
            }
        });
    }
    return injects;
}
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
function isPlainObject(val) {
    return toTypeString(val) === '[object Object]';
}
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
exports.camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
/**
 * @private
 */
exports.capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
/**
 * 解析 UTS 类型的模块依赖列表
 * @param deps
 * @param inputDir
 * @returns
 */
function parseUTSModuleDeps(deps, inputDir) {
    const modulesDir = path_1.default.resolve(inputDir, 'uni_modules');
    return deps.filter((dep) => {
        return fs_extra_1.default.existsSync(path_1.default.resolve(modulesDir, dep, 'utssdk'));
    });
}
exports.parseUTSModuleDeps = parseUTSModuleDeps;
