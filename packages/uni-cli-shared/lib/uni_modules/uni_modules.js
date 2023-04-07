"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInject = exports.parseInjects = exports.parseUniExtApis = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const merge_1 = require("merge");
function parseUniExtApis(vite = true) {
    const uniModulesDir = path_1.default.resolve(process.env.UNI_INPUT_DIR, 'uni_modules');
    if (!fs_extra_1.default.existsSync(uniModulesDir)) {
        return {};
    }
    let platform = process.env.UNI_PLATFORM;
    if (platform === 'h5') {
        platform = 'web';
    }
    else if (platform === 'app-plus') {
        platform = 'app';
    }
    const injects = {};
    fs_extra_1.default.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
        // 必须以 uni- 开头
        if (!uniModuleDir.startsWith('uni-')) {
            return;
        }
        const pkgPath = path_1.default.resolve(uniModulesDir, uniModuleDir, 'package.json');
        if (!fs_extra_1.default.existsSync(pkgPath)) {
            return;
        }
        try {
            const exports = JSON.parse(fs_extra_1.default.readFileSync(pkgPath, 'utf8'))
                ?.uni_modules?.['uni-ext-api'];
            if (exports) {
                const curInjects = parseInjects(vite, platform, `@/uni_modules/${uniModuleDir}`, exports);
                if (platform === 'app') {
                    Object.keys(curInjects).forEach((name) => {
                        const options = curInjects[name];
                        // js 平台禁用了
                        if (Array.isArray(options) && options.length === 3) {
                            if (options[2] && options[2].js === false) {
                                delete curInjects[name];
                            }
                        }
                    });
                }
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
function parseInjects(vite = true, platform, source, exports = {}) {
    let rootDefines = {};
    Object.keys(exports).forEach((name) => {
        if (name.startsWith('uni')) {
            rootDefines[name] = exports[name];
        }
    });
    const platformDefines = exports[platform];
    // 该平台不支持
    if (platformDefines === false) {
        return {};
    }
    if (platformDefines) {
        rootDefines = (0, merge_1.recursive)(true, rootDefines, platformDefines);
    }
    const injects = {};
    for (const key in rootDefines) {
        Object.assign(injects, parseInject(vite, platform, source, 'uni', rootDefines[key]));
    }
    return injects;
}
exports.parseInjects = parseInjects;
function parseInject(vite = true, platform, source, globalObject, define) {
    const injects = {};
    if (define === false) {
    }
    else if (typeof define === 'string') {
        // {'uni.getBatteryInfo' : '@dcloudio/uni-getbatteryinfo'}
        injects[globalObject + '.' + define] = vite ? source : [source, 'default'];
    }
    else if (Array.isArray(define)) {
        // {'uni.getBatteryInfo' : ['@dcloudio/uni-getbatteryinfo','getBatteryInfo]}
        define.forEach((d) => {
            injects[globalObject + '.' + d] = [source, d];
        });
    }
    else {
        const keys = Object.keys(define);
        keys.forEach((d) => {
            if (typeof define[d] === 'string') {
                injects[globalObject + '.' + d] = [source, define[d]];
            }
            else {
                const defineOptions = define[d];
                if (defineOptions[platform] !== false) {
                    if (platform === 'app') {
                        injects[globalObject + '.' + d] = [
                            source,
                            defineOptions.name || d,
                            defineOptions.app,
                        ];
                    }
                    else {
                        injects[globalObject + '.' + d] = [source, defineOptions.name || d];
                    }
                }
            }
        });
    }
    return injects;
}
exports.parseInject = parseInject;
