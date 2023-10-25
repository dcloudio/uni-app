"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInjects = exports.parseUniExtApis = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function parseUniExtApis(vite = true, platform, language = 'javascript') {
    if (!process.env.UNI_INPUT_DIR) {
        return {};
    }
    const uniModulesDir = path_1.default.resolve(process.env.UNI_INPUT_DIR, 'uni_modules');
    if (!fs_extra_1.default.existsSync(uniModulesDir)) {
        return {};
    }
    const injects = {};
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
                const curInjects = parseInjects(vite, platform, language, `@/uni_modules/${uniModuleDir}`, uniModuleRootDir, exports);
                Object.assign(injects, curInjects);
            }
        }
        catch (e) { }
    });
    return injects;
}
exports.parseUniExtApis = parseUniExtApis;
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
    let rootDefines = {};
    Object.keys(exports).forEach((name) => {
        if (name.startsWith('uni')) {
            rootDefines[name] = exports[name];
        }
    });
    const injects = {};
    if (Object.keys(rootDefines).length) {
        const hasPlatformFile = uniModuleRootDir
            ? fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', 'index.uts')) ||
                fs_extra_1.default.existsSync(path_1.default.resolve(uniModuleRootDir, 'utssdk', platform))
            : true;
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
                const p = platform === 'app-android' || platform === 'app-ios'
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
                                if (language === 'javascript') {
                                    if (appOptions.js === false) {
                                        return;
                                    }
                                }
                                else if (language === 'kotlin') {
                                    if (appOptions.kotlin === false) {
                                        return;
                                    }
                                }
                                else if (language === 'swift') {
                                    if (appOptions.swift === false) {
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
