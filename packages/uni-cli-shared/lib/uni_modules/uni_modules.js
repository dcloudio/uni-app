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
    const injects = {};
    fs_extra_1.default.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
        var _a, _b;
        // 必须以 uni- 开头
        if (!uniModuleDir.startsWith('uni-')) {
            return;
        }
        const pkgPath = path_1.default.resolve(uniModulesDir, uniModuleDir, 'package.json');
        if (!fs_extra_1.default.existsSync(pkgPath)) {
            return;
        }
        try {
            const exports = (_b = (_a = JSON.parse(fs_extra_1.default.readFileSync(pkgPath, 'utf8'))) === null || _a === void 0 ? void 0 : _a.uni_modules) === null || _b === void 0 ? void 0 : _b['uni-ext-api'];
            if (exports) {
                Object.assign(injects, parseInjects(vite, process.env.UNI_PLATFORM === 'h5' ? 'web' : process.env.UNI_PLATFORM, `@/uni_modules/${uniModuleDir}`, exports));
            }
        }
        catch (e) {
        }
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
        Object.assign(injects, parseInject(vite, source, 'uni', rootDefines[key]));
    }
    return injects;
}
exports.parseInjects = parseInjects;
function parseInject(vite = true, source, globalObject, define) {
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
            injects[globalObject + '.' + d] = [source, define[d]];
        });
    }
    return injects;
}
exports.parseInject = parseInject;
